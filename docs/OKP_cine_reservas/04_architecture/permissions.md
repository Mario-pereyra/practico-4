---
type: Security Design
title: Permisos
description: Matriz de autenticación, autorización y propiedad de recursos.
tags:
- seguridad
- roles
- permisos
timestamp: '2026-06-22T00:00:00-04:00'
---

# Roles

```text
CLIENT
ADMIN
```

# Matriz

| Capacidad | Público | CLIENT | ADMIN |
|---|---:|---:|---:|
| Cartelera y detalle | Sí | Sí | Sí |
| Registro de cliente | Sí | No aplica | No aplica |
| Login | Sí | Sí | Sí |
| Mapa de asientos | No | Sí | Sí |
| Confirmar reserva | No | Sí | Sí |
| Ver reservas propias | No | Sí | Sí |
| CRUD películas | No | No | Sí |
| CRUD salas | No | No | Sí |
| CRUD funciones | No | No | Sí |

# Propiedad

`GET /reservations/{reservationId}` solo devuelve reservas cuyo `user_id` coincide con el JWT. Una reserva ajena se trata como inexistente y responde 404.

# Aplicación

La autorización se ejecuta en guards y servicios del backend. Ocultar rutas o botones en React no reemplaza esa comprobación.
