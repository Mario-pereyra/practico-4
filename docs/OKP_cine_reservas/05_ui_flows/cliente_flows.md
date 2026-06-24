---
type: UI Flow
title: Flujos de usuario
description: Flujos públicos y autenticados del frontend.
tags:
- ui
- flujo
- cliente
timestamp: '2026-06-22T00:00:00-04:00'
---

# Consultar cartelera

1. El visitante abre `/movies`.
2. Busca por título o filtra por género.
3. Abre `/movies/:movieId`.
4. Ve información y funciones futuras.

# Confirmar reserva

1. El usuario elige una función.
2. Si no está autenticado, inicia sesión y regresa al flujo.
3. Abre `/showtimes/:showtimeId/seats`.
4. Selecciona entre 1 y 20 asientos disponibles.
5. Confirma; el botón queda deshabilitado durante el envío.
6. Ante éxito, navega a `/my-reservations/:reservationId`.
7. Ante `SEAT_ALREADY_RESERVED`, se recarga el mapa y se muestra el conflicto.

# Consultar reservas

1. El usuario abre `/my-reservations`.
2. Ve sus reservas ordenadas por fecha de confirmación descendente (`reservedAt`).
3. Abre el detalle de una reserva propia.
4. No se muestra acción de cancelación.

# Logout

1. El usuario pulsa “Cerrar sesión”.
2. El frontend borra el JWT y `AuthContext`.
3. Navega a la cartelera o login.
