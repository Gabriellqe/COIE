import { z } from "zod";
import { canonicalDatasetSchema } from "@/contracts/canonical-dataset.schema";
import { marketPriceEstimateSchema } from "@/domain/market-price-estimate";

export const manualImportReceiptSchema = z.object({
  idempotencyKey: z.uuid(),
  requestFingerprint: z.string().regex(/^[0-9a-f]{64}$/),
  captureRunId: z.string().min(1),
  workspaceId: z.string().min(1),
  sourceId: z.string().min(1),
  method: z.literal("MANUAL_USER_ENTRY"),
  importVersion: z.literal("manual-evidence-import-v0.1.0"),
  status: z.literal("COMPLETE"),
  outcome: z.enum(["CREATED", "DUPLICATE"]),
  parameters: z.object({
    productId: z.string().min(1),
    marketplaceId: z.string().min(1),
    externalListingId: z.string().min(1),
    sellerExternalId: z.string().min(1),
    priceType: z.literal("ASKING"),
    currency: z.literal("CLP"),
    evidenceMode: z.literal("DEMO"),
  }),
  counts: z.object({
    received: z.literal(1),
    accepted: z.number().int().min(0).max(1),
    duplicate: z.number().int().min(0).max(1),
    rejected: z.literal(0),
  }),
  entityRefs: z.object({
    listingId: z.string().min(1),
    snapshotId: z.string().nullable(),
    observationId: z.string().nullable(),
    marketPriceEstimateId: z.string().nullable(),
  }),
  startedAt: z.iso.datetime(),
  completedAt: z.iso.datetime(),
});

export const demoEvidenceStoreSchema = z
  .object({
    storeVersion: z.literal("demo-evidence-store-v0.1.0"),
    revision: z.number().int().nonnegative(),
    dataset: canonicalDatasetSchema,
    marketPriceEstimates: z.array(marketPriceEstimateSchema),
    importReceipts: z.array(manualImportReceiptSchema),
    updatedAt: z.iso.datetime(),
  })
  .superRefine((store, context) => {
    const captureRunById = new Map(
      store.dataset.captureRuns.map((run) => [run.id, run]),
    );
    const listingById = new Map(
      store.dataset.listings.map((listing) => [listing.id, listing]),
    );
    const snapshotById = new Map(
      store.dataset.listingSnapshots.map((snapshot) => [snapshot.id, snapshot]),
    );
    const observationById = new Map(
      store.dataset.priceObservations.map((observation) => [
        observation.id,
        observation,
      ]),
    );
    const marketplaceById = new Map(
      store.dataset.marketplaces.map((marketplace) => [
        marketplace.id,
        marketplace,
      ]),
    );
    const estimateIds = new Set<string>();
    const idempotencyKeys = new Set<string>();

    for (const estimate of store.marketPriceEstimates) {
      if (estimateIds.has(estimate.id)) {
        context.addIssue({
          code: "custom",
          message: `MarketPriceEstimate duplicado: ${estimate.id}`,
        });
      }
      estimateIds.add(estimate.id);
      if (
        estimate.sampleSize !== estimate.inputRefs.length ||
        estimate.statistics.sampleSize !== estimate.inputRefs.length ||
        estimate.statistics.values.length !== estimate.inputRefs.length ||
        estimate.coverage.includedCount !== estimate.inputRefs.length ||
        estimate.coverage.excludedCount !== estimate.exclusions.length
      ) {
        context.addIssue({
          code: "custom",
          message: `conteos inconsistentes en estimate: ${estimate.id}`,
        });
      }
      for (const reference of [
        ...estimate.inputRefs,
        ...estimate.exclusions.map((exclusion) => exclusion.observationId),
      ]) {
        if (!observationById.has(reference)) {
          context.addIssue({
            code: "custom",
            message: `referencia de observación inválida en estimate: ${estimate.id}`,
          });
        }
      }
    }

    for (const receipt of store.importReceipts) {
      if (idempotencyKeys.has(receipt.idempotencyKey)) {
        context.addIssue({
          code: "custom",
          message: `idempotency key duplicada: ${receipt.idempotencyKey}`,
        });
      }
      idempotencyKeys.add(receipt.idempotencyKey);
      const created = receipt.outcome === "CREATED";
      const run = captureRunById.get(receipt.captureRunId);
      const listing = listingById.get(receipt.entityRefs.listingId);
      const marketplace = listing
        ? marketplaceById.get(listing.marketplaceId)
        : undefined;
      const snapshot = receipt.entityRefs.snapshotId
        ? snapshotById.get(receipt.entityRefs.snapshotId)
        : undefined;
      const observation = receipt.entityRefs.observationId
        ? observationById.get(receipt.entityRefs.observationId)
        : undefined;
      if (
        !run ||
        run.workspaceId !== receipt.workspaceId ||
        run.sourceId !== receipt.sourceId ||
        run.method !== receipt.method ||
        !listing ||
        listing.workspaceId !== receipt.workspaceId ||
        listing.productId !== receipt.parameters.productId ||
        listing.marketplaceId !== receipt.parameters.marketplaceId ||
        listing.externalListingId !== receipt.parameters.externalListingId ||
        !marketplace ||
        marketplace.dataSourceId !== receipt.sourceId ||
        !snapshot ||
        snapshot.listingId !== listing.id ||
        !observation ||
        observation.listingId !== listing.id ||
        observation.snapshotId !== snapshot.id ||
        observation.sourceId !== receipt.sourceId ||
        (receipt.entityRefs.marketPriceEstimateId !== null &&
          !estimateIds.has(receipt.entityRefs.marketPriceEstimateId)) ||
        receipt.counts.accepted !== (created ? 1 : 0) ||
        receipt.counts.duplicate !== (created ? 0 : 1) ||
        (created &&
          (!receipt.entityRefs.snapshotId ||
            !receipt.entityRefs.observationId ||
            !receipt.entityRefs.marketPriceEstimateId))
      ) {
        context.addIssue({
          code: "custom",
          message: `recibo inconsistente: ${receipt.idempotencyKey}`,
        });
      }
    }
  });

export type ManualImportReceipt = z.infer<typeof manualImportReceiptSchema>;
export type DemoEvidenceStoreSnapshot = z.infer<typeof demoEvidenceStoreSchema>;
