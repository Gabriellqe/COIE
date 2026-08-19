import fixture from "../../../fixtures/demo/nk150-resale.json";
import type { MarketEvidenceStore } from "@/application/ports/market-evidence-store";
import {
  demoEvidenceStoreSchema,
  type DemoEvidenceStoreSnapshot,
} from "@/contracts/demo-evidence-store.schema";

export class MemoryDemoEvidenceStore implements MarketEvidenceStore {
  private snapshot: DemoEvidenceStoreSnapshot;

  constructor(seed?: DemoEvidenceStoreSnapshot) {
    this.snapshot = seed
      ? demoEvidenceStoreSchema.parse(structuredClone(seed))
      : demoEvidenceStoreSchema.parse({
          storeVersion: "demo-evidence-store-v0.1.0",
          revision: 0,
          dataset: structuredClone(fixture),
          marketPriceEstimates: [],
          importReceipts: [],
          updatedAt: fixture.generatedAt,
        });
  }

  async read() {
    return structuredClone(this.snapshot);
  }

  async transact<Result>(
    mutation: (draft: DemoEvidenceStoreSnapshot) => {
      result: Result;
      changed: boolean;
    },
  ) {
    const draft = structuredClone(this.snapshot);
    const mutationResult = mutation(draft);
    if (mutationResult.changed) {
      draft.revision = this.snapshot.revision + 1;
      this.snapshot = demoEvidenceStoreSchema.parse(draft);
    }
    return {
      snapshot: structuredClone(this.snapshot),
      result: mutationResult.result,
    };
  }
}
