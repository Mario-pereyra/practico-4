---
type: UI View
title: Selección de asientos
description: Especificación de la pantalla autenticada de mapa y confirmación.
tags:
- ui
- vista
- reservas
timestamp: '2026-06-22T00:00:00-04:00'
---

# Ruta

`/showtimes/:showtimeId/seats`

# Acceso

`CLIENT` o `ADMIN` autenticado.

# Contenido

* Película, sala, fecha/hora y precio.
* Pantalla/screen como referencia visual.
* Grilla por `rowLabel` y `columnNumber`.
* Leyenda de disponible, seleccionado y reservado.
* Resumen de cantidad y total BOB.
* Botón “Confirmar reserva”.

# Reglas

* Entre 1 y 20 asientos.
* Reservados deshabilitados.
* Botón deshabilitado durante envío.
* `409 SEAT_ALREADY_RESERVED`: mostrar error y recargar mapa.
* `409 SHOWTIME_NOT_BOOKABLE`: impedir confirmación y volver al detalle.
