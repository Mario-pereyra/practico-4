---
type: API Design
title: Resumen del contrato API
description: Guía de lectura del OpenAPI canónico sin duplicar sus detalles.
tags:
- api
- openapi
- rest
timestamp: '2026-06-22T00:00:00-04:00'
---

# Fuente normativa

El contrato ejecutable es [openapi.yaml](openapi.yaml). Si este resumen diverge, prevalece OpenAPI.

# Convenciones

* Base relativa: `/api/v1`.
* JWT Bearer para rutas autenticadas.
* `security: []` para operaciones públicas.
* `x-roles: [ADMIN]` como extensión documental en administración.
* `application/json` para respuestas y errores.
* `multipart/form-data` para crear/editar películas.
* Fechas ISO 8601; almacenamiento UTC; presentación `America/La_Paz`.
* Moneda `BOB`.

# Recursos

```text
/auth/register
/auth/login
/auth/me
/movies
/movies/{movieId}
/showtimes/{showtimeId}/seats
/reservations
/reservations/my
/reservations/{reservationId}
/admin/movies
/admin/rooms
/admin/showtimes
```

# Rutas eliminadas deliberadamente

* No existe `/auth/logout`: el logout es local.
* No existe `/reservations/{id}/cancel`: la cancelación está fuera del MVP.
* No existe `/movies/{id}/showtimes`: el detalle de película es la fuente pública única de sus funciones futuras.

# Errores

El formato común es:

```json
{
  "statusCode": 409,
  "code": "SHOWTIME_OVERLAP",
  "message": "La sala ya está ocupada durante el intervalo solicitado."
}
```

Ver [Catálogo de errores](error_catalog.md).
