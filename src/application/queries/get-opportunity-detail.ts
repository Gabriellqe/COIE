import type { OpportunityReadRepository } from "@/application/ports/opportunity-read-repository";

export async function getOpportunityDetail(
  repository: OpportunityReadRepository,
  opportunityId: string,
) {
  return repository.getById(opportunityId);
}
