---
type: Technical Design
title: Concurrencia e integridad
description: Protección de reservas concurrentes y alcance deliberado del control
  de funciones.
tags:
- arquitectura
- concurrencia
- transacciones
timestamp: '2026-06-22T00:00:00-04:00'
---

# Reservas concurrentes

La existencia de múltiples usuarios exige protección real en base de datos.

## Restricción

```sql
ALTER TABLE reservation_seats
ADD CONSTRAINT uq_reservation_seats_showtime_seat
UNIQUE (showtime_id, seat_id);
```

## Transacción

1. Normalizar `seatIds`: quitar duplicados mediante validación y ordenar ascendentemente.
2. Validar función y asientos dentro de la operación.
3. Insertar la reserva.
4. Insertar los detalles en el mismo orden ascendente.
5. Confirmar.
6. Traducir una violación de unicidad a `409 SEAT_ALREADY_RESERVED`.

El orden estable reduce el riesgo de interbloqueo cuando dos reservas de varios asientos se cruzan en distinto orden de entrada.

La consulta previa mejora el mensaje, pero la restricción de base de datos es la garantía final.

# Funciones concurrentes

El alcance establece un único administrador. Por simplicidad:

* el servicio comprueba solapamientos antes de guardar;
* la edición excluye el ID actual;
* la UI deshabilita el botón durante el envío;
* no se implementan bloqueos pesimistas ni restricciones `EXCLUDE`.

Esta simplificación es aceptada para el práctico y debe reevaluarse si se habilitan varios administradores concurrentes.
