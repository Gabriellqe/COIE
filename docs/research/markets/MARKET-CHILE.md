---
type: research
status: in_progress
updated: 2026-08-18
---

# Mercado inicial — Chile

## Alcance y pregunta

Definir el contexto mínimo para evaluar oportunidades `RESALE` de repuestos usados asociados a NK150 en Chile.

## Parámetros decididos

- País: Chile (`CL`).
- Moneda base: peso chileno (`CLP`).
- Zona horaria de presentación: `America/Santiago`.
- Fuentes candidatas declaradas por el usuario: Mercado Libre Chile y Facebook Marketplace.
- Método inicial: carga manual estructurada.

## Hechos disponibles

Las fuentes candidatas sólo están disponibles actualmente como páginas públicas para el usuario. No existe acceso API entregado al proyecto.

La investigación fechada [[DATA-ACQUISITION-CL-2026-08-18]] confirma que Mercado Libre Chile dispone de una API oficial, pero su uso por COIE para inteligencia comercial necesita confirmación contractual escrita antes de considerarse autorizado. Facebook Marketplace exige permiso escrito expreso para recolección automatizada y queda restringido a entrada manual.

## Limitaciones y datos faltantes

- términos y mecanismos de acceso permitido por fuente;
- campos observables y estabilidad;
- política permitida de retención;
- distinción disponible entre precio pedido y venta confirmada;
- primer repuesto/variante real para benchmark.

## Conclusión provisional

Foundation utilizará datos `DEMO` y entrada manual trazable. Ninguna fuente se marca como autorizada para automatización hasta completar la revisión correspondiente; la investigación de Mercado Libre y Meta no satisface aún ese gate.

## Criterio de revisión

Actualizar antes del primer conector o benchmark real y registrar fuentes directas con fecha de consulta. Para el estado al 2026-08-18, consultar [[DATA-ACQUISITION-CL-2026-08-18]].
