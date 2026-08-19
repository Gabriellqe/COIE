---
type: scoring-model
status: proposed
version: 0.2.0
updated: 2026-08-19
---

# Modelo de scoring

## 1. Propósito

Comparar oportunidades con una escala común sin ocultar evidencia, incertidumbre ni riesgo. El modelo inicial es heurístico y debe calibrarse con experimentos reales; no es aprendizaje automático.

El único perfil activo de MVP-A es `RESALE`. Sus pesos continúan como hipótesis `UNCALIBRATED`; la fórmula `REPLENISHMENT` se conserva como candidata futura y no se ejecuta en el primer vertical.

## 2. Salidas separadas

Cada evaluación produce:

- `OpportunityScore` (`0–100`): atractivo estimado.
- `RiskScore` (`0–100`): riesgo; un valor alto es peor.
- `ConfidenceScore` (`0–100`): confianza en la evaluación.
- `Coverage`: porcentaje y detalle de componentes observados.
- `Gates`: condiciones que bloquean o limitan una recomendación.
- `Explanation`: factores positivos, negativos, supuestos y datos faltantes.

No se multiplica el score por la confianza. Se muestran por separado para distinguir una oportunidad poco atractiva de una prometedora pero insuficientemente sustentada.

El score no es Market Value, recomendación de precio ni Maximum Buy Price. Consume esos resultados cuando existen y nunca los sustituye.

## 3. Dirección de los componentes

Todos los componentes salvo `RiskScore` se normalizan de modo que **100 sea más favorable**.

| Componente | Interpretación de 100 |
|---|---|
| `DemandScore` | demanda fuerte y consistente |
| `SupplyGapScore` | demanda desatendida respecto de la oferta |
| `CompetitionScore` | entorno competitivo favorable, no saturado |
| `MarginScore` | contribución atractiva y resistente a costos |
| `ReplenishmentScore` | recompra frecuente y probable |
| `InstalledBaseScore` | base instalada grande/relevante |
| `CaptiveDemandScore` | necesidad de reposición específica y legítima |
| `CompatibilityScore` | cobertura amplia y verificada |
| `LogisticsScore` | almacenamiento y despacho simples y económicos |
| `InventoryTurnoverScore` | rotación esperada rápida |
| `CapitalEfficiencyScore` | alto retorno esperado por capital y tiempo |
| `RiskScore` | exposición alta; 100 es peor |

Para evitar ambigüedad, la saturación bruta se conserva como métrica de entrada; `CompetitionScore` es su transformación favorable.

## 4. Normalización

Cada componente define:

```text
raw metric(s)
eligible observations
time window
normalization function
caps/floors
missing-data rule
method version
```

Función lineal acotada cuando una métrica mayor es mejor:

```text
score = clamp(100 × (x - bad) / (good - bad), 0, 100)
```

Cuando una métrica menor es mejor:

```text
score = 100 - clamp(100 × (x - good) / (bad - good), 0, 100)
```

Los umbrales `bad/good` deben definirse por mercado, categoría y versión. No se eligen después de ver el resultado de una oportunidad.

## 5. Componentes iniciales

### DemandScore

Combina únicamente señales observables disponibles, por ejemplo ventas reportadas, velocidad de desaparición de listings, volumen de consultas, ranking o tendencia. Cada proxy conserva su significado y limitación.

### SupplyGapScore

Compara demanda normalizada con oferta activa y su evolución. No equivale a «pocos listings» por sí solo.

### CompetitionScore

Considera número de vendedores, concentración, antigüedad de publicaciones, presión de precio y diferenciación. Un mercado con un monopolio fuerte puede ser desfavorable aunque tenga pocos vendedores.

### MarginScore

Parte de margen de contribución, no de margen bruto. Debe incluir un escenario base y uno adverso para costos variables.

### ReplenishmentScore

Considera intervalo de reposición, desgaste/consumo, probabilidad de recompra y evidencia de recurrencia.

### CompatibilityScore

Combina cantidad y popularidad de modelos compatibles, ponderadas por calidad de verificación. Afirmaciones conflictivas reducen el score y la confianza.

### InventoryTurnoverScore

Usa días esperados de inventario. Si sólo existe un proxy, se etiqueta como estimación.

### CapitalEfficiencyScore

Normaliza contribución esperada respecto de capital invertido y período de inmovilización, usando una base temporal común.

### RiskScore

Agrega severidad, probabilidad y detectabilidad de:

- regulación y seguridad;
- falsificación;
- devolución y garantía;
- compatibilidad incierta;
- dependencia de proveedor;
- obsolescencia;
- estacionalidad;
- volatilidad de precio o moneda;
- fragilidad/logística;
- calidad de datos.

Los riesgos correlacionados no deben contarse dos veces sin justificación.

## 6. Fórmulas iniciales

Se define:

```text
SafetyScore = 100 - RiskScore
OpportunityScore = round(weighted_mean(available components))
```

El promedio sólo puede renormalizar pesos de componentes ausentes si se cumplen los mínimos del tipo y la cobertura sigue visible. Un componente obligatorio ausente activa un gate.

### Pesos `RESALE` v0.1.0

| Componente | Peso |
|---|---:|
| DemandScore | 0.17 |
| SupplyGapScore | 0.08 |
| CompetitionScore | 0.08 |
| MarginScore | 0.20 |
| InventoryTurnoverScore | 0.14 |
| CapitalEfficiencyScore | 0.14 |
| LogisticsScore | 0.05 |
| SafetyScore | 0.14 |
| **Total** | **1.00** |

