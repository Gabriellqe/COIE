---
type: prd
status: draft
version: 0.3
updated: 2026-08-19
---

# Product Requirements Document — MVP-A Resale Decision

## 1. Objetivo

Demostrar que COIE puede transformar una publicación o producto usado en una decisión `RESALE` trazable y comprobable:

```text
evidencia de mercado
→ escenarios de venta
→ precio máximo de compra
→ economía/riesgo/confianza
→ decisión humana
→ prueba acotada
→ resultado y aprendizaje
```

El perfil inicial se valida en Chile/CLP con un caso asociado a NK150. Esto no restringe el modelo objetivo a un país o categoría.

## 2. Alcance incremental

### MVP-A1 — Market Evidence

- entrada manual por URL o identificación de producto;
- producto, publicación, condición y variante;
- observaciones históricas trazables;
- cohorte comparable por mercado, condición, moneda, `ASKING/SOLD` y fecha de corte;
- estadísticas y estado de suficiencia.

### MVP-A2 — Resale Decision

- `MarketPriceEstimate`;
- `PricingRecommendation` con escenarios disponibles;
- `MaximumBuyPrice` o gate por información insuficiente;
- Economics Core con costos manuales;
- demanda/liquidez mediante señales o proxies explícitos;
- riesgo, score no calibrado, confianza, cobertura y recomendación humana.

### MVP-A3 — Experimentation Lite

- hipótesis y predicciones congeladas;
- capital, cantidad, período, éxito y stop conditions;
- observaciones manuales de resultado;
- `VALIDATED`, `REJECTED` o `INCONCLUSIVE`;
- retorno a investigación mediante `MODIFY` cuando corresponda.

## 3. Entradas y salidas

### Entrada MVP-A

- URL o datos estructurados de una publicación;
- producto + marca/modelo/variante;
- precio de compra real o hipotético;
- costos conocidos y objetivo económico.

Categoría, búsqueda y nicho permanecen como entradas futuras de Discovery; no pertenecen a F-01 de MVP-A.

### Salida

```text
Opportunity
Strategy / Subject
Comparable Cohort
MarketPriceEstimate
PricingRecommendation: Quick / Target / Premium (si existe evidencia)
MaximumBuyPrice (si existen inputs suficientes)
Contribution / ROI (si existen inputs suficientes)
Liquidity Estimate / Proxy
RiskScore
OpportunityScore (UNCALIBRATED inicialmente)
Confidence / Coverage / Gates
Recommendation / Next Action
Evidence Summary
```

Una salida sin evidencia suficiente se muestra como `unknown/not computed` con motivo; nunca como cero.

## 4. Requisitos funcionales

