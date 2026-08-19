---
type: roadmap
status: active
updated: 2026-08-19
---

# Roadmap

El roadmap se organiza por decisiones comerciales demostrables, no por motores aislados ni fechas arbitrarias.

## Secuencia

```text
Foundation / Concept Reconciliation
        ↓
MVP-A1 — Market Evidence
        ↓
MVP-A2 — Resale Decision
        ↓
MVP-A3 — Experimentation Lite
        ↓
MVP-B — Sourcing + Economics ampliado
        ↓
MVP-C — Replenishment + Ecosystem + Compatibility
        ↓
MVP-D — Niche + Catalog + Bundles
        ↓
Seasonality
        ↓
Learning
        ↓
Autonomous Discovery
```

Platform Access es un track de soporte: se activa antes de datos reales multiusuario, no como prerequisito del primer ciclo DEMO/manual.

## Incremento 0 — Foundation y reconciliación conceptual

**Resultado:** documentación, decisiones, contratos y shell DEMO alineados alrededor de `Opportunity`.

**Incluye:** ADR, mercado Chile/CLP, adquisición manual, esquema Foundation, fixture, validaciones, benchmark y FND-013.

**Puerta:**

- documentos de autoridad sin contradicciones críticas;
- UI no confunde mediana `ASKING` con Market Value;
- `unknown` no se muestra como cero;
- primera fuente autorizada resuelta o gate explícito;
- backlog A1 cumple Definition of Ready.

## MVP-A1 — Market Evidence

**Pregunta:** ¿qué muestran realmente los comparables?

**Incluye:** producto/publicación, normalización, observaciones, histórico, cohortes, estadísticas y `MarketPriceEstimate`.

**Puerta:** F-01 de [[PRD]] funciona con DEMO y carga manual trazable; `ASKING/SOLD`, condición, variante, moneda y fecha permanecen separados; suficiencia y exclusiones son visibles.

## MVP-A2 — Resale Decision

**Pregunta:** ¿conviene comprar y cuánto puedo pagar?

**Incluye:** `PricingRecommendation`, `MaximumBuyPrice`, Economics Core, liquidez/proxy, riesgo, score no calibrado, confianza, cobertura, gates y recomendación humana.

**Puerta:** F-02 produce cálculo o `unknown` explicado para cada salida; ningún dato insuficiente se inventa; la decisión puede investigar, descartar o preseleccionar.

## MVP-A3 — Experimentation Lite

**Pregunta:** ¿funcionó la hipótesis bajo límites definidos?

**Incluye:** predicción congelada, cantidad, capital/loss limit, duración, criterios, aprobación, observaciones y resultado.

**Puerta:** primer experimento cerrado como `VALIDATED`, `REJECTED` o `INCONCLUSIVE`, comparado con benchmark y sin automatizar capital.

## MVP-B — Sourcing + Economics ampliado

**Pregunta:** ¿dónde comprar y cuál es el costo total?

**Incluye:** proveedores, ofertas, MOQ, lead time, shipping, impuestos, aduana, landed cost, sensibilidad y rutas de abastecimiento.

**Habilita:** `IMPORT` y `ARBITRAGE` después de modelar matching, monedas y rutas.

**Puerta:** escenarios base/adverso reproducibles y riesgos críticos visibles.

## MVP-C — Replenishment + Ecosystem + Compatibility

**Pregunta:** ¿puede construirse recurrencia y profundidad de catálogo?

**Incluye:** clasificación de consumible, ciclo de reemplazo, `ProductEcosystem`, base instalada/proxy, Compatibility y ProductRelationship v1.

**Puerta:** una oportunidad `REPLENISHMENT` explica recurrencia, compatibilidad, economía y confianza con evidencia suficiente.

## MVP-D — Niche + Catalog + Bundles

**Pregunta:** ¿en qué mercado entrar y qué conjunto vender?

**Incluye:** sujetos `NICHE` y `PRODUCT_SET`, NicheScore, profundidad de SKU, catalog expansion, cross-sell y bundles.

**Puerta:** al menos un nicho produce hipótesis, evidencia, productos iniciales y experimento; no depende de agentes autónomos.

## Seasonality

**Pregunta:** ¿cuándo vender y cuándo preparar inventario?

Se activa sólo con histórico, baseline y cobertura suficientes según [[SEASONALITY]]. No bloquea MVP-A.

## Learning

**Pregunta:** ¿dónde se equivocan sistemáticamente las predicciones?

Incluye cohortes, análisis de error, backtesting, calibración y nuevas versiones. Requiere resultados reales suficientes; no ajusta pesos caso a caso.

## Autonomous Discovery

Agentes supervisados proponen oportunidades después de que el flujo asistido tenga contratos, evaluaciones y límites de autoridad estables.

## Track Platform Access

Conserva workspaces, Supabase Auth y RLS como arquitectura objetivo. Se activa antes de incorporar datos reales de varios usuarios o colaboración. Ver [[ADR-008]].

## Indicadores por horizonte

| Horizonte | Indicador dominante |
|---|---|
| Foundation | coherencia y reproducibilidad |
| A1 | calidad/cobertura de evidencia |
| A2 | utilidad y explicabilidad de decisión |
| A3 | resultado frente a predicción |
| B/C/D | oportunidades evaluables por estrategia |
| Seasonality | error de timing/peak |
| Learning | calibración fuera de muestra |
| Negocio | capital en oportunidades rentables validadas |

## Revisión

Cambiar secuencia, puertas o perfil activo requiere changelog y ADR cuando afecte alcance o arquitectura.
