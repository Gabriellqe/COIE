import type { DemoEvidenceStoreSnapshot } from "@/contracts/demo-evidence-store.schema";

export interface MarketEvidenceStore {
  read(): Promise<DemoEvidenceStoreSnapshot>;
  transact<Result>(
    mutation: (draft: DemoEvidenceStoreSnapshot) => {
      result: Result;
      changed: boolean;
    },
  ): Promise<{ snapshot: DemoEvidenceStoreSnapshot; result: Result }>;
}
