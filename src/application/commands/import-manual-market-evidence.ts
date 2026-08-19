import { createHash, randomUUID } from "node:crypto";
import type { MarketEvidenceStore } from "@/application/ports/market-evidence-store";
import type { ManualImportReceipt } from "@/contracts/demo-evidence-store.schema";
import {
  manualMarketEvidenceInputSchema,
  trustedDemoContext,
  type ManualMarketEvidenceInput,
} from "@/contracts/manual-market-evidence.schema";
import { buildComparableCohort } from "@/domain/comparable-cohort";
import { estimateMarketPrice } from "@/domain/market-price-estimate";

export type ManualEvidenceImportResult = {
  opportunityId: string;
  receipt: ManualImportReceipt;
  replayed: boolean;
};

function hash(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export class ImportManualMarketEvidence {
  constructor(
    private readonly store: MarketEvidenceStore,
    private readonly clock: () => Date = () => new Date(),
  ) {}

  async execute(
    untrustedInput: ManualMarketEvidenceInput,
  ): Promise<ManualEvidenceImportResult> {
    const input = manualMarketEvidenceInputSchema.parse(untrustedInput);
    const nowDate = this.clock();
    const now = nowDate.toISOString();
    if (new Date(input.observedAt).getTime() > nowDate.getTime()) {
      throw new Error("La fecha observada no puede estar en el futuro.");
    }
    const requestFingerprint = hash({
      version: "manual-evidence-request-v0.1.0",
      input,
      context: trustedDemoContext,
    });

    return (
      await this.store.transact((draft) => {
        const previousReceipt = draft.importReceipts.find(
          (receipt) => receipt.idempotencyKey === input.idempotencyKey,
        );
        const opportunity = draft.dataset.opportunities.find(
          (candidate) =>
            candidate.workspaceId === trustedDemoContext.workspaceId &&
            candidate.productId === input.productId &&
            candidate.marketId === trustedDemoContext.marketId,
        );
        if (!opportunity) {
          throw new Error("El producto no pertenece a una oportunidad DEMO.");
        }
        if (previousReceipt) {
          if (previousReceipt.requestFingerprint !== requestFingerprint) {
            throw new Error(
              "La clave idempotente ya fue utilizada con otro contenido.",
            );
          }
          return {
            changed: false,
            result: {
              opportunityId: opportunity.id,
              receipt: previousReceipt,
              replayed: true,
            },
          };
        }

        const marketplace = draft.dataset.marketplaces.find(
          (candidate) =>
            candidate.id === input.marketplaceId &&
            candidate.marketId === trustedDemoContext.marketId,
        );
        if (!marketplace) {
          throw new Error("Marketplace fuera del mercado DEMO permitido.");
        }
        const source = draft.dataset.dataSources.find(
          (candidate) => candidate.id === marketplace.dataSourceId,
        );
        if (!source || source.accessMethod !== trustedDemoContext.method) {
          throw new Error("Fuente o método de captura no permitidos.");
        }

        const listingIdentity = `${trustedDemoContext.workspaceId}:${marketplace.id}:${input.externalListingId}`;
        let listing = draft.dataset.listings.find(
          (candidate) =>
            candidate.workspaceId === trustedDemoContext.workspaceId &&
            candidate.marketplaceId === marketplace.id &&
            candidate.externalListingId === input.externalListingId,
        );
        if (
          listing &&
          (listing.productId !== input.productId ||
            listing.condition !== input.condition ||
            listing.canonicalUrl !== input.canonicalUrl ||
            listing.rawTitle !== input.rawTitle)
        ) {
          throw new Error(
            "La identidad del listing entra en conflicto con su registro previo.",
          );
        }

        const contentHash = hash({
          version: "manual-observation-fingerprint-v0.1.0",
          listingIdentity,
          observedAt: input.observedAt,
          priceType: trustedDemoContext.priceType,
          amount: input.amount,
          currency: trustedDemoContext.currency,
          condition: input.condition,
          sellerExternalId: input.sellerExternalId,
          rawTitle: input.rawTitle,
          canonicalUrl: input.canonicalUrl,
        });
        const duplicateSnapshot = draft.dataset.listingSnapshots.find(
          (snapshot) => snapshot.contentHash === contentHash,
        );
        const sameInstant = listing
          ? draft.dataset.listingSnapshots.find(
              (snapshot) =>
                snapshot.listingId === listing?.id &&
                snapshot.observedAt === input.observedAt,
            )
          : undefined;
        if (sameInstant && sameInstant.contentHash !== contentHash) {
          throw new Error(
            "Ya existe otra observación para el mismo listing e instante.",
          );
        }

        const captureRunId = `capture-${randomUUID()}`;
        draft.dataset.captureRuns.push({
          id: captureRunId,
          workspaceId: trustedDemoContext.workspaceId,
          sourceId: source.id,
          method: trustedDemoContext.method,
          status: "COMPLETE",
          startedAt: now,
          completedAt: now,
        });

        if (!listing) {
          listing = {
            id: `listing-${hash(listingIdentity).slice(0, 24)}`,
            workspaceId: trustedDemoContext.workspaceId,
            marketplaceId: marketplace.id,
            externalListingId: input.externalListingId,
            canonicalUrl: input.canonicalUrl,
            rawTitle: input.rawTitle,
            productId: input.productId,
            condition: input.condition,
            listingType: "FIXED_PRICE",
            firstSeenAt: input.observedAt,
            lastSeenAt: input.observedAt,
            status: "ACTIVE",
          };
          draft.dataset.listings.push(listing);
        }

        let snapshotId: string | null = duplicateSnapshot?.id ?? null;
        let observationId: string | null = null;
        let estimateId: string | null = null;
        const outcome = duplicateSnapshot ? "DUPLICATE" : "CREATED";

        if (!duplicateSnapshot) {
          snapshotId = `snapshot-${contentHash.slice(0, 24)}`;
          observationId = `price-${contentHash.slice(0, 24)}`;
          listing.lastSeenAt =
            new Date(input.observedAt) > new Date(listing.lastSeenAt)
              ? input.observedAt
              : listing.lastSeenAt;
          draft.dataset.listingSnapshots.push({
            id: snapshotId,
            workspaceId: trustedDemoContext.workspaceId,
            listingId: listing.id,
            captureRunId,
            observedAt: input.observedAt,
            priceType: trustedDemoContext.priceType,
            price: {
              amount: input.amount,
              currency: trustedDemoContext.currency,
            },
            contentHash,
          });
          draft.dataset.priceObservations.push({
            id: observationId,
            workspaceId: trustedDemoContext.workspaceId,
            listingId: listing.id,
            snapshotId,
            sourceId: source.id,
            observedAt: input.observedAt,
            priceType: trustedDemoContext.priceType,
            condition: input.condition,
            price: {
              amount: input.amount,
              currency: trustedDemoContext.currency,
            },
            qualityStatus:
              input.condition === "UNKNOWN" ? "EXCLUDED" : "ELIGIBLE",
            exclusionReason:
              input.condition === "UNKNOWN" ? "CONDITION_UNKNOWN" : null,
          });

          const cohort = buildComparableCohort(draft.dataset, {
            workspaceId: trustedDemoContext.workspaceId,
            marketId: trustedDemoContext.marketId,
            productId: input.productId,
            condition: "USED",
            priceType: trustedDemoContext.priceType,
            currency: trustedDemoContext.currency,
            asOf: now,
            windowStart: null,
          });
          const estimate = estimateMarketPrice(cohort, { calculatedAt: now });
          const persistedEstimate = draft.marketPriceEstimates.find(
            (candidate) => candidate.id === estimate.id,
          );
          if (!persistedEstimate) draft.marketPriceEstimates.push(estimate);
          estimateId = (persistedEstimate ?? estimate).id;
        } else {
          observationId =
            draft.dataset.priceObservations.find(
              (observation) => observation.snapshotId === duplicateSnapshot.id,
            )?.id ?? null;
        }

        const receipt: ManualImportReceipt = {
          idempotencyKey: input.idempotencyKey,
          requestFingerprint,
          captureRunId,
          workspaceId: trustedDemoContext.workspaceId,
          sourceId: source.id,
          method: trustedDemoContext.method,
          importVersion: "manual-evidence-import-v0.1.0",
          status: "COMPLETE",
          outcome,
          parameters: {
            productId: input.productId,
            marketplaceId: input.marketplaceId,
            externalListingId: input.externalListingId,
            sellerExternalId: input.sellerExternalId,
            priceType: trustedDemoContext.priceType,
            currency: trustedDemoContext.currency,
            evidenceMode: trustedDemoContext.evidenceMode,
          },
          counts: {
            received: 1,
            accepted: outcome === "CREATED" ? 1 : 0,
            duplicate: outcome === "DUPLICATE" ? 1 : 0,
            rejected: 0,
          },
          entityRefs: {
            listingId: listing.id,
            snapshotId,
            observationId,
            marketPriceEstimateId: estimateId,
          },
          startedAt: now,
          completedAt: now,
        };
        draft.importReceipts.push(receipt);
        draft.dataset.generatedAt = now;
        draft.updatedAt = now;

        return {
          changed: true,
          result: { opportunityId: opportunity.id, receipt, replayed: false },
        };
      })
    ).result;
  }
}
