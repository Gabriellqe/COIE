---
type: architecture
status: proposed
version: 0.3
updated: 2026-08-19
---

# Modelo de datos

## 1. Objetivo

Definir un modelo canónico que preserve historia y procedencia, permita comparar oportunidades y no dependa del esquema de una fuente específica.

## 2. Convenciones

- Identificadores internos: UUID o equivalente, generados por el sistema.
- Identificadores externos: se conservan junto a `source_id`.
- Fechas operativas: UTC en formato ISO 8601.
- Dinero: monto decimal y código ISO 4217; nunca `float` binario.
- Cantidades: valor y unidad explícita.
- Datos desconocidos: `null/unknown`, nunca cero implícito.
- Observaciones: append-only; una corrección agrega una nueva versión o marca invalidez con motivo.
- Derivados: conservan `calculation_version`, inputs y timestamp.
- Borrado lógico cuando la auditoría o una relación histórica lo exijan.
- `workspace_id` delimita propiedad y acceso de entidades comerciales; no se acepta desde el cliente sin comprobar membresía.

## 3. Vista conceptual

El documento distingue:

- **perfil Foundation/MVP-A:** `RESALE + PRODUCT`, implementado por schema `0.1.0`;
- **modelo objetivo:** strategy + subject tipado, activado mediante versiones futuras.

```mermaid
erDiagram
    USER_PROFILE ||--o{ WORKSPACE_MEMBER : integra
    WORKSPACE ||--o{ WORKSPACE_MEMBER : autoriza
    WORKSPACE ||--o{ PRODUCT : contiene
    WORKSPACE ||--o{ OPPORTUNITY : evalua
    MARKET ||--o{ NICHE : contiene
    NICHE ||--o{ PRODUCT_ECOSYSTEM : agrupa
    PRODUCT_ECOSYSTEM ||--o{ BASE_PRODUCT : incluye
    PRODUCT_ECOSYSTEM ||--o{ PRODUCT : genera_demanda
    PRODUCT ||--o{ MARKETPLACE_LISTING : aparece_en
    MARKETPLACE ||--o{ MARKETPLACE_LISTING : publica
    MARKETPLACE_LISTING ||--o{ PRICE_OBSERVATION : registra
    PRODUCT ||--o{ COMPATIBILITY : tiene
    BASE_PRODUCT ||--o{ COMPATIBILITY : acepta
    SUPPLIER ||--o{ SUPPLIER_OFFER : ofrece
    PRODUCT ||--o{ SUPPLIER_OFFER : abastecido_por
    PRODUCT ||--o{ SIGNAL : evidencia
    PRODUCT ||--o{ OPPORTUNITY : origina
    OPPORTUNITY ||--o{ MARKET_PRICE_ESTIMATE : sustenta
    OPPORTUNITY ||--o{ PRICING_RECOMMENDATION : recomienda
    OPPORTUNITY ||--o{ MAXIMUM_BUY_PRICE : limita
    OPPORTUNITY ||--o{ SCORE_RUN : evaluada_por
    OPPORTUNITY ||--o{ EXPERIMENT : valida
    EXPERIMENT ||--o{ EXPERIMENT_OBSERVATION : mide
    EXPERIMENT ||--o{ INVENTORY_LOT : adquiere
    INVENTORY_LOT ||--o{ SALE : produce
```

### 3.1 Identidad y aislamiento

`Market`, `DataSource` y `Marketplace` forman catálogos de referencia compartidos. Productos, aliases, capturas, listings, observaciones, proveedores, oportunidades, scores, experimentos y auditoría pertenecen a un workspace.

#### UserProfile

Perfil de dominio vinculado al identificador del proveedor de autenticación. Campos: `id`, `auth_user_id`, `display_name`, `created_at`, `updated_at`. No almacena contraseñas.

#### Workspace

Límite de propiedad y colaboración: `id`, `name`, `workspace_type` (`PERSONAL`, `SHARED`), `created_by`, `created_at`, `updated_at`.

#### WorkspaceMember

Membresía explícita: `workspace_id`, `user_profile_id`, `role` (`OWNER`, `MEMBER`), `created_at`. La combinación `workspace_id + user_profile_id` es única.

Al integrar Supabase, Row Level Security verifica la membresía para cada lectura y escritura. Una referencia a otra entidad debe pertenecer al mismo workspace, salvo catálogos compartidos declarados.

## 4. Entidades de taxonomía

### Market

Ámbito geográfico y comercial.

| Campo | Tipo | Regla |
|---|---|---|
| `id` | ID | requerido |
| `name` | texto | requerido |
| `country_code` | ISO 3166-1 | requerido |
| `currency_code` | ISO 4217 | requerido |
| `timezone` | IANA | requerido |
| `status` | enum | `ACTIVE`, `INACTIVE` |

