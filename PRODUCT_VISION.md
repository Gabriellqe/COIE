---
type: product-vision
status: accepted
version: 0.2
updated: 2026-08-19
---

# Visión del producto

## Visión

Crear un sistema de decisión y aprendizaje que transforme hipótesis comerciales en oportunidades evaluadas, probadas y mejoradas mediante evidencia externa y resultados reales.

COIE no es solamente un buscador de productos ni una colección de motores independientes. Su objetivo es detectar **ineficiencias comerciales explotables** y ayudar a una persona a decidir si conviene descartarlas, investigarlas, probarlas, modificarlas o escalarlas con límites explícitos de riesgo y capital.

## Concepto central: Opportunity

`Opportunity` es el agregado que une todo el producto. Puede representar, según el horizonte:

- comprar y revender una publicación concreta;
- vender un producto de reposición;
- importar mediante una ruta de abastecimiento;
- aprovechar arbitraje entre mercados;
- entrar en un nicho;
- crear un bundle o kit;
- añadir uno o varios SKU a un catálogo.

Una oportunidad conserva hipótesis, sujeto, estrategia, evidencia, economía, riesgos, decisiones, experimento y aprendizaje. Especificación: [[OPPORTUNITY_MODEL]]. Decisión: [[ADR-006]].

## Ciclo operativo

```text
DISCOVER → EVALUATE → TEST → MEASURE → SCALE / REJECT / MODIFY
```

En lenguaje de producto:

```text
Descubrir una hipótesis
→ reunir evidencia
→ evaluar valor y economía
→ diseñar una prueba pequeña
→ medir resultados reales
→ escalar, descartar o reformular
```

## Cinco preguntas fundamentales

| Pregunta | Capacidades que aportan evidencia |
|---|---|
| ¿Qué vender? | Discovery, Resale, Replenishment, Niche, Catalog, Bundles |
| ¿Vale la pena? | Market/Price Intelligence, Demand, Competition, Economics, Risk |
| ¿Dónde comprarlo? | Sourcing, Import, Arbitrage |
| ¿Cómo venderlo? | Commercial Pricing, Channel, Liquidity, Seasonality, Bundles |
| ¿Debería seguir haciéndolo? | Experimentation, Sales Observations, Learning |

Estas capacidades enriquecen `Opportunity`; no son aplicaciones separadas.

## Problema

La investigación comercial exige revisar fuentes manualmente, comparar referencias heterogéneas, estimar demanda y costos, evaluar abastecimiento y recordar análisis anteriores. Esto provoca:

- alto consumo de tiempo;
- información fragmentada y sin histórico;
- métricas no comparables;
- investigaciones repetidas;
- dependencia excesiva de intuición;
- riesgo de inmovilizar capital en inventario débil;
- poca trazabilidad entre predicción y resultado;
- poco aprendizaje a partir de ventas anteriores.

## Propuesta de valor

Para una persona operadora o analista, COIE:

1. recibe o descubre una hipótesis comercial;
2. reúne observaciones con procedencia y vigencia;
3. normaliza productos, publicaciones, precios y relaciones;
4. distingue evidencia de mercado, recomendación de precio y límite de compra;
5. estima demanda, competencia, liquidez, economía, recurrencia, timing y riesgo cuando la evidencia lo permite;
6. produce una recomendación explicable con incertidumbre y gates;
7. convierte una oportunidad en un experimento acotado;
8. compara predicciones con resultados para mejorar decisiones futuras.

## Usuarios iniciales

### Operador comercial

Investiga, decide qué probar y asigna capital. Necesita síntesis, límites y recomendaciones claras.

### Analista de oportunidades

Revisa comparables, mercado, proveedores, compatibilidad y riesgos. Necesita datos trazables y cálculos reproducibles.

En MVP-A ambos roles pueden ser ejercidos por una misma persona.

## Estrategias de oportunidad

