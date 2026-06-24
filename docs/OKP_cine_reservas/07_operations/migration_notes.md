---
type: Operations
title: Notas de migración
description: Orden de migraciones, restricciones y seed inicial.
tags:
- migraciones
- postgresql
- operacion
timestamp: '2026-06-22T00:00:00-04:00'
---

# Orden

1. `users`.
2. `movies`.
3. `rooms`.
4. `seats`.
5. `showtimes`.
6. `reservations`.
7. `reservation_seats`.
8. Checks, índices y claves foráneas.

# Seed

1. Crear `ADMIN` con password hasheado y credenciales documentadas para demo.
2. Crear películas.
3. Crear salas y generar asientos.
4. Crear funciones futuras no superpuestas.

# Reglas

* `synchronize: true` no se usa en producción/entrega reproducible.
* Sala y asientos se crean en una transacción.
* Reserva y detalles se crean en una transacción.
* `timestamptz` y `numeric(10,2)` son obligatorios.
