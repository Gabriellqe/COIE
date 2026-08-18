# Commerce Opportunity Intelligence Engine
## Documento Maestro del Proyecto

> Documento vivo para planificación, desarrollo con Codex y análisis en Obsidian.

---

## 1. Resumen ejecutivo

Este proyecto nace de una evolución progresiva de varias ideas relacionadas con reventa, análisis de precios, scraping, investigación automatizada, ecommerce y productos de reposición.

La idea original era construir un **Resale Intelligence Engine** capaz de detectar productos usados infravalorados para comprarlos y revenderlos con margen.

A medida que el problema se amplió, apareció una oportunidad mayor:

> Construir un sistema capaz de detectar, analizar, validar y priorizar oportunidades comerciales en distintos mercados.

Por lo tanto, **Resale Intelligence** deja de ser el producto completo y pasa a ser uno de los módulos de un sistema mayor:

# Commerce Opportunity Intelligence Engine

El sistema buscará responder preguntas como:

- ¿Qué productos están infravalorados?
- ¿Qué nichos tienen demanda pero poca oferta?
- ¿Qué productos tienen buena rotación?
- ¿Qué consumibles generan recompra?
- ¿Dónde existe arbitraje de precios?
- ¿Qué productos conviene importar?
- ¿Qué ecosistemas de productos permiten construir un catálogo?
- ¿Cuánto capital debería destinarse a probar una oportunidad?
- ¿Qué oportunidades tienen mejor relación entre margen, riesgo y velocidad de venta?
- ¿Qué aprendemos de nuestras propias ventas para mejorar futuras decisiones?

---

# 2. Visión

Crear un motor de inteligencia comercial que transforme información dispersa de marketplaces, proveedores, tendencias, precios, demanda, competencia y ventas propias en decisiones comerciales accionables.

El objetivo no es solamente encontrar productos.

El objetivo es encontrar:

> **Ineficiencias comerciales explotables.**

Estas ineficiencias pueden aparecer como:

- productos usados infravalorados;
- diferencias de precio entre mercados;
- productos importables con buen margen;
- demanda recurrente con poca oferta;
- nichos técnicos desatendidos;
- productos con alta rotación;
- ecosistemas con oportunidades de cross-sell;
- productos compatibles con múltiples máquinas o modelos;
- nuevas extensiones de catálogo.

---

# 3. Problema general

Actualmente descubrir oportunidades comerciales requiere:

- revisar marketplaces manualmente;
- comparar precios;
- estimar demanda;
- buscar proveedores;
- evaluar competencia;
- calcular costos;
- estimar márgenes;
- evaluar velocidad de venta;
- analizar compatibilidades;
- recordar investigaciones anteriores;
- tomar decisiones basadas parcialmente en intuición.

Esto genera varios problemas:

1. Alto consumo de tiempo.
2. Información fragmentada.
3. Falta de histórico.
4. Dificultad para comparar oportunidades.
5. Dependencia de intuición personal.
6. Investigaciones repetidas.
7. Falta de métricas normalizadas.
8. Dificultad para aprender de operaciones anteriores.
9. Riesgo de comprar inventario sin suficiente evidencia.
10. Dificultad para descubrir nichos no evidentes.

---

# 4. Ideas que originaron el proyecto

## 4.1 Reventa de segunda mano

### Idea

Encontrar publicaciones donde un producto usado esté siendo vendido por debajo de su valor real de mercado.

### Problema que resuelve

La búsqueda manual de oportunidades consume mucho tiempo.

Una persona puede encontrar una buena oportunidad, pero revisar cientos de publicaciones constantemente no escala.

### Resultado

Nacimiento del concepto:

**Resale Intelligence Engine**

---

## 4.2 Motor de decisión de precios

### Idea

Construir una herramienta que permita estimar el precio real de mercado de un producto utilizando múltiples publicaciones y referencias.

### Problema que resuelve

Un producto barato no necesariamente es una oportunidad.