### Niche

Segmento comercial investigable.

Campos mínimos: `id`, `market_id`, `name`, `description`, `status`, `current_score_run_id`, `created_at`, `updated_at`.

### ProductEcosystem

Máquina, actividad o sistema que genera demanda relacionada.

Campos mínimos: `id`, `niche_id`, `name`, `description`, `ecosystem_type`, `status`.

### BaseProduct

Equipo o producto instalado que acepta consumibles o repuestos.

Campos mínimos: `id`, `ecosystem_id`, `brand`, `model`, `variant`, `identifiers`, `status`.

## 5. Catálogo e identidad

### Product

Identidad canónica de un SKU o producto comercializable.

| Campo | Tipo | Regla |
|---|---|---|
| `id` | ID | requerido |
| `workspace_id` | ID | requerido; propietario lógico |
| `canonical_name` | texto | requerido |
| `brand` | texto nullable | no inventar si falta |
| `model` | texto nullable | normalizado |
| `variant_attributes` | mapa | color, tamaño, capacidad, etc. |
| `category` | referencia/texto | taxonomía versionada |
| `product_kind` | enum | `BASE`, `CONSUMABLE`, `PART`, `ACCESSORY`, `OTHER` |
| `manufacturer_identifiers` | lista | SKU, GTIN, MPN, EAN, UPC |
| `unit_quantity` | decimal | cantidad vendida |
| `unit_of_measure` | enum | unidad normalizada |
| `status` | enum | `CANDIDATE`, `ACTIVE`, `MERGED`, `INACTIVE` |
| `merged_into_id` | ID nullable | sólo si `MERGED` |

`Consumable` se representa inicialmente mediante `product_kind=CONSUMABLE` y atributos de reposición. Sólo se separará como entidad si aparecen reglas exclusivas suficientes.

### ProductAlias

Nombre observado asociado a un producto canónico: `id`, `product_id`, `source_id`, `raw_name`, `normalized_name`, `locale`, `confidence`, `created_at`.

### Compatibility

Relación entre un `Product` y un `BaseProduct`.

Campos: `id`, `product_id`, `base_product_id`, `compatibility_type`, `status`, `confidence`, `evidence_refs`, `validated_by`, `validated_at`.

Estados: `CLAIMED`, `VERIFIED`, `CONFLICTED`, `REJECTED`. Una afirmación del vendedor no equivale a compatibilidad verificada.

### ProductRelationship — futuro

Arista dirigida o simétrica entre productos canónicos:

```text
id / workspace_id
from_product_id / to_product_id
relationship_type
directionality
scope_attributes
current_status
current_resolution_id?
```

Tipos iniciales: `ACCESSORY_FOR`, `CONSUMABLE_FOR`, `REPLACEMENT_FOR`, `SUBSTITUTE_FOR`, `COMPLEMENTARY_WITH`, `COMPONENT_OF`, `FREQUENTLY_BUNDLED_WITH`.

`ProductRelationshipAssertion` conserva evidencia append-only, fuente, fecha, método, confianza y estado. Una sugerencia de IA no se convierte en relación verificada. `Compatibility` permanece especializada para fitment `Product ↔ BaseProduct`.

## 6. Fuentes, publicaciones y precios

### DataSource

Registro de procedencia: `id`, `name`, `source_type`, `base_url`, `access_method`, `terms_reference`, `retention_policy`, `status`.

### Marketplace

Plataforma dentro de un mercado: `id`, `market_id`, `data_source_id`, `name`, `fee_policy_version`.

### MarketplaceListing

Publicación externa, separada de sus observaciones temporales.

Campos mínimos:

```text
id
workspace_id
marketplace_id
external_listing_id
canonical_url
seller_external_id
raw_title
product_id?
condition
listing_type
first_seen_at
last_seen_at
status
identity_confidence
```

### ListingSnapshot

Captura permitida de atributos variables: `id`, `workspace_id`, `listing_id`, `observed_at`, `price`, `currency`, `shipping_price`, `stock_claim`, `units_sold_claim`, `seller_reputation`, `content_hash`, `raw_ref`, `capture_run_id` nullable. La referencia puede ser nula sólo para datos históricos importados cuya ejecución no esté disponible; nuevas cargas manuales crean `CaptureRun`.

### PriceObservation

Observación canónica de precio usada en análisis.

Campos: `id`, `workspace_id`, `subject_type`, `subject_id`, `price_type`, `amount`, `currency`, `condition`, `quantity`, `observed_at`, `source_id`, `snapshot_id`, `conversion_ref`, `quality_status`.

