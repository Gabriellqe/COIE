import type { ComparableExclusion } from "@/domain/comparable-cohort";
import type { MarketPriceEstimate } from "@/domain/market-price-estimate";
import type { OpportunityStatus } from "@/domain/opportunity-state";

export type OpportunityListItem = {
  id: string;
  productName: string;
  type: "RESALE";
  status: OpportunityStatus;
  medianAskingPrice: number | null;
  sampleSize: number;
  marketEvidenceStatus: MarketPriceEstimate["status"];
  scoreStatus: "UNCALIBRATED";
};

export type OpportunityDetail = OpportunityListItem & {
  hypothesis: string;
  marketPriceEstimate: MarketPriceEstimate;
  evidenceSources: Array<{
    id: string;
    name: string;
    method: "MANUAL_USER_ENTRY";
    status: "PENDING_TERMS_REVIEW";
  }>;
  evidenceObservations: Array<{
    observationId: string;
    listingId: string;
    title: string;
    sourceName: string;
    method: "MANUAL_USER_ENTRY";
    observedAt: string;
    amount: number;
  }>;
  exclusions: ComparableExclusion[];
  historicalSnapshotCount: number;
};

export interface OpportunityReadRepository {
  list(): Promise<OpportunityListItem[]>;
  getById(id: string): Promise<OpportunityDetail | null>;
}
