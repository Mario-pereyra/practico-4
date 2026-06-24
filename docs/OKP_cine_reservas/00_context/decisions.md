---
type: Decision Record
title: Decisiones cerradas del proyecto
description: Decisiones funcionales y técnicas aprobadas para eliminar ambigüedad
  sin ampliar innecesariamente el práctico.
tags:
- decisiones
- alcance
- mvp
timestamp: '2026-06-22T00:00:00-04:00'
---

# Decisiones aprobadas

Estas decisiones complementan el [enunciado original](/00_context/enunciado_original.md). Cuando una decisión agrega detalle no exigido por el docente, se registra como simplificación del proyecto y no como parte de la transcripción normativa.

| ID | Decisión | Consecuencia |
|---|---|---|
| D-01 | Se implementa una única sede de cine; no existe entidad de sucursal. | El sistema puede desplegarse por sede, pero la gestión de una cadena queda fuera del MVP. |
| D-02 | El administrador se crea mediante seed y no existe registro administrativo. | Solo el registro público crea usuarios `CLIENT`. |
| D-03 | Se mantiene CRUD de películas, salas y funciones. | Las eliminaciones son físicas, condicionadas y sin cascadas que destruyan historial. |
| D-04 | Los asientos se modelan formalmente y se generan al crear una sala. | La creación/regeneración de sala y asientos se ejecuta en transacción. |
| D-05 | No se implementa cancelación de reservas. | Una reserva confirmada permanece en el historial; no existen estados `CANCELLED`, `cancelledAt` ni endpoint de cancelación. |
| D-06 | No se agrega tiempo de limpieza entre funciones. | `endsAt = startsAt + durationMinutes`; dos funciones pueden ser adyacentes. |
| D-07 | La duración de una película no puede cambiar si existen funciones futuras o en curso. | Las funciones pasadas conservan el `endsAt` persistido; las nuevas usan la duración vigente. |
| D-08 | Una función solo puede editarse o eliminarse si es futura y no tiene reservas asociadas. | Las funciones iniciadas, pasadas o con reservas quedan en solo lectura. |
| D-09 | Habrá un único administrador operativo. | El solapamiento se valida en backend; no se agrega bloqueo avanzado para creación concurrente de funciones. |
| D-10 | La doble reserva se protege con transacción y restricción única `(showtime_id, seat_id)`. | Ante carrera, una solicitud confirma y la otra responde `409 SEAT_ALREADY_RESERVED`. |
| D-11 | Se usa borrado físico condicionado. | Películas y salas con funciones no se eliminan; funciones con reservas o ya iniciadas tampoco. |
| D-12 | Cualquier usuario autenticado, incluido `ADMIN`, puede reservar. | `ADMIN` conserva además permisos exclusivos de administración. |
| D-13 | El logout del MVP es local en el frontend. | Se elimina el JWT del cliente; no existe endpoint de revocación. |
| D-14 | Zona del cine: `America/La_Paz`; almacenamiento temporal: UTC/`timestamptz`. | La API usa ISO 8601 con desplazamiento y todas las decisiones temporales usan el reloj del servidor. |
| D-15 | Moneda: boliviano, código `BOB`; importes con dos decimales. | PostgreSQL usa `numeric(10,2)` y la API informa `currency: BOB`. |
| D-16 | Género y clasificación usan enumeraciones técnicas en inglés. | La UI traduce los valores al español. |
| D-17 | El póster se carga como archivo JPEG, PNG o WebP de hasta 5 MB. | Crear/editar películas usa `multipart/form-data`. |
| D-18 | Código, API y base de datos usan inglés técnico; la UI se muestra en español. | Se unifican `rowLabel`/`columnNumber`, rutas y códigos de error. |
| D-19 | El MVP conserva como instantáneas el horario y los importes, no toda la metadata relacionada. | `startsAt`, `endsAt`, `unitPrice` y `total` preservan el hecho histórico; título de película y nombre de sala se consultan desde sus entidades actuales. Un registro no debe reutilizarse para representar otra película o sala. |

# Política temporal resumida

```text
startsAt <= reloj_del_servidor
→ la función no puede crearse, reservarse, editarse ni eliminarse.
```

# Política de dependencias resumida

```text
Película con funciones asociadas → no eliminar.
Sala con funciones asociadas → no eliminar ni cambiar filas/columnas.
Función futura sin reservas → editar/eliminar permitido.
Función con reservas, iniciada o pasada → solo lectura.
```

# Enlaces

* [Alcance](/00_context/scope.md)
* [Reglas de negocio](/01_requirements/business_rules.md)
* [Contrato OpenAPI](/04_architecture/openapi.yaml)
