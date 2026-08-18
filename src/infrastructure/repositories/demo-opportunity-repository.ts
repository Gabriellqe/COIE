import fixture from "../../../fixtures/demo/nk150-resale.json";
import type {
  OpportunityDetail,
  OpportunityListItem,
  OpportunityReadRepository,
} from "@/application/ports/opportunity-read-repository";
import {
  canonicalDatasetSchema,
  type CanonicalDataset,
} from "@/contracts/canonical-dataset.schema";
import { calculateCurrentMarketStatistics } from "@/domain/market-statistics";

const dataset: CanonicalDataset = canonicalDatasetSchema.parse(fixture);

function buildDetail(id: string): OpportunityDetail | null {
  const opportunity = dataset.opportunities.find(
    (candidate) => candidate.id === id,
  );
  if (!opportunity) return null;

  const product = dataset.products.find(
    (candidate) => candidate.id === opportunity.productId,
  );
  if (!product) return null;

  const statistics = calculateCurrentMarketStatistics(dataset, {
    workspaceId: opportunity.workspaceId,
    marketId: opportunity.marketId,
    productId: product.id,
    condition: "USED",
    priceType: "ASKING",
    currency: "CLP",
    asOf: dataset.generatedAt,
  });

  return {
    id: opportunity.id,
    productName: product.canonicalName,
    type: opportunity.opportunityType,
    status: opportunity.status,
    medianMarketPrice: statistics.median,
    sampleSize: statistics.sampleSize,
    scoreStatus: opportunity.scoreStatus,
    hypothesis: opportunity.hypothesis,
    statistics,
    sources: dataset.dataSources.map((source) => source.name),
    excludedObservations: dataset.priceObservations.filter(
      (observation) => observation.qualityStatus === "EXCLUDED",
    ).length,
    dataset,
  };
}

export class DemoOpportunityRepository implements OpportunityReadRepository {
  async list(): Promise<OpportunityListItem[]> {
    return dataset.opportunities.flatMap((opportunity) => {
      const detail = buildDetail(opportunity.id);
      if (!detail) return [];
      return [
        {
          id: detail.id,
          productName: detail.productName,
          type: detail.type,
          status: detail.status,
          medianMarketPrice: detail.medianMarketPrice,
          sampleSize: detail.sampleSize,
          scoreStatus: detail.scoreStatus,
        },
      ];
    });
  }

  async getById(id: string): Promise<OpportunityDetail | null> {
    return buildDetail(id);
  }
}

export const demoOpportunityRepository = new DemoOpportunityRepository();