| Estrategia | Pregunta principal | Horizonte |
|---|---|---|
| `RESALE` | ¿Conviene comprar esta publicación/producto para revender? | MVP-A |
| `REPLENISHMENT` | ¿Existe demanda recurrente rentable para este consumible o repuesto? | MVP-C |
| `IMPORT` | ¿Conviene abastecer este producto desde otro mercado? | posterior a MVP-B |
| `ARBITRAGE` | ¿Existe una brecha sostenible entre mercados? | posterior a MVP-B |
| `NICHE_DISCOVERY` | ¿Qué nicho ofrece condiciones para construir un negocio? | MVP-D |
| `CATALOG_EXPANSION` | ¿Qué SKU mejora el catálogo existente? | MVP-D |
| `BUNDLE_OPPORTUNITY` | ¿Qué conjunto mejora valor, conversión o margen? | MVP-D |

Market Intelligence, Pricing, Sourcing, Compatibility, Seasonality, Economics y Learning son capacidades horizontales, no estrategias equivalentes.

## Capacidades estratégicas recuperadas

### Price Intelligence

Estima qué muestran los comparables. No decide automáticamente precio de venta ni precio máximo de compra.

### Commercial Pricing

Propone escenarios `QUICK`, `TARGET` y `PREMIUM` sólo cuando existe evidencia suficiente. Especificación: [[PRICING_MODEL]].

### Product Ecosystem y relaciones

Permite pasar de un SKU aislado a accesorios, consumibles, reemplazos, alternativas, complementos y bundles, conservando fuente y confianza.

### Seasonality

Ayuda a decidir qué vender ahora, qué preparar antes del peak y qué es evergreen. Requiere histórico suficiente y no se implementa en MVP-A. Especificación: [[SEASONALITY]].

## Tesis del producto

> Los mercados contienen ineficiencias detectables mediante datos. Una oportunidad sólo adquiere valor cuando puede formularse, evaluarse, probarse y escalarse con límites de riesgo.

Hipótesis de MVP-A:

- múltiples comparables trazables mejoran la estimación frente a una revisión manual no estructurada;
- separar precio pedido, valor estimado, pricing comercial y máximo de compra mejora la decisión `RESALE`;
- una recomendación con economía, confianza, cobertura y gates mejora la decisión de experimentar;
- registrar predicción y resultado crea conocimiento reutilizable.

## Principios

1. **Evidence before inventory:** no recomendar inventario sin evidencia trazable.
2. **Test before scale:** probar con cantidades, capital y plazos acotados.
3. **Capital efficiency:** considerar margen, rotación y capital inmovilizado.
4. **Data accumulation:** cada investigación aumenta el conocimiento reutilizable.
5. **Explainable recommendations:** exponer inputs, faltantes, riesgo y versión.
6. **Modular architecture:** las capacidades evolucionan sin convertirse en productos aislados.
7. **Uncertainty is data:** `unknown` no equivale a cero ni a neutral.
8. **Human capital authority:** ninguna automatización compra, publica o escala sin aprobación.

## North Star

**Capital desplegado en oportunidades rentables validadas.**

Métricas relacionadas:

- `Validated Opportunity Rate`;
- `Experiment Success Rate`;
- `Median ROI`;
- `Inventory Turnover`;
- `Capital Efficiency`;
- `Prediction Accuracy`;
- cobertura y procedencia de evidencia;
- recomendaciones con explicación completa.

## Criterio de éxito de MVP-A

MVP-A será exitoso si permite tomar una publicación o producto `RESALE`, construir comparables trazables, distinguir evidencia de mercado de pricing comercial, calcular o bloquear responsablemente el precio máximo de compra, evaluar economía/riesgo/confianza y registrar una prueba acotada con resultado real.

Una pantalla con estadísticas DEMO demuestra Foundation, pero no completa MVP-A.

## Fuera de alcance de MVP-A

- `REPLENISHMENT`, nichos, importación, arbitraje, bundles y expansión de catálogo como flujos ejecutables;
- estacionalidad calculada sin histórico suficiente;
- aprendizaje automático sin cohortes reales;
- descubrimiento autónomo sin supervisión;
- compra, publicación, negociación o asignación automática de capital;
- scraping o conectores sin método permitido;
- exactitud garantizada cuando la evidencia no permite observar ventas o velocidad;
- autenticación real y RLS como prerequisito del primer ciclo DEMO/manual.

## Pregunta estratégica

> ¿Qué oportunidad comercial tiene actualmente la mejor combinación de evidencia, rentabilidad, recurrencia, timing, velocidad y riesgo, cómo debería probarse y qué aprendimos del resultado?
