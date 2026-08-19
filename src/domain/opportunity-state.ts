export const opportunityTransitions = {
  DISCOVERED: ["RESEARCHING"],
  RESEARCHING: ["SHORTLISTED", "REJECTED"],
  SHORTLISTED: ["TESTING", "REJECTED"],
  TESTING: ["VALIDATED", "REJECTED", "RESEARCHING"],
  VALIDATED: ["SCALING"],
  SCALING: [],
  REJECTED: ["RESEARCHING"],
} as const;

export type OpportunityStatus = keyof typeof opportunityTransitions;

export function canTransition(
  from: OpportunityStatus,
  to: OpportunityStatus,
): boolean {
  return (opportunityTransitions[from] as readonly string[]).includes(to);
}
