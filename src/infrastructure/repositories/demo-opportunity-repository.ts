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
import { buildComparableCohort } from "@/domain/comparable-cohort";
import { estimateMarketPrice } from "@/domain/market-price-estimate";

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

  const cohort = buildComparableCohort(dataset, {
    workspaceId: opportunity.workspaceId,
    marketId: opportunity.marketId,
    productId: product.id,
    condition: "USED",
    priceType: "ASKING",
    currency: "CLP",
    asOf: dataset.generatedAt,
    windowStart: null,
  });
  const marketPriceEstimate = estimateMarketPrice(cohort, {
    calculatedAt: dataset.generatedAt,
  });
  const sourceById = new Map(
    dataset.dataSources.map((source) => [source.id, source]),
  );
  const listingById = new Map(
    dataset.listings.map((listing) => [listing.id, listing]),
  );
  const evidenceSources = cohort.sourceIds.flatMap((sourceId) => {
    const source = sourceById.get(sourceId);
    return source
      ? [
          {
            id: source.id,
            name: source.name,
            method: source.accessMethod,
            status: source.status,
          },
        ]
      : [];
  });

  return {
    id: opportunity.id,
    productName: product.canonicalName,
    type: opportunity.opportunityType,
    status: opportunity.status,
    medianAskingPrice: marketPriceEstimate.centralEstimate,
    sampleSize: marketPriceEstimate.sampleSize,
    marketEvidenceStatus: marketPriceEstimate.status,
    scoreStatus: opportunity.scoreStatus,
    hypothesis: opportunity.hypothesis,
    marketPriceEstimate,
    evidenceSources,
    evidenceObservations: cohort.members.flatMap((member) => {
      const listing = listingById.get(member.listingId);
      const source = sourceById.get(member.sourceId);
      if (!listing || !source) return [];
      return [
        {
          observationId: member.observationId,
          listingId: member.listingId,
          title: listing.rawTitle,
          sourceName: source.name,
          method: source.accessMethod,
          observedAt: member.observedAt,
          amount: member.amount,
        },
      ];
    }),
    exclusions: cohort.exclusions,
    historicalSnapshotCount: dataset.listingSnapshots.filter((snapshot) => {
      const listing = listingById.get(snapshot.listingId);
      return listing?.productId === product.id;
    }).length,
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
          medianAskingPrice: detail.medianAskingPrice,
          sampleSize: detail.sampleSize,
          marketEvidenceStatus: detail.marketEvidenceStatus,
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
