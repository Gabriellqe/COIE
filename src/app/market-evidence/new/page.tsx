import { randomUUID } from "node:crypto";
import Link from "next/link";
import { ManualEvidenceForm } from "@/app/market-evidence/new/manual-evidence-form";
import { jsonDemoEvidenceStore } from "@/infrastructure/persistence/json-demo-evidence-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function NewMarketEvidencePage() {
  const snapshot = await jsonDemoEvidenceStore.read();
  const products = snapshot.dataset.products.map((product) => ({
    id: product.id,
    name: product.canonicalName,
  }));
  const marketplaces = snapshot.dataset.marketplaces.map((marketplace) => ({
    id: marketplace.id,
    name: marketplace.name,
  }));

  return (
    <main className="form-page">
      <div className="form-shell">
        <Link className="back-link" href="/">
          ← Volver al dashboard
        </Link>
        <p className="eyebrow">MVP-A1 · carga estructurada</p>
        <h1>Agregar evidencia manual</h1>
        <div className="demo-banner" role="status">
          <strong>CARGA MANUAL DEMO</strong>
          <span>
            No consulta marketplaces ni guarda evidencia comercial real. Este
            almacén funciona sólo en tu desarrollo local.
          </span>
        </div>
        <section className="form-panel">
          <ManualEvidenceForm
            idempotencyKey={randomUUID()}
            marketplaces={marketplaces}
            observedAt={new Date().toISOString()}
            products={products}
          />
        </section>
      </div>
    </main>
  );
}
