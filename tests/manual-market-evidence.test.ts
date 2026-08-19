import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { ImportManualMarketEvidence } from "../src/application/commands/import-manual-market-evidence";
import { manualMarketEvidenceInputSchema } from "../src/contracts/manual-market-evidence.schema";
import { JsonDemoEvidenceStore } from "../src/infrastructure/persistence/json-demo-evidence-store";
import { MemoryDemoEvidenceStore } from "../src/infrastructure/persistence/memory-demo-evidence-store";
import { DemoOpportunityRepository } from "../src/infrastructure/repositories/demo-opportunity-repository";

const temporaryDirectories: string[] = [];
const now = new Date("2026-08-20T12:00:00Z");

function command(overrides: Record<string, string> = {}) {
  return {
    idempotencyKey: crypto.randomUUID(),
    productId: "product-demo-mirror-left",
    marketplaceId: "marketplace-ml-cl",
    externalListingId: "DEMO-MANUAL-001",
    canonicalUrl: "https://example.invalid/manual/DEMO-MANUAL-001",
    rawTitle: "Espejo izquierdo NK150 carga manual DEMO",
    sellerExternalId: "UNKNOWN",
    condition: "USED" as const,
    amount: "52000",
    observedAt: "2026-08-19T15:00:00Z",
    ...overrides,
  };
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories
      .splice(0)
      .map((directory) => rm(directory, { force: true, recursive: true })),
  );
});

describe("manualMarketEvidenceInputSchema", () => {
  it("acepta sólo CLP entero, UTC y host DEMO exacto", () => {
    expect(manualMarketEvidenceInputSchema.safeParse(command()).success).toBe(
      true,
    );
    expect(
      manualMarketEvidenceInputSchema.safeParse(
        command({ canonicalUrl: "https://facebook.example/listing" }),
      ).success,
    ).toBe(false);
    expect(
      manualMarketEvidenceInputSchema.safeParse(command({ amount: "1.5" }))
        .success,
    ).toBe(false);
    expect(
      manualMarketEvidenceInputSchema.safeParse(
        command({ observedAt: "2026-08-19T12:00:00-03:00" }),
      ).success,
    ).toBe(false);
  });
});

describe("ImportManualMarketEvidence", () => {
  it("agrega captura, listing, snapshot, observación y estimate trazables", async () => {
    const store = new MemoryDemoEvidenceStore();
    const importer = new ImportManualMarketEvidence(store, () => now);
    const before = await store.read();

    const result = await importer.execute(command());
    const after = await store.read();

    expect(result.receipt).toMatchObject({
      outcome: "CREATED",
      counts: { received: 1, accepted: 1, duplicate: 0, rejected: 0 },
      method: "MANUAL_USER_ENTRY",
    });
    expect(after.revision).toBe(1);
    expect(after.dataset.captureRuns).toHaveLength(
      before.dataset.captureRuns.length + 1,
    );
    expect(after.dataset.listings).toHaveLength(
      before.dataset.listings.length + 1,
    );
    expect(after.dataset.listingSnapshots).toHaveLength(
      before.dataset.listingSnapshots.length + 1,
    );
    expect(after.dataset.priceObservations).toHaveLength(
      before.dataset.priceObservations.length + 1,
    );
    expect(after.marketPriceEstimates).toHaveLength(1);
    expect(after.marketPriceEstimates[0]).toMatchObject({
      evidenceMode: "DEMO",
      centralEstimateBasis: "ASKING_MEDIAN",
      calculatedAt: now.toISOString(),
    });
  });

  it("reproduce el mismo idempotency key sin escribir otra revisión", async () => {
    const store = new MemoryDemoEvidenceStore();
    const importer = new ImportManualMarketEvidence(store, () => now);
    const input = command();
    const first = await importer.execute(input);
    const revision = (await store.read()).revision;

    const replay = await importer.execute(input);

    expect(replay.replayed).toBe(true);
    expect(replay.receipt).toEqual(first.receipt);
    expect((await store.read()).revision).toBe(revision);
  });

  it("rechaza reutilizar una clave idempotente con otro payload", async () => {
    const store = new MemoryDemoEvidenceStore();
    const importer = new ImportManualMarketEvidence(store, () => now);
    const input = command();
    await importer.execute(input);
    const revision = (await store.read()).revision;

    await expect(
      importer.execute({ ...input, amount: "53000" }),
    ).rejects.toThrow("clave idempotente");
    expect((await store.read()).revision).toBe(revision);
  });

  it("rechaza cualquier observación posterior al cutoff del estimate", async () => {
    const store = new MemoryDemoEvidenceStore();
    const importer = new ImportManualMarketEvidence(store, () => now);

    await expect(
      importer.execute(command({ observedAt: "2026-08-20T12:00:01Z" })),
    ).rejects.toThrow("futuro");
    expect((await store.read()).revision).toBe(0);
  });

  it("audita un duplicado exacto sin crear historia falsa", async () => {
    const store = new MemoryDemoEvidenceStore();
    const importer = new ImportManualMarketEvidence(store, () => now);
    await importer.execute(command());
    const before = await store.read();

    const duplicate = await importer.execute(
      command({ idempotencyKey: crypto.randomUUID() }),
    );
    const after = await store.read();

    expect(duplicate.receipt.outcome).toBe("DUPLICATE");
    expect(after.dataset.captureRuns).toHaveLength(
      before.dataset.captureRuns.length + 1,
    );
    expect(after.dataset.listingSnapshots).toHaveLength(
      before.dataset.listingSnapshots.length,
    );
    expect(after.dataset.priceObservations).toHaveLength(
      before.dataset.priceObservations.length,
    );
    expect(after.marketPriceEstimates).toHaveLength(
      before.marketPriceEstimates.length,
    );
  });

  it("agrega un nuevo instante y rechaza contenido conflictivo en el mismo instante", async () => {
    const store = new MemoryDemoEvidenceStore();
    const importer = new ImportManualMarketEvidence(store, () => now);
    await importer.execute(command());
    const second = command({
      idempotencyKey: crypto.randomUUID(),
      amount: "53000",
      observedAt: "2026-08-19T16:00:00Z",
    });
    await importer.execute(second);
    const afterSecond = await store.read();
    const listing = afterSecond.dataset.listings.find(
      (item) => item.externalListingId === "DEMO-MANUAL-001",
    );
    expect(
      afterSecond.dataset.listingSnapshots.filter(
        (snapshot) => snapshot.listingId === listing?.id,
      ),
    ).toHaveLength(2);

    await expect(
      importer.execute(
        command({
          idempotencyKey: crypto.randomUUID(),
          amount: "54000",
          observedAt: second.observedAt,
        }),
      ),
    ).rejects.toThrow("mismo listing e instante");
    expect((await store.read()).revision).toBe(afterSecond.revision);
  });

  it("conserva UNKNOWN como excluido y nunca lo transforma en USED", async () => {
    const store = new MemoryDemoEvidenceStore();
    const importer = new ImportManualMarketEvidence(store, () => now);
    const result = await importer.execute(
      command({
        condition: "UNKNOWN",
        externalListingId: "DEMO-UNKNOWN-001",
        canonicalUrl: "https://example.invalid/manual/DEMO-UNKNOWN-001",
      }),
    );
    const snapshot = await store.read();
    const observation = snapshot.dataset.priceObservations.find(
      (item) => item.id === result.receipt.entityRefs.observationId,
    );

    expect(observation).toMatchObject({
      condition: "UNKNOWN",
      qualityStatus: "EXCLUDED",
      exclusionReason: "CONDITION_UNKNOWN",
    });
  });

  it("expone desde el repositorio la última estimación materializada", async () => {
    const store = new MemoryDemoEvidenceStore();
    const importer = new ImportManualMarketEvidence(store, () => now);
    const result = await importer.execute(command());
    const detail = await new DemoOpportunityRepository(store).getById(
      result.opportunityId,
    );

    expect(detail?.marketPriceEstimate.id).toBe(
      result.receipt.entityRefs.marketPriceEstimateId,
    );
    expect(detail?.sampleSize).toBe(4);
    expect(detail?.medianAskingPrice).toBe(51000);
    expect(detail?.historicalSnapshotCount).toBe(8);
  });
});

