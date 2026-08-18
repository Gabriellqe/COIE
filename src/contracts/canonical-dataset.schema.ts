import { z } from "zod";

const id = z.string().min(1);
const utcTimestamp = z.iso.datetime({
  message: "debe ser un timestamp ISO 8601 válido en UTC",
});
const decimalAmount = z
  .string()
  .regex(
    /^(0|[1-9]\d*)(\.\d+)?$/,
    "debe ser un monto decimal positivo serializado como texto",
  );

const moneySchema = z
  .object({
    amount: decimalAmount,
    currency: z.string().regex(/^[A-Z]{3}$/),
  })
  .superRefine((money, context) => {
    if (money.currency === "CLP" && !/^\d+$/.test(money.amount)) {
      context.addIssue({
        code: "custom",
        path: ["amount"],
        message: "CLP debe expresarse en pesos enteros",
      });
    }
  });

const workspaceOwned = z.object({
  id,
  workspaceId: id,
});

export const canonicalDatasetSchema = z
  .object({
    schemaVersion: z.literal("0.1.0"),
    datasetKind: z.literal("DEMO"),
    generatedAt: utcTimestamp,
    workspace: z.object({
      id,
      name: z.string().min(1),
      type: z.enum(["PERSONAL", "SHARED"]),
    }),
    market: z.object({
      id,
      name: z.literal("Chile"),
      countryCode: z.literal("CL"),
      currencyCode: z.literal("CLP"),
      timezone: z.literal("America/Santiago"),
    }),
    dataSources: z.array(
      z.object({
        id,
        name: z.string().min(1),
        accessMethod: z.literal("MANUAL_USER_ENTRY"),
        status: z.literal("PENDING_TERMS_REVIEW"),
      }),
    ),
    marketplaces: z.array(
      z.object({
        id,
        marketId: id,
        dataSourceId: id,
        name: z.string().min(1),
      }),
    ),
    captureRuns: z.array(
      workspaceOwned.extend({
        sourceId: id,
        method: z.literal("MANUAL_USER_ENTRY"),
        status: z.literal("COMPLETE"),
        startedAt: utcTimestamp,
        completedAt: utcTimestamp,
      }),
    ),
    products: z.array(
      workspaceOwned.extend({
        canonicalName: z.string().min(1),
        brand: z.string().nullable(),
        model: z.string().nullable(),
        productKind: z.literal("PART"),
        variantAttributes: z.record(z.string(), z.string()),
        status: z.literal("CANDIDATE"),
      }),
    ),
    productAliases: z.array(
      workspaceOwned.extend({
        productId: id,
        sourceId: id,
        rawName: z.string().min(1),
        normalizedName: z.string().min(1),
        confidence: z.number().min(0).max(1),
      }),
    ),
    listings: z.array(
      workspaceOwned.extend({
        marketplaceId: id,
        externalListingId: z.string().min(1),
        canonicalUrl: z.string().url(),
        rawTitle: z.string().min(1),
        productId: id,
        condition: z.enum(["NEW", "USED", "REFURBISHED", "UNKNOWN"]),
        listingType: z.literal("FIXED_PRICE"),
        firstSeenAt: utcTimestamp,
        lastSeenAt: utcTimestamp,
        status: z.literal("ACTIVE"),
      }),
    ),
    listingSnapshots: z.array(
      workspaceOwned.extend({
        listingId: id,
        captureRunId: id,
        observedAt: utcTimestamp,
        priceType: z.enum(["ASKING", "SOLD"]),
        price: moneySchema,
        contentHash: z.string().min(8),
      }),
    ),
    priceObservations: z.array(
      workspaceOwned.extend({
        listingId: id,
        snapshotId: id,
        sourceId: id,
        observedAt: utcTimestamp,
        priceType: z.enum(["ASKING", "SOLD"]),
        condition: z.enum(["NEW", "USED", "REFURBISHED", "UNKNOWN"]),
        price: moneySchema,
        qualityStatus: z.enum(["ELIGIBLE", "EXCLUDED"]),
        exclusionReason: z.string().nullable(),
      }),
    ),
    opportunities: z.array(
      workspaceOwned.extend({
        productId: id,
        marketId: id,
        opportunityType: z.literal("RESALE"),
        status: z.literal("RESEARCHING"),
        hypothesis: z.string().min(1),
        scoreStatus: z.literal("UNCALIBRATED"),
      }),
    ),
  })
  .superRefine((dataset, context) => {
    const workspaceId = dataset.workspace.id;
    const sourceIds = new Set(dataset.dataSources.map((source) => source.id));
    const marketplaceById = new Map(
      dataset.marketplaces.map((marketplace) => [marketplace.id, marketplace]),
    );
    const marketplaceIds = new Set(
      dataset.marketplaces.map((marketplace) => marketplace.id),
    );
    const productIds = new Set(dataset.products.map((product) => product.id));
    const listingIds = new Set(dataset.listings.map((listing) => listing.id));
    const snapshotIds = new Set(
      dataset.listingSnapshots.map((snapshot) => snapshot.id),
    );
    const captureRunIds = new Set(dataset.captureRuns.map((run) => run.id));
    const captureRunById = new Map(
      dataset.captureRuns.map((run) => [run.id, run]),
    );
    const listingById = new Map(
      dataset.listings.map((listing) => [listing.id, listing]),
    );
    const snapshotById = new Map(
      dataset.listingSnapshots.map((snapshot) => [snapshot.id, snapshot]),
    );

    const ownedCollections = [
      dataset.captureRuns,
      dataset.products,
      dataset.productAliases,
      dataset.listings,
      dataset.listingSnapshots,
      dataset.priceObservations,
      dataset.opportunities,
    ];

    for (const collection of ownedCollections) {
      for (const entity of collection) {
        if (entity.workspaceId !== workspaceId) {
          context.addIssue({
            code: "custom",
            message: `la entidad ${entity.id} no pertenece al workspace DEMO`,
          });
        }
      }
    }

    const allIds = [
      dataset.workspace.id,
      dataset.market.id,
      ...dataset.dataSources.map((entity) => entity.id),
      ...dataset.marketplaces.map((entity) => entity.id),
      ...ownedCollections.flatMap((collection) =>
        collection.map((entity) => entity.id),
      ),
    ];
    const duplicateIds = allIds.filter(
      (entityId, index) => allIds.indexOf(entityId) !== index,
    );
    for (const duplicateId of new Set(duplicateIds)) {
      context.addIssue({
        code: "custom",
        message: `id duplicado: ${duplicateId}`,
      });
    }

    for (const run of dataset.captureRuns) {
      if (!sourceIds.has(run.sourceId)) {
        context.addIssue({
          code: "custom",
          message: `fuente inválida en captura: ${run.id}`,
        });
      }
    }

    for (const marketplace of dataset.marketplaces) {
      if (
        marketplace.marketId !== dataset.market.id ||
        !sourceIds.has(marketplace.dataSourceId)
      ) {
        context.addIssue({
          code: "custom",
          message: `marketplace inválido: ${marketplace.id}`,
        });
      }
    }

    for (const alias of dataset.productAliases) {
      if (!productIds.has(alias.productId) || !sourceIds.has(alias.sourceId)) {
        context.addIssue({
          code: "custom",
          message: `alias inválido: ${alias.id}`,
        });
      }
    }

    const listingIdentity = new Set<string>();
    for (const listing of dataset.listings) {
      const identity = `${listing.marketplaceId}:${listing.externalListingId}`;
      if (listingIdentity.has(identity)) {
        context.addIssue({
          code: "custom",
          message: `listing duplicado: ${identity}`,
        });
      }
      listingIdentity.add(identity);

      if (
        !marketplaceIds.has(listing.marketplaceId) ||
        !productIds.has(listing.productId)
      ) {
        context.addIssue({
          code: "custom",
          message: `referencias inválidas en listing: ${listing.id}`,
        });
      }
      if (!listing.canonicalUrl.includes("example.invalid")) {
        context.addIssue({
          code: "custom",
          message: `un dataset DEMO debe usar URLs .invalid: ${listing.id}`,
        });
      }
    }

    for (const snapshot of dataset.listingSnapshots) {
      const listing = listingById.get(snapshot.listingId);
      const run = captureRunById.get(snapshot.captureRunId);
      const marketplace = listing
        ? marketplaceById.get(listing.marketplaceId)
        : undefined;
      if (
        !listing ||
        !captureRunIds.has(snapshot.captureRunId) ||
        !run ||
        !marketplace ||
        run.sourceId !== marketplace.dataSourceId
      ) {
        context.addIssue({
          code: "custom",
          message: `snapshot inválido: ${snapshot.id}`,
        });
      }
    }

    for (const observation of dataset.priceObservations) {
      const listing = listingById.get(observation.listingId);
      const snapshot = snapshotById.get(observation.snapshotId);
      const marketplace = listing
        ? marketplaceById.get(listing.marketplaceId)
        : undefined;
      if (
        !listingIds.has(observation.listingId) ||
        !snapshotIds.has(observation.snapshotId) ||
        !sourceIds.has(observation.sourceId) ||
        !listing ||
        !snapshot ||
        !marketplace ||
        snapshot.listingId !== observation.listingId ||
        marketplace.dataSourceId !== observation.sourceId ||
        listing.condition !== observation.condition ||
        snapshot.priceType !== observation.priceType ||
        snapshot.observedAt !== observation.observedAt ||
        snapshot.price.amount !== observation.price.amount ||
        snapshot.price.currency !== observation.price.currency
      ) {
        context.addIssue({
          code: "custom",
          message: `observación inválida: ${observation.id}`,
        });
      }
      if (
        observation.qualityStatus === "EXCLUDED" &&
        !observation.exclusionReason
      ) {
        context.addIssue({
          code: "custom",
          message: `falta motivo de exclusión: ${observation.id}`,
        });
      }
    }

    for (const opportunity of dataset.opportunities) {
      if (
        !productIds.has(opportunity.productId) ||
        opportunity.marketId !== dataset.market.id
      ) {
        context.addIssue({
          code: "custom",
          message: `oportunidad inválida: ${opportunity.id}`,
        });
      }
    }
  });

export type CanonicalDataset = z.infer<typeof canonicalDatasetSchema>;