Es necesario conocer:

- precio medio;
- mediana;
- rango;
- dispersión;
- condición;
- demanda;
- liquidez;
- velocidad de venta.

### Resultado

Aparece la necesidad de construir un:

**Market Price Intelligence Layer**

---

## 4.3 Scraping de marketplaces

### Idea

Automatizar la captura de información de marketplaces y resellers.

### Problema que resuelve

La información necesaria para tomar decisiones está distribuida en múltiples plataformas.

### Datos de interés

- precio;
- publicación;
- vendedor;
- condición;
- ubicación;
- fecha;
- características;
- stock;
- unidades vendidas;
- reputación;
- variaciones;
- descripción;
- imágenes;
- histórico.

### Resultado

Nacimiento del:

**Data Acquisition Layer**

---

## 4.4 Agentes de investigación

### Idea

Utilizar agentes especializados para investigar productos, nichos, proveedores y competencia.

### Problema que resuelve

Cada oportunidad requiere múltiples tipos de investigación.

Por ejemplo:

- mercado;
- precios;
- proveedores;
- compatibilidades;
- competencia;
- riesgo;
- logística.

Un solo proceso monolítico sería difícil de mantener.

### Resultado

Arquitectura orientada a agentes especializados.

---

## 4.5 Centralización de información comercial

### Idea

Unificar catálogos, precios, productos, marketplaces, inventario y análisis.

### Problema que resuelve

Los datos comerciales suelen vivir separados entre:

- marketplaces;
- ecommerce;
- archivos;
- proveedores;
- notas;
- hojas de cálculo;
- historial de ventas.

### Resultado

Necesidad de un:

**Commerce Data Model**

---

## 4.6 Productos consumibles y de reposición

### Idea

Buscar productos que deben ser comprados nuevamente porque:

- se consumen;
- se desgastan;
- se rompen;
- requieren mantenimiento;
- deben reemplazarse periódicamente.

### Ejemplos

- filtros;
- boquillas;
- pastillas de freno;
- lijas;
- agujas;
- consumibles MIG;
- filtros de agua;
- filtros HEPA;
- accesorios de robots aspiradores;
- consumibles de impresión 3D.

### Problema que resuelve

La reventa tradicional necesita encontrar una nueva oportunidad para cada operación.

Los productos de reposición permiten construir:

- catálogo;
- recurrencia;
- recompra;
- inventario estable;
- clientes recurrentes.

### Resultado

Nacimiento de:

**Replenishment Intelligence**

---

# 5. Nueva definición del producto

## Nombre conceptual

# Commerce Opportunity Intelligence Engine

Nombre corto provisional:

**COIE**

El nombre puede cambiar posteriormente.

---

# 6. Tipos de oportunidad

El sistema deberá soportar múltiples tipos de oportunidades.

```text
OpportunityType

RESALE
REPLENISHMENT
IMPORT
ARBITRAGE
NICHE_DISCOVERY
CATALOG_EXPANSION
BUNDLE_OPPORTUNITY
```

---

# 7. Módulos principales

## 7.1 Resale Intelligence

Detecta productos usados infravalorados.

### Pregunta

> ¿Puedo comprar este producto por debajo de su valor de mercado y revenderlo?

### Variables

- precio compra;
- precio mercado;
- estado;
- liquidez;
- demanda;
- margen;
- velocidad estimada de venta;
- riesgo.

---

## 7.2 Replenishment Intelligence

Analiza productos consumibles y de reposición.

### Pregunta

> ¿Existe una demanda recurrente suficientemente atractiva para vender este producto?

### Variables

- frecuencia de reposición;
- base instalada;
- compatibilidad;
- demanda;
- competencia;
- margen;
- recurrencia;
- logística.

---

## 7.3 Niche Discovery

Busca nichos comerciales potencialmente atractivos.

### Pregunta

> ¿Qué mercados pequeños presentan buenas condiciones para construir un negocio?

### Ejemplos

