---
type: Domain Model
title: Entidades del dominio
description: Entidades, atributos e invariantes principales del sistema.
tags:
- dominio
- entidades
- modelo
timestamp: '2026-06-22T00:00:00-04:00'
---

# User

```text
id
name
email
passwordHash
role: CLIENT | ADMIN
createdAt
```

# Movie

```text
id
title
synopsis
genre: MovieGenre
durationMinutes
rating: ALL_AGES | AGE_14 | R
posterUrl
createdAt
updatedAt
```

No existe una bandera de actividad: el proyecto usa eliminación física condicionada.

# Room

```text
id
name
rows
columns
capacity = rows × columns
createdAt
updatedAt
```

# Seat

```text
id
roomId
rowLabel: A..Z
columnNumber: 1..50
code: rowLabel + columnNumber
```

# Showtime

```text
id
movieId
roomId
startsAt
endsAt
price
createdAt
updatedAt
```

`endsAt` se calcula y persiste. No se almacena un segundo campo de disponibilidad posterior.

# Reservation

```text
id
userId
showtimeId
reservedAt
total
```

La reserva no tiene ciclo de cancelación en el MVP.

# ReservationSeat

```text
id
reservationId
showtimeId
seatId
unitPrice
```

`showtimeId` se conserva para permitir la restricción única directa `(showtimeId, seatId)`.

# Relaciones

```text
Movie 1 ── * Showtime
Room 1 ── * Seat
Room 1 ── * Showtime
User 1 ── * Reservation
Showtime 1 ── * Reservation
Reservation 1 ── * ReservationSeat
Seat 1 ── * ReservationSeat
```
