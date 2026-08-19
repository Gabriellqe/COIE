---
type: product-spec
status: accepted
version: 0.3
updated: 2026-08-19
---

# Estrategias y sujetos de oportunidad

## Distinción obligatoria

Una estrategia describe **cómo se pretende capturar valor**. Un sujeto describe **qué se analiza**. Price Intelligence, Pricing, Sourcing y Seasonality son capacidades que aportan evidencia; no son estrategias.

## Estrategias

| Strategy | Subjects objetivo | Valor buscado | Estado |
|---|---|---|---|
| `RESALE` | `PRODUCT`, `LISTING` | compra bajo valor realizable y reventa | MVP-A |
| `REPLENISHMENT` | `PRODUCT` | demanda recurrente compatible | MVP-C |
| `IMPORT` | `PRODUCT`, `SUPPLY_ROUTE` | margen después de landed cost | futuro |
| `ARBITRAGE` | `PRODUCT`, `SUPPLY_ROUTE` | brecha sostenible entre mercados | futuro |
| `NICHE_DISCOVERY` | `NICHE` | mercado atractivo y extensible | MVP-D |
| `CATALOG_EXPANSION` | `PRODUCT`, `PRODUCT_SET` | venta incremental/cross-sell | MVP-D |
| `BUNDLE_OPPORTUNITY` | `PRODUCT_SET` | mayor valor, conversión o margen | MVP-D |

## Sujetos

- `PRODUCT`: identidad/variante canónica.
- `LISTING`: publicación concreta con condición, vendedor y precio.
- `NICHE`: segmento comercial en un mercado.
- `SUPPLY_ROUTE`: producto + origen + destino + abastecimiento/logística.
- `PRODUCT_SET`: conjunto explícito para bundle o catálogo.

## Reglas comunes

Toda oportunidad define:

- estrategia, sujeto, mercado y fecha;
- hipótesis falsable;
- evidencia a favor/en contra;
- economía y capital requerido cuando corresponda;
- score, riesgo, confianza, cobertura y gates;
- siguiente acción o experimento mínimo.

## Perfil MVP-A

El esquema Foundation implementa `RESALE + PRODUCT` y utiliza publicaciones como evidencia. `LISTING` como sujeto nativo y los demás sujetos requieren una versión futura del contrato.

### Inputs mínimos Resale

- publicación/precio/condición de compra;
- referencias comparables por cohorte;
- costos de adquisición, reparación, venta y entrega;
- evidencia o proxy de liquidez;
- contribución objetivo y reservas;
- riesgo de defecto, fraude, devolución y tiempo.

La diferencia entre precio pedido, precio vendido, recomendación y precio máximo de compra es explícita según [[PRICING_MODEL]].

## Replenishment futuro

Requiere producto base/ecosistema, intervalo de reposición, compatibilidad, base instalada o proxy, competencia, abastecimiento, economía y logística. No se presume demanda cautiva sin evidencia.

## Separación de oportunidades

El mismo producto puede originar oportunidades diferentes por estrategia, mercado, publicación, ruta o hipótesis. Cada una conserva estado, cálculos, score, evidencia y experimento independientes.

## Referencias

- [[ADR-006]]
- [[OPPORTUNITY_MODEL]]
- [[PRODUCT_VISION]]
- [[PRD]]
- [[SCORING_MODEL]]
