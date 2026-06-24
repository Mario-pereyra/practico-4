---
type: MVP
title: MVP del sistema
description: Contenido exacto de la primera versión entregable.
tags:
- mvp
- backlog
- alcance
timestamp: '2026-06-22T00:00:00-04:00'
---

# Resultado esperado

Aplicación web para una sede de cine en la que visitantes consultan la cartelera, usuarios autenticados reservan asientos y un administrador gestiona películas, salas y funciones.

# Incluido

* Registro de `CLIENT`, login y logout local.
* Login de `ADMIN` creado por seed.
* Cartelera pública, búsqueda y filtro por género.
* Detalle de película con funciones futuras.
* Mapa de asientos autenticado.
* Reserva de uno o varios asientos y consulta de reservas propias.
* CRUD de películas con carga de póster.
* CRUD de salas y generación automática de asientos.
* CRUD de funciones, cálculo de `endsAt` y validación de solapamiento.
* Restricciones de edición/eliminación por dependencias.
* Concurrencia segura para reservas.

# No incluido

* Cancelación de reservas o funciones.
* Pagos, reembolsos, facturación, QR o tickets.
* Varias sedes.
* Recuperación de contraseña, refresh tokens o revocación JWT.
* Limpieza temporal entre funciones.
* Notificaciones, promociones o reportes avanzados.
