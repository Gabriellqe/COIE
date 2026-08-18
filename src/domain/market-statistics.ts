import type { CanonicalDataset } from "@/contracts/canonical-dataset.schema";

export type ComparableFilter = {
  workspaceId: string;
  marketId: string;
  productId: string;
  condition: "NEW" | "USED" | "REFURBISHED";
  priceType: "ASKING" | "SOLD";
  currency: "CLP";
  asOf: string;
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
  methodVersion: "market-statistics-v0.1.0";
};

function roundHalfUp(value: bigint, divisor: bigint): bigint {
  return (value + divisor / 2n) / divisor;
}

export function calculateCurrentMarketStatistics(
  dataset: CanonicalDataset,
  filter: ComparableFilter,
): MarketStatistics {
  const marketplaceIds = new Set(
    dataset.marketplaces
      .filter((marketplace) => marketplace.marketId === filter.marketId)
      .map((marketplace) => marketplace.id),
  );
  const eligibleListingIds = new Set(
    dataset.listings
      .filter(
        (listing) =>
          listing.workspaceId === filter.workspaceId &&
          marketplaceIds.has(listing.marketplaceId) &&
          listing.productId === filter.productId &&
          listing.condition === filter.condition,
      )
      .map((listing) => listing.id),
  );

  const latestByListing = new Map<
    string,
    CanonicalDataset["priceObservations"][number]
  >();

  for (const observation of dataset.priceObservations) {
    if (
      !eligibleListingIds.has(observation.listingId) ||
      observation.workspaceId !== filter.workspaceId ||
      observation.observedAt > filter.asOf ||
      observation.condition !== filter.condition ||
      observation.priceType !== filter.priceType ||
      observation.price.currency !== filter.currency ||
      observation.qualityStatus !== "ELIGIBLE"
    ) {
      continue;
    }

    const current = latestByListing.get(observation.listingId);
    if (!current || observation.observedAt > current.observedAt) {
      latestByListing.set(observation.listingId, observation);
    }
  }

  const bigintValues = [...latestByListing.values()]
    .map((observation) => {
      if (!/^\d+$/.test(observation.price.amount)) {
        throw new Error("Las estadísticas CLP requieren pesos enteros.");
      }
      return BigInt(observation.price.amount);
    })
    .sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));

  if (bigintValues.length === 0) {
    throw new Error(
      "No existen observaciones comparables para el filtro solicitado.",
    );
  }

  const count = BigInt(bigintValues.length);
  const sum = bigintValues.reduce((total, value) => total + value, 0n);
  const middle = Math.floor(bigintValues.length / 2);
  const median =
    bigintValues.length % 2 === 0
      ? roundHalfUp(bigintValues[middle - 1] + bigintValues[middle], 2n)
      : bigintValues[middle];
  const minimum = bigintValues[0];
  const maximum = bigintValues[bigintValues.length - 1];

  return {
    values: bigintValues.map(Number),
    sampleSize: bigintValues.length,
    mean: Number(roundHalfUp(sum, count)),
    median: Number(median),
    minimum: Number(minimum),
    maximum: Number(maximum),
    range: Number(maximum - minimum),
    warnings: bigintValues.length < 4 ? ["SMALL_SAMPLE"] : [],
    methodVersion: "market-statistics-v0.1.0",
  };
}
