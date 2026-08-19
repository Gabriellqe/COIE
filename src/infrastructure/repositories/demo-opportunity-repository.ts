import type {
  OpportunityDetail,
  OpportunityListItem,
  OpportunityReadRepository,
} from "@/application/ports/opportunity-read-repository";
import type { MarketEvidenceStore } from "@/application/ports/market-evidence-store";
import type { DemoEvidenceStoreSnapshot } from "@/contracts/demo-evidence-store.schema";
import { buildComparableCohort } from "@/domain/comparable-cohort";
import {
  estimateMarketPrice,
  type MarketPriceEstimate,
} from "@/domain/market-price-estimate";
import { jsonDemoEvidenceStore } from "@/infrastructure/persistence/json-demo-evidence-store";
import { MemoryDemoEvidenceStore } from "@/infrastructure/persistence/memory-demo-evidence-store";

function latestPersistedEstimate(
  snapshot: DemoEvidenceStoreSnapshot,
  productId: string,
): MarketPriceEstimate | undefined {
  return snapshot.marketPriceEstimates
    .filter(
      (estimate) =>
        estimate.workspaceId === snapshot.dataset.workspace.id &&
        estimate.marketId === snapshot.dataset.market.id &&
        estimate.productId === productId &&
        estimate.condition === "USED" &&
        estimate.priceType === "ASKING" &&
        estimate.currency === "CLP",
    )
    .at(-1);
}

function buildDetail(
  snapshot: DemoEvidenceStoreSnapshot,
  id: string,
): OpportunityDetail | null {
  const dataset = snapshot.dataset;
  const opportunity = dataset.opportunities.find(
    (candidate) => candidate.id === id,
  );
  if (!opportunity) return null;

  const product = dataset.products.find(
    (candidate) => candidate.id === opportunity.productId,
  );
  if (!product) return null;

  let marketPriceEstimate = latestPersistedEstimate(snapshot, product.id);
  if (!marketPriceEstimate) {
    const initialCohort = buildComparableCohort(dataset, {
      workspaceId: opportunity.workspaceId,
      marketId: opportunity.marketId,
      productId: product.id,
      condition: "USED",
      priceType: "ASKING",
      currency: "CLP",
      asOf: dataset.generatedAt,
      windowStart: null,
    });
    marketPriceEstimate = estimateMarketPrice(initialCohort, {
      calculatedAt: dataset.generatedAt,
    });
  }
  const sourceById = new Map(
    dataset.dataSources.map((source) => [source.id, source]),
  );
  const listingById = new Map(
    dataset.listings.map((listing) => [listing.id, listing]),
  );
  const observationById = new Map(
    dataset.priceObservations.map((observation) => [
      observation.id,
      observation,
    ]),
  );
  const evidenceObservations = marketPriceEstimate.inputRefs.flatMap(
    (observationId) => {
      const observation = observationById.get(observationId);
      const listing = observation
        ? listingById.get(observation.listingId)
        : undefined;
      const source = observation
        ? sourceById.get(observation.sourceId)
        : undefined;
      if (!observation || !listing || !source) return [];
      return [
        {
          observationId: observation.id,
          listingId: observation.listingId,
          title: listing.rawTitle,
          sourceName: source.name,
          method: source.accessMethod,
          observedAt: observation.observedAt,
          amount: Number(observation.price.amount),
        },
      ];
    },
  );
  const usedSourceIds = [
    ...new Set(
      marketPriceEstimate.inputRefs.flatMap((observationId) => {
        const sourceId = observationById.get(observationId)?.sourceId;
        return sourceId ? [sourceId] : [];
      }),
    ),
  ].sort();
  const evidenceSources = usedSourceIds.flatMap((sourceId) => {
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
    evidenceObservations,
    exclusions: marketPriceEstimate.exclusions,
    historicalSnapshotCount: dataset.listingSnapshots.filter((item) => {
      const listing = listingById.get(item.listingId);
      return listing?.productId === product.id;
    }).length,
  };
}

export class DemoOpportunityRepository implements OpportunityReadRepository {
  constructor(
    private readonly store: MarketEvidenceStore = new MemoryDemoEvidenceStore(),
  ) {}

  async list(): Promise<OpportunityListItem[]> {
    const snapshot = await this.store.read();
    return snapshot.dataset.opportunities.flatMap((opportunity) => {
      const detail = buildDetail(snapshot, opportunity.id);
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
    return buildDetail(await this.store.read(), id);
  }
}

export const demoOpportunityRepository = new DemoOpportunityRepository(
  jsonDemoEvidenceStore,
);