- consumibles MIG;
- repuestos impresoras 3D;
- accesorios máquinas de coser;
- filtros para purificadores;
- mantenimiento de robots aspiradores.

---

## 7.4 Market Intelligence

Analiza:

- precios;
- dispersión;
- vendedores;
- stock;
- competencia;
- demanda;
- evolución.

---

## 7.5 Sourcing Intelligence

Busca proveedores y analiza abastecimiento.

### Variables

- precio origen;
- MOQ;
- shipping;
- impuestos;
- confiabilidad;
- lead time;
- landed cost.

---

## 7.6 Compatibility Intelligence

Relaciona productos con máquinas, modelos o ecosistemas.

Ejemplo:

```text
Filtro X
compatible con:

Xiaomi S10
Xiaomi S12
Dreame D9
Dreame D10
```

---

## 7.7 Opportunity Scoring

Normaliza múltiples indicadores para comparar oportunidades.

---

## 7.8 Experimentation Engine

Transforma una oportunidad teórica en un experimento comercial.

Ejemplo:

```text
Comprar 20 unidades
Publicar
Medir durante 30 días
Evaluar ventas
Evaluar margen
Evaluar consultas
Decidir escalar o abandonar
```

---

## 7.9 Learning Engine

Aprende utilizando datos reales de ventas.

Con el tiempo:

```text
External Data
+
Internal Sales Data
=
Better Decisions
```

---

# 8. Concepto central: Product Ecosystem

Una de las entidades más importantes del sistema será:

# ProductEcosystem

Representa una máquina, actividad o sistema que genera demanda de productos relacionados.

Ejemplo:

```text
Soldadura MIG
│
├── Soldadora
│
├── Punta contacto
├── Boquilla
├── Difusor
├── Liner
├── Alambre MIG
├── Spray antiadherente
└── Accesorios
```

Otro ejemplo:

```text
Robot aspirador Xiaomi
│
├── Filtros
├── Mopas
├── Cepillos
├── Cepillos laterales
├── Bolsas
└── Baterías
```

---

# 9. Entidades principales

```text
Niche

ProductEcosystem

BaseProduct

Product

Consumable

Compatibility

Supplier

Marketplace

MarketplaceListing

PriceObservation

DemandSignal

SupplySignal

CompetitionSignal

TrendSignal

Opportunity

Experiment

Inventory

Sale

SalesObservation
```

---

# 10. Modelo conceptual

```text
Market
│
└── Niche
    │
    └── ProductEcosystem
        │
        ├── BaseProduct
        │
        └── Product
            │
            ├── MarketplaceListing
            ├── Supplier
            ├── Compatibility
            ├── PriceObservation
            ├── DemandSignal
            └── Opportunity
```

---

# 11. Scores principales

El sistema deberá crear indicadores normalizados entre 0 y 100.

## DemandScore

Estimación de demanda.

## SupplyGapScore

Relación entre demanda y cantidad de oferta.

## CompetitionScore

Nivel de competencia existente.

## MarginScore

Potencial de margen.

## ReplenishmentScore

Potencial de recompra.

## InstalledBaseScore

Estimación del número de máquinas o productos base instalados.

## CaptiveDemandScore

Qué tan obligado está el cliente a comprar un producto compatible específico.

## CompatibilityScore

Cantidad y popularidad de modelos compatibles.

## LogisticsScore

Facilidad de almacenar y despachar.

## InventoryTurnoverScore

Velocidad estimada de rotación.

## CapitalEfficiencyScore

Rentabilidad esperada del capital inmovilizado.

## RiskScore

Nivel de riesgo.

---

# 12. Opportunity Score

El sistema deberá calcular un indicador principal:

# OpportunityScore

Ejemplo conceptual:

```text
OpportunityScore =
Demand
+ SupplyGap
+ Margin
+ Recurrence
+ Logistics
+ Compatibility
+ CapitalEfficiency
- Risk
```

La fórmula exacta deberá evolucionar utilizando datos reales.