| ID | Requisito | Incremento | Prioridad |
|---|---|---|---|
| RF-001 | Crear/reutilizar producto y publicación desde nombre, URL o datos manuales. | A1 | P0 |
| RF-002 | Registrar publicación con fuente, método, URL, vendedor, precio, moneda, condición y fecha. | A1 | P0 |
| RF-003 | Agregar observaciones sin sobrescribir histórico. | A1 | P0 |
| RF-004 | Normalizar referencias equivalentes conservando evidencia original y confianza. | A1 | P0 |
| RF-005 | Calcular muestra, media, mediana, mínimo, máximo y dispersión por cohorte elegible. | A1 | P0 |
| RF-006 | Separar condición, variante, moneda y `ASKING/SOLD`; explicar exclusiones/outliers. | A1 | P0 |
| RF-020 | Crear `MarketPriceEstimate` versionado con fecha, inputs, confianza y cobertura. | A1 | P0 |
| RF-021 | Producir escenarios `QUICK/TARGET/PREMIUM` sólo con evidencia suficiente o estado desconocido explicado. | A2 | P0 |
| RF-022 | Calcular `MaximumBuyPrice` con costos, contribución requerida y reservas, o activar gate. | A2 | P0 |
| RF-023 | Estimar liquidez/velocidad con señal observable o proxy etiquetado. | A2 | P0 |
| RF-009 | Calcular acquisition/landed cost, contribución, margen y ROI con supuestos visibles. | A2 | P0 |
| RF-010 | Calcular score, riesgo, confianza, cobertura y gates conforme a [[SCORING_MODEL]]. | A2 | P0 |
| RF-011 | Explicar recomendación, factores, datos faltantes y siguiente acción. | A2 | P0 |
| RF-012 | Mantener estados y transiciones auditables de la oportunidad. | A2 | P0 |
| RF-013 | Crear y aprobar un experimento Lite desde una oportunidad `SHORTLISTED`. | A3 | P0 |
| RF-014 | Registrar predicción, resultado y error de demanda, margen y velocidad. | A3 | P0 |
| RF-007 | Estimar demanda y competencia con señales disponibles e indicar cobertura. | A2 | P1 |
| RF-008 | Comparar proveedor, MOQ, shipping, impuestos, aduana y lead time. | MVP-B | P1 |
| RF-016 | Listar y ordenar oportunidades en dashboard funcional. | posterior A2 | P1 |
| RF-017 | Filtrar por estrategia, estado, score, riesgo y vigencia. | posterior A2 | P1 |
| RF-018 | Conservar log de estados y versiones de cálculos/scores. | A2/A3 | P1 |
| RF-015 | Modelar reposición, ecosistemas y compatibilidad. | MVP-C | P2 |
| RF-019 | Autenticar usuarios y aplicar aislamiento RLS. | Platform Access | P2 |

## 5. Reglas de negocio

### RB-001 — Evidencia mínima

Una oportunidad no pasa a `SHORTLISTED` si no tiene:

- referencias comparables suficientes o excepción explícita;
- fuente, método y fecha para cada dato externo;
- condición, variante, moneda y tipo de precio claros;
- costos críticos y objetivo económico, o gates visibles;
- riesgo, confianza y cobertura desglosados.

El umbral inicial de tres comparables es configurable y no afirma suficiencia estadística universal.

### RB-002 — Desconocidos

`unknown` no se convierte en cero, neutral ni promedio. Reduce cobertura/confianza o activa un gate.

### RB-003 — Cohortes

No se agregan monedas, condiciones, variantes ni `ASKING/SOLD` incompatibles sin ajuste explícito, trazable y versionado.

### RB-004 — Tres decisiones de precio

`MarketPriceEstimate`, `PricingRecommendation` y `MaximumBuyPrice` permanecen separados conforme a [[PRICING_MODEL]] y [[ADR-007]].

### RB-005 — Quick Sale

No se presenta como hecho a partir de publicaciones activas. Requiere ventas/velocidad o un proxy identificado, con método y confianza.

### RB-006 — Recomendación y autoridad

El score ordena y explica; no compra, publica, negocia ni asigna capital. La aprobación es humana.

### RB-007 — Riesgo

Un riesgo crítico legal, de seguridad, falsificación o identidad puede bloquear aunque el score bruto sea alto.

### RB-008 — Versionado

Toda ejecución conserva inputs, fórmula, parámetros, estado de calibración y fecha.

### RB-009 — DEMO

Datos y resultados DEMO se identifican visiblemente y no se presentan como evidencia comercial real o calibrada.

## 6. Estados y decisiones

```text
DISCOVERED → RESEARCHING → SHORTLISTED → TESTING → VALIDATED → SCALING
                         ↘ REJECTED
              RESEARCHING → REJECTED
                  TESTING → RESEARCHING  (INCONCLUSIVE / MODIFY)
                  TESTING → REJECTED
```

- `DISCOVERED`: hipótesis registrada.
- `RESEARCHING`: evidencia incompleta o análisis activo.
- `SHORTLISTED`: cumple gates mínimos y puede diseñar prueba.
- `TESTING`: experimento aprobado y activo.
- `VALIDATED`: cumplió criterios predefinidos.
- `SCALING`: decisión humana posterior con nuevo límite de capital.
- `REJECTED`: no cumple; conserva motivo.

## 7. Flujos

### F-01 — Market Evidence

