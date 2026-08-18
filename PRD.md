---
type: prd
status: draft
version: 0.1
updated: 2026-08-12
---

# Product Requirements Document — MVP

## 1. Objetivo

Demostrar que COIE puede analizar productos y priorizar oportunidades `RESALE` y `REPLENISHMENT` de forma más consistente, trazable y reutilizable que una investigación manual básica.

## 2. Alcance funcional

### Entrada

El usuario puede iniciar un análisis mediante:

- nombre de producto;
- URL de una publicación;
- categoría o búsqueda;
- nicho.

### Procesamiento

El sistema debe:

- capturar o recibir múltiples referencias de mercado;
- conservar fuente, instante de observación y moneda;
- normalizar la identidad del producto y su condición;
- calcular estadísticas de precio;
- producir estimaciones básicas de demanda y competencia;
- registrar alternativas de abastecimiento y costos;
- calcular economía unitaria y scores normalizados;
- expresar incertidumbre, datos faltantes y razones de la recomendación.

### Salida

Cada análisis debe producir como mínimo:

```text
Product
Opportunity Type
Market Price
Demand Estimate
Competition Estimate
Cost Estimate
Margin Estimate
Risk Estimate
Opportunity Score
Confidence
Recommendation
Evidence Summary
```

## 3. Requisitos funcionales

| ID | Requisito | Prioridad |
|---|---|---|
| RF-001 | Crear o reutilizar un producto a partir de nombre o URL. | P0 |
| RF-002 | Registrar publicaciones con marketplace, URL, vendedor, precio, moneda, condición y fecha de captura. | P0 |
| RF-003 | Registrar observaciones de precio sin sobrescribir el histórico. | P0 |
| RF-004 | Normalizar referencias que representan el mismo producto y conservar la evidencia original. | P0 |
| RF-005 | Calcular cantidad de observaciones, media, mediana, mínimo, máximo y dispersión. | P0 |
| RF-006 | Separar comparables por condición y excluir outliers mediante una regla visible. | P0 |
| RF-007 | Estimar demanda y competencia con las señales disponibles e indicar su cobertura. | P0 |
| RF-008 | Registrar proveedor, precio de origen, MOQ, envío, impuestos, aduana y lead time cuando estén disponibles. | P0 |
| RF-009 | Calcular landed cost, beneficio bruto, margen de contribución y ROI con supuestos visibles. | P0 |
| RF-010 | Calcular componentes y `OpportunityScore` conforme a [[SCORING_MODEL]]. | P0 |
| RF-011 | Mostrar una recomendación explicada, riesgos, evidencia a favor y datos faltantes. | P0 |
| RF-012 | Mantener el ciclo de estados de una oportunidad. | P0 |
| RF-013 | Convertir una oportunidad preseleccionada en experimento. | P1 |
| RF-014 | Registrar predicción y resultado real de demanda, margen y velocidad. | P1 |
| RF-015 | Modelar ecosistemas y compatibilidades para oportunidades `REPLENISHMENT`. | P1 |
| RF-016 | Listar y ordenar oportunidades en un tablero. | P1 |
| RF-017 | Filtrar el tablero por tipo, estado, score, riesgo y vigencia. | P1 |
| RF-018 | Conservar un log de cambios de estado y de versiones del score. | P1 |

## 4. Reglas de negocio

### RB-001 — Evidencia mínima

Una oportunidad no puede pasar a `SHORTLISTED` si no tiene:

- al menos tres referencias comparables de precio, salvo excepción documentada;
- fecha y fuente para cada dato externo utilizado;
- cálculo económico con moneda y supuestos;
- desglose de riesgo y confianza.

El número tres es un umbral inicial configurable, no una afirmación estadística de suficiencia.

### RB-002 — Datos faltantes

Un dato ausente permanece `unknown`; no se transforma en cero ni en valor neutral. La confianza y la cobertura deben reducirse.

### RB-003 — Moneda

No se agregan precios de monedas diferentes sin una conversión que registre tasa, fuente y fecha.

### RB-004 — Condición

Productos nuevos, reacondicionados y usados se comparan por separado, salvo que exista un ajuste explícito y versionado.

### RB-005 — Recomendación

El score ordena; no autoriza una compra. La recomendación final incluye el experimento mínimo sugerido y sus límites de capital.

### RB-006 — Riesgo

Un riesgo crítico regulatorio, de falsificación, seguridad o compatibilidad puede bloquear la recomendación aunque el score bruto sea alto.

### RB-007 — Versionado