---

# 13. Niche Score

Además del producto individual, el sistema deberá evaluar nichos completos.

Variables:

```text
Demand
Recurrence
Competition
Margins
SKU Depth
Logistics
B2B Potential
Growth
Supplier Availability
```

Resultado:

```text
NicheScore = 0–100
```

---

# 14. Economía de SKU

Cada producto deberá tener un modelo económico.

```text
supplier_price
shipping
taxes
customs
landed_cost

sale_price
marketplace_fee
payment_fee
shipping_cost
packaging_cost

gross_profit
contribution_margin
ROI
```

---

# 15. Capital Efficiency

Una métrica clave será:

# Capital Efficiency

Pregunta:

> ¿Cuánto retorno genera cada unidad monetaria invertida en inventario?

No basta con calcular margen.

También importa:

- velocidad de venta;
- frecuencia de reposición;
- inmovilización de capital;
- riesgo de stock.

---

# 16. Arquitectura de agentes

El sistema puede utilizar agentes especializados.

```text
Discovery Agent
│
├── Market Agent
├── Competition Agent
├── Pricing Agent
├── Sourcing Agent
├── Compatibility Agent
├── Economics Agent
├── Risk Agent
└── Scoring Agent
```

---

# 17. Discovery Agent

Responsabilidades:

- identificar nichos;
- detectar patrones;
- proponer productos;
- descubrir ecosistemas;
- generar hipótesis.

---

# 18. Market Agent

Responsabilidades:

- medir demanda;
- analizar precios;
- detectar tendencias;
- evaluar estabilidad.

---

# 19. Competition Agent

Responsabilidades:

- contar vendedores;
- analizar publicaciones;
- medir concentración;
- detectar saturación.

---

# 20. Sourcing Agent

Responsabilidades:

- buscar proveedores;
- comparar costos;
- calcular landed cost;
- detectar MOQ;
- analizar riesgos de abastecimiento.

---

# 21. Compatibility Agent

Responsabilidades:

- relacionar SKU con modelos;
- construir árboles de compatibilidad;
- detectar productos universales;
- calcular Compatibility Coverage.

---

# 22. Economics Agent

Responsabilidades:

- calcular margen;
- ROI;
- contribución;
- capital efficiency;
- escenarios.

---

# 23. Risk Agent

Responsabilidades:

- falsificaciones;
- restricciones regulatorias;
- devoluciones;
- dependencia de proveedor;
- compatibilidad incierta;
- obsolescencia;
- estacionalidad.

---

# 24. Scoring Agent

Responsabilidades:

- normalizar indicadores;
- comparar oportunidades;
- generar ranking;
- explicar razones del score.

---

# 25. Pipeline general

```text
DISCOVERY
↓
NICHE
↓
PRODUCT ECOSYSTEM
↓
PRODUCTS
↓
MARKET DATA
↓
SUPPLY DATA
↓
DEMAND DATA
↓
SOURCING
↓
ECONOMICS
↓
SCORING
↓
OPPORTUNITY
↓
EXPERIMENT
↓
SALES DATA
↓
LEARNING
```

---

# 26. Metodología Agile

El proyecto se desarrollará de manera incremental.

No se intentará construir todo el sistema desde el inicio.

La estructura será:

```text
Vision
↓
Problems
↓
Epics
↓
Features
↓
User Stories
↓
Tasks
↓
Sprint
↓
Review
↓
Iteration
```

---

# 27. Epics iniciales

## EPIC-01 — Data Acquisition

Capturar información de fuentes externas.

---

## EPIC-02 — Product Intelligence

Normalizar productos y características.

---

## EPIC-03 — Market Intelligence

Analizar mercado, precios y competencia.

---

## EPIC-04 — Resale Intelligence

Detectar oportunidades de reventa.

---

## EPIC-05 — Replenishment Intelligence

Detectar productos recurrentes.

---

## EPIC-06 — Niche Discovery