1. Ingresar URL/datos de publicación o producto.
2. Resolver producto, variante y condición.
3. Incorporar observaciones con procedencia.
4. Construir cohorte comparable.
5. Calcular estadísticas y `MarketPriceEstimate` o suficiencia insuficiente.

### F-02 — Resale Decision

1. Seleccionar evidencia de mercado.
2. Registrar precio de compra, costos y objetivo.
3. Evaluar escenarios de venta disponibles.
4. Calcular economía y máximo de compra o activar gates.
5. Evaluar liquidez, riesgo, confianza, cobertura y score.
6. Decidir investigar, negociar externamente, descartar o preseleccionar.

### F-03 — Experimentation Lite

1. Convertir una oportunidad `SHORTLISTED` en experimento.
2. Congelar predicciones, capital, cantidad, duración, éxito y stop conditions.
3. Aprobar manualmente.
4. Registrar observaciones y costos reales.
5. Comparar predicción/resultado.
6. Validar, rechazar o volver a investigar/modificar.

## 8. Experiencia MVP-A

El shell A+B actual es Foundation DEMO. El dashboard funcional futuro mostrará:

```text
Opportunity / Subject
Strategy
Asking Median / Sold Evidence
Quick / Target / Premium availability
Maximum Buy availability
Contribution / ROI
Liquidity
Risk / Confidence / Coverage
Gates
Status / Updated At
```

El shell no debe llamar «Market Value» a una mediana `ASKING` ni mostrar cero por ausencia.

## 9. Requisitos no funcionales

| ID | Requisito |
|---|---|
| RNF-001 | Trazabilidad de todo derivado a observaciones y versión. |
| RNF-002 | Reproducibilidad con mismos inputs/parámetros. |
| RNF-003 | Conectores separados de dominio y scoring. |
| RNF-004 | Idempotencia de capturas/cargas. |
| RNF-005 | Auditoría de decisiones, estados y ajustes. |
| RNF-006 | Degradación visible ante fuentes o inputs incompletos. |
| RNF-007 | Secretos fuera del repositorio. |
| RNF-008 | Métodos de acceso y retención permitidos por fuente. |
| RNF-009 | Dominio independiente de marketplace. |
| RNF-010 | Observabilidad de ejecuciones. |
| RNF-011 | Aislamiento por workspace antes de datos reales multiusuario. |

## 10. Criterios de aceptación

### MVP-A1

- F-01 funciona con fixture DEMO y una carga manual trazable;
- cohortes separan condición, moneda, variante y `ASKING/SOLD`;
- estadística no se presenta como valor realizable sin soporte;
- `unknown` se representa sin cero implícito;
- tests cubren selección, histórico, fecha de corte y exclusiones.

### MVP-A2

- F-02 produce los tres contratos separados;
- cada salida calculada expone evidencia, supuestos y versión;
- inputs insuficientes producen gates, no valores inventados;
- recomendación muestra riesgo, confianza y cobertura;
- ningún output se presenta como calibrado sin evidencia.

### MVP-A3

- F-03 congela predicción y criterios antes de aprobar;
- registra resultados append-only;
- distingue validado, rechazado e inconcluso;
- compara el flujo con el benchmark manual;
- mantiene aprobación humana para capital.

## 11. Dependencias pendientes

- primera fuente real con método permitido;
- caso real para B1;
- umbrales de frescura;
- política inicial de contribución y reservas para Maximum Buy;
- evidencia de velocidad/liquidez;
- límites de capital para experimento real.

## 12. Fuera de alcance

Ver [[PRODUCT_VISION]] y [[ROADMAP]]. El código MVP-A sólo implementa el perfil `RESALE + PRODUCT/listings` de forma incremental.

## 13. Referencias

- [[ADR-006]]
- [[ADR-007]]
- [[ADR-008]]
- [[OPPORTUNITY_MODEL]]
- [[PRICING_MODEL]]
- [[SYSTEM_ARCHITECTURE]]
- [[DATA_MODEL]]
- [[SCORING_MODEL]]
- [[EXPERIMENTATION]]
- [[BACKLOG]]