`price_type`: `ASKING`, `SOLD`, `SUPPLIER`, `REFERENCE`, `INTERNAL_SALE`. Los precios publicados y vendidos nunca se mezclan sin diferenciación.

### MarketPriceEstimate

Ejecución derivada de una cohorte comparable. Conserva sujeto/producto, mercado, condición, tipo de precio, moneda, fecha de corte, ventana, definición de cohorte, muestra, estadísticas, estimación central opcional, confianza, cobertura, exclusiones, inputs, evidencia DEMO/REAL y versión.

`ASKING` y `SOLD` producen ejecuciones separadas. Sin suficiencia, `central_estimate` es `null` y el estado `INSUFFICIENT_DATA`.

### PricingRecommendation

Ejecución comercial con escenarios `QUICK`, `TARGET`, `PREMIUM`, canal, precio/velocidad opcionales, supuestos, confianza, cobertura y estado de calibración. Nunca publica automáticamente.

### MaximumBuyPrice

Límite derivado del escenario de venta, costos, contribución mínima, reserva de riesgo y capital/tiempo. Un costo crítico desconocido produce gate y valor `null`.

Especificación completa: [[PRICING_MODEL]].

## 7. Señales

### Signal

Sobre común para evidencia temporal:

```text
id
subject_type
subject_id
signal_type
value
unit
direction
observed_at
valid_until?
source_id
evidence_ref
quality_score
method_version
```

Tipos iniciales: `DEMAND`, `SUPPLY`, `COMPETITION`, `TREND`, `INSTALLED_BASE`, `REPLENISHMENT_INTERVAL`, `RISK`.

Los nombres conceptuales `DemandSignal`, `SupplySignal`, `CompetitionSignal` y `TrendSignal` son especializaciones de este sobre. Se separarán físicamente sólo si requieren atributos propios.

### SeasonalityProfile — futuro

Ejecución por `PRODUCT` o `NICHE`, mercado, granularidad, ventana, baseline, buckets, clasificación, peaks, lead time de preparación, confianza, cobertura, método, evidencia e inputs. `INSUFFICIENT_DATA` es distinto de `EVERGREEN`. Ver [[SEASONALITY]].

## 8. Abastecimiento y economía

### Supplier

Campos: `id`, `workspace_id`, `name`, `market_id`, `website`, `verification_status`, `reliability_score`, `risk_notes`, `created_at`, `updated_at`.

### SupplierOffer

Oferta temporal de un proveedor: `id`, `supplier_id`, `product_id`, `supplier_sku`, `unit_price`, `currency`, `moq`, `lead_time_days`, `incoterm`, `valid_from`, `valid_until`, `source_id`, `observed_at`.

### EconomicsRun

Resultado reproducible:

```text
id
opportunity_id
calculation_version
currency
quantity
acquisition_cost
supplier_price?
inbound_shipping
repair_cost
taxes
customs
landed_cost
sale_price
pricing_recommendation_id?
pricing_scenario?
marketplace_fee
payment_fee
outbound_shipping
packaging_cost
other_variable_cost
gross_profit
contribution_amount
contribution_margin
roi
capital_invested
expected_days_to_sell
capital_efficiency
assumptions
input_refs
calculated_at
```

Fórmulas base:

```text
landed_cost = acquisition_cost + inbound_shipping + repair_cost + taxes + customs
contribution = sale_price - landed_cost - marketplace_fee
               - payment_fee - outbound_shipping - packaging_cost
contribution_margin = contribution / sale_price
roi = contribution / capital_invested
capital_efficiency = expected_contribution / (capital_invested × expected_holding_period)
```

Las unidades de tiempo de `capital_efficiency` deben declararse; la comparación usa la misma base.

## 9. Oportunidades y scoring

### Opportunity

#### Perfil Foundation/MVP-A

| Campo | Tipo | Regla |
|---|---|---|
| `id` | ID | requerido |
| `workspace_id` | ID | requerido; propietario lógico |
| `product_id` | ID | requerido en MVP |
| `market_id` | ID | requerido |
| `opportunity_type` | enum | según [[OPPORTUNITY_TYPES]] |
| `status` | enum | ciclo definido en [[PRD]] |
| `hypothesis` | texto | requerido |
| `current_score_run_id` | ID nullable | puntero, no sobreescribe histórico |
| `owner_id` | ID nullable | responsable humano |
| `rejection_reason` | texto nullable | requerido al rechazar |
| `created_at`, `updated_at` | timestamp | requeridos |

#### Modelo objetivo

La evolución sustituirá conceptualmente `opportunity_type + product_id` por `strategy + subject`:

