---
type: research
status: completed
created: 2026-08-19
market: CL
related_foundation: FND-007
---

# Captura manual Facebook Marketplace — kit de transmisión NK150

## Alcance

Registrar de manera mínima y trazable la extracción manual aportada por el propietario para la consulta `Kit De Arrastre /transmision Nk150` en Facebook Marketplace Santiago. El usuario declaró autorización para su uso interno en COIE.

## Metadatos

| Campo | Valor |
|---|---|
| Fuente de procedencia | Facebook Marketplace Chile |
| Método | `MANUAL_USER_ENTRY` desde exportación aportada por el usuario |
| Captura local declarada | `2026-08-19 15:00 America/Santiago` |
| Captura UTC | `2026-08-19T19:00:00Z` |
| Tipo de precio | `ASKING` |
| Uso | investigación interna COIE |
| Automatización autorizada | no |

## Selección reproducible

El archivo contenía 30 filas y 28 IDs de listing únicos. Se conservaron 16 listings únicos cuyo título visible declara un kit de arrastre/transmisión y menciona explícitamente `NK150`. Se suprimieron dos repeticiones por `externalListingId`; resultados de otros modelos, motos completas, accesorios y piezas sin coincidencia exacta se descartaron del registro detallado.

No se usaron imágenes para inferir relevancia. Las URLs firmadas de fotografías se descartaron y no se copiaron al repositorio ni al almacén local.

## Calidad y elegibilidad

De las 16 filas seleccionadas:

- nueve muestran precios placeholder o anómalos: dos en `CLP 0`, cuatro en `CLP 1`, una en `CLP 38`, una en `CLP 39` y una en `CLP 4.490`;
- siete muestran precios `ASKING` entre `CLP 29.900` y `CLP 45.000`;
- ninguna declara de forma suficiente una condición homogénea, composición/variante completa y cantidad comparable.

Por ello el conjunto elegible actual es `n=0`. Las 16 filas permanecen en cuarentena con motivos explícitos; no se calcula ni publica mediana, Market Value, precio realizable, demanda o liquidez. La mención de NK150 es una afirmación del anuncio `CLAIMED_UNVERIFIED`, no compatibilidad verificada por COIE.

## Retención

El detalle se conserva sólo en `.data/imports/facebook-marketplace-nk150-2026-08-19.json`, ruta local excluida de Git. El registro contiene campos estructurados mínimos y ningún dato personal del vendedor. Debe revisarse o eliminarse antes de `2026-11-17T19:00:00Z`, según [[ADR-010]].

## Conclusión

La captura comprueba un mecanismo real permitido de aporte manual y los campos mínimos disponibles, cerrando `FND-007` con alcance `MANUAL_ONLY`. No autoriza un conector; `DA-003` permanece bloqueado. El siguiente paso de datos es revisión humana de condición, composición, variante, cantidad y precios antes de cualquier promoción a evidencia comparable.

## Criterio de revisión

Revisar al recibir detalles adicionales de las publicaciones, antes de promover evidencia a un almacén REAL o al vencer la retención.
