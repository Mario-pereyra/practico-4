---
type: Quality
title: Matriz de trazabilidad
description: Relación entre requisitos, reglas, endpoints y pruebas.
tags:
- trazabilidad
- requisitos
- pruebas
timestamp: '2026-06-22T00:00:00-04:00'
---

# Matriz

| Requisito | Reglas | Endpoint principal | Pruebas |
|---|---|---|---|
| RF-06–RF-09 Cartelera | RB-01, RB-19 | `GET /movies`, `GET /movies/{movieId}` | T-MOV-01–03 |
| RF-10–RF-15 Reservas | RB-02, RB-11, RB-13–16 | `GET /showtimes/{showtimeId}/seats`, `POST /reservations`, `GET /reservations/my` | T-RES-01–06, T-CONC-01 |
| RF-16–RF-19 Películas | RB-05, RB-07 | `/admin/movies` | T-MOV-04–07 |
| RF-20–RF-23 Salas | RB-06, RB-07 | `/admin/rooms` | T-ROOM-01–02 |
| RF-24–RF-27 Funciones | RB-08–RB-12 | `/admin/showtimes` | T-SHO-01–07 |
| RF-01–RF-05 Auth | RB-02–RB-04 | `/auth/register`, `/auth/login`, `/auth/me` | T-AUTH-01–06 |

# Regla de mantenimiento

Todo cambio de requisito debe revisar al menos reglas, OpenAPI, modelo de datos, vista afectada y prueba correspondiente.
