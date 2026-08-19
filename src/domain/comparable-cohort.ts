import type { CanonicalDataset } from "@/contracts/canonical-dataset.schema";

export type ComparableCondition = "NEW" | "USED" | "REFURBISHED";
export type ComparablePriceType = "ASKING" | "SOLD";

export type ComparableCohortDefinition = {
  workspaceId: string;
  marketId: string;
  productId: string;
  variantKey: string;
  condition: ComparableCondition;
  priceType: ComparablePriceType;
  currency: "CLP";
  asOf: string;
  windowStart: string | null;
  latestPerListing: true;
  methodVersion: "comparable-cohort-v0.1.0";
};

export type ComparableMember = {
  observationId: string;
  listingId: string;
  snapshotId: string;
  sourceId: string;
  observedAt: string;
  amount: number;
};

export type ComparableExclusionReason =
  | "AFTER_CUTOFF"
  | "BEFORE_WINDOW"
  | "SUPERSEDED"
  | "CONDITION_UNKNOWN"
  | "CONDITION_MISMATCH"
  | "PRICE_TYPE_MISMATCH"
  | "CURRENCY_MISMATCH"
  | "QUALITY_EXCLUDED";

export type ComparableExclusion = {
  observationId: string;
  listingId: string;
  reason: ComparableExclusionReason;
  detail: string | null;
};

export type ComparableCohort = {
  definition: ComparableCohortDefinition;
  members: ComparableMember[];
  exclusions: ComparableExclusion[];
  outOfScope: ComparableExclusion[];
  sourceIds: string[];
};

export type ComparableCohortInput = Omit<
  ComparableCohortDefinition,
  "variantKey" | "latestPerListing" | "methodVersion"
>;

function toEpoch(timestamp: string): number {
  return new Date(timestamp).getTime();
}

export function buildComparableCohort(
  dataset: CanonicalDataset,
  input: ComparableCohortInput,
): ComparableCohort {
  const product = dataset.products.find(
    (candidate) =>
      candidate.id === input.productId &&
      candidate.workspaceId === input.workspaceId,
  );
  if (!product) {
    throw new Error("El producto de la cohorte no existe en el workspace.");
  }
  const variantKey = JSON.stringify(
    Object.entries(product.variantAttributes).sort(([left], [right]) =>
      left.localeCompare(right),
    ),
  );
  const marketplaceIds = new Set(
    dataset.marketplaces
      .filter((marketplace) => marketplace.marketId === input.marketId)
      .map((marketplace) => marketplace.id),
  );
  const scopedListings = new Map(
    dataset.listings
      .filter(
        (listing) =>
          listing.workspaceId === input.workspaceId &&
          listing.productId === input.productId &&
          marketplaceIds.has(listing.marketplaceId),
      )
      .map((listing) => [listing.id, listing]),
  );
  const observationsByListing = new Map<
    string,
    CanonicalDataset["priceObservations"]
  >();

  for (const observation of dataset.priceObservations) {
    if (
      observation.workspaceId !== input.workspaceId ||
      !scopedListings.has(observation.listingId)
    ) {
      continue;
    }
    const observations = observationsByListing.get(observation.listingId) ?? [];
    observations.push(observation);
    observationsByListing.set(observation.listingId, observations);
  }

  const members: ComparableMember[] = [];
  const exclusions: ComparableExclusion[] = [];
  const outOfScope: ComparableExclusion[] = [];
  const cutoff = toEpoch(input.asOf);
  const windowStart = input.windowStart ? toEpoch(input.windowStart) : null;

  for (const [listingId, observations] of observationsByListing) {
    const listing = scopedListings.get(listingId);
    if (!listing) continue;

    const beforeCutoff = observations
      .filter((observation) => {
        if (toEpoch(observation.observedAt) <= cutoff) return true;
        outOfScope.push({
          observationId: observation.id,
          listingId,
          reason: "AFTER_CUTOFF",
          detail: null,
        });
        return false;
      })
      .sort((left, right) => {
        const timeDifference =
          toEpoch(right.observedAt) - toEpoch(left.observedAt);
        return timeDifference || left.id.localeCompare(right.id);
      });

    const latest = beforeCutoff[0];
    for (const superseded of beforeCutoff.slice(1)) {
      exclusions.push({
        observationId: superseded.id,
        listingId,
        reason: "SUPERSEDED",
        detail: latest ? `reemplazada por ${latest.id}` : null,
      });
    }
    if (!latest) continue;

    let reason: ComparableExclusionReason | null = null;
    let detail: string | null = null;

    if (windowStart !== null && toEpoch(latest.observedAt) < windowStart) {
      reason = "BEFORE_WINDOW";
    } else if (
      listing.condition === "UNKNOWN" ||
      latest.condition === "UNKNOWN"
    ) {
      reason = "CONDITION_UNKNOWN";
    } else if (
      listing.condition !== input.condition ||
      latest.condition !== input.condition
    ) {
      reason = "CONDITION_MISMATCH";
    } else if (latest.priceType !== input.priceType) {
      reason = "PRICE_TYPE_MISMATCH";
    } else if (latest.price.currency !== input.currency) {
      reason = "CURRENCY_MISMATCH";
    } else if (latest.qualityStatus !== "ELIGIBLE") {
      reason = "QUALITY_EXCLUDED";
      detail = latest.exclusionReason;
    }

    if (reason) {
      exclusions.push({
        observationId: latest.id,
        listingId,
        reason,
        detail,
      });
      continue;
    }

    if (!/^\d+$/.test(latest.price.amount)) {
      throw new Error("Las cohortes CLP requieren pesos enteros.");
    }
    const amount = BigInt(latest.price.amount);
    if (amount > BigInt(Number.MAX_SAFE_INTEGER)) {
      throw new Error("El monto CLP excede el rango entero seguro de MVP-A1.");
    }
    members.push({
      observationId: latest.id,
      listingId,
      snapshotId: latest.snapshotId,
      sourceId: latest.sourceId,
      observedAt: latest.observedAt,
      amount: Number(amount),
    });
  }

  members.sort(
    (left, right) =>
      left.amount - right.amount ||
      left.observationId.localeCompare(right.observationId),
  );
  exclusions.sort((left, right) =>
    left.observationId.localeCompare(right.observationId),
  );
  outOfScope.sort((left, right) =>
    left.observationId.localeCompare(right.observationId),
  );

  return {
    definition: {
      ...input,
      variantKey,
      latestPerListing: true,
      methodVersion: "comparable-cohort-v0.1.0",
    },
    members,
    exclusions,
    outOfScope,
    sourceIds: [...new Set(members.map((member) => member.sourceId))].sort(),
  };
}