Toda oportunidad conserva la versión de fórmula y de parámetros con la que fue puntuada.

## 5. Estados y transiciones

```text
DISCOVERED → RESEARCHING → SHORTLISTED → TESTING → VALIDATED → SCALING
                         ↘ REJECTED
              RESEARCHING → REJECTED
                  TESTING → REJECTED
```

- `DISCOVERED`: hipótesis registrada, todavía sin análisis suficiente.
- `RESEARCHING`: recolección y normalización activas.
- `SHORTLISTED`: cumple evidencia mínima y merece prueba.
- `TESTING`: experimento en ejecución.
- `VALIDATED`: cumplió los criterios definidos antes del experimento.
- `SCALING`: aumento de capital aprobado por decisión humana.
- `REJECTED`: no cumple criterios; debe conservar motivo.

Reabrir una oportunidad rechazada requiere nueva evidencia y deja registro del cambio.

## 6. Flujos principales

### F-01 — Analizar un producto

1. El usuario ingresa nombre o URL y selecciona el tipo de oportunidad.
2. El sistema identifica o crea el producto.
3. Se incorporan referencias y observaciones.
4. Se revisan comparabilidad, vigencia y procedencia.
5. Se calculan precio de mercado, economía y señales.
6. Se genera score, confianza y recomendación.
7. El usuario descarta, continúa investigando o preselecciona.

### F-02 — Validar mediante experimento

1. El usuario convierte una oportunidad `SHORTLISTED` en experimento.
2. Define capital, cantidad, duración y umbrales antes de iniciar.
3. Registra métricas durante la prueba.
4. El sistema compara predicción y resultado.
5. El usuario decide validar, rechazar o extender con una justificación.

## 7. Tablero del MVP

Columnas mínimas:

```text
Product
Opportunity Type
Market Price
Cost
Contribution Margin
Demand
Competition
Risk
Confidence
Opportunity Score
Status
Updated At
```

## 8. Requisitos no funcionales

| ID | Requisito |
|---|---|
| RNF-001 | Trazabilidad: todo valor derivado debe poder rastrearse a observaciones y versión de cálculo. |
| RNF-002 | Reproducibilidad: recalcular con los mismos datos y parámetros produce el mismo resultado. |
| RNF-003 | Modularidad: conectores de fuentes no deben contener reglas de scoring. |
| RNF-004 | Idempotencia: repetir una captura con la misma identidad no debe duplicar observaciones. |
| RNF-005 | Auditabilidad: cambios de estado, supuestos y ajustes manuales deben quedar registrados. |
| RNF-006 | Resiliencia: el fallo de una fuente no invalida datos ya almacenados ni oculta cobertura incompleta. |
| RNF-007 | Seguridad: secretos y credenciales no se almacenan en documentación ni datos versionados. |
| RNF-008 | Cumplimiento: cada conector debe respetar términos, límites y restricciones de la fuente. |
| RNF-009 | Portabilidad: el modelo de dominio no dependerá del formato particular de un marketplace. |
| RNF-010 | Observabilidad: cada ejecución debe informar fuente, duración, registros procesados y errores. |

Los objetivos cuantitativos de rendimiento se definirán después de elegir las primeras fuentes y el stack mediante ADR.

## 9. Criterios de aceptación del MVP

El incremento se acepta cuando:

- un usuario puede completar F-01 con datos de ejemplo y con al menos una fuente real autorizada;
- se calculan estadísticas robustas y economía unitaria con pruebas automatizadas;
- el score muestra componentes, pesos, cobertura y versión;
- una oportunidad puede recorrer el ciclo hasta `TESTING` y registrar resultados;
- existe un conjunto de datos de ejemplo reproducible;
- cada RF P0 implementado está probado y documentado;
- una demostración compara el resultado con una investigación manual básica;
- no se presentan estimaciones como hechos cuando la señal no es observable.

## 10. Dependencias y decisiones pendientes

- primer mercado, país y moneda base;
- primeras fuentes con acceso permitido;
- stack de aplicación y persistencia;
- interfaz inicial: CLI, web o ambas;
- método inicial de autenticación si existe más de un usuario;
- umbrales de frescura por tipo de señal;
- pesos iniciales de scoring calibrados mediante revisión experta.

Estas decisiones deben resolverse como ADR antes de afectar implementación irreversible.

## 11. Referencias

- [[PRODUCT_VISION]]
- [[SYSTEM_ARCHITECTURE]]
- [[DATA_MODEL]]
- [[SCORING_MODEL]]
- [[EXPERIMENTATION]]
- [[BACKLOG]]