describe("JsonDemoEvidenceStore", () => {
  it("persiste entre instancias y serializa escrituras concurrentes", async () => {
    const directory = await mkdtemp(join(tmpdir(), "coie-demo-store-"));
    temporaryDirectories.push(directory);
    const filePath = join(directory, "evidence.json");
    const firstStore = new JsonDemoEvidenceStore(filePath);
    const firstImporter = new ImportManualMarketEvidence(firstStore, () => now);

    const [, secondResult] = await Promise.all([
      firstImporter.execute(command()),
      firstImporter.execute(
        command({
          idempotencyKey: crypto.randomUUID(),
          externalListingId: "DEMO-MANUAL-002",
          canonicalUrl: "https://example.invalid/manual/DEMO-MANUAL-002",
          rawTitle: "Segundo espejo NK150 carga manual DEMO",
        }),
      ),
    ]);

    const reloaded = await new JsonDemoEvidenceStore(filePath).read();
    expect(reloaded.revision).toBe(2);
    expect(
      reloaded.dataset.listings.filter((listing) =>
        listing.externalListingId.startsWith("DEMO-MANUAL"),
      ),
    ).toHaveLength(2);
    expect(reloaded.marketPriceEstimates).toHaveLength(2);
    const detail = await new DemoOpportunityRepository(
      new JsonDemoEvidenceStore(filePath),
    ).getById(secondResult.opportunityId);
    expect(detail?.marketPriceEstimate.id).toBe(
      secondResult.receipt.entityRefs.marketPriceEstimateId,
    );
    expect(detail?.sampleSize).toBe(5);
    expect(JSON.parse(await readFile(filePath, "utf8"))).toMatchObject({
      storeVersion: "demo-evidence-store-v0.1.0",
      revision: 2,
    });
  });

  it("reporta corrupción sin reemplazar silenciosamente el archivo", async () => {
    const directory = await mkdtemp(join(tmpdir(), "coie-demo-store-"));
    temporaryDirectories.push(directory);
    const filePath = join(directory, "evidence.json");
    await writeFile(filePath, "{ contenido inválido", "utf8");
    const store = new JsonDemoEvidenceStore(filePath);

    await expect(store.read()).rejects.toThrow("No se pudo leer");
    expect(await readFile(filePath, "utf8")).toBe("{ contenido inválido");
  });
});
