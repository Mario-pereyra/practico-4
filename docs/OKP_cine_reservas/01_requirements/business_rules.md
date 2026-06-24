---
type: Business Rules
title: Reglas de negocio
description: Reglas obligatorias del dominio y decisiones simplificadas del MVP.
tags:
- reglas
- negocio
- reservas
- funciones
timestamp: '2026-06-22T00:00:00-04:00'
---

# Acceso y roles

## RB-01 Cartelera pública

La cartelera y el detalle de película pueden consultarse sin autenticación. El listado público incluye únicamente películas con al menos una función futura; el detalle devuelve solo funciones futuras.

## RB-02 Reserva autenticada

Cualquier usuario autenticado, con rol `CLIENT` o `ADMIN`, puede confirmar reservas y consultar únicamente sus propias reservas.

## RB-03 Administración restringida

Solo `ADMIN` puede crear, editar o eliminar películas, salas y funciones.

## RB-04 Administrador por seed

El administrador se crea en la seed. El registro público siempre crea rol `CLIENT`.

# Películas y salas

## RB-05 Cambio de duración

La duración de una película puede modificarse solo si no existen funciones futuras ni en curso asociadas. Las funciones pasadas conservan su `endsAt` almacenado.

## RB-06 Distribución de sala

`capacity = rows × columns`. Si una sala tiene funciones asociadas, solo puede cambiarse su nombre; `rows` y `columns` quedan bloqueados.

## RB-07 Eliminación condicionada

* Una película solo se elimina si no tiene funciones.
* Una sala solo se elimina si no tiene funciones; sus asientos se eliminan en cascada.
* Una función solo se elimina si es futura y no tiene reservas.
* No existen borrado lógico ni cascadas que eliminen funciones o reservas.

# Funciones

## RB-08 Asociación válida

Toda función referencia una película y una sala existentes.

## RB-09 Intervalo y hora final

Al crear o editar una función:

```text
endsAt = startsAt + movie.durationMinutes
```

`endsAt` se persiste. No existe margen adicional de limpieza.

## RB-10 No solapamiento

Dos funciones de la misma sala no pueden superponerse. Para una función nueva o editada:

```text
newStart < existingEnd
AND
newEnd > existingStart
```

Los intervalos son semiabiertos `[startsAt, endsAt)`, por lo que una función puede comenzar exactamente cuando termina otra.

## RB-11 Función futura

No se puede crear, reservar, editar ni eliminar una función cuando `startsAt <= now`, usando el reloj del servidor.

## RB-12 Modificación de función

Una función solo puede editarse cuando es futura y no tiene ninguna reserva asociada. Al editarla se vuelve a calcular `endsAt` y se valida el solapamiento excluyendo la propia función.

# Reservas

## RB-13 Selección válida

Una reserva contiene entre 1 y 20 `seatIds` únicos; todos pertenecen a la sala de la función.

## RB-14 Unicidad de asiento por función

Un asiento solo puede aparecer una vez para una función. La base de datos aplica:

```text
UNIQUE(showtime_id, seat_id)
```

## RB-15 Reserva atómica

La comprobación de disponibilidad y la inserción se ejecutan en una transacción. Si otro usuario toma un asiento durante la carrera, la operación responde `409 SEAT_ALREADY_RESERVED`.

## RB-16 Reserva inmutable

El MVP no permite cancelar reservas. La reserva conserva `reservedAt`, `unitPrice` y `total`; la función conserva `startsAt` y `endsAt`. Para mantener el alcance simple, título de película y nombre de sala son referencias vivas y pueden reflejar correcciones posteriores. No debe reutilizarse una entidad existente para representar otra película o sala.

# Tiempo, moneda y búsqueda

## RB-17 Tiempo

La API usa ISO 8601 con desplazamiento; PostgreSQL usa `timestamptz`/UTC; la UI muestra `America/La_Paz`.

## RB-18 Precio

Todos los precios usan `BOB`, son mayores a cero y se almacenan como `numeric(10,2)`.

## RB-19 Búsqueda y género

La búsqueda por título es parcial, recorta espacios y no distingue mayúsculas/minúsculas. El filtro de género usa un valor exacto de la enumeración técnica.
