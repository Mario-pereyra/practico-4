---
type: Technical Design
title: Gestión de estado frontend
description: Estrategia simple para React sin librerías globales innecesarias.
tags:
- frontend
- react
- estado
timestamp: '2026-06-22T00:00:00-04:00'
---

# Decisión

No usar Redux, Zustand ni TanStack Query. El alcance no justifica una capa global adicional.

# Estado global permitido

`AuthContext` conserva:

```text
accessToken
currentUser
isAuthenticated
login()
logout()
```

`logout()` elimina el token local; no llama a un endpoint backend.

# Estado por pantalla

Cada feature usa hooks sencillos con:

```text
data
isLoading
error
reload()
```

La selección del mapa de asientos es un `Set<number>` local. Tras un `409 SEAT_ALREADY_RESERVED`, se limpia o conserva la selección según UX y se recarga el mapa.

# Servicios

```text
auth.api.ts
movies.api.ts
rooms.api.ts
showtimes.api.ts
reservations.api.ts
```

Crear/editar películas construye `FormData` y envía el archivo real.

# Reglas

* No duplicar reglas de negocio en el frontend.
* Deshabilitar botones durante envíos para evitar doble clic.
* Tratar `401`, `403`, `404` y `409` explícitamente.
* Mostrar fechas en `America/La_Paz` y precios `BOB`.
