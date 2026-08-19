"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createManualDemoEvidence } from "@/app/market-evidence/new/actions";

type Option = { id: string; name: string };
type FormState = {
  ok: false;
  message: string;
  fieldErrors: Record<string, string[] | undefined>;
} | null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="primary-button" disabled={pending} type="submit">
      {pending ? "Guardando evidencia…" : "Guardar evidencia DEMO"}
    </button>
  );
}

export function ManualEvidenceForm({
  products,
  marketplaces,
  idempotencyKey,
  observedAt,
}: {
  products: Option[];
  marketplaces: Option[];
  idempotencyKey: string;
  observedAt: string;
}) {
  const [state, action] = useActionState<FormState, FormData>(
    createManualDemoEvidence,
    null,
  );
  const errorFor = (field: string) => state?.fieldErrors[field]?.[0];

  return (
    <form action={action} className="evidence-form">
      <input name="idempotencyKey" type="hidden" value={idempotencyKey} />
      {state && (
        <div className="form-error" role="alert">
          {state.message}
        </div>
      )}

      <div className="form-grid">
        <label>
          Producto DEMO
          <select name="productId" required>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
          {errorFor("productId") && <small>{errorFor("productId")}</small>}
        </label>

        <label>
          Marketplace de procedencia
          <select name="marketplaceId" required>
            {marketplaces.map((marketplace) => (
              <option key={marketplace.id} value={marketplace.id}>
                {marketplace.name}
              </option>
            ))}
          </select>
          {errorFor("marketplaceId") && (
            <small>{errorFor("marketplaceId")}</small>
          )}
        </label>

        <label>
          ID externo ficticio
          <input
            name="externalListingId"
            placeholder="DEMO-MANUAL-001"
            required
          />
          {errorFor("externalListingId") && (
            <small>{errorFor("externalListingId")}</small>
          )}
        </label>

        <label>
          Condición observada
          <select defaultValue="USED" name="condition" required>
            <option value="USED">Usado</option>
            <option value="NEW">Nuevo</option>
            <option value="REFURBISHED">Reacondicionado</option>
            <option value="UNKNOWN">Desconocida</option>
          </select>
          {errorFor("condition") && <small>{errorFor("condition")}</small>}
        </label>

        <label className="form-span-2">
          URL ficticia
          <input
            defaultValue="https://example.invalid/manual/DEMO-MANUAL-001"
            name="canonicalUrl"
            required
            type="url"
          />
          <span>Sólo se acepta el host exacto example.invalid.</span>
          {errorFor("canonicalUrl") && (
            <small>{errorFor("canonicalUrl")}</small>
          )}
        </label>

        <label className="form-span-2">
          Título original ficticio
          <input
            name="rawTitle"
            placeholder="Espejo izquierdo NK150 usado DEMO"
            required
          />
          <span>Debe contener la etiqueta DEMO.</span>
          {errorFor("rawTitle") && <small>{errorFor("rawTitle")}</small>}
        </label>

        <label>
          ID o alias del vendedor
          <input defaultValue="UNKNOWN" name="sellerExternalId" required />
          <span>Usa UNKNOWN si la fuente no lo informa.</span>
          {errorFor("sellerExternalId") && (
            <small>{errorFor("sellerExternalId")}</small>
          )}
        </label>

        <label>
          Precio pedido CLP
          <input
            inputMode="numeric"
            min="1"
            name="amount"
            placeholder="49000"
            required
            step="1"
            type="number"
          />
          {errorFor("amount") && <small>{errorFor("amount")}</small>}
        </label>

        <label>
          Observado en UTC
          <input defaultValue={observedAt} name="observedAt" required />
          <span>Formato ISO 8601 terminado en Z.</span>
          {errorFor("observedAt") && <small>{errorFor("observedAt")}</small>}
        </label>
      </div>

      <div className="fixed-contract">
        <strong>Contrato fijo del servidor</strong>
        <span>
          DEMO · MANUAL_USER_ENTRY · ASKING · CLP · workspace personal
        </span>
      </div>

      <div className="form-actions">
        <Link className="secondary-button" href="/">
          Cancelar
        </Link>
        <SubmitButton />
      </div>
    </form>
  );
}
