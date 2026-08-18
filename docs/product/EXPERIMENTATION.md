---
type: product-spec
status: proposed
version: 0.1
updated: 2026-08-12
---

# Sistema de experimentos

## 1. Propósito

Convertir una oportunidad teórica en una prueba acotada que permita decidir si validar, rechazar o investigar más, sin escalar por intuición.

## 2. Principios

- hipótesis y criterios se fijan antes de iniciar;
- capital, cantidad, duración y pérdidas máximas están limitados;
- se registran métricas favorables y desfavorables;
- cambiar criterios durante la prueba crea una nueva versión y no reescribe el plan inicial;
- resultados inconclusos no se etiquetan como éxito;
- una prueba exitosa valida condiciones concretas, no todo un mercado.

## 3. Plantilla

```yaml
---
type: experiment
id: EXP-000
status: draft
opportunity_id:
product:
owner:
created: 2026-08-12
updated: 2026-08-12
---

hypothesis: ""
opportunity_score:
score_version:
confidence_score:

scope:
  market:
  channel:
  quantity:
  capital:
  currency:
  test_days:

predictions:
  demand:
  gross_margin:
  contribution_margin:
  days_to_first_sale:
  inventory_turnover_days:

success_criteria:
  minimum_units_sold:
  minimum_contribution_margin:
  maximum_days_to_first_sale:
  maximum_return_rate:

stop_conditions:
  maximum_loss:
  regulatory_issue: true
  compatibility_failure_rate:

results:
  units_sold:
  contribution_margin:
  days_to_first_sale:
  returns:
  repeat_purchases:

decision:
  outcome: # validated | rejected | inconclusive
  reason:
  next_action:
```

## 4. Flujo

1. Seleccionar oportunidad `SHORTLISTED` sin gates bloqueantes.
2. Formular hipótesis falsable.
3. Congelar predicciones, criterios de éxito y stop conditions.
4. Aprobar manualmente capital y período.
5. Ejecutar y registrar observaciones fechadas.
6. Cerrar al cumplirse duración, éxito o stop condition.
7. Comparar predicción y resultado.
8. Registrar decisión y actualizar la oportunidad.

## 5. Métricas

### Adquisición e interés

`views`, `clicks`, `messages`, `questions`, `conversion_rate`.

### Venta y velocidad

`units_sold`, `days_to_first_sale`, `days_to_sale`, `inventory_turnover_days`.

### Economía

`gross_revenue`, costos reales, `gross_margin`, `contribution_margin`, `ROI`, `capital_efficiency`.

### Calidad y recurrencia

`returns`, motivo de devolución, reclamos de compatibilidad, `repeat_purchase`.

Las métricas de plataforma se identifican como observadas, estimadas o no disponibles.

## 6. Resultado

- `VALIDATED`: cumple todos los criterios críticos predefinidos.
- `REJECTED`: activa stop condition o incumple criterios críticos.
- `INCONCLUSIVE`: no existe evidencia suficiente; requiere nueva decisión, no se cuenta como éxito.

La oportunidad pasa a `VALIDATED` sólo mediante revisión humana de un experimento cerrado. `SCALING` exige una decisión posterior y un nuevo límite de capital.

## 7. Comparación de predicción

```text
absolute_error = actual - predicted
percentage_error = (actual - predicted) / max(abs(predicted), epsilon)
```

Para métricas con cero válido se usa una función adecuada y se evita porcentaje engañoso. Los errores se agregan por tipo, mercado y cohorte antes de calibrar [[SCORING_MODEL]].

## 8. Primer benchmark del MVP

Antes del primer experimento comercial se registra una investigación manual básica con:

- tiempo total;
- fuentes y observaciones encontradas;
- estimaciones y supuestos;
- decisión y nivel de confianza.

Se ejecuta COIE sobre el mismo alcance y se comparan cobertura, trazabilidad, tiempo y error contra resultados reales. No se modifica el benchmark después de conocer el resultado.

## 9. Referencias

- [[PRD]]
- [[SCORING_MODEL]]
- [[DATA_MODEL]]
- [[USER_STORIES]]
