import { describe, expect, it } from "vitest";
import { canTransition } from "../src/domain/opportunity-state";

describe("opportunity state transitions", () => {
  it("permite el flujo controlado", () => {
    expect(canTransition("DISCOVERED", "RESEARCHING")).toBe(true);
    expect(canTransition("RESEARCHING", "SHORTLISTED")).toBe(true);
  });

  it("impide saltos no autorizados", () => {
    expect(canTransition("DISCOVERED", "SCALING")).toBe(false);
    expect(canTransition("SHORTLISTED", "VALIDATED")).toBe(false);
  });
});
