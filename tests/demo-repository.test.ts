import { describe, expect, it } from "vitest";
import { DemoOpportunityRepository } from "../src/infrastructure/repositories/demo-opportunity-repository";

describe("DemoOpportunityRepository", () => {
  it("lista y recupera el detalle trazable", async () => {
    const repository = new DemoOpportunityRepository();
    const list = await repository.list();
    const detail = await repository.getById("opportunity-demo-001");

    expect(list).toHaveLength(1);
    expect(list[0].medianAskingPrice).toBe(50000);
    expect(detail?.evidenceSources.map((source) => source.name)).toEqual([
      "Facebook Marketplace",
      "Mercado Libre Chile",
    ]);
    expect(detail?.marketPriceEstimate).toMatchObject({
      status: "CALCULATED",
      evidenceMode: "DEMO",
      centralEstimate: 50000,
      centralEstimateBasis: "ASKING_MEDIAN",
    });
    expect(detail?.evidenceObservations).toHaveLength(3);
    expect(detail?.exclusions.length).toBeGreaterThan(0);
    expect(detail?.scoreStatus).toBe("UNCALIBRATED");
  });

  it("devuelve null para una oportunidad inexistente", async () => {
    const repository = new DemoOpportunityRepository();
    await expect(repository.getById("missing")).resolves.toBeNull();
  });
});
