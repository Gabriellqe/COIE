import { describe, expect, it } from "vitest";
import { DemoOpportunityRepository } from "../src/infrastructure/repositories/demo-opportunity-repository";

describe("DemoOpportunityRepository", () => {
  it("lista y recupera el detalle trazable", async () => {
    const repository = new DemoOpportunityRepository();
    const list = await repository.list();
    const detail = await repository.getById("opportunity-demo-001");

    expect(list).toHaveLength(1);
    expect(list[0].medianMarketPrice).toBe(50000);
    expect(detail?.sources).toEqual([
      "Mercado Libre Chile",
      "Facebook Marketplace",
    ]);
    expect(detail?.scoreStatus).toBe("UNCALIBRATED");
  });

  it("devuelve null para una oportunidad inexistente", async () => {
    const repository = new DemoOpportunityRepository();
    await expect(repository.getById("missing")).resolves.toBeNull();
  });
});
