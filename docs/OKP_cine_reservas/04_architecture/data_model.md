---
type: Technical Design
title: Modelo de datos PostgreSQL
description: Tablas, tipos, claves y restricciones físicas recomendadas.
tags:
- arquitectura
- base-de-datos
- postgresql
timestamp: '2026-06-22T00:00:00-04:00'
---

# Tablas

```sql
users (
  id bigint primary key,
  name varchar(100) not null,
  email varchar(254) not null unique,
  password_hash varchar(255) not null,
  role varchar(20) not null,
  created_at timestamptz not null
)

movies (
  id bigint primary key,
  title varchar(160) not null,
  synopsis varchar(2000) not null,
  genre varchar(30) not null,
  duration_minutes integer not null,
  rating varchar(20) not null,
  poster_url varchar(500) not null,
  created_at timestamptz not null,
  updated_at timestamptz not null
)

rooms (
  id bigint primary key,
  name varchar(100) not null,
  rows integer not null,
  columns integer not null,
  capacity integer not null,
  created_at timestamptz not null,
  updated_at timestamptz not null
)

seats (
  id bigint primary key,
  room_id bigint not null,
  row_label char(1) not null,
  column_number integer not null,
  code varchar(3) not null
)

showtimes (
  id bigint primary key,
  movie_id bigint not null,
  room_id bigint not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  price numeric(10,2) not null,
  created_at timestamptz not null,
  updated_at timestamptz not null
)

reservations (
  id bigint primary key,
  user_id bigint not null,
  showtime_id bigint not null,
  reserved_at timestamptz not null,
  total numeric(10,2) not null
)

reservation_seats (
  id bigint primary key,
  reservation_id bigint not null,
  showtime_id bigint not null,
  seat_id bigint not null,
  unit_price numeric(10,2) not null
)
```

# Checks y unicidad

```sql
CHECK (duration_minutes BETWEEN 1 AND 600)
CHECK (rows BETWEEN 1 AND 26)
CHECK (columns BETWEEN 1 AND 50)
CHECK (capacity = rows * columns)
CHECK (price > 0)
CHECK (starts_at < ends_at)
CHECK (total > 0)
CHECK (unit_price > 0)

UNIQUE (seats.room_id, seats.row_label, seats.column_number)
UNIQUE (seats.room_id, seats.code)
UNIQUE (reservation_seats.showtime_id, reservation_seats.seat_id)
UNIQUE (reservation_seats.reservation_id, reservation_seats.seat_id)
```

# Claves foráneas y borrado

```text
showtimes.movie_id → movies.id ON DELETE RESTRICT
showtimes.room_id → rooms.id ON DELETE RESTRICT
seats.room_id → rooms.id ON DELETE CASCADE
reservations.user_id → users.id ON DELETE RESTRICT
reservations.showtime_id → showtimes.id ON DELETE RESTRICT
reservation_seats.reservation_id → reservations.id ON DELETE CASCADE
reservation_seats.showtime_id → showtimes.id ON DELETE RESTRICT
reservation_seats.seat_id → seats.id ON DELETE RESTRICT
```

# Invariantes de servicio

La base no puede verificar por sí sola que el asiento pertenezca a la sala de la función ni que `reservation_seats.showtime_id` coincida con la reserva; el servicio debe validarlo dentro de la transacción.
