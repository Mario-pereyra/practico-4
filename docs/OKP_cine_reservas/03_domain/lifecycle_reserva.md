---
type: Domain Process
title: Proceso de reserva
description: Flujo transaccional de una reserva inmutable.
tags:
- dominio
- reserva
- proceso
timestamp: '2026-06-22T00:00:00-04:00'
---

# Estado conceptual

En el MVP una reserva solo existe después de confirmarse. No se persisten estados preliminares ni cancelados.

# Flujo

1. El usuario autenticado abre una función futura.
2. El backend entrega el mapa de asientos.
3. El usuario selecciona entre 1 y 20 asientos.
4. El backend valida unicidad y ordena `seatIds` ascendentemente.
5. Inicia una transacción y valida función futura y pertenencia a la sala.
6. Inserta `reservations` y `reservation_seats` en orden estable, con precios históricos.
7. La restricción única impide duplicar asiento/función.
8. Confirma la transacción y devuelve el detalle.

# Fallo de concurrencia

Si la restricción única detecta un asiento ocupado, la transacción se revierte y se responde:

```json
{
  "statusCode": 409,
  "code": "SEAT_ALREADY_RESERVED",
  "message": "Uno o más asientos ya fueron reservados para esta función."
}
```
