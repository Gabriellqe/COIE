---
type: research
status: completed
created: 2026-08-18
market: CL
related_foundation: FND-007
---

# Investigación de adquisición de datos — Chile

## Alcance y pregunta

Evaluar cómo puede COIE obtener evidencia de mercado para `RESALE` de repuestos usados en Chile, empezando por Mercado Libre Chile y Facebook Marketplace. La pregunta no es sólo si una URL puede consultarse técnicamente: ¿existe un método permitido, utilizable para inteligencia comercial, con coste, campos, límites y retención conocidos?

**Fecha de consulta:** 2026-08-18.
**Estado de decisión:** no selecciona ni autoriza un conector. Sustentó `FND-007` y conserva vigente [[ADR-003]]. El addendum del 2026-08-19 está gobernado por [[ADR-010]].

## Resultado ejecutivo

1. **No se implementará scraping web.** Una página pública no implica permiso de automatización.
2. **Facebook Marketplace queda excluido de automatización.** Meta exige permiso escrito expreso previo para toda recolección automatizada; no hay un API público de Marketplace identificado para búsqueda de inventario de terceros.
3. **Mercado Libre Chile es la única vía técnica candidata para un piloto:** API REST oficial, `site_id=MLC`, registro de aplicación y credenciales. Sin embargo, sus términos restringen el uso del contenido/API, el desarrollo de servicios competidores y la divulgación a terceros. Dado que COIE hace análisis de oportunidades y precios, se requiere confirmación escrita de Mercado Libre sobre ese uso antes de activarlo.
4. Hasta obtener esa confirmación, el único método permitido en COIE continúa siendo `MANUAL_USER_ENTRY`. El 2026-08-19 se comprobó este mecanismo con un aporte manual autorizado por el usuario; esto cierra `FND-007` como mecanismo `MANUAL_ONLY`, no como autorización de Meta.

## Addendum 2026-08-19 — aporte manual real

El usuario aportó una extracción manual de Facebook Marketplace, declaró autorización para su tratamiento interno y especificó la hora de captura. [[MANUAL-CAPTURE-FACEBOOK-NK150-2026-08-19]] documenta la minimización, selección y calidad; [[ADR-010]] limita la retención a 90 días y prohíbe reinterpretar el aporte como permiso de automatización. `DA-003` permanece `BLOCKED`.

## Matriz de fuentes en alcance

| Fuente | Método técnico posible | ¿Automatización autorizada para COIE hoy? | Cobertura útil | Coste de acceso publicado | Decisión operativa |
|---|---|---|---|---|---|
| Mercado Libre Chile | API REST oficial (`api.mercadolibre.com`), aplicación DevCenter y OAuth para recursos que lo requieran | **Pendiente de confirmación contractual escrita** | Publicaciones activas, título, precio pedido, moneda, categoría, condición/atributos, URL/ID y algunas señales declaradas por el vendedor | No se publica una suscripción ni tarifa base. Los términos permiten limitar llamadas discrecionalmente y cobrar excedentes | Preparar solicitud de autorización; no construir conector aún |
| Facebook Marketplace | No se identificó API público de inventario Marketplace para este caso | **No**; Meta exige permiso escrito expreso antes de recolectar automáticamente | Sólo observación humana si se ingresa manualmente y con datos mínimos | No aplica: no hay acceso automatizado autorizado | Mantener sólo carga manual trazable; no robots, navegador automatizado ni API no oficial |

## Mercado Libre Chile

### Acceso e integración propuestos si se autoriza