```text
Strategy: RESALE | REPLENISHMENT | IMPORT | ARBITRAGE | ...
Subject: PRODUCT | LISTING | NICHE | SUPPLY_ROUTE | PRODUCT_SET
```

Se preservarán claves foráneas tipadas y compatibilidad strategy–subject. El cambio exige versión/migración y no está implementado en schema `0.1.0`. Ver [[OPPORTUNITY_MODEL]].

### ScoreRun

Campos: `id`, `opportunity_id`, `score_model_version`, `component_scores`, `weights`, `opportunity_score`, `risk_score`, `confidence_score`, `coverage`, `gates`, `explanation`, `input_refs`, `calculated_at`.

### OpportunityTransition

Auditoría de estado: `id`, `opportunity_id`, `from_status`, `to_status`, `actor_id`, `reason`, `evidence_refs`, `occurred_at`.

## 10. Experimentos y aprendizaje

### Experiment

Campos mínimos:

```text
id
opportunity_id
name
status
hypothesis
quantity
capital_amount
currency
start_date
end_date
target_sales
target_margin
target_days_to_sale
success_criteria
stop_conditions
predictions
decision
decision_reason
```

Estados: `DRAFT`, `APPROVED`, `RUNNING`, `COMPLETED`, `CANCELLED`.

MVP-A3 implementará primero un perfil Lite sin integraciones de inventario/canales. Congelará referencias de predicción, capital/loss limit, criterios, observaciones manuales y resultado `VALIDATED`, `REJECTED` o `INCONCLUSIVE`.

### ExperimentObservation

Serie temporal de `views`, `clicks`, `messages`, `questions`, `units_sold`, `returns`, `repeat_purchase` y costos reales. Campos comunes: `id`, `experiment_id`, `metric`, `value`, `unit`, `observed_at`, `source_id`.

### InventoryLot

Lote asociado a experimento u operación: `id`, `experiment_id`, `product_id`, `quantity_received`, `unit_landed_cost`, `currency`, `received_at`, `status`.

### Sale

Venta real: `id`, `inventory_lot_id`, `channel`, `quantity`, `gross_revenue`, `fees`, `shipping_cost`, `returns_amount`, `currency`, `sold_at`.

### SalesObservation

Agregado derivado y versionado para análisis, no sustituto de `Sale`.

## 11. Calidad y auditoría

### CaptureRun

Ejecución de adquisición: `id`, `workspace_id`, fuente, método (`MANUAL_USER_ENTRY` o conector autorizado), versión, parámetros no secretos, conteos, estado, errores, inicio y fin.

### DataQualityIssue

Problema explícito: entidad afectada, tipo, severidad, descripción, evidencia, estado y resolución.

### AuditEvent

Cambios manuales relevantes: actor, acción, entidad, antes/después permitido, motivo e instante.

## 12. Restricciones esenciales

- Un `ScoreRun` apunta a inputs existentes y no mutables.
- Market evidence, pricing recommendation y máximo de compra son ejecuciones distintas.
- Una oportunidad tiene sólo un score actual, pero conserva todos los anteriores.
- No se valida un experimento sin criterios definidos antes de `RUNNING`.
- `actual_*` no puede cargarse como `predicted_*` ni viceversa.
- Una compatibilidad en conflicto reduce confianza y no se presenta como verificada.
- Cada conversión monetaria conserva tasa, moneda origen/destino, fuente y fecha.
- Una fusión de productos no elimina aliases, listings ni auditoría.
- Toda referencia entre entidades aisladas conserva el mismo `workspace_id`.
- Un usuario sin membresía no puede consultar ni mutar datos del workspace.
- `Market`, `DataSource` y `Marketplace` son catálogos compartidos; sus observaciones y selecciones no lo son.

## 13. Datos mínimos para el primer incremento

Implementar primero:

```text
Workspace
Market
Product
ProductAlias
DataSource
Marketplace
MarketplaceListing
ListingSnapshot
PriceObservation
CaptureRun
Opportunity
MarketPriceEstimate
```

`EconomicsRun`, pricing, máximo de compra, score y transiciones se incorporan en MVP-A2; Experiment Lite en MVP-A3. Las entidades de Platform Access permanecen en el contrato, pero su integración real se difiere según [[ADR-008]].

Las demás entidades se introducen al activar la épica que las necesita.

## 14. Referencias

- [[SYSTEM_ARCHITECTURE]]
- [[PRD]]
- [[SCORING_MODEL]]
- [[EXPERIMENTATION]]
- [[OPPORTUNITY_MODEL]]
- [[PRICING_MODEL]]
- [[SEASONALITY]]
