import Link from "next/link";
import { listOpportunities } from "@/application/queries/list-opportunities";
import { demoOpportunityRepository } from "@/infrastructure/repositories/demo-opportunity-repository";

const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export default async function DashboardPage() {
  const opportunities = await listOpportunities(demoOpportunityRepository);
  const medianAskingPrice = opportunities.at(0)?.medianAskingPrice;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">COIE</div>
        <nav aria-label="Navegación principal">
          <a className="nav-item" href="#resumen">
            <span>⌂</span> Resumen
          </a>
          <a className="nav-item active" href="#oportunidades">
            <span>↗</span> Oportunidades
          </a>
          <a className="nav-item" href="#productos">
            <span>◇</span> Productos
          </a>
          <a className="nav-item" href="#observaciones">
            <span>≡</span> Observaciones
          </a>
          <a className="nav-item" href="#experimentos">
            <span>△</span> Experimentos
          </a>
        </nav>
        <div className="sidebar-footer">Sprint 0 · Foundation</div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Dashboard operativo A</p>
            <h1>Oportunidades de reventa</h1>
          </div>
          <div className="user-chip" aria-label="Espacio demostrativo">
            <span className="avatar">GD</span>
            <span>Espacio DEMO</span>
          </div>
        </header>

        <div className="demo-banner" role="status">
          <strong>DATOS DEMO</strong>
          <span>
            Este entorno valida contratos y experiencia; no contiene evidencia
            comercial real.
          </span>
        </div>

        <div className="filter-row" aria-label="Contexto del análisis">
          <span className="filter-chip">Moto · NK150</span>
          <span className="filter-chip">Chile</span>
          <span className="filter-chip">CLP</span>
          <span className="filter-chip">RESALE</span>
        </div>

        <section className="kpi-grid" aria-label="Resumen">
          <article className="kpi-card">
            <span className="kpi-label">Oportunidades</span>
            <strong>{opportunities.length}</strong>
            <small>fixture activo</small>
          </article>
          <article className="kpi-card">
            <span className="kpi-label">Mediana ASKING</span>
            <strong>
              {medianAskingPrice === undefined
                ? "—"
                : clp.format(medianAskingPrice)}
            </strong>
            <small>usado · precio pedido · no es Market Value</small>
          </article>
          <article className="kpi-card caution">
            <span className="kpi-label">Score</span>
            <strong>—</strong>
            <small>sin calibrar</small>
          </article>
          <article className="kpi-card caution">
            <span className="kpi-label">Requieren revisión</span>
            <strong>{opportunities.length}</strong>
            <small>compatibilidad no verificada</small>
          </article>
        </section>

        <section className="panel" id="oportunidades">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Primer incremento</p>
              <h2>Oportunidades</h2>
            </div>
            <span className="muted">Ordenado por evidencia disponible</span>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Tipo</th>
                  <th>Mediana de precios pedidos</th>
                  <th>Muestra</th>
                  <th>Score</th>
                  <th>Estado</th>
                  <th aria-label="Abrir" />
                </tr>
              </thead>
              <tbody>
                {opportunities.map((opportunity) => (
                  <tr key={opportunity.id}>
                    <td>
                      <strong>{opportunity.productName}</strong>
                      <small className="table-subtitle">
                        Compatibilidad pendiente
                      </small>
                    </td>
                    <td>{opportunity.type}</td>
                    <td>{clp.format(opportunity.medianAskingPrice)}</td>
                    <td>{opportunity.sampleSize} comparables</td>
                    <td>
                      <span className="status neutral">No calibrado</span>
                    </td>
                    <td>
                      <span className="status warning">Investigando</span>
                    </td>
                    <td>
                      <Link
                        className="row-link"
                        href={`/opportunities/${opportunity.id}`}
                      >
                        Ver detalle <span aria-hidden>→</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}
