import type { ComparableCohort } from "@/domain/comparable-cohort";

export type MarketPriceStatistics = {
  values: number[];
  sampleSize: number;
  mean: number | null;
  median: number | null;
  minimum: number | null;
  maximum: number | null;
  range: number | null;
  q1: number | null;
  q3: number | null;
  iqr: number | null;
  methodVersion: "market-statistics-v0.2.0";
};

export type MarketPriceEstimate = {
  id: string;
  workspaceId: string;
  productId: string;
  marketId: string;
  condition: ComparableCohort["definition"]["condition"];
  priceType: ComparableCohort["definition"]["priceType"];
  currency: "CLP";
  asOf: string;
  windowStart: string | null;
  comparableSetDefinition: ComparableCohort["definition"];
  sampleSize: number;
  minimumComparableCount: number;
  statistics: MarketPriceStatistics;
  centralEstimate: number | null;
  centralEstimateBasis: "ASKING_MEDIAN" | "SOLD_MEDIAN";
  status: "CALCULATED" | "INSUFFICIENT_DATA";
  confidence: "NOT_ASSESSED";
  confidenceReason: string;
  coverage: {
    includedCount: number;
    excludedCount: number;
    sourceCount: number;
  };
  warnings: string[];
  calculationVersion: "market-price-estimate-v0.1.0";
  identityFingerprint: string;
  inputRefs: string[];
  exclusions: ComparableCohort["exclusions"];
  evidenceMode: "DEMO";
  calculatedAt: string;
};

function roundHalfUp(value: bigint, divisor: bigint): bigint {
  return (value + divisor / 2n) / divisor;
}

function median(values: bigint[]): bigint {
  const middle = Math.floor(values.length / 2);
  return values.length % 2 === 0
    ? roundHalfUp(values[middle - 1] + values[middle], 2n)
    : values[middle];
}

export function calculateMarketPriceStatistics(
  cohort: ComparableCohort,
): MarketPriceStatistics {
  const values = cohort.members
    .map((member) => BigInt(member.amount))
    .sort((left, right) => (left < right ? -1 : left > right ? 1 : 0));
  if (values.length === 0) {
    return {
      values: [],
      sampleSize: 0,
      mean: null,
      median: null,
      minimum: null,
      maximum: null,
      range: null,
      q1: null,
      q3: null,
      iqr: null,
      methodVersion: "market-statistics-v0.2.0",
    };
  }

  const count = BigInt(values.length);
  const sum = values.reduce((total, value) => total + value, 0n);
  const middle = Math.floor(values.length / 2);
  const lower = values.slice(0, Math.max(middle, 1));
  const upper = values.slice(
    values.length === 1 ? 0 : Math.ceil(values.length / 2),
  );
  const q1 = median(lower);
  const q3 = median(upper);
  const minimum = values[0];
  const maximum = values[values.length - 1];

  return {
    values: values.map(Number),
    sampleSize: values.length,
    mean: Number(roundHalfUp(sum, count)),
    median: Number(median(values)),
    minimum: Number(minimum),
    maximum: Number(maximum),
    range: Number(maximum - minimum),
    q1: Number(q1),
    q3: Number(q3),
    iqr: Number(q3 - q1),
    methodVersion: "market-statistics-v0.2.0",
  };
}

export function estimateMarketPrice(
  cohort: ComparableCohort,
  options: {
    minimumComparableCount?: number;
    calculatedAt: string;
  },
): MarketPriceEstimate {
  const minimumComparableCount = options.minimumComparableCount ?? 3;
  if (!Number.isInteger(minimumComparableCount) || minimumComparableCount < 1) {
    throw new Error("minimumComparableCount debe ser un entero positivo.");
  }
  const statistics = calculateMarketPriceStatistics(cohort);
  const status =
    statistics.sampleSize >= minimumComparableCount
      ? "CALCULATED"
      : "INSUFFICIENT_DATA";
  const warnings = [
    ...(statistics.sampleSize < 4 ? ["SMALL_SAMPLE"] : []),
    ...(status === "INSUFFICIENT_DATA" ? ["MINIMUM_COMPARABLES_NOT_MET"] : []),
  ];
  const definition = cohort.definition;
  const inputRefs = cohort.members.map((member) => member.observationId);
  const exclusionRefs = cohort.exclusions.map((exclusion) => ({
    observationId: exclusion.observationId,
    listingId: exclusion.listingId,
    reason: exclusion.reason,
    detail: exclusion.detail,
  }));
  const calculationVersion = "market-price-estimate-v0.1.0" as const;
  const identityFingerprint = JSON.stringify({
    workspaceId: definition.workspaceId,
    marketId: definition.marketId,
    productId: definition.productId,
    variantKey: definition.variantKey,
    condition: definition.condition,
    priceType: definition.priceType,
    currency: definition.currency,
    asOf: definition.asOf,
    windowStart: definition.windowStart,
    minimumComparableCount,
    cohortMethodVersion: definition.methodVersion,
    statisticsMethodVersion: statistics.methodVersion,
    calculationVersion,
    inputRefs,
    exclusionRefs,
  });
  let identityHash = 14695981039346656037n;
  for (const character of identityFingerprint) {
    identityHash ^= BigInt(character.codePointAt(0) ?? 0);
    identityHash = BigInt.asUintN(64, identityHash * 1099511628211n);
  }

  return {
    id: `mpe-${identityHash.toString(16).padStart(16, "0")}`,
    workspaceId: definition.workspaceId,
    productId: definition.productId,
    marketId: definition.marketId,
    condition: definition.condition,
    priceType: definition.priceType,
    currency: definition.currency,
    asOf: definition.asOf,
    windowStart: definition.windowStart,
    comparableSetDefinition: definition,
    sampleSize: statistics.sampleSize,
    minimumComparableCount,
    statistics,
    centralEstimate: status === "CALCULATED" ? statistics.median : null,
    centralEstimateBasis:
      definition.priceType === "ASKING" ? "ASKING_MEDIAN" : "SOLD_MEDIAN",
    status,
    confidence: "NOT_ASSESSED",
    confidenceReason:
      "MVP-A1 aún no calibra confianza comercial ni valor realizable.",
    coverage: {
      includedCount: cohort.members.length,
      excludedCount: cohort.exclusions.length,
      sourceCount: cohort.sourceIds.length,
    },
    warnings,
    calculationVersion,
    identityFingerprint,
    inputRefs,
    exclusions: cohort.exclusions,
    evidenceMode: "DEMO",
    calculatedAt: options.calculatedAt,
  };
}
