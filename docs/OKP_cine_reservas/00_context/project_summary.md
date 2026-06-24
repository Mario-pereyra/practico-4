---
type: Project Overview
title: Resumen del proyecto
description: Síntesis ejecutiva del sistema universitario de cartelera y reservas.
tags:
- cine
- proyecto
- mvp
- universidad
timestamp: '2026-06-22T00:00:00-04:00'
---

# Objetivo

Construir una aplicación web para consultar cartelera, reservar asientos y administrar películas, salas y funciones de una sede de cine.

# Actores

* Visitante.
* Usuario autenticado con rol `CLIENT`.
* Administrador con rol `ADMIN` creado por seed.

# Capacidades principales

* Cartelera pública con búsqueda parcial por título y filtro por género.
* Detalle de película con póster, información y funciones futuras.
* Registro, login y logout local.
* Mapa gráfico de asientos y reserva de uno o varios asientos.
* Consulta de reservas propias.
* CRUD administrativo de películas, salas y funciones.
* Prevención de funciones superpuestas y reservas duplicadas.

# Límites principales

* Una única sede.
* Sin pagos, facturación, QR, promociones, notificaciones ni cancelación de reservas.
* Sin registro de administradores.
* Sin microservicios ni gestión global de estado innecesaria.

# Fuentes

* [Enunciado original](/00_context/enunciado_original.md)
* [Decisiones cerradas](/00_context/decisions.md)
* [Alcance](/00_context/scope.md)