Descubrir nichos comerciales.

---

## EPIC-07 — Sourcing Intelligence

Analizar proveedores.

---

## EPIC-08 — Opportunity Scoring

Construir rankings.

---

## EPIC-09 — Experimentation

Gestionar pruebas comerciales.

---

## EPIC-10 — Learning

Aprender de resultados reales.

---

# 28. MVP

El MVP no debe intentar resolver todo.

Objetivo:

> Demostrar que el sistema puede analizar productos y priorizar oportunidades mejor que una investigación manual básica.

---

# 29. MVP — Funciones

## Entrada

El usuario introduce:

- producto;
- URL;
- categoría;
- búsqueda;
- nicho.

---

## Sistema

Obtiene:

- publicaciones;
- precios;
- cantidad de vendedores;
- datos básicos de demanda;
- proveedores;
- costos estimados.

---

## Resultado

Genera:

```text
Product
Market Price
Demand Estimate
Competition Estimate
Cost Estimate
Margin Estimate
Opportunity Score
Recommendation
```

---

# 30. MVP — Opportunity Types

Inicialmente:

```text
RESALE
REPLENISHMENT
```

No construir todos los modos al mismo tiempo.

---

# 31. MVP — Dashboard

Pantalla principal:

```text
Opportunities
```

Columnas:

```text
Product
Opportunity Type
Market Price
Cost
Margin
Demand
Competition
Risk
Opportunity Score
Status
```

---

# 32. Estados de una oportunidad

```text
DISCOVERED

RESEARCHING

SHORTLISTED

TESTING

VALIDATED

SCALING

REJECTED
```

---

# 33. Sistema de experimentos

Cada oportunidad puede convertirse en experimento.

Ejemplo:

```yaml
experiment:
  product: "Punta MIG 0.8"
  quantity: 50
  capital: 80000
  test_days: 30
  target_sales: 15
  target_margin: 40
```

---

# 34. Métricas del experimento

```text
views
clicks
messages
questions
units_sold
conversion_rate
days_to_sale
gross_margin
returns
repeat_purchase
```

---

# 35. Feedback Loop

```text
Prediction
↓
Experiment
↓
Actual Result
↓
Difference
↓
Model Adjustment
```

El sistema debe registrar:

```text
predicted_demand
actual_demand

predicted_margin
actual_margin

predicted_velocity
actual_velocity
```

---

# 36. Backlog inicial

## P0 — Fundamental

- definir modelo de datos;
- definir Opportunity;
- definir Product;
- definir MarketplaceListing;
- definir PriceObservation;
- construir ingestión básica;
- crear normalizador de productos;
- almacenar histórico;
- crear cálculo básico de precios;
- crear Opportunity Score inicial.

---

## P1 — Importante

- análisis de competencia;
- análisis de proveedores;
- landed cost;
- Replenishment Score;
- Product Ecosystem;
- Compatibility;
- dashboard oportunidades;
- experiment tracking.

---

## P2 — Expansión

- agentes;
- niche discovery automático;
- recomendaciones cross-sell;
- bundles;
- aprendizaje automático;
- alertas;
- automatización avanzada.

---

# 37. Ejemplo de User Story

```text
US-001

Como usuario
quiero introducir un producto
para obtener una estimación de su valor de mercado
y decidir si representa una oportunidad comercial.
```

### Acceptance Criteria

```text
El sistema debe:

- aceptar nombre o URL;
- obtener múltiples referencias;
- calcular precio medio;
- calcular mediana;
- calcular rango;
- mostrar número de observaciones.
```

---

# 38. Ejemplo Replenishment

```text
US-020

Como usuario
quiero conocer la frecuencia estimada de reposición de un producto
para evaluar si puede generar ventas recurrentes.
```

---

# 39. Principios del producto

## 39.1 Evidence before inventory

No comprar productos basándose solamente en intuición.

---

## 39.2 Test before scale

Primero validar con cantidades pequeñas.

---

## 39.3 Capital efficiency

