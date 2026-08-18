# Instrucciones para agentes

## Identidad y autoridad documental

- El proyecto es Commerce Opportunity Intelligence Engine (`COIE`).
- La documentación funcional se escribe en español; los identificadores de código y dominio usan inglés consistente.
- Ante conflictos, aplicar este orden: ADR aceptado más reciente, `PRD.md`, arquitectura/modelo/scoring, visión, backlog/sprint y por último el documento maestro histórico.
- No modificar `Commerce_Opportunity_Intelligence_Engine_MASTER.md`; se conserva como fuente histórica.

## Flujo obligatorio de trabajo

1. Leer `CONTEXT.md`, el sprint activo y los documentos afectados.
2. Vincular el trabajo con un ID de Foundation, épica o historia.
3. Registrar mediante ADR cualquier decisión que cambie arquitectura, datos, seguridad o alcance.
4. Implementar el incremento mínimo completo y mantener cambios no relacionados intactos.
5. Ejecutar las validaciones proporcionales al cambio.
6. Actualizar sprint, backlog, documentación y changelog antes de considerar el trabajo terminado.
7. Aplicar la Definition of Done de `agile/USER_STORIES.md`.

Ningún incremento está terminado si el código, las pruebas y el estado documental discrepan.

## Comandos del repositorio

- Instalar: `pnpm install --frozen-lockfile`
- Desarrollo: `pnpm dev`
- Validación completa: `pnpm check`
- Pruebas: `pnpm test`
- Validación documental: `pnpm docs:validate`

Si un comando todavía no existe porque Foundation no lo ha creado, documentar la ausencia; no inventar un resultado.

## Reglas de dominio

- Todo dato externo conserva fuente, fecha y método de captura.
- `unknown` no equivale a cero.
- No mezclar monedas sin conversión trazable.
- No mezclar condiciones, variantes ni `ASKING`/`SOLD` en una cohorte comparable.
- Las observaciones son históricas y no se sobrescriben.
- Score, riesgo, confianza y cobertura se muestran por separado y con versión.
- Los datos DEMO deben estar etiquetados y nunca presentarse como evidencia real.
- Ninguna automatización compra, publica, contacta proveedores ni asigna capital sin aprobación humana explícita.
- No implementar scraping ni conectores hasta documentar un método permitido para la fuente.

## Multiagentes

- Usar subagentes cuando el trabajo pueda dividirse en tareas independientes de exploración, revisión, pruebas o investigación.
- Preferir subagentes de sólo lectura para trabajo paralelo.
- Mantener un único integrador responsable cuando haya escrituras sobre archivos relacionados.
- Esperar y reconciliar los resultados de los subagentes antes de cerrar la tarea.
- No usar agentes de desarrollo como sustituto de los agentes comerciales futuros descritos en `agents/`.

## Límites del Sprint 0

- Se permite un shell visual A+B, un repositorio DEMO, contratos, fixtures y validaciones.
- No presentar scoring, demanda, compatibilidad o economía como calibrados.
- Supabase, autenticación real, RLS, conectores, formularios productivos y dashboard completo pertenecen a incrementos posteriores salvo cambio explícito de alcance.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
