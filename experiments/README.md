# Experimentos

Este directorio contiene una nota por prueba comercial. La especificación común está en [[EXPERIMENTATION]].

## Convenciones

- ID `EXP-NNN` estable.
- Un experimento referencia una oportunidad `SHORTLISTED`.
- Hipótesis, predicciones, éxito y stop conditions se completan antes de `RUNNING`.
- Resultados se agregan sin borrar el plan original.
- Cierre obligatorio: `validated`, `rejected` o `inconclusive`, con razón.
- `inconclusive` o `modify` devuelve la oportunidad a investigación sin borrar el experimento.
- MVP-A3 usa el perfil Lite y no requiere integración automática de inventario/canales.

Copiar [[EXPERIMENT-TEMPLATE]] para iniciar una prueba.
