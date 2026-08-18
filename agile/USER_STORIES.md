---
type: user-story-index
status: active
updated: 2026-08-12
---

# Historias de usuario iniciales

## US-001 — Estimar valor de mercado

Como operador comercial, quiero introducir un producto o URL para obtener una estimación trazable de su valor de mercado y decidir si merece investigación.

### Aceptación

- acepta nombre o URL;
- utiliza múltiples referencias comparables;
- informa media, mediana, rango, dispersión y número de observaciones;
- separa condición y precio pedido/vendido;
- muestra fuentes, fechas, exclusiones y calidad de muestra.

## US-002 — Conservar histórico de precios

Como analista, quiero conservar observaciones sucesivas para comprender cambios y no depender de una fotografía actual.

### Aceptación

- una captura no sobrescribe otra;
- cada observación tiene fuente y fecha;
- duplicados idempotentes no inflan la muestra;
- correcciones conservan auditoría.

## US-003 — Normalizar productos

Como analista, quiero vincular publicaciones equivalentes a un producto/variante canónicos para comparar elementos realmente compatibles.

### Aceptación

- conserva título y atributos originales;
- registra confianza de coincidencia;
- no fusiona automáticamente ambigüedades críticas;
- permite revertir una fusión conservando relaciones.

## US-004 — Calcular economía unitaria

Como operador, quiero ver landed cost, contribución, margen y ROI para evitar decisiones basadas sólo en diferencia de precios.

### Aceptación

- incluye todos los componentes de costo disponibles;
- datos faltantes no se convierten en cero;
- moneda, cantidad, fuente y supuestos son visibles;
- escenario base y adverso son reproducibles.

## US-005 — Estimar demanda y competencia

Como operador, quiero distinguir demanda, oferta y competencia para evaluar liquidez y saturación.

### Aceptación

- muestra métricas/proxies subyacentes;
- identifica ventana y cobertura;
- no presenta proxies como ventas exactas;
- señala conflictos y antigüedad.

## US-006 — Comparar oportunidades

Como operador, quiero un tablero ordenable para priorizar dónde investigar o probar.

### Aceptación

- muestra columnas definidas en [[PRD]];
- filtra por tipo, estado, score, riesgo y vigencia;
- el detalle explica el ranking;
- oportunidades con gates se distinguen visualmente.

## US-007 — Recibir recomendación explicable

Como responsable de capital, quiero entender por qué una oportunidad fue recomendada para revisar la evidencia antes de actuar.

### Aceptación

- muestra score, riesgo, confianza, cobertura y versión;
- enumera factores positivos/negativos y datos faltantes;
- presenta gates y sensibilidad;
- nunca ejecuta la compra automáticamente.

## US-008 — Gestionar estados

Como operador, quiero mover una oportunidad por un ciclo controlado para mantener trazabilidad de decisiones.

### Aceptación

- sólo permite transiciones válidas;
- actor, fecha y motivo quedan registrados;
- rechazo exige motivo;
- reabrir exige nueva evidencia.

## US-020 — Estimar reposición

Como operador, quiero conocer la frecuencia estimada de reposición de un producto para evaluar ventas recurrentes.

### Aceptación

- identifica producto base/ecosistema;
- registra intervalo, causa y evidencia de reposición;
- diferencia estimación de dato observado;
- muestra `ReplenishmentScore` y confianza.

## US-021 — Validar compatibilidad

Como analista, quiero relacionar un repuesto con modelos compatibles para estimar cobertura sin provocar devoluciones.

### Aceptación

- cada relación tiene fuente y estado;
- separa `CLAIMED`, `VERIFIED`, `CONFLICTED` y `REJECTED`;
- conflictos reducen score/confianza;
- permite consultar cobertura por marca y modelo.

## US-030 — Crear experimento

Como operador, quiero convertir una oportunidad preseleccionada en una prueba limitada para validar demanda y economía reales.

### Aceptación

- exige hipótesis, cantidad, capital, duración, predicciones y criterios;
- exige stop conditions y aprobación humana;
- congela la versión inicial;
- impide iniciar con gates bloqueantes.

## US-031 — Comparar predicción y resultado

Como analista, quiero comparar demanda, margen y velocidad predichas con las reales para mejorar decisiones futuras.

### Aceptación

- conserva predicción y resultado por separado;
- calcula error con método versionado;
- distingue `validated`, `rejected` e `inconclusive`;
- permite agregar resultados por cohorte sin cambiar históricos.

## Definition of Ready

Una historia está lista para sprint cuando tiene:

- usuario y resultado;
- criterios verificables;
- épica y prioridad;
- dependencias conocidas;
- datos/fixtures previstos;
- decisiones bloqueantes identificadas;
- tamaño suficiente para completarse dentro del sprint o división propuesta.

## Definition of Done

Una historia está terminada cuando:

- funciona según aceptación;
- tiene pruebas proporcionales al riesgo;
- incluye datos de ejemplo sin secretos;
- está documentada;
- registra decisiones y cambios relevantes;
- conserva compatibilidad o documenta migración;
- pasa validaciones del repositorio;
- fue demostrada o revisada.
