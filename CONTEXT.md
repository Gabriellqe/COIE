---
type: project-context
status: active
updated: 2026-08-19
---

# Contexto operativo

## Identidad

**Proyecto:** Commerce Opportunity Intelligence Engine (`COIE`).

**Fase:** Foundation / reconciliación conceptual; Sprint 0 activo.

**Perfil en desarrollo:** **MVP-A Resale Decision**.

**Idioma:** documentación funcional en español; identificadores de código/dominio en inglés.

**Fuente histórica:** [[Commerce_Opportunity_Intelligence_Engine_MASTER]].

## Modelo rector

`Opportunity` es el agregado central:

```text
DISCOVER → EVALUATE → TEST → MEASURE → SCALE / REJECT / MODIFY
```

COIE debe responder:

1. ¿Qué vender?
2. ¿Vale la pena?
3. ¿Dónde comprarlo?
4. ¿Cómo venderlo?
5. ¿Debería seguir haciéndolo?

Las estrategias, los sujetos y las capacidades son dimensiones distintas. Ver [[OPPORTUNITY_MODEL]] y [[ADR-006]].

## Decisiones vigentes del primer incremento

- Mercado: Chile (`CL`), moneda `CLP`, presentación `America/Santiago`, persistencia UTC.
- Caso inicial: `RESALE` de un repuesto usado asociado a NK150; fixtures `DEMO`.
- Adquisición: carga manual trazable; fuentes reales pendientes de autorización.
- Stack: Next.js, React, TypeScript y PostgreSQL/Supabase como objetivo; adaptador DEMO sin red.
- Interfaz: shell A+B, no dashboard productivo completo.
- Perfil canónico actual: `opportunityType + productId`; migración futura versionada a `strategy + subject`.
- Workspaces: `workspace_id` se conserva; Supabase Auth/RLS se difiere según [[ADR-008]].

## Objetivo inmediato

Cerrar Sprint 0 resolviendo FND-007 y preparar MVP-A1:

```text
Producto/publicación RESALE
→ cohorte comparable
→ MarketPriceEstimate trazable
```

Después:

```text
MVP-A2 Resale Decision
→ PricingRecommendation
→ MaximumBuyPrice
→ Economics Core
→ riesgo/confianza/gates

MVP-A3 Experimentation Lite
→ predicción
→ prueba
→ resultado
→ decisión
```

## Orden de autoridad

1. ADR aceptado más reciente;
2. [[PRD]];
3. [[DATA_MODEL]], [[SYSTEM_ARCHITECTURE]], [[SCORING_MODEL]] y especificaciones de producto;
4. [[PRODUCT_VISION]];
5. [[BACKLOG]] y sprint activo;
6. documento maestro histórico.

## Reglas de dominio

- Todo dato externo conserva fuente, fecha y método.
- Las observaciones son históricas y no se sobrescriben.
- `unknown` no equivale a cero.
- `ASKING` y `SOLD` permanecen separados.
- No mezclar monedas, condiciones o variantes sin ajuste trazable.
- Una mediana `ASKING` no es automáticamente `Market Value` ni precio realizable.
- `MarketPriceEstimate`, `PricingRecommendation` y `MaximumBuyPrice` son contratos distintos.
- `Quick Sale` requiere ventas/velocidad o un proxy explícito; si falta, permanece desconocido.
- Score, riesgo, confianza y cobertura se muestran separados y versionados.
- Resultados DEMO o no calibrados se etiquetan visiblemente.
- Ninguna recomendación compra, publica, contacta, negocia o escala capital automáticamente.
- Un experimento congela predicciones y criterios antes de ejecutarse.
- No se implementa scraping ni conectores sin método permitido.

## Perfil Foundation frente al modelo objetivo

### Implementado

- dataset DEMO `0.1.0`;
- estrategia efectiva `RESALE`;
- sujeto efectivo `PRODUCT` con publicaciones;
- estadísticas de cohorte `USED/ASKING/CLP`;
- cohorte explicada por último snapshot, fecha de corte y exclusiones;
- `MarketPriceEstimate` DEMO calculado en lectura con suficiencia, IQR, inputs y versión;
- procedencia, histórico, workspace y score no calibrado.

### Documentado, no implementado

- sujetos `LISTING`, `NICHE`, `SUPPLY_ROUTE`, `PRODUCT_SET` nativos;
- persistencia histórica de importaciones manuales y `MarketPriceEstimate`;
- pricing `QUICK/TARGET/PREMIUM`;
- `MaximumBuyPrice` y liquidez calculados;
- reposición, grafo de productos, estacionalidad y learning;
- Supabase Auth/RLS y conectores reales.

## Clasificación de nueva información

| Categoría | Destino |
|---|---|
| Idea | `ideas/` |
| Research | `docs/research/` |
| Decision | `docs/decisions/ADR-NNN.md` |
| Epic | [[EPICS]] |
| User Story | [[USER_STORIES]] y [[BACKLOG]] |
| Experiment | `experiments/` |
| Architecture | `docs/architecture/` + ADR cuando corresponda |

## Protocolo de cambios

1. Leer contexto, sprint y documentos afectados.
2. Revisar worktree y preservar cambios no relacionados.
3. Vincular el trabajo a Foundation, épica o historia.
4. Registrar decisiones de arquitectura/alcance mediante ADR.
5. Implementar el incremento mínimo completo.
6. Probar casos correctos, límites y fallos.
7. Actualizar documentación, backlog, sprint y changelog.
8. Aplicar la Definition of Done de [[USER_STORIES]].

## Calidad

- cálculos reproducibles y versionados;
- fixtures sin secretos y etiquetados DEMO;
- tests sin red;
- enlaces Obsidian válidos e IDs únicos;
- código, pruebas y estado documental coherentes;
- decisiones pendientes no presentadas como aceptadas.

## Bloqueos conocidos

- primera fuente real con mecanismo permitido;
- ejecución B1 con una pieza/variante real;
- umbrales de frescura;
- costos y contribución objetivo para Maximum Buy;
- evidencia suficiente para Quick Sale y liquidez;
- límites de capital para experimentos reales.
