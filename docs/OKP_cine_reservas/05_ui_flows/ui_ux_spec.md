---
type: UI Guidance
title: Especificación UI/UX
description: Comportamiento transversal de navegación, formularios, estados y rutas.
tags:
- ui
- ux
- frontend
timestamp: '2026-06-22T00:00:00-04:00'
---

# Rutas

```text
/movies
/movies/:movieId
/login
/register
/showtimes/:showtimeId/seats
/my-reservations
/my-reservations/:reservationId
/admin
/admin/movies
/admin/rooms
/admin/showtimes
```

# Protección

* Cartelera y detalle: públicas.
* Mapa y reservas: cualquier usuario autenticado.
* `/admin/**`: solo `ADMIN`.
* `401`: borrar sesión inválida y redirigir a login conservando `returnTo`.
* `403`: mostrar acceso restringido sin ocultar el error.

# Fechas y moneda

* Convertir instantes a `America/La_Paz`.
* Mostrar `Bs.` y dos decimales.
* Nunca usar hora local del navegador como autoridad de negocio.

# Estados

Toda vista de datos contempla:

```text
loading
empty
error
success/data
```

Los conflictos 409 muestran el `message` del catálogo y una acción correctiva.

# Reserva

* Contador y total actualizados localmente.
* Máximo 20 asientos.
* Confirmar deshabilitado sin selección o durante envío.
* No existe opción de cancelación después de confirmar.

# Administración

* Acciones de edición/eliminación se ocultan o deshabilitan cuando el estado conocido lo impide, pero el backend siempre vuelve a validar.
* `endsAt` se muestra como dato calculado, sin columna “disponible desde”.
