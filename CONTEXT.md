---
type: project-context
status: active
updated: 2026-08-12
---

# Contexto operativo

## Identidad

**Proyecto:** Commerce Opportunity Intelligence Engine (`COIE`).  
**Fase:** Discovery / Product Definition; Sprint 0 iniciado.  
**Idioma del proyecto:** español; identificadores de dominio y código en inglés consistente.  
**Fuente histórica:** [[Commerce_Opportunity_Intelligence_Engine_MASTER]].

## Objetivo inmediato

Completar [[SPRINT-000]] y comenzar un incremento vertical de Market Price Intelligence que acepte un producto, incorpore referencias, calcule estadísticas y preserve procedencia/histórico.

## Orden de autoridad documental

Cuando exista conflicto:

1. ADR aceptado más reciente;
2. [[PRD]] para alcance y requisitos;
3. [[DATA_MODEL]], [[SYSTEM_ARCHITECTURE]] y [[SCORING_MODEL]] para contratos técnicos;
4. [[PRODUCT_VISION]] para intención estratégica;
5. [[BACKLOG]] y sprint actual para ejecución;
6. documento maestro como contexto histórico.

El conflicto debe señalarse y resolverse; no se elige silenciosamente la interpretación conveniente.

## Reglas de dominio que no deben romperse

- El MVP implementa `RESALE` y `REPLENISHMENT`; otros tipos se modelan, no se construyen completos.
- Todo dato externo lleva fuente y fecha.
- Las observaciones históricas no se sobrescriben.
- `unknown` no equivale a cero.
- Precio pedido y precio vendido son categorías distintas.
- Monedas no se agregan sin conversión trazable.
- Condiciones/variantes incompatibles no se mezclan.
- `OpportunityScore`, `RiskScore`, confianza y cobertura se muestran separados.
- Los cálculos y scores son versionados y reproducibles.
- Ninguna recomendación compra, publica o escala inventario automáticamente.
- Los criterios de un experimento se fijan antes de iniciarlo.

## Flujo para nueva información

Clasificar primero como una de estas categorías:

| Categoría | Destino |
|---|---|
| Idea | `ideas/` con estado `Inbox` |
| Research | `docs/research/` con fuentes y fecha |
| Decision | `docs/decisions/ADR-NNN-*.md` |
| Epic | [[EPICS]] |
| Feature/User Story | [[USER_STORIES]] y [[BACKLOG]] |
| Experiment | `experiments/` |
| Architecture | `docs/architecture/` y ADR si decide un trade-off |

No convertir una idea directamente en trabajo P0 sin hipótesis, valor y relación con el MVP.

## Protocolo para cambios

1. Leer README, contexto, sprint actual y documentos afectados.
2. Revisar estado del repositorio y preservar cambios no relacionados.
3. Identificar requisito/historia y criterios de aceptación.
4. Actualizar diseño o ADR si cambia un contrato importante.
5. Implementar el incremento mínimo completo.
6. Probar casos correctos, límites y fallos.
7. Actualizar fixtures, documentación, backlog y changelog.
8. Verificar Definition of Done antes de marcar `DONE`.

## Convenciones de documentación

- Markdown compatible con Obsidian.
- Enlaces internos de Obsidian con doble corchete cuando el nombre de la nota sea único.
- Frontmatter con `type`, `status`, `created/updated` según corresponda.
- IDs estables: `EPIC-NN`, `US-NNN`, `ADR-NNN`, `EXP-NNN`, `IDEA-NNN`, `SPRINT-NNN`.
- Fechas ISO `YYYY-MM-DD`.
- Hechos, inferencias, hipótesis y decisiones deben distinguirse.
- Investigación externa incluye URL/fuente, fecha de consulta, mercado y limitaciones.

## Convenciones técnicas provisionales

Hasta decidir el stack:

- modelo de dominio independiente de conectores;
- dinero decimal + moneda;
- timestamps UTC;
- IDs internos estables;
- validación de esquemas en límites de entrada;
- tests deterministas sin depender de red;
- secretos fuera del repositorio;
- fixture pequeño pero representativo para cada contrato.

## Calidad

Aplicar la Definition of Done de [[USER_STORIES]]. En documentación, además:

- enlaces resuelven;
- no hay IDs duplicados;
- tablas y Mermaid renderizan;
- estado y fecha están actualizados;
- el changelog refleja cambios materiales;
- las decisiones pendientes no se presentan como aceptadas.

## Estado conocido y bloqueos de producto

Pendientes de decisión humana/ADR:

- mercado, país y moneda del primer incremento;
- primera fuente con acceso permitido;
- stack, persistencia e interfaz inicial;
- umbrales de frescura y benchmark;
- límites de capital para experimentos reales.

Mientras estén pendientes, se puede avanzar con contratos, fixtures y lógica pura, pero no asumir silenciosamente valores comerciales reales.
