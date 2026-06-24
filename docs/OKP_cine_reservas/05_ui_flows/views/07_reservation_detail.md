---
type: UI View
title: Detalle de reserva
description: Detalle de una reserva propia confirmada e inmutable.
tags:
- ui
- vista
- reservas
timestamp: '2026-06-22T00:00:00-04:00'
---

# Ruta

`/my-reservations/:reservationId`

# Contenido

* Identificador de reserva.
* Película, sala, inicio y fin.
* Asientos con código y precio unitario.
* Fecha de confirmación.
* Total en BOB.
* Acción para volver a Mis reservas.

# Estados

* Loading.
* 401 por sesión inválida.
* 404 si no existe o pertenece a otro usuario.

# Exclusiones

No mostrar cancelación, devolución ni reembolso.
