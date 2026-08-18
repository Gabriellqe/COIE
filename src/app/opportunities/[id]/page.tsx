import Link from "next/link";
import { notFound } from "next/navigation";
import { getOpportunityDetail } from "@/application/queries/get-opportunity-detail";
import { demoOpportunityRepository } from "@/infrastructure/repositories/demo-opportunity-repository";

const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opportunity = await getOpportunityDetail(demoOpportunityRepository, id);
  if (!opportunity) notFound();

  const chartMinimum = Math.max(opportunity.statistics.minimum - 5000, 0);
  const chartSpan = opportunity.statistics.maximum - chartMinimum || 1;
  const markerPosition = (value: number) =>
    `${((value - chartMinimum) / chartSpan) * 100}%`;

  return (
    <main className="detail-page">
      <header className="detail-topbar">
        <Link className="brand dark" href="/">
          COIE
        </Link>
        <nav>
          <Link href="/">Panel</Link>
          <a href="#evidencia">Investigaciones</a>
          <a href="#experimentos">Experimentos</a>
          <a href="#configuracion">Configuración</a>
        </nav>
        <span className="avatar">GD</span>
      </header>

      <div className="detail-content">
        <Link className="back-link" href="/">
          ← Volver a oportunidades
        </Link>
        <div className="detail-title-row">
          <div>
            <p className="eyebrow">Detalle analítico B</p>
            <h1>Inteligencia de oportunidad</h1>
          </div>
          <span className="demo-pill">DATOS DEMO</span>
        </div>

        <div className="filter-row">
          <span className="filter-chip">Chile</span>
          <span className="filter-chip">CLP</span>
          <span className="filter-chip">RESALE</span>
          <span className="filter-chip">NK150 · no verificado</span>
        </div>

        <section className="analysis-grid">
          <article className="hero-analysis-card">
            <span className="status research">Investigando</span>
            <h2>{opportunity.productName}</h2>
            <div className="metric-columns">
              <div>
                <span>Score</span>
                <strong>—</strong>
                <small>No calibrado</small>
              </div>
              <div>
                <span>Mediana</span>
                <strong>{clp.format(opportunity.statistics.median)}</strong>
                <small>{opportunity.statistics.sampleSize} comparables</small>
              </div>
              <div>
                <span>Confianza</span>
                <strong>—</strong>
                <small>Pendiente</small>
              </div>
            </div>
          </article>

          <article className="chart-card">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">USED · ASKING · CLP</p>
                <h2>Precio observado</h2>
              </div>
              <span className="muted">
                {opportunity.statistics.methodVersion}
              </span>
            </div>
            <div
              className="range-chart"
              aria-label="Rango de precios comparables"
            >
              <div className="range-line" />
              {opportunity.statistics.values.map((value) => (
                <span
                  className="range-marker"
                  key={value}
                  style={{ left: markerPosition(value) }}
                  title={clp.format(value)}
                />
              ))}
            </div>
            <div className="range-labels">
              <span>{clp.format(opportunity.statistics.minimum)}</span>
              <strong>
                Mediana: {clp.format(opportunity.statistics.median)}
              </strong>
              <span>{clp.format(opportunity.statistics.maximum)}</span>
            </div>
            <p className="chart-note">
              Muestra pequeña: no se excluyen outliers automáticamente.
            </p>
          </article>
        </section>

        <section className="detail-lower-grid">
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Hipótesis</p>
                <h2>Qué estamos evaluando</h2>
              </div>
            </div>
            <p className="hypothesis">{opportunity.hypothesis}</p>
            <dl className="stat-list">
              <div>
                <dt>Media</dt>
                <dd>{clp.format(opportunity.statistics.mean)}</dd>
              </div>
              <div>
                <dt>Rango</dt>
                <dd>{clp.format(opportunity.statistics.range)}</dd>
              </div>
              <div>
                <dt>Histórico preservado</dt>
                <dd>{opportunity.dataset.listingSnapshots.length} snapshots</dd>
              </div>
            </dl>
          </article>

          <article className="panel" id="evidencia">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Calidad de evidencia</p>
                <h2>Procedencia y faltantes</h2>
              </div>
            </div>
            <div className="evidence-summary">
              <div>
                <strong>{opportunity.sources.length}</strong>
                <span>fuentes candidatas</span>
              </div>
              <div>
                <strong>{opportunity.excludedObservations}</strong>
                <span>observación excluida</span>
              </div>
              <div>
                <strong>{opportunity.statistics.sampleSize}</strong>
                <span>comparables actuales</span>
              </div>
            </div>
            <ul className="source-list">
              {opportunity.sources.map((source) => (
                <li key={source}>
                  <span>{source}</span>
                  <em>Pendiente revisión de acceso</em>
                </li>
              ))}
            </ul>
            <div className="missing-box">
              <strong>Datos faltantes</strong>
              <ul>
                <li>Compatibilidad real de la pieza</li>
                <li>Costos de compra y venta</li>
                <li>Evidencia de venta confirmada suficiente</li>
              </ul>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