El capital debe asignarse donde tenga mejor retorno esperado.

---

## 39.4 Data accumulation

Cada investigación debe aumentar el conocimiento del sistema.

---

## 39.5 Explainable recommendations

El motor debe explicar por qué recomienda una oportunidad.

---

## 39.6 Modular architecture

Cada módulo debe poder evolucionar independientemente.

---

# 40. Preguntas fundamentales

Cada oportunidad debe intentar responder:

1. ¿Existe demanda?
2. ¿Cuánta competencia existe?
3. ¿Cuál es el precio real?
4. ¿Cuánto cuesta abastecerse?
5. ¿Cuál es el margen?
6. ¿Qué velocidad de venta podemos esperar?
7. ¿Existe recompra?
8. ¿Cuánto capital requiere?
9. ¿Qué riesgo existe?
10. ¿Vale la pena probar?

---

# 41. Base de conocimiento

El proyecto deberá mantener conocimiento estructurado sobre:

```text
markets/
niches/
products/
suppliers/
experiments/
decisions/
research/
```

Esto permitirá que los agentes no comiencen cada investigación desde cero.

---

# 42. Arquitectura documental para Codex + Obsidian

```text
commerce-intelligence/
│
├── README.md
│
├── PRODUCT_VISION.md
├── PRD.md
├── ROADMAP.md
├── BACKLOG.md
│
├── docs/
│   ├── architecture/
│   │   ├── SYSTEM_ARCHITECTURE.md
│   │   ├── DATA_MODEL.md
│   │   └── AGENT_ARCHITECTURE.md
│   │
│   ├── product/
│   │   ├── OPPORTUNITY_TYPES.md
│   │   ├── SCORING_MODEL.md
│   │   └── EXPERIMENTATION.md
│   │
│   ├── research/
│   │   ├── niches/
│   │   ├── products/
│   │   └── markets/
│   │
│   └── decisions/
│       └── ADR-001.md
│
├── agile/
│   ├── EPICS.md
│   ├── USER_STORIES.md
│   ├── SPRINTS.md
│   └── RETROSPECTIVES.md
│
├── experiments/
│
├── ideas/
│
├── changelog/
│   └── CHANGELOG.md
│
└── agents/
    ├── DISCOVERY_AGENT.md
    ├── MARKET_AGENT.md
    ├── SOURCING_AGENT.md
    ├── COMPATIBILITY_AGENT.md
    ├── ECONOMICS_AGENT.md
    ├── RISK_AGENT.md
    └── SCORING_AGENT.md
```

---

# 43. Uso en Obsidian

Obsidian puede utilizar este repositorio directamente como Vault.

Conviene utilizar enlaces internos:

```text
[[PRODUCT_VISION]]

[[PRD]]

[[BACKLOG]]

[[EPICS]]

[[SCORING_MODEL]]
```

También se pueden crear relaciones:

```text
[[Niche - Soldadura MIG]]

[[Product - Punta MIG 0.8]]

[[Supplier - Example]]

[[Experiment - MIG-001]]
```

---

# 44. Convenciones de notas

## Nicho

```yaml
---
type: niche
status: research
score:
created:
updated:
---
```

---

## Producto

```yaml
---
type: product
opportunity_type:
niche:
ecosystem:
status:
score:
---
```

---

## Experimento

```yaml
---
type: experiment
product:
status:
capital:
start_date:
end_date:
---
```

---

# 45. Decision Log

Las decisiones importantes deben registrarse.

Ejemplo:

```text
ADR-001

Decision:
Resale Intelligence pasará a ser un módulo
del Commerce Opportunity Intelligence Engine.

Reason:
El sistema debe soportar múltiples tipos
de oportunidades comerciales.

Status:
Accepted
```

---

# 46. Idea Log

Toda idea nueva debe almacenarse antes de decidir desarrollarla.

Formato:

