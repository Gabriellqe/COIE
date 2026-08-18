import { describe, expect, it } from "vitest";
import fixture from "../fixtures/demo/nk150-resale.json";
import { canonicalDatasetSchema } from "../src/contracts/canonical-dataset.schema";
import { calculateCurrentMarketStatistics } from "../src/domain/market-statistics";

const dataset = canonicalDatasetSchema.parse(fixture);

describe("calculateCurrentMarketStatistics", () => {
  it("usa sólo el último precio USED/ASKING/CLP por listing", () => {
    const result = calculateCurrentMarketStatistics(dataset, {
      workspaceId: "ws-demo-personal",
      marketId: "market-cl",
      productId: "product-demo-mirror-left",
      condition: "USED",
      priceType: "ASKING",
      currency: "CLP",
      asOf: "2026-08-18T12:00:00Z",
    });

    expect(result).toMatchObject({
      values: [45000, 50000, 55000],
      sampleSize: 3,
      mean: 50000,
      median: 50000,
      minimum: 45000,
      maximum: 55000,
      range: 10000,
      warnings: ["SMALL_SAMPLE"],
      methodVersion: "market-statistics-v0.1.0",
    });
  });

  it("mantiene SOLD en una cohorte separada", () => {
    const result = calculateCurrentMarketStatistics(dataset, {
      workspaceId: "ws-demo-personal",
      marketId: "market-cl",
      productId: "product-demo-mirror-left",
      condition: "USED",
      priceType: "SOLD",
      currency: "CLP",
      asOf: "2026-08-18T12:00:00Z",
    });

    expect(result.values).toEqual([48000]);
  });

  it("respeta la fecha de corte y no usa observaciones futuras", () => {
    const result = calculateCurrentMarketStatistics(dataset, {
      workspaceId: "ws-demo-personal",
      marketId: "market-cl",
      productId: "product-demo-mirror-left",
      condition: "USED",
      priceType: "ASKING",
      currency: "CLP",
      asOf: "2026-08-18T11:20:30Z",
    });

    expect(result.values).toEqual([45000, 50000]);
  });
});
