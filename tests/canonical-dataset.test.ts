import { describe, expect, it } from "vitest";
import fixture from "../fixtures/demo/nk150-resale.json";
import { canonicalDatasetSchema } from "../src/contracts/canonical-dataset.schema";

describe("canonicalDatasetSchema", () => {
  it("valida el fixture DEMO de Chile", () => {
    const result = canonicalDatasetSchema.parse(fixture);

    expect(result.market).toMatchObject({
      countryCode: "CL",
      currencyCode: "CLP",
    });
    expect(result.datasetKind).toBe("DEMO");
    expect(result.listings.length).toBeGreaterThanOrEqual(3);
    expect(
      result.priceObservations.every((observation) => observation.sourceId),
    ).toBe(true);
  });

  it("rechaza montos serializados como números binarios", () => {
    const invalid = structuredClone(fixture);
    invalid.listingSnapshots[0].price.amount = 46000 as unknown as string;

    const result = canonicalDatasetSchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it("rechaza referencias que cruzan workspaces", () => {
    const invalid = structuredClone(fixture);
    invalid.products[0].workspaceId = "ws-ajeno";

    const result = canonicalDatasetSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) =>
          issue.message.includes("workspace"),
        ),
      ).toBe(true);
    }
  });

  it("rechaza timestamps inválidos y montos CLP fraccionarios", () => {
    const invalid = structuredClone(fixture);
    invalid.generatedAt = "fecha-inválidaZ";
    invalid.listingSnapshots[0].price.amount = "46000.50";

    expect(canonicalDatasetSchema.safeParse(invalid).success).toBe(false);
  });

  it("rechaza evidencia cruzada entre listings y snapshots", () => {
    const invalid = structuredClone(fixture);
    invalid.priceObservations[1].snapshotId = "snapshot-fb-001";

    const result = canonicalDatasetSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) =>
          issue.message.includes("observación inválida"),
        ),
      ).toBe(true);
    }
  });

  it("rechaza la identidad duplicada de un listing", () => {
    const invalid = structuredClone(fixture);
    invalid.listings.push({
      ...invalid.listings[0],
      id: "listing-duplicate-demo",
    });

    const result = canonicalDatasetSchema.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) =>
          issue.message.includes("listing duplicado"),
        ),
      ).toBe(true);
    }
  });
});
