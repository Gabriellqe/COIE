import { z } from "zod";
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

const nullableMoney = z.number().int().nonnegative().nullable();
const exclusionSchema = z.object({
  observationId: z.string().min(1),
  listingId: z.string().min(1),
  reason: z.enum([
    "AFTER_CUTOFF",
    "BEFORE_WINDOW",
    "SUPERSEDED",
    "CONDITION_UNKNOWN",
    "CONDITION_MISMATCH",
    "PRICE_TYPE_MISMATCH",
    "CURRENCY_MISMATCH",
    "QUALITY_EXCLUDED",
  ]),
  detail: z.string().nullable(),
});

export const marketPriceEstimateSchema = z.object({
  id: z.string().min(1),
  workspaceId: z.string().min(1),
  productId: z.string().min(1),
  marketId: z.string().min(1),
  condition: z.enum(["NEW", "USED", "REFURBISHED"]),
  priceType: z.enum(["ASKING", "SOLD"]),
  currency: z.literal("CLP"),
  asOf: z.iso.datetime(),
  windowStart: z.iso.datetime().nullable(),
  comparableSetDefinition: z.object({
    workspaceId: z.string().min(1),
    marketId: z.string().min(1),
    productId: z.string().min(1),
    variantKey: z.string(),
    condition: z.enum(["NEW", "USED", "REFURBISHED"]),
    priceType: z.enum(["ASKING", "SOLD"]),
    currency: z.literal("CLP"),
    asOf: z.iso.datetime(),
    windowStart: z.iso.datetime().nullable(),
    latestPerListing: z.literal(true),
    methodVersion: z.literal("comparable-cohort-v0.1.0"),
  }),
  sampleSize: z.number().int().nonnegative(),
  minimumComparableCount: z.number().int().positive(),
  statistics: z.object({
    values: z.array(z.number().int().nonnegative()),
    sampleSize: z.number().int().nonnegative(),
    mean: nullableMoney,
    median: nullableMoney,
    minimum: nullableMoney,
    maximum: nullableMoney,
    range: nullableMoney,
    q1: nullableMoney,
    q3: nullableMoney,
    iqr: nullableMoney,
    methodVersion: z.literal("market-statistics-v0.2.0"),
  }),
  centralEstimate: nullableMoney,
  centralEstimateBasis: z.enum(["ASKING_MEDIAN", "SOLD_MEDIAN"]),
  status: z.enum(["CALCULATED", "INSUFFICIENT_DATA"]),
  confidence: z.literal("NOT_ASSESSED"),
  confidenceReason: z.string().min(1),
  coverage: z.object({
    includedCount: z.number().int().nonnegative(),
    excludedCount: z.number().int().nonnegative(),
    sourceCount: z.number().int().nonnegative(),
  }),
  warnings: z.array(z.string()),
  calculationVersion: z.literal("market-price-estimate-v0.1.0"),
  identityFingerprint: z.string().min(1),
  inputRefs: z.array(z.string().min(1)),
  exclusions: z.array(exclusionSchema),
  evidenceMode: z.literal("DEMO"),
  calculatedAt: z.iso.datetime(),
});

export type MarketPriceEstimate = z.infer<typeof marketPriceEstimateSchema>;

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