```text
IDEA-001

Title:
Subscription replenishment alerts

Problem:

Hypothesis:

Potential Value:

Complexity:

Related Epic:

Status:
Inbox
```

---

# 47. Changelog

Registrar modificaciones importantes.

Ejemplo:

```text
2026-08

Added:
- Replenishment Intelligence
- Product Ecosystem
- Niche Score

Changed:
- Resale Intelligence becomes module

Removed:
- None
```

---

# 48. Sprint workflow

Cada sprint debe tener:

```text
Goal

Selected User Stories

Tasks

Technical Notes

Results

Problems

Decisions

Next Actions
```

---

# 49. Definition of Done

Una feature se considera terminada cuando:

- funciona;
- está testeada;
- está documentada;
- tiene datos de ejemplo;
- sus cambios están registrados;
- no rompe módulos anteriores.

---

# 50. Roadmap conceptual

## Phase 0 — Foundation

- documentación;
- arquitectura;
- modelo de datos;
- repositorio.

## Phase 1 — Market Price Intelligence

- productos;
- listings;
- precios;
- histórico.

## Phase 2 — Resale Intelligence

- detección de arbitraje usado.

## Phase 3 — Replenishment Intelligence

- consumibles;
- recurrencia;
- ecosistemas.

## Phase 4 — Sourcing

- proveedores;
- landed cost.

## Phase 5 — Experiments

- validación comercial.

## Phase 6 — Learning

- datos reales;
- calibración.

## Phase 7 — Autonomous Discovery

- agentes descubriendo oportunidades automáticamente.

---

# 51. North Star

La métrica más importante del sistema no debería ser:

> cantidad de productos encontrados.

Debería acercarse a:

> **Capital deployed into validated profitable opportunities.**

Métricas relacionadas:

```text
Validated Opportunity Rate

Experiment Success Rate

Median ROI

Inventory Turnover

Capital Efficiency

Prediction Accuracy
```

---

# 52. Principio estratégico

El sistema no debe intentar responder:

> ¿Qué producto debería vender?

Debe responder:

> ¿Qué oportunidad comercial tiene actualmente la mejor combinación de evidencia, rentabilidad, recurrencia, velocidad y riesgo?

---

# 53. Estado actual

Actualmente el proyecto se encuentra en:

```text
DISCOVERY / PRODUCT DEFINITION
```

Se han identificado:

- problema;
- visión;
- módulos principales;
- oportunidad de expansión;
- primeras entidades;
- primeros scores;
- arquitectura conceptual;
- metodología de desarrollo.

---

# 54. Próximo objetivo

Convertir este documento maestro en documentos separados:

1. `PRODUCT_VISION.md`
2. `PRD.md`
3. `SYSTEM_ARCHITECTURE.md`
4. `DATA_MODEL.md`
5. `EPICS.md`
6. `BACKLOG.md`
7. `ROADMAP.md`
8. `AGENT_ARCHITECTURE.md`
9. `SCORING_MODEL.md`
10. `CONTEXT.md`

Posteriormente comenzar:

# Sprint 0 — Project Foundation

Objetivo:

> Preparar la base documental y técnica para comenzar desarrollo iterativo con Codex.

---

# 55. Regla para futuras conversaciones

Cada vez que aparezca una nueva idea se deberá decidir si corresponde a:

```text
Idea
Research
Decision
Epic
Feature
User Story
Experiment
Architecture
```

De esta forma el conocimiento del proyecto permanecerá organizado y no dependerá de conversaciones aisladas.

---

# 56. Concepto final actual

La evolución conceptual del proyecto es:

```text
Reselling
↓
Price Intelligence
↓
Marketplace Intelligence
↓
Automated Research
↓
Opportunity Detection
↓
Replenishment Intelligence
↓
Niche Discovery
↓
Commerce Opportunity Intelligence Engine
```

La tesis central es:

> Los mercados contienen ineficiencias detectables mediante datos.

El sistema busca convertir esas ineficiencias en oportunidades comerciales medibles, experimentables y escalables.
