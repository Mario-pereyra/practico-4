---
type: API Design
title: Catálogo de errores
description: Códigos de error estables y estados HTTP usados por frontend y backend.
tags:
- api
- errores
- contrato
timestamp: '2026-06-22T00:00:00-04:00'
---

# Formato

```json
{
  "statusCode": 409,
  "code": "SHOWTIME_OVERLAP",
  "message": "La sala ya está ocupada durante el intervalo solicitado."
}
```

# Códigos

| Código | HTTP | Uso |
|---|---:|---|
| `VALIDATION_ERROR` | 400 | DTO, query o archivo inválido. |
| `UNAUTHORIZED` | 401 | JWT ausente, inválido o expirado. |
| `INVALID_CREDENTIALS` | 401 | Login incorrecto. |
| `FORBIDDEN` | 403 | Rol insuficiente. |
| `MOVIE_NOT_FOUND` | 404 | Película inexistente. |
| `ROOM_NOT_FOUND` | 404 | Sala inexistente. |
| `SHOWTIME_NOT_FOUND` | 404 | Función inexistente. |
| `RESERVATION_NOT_FOUND` | 404 | Reserva inexistente o ajena. |
| `EMAIL_ALREADY_EXISTS` | 409 | Correo duplicado. |
| `MOVIE_DURATION_LOCKED` | 409 | Cambio de duración con función futura/en curso. |
| `MOVIE_HAS_SHOWTIMES` | 409 | Eliminación de película con funciones. |
| `ROOM_LAYOUT_LOCKED` | 409 | Cambio de filas/columnas con funciones. |
| `ROOM_HAS_SHOWTIMES` | 409 | Eliminación de sala con funciones. |
| `SHOWTIME_OVERLAP` | 409 | Intervalos superpuestos. |
| `SHOWTIME_NOT_MODIFIABLE` | 409 | Función iniciada o con reservas. |
| `SHOWTIME_NOT_DELETABLE` | 409 | Función iniciada o con reservas. |
| `SHOWTIME_NOT_BOOKABLE` | 409 | Función iniciada o pasada. |
| `SEAT_ALREADY_RESERVED` | 409 | Carrera o asiento previamente tomado. |
| `SHOWTIME_OR_SEAT_NOT_FOUND` | 404 | ID de función/asiento inválido. |
| `MOVIE_OR_ROOM_NOT_FOUND` | 404 | Relación administrativa inválida. |
