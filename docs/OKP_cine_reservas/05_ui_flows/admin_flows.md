---
type: UI Flow
title: Flujos administrativos
description: Flujos CRUD y manejo de conflictos para el rol ADMIN.
tags:
- ui
- flujo
- admin
timestamp: '2026-06-22T00:00:00-04:00'
---

# Películas

* Listar, crear y editar mediante formulario multipart.
* Si la duración está bloqueada, mostrar `MOVIE_DURATION_LOCKED`.
* Si la película tiene funciones, deshabilitar o rechazar eliminación.

# Salas

* Crear sala con filas y columnas; mostrar capacidad calculada.
* Generar y consultar sus asientos.
* Si tiene funciones, permitir cambiar el nombre pero no la distribución.
* Rechazar eliminación con `ROOM_HAS_SHOWTIMES`.

# Funciones

* Elegir película, sala, fecha/hora y precio.
* Mostrar `endsAt` calculado sin tiempo de limpieza.
* Permitir horarios adyacentes.
* Mostrar `SHOWTIME_OVERLAP` ante conflicto.
* Deshabilitar acciones para funciones iniciadas o pasadas; para funciones futuras, el backend confirma que no existan reservas y responde 409 si la acción ya no es válida.
