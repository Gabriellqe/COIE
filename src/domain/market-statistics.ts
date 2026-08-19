import type { CanonicalDataset } from "@/contracts/canonical-dataset.schema";
import { buildComparableCohort } from "@/domain/comparable-cohort";
import { calculateMarketPriceStatistics } from "@/domain/market-price-estimate";

export type ComparableFilter = {
  workspaceId: string;
  marketId: string;
  productId: string;
  condition: "NEW" | "USED" | "REFURBISHED";
  priceType: "ASKING" | "SOLD";
  currency: "CLP";
  asOf: string;
  windowStart?: string | null;
};

export type MarketStatistics = {
  values: number[];
  sampleSize: number;
  mean: number;
  median: number;
  minimum: number;
  maximum: number;
  range: number;
  warnings: string[];
  methodVersion: "market-statistics-v0.2.0";
};

export function calculateCurrentMarketStatistics(
  dataset: CanonicalDataset,
  filter: ComparableFilter,
): MarketStatistics {
  const cohort = buildComparableCohort(dataset, {
    ...filter,
    windowStart: filter.windowStart ?? null,
  });
  const statistics = calculateMarketPriceStatistics(cohort);

  if (
    statistics.mean === null ||
    statistics.median === null ||
    statistics.minimum === null ||
    statistics.maximum === null ||
    statistics.range === null
  ) {
    throw new Error(
      "No existen observaciones comparables para el filtro solicitado.",
    );
  }

  return {
    values: statistics.values,
    sampleSize: statistics.sampleSize,
    mean: statistics.mean,
    median: statistics.median,
    minimum: statistics.minimum,
    maximum: statistics.maximum,
    range: statistics.range,
    warnings: statistics.sampleSize < 4 ? ["SMALL_SAMPLE"] : [],
    methodVersion: "market-statistics-v0.2.0",
  };
}
