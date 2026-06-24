# Changelog de correcciones

## 2026-06-22

### Alcance y reglas

* Se eliminó cancelación de reservas del MVP y de OpenAPI, dominio, UI y pruebas.
* Se eliminó el margen de limpieza de 15 minutos y `roomAvailableAt`.
* Se fijó la política de cambio de duración, edición/eliminación de funciones y borrado físico condicionado.
* Se permitió reservar a cualquier usuario autenticado, incluido `ADMIN`.
* Se definió logout local sin endpoint backend.

### Tiempo, dinero y datos

* Zona `America/La_Paz`, almacenamiento UTC/`timestamptz` y reloj del servidor.
* Moneda `BOB`, `numeric(10,2)` y precios históricos en reservas.
* Se unificaron `rowLabel`/`columnNumber` y las restricciones SQL.
* Se reemplazó el índice parcial por unicidad directa `(showtime_id, seat_id)`.

### API

* OpenAPI regenerado a 16 rutas.
* Se eliminaron `/auth/logout`, `/reservations/{id}/cancel` y duplicidad de funciones de película.
* Errores unificados como `application/json`/`ErrorResponse`.
* Póster multipart y esquemas públicos/administrativos separados.
* El mapa de asientos ahora entrega película, sala, horario, precio y disponibilidad en una única respuesta.
* La cartelera pública se cerró a películas con funciones futuras y “Mis reservas” quedó ordenado por `reservedAt` descendente.
* Se eliminaron `isActive`, `includeInactive` y estados de cancelación.

### Documentación y UI

* Se agregó un PRD integral y aprobado con objetivos, alcance, recorridos, requisitos, reglas, API, datos, UX, NFR, pruebas, riesgos y DoD.
* Se sincronizó `docs/PRD_CINE_RESERVAS.md` con el PRD canónico y se generó `docs/PRD_CINE_RESERVAS.docx` como derivado de presentación verificado visualmente.
* Se agregó alcance, catálogo de errores y matriz de trazabilidad.
* Se ampliaron criterios y pruebas de concurrencia.
* Se unificó la ruta frontend `/my-reservations/:reservationId`.
* Se archivaron vistas Stitch incompatibles con las reglas actuales.
* Se corrigió la estructura de rutas `docs/` y `agents/skills/`.
* Se corrigió conformidad OKF v0.1 y se añadió verificador automático.

## 2026-06-17

Creación inicial del bundle, OpenAPI, diseño, baseline Stitch y documentos de handoff.
