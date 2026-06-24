---
type: UI View
title: Listado administrativo de funciones
description: Tabla y acciones de funciones.
tags:
- ui
- vista
- admin
- funciones
timestamp: '2026-06-22T00:00:00-04:00'
---

# Ruta

`/admin/showtimes`

# Columnas

Película, sala, inicio, fin, precio y acciones.

# Filtros

Película, sala y rango temporal.

# Acciones

* Crear función.
* Editar/eliminar solo si es futura y no tiene reservas.
* Mostrar explicación o manejar 409 cuando la acción no sea posible.

No mostrar tiempo de limpieza ni una columna de disponibilidad posterior.
