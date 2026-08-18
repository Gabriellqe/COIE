import type { CanonicalDataset } from "@/contracts/canonical-dataset.schema";
import type { MarketStatistics } from "@/domain/market-statistics";

export type OpportunityListItem = {
  id: string;
  productName: string;
  type: "RESALE";
  status: "RESEARCHING";
  medianMarketPrice: number;
  sampleSize: number;
  scoreStatus: "UNCALIBRATED";
};

export type OpportunityDetail = OpportunityListItem & {
  hypothesis: string;
  statistics: MarketStatistics;
  sources: string[];
  excludedObservations: number;
  dataset: CanonicalDataset;
};

export interface OpportunityReadRepository {
  list(): Promise<OpportunityListItem[]>;
  getById(id: string): Promise<OpportunityDetail | null>;
}
