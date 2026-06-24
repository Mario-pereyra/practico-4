---
type: UI Guidance
title: Mapa de selección visual
description: Relación entre rutas y referencias visuales aceptadas o archivadas.
tags:
- ui
- stitch
- rutas
timestamp: '2026-06-22T00:00:00-04:00'
---

# Seleccionadas

| Ruta/vista | Referencia |
|---|---|
| `/movies` | `selected_views/cartelera_p_blica_cinereservas/` |
| `/movies/:movieId` | `selected_views/detalle_de_pel_cula_cinereservas/` |
| `/login` | `selected_views/iniciar_sesi_n_cinereservas/` |
| `/register` | `selected_views/crear_cuenta_cinereservas/` |
| `/showtimes/:showtimeId/seats` | `selected_views/selecci_n_de_asientos_cinereservas/` |
| `/admin/movies` | `selected_views/admin_listado_de_pel_culas_corregido/` |
| Formulario película | `selected_views/admin_formulario_de_pel_cula_corregido/` |
| `/admin/rooms` | `selected_views/admin_listado_de_salas/` |
| Formulario sala | `selected_views/admin_formulario_de_sala_corregido/` |
| Detalle sala | `selected_views/admin_detalle_de_sala_corregido/` |
| 401/403 | `selected_views/acceso_restringido_401_403_corregido/` |

# Sin baseline canónico actual

Estas vistas se implementan desde su especificación Markdown porque las capturas existentes contienen reglas descartadas:

* `/my-reservations`.
* `/my-reservations/:reservationId`.
* `/admin`.
* `/admin/showtimes`.
* Formularios de función.
* 404.
