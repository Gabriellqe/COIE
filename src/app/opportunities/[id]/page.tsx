import Link from "next/link";
import { notFound } from "next/navigation";
import { getOpportunityDetail } from "@/application/queries/get-opportunity-detail";
import type { ComparableExclusionReason } from "@/domain/comparable-cohort";
import { demoOpportunityRepository } from "@/infrastructure/repositories/demo-opportunity-repository";

const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});
const dateTime = new Intl.DateTimeFormat("es-CL", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Santiago",
});
const exclusionLabels: Record<ComparableExclusionReason, string> = {
  AFTER_CUTOFF: "Posterior a la fecha de corte",
  BEFORE_WINDOW: "Anterior a la ventana",
  SUPERSEDED: "Reemplazada por una observación más reciente",
  CONDITION_UNKNOWN: "Condición desconocida",
  CONDITION_MISMATCH: "Condición incompatible",
  PRICE_TYPE_MISMATCH: "Tipo de precio incompatible",
  CURRENCY_MISMATCH: "Moneda incompatible",
  QUALITY_EXCLUDED: "Excluida por calidad",
};

function formatClp(value: number | null): string {
  return value === null ? "—" : clp.format(value);
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opportunity = await getOpportunityDetail(demoOpportunityRepository, id);
  if (!opportunity) notFound();

  const estimate = opportunity.marketPriceEstimate;
  const statistics = estimate.statistics;
  const canRenderRange =
    statistics.minimum !== null && statistics.maximum !== null;
  const chartMinimum = canRenderRange
    ? Math.max(statistics.minimum! - 5000, 0)
    : 0;
  const chartSpan = canRenderRange
    ? statistics.maximum! - chartMinimum || 1
    : 1;
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
          <a href="#evidencia">Evidencia</a>
          <a href="#exclusiones">Exclusiones</a>
          <a href="#faltantes">Faltantes</a>
        </nav>
        <span className="avatar">GD</span>
      </header>

      <div className="detail-content">
        <Link className="back-link" href="/">
          ← Volver a oportunidades
        </Link>
        <div className="detail-title-row">
          <div>
            <p className="eyebrow">MVP-A1 · Market Evidence</p>
            <h1>Evidencia de precios observados</h1>
          </div>
          <span className="demo-pill">DATOS DEMO</span>
        </div>

        <div className="filter-row">
          <span className="filter-chip">Chile</span>
          <span className="filter-chip">CLP</span>
          <span className="filter-chip">USED</span>
          <span className="filter-chip">ASKING</span>
          <span className="filter-chip">NK150 · no verificado</span>
        </div>

        <section className="analysis-grid">
          <article className="hero-analysis-card">
            <span
              className={`status ${estimate.status === "CALCULATED" ? "research" : "warning"}`}
            >
              {estimate.status === "CALCULATED"
                ? "Cohorte calculada"
                : "Datos insuficientes"}
            </span>
            <h2>{opportunity.productName}</h2>
            <div className="metric-columns">
              <div>
                <span>Estimación central ASKING</span>
                <strong>{formatClp(estimate.centralEstimate)}</strong>
                <small>No es precio realizable ni recomendación</small>
              </div>
              <div>
                <span>Muestra</span>
                <strong>{estimate.sampleSize}</strong>
                <small>
                  Mínimo configurado: {estimate.minimumComparableCount}
                </small>
              </div>
              <div>
                <span>Confianza</span>
                <strong>—</strong>
                <small>No evaluada</small>
              </div>
            </div>
          </article>

          <article className="chart-card">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">USED · ASKING · CLP</p>
                <h2>Distribución observada</h2>
              </div>
              <span className="muted">{estimate.calculationVersion}</span>
            </div>
            {canRenderRange ? (
              <>
                <div
                  className="range-chart"
                  aria-label="Rango de precios comparables"
                >
                  <div className="range-line" />
                  {opportunity.evidenceObservations.map((observation) => (
                    <span
                      className="range-marker"
                      key={observation.observationId}
                      style={{ left: markerPosition(observation.amount) }}
                      title={clp.format(observation.amount)}
                    />
                  ))}
                </div>
                <div className="range-labels">
                  <span>{formatClp(statistics.minimum)}</span>
                  <strong>Mediana: {formatClp(statistics.median)}</strong>
                  <span>{formatClp(statistics.maximum)}</span>
                </div>
              </>
            ) : (
              <div className="empty-evidence">
                No existen observaciones elegibles para esta cohorte.
              </div>
            )}
            <p className="chart-note">
              IQR: {formatClp(statistics.iqr)} · método{" "}
              {statistics.methodVersion}
            </p>
          </article>
        </section>

        <section className="detail-lower-grid">
          <article className="panel">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Cohorte versionada</p>
                <h2>Definición y suficiencia</h2>
              </div>
            </div>
            <p className="hypothesis">{opportunity.hypothesis}</p>
            <dl className="stat-list">
              <div>
                <dt>Media observada</dt>
                <dd>{formatClp(statistics.mean)}</dd>
              </div>
              <div>
                <dt>Rango</dt>
                <dd>{formatClp(statistics.range)}</dd>
              </div>
              <div>
                <dt>Q1 / Q3</dt>
                <dd>
                  {formatClp(statistics.q1)} / {formatClp(statistics.q3)}
                </dd>
              </div>
              <div>
                <dt>Fecha de corte</dt>
                <dd>{dateTime.format(new Date(estimate.asOf))}</dd>
              </div>
              <div>
                <dt>Histórico preservado</dt>
                <dd>{opportunity.historicalSnapshotCount} snapshots</dd>
              </div>
              <div>
                <dt>Modo</dt>
                <dd>{estimate.evidenceMode}</dd>
              </div>
            </dl>
          </article>

          <article className="panel" id="evidencia">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Procedencia exacta</p>
                <h2>Inputs incluidos</h2>
              </div>
            </div>
            <div className="evidence-summary">
              <div>
                <strong>{estimate.coverage.sourceCount}</strong>
                <span>fuentes utilizadas</span>
              </div>
              <div>
                <strong>{estimate.coverage.includedCount}</strong>
                <span>observaciones incluidas</span>
              </div>
              <div>
                <strong>{estimate.coverage.excludedCount}</strong>
                <span>exclusiones explicadas</span>
              </div>
            </div>
            <div className="evidence-table-wrap">
              <table className="evidence-table">
                <thead>
                  <tr>
                    <th>Publicación</th>
                    <th>Fuente / método</th>
                    <th>Observada</th>
                    <th>Precio pedido</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunity.evidenceObservations.map((observation) => (
                    <tr key={observation.observationId}>
                      <td>{observation.title}</td>
                      <td>
                        {observation.sourceName}
                        <small className="table-subtitle">
                          {observation.method}
                        </small>
                      </td>
                      <td>
                        {dateTime.format(new Date(observation.observedAt))}
                      </td>
                      <td>{clp.format(observation.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="source-list">
              {opportunity.evidenceSources.map((source) => (
                <li key={source.id}>
                  <span>{source.name}</span>
                  <em>Pendiente revisión de acceso</em>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="detail-lower-grid evidence-secondary-grid">
          <article className="panel" id="exclusiones">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Auditoría de cohorte</p>
                <h2>Exclusiones</h2>
              </div>
            </div>
            <ul className="exclusion-list">
              {opportunity.exclusions.map((exclusion) => (
                <li key={exclusion.observationId}>
                  <div>
                    <strong>{exclusionLabels[exclusion.reason]}</strong>
                    <span>{exclusion.observationId}</span>
                  </div>
                  {exclusion.detail && <em>{exclusion.detail}</em>}
                </li>
              ))}
            </ul>
          </article>

          <article className="panel" id="faltantes">
            <div className="panel-heading compact">
              <div>
                <p className="eyebrow">Límites del incremento</p>
                <h2>No calculado</h2>
              </div>
            </div>
            <div className="missing-box">
              <strong>Decisiones comerciales pendientes</strong>
              <ul>
                <li>Valor realizable: sin evidencia suficiente</li>
                <li>Quick, Target y Premium: pertenecen a MVP-A2</li>
                <li>Maximum Buy y economía: pertenecen a MVP-A2</li>
                <li>Liquidez/velocidad: sin ventas o proxy acordado</li>
                <li>Compatibilidad NK150: no verificada</li>
              </ul>
            </div>
            <p className="confidence-note">{estimate.confidenceReason}</p>
          </article>
        </section>
      </div>
    </main>
  );
}
