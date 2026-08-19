---
type: benchmark-protocol
status: accepted
version: 0.1.0
updated: 2026-08-19
---

# Benchmark manual del MVP v0.1.0

## Objetivo

Comparar trazabilidad, consistencia y tiempo entre una investigación manual controlada y COIE sin prometer una mejora antes de medirla.

## Niveles

### B0 — Fixture controlado

Usa el fixture `DEMO` del repositorio. Valida elegibilidad, segmentación, deduplicación, estadísticas, procedencia y reproducibilidad.

Estado: `PARTIAL`. Foundation/A1 prueba selección del último snapshot antes de evaluar elegibilidad, separación `ASKING`/`SOLD`, condición, fecha de corte, exclusiones explicadas, suficiencia, IQR e integridad de referencias. La matriz B0 completa —incluyendo importación idempotente persistente, moneda alternativa en fixture, gates y economía desconocida— sigue pendiente y no se presenta como aprobada.

### B1 — Caso real NK150

Estado: `NOT_RUN`. Requiere una pieza/variante exacta y un método permitido para obtener observaciones reales.

## Etapas del benchmark MVP-A

- **A1 Market Evidence:** cohorte, estadísticas, suficiencia y procedencia.
- **A2 Resale Decision:** pricing disponible, máximo de compra/economía o gates, riesgo y decisión.
- **A3 Experimentation Lite:** predicción contra resultado y decisión final.

B0 sólo cubre parcialmente A1. No valida Quick Sale, Target, Premium, Maximum Buy, liquidez, economía ni score comercial.

## Parámetros congelados antes de cada ejecución

- producto y variante;
- condición;
- Chile y `CLP`;
- `price_type`;
- fuentes y método permitidos;
- ventana y fecha de corte;
- límite de tiempo;
- regla de último snapshot por listing;
- deduplicación;
- conversión monetaria;
- regla de outliers, cuartiles y redondeo;
- versión del esquema y cálculo.

## Captura manual base

El analista registra fuente, URL, título, identificador, condición, tipo de precio, monto, moneda, fecha observada, inclusión/exclusión y motivo. Las ambigüedades se resuelven antes de observar la salida de COIE.

La primera comparación utiliza las mismas filas en ambos métodos para aislar validación y cálculo. Una evaluación futura comparará el flujo completo de captura.

## Métricas

- precisión y cobertura del conjunto elegible frente al conjunto de referencia;
- exactitud de `n`, media, mediana, mínimo, máximo y rango;
- supresión de duplicados;
- procedencia completa;
- ausencia de mezcla entre condición, tipo de precio o moneda;
- preservación de datos desconocidos;
- exclusiones explicadas;
- reproducibilidad mediante versión y hash;
- afirmaciones factuales sin soporte: cero;
- tiempo manual y tiempo asistido, registrados sin objetivo previo.

Para A2/A3 se añadirán, antes de ejecutarlos:

- error de precio/velocidad por escenario con ground truth definido;
- exactitud de costos y contribución;
- diferencia entre Maximum Buy recomendado y límite de referencia;
- gates correctamente activados ante inputs desconocidos;
- error de predicción frente a resultado real.

No se evalúa Quick Sale contra precios `ASKING`; requiere ventas/tiempo hasta venta o un proxy acordado y etiquetado.

## Tolerancias B0

- conteos, segmentación y deduplicación: exactos;
- dinero derivado: ±1 CLP si existe redondeo;
- porcentajes: ±0,01 puntos porcentuales;
- procedencia, `unknown` y gates: 100 %.

## Criterio de aceptación

El protocolo base permanece congelado. Extenderlo a A2/A3 exige nueva versión antes de observar resultados. B1 sigue pendiente de evidencia real permitida.
