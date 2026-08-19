---
type: research
status: completed
created: 2026-08-19
updated: 2026-08-19
---

# Reconciliación conceptual de COIE — 2026-08-19

## Pregunta

¿La planificación vigente conserva la idea acumulada en las conversaciones que originaron COIE y qué debe corregirse antes de continuar?

## Material revisado

Tres síntesis entregadas por el propietario del proyecto:

1. evolución desde Resale, Price Intelligence y adquisición de marketplaces;
2. mapa conceptual de doce capacidades y cinco preguntas fundamentales;
3. factibilidad y posible implementación técnica de cada capacidad.

Las síntesis fueron tratadas como contexto conceptual consolidado, no como fuentes de datos comerciales ni autorización técnica para acceder a plataformas.

## Hallazgos

### Coincidencia

La visión vigente conservaba el propósito: descubrir, evaluar, probar y aprender de oportunidades comerciales usando evidencia, economía, riesgo y resultados reales.

### Desalineaciones

- el PRD y el modelo efectivo estaban más centrados en `Product` que en `Opportunity`;
- Price Intelligence, Commercial Pricing y Maximum Buy Price estaban mezclados;
- Seasonality y la pregunta «¿cómo venderlo?» tenían poca representación;
- `RESALE` y `REPLENISHMENT` compartían la etiqueta MVP antes de validar el primer vertical;
- Experimentation estaba demasiado tarde para cerrar el ciclo;
- Platform Access había adquirido prioridad comercial P0 sin pertenecer al problema central.

### Restricciones que se mantienen

- no scraping/conectores sin método permitido;
- procedencia, fecha y método obligatorios;
- `unknown` distinto de cero;
- `ASKING` y `SOLD` separados;
- score, riesgo, confianza y cobertura separados;
- aprobación humana antes de compras, publicaciones o capital;
- resultados DEMO etiquetados y no calibrados.

## Decisiones resultantes

- [[ADR-006]] — Opportunity como agregado central y perfil MVP-A Resale.
- [[ADR-007]] — Separación de evidencia de mercado, pricing y máximo de compra.
- [[ADR-008]] — Platform Access diferido del primer ciclo comercial.

## Conclusión

La idea era viable y reconocible, pero debía reorganizarse alrededor de un ciclo de decisión completo y no de una lista de motores. La reestructuración conserva el shell Foundation y reduce el primer alcance a un vertical `RESALE` trazable, sin eliminar las capacidades futuras.
