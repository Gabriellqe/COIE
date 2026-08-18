import type { OpportunityReadRepository } from "@/application/ports/opportunity-read-repository";

export async function listOpportunities(repository: OpportunityReadRepository) {
  return repository.list();
}