1. Crear una cuenta de desarrollador y una aplicación en DevCenter; en Chile se validan los datos del titular antes de crearla.
2. Solicitar por escrito a Mercado Libre que confirme que COIE puede buscar/consultar publicaciones de terceros y conservar los campos mínimos para análisis interno de precios. La solicitud debe describir propósito, usuarios, campos, frecuencia, retención, eliminación y controles de seguridad.
3. Tras confirmación, registrar la fuente en la allowlist con versión/URL de términos, alcance aprobado y fecha de revisión. Guardar `client_id` y secreto fuera del repositorio; usar OAuth cuando el endpoint lo exija.
4. Implementar después `DA-001` y `DA-003`: `discover` por consulta/categoría en `MLC`, `fetch` de detalle por ID, mapeo a observaciones inmutables y `CaptureRun` por lote. No usar HTML ni selectores.
5. Aplicar rate limiter, backoff para `429`/`403`, paginación acotada, caché mínima y un interruptor de desactivación por fuente. Los límites efectivos deben leerse de la respuesta/documentación vigente y persistirse por ejecución: Mercado Libre puede cambiarlos discrecionalmente.

### Datos que sí y no sustentan el MVP

La documentación de ítems/búsquedas permite evidencia de **publicaciones activas** y documenta campos tales como ID, título, categoría, precio, moneda, condición y atributos. Esto soporta únicamente `ASKING` y la comparación segmentada por condición, variante y fecha.

No debe inferirse una venta confirmada desde una publicación activa ni de una señal agregada como `sold_quantity`. La documentación no ofrece para el caso de terceros un historial de transacciones con fecha, precio final y condición comparable. COIE debe mapear esta fuente como `ASKING`, conservar `observed_at` y mostrar esa limitación.

No se deben guardar credenciales de usuarios, datos de pago, descripciones/páginas completas, imágenes ni identificadores de vendedores salvo que la autorización escrita los cubra y sean indispensables. La captura cruda permanece deshabilitada por defecto; basta con URL/ID, campos canónicos, huella y procedencia.

### Coste y límites

- La documentación revisada no presenta precio de suscripción o tarifa por llamada para la API.
- Los términos reservan a Mercado Libre la facultad de limitar llamadas y de cobrar por excedentes o interrumpir el acceso; por ello el coste de acceso se clasifica como **no publicado / sujeto a confirmación**.
- Antes del piloto, solicitar por escrito cuota, coste por excedente, política de retención y plazo de aviso para cambios. No presupuestar la API como gratuitamente escalable.
- Los costes internos (desarrollo, observabilidad, almacenamiento permitido, gestión de secretos y revisión legal) se estimarán cuando haya una cuota y frecuencia aprobadas; no se inventa una cifra comercial sin volumen ni aprobación.

## Facebook Marketplace

Los Términos de Meta prohíben acceder o recolectar datos de sus productos por medios automatizados sin permiso previo. Sus Términos de Recolección Automatizada exigen además permiso escrito expreso; aceptar esos términos no constituye el permiso. `robots.txt` también declara prohibida la recolección automatizada salvo permiso expreso.

Por tanto, no son métodos permitidos: Playwright/Selenium, extensiones, perfiles simulados, endpoints privados/no documentados, proveedores de scraping, rotación de IP, CAPTCHA bypass o cualquier mecanismo que imite navegación humana. Un proveedor externo no transfiere automáticamente autorización a COIE.

Para evaluar una futura integración, Meta tendría que conceder permiso escrito que cubra Marketplace, búsqueda de listados, finalidad de inteligencia comercial, campos personales, transferencia, retención y límites. No se solicitará ni implementará dicha integración como parte de Foundation.

## Reglas transversales de cumplimiento y datos

- La autorización técnica (token o endpoint) no equivale a derecho contractual de reutilización analítica. Cada fuente requiere revisión de finalidad, usuarios, redistribución, derivados y retención.
- Minimizar datos personales: no almacenar nombres, perfiles, contacto, ubicación precisa, fotos ni texto libre de vendedores si el análisis puede funcionar con campos no personales. Separar identificador externo de cualquier dato personal y aplicar retención corta.
- Chile mantiene vigente la Ley 19.628; la Ley 21.719 entra en vigencia el **2026-12-01**. El diseño debe llegar a esa fecha con inventario de tratamientos, finalidad/base jurídica, seguridad, retención/eliminación y mecanismos para derechos de titulares. Esta nota no sustituye revisión legal.
- Cada observación conserva fuente, URL/ID, método de captura, `observed_at`, versión de términos, autorización aplicable y versión de conector. `unknown` nunca se convierte en cero ni en venta confirmada.
- No se exportan, venden, redistribuyen ni usan datos de una fuente para entrenar modelos o construir perfiles hasta que la licencia específica lo permita expresamente.

