---
type: Requirements
title: Supuestos y restricciones
description: Supuestos técnicos y límites explícitos del proyecto.
tags:
- supuestos
- restricciones
- limites
timestamp: '2026-06-22T00:00:00-04:00'
---

# Supuestos

* Una única sede y un único administrador operativo.
* El administrador se crea mediante seed.
* La función usa la duración de la película al momento de crearla o editarla.
* El reloj del servidor es la autoridad para reglas temporales.
* La UI se muestra en español; los valores técnicos se envían en inglés.
* El historial congela horario y dinero, pero consulta la metadata descriptiva vigente de película y sala.

# Límites de entrada

| Dato | Regla |
|---|---|
| Título | 1 a 160 caracteres |
| Sinopsis | 1 a 2000 caracteres |
| Duración | 1 a 600 minutos |
| Contraseña | 8 a 72 caracteres |
| Filas de sala | 1 a 26 |
| Columnas de sala | 1 a 50 |
| Asientos por reserva | 1 a 20, sin repetidos |
| Precio | `0.01` a `99,999,999.99` BOB, dos decimales |
| Póster | JPEG, PNG o WebP, máximo 5 MB |

# Restricciones

* PostgreSQL como base de datos.
* `timestamptz` para instantes y `numeric(10,2)` para dinero.
* Sin pagos, cancelación, sucursales, notificaciones ni QR.
* Sin Redux, Zustand ni TanStack Query.
* Sin microservicios, CQRS o event sourcing.
