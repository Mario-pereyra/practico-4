---
type: Source Summary
title: Resumen verificable del Práctico 4
description: Resumen del PDF original sin mezclar decisiones posteriores.
tags:
- fuente
- practico-4
- resumen
timestamp: '2026-06-22T00:00:00-04:00'
---

# Fuente

* Archivo: [`docs/Practico_4_original.pdf`](../../Practico_4_original.pdf).
* Fecha de presentación indicada: 25/06/2026.

# Contenido exigido

El práctico solicita una aplicación web para cartelera y reserva de asientos, con autenticación de usuarios y un panel administrativo.

## Cliente

* Registro, login y logout.
* Cartelera pública.
* Búsqueda por nombre y filtro por género.
* Detalle de película y funciones.
* Mapa gráfico, selección múltiple y confirmación de reserva.
* Consulta de reservas realizadas.

## Administrador

* Gestión de películas.
* Creación y configuración de salas.
* Gestión de funciones con película, sala, fecha/hora y precio.

## Reglas explícitas

* No reservar dos veces el mismo asiento para una función.
* Solo usuarios autenticados reservan.
* Solo administradores modifican películas, salas y funciones.
* Las funciones referencian película y sala existentes.
* No se permiten funciones superpuestas en una misma sala.

# Separación de decisiones

Toda precisión adicional se encuentra en [Decisiones cerradas](/00_context/decisions.md), no en esta fuente.