## Proceso de aprobación antes del primer conector

| Gate | Evidencia requerida | Responsable de aprobación | Resultado si falla |
|---|---|---|---|
| G1 — finalidad | Respuesta escrita de la fuente que cubra inteligencia interna de precios y publicaciones de terceros | Responsable de producto + revisión legal | Continuar manual |
| G2 — acceso | Aplicación/credencial de menor privilegio y endpoints documentados | Responsable técnico | No guardar secretos ni desarrollar integración |
| G3 — datos | Lista de campos, clasificación personal/no personal, `ASKING`/`SOLD`, retención y eliminación | Producto + privacidad | Reducir campos o rechazar fuente |
| G4 — operación | Cuota, coste, rate limits, errores, aviso de cambios y contacto de soporte | Responsable técnico + producto | No programar refrescos |
| G5 — piloto | Muestra pequeña autorizada, `CaptureRun`, trazabilidad y test de revocación | Responsable técnico | No pasar a producción |

Un gate aprobado debe registrarse en un ADR antes de cambiar `DataSource.status` o activar un conector.

## Alternativas futuras, fuera del alcance actual

eBay, Etsy, Discogs y StockX ofrecen APIs oficiales para algunos verticales, pero sus licencias, cuotas, campos y restricciones de derivados/analítica son específicos. GOAT no mostró un API público de marketplace para este fin y sus términos prohíben scraping. Ninguna de estas fuentes se incorpora por esta investigación: cada una necesita una nota de investigación propia, validación de cobertura para Chile y ADR antes de entrar a la allowlist.

## Fuentes directas

- Mercado Libre, [crear una aplicación en Chile](https://developers.mercadolibre.cl/es_cl/crea-una-aplicacion-en-mercado-libre-es), consultada 2026-08-18.
- Mercado Libre, [ítems y búsquedas](https://developers.mercadolibre.cl/items-y-busquedas), consultada 2026-08-18.
- Mercado Libre, [publicar/consultar productos y campos de ítem](https://developers.mercadolibre.cl/es_cl/publica-productos), consultada 2026-08-18.
- Mercado Libre, [términos del programa de desarrolladores](https://developers.mercadolibre.cl/es_ar/terminos-y-condiciones), consultada 2026-08-18.
- Meta, [Terms of Service](https://www.facebook.com/terms), consultada 2026-08-18.
- Meta, [Automated Data Collection Terms](https://www.facebook.com/legal/automated_data_collection_terms), consultada 2026-08-18.
- Meta, [robots.txt](https://www.facebook.com/robots.txt), consultada 2026-08-18.
- Biblioteca del Congreso Nacional, [Ley 19.628 vigente hasta 2026-11-30](https://www.bcn.cl/leychile/Navegar?idNorma=141599&idParte=8642680), consultada 2026-08-18.
- Biblioteca del Congreso Nacional, [Ley 21.719 y vigencia 2026-12-01](https://www.bcn.cl/leychile/Navegar?idNorma=1209272&idParte=10527471&idVersion=2026-12-01), consultada 2026-08-18.

## Criterio de frescura

Revisar esta nota antes de: solicitar una autorización, crear una aplicación, contratar un proveedor, implementar un conector, aumentar frecuencia o el 2026-11-01 (por la entrada en vigencia de la Ley 21.719), lo que ocurra primero. No cambiar un estado a `AUTHORIZED` sin evidencia fechada y ADR aceptado.
