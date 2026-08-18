---
type: product-vision
status: accepted
version: 0.1
updated: 2026-08-12
---

# Visión del producto

## Visión

Crear un motor de inteligencia comercial que convierta información dispersa de marketplaces, proveedores, tendencias, precios, demanda, competencia y ventas propias en decisiones accionables y explicables.

COIE busca detectar **ineficiencias comerciales explotables**: productos infravalorados, brechas de oferta, arbitraje entre mercados, consumibles recurrentes, nichos técnicos desatendidos, compatibilidades amplias y extensiones naturales de catálogo.

## Problema

La investigación comercial actual exige revisar fuentes manualmente, comparar referencias heterogéneas, estimar demanda y costos, recordar análisis anteriores y decidir con evidencia incompleta. Esto provoca:

- alto consumo de tiempo;
- información fragmentada y sin histórico;
- métricas no comparables;
- investigaciones repetidas;
- dependencia excesiva de intuición;
- riesgo de inmovilizar capital en inventario débil;
- poco aprendizaje a partir de ventas anteriores.

## Propuesta de valor

Para una persona operadora o analista que evalúa oportunidades comerciales, COIE:

1. reúne observaciones con procedencia y vigencia;
2. normaliza productos, precios y compatibilidades;
3. estima demanda, competencia, economía y riesgo;
4. prioriza oportunidades con un score explicable;
5. transforma las mejores hipótesis en experimentos medibles;
6. compara predicciones con resultados reales para mejorar decisiones futuras.

## Usuarios iniciales

### Operador comercial

Investiga productos, decide qué probar y asigna capital. Necesita síntesis, trazabilidad y recomendaciones claras.

### Analista de oportunidades

Revisa precios, competencia, proveedores, compatibilidades y riesgos. Necesita datos comparables, procedencia y capacidad de explicar un resultado.

En el MVP ambos roles pueden ser ejercidos por la misma persona.

## Oportunidades soportadas

| Tipo | Pregunta principal | Horizonte |
|---|---|---|
| `RESALE` | ¿Puedo comprar bajo el valor de mercado y revender con margen ajustado por riesgo? | MVP |
| `REPLENISHMENT` | ¿Existe demanda recurrente atractiva para este consumible o repuesto? | MVP |
| `IMPORT` | ¿Conviene abastecer el producto desde otro mercado? | Futuro |
| `ARBITRAGE` | ¿Existe una diferencia sostenible entre mercados? | Futuro |
| `NICHE_DISCOVERY` | ¿Qué nichos presentan una brecha comercial relevante? | Futuro |
| `CATALOG_EXPANSION` | ¿Qué SKU complementa de forma rentable el catálogo? | Futuro |
| `BUNDLE_OPPORTUNITY` | ¿Qué combinación mejora valor, conversión o margen? | Futuro |

## Tesis del producto

> Los mercados contienen ineficiencias detectables mediante datos. Una oportunidad sólo adquiere valor cuando puede formularse, medirse, probarse y escalarse con límites de riesgo.

Hipótesis que el MVP debe contrastar:

- varias referencias de mercado mejoran la estimación de valor frente a una revisión manual básica;
- una evaluación normalizada permite comparar oportunidades heterogéneas;
- una recomendación descompuesta en evidencia y riesgo mejora la decisión de experimentar;
- registrar predicciones y resultados aumenta progresivamente la precisión.

## Principios de producto

1. **Evidence before inventory:** no recomendar inventario sin evidencia suficiente y trazable.
2. **Test before scale:** validar con cantidades y plazos acotados.
3. **Capital efficiency:** optimizar retorno ajustado por velocidad y capital inmovilizado.
4. **Data accumulation:** cada investigación incrementa el conocimiento reutilizable.
5. **Explainable recommendations:** todo score debe exponer componentes, datos faltantes y riesgos.
6. **Modular architecture:** adquisición, inteligencia, scoring y experimentación evolucionan por separado.
7. **Uncertainty is data:** una señal ausente o débil no se convierte artificialmente en certeza.

## North Star

**Capital desplegado en oportunidades rentables validadas.**

La métrica sólo contabiliza capital asociado a un experimento u oportunidad que alcanzó criterios previamente definidos de validación y rentabilidad.

### Métricas relacionadas

- `Validated Opportunity Rate`;
- `Experiment Success Rate`;
- `Median ROI`;
- `Inventory Turnover`;
- `Capital Efficiency`;
- `Prediction Accuracy`;
- cobertura de procedencia de los datos;
- porcentaje de recomendaciones con explicación completa.

## Criterio de éxito del MVP

El MVP será exitoso si permite ingresar un producto, URL, búsqueda o nicho; generar una ficha con referencias de mercado, estimaciones económicas y score explicable; y convertir una oportunidad seleccionada en un experimento con predicción y métricas reales.

La validación comparará tiempo, cobertura y calidad de decisión contra una investigación manual básica. Los umbrales cuantitativos se fijarán antes del primer experimento en [[EXPERIMENTATION]].

## Fuera de alcance inicial

- descubrimiento autónomo sin supervisión;
- compra, publicación o asignación automática de capital;
- aprendizaje automático sin un volumen de resultados suficiente;
- todos los marketplaces y países desde el primer incremento;
- exactitud garantizada cuando las fuentes no entregan ventas o stock verificables;
- modos `IMPORT`, `ARBITRAGE`, `NICHE_DISCOVERY`, `CATALOG_EXPANSION` y `BUNDLE_OPPORTUNITY` como flujos completos.

## Pregunta estratégica

COIE no debe limitarse a «¿qué producto debería vender?». Debe responder:

> ¿Qué oportunidad comercial tiene actualmente la mejor combinación de evidencia, rentabilidad, recurrencia, velocidad y riesgo, y cuál es el experimento mínimo para validarla?
