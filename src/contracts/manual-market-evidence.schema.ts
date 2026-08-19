import { z } from "zod";

const demoUrl = z
  .url("Debe ser una URL válida")
  .max(500)
  .refine((value) => new URL(value).hostname === "example.invalid", {
    message: "La carga DEMO sólo acepta el host example.invalid",
  });

export const manualMarketEvidenceInputSchema = z.object({
  idempotencyKey: z.uuid(),
  productId: z.string().min(1).max(120),
  marketplaceId: z.string().min(1).max(120),
  externalListingId: z.string().trim().min(3).max(120),
  canonicalUrl: demoUrl,
  rawTitle: z
    .string()
    .trim()
    .min(5)
    .max(240)
    .refine((value) => /demo/i.test(value), {
      message: "El título debe indicar visiblemente que es DEMO",
    }),
  sellerExternalId: z.string().trim().min(1).max(120),
  condition: z.enum(["NEW", "USED", "REFURBISHED", "UNKNOWN"]),
  amount: z
    .string()
    .trim()
    .regex(/^[1-9]\d*$/, "CLP debe ser un entero positivo")
    .refine(
      (value) =>
        !/^[1-9]\d*$/.test(value) ||
        BigInt(value) <= BigInt(Number.MAX_SAFE_INTEGER),
      { message: "El monto excede el rango seguro" },
    ),
  observedAt: z.iso.datetime({
    offset: false,
    message: "Debe ser un timestamp ISO 8601 UTC terminado en Z",
  }),
});

export type ManualMarketEvidenceInput = z.infer<
  typeof manualMarketEvidenceInputSchema
>;

export const trustedDemoContext = {
  workspaceId: "ws-demo-personal",
  marketId: "market-cl",
  evidenceMode: "DEMO",
  method: "MANUAL_USER_ENTRY",
  priceType: "ASKING",
  currency: "CLP",
} as const;
