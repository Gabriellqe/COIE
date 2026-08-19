import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import fixture from "../../../fixtures/demo/nk150-resale.json";
import type { MarketEvidenceStore } from "@/application/ports/market-evidence-store";
import {
  demoEvidenceStoreSchema,
  type DemoEvidenceStoreSnapshot,
} from "@/contracts/demo-evidence-store.schema";

function initialSnapshot(): DemoEvidenceStoreSnapshot {
  return demoEvidenceStoreSchema.parse({
    storeVersion: "demo-evidence-store-v0.1.0",
    revision: 0,
    dataset: structuredClone(fixture),
    marketPriceEstimates: [],
    importReceipts: [],
    updatedAt: fixture.generatedAt,
  });
}

const queues = new Map<string, Promise<unknown>>();

export class JsonDemoEvidenceStore implements MarketEvidenceStore {
  readonly filePath: string;

  constructor(
    filePath = resolve(process.cwd(), ".data", "demo-evidence.json"),
  ) {
    this.filePath = resolve(filePath);
  }

  async read(): Promise<DemoEvidenceStoreSnapshot> {
    try {
      const contents = await readFile(this.filePath, "utf8");
      return demoEvidenceStoreSchema.parse(JSON.parse(contents));
    } catch (error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "ENOENT"
      ) {
        return initialSnapshot();
      }
      throw new Error(`No se pudo leer el almacén DEMO: ${this.filePath}`, {
        cause: error,
      });
    }
  }

  async transact<Result>(
    mutation: (draft: DemoEvidenceStoreSnapshot) => {
      result: Result;
      changed: boolean;
    },
  ): Promise<{ snapshot: DemoEvidenceStoreSnapshot; result: Result }> {
    const previous = queues.get(this.filePath) ?? Promise.resolve();
    const operation = previous.then(async () => {
      const current = await this.read();
      const draft = structuredClone(current);
      const mutationResult = mutation(draft);
      if (!mutationResult.changed) {
        return { snapshot: current, result: mutationResult.result };
      }
      draft.revision = current.revision + 1;
      const validated = demoEvidenceStoreSchema.parse(draft);
      await this.writeAtomically(validated);
      return { snapshot: validated, result: mutationResult.result };
    });
    queues.set(
      this.filePath,
      operation.then(
        () => undefined,
        () => undefined,
      ),
    );
    return operation;
  }

  private async writeAtomically(snapshot: DemoEvidenceStoreSnapshot) {
    await mkdir(dirname(this.filePath), { recursive: true });
    const temporaryPath = `${this.filePath}.${process.pid}.${crypto.randomUUID()}.tmp`;
    await writeFile(temporaryPath, `${JSON.stringify(snapshot, null, 2)}\n`, {
      encoding: "utf8",
      flag: "wx",
    });
    await rename(temporaryPath, this.filePath);
  }
}

export const jsonDemoEvidenceStore = new JsonDemoEvidenceStore();