### Pesos `REPLENISHMENT` v0.1.0

> Perfil candidato futuro; no implementado ni calibrado en MVP-A.

| Componente | Peso |
|---|---:|
| DemandScore | 0.13 |
| SupplyGapScore | 0.08 |
| CompetitionScore | 0.08 |
| MarginScore | 0.13 |
| ReplenishmentScore | 0.14 |
| InstalledBaseScore | 0.08 |
| CaptiveDemandScore | 0.05 |
| CompatibilityScore | 0.08 |
| LogisticsScore | 0.05 |
| InventoryTurnoverScore | 0.05 |
| CapitalEfficiencyScore | 0.06 |
| SafetyScore | 0.07 |
| **Total** | **1.00** |

Estos pesos expresan una hipótesis inicial. Sólo cambian mediante versión nueva y decisión registrada.

## 7. Cobertura y confianza

### Cobertura

```text
weighted_coverage = Σ(weight_i × availability_i) / Σ(weight_i)
```

`availability_i` está entre 0 y 1 según los inputs mínimos del componente. Se entrega también cobertura por componente y fuente.

### ConfidenceScore inicial

Composición propuesta:

| Factor | Peso |
|---|---:|
| cobertura ponderada | 0.35 |
| calidad/procedencia de fuentes | 0.25 |
| frescura | 0.15 |
| tamaño y representatividad de muestra | 0.15 |
| concordancia entre fuentes | 0.10 |

La confianza se calcula con reglas versionadas. Muchas observaciones duplicadas de una misma fuente no equivalen a diversidad de evidencia.

## 8. Gates

### Gates de datos

- menos de tres referencias comparables de precio, salvo excepción justificada;
- landed cost o costos variables críticos desconocidos;
- escenario de venta o contribución mínima desconocidos para calcular Maximum Buy;
- moneda sin conversión trazable;
- identidad o condición del producto ambigua;
- cobertura ponderada inferior a 60 para `SHORTLISTED`.

### Gates de riesgo

- restricción legal o de seguridad no resuelta;
- alta probabilidad de falsificación sin mitigación;
- compatibilidad esencial en conflicto;
- pérdida esperada superior al límite de capital definido;
- dependencia crítica de una única fuente no verificada.

Un gate no reduce discretamente unos puntos: limita la recomendación y explica la acción requerida.

## 9. Bandas de interpretación

| Score | Etiqueta | Acción orientativa |
|---:|---|---|
| 80–100 | Muy prometedora | diseñar experimento si no hay gates |
| 65–79 | Prometedora | completar evidencia y evaluar prueba pequeña |
| 50–64 | Incierta | investigar factores dominantes |
| 35–49 | Débil | no priorizar salvo nueva evidencia |
| 0–34 | Desfavorable | rechazar o reformular |

Condiciones adicionales para recomendar prueba:

```text
OpportunityScore >= 65
ConfidenceScore >= 60
weighted_coverage >= 60
no blocking gates
```

Son umbrales iniciales configurables que deben contrastarse con resultados.

## 10. Precio de mercado

El conjunto comparable se segmenta por producto, variante, condición, mercado, moneda y ventana temporal.

Se informa:

- `n` y fuentes;
- media y mediana;
- mínimo y máximo;
- percentiles cuando la muestra lo permite;
- dispersión (`IQR` y/o desviación robusta);
- precios pedidos versus vendidos;
- regla y lista de exclusiones.

Regla inicial de outliers: marcar valores fuera de `Q1 - 1.5×IQR` o `Q3 + 1.5×IQR`; no eliminarlos del histórico. Con muestras pequeñas, no aplicar automáticamente la regla y advertirlo.

Esta sección produce evidencia para `MarketPriceEstimate`. Una cohorte `ASKING` no determina por sí sola Quick Sale, Target, Premium o Maximum Buy. Ver [[PRICING_MODEL]].

## 11. Explicación requerida

Todo `ScoreRun` debe responder:

1. ¿Cuál es el score y qué versión lo produjo?
2. ¿Qué tres factores aportaron más?
3. ¿Qué tres factores limitaron más?
4. ¿Qué evidencia y ventana temporal se utilizaron?
5. ¿Qué datos faltan o son conflictivos?
6. ¿Qué gates se activaron?
7. ¿Qué cambio de input alteraría materialmente la recomendación?
8. ¿Cuál es el experimento mínimo sugerido?

## 12. Calibración

Después de cada experimento se conservan:

```text
predicted_demand vs actual_demand
predicted_margin vs actual_margin
predicted_velocity vs actual_velocity
predicted_success vs experiment_outcome
```

Los pesos no se ajustan caso a caso. Se revisan por cohortes suficientes, evitando filtración de resultados, y se publican como una nueva versión con comparación retrospectiva.

## 13. NicheScore

Fuera del MVP transaccional, un nicho podrá combinar demanda, recurrencia, competencia favorable, márgenes, profundidad de SKU, logística, potencial B2B, crecimiento y disponibilidad de proveedores. Debe tener fórmula y versión independientes de `OpportunityScore`.

## 14. Seasonality

Seasonality puede actuar como señal temporal, riesgo o componente específico de una estrategia. No se incorpora automáticamente al score universal. Requiere un [[SEASONALITY]] suficiente, versionado y pertinente para la decisión.

## 15. Referencias

- [[PRD]]
- [[DATA_MODEL]]
- [[EXPERIMENTATION]]
- [[PRICING_MODEL]]
- [[SEASONALITY]]
- [[ADR-001]]
- [[ADR-006]]
- [[ADR-007]]
