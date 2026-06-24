---
type: Technical Design
title: Validaciones
description: Validaciones de DTO, dominio, tiempo, archivos y persistencia.
tags:
- validaciones
- backend
- dominio
timestamp: '2026-06-22T00:00:00-04:00'
---

# Películas

* `title`: 1–160.
* `synopsis`: 1–2000.
* `genre`: valor de `MovieGenre`.
* `durationMinutes`: 1–600.
* `rating`: `ALL_AGES`, `AGE_14` o `R`.
* Póster obligatorio al crear; JPEG/PNG/WebP; máximo 5 MB.
* Cambio de duración bloqueado con funciones futuras o en curso.

# Salas

* `name`: 1–100.
* `rows`: 1–26.
* `columns`: 1–50.
* `capacity = rows × columns` calculada por backend.
* Filas/columnas bloqueadas cuando existen funciones.

# Funciones

* Película y sala existentes.
* `startsAt > now` según el servidor.
* `price > 0`, máximo dos decimales.
* `endsAt` calculado y persistido.
* Sin solapamiento usando intervalos `[start, end)`.
* Edición/eliminación solo si es futura y sin reservas.

# Reservas

* JWT válido.
* Función existente y futura.
* Entre 1 y 20 IDs distintos.
* Todos los asientos existen y pertenecen a la sala.
* Restricción única de función/asiento.
* `total = unitPrice × cantidad` calculado por backend.

# Búsqueda

El backend recorta `search`. Una cadena vacía tras recortar se trata como filtro ausente. La comparación parcial no distingue mayúsculas/minúsculas.
