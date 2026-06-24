---
type: UI View
title: Formulario administrativo de función
description: Formulario de creación y edición con cálculo de horario.
tags:
- ui
- vista
- admin
- funciones
timestamp: '2026-06-22T00:00:00-04:00'
---

# Rutas

`/admin/showtimes/new` y `/admin/showtimes/:showtimeId/edit`.

# Campos

* Película.
* Sala.
* Fecha y hora de inicio.
* Precio BOB.

# Información calculada

Mostrar fin estimado usando duración de la película, sin tiempo de limpieza.

# Errores

* `SHOWTIME_OVERLAP`.
* `SHOWTIME_NOT_MODIFIABLE`.
* Película o sala inexistente.
* Fecha pasada o inválida.
