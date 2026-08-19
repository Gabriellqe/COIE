---
type: user-story-index
status: active
updated: 2026-08-19
---

# Historias de usuario

## MVP-A1 — Market Evidence

### US-001 — Estimar evidencia de precio

Como operador, quiero introducir un producto o URL para obtener estadísticas trazables de comparables y saber qué evidencia existe antes de decidir.

**Aceptación:**

- acepta nombre, URL o carga estructurada;
- informa cohorte, muestra, media, mediana, rango y dispersión;
- separa condición, variante, moneda y `ASKING/SOLD`;
- muestra fuentes, fechas, exclusiones, suficiencia, confianza y cobertura;
- no llama Market Value a una mediana `ASKING` sin soporte.

### US-002 — Conservar histórico

Como analista, quiero conservar observaciones sucesivas para entender cambios sin sobrescribir el pasado.

**Aceptación:** fuente/método/fecha obligatorios, idempotencia, correcciones auditables y último valor por listing sin perder snapshots.

### US-003 — Normalizar productos

Como analista, quiero vincular referencias equivalentes a un producto/variante canónicos.

**Aceptación:** conserva original, confianza y revisión; no fusiona ambigüedades críticas; una fusión es reversible/auditable.

## MVP-A2 — Resale Decision

### US-010 — Evaluar una oportunidad Resale

Como operador, quiero evaluar una publicación concreta para decidir investigar, descartar, negociar externamente o probar.

**Aceptación:** identifica strategy/subject efectivo, precio/condición de compra, evidencia comparable, economía, liquidez/proxy, riesgo, confianza, cobertura, gates y siguiente acción.

### US-011 — Recomendar escenarios de venta

Como operador, quiero distinguir Quick, Target y Premium para elegir un objetivo de venta sin confundirlo con precios observados.

**Aceptación:** cada escenario expone canal, evidencia, supuestos, calibración y velocidad opcional; falta de soporte produce `unknown` con motivo; no publica automáticamente.

### US-012 — Calcular precio máximo de compra

Como operador, quiero conocer cuánto puedo pagar como máximo para cumplir contribución y reservas definidas.

**Aceptación:** usa escenario, costos, contribución mínima, riesgo y capital/tiempo; inputs críticos desconocidos activan gate; conserva versión y supuestos.

### US-013 — Estimar liquidez

Como operador, quiero conocer la velocidad/liquidez esperada y la calidad de su evidencia.

**Aceptación:** distingue dato observado y proxy; declara ventana/método/confianza; publicaciones activas solas no se presentan como ventas ni velocidad.

### US-004 — Calcular economía unitaria

Como operador, quiero ver costos, contribución, margen y ROI con escenarios reproducibles.

**Aceptación:** costos desconocidos no son cero; moneda/cantidad/supuestos visibles; escenario base/adverso; diferencia entre costo real, hipotético y máximo de compra.

### US-005 — Estimar demanda y competencia

Como analista, quiero distinguir demanda, oferta y competencia mediante señales disponibles.

**Aceptación:** proxies etiquetados, ventana/cobertura, conflictos y antigüedad visibles.

### US-007 — Recibir recomendación explicable

Como responsable de capital, quiero entender una recomendación antes de actuar.

**Aceptación:** score, riesgo, confianza, cobertura y versión separados; factores, faltantes, gates y sensibilidad; aprobación humana obligatoria.

### US-008 — Gestionar estados

Como operador, quiero un ciclo auditable de oportunidad.

**Aceptación:** transiciones válidas, actor/fecha/motivo, rechazo con causa e inconcluso/modificación regresando a `RESEARCHING`.

## MVP-A3 — Experimentation Lite

### US-030 — Crear experimento Lite

Como operador, quiero probar una oportunidad preseleccionada con capital y pérdidas limitadas.

**Aceptación:** hipótesis, cantidad, canal, duración, predicciones, criterios, stop conditions y aprobación congelados antes de iniciar.

### US-031 — Comparar predicción y resultado

Como analista, quiero comparar demanda, margen y velocidad predichas con las reales.

**Aceptación:** predicción/resultado separados, error versionado, observaciones append-only y resultado `VALIDATED/REJECTED/INCONCLUSIVE`.

## Experiencia y soporte

### US-006 — Comparar oportunidades

Como operador, quiero un dashboard funcional para priorizar oportunidades.

**Aceptación:** diferencia shell DEMO de producto completo; muestra disponibilidad de outputs, filtros, gates y detalle explicable.

### US-009 — Acceder a workspace aislado

Como integrante, quiero autenticación y aislamiento antes de trabajar con datos reales multiusuario.

**Aceptación:** Supabase Auth, workspace/membresía, RLS, pruebas negativas de acceso cruzado y sin contraseñas de dominio. Planificada según [[ADR-008]].

## Incrementos futuros

### US-020 — Estimar reposición

Como operador, quiero conocer ciclo de reemplazo y recompra potencial de un producto.

**Aceptación:** producto base/ecosistema, causa/intervalo, evidencia, base instalada/proxy, score y confianza.

### US-021 — Validar compatibilidad

Como analista, quiero relacionar un repuesto con modelos compatibles sin elevar afirmaciones débiles a verificadas.

**Aceptación:** fuente, estados `CLAIMED/VERIFIED/CONFLICTED/REJECTED`, cobertura y conflictos visibles.

### US-022 — Relacionar productos

Como analista, quiero registrar accesorios, consumibles, reemplazos, alternativas y complementos con evidencia.

**Aceptación:** dirección/tipo, assertions append-only, fuente/fecha/método/confianza y revisión antes de `VERIFIED`.

### US-040 — Identificar estacionalidad

Como operador, quiero saber cuándo preparar y vender un producto o nicho.

**Aceptación:** baseline, histórico, índices, peaks, lead time, evergreen/insuficiencia, confianza y cobertura; asking history no se trata como demanda.

### US-041 — Evaluar canal de venta

Como operador, quiero comparar canales mediante fees, demanda, velocidad y restricciones para elegir cómo vender.

**Aceptación:** costos/condiciones por canal, evidencia fechada, recomendación explicada y datos faltantes.

## Definition of Ready

Una historia está lista cuando tiene usuario/resultado, aceptación verificable, épica/prioridad, dependencias, fixtures previstos, decisiones bloqueantes y tamaño abordable.

## Definition of Done

Una historia está terminada cuando:

- funciona según aceptación;
- tiene pruebas proporcionales al riesgo;
- incluye datos de ejemplo etiquetados y sin secretos;
- está documentada;
- registra decisiones/cambios relevantes;
- conserva compatibilidad o documenta migración;
- pasa validaciones del repositorio;
- fue demostrada o revisada;
- código, pruebas y estado documental coinciden.
