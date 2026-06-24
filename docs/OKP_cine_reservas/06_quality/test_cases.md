---
type: Quality
title: Casos de prueba
description: Pruebas funcionales, de autorización, integridad y concurrencia.
tags:
- qa
- pruebas
- mvp
timestamp: '2026-06-22T00:00:00-04:00'
---

# Autenticación

| ID | Caso | Esperado |
|---|---|---|
| T-AUTH-01 | Registrar cliente válido | `CLIENT` creado y JWT devuelto. |
| T-AUTH-02 | Registrar correo duplicado | 409 `EMAIL_ALREADY_EXISTS`. |
| T-AUTH-03 | Login inválido | 401 `INVALID_CREDENTIALS`. |
| T-AUTH-04 | JWT ausente/expirado | 401. |
| T-AUTH-05 | CLIENT accede a admin | 403. |
| T-AUTH-06 | Logout | Token y sesión local eliminados. |

# Películas y cartelera

| ID | Caso | Esperado |
|---|---|---|
| T-MOV-01 | Ver cartelera sin login | 200; solo películas con alguna función futura. |
| T-MOV-02 | Buscar `mat` | Coincidencia parcial sin distinguir mayúsculas. |
| T-MOV-03 | Filtrar género | Coincidencia exacta del enum. |
| T-MOV-04 | Subir póster inválido o >5 MB | 400. |
| T-MOV-05 | Cambiar duración con función futura | 409 `MOVIE_DURATION_LOCKED`. |
| T-MOV-06 | Cambiar duración con solo funciones pasadas | Permitido; horarios históricos no cambian. |
| T-MOV-07 | Eliminar película con funciones | 409. |

# Salas y funciones

| ID | Caso | Esperado |
|---|---|---|
| T-ROOM-01 | Crear sala 5×8 | Sala y 40 asientos. |
| T-ROOM-02 | Cambiar distribución con funciones | 409 `ROOM_LAYOUT_LOCKED`. |
| T-SHO-01 | Crear función futura | `endsAt` calculado. |
| T-SHO-02 | Iniciar exactamente al terminar otra | Permitido. |
| T-SHO-03 | Iniciar un minuto antes del fin | 409 `SHOWTIME_OVERLAP`. |
| T-SHO-04 | Misma hora, distinta sala | Permitido. |
| T-SHO-05 | Editar función futura sin reservas | Permitido. |
| T-SHO-06 | Editar/eliminar con reserva | 409. |
| T-SHO-07 | Crear/editar/eliminar función pasada | Rechazado. |

# Reservas

| ID | Caso | Esperado |
|---|---|---|
| T-RES-01 | Reservar 1 asiento | 201. |
| T-RES-02 | Reservar 20 asientos | 201. |
| T-RES-03 | Lista vacía, repetida o >20 | 400. |
| T-RES-04 | Asiento de otra sala | 400. |
| T-RES-05 | Función iniciada | 409 `SHOWTIME_NOT_BOOKABLE`. |
| T-RES-06 | Reserva ajena por ID | 404. |
| T-RES-07 | Listar mis reservas | Solo propias, ordenadas por `reservedAt` descendente. |
| T-CONC-01 | Dos usuarios, mismo asiento simultáneo | Uno 201 y otro 409. |
| T-CONC-02 | Dos usuarios solicitan el mismo conjunto multi-asiento en orden inverso | IDs se ordenan; no se expone deadlock y solo una reserva confirma. |
