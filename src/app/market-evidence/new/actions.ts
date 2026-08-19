"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ImportManualMarketEvidence } from "@/application/commands/import-manual-market-evidence";
import { manualMarketEvidenceInputSchema } from "@/contracts/manual-market-evidence.schema";
import { jsonDemoEvidenceStore } from "@/infrastructure/persistence/json-demo-evidence-store";

const importer = new ImportManualMarketEvidence(jsonDemoEvidenceStore);

export async function createManualDemoEvidence(
  _previousState: unknown,
  formData: FormData,
) {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.COIE_DEMO_MANUAL_ENTRY_ENABLED !== "true"
  ) {
    return {
      ok: false as const,
      message: "La carga DEMO está deshabilitada fuera del desarrollo local.",
      fieldErrors: {},
    };
  }

  const parsed = manualMarketEvidenceInputSchema.safeParse({
    idempotencyKey: formData.get("idempotencyKey"),
    productId: formData.get("productId"),
    marketplaceId: formData.get("marketplaceId"),
    externalListingId: formData.get("externalListingId"),
    canonicalUrl: formData.get("canonicalUrl"),
    rawTitle: formData.get("rawTitle"),
    sellerExternalId: formData.get("sellerExternalId"),
    condition: formData.get("condition"),
    amount: formData.get("amount"),
    observedAt: formData.get("observedAt"),
  });
  if (!parsed.success) {
    return {
      ok: false as const,
      message: "Revisa los campos indicados.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  let destination: string;
  try {
    const result = await importer.execute(parsed.data);
    const outcome = result.receipt.outcome.toLowerCase();
    revalidatePath("/");
    revalidatePath(`/opportunities/${result.opportunityId}`);
    destination = `/opportunities/${result.opportunityId}?manualEvidence=${outcome}`;
  } catch (error) {
    const knownMessages = [
      "La identidad del listing entra en conflicto con su registro previo.",
      "Ya existe otra observación para el mismo listing e instante.",
      "La fecha observada no puede estar en el futuro.",
      "La clave idempotente ya fue utilizada con otro contenido.",
      "El producto no pertenece a una oportunidad DEMO.",
      "Marketplace fuera del mercado DEMO permitido.",
    ];
    const message =
      error instanceof Error && knownMessages.includes(error.message)
        ? error.message
        : "No se pudo guardar la evidencia DEMO. Inténtalo nuevamente.";
    return { ok: false as const, message, fieldErrors: {} };
  }
  redirect(destination);
}
