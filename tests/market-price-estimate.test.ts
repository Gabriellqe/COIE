import { describe, expect, it } from "vitest";
import fixture from "../fixtures/demo/nk150-resale.json";
import {
  canonicalDatasetSchema,
  type CanonicalDataset,
} from "../src/contracts/canonical-dataset.schema";
import { buildComparableCohort } from "../src/domain/comparable-cohort";
import { estimateMarketPrice } from "../src/domain/market-price-estimate";

const dataset = canonicalDatasetSchema.parse(fixture);

function buildEstimate(
  source: CanonicalDataset = dataset,
  overrides: Partial<Parameters<typeof buildComparableCohort>[1]> = {},
) {
  const cohort = buildComparableCohort(source, {
    workspaceId: "ws-demo-personal",
    marketId: "market-cl",
    productId: "product-demo-mirror-left",
    condition: "USED",
    priceType: "ASKING",
    currency: "CLP",
    asOf: "2026-08-18T12:00:00Z",
    windowStart: null,
    ...overrides,
  });
  return {
    cohort,
    estimate: estimateMarketPrice(cohort, {
      calculatedAt: "2026-08-18T12:00:00Z",
    }),
  };
}

describe("MarketPriceEstimate", () => {
  it("materializa una estimación DEMO ASKING suficiente y trazable", () => {
    const { cohort, estimate } = buildEstimate();

    expect(estimate).toMatchObject({
      status: "CALCULATED",
      evidenceMode: "DEMO",
      centralEstimate: 50000,
      centralEstimateBasis: "ASKING_MEDIAN",
      sampleSize: 3,
      minimumComparableCount: 3,
      confidence: "NOT_ASSESSED",
      calculationVersion: "market-price-estimate-v0.1.0",
      statistics: {
        values: [45000, 50000, 55000],
        mean: 50000,
        median: 50000,
        q1: 45000,
        q3: 55000,
        iqr: 10000,
      },
    });
    expect(estimate.inputRefs).toEqual([
      "price-ml-001-current",
      "price-fb-001",
      "price-fb-002",
    ]);
    expect(estimate.id).toMatch(/^mpe-[0-9a-f]{16}$/);
    expect(estimate.identityFingerprint).toContain(
      '"calculationVersion":"market-price-estimate-v0.1.0"',
    );
    expect(cohort.sourceIds).toEqual(["source-fb-cl", "source-ml-cl"]);
  });

  it("devuelve unknown explícito cuando la muestra es insuficiente", () => {
    const { estimate } = buildEstimate(dataset, { priceType: "SOLD" });

    expect(estimate.status).toBe("INSUFFICIENT_DATA");
    expect(estimate.centralEstimate).toBeNull();
    expect(estimate.statistics.median).toBe(48000);
    expect(estimate.sampleSize).toBe(1);
    expect(estimate.warnings).toContain("MINIMUM_COMPARABLES_NOT_MET");
  });

  it("representa una cohorte vacía sin excepción ni cero", () => {
    const { estimate } = buildEstimate(dataset, {
      condition: "REFURBISHED",
    });

    expect(estimate.status).toBe("INSUFFICIENT_DATA");
    expect(estimate.centralEstimate).toBeNull();
    expect(estimate.statistics.mean).toBeNull();
    expect(estimate.statistics.values).toEqual([]);
  });

  it("evalúa el último snapshot y no revive un precio antiguo elegible", () => {
    const changed = structuredClone(dataset);
    const latest = changed.priceObservations.find(
      (observation) => observation.id === "price-ml-001-current",
    );
    if (!latest) throw new Error("fixture incompleto");
    latest.qualityStatus = "EXCLUDED";
    latest.exclusionReason = "MANUAL_REVIEW_REQUIRED";

    const { cohort, estimate } = buildEstimate(changed);

    expect(estimate.statistics.values).toEqual([50000, 55000]);
    expect(estimate.centralEstimate).toBeNull();
    expect(cohort.exclusions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          observationId: "price-ml-001-current",
          reason: "QUALITY_EXCLUDED",
          detail: "MANUAL_REVIEW_REQUIRED",
        }),
        expect.objectContaining({
          observationId: "price-ml-001-old",
          reason: "SUPERSEDED",
        }),
      ]),
    );
  });

  it("explica condición, price type y observaciones posteriores al corte", () => {
    const { cohort } = buildEstimate(dataset, {
      asOf: "2026-08-18T11:20:30Z",
    });

    expect(cohort.members.map((member) => member.amount)).toEqual([
      45000, 50000,
    ]);
    expect(cohort.exclusions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          observationId: "price-ml-002-sold",
          reason: "PRICE_TYPE_MISMATCH",
        }),
        expect.objectContaining({
          observationId: "price-ml-003-new",
          reason: "CONDITION_MISMATCH",
        }),
      ]),
    );
    expect(cohort.outOfScope).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          observationId: "price-fb-002",
          reason: "AFTER_CUTOFF",
        }),
        expect.objectContaining({
          observationId: "price-fb-003-unknown",
          reason: "AFTER_CUTOFF",
        }),
      ]),
    );

    const fullCutoff = buildEstimate().cohort;
    expect(fullCutoff.exclusions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          observationId: "price-fb-003-unknown",
          reason: "CONDITION_UNKNOWN",
        }),
      ]),
    );
  });

  it("excluye moneda incompatible sin fallback histórico", () => {
    const changed = structuredClone(dataset);
    const latest = changed.priceObservations.find(
      (observation) => observation.id === "price-ml-001-current",
    );
    if (!latest) throw new Error("fixture incompleto");
    latest.price.currency = "USD";
    const snapshot = changed.listingSnapshots.find(
      (candidate) => candidate.id === latest.snapshotId,
    );
    if (!snapshot) throw new Error("fixture incompleto");
    snapshot.price.currency = "USD";

    const { cohort, estimate } = buildEstimate(changed);

    expect(estimate.statistics.values).toEqual([50000, 55000]);
    expect(cohort.exclusions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          observationId: "price-ml-001-current",
          reason: "CURRENCY_MISMATCH",
        }),
      ]),
    );
  });

  it("rechaza umbrales de suficiencia inválidos", () => {
    const { cohort } = buildEstimate();

    expect(() =>
      estimateMarketPrice(cohort, {
        minimumComparableCount: 0,
        calculatedAt: "2026-08-18T12:00:00Z",
      }),
    ).toThrow("entero positivo");
  });

  it("incluye umbral, ventana e inputs en la identidad", () => {
    const base = buildEstimate();
    const stricter = estimateMarketPrice(base.cohort, {
      minimumComparableCount: 4,
      calculatedAt: "2026-08-18T12:00:00Z",
    });
    const windowed = buildEstimate(dataset, {
      windowStart: "2026-08-18T11:20:30Z",
    }).estimate;

    expect(base.estimate.status).toBe("CALCULATED");
    expect(stricter.status).toBe("INSUFFICIENT_DATA");
    expect(stricter.id).not.toBe(base.estimate.id);
    expect(windowed.id).not.toBe(base.estimate.id);
    expect(windowed.statistics.values).toEqual([55000]);
  });

  it("cambia la identidad cuando cambia una exclusión trazada", () => {
    const base = buildEstimate();
    const changed = structuredClone(dataset);
    const excludedObservation = changed.priceObservations.find(
      (observation) => observation.id === "price-fb-003-unknown",
    );
    const excludedListing = changed.listings.find(
      (listing) => listing.id === excludedObservation?.listingId,
    );
    if (!excludedObservation || !excludedListing) {
      throw new Error("fixture incompleto");
    }
    excludedObservation.condition = "NEW";
    excludedListing.condition = "NEW";

    const revised = buildEstimate(changed);

    expect(revised.estimate.inputRefs).toEqual(base.estimate.inputRefs);
    expect(revised.estimate.statistics).toEqual(base.estimate.statistics);
    expect(revised.estimate.exclusions).not.toEqual(base.estimate.exclusions);
    expect(revised.estimate.id).not.toBe(base.estimate.id);
  });
});
