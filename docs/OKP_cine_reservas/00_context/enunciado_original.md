---
type: Source Document
title: Enunciado original del Práctico 4
description: Transcripción normativa del enunciado entregado por el docente.
tags:
- fuente-primaria
- enunciado
- universidad
- normativo
timestamp: '2026-06-22T00:00:00-04:00'
resource: ../../Practico_4_original.pdf
---

# Enunciado original del Práctico 4

> Esta transcripción y `docs/Practico_4_original.pdf` son las fuentes originales. Las decisiones de diseño se documentan por separado.

## Práctico 4: Sistema de Gestión de Cartelera y Reserva de Asientos

**Fecha de presentación:** 25/06/2026

## Descripción

Desarrollar una aplicación web para administrar una cadena de cines. Los usuarios podrán consultar la cartelera, ver funciones disponibles, seleccionar asientos y realizar una reserva. Además, existirá un panel administrativo para gestionar películas y funciones.

## Funcionalidades para clientes

### Autenticación

- Registro de usuario
- Inicio de sesión
- Cierre de sesión

### Cartelera

- Ver todas las películas disponibles
- Buscar películas por nombre
- Filtrar por género
- La cartelera es de acceso público

### Detalle de película

Mostrar:

- Imagen (cargada con un archivo)
- Título
- Duración
- Género
- Clasificación (+14, R, Todo público)
- Sinopsis
- Funciones disponibles

### Reserva de entradas

El usuario loggeado podrá:

- Seleccionar una función
- Ver un mapa de asientos (gráfico)
- Elegir uno o varios asientos
- Confirmar la reserva
- Ver sus reservas realizadas

## Funcionalidades para administrador

### Gestión de películas

- Crear película
- Editar película
- Eliminar película
- Listar películas

Campos:

- Título
- Sinopsis
- Género
- Duración
- Clasificación
- Imagen del poster

### Gestión de salas

- Crear sala
- Definir cantidad de filas
- Definir cantidad de columnas
- Ver capacidad total

### Gestión de funciones

- Seleccionar película
- Seleccionar sala
- Definir fecha y hora
- Definir precio de entrada

El sistema debe impedir crear dos funciones que ocupen la misma sala en horarios superpuestos.

## Reglas de negocio

- Un asiento no puede reservarse dos veces para la misma función.
- Solo usuarios autenticados pueden reservar.
- Solo administradores pueden modificar películas, salas y funciones.
- Una función debe estar asociada a una película y una sala existentes.

# Archivo original

El PDF original se conserva en [`docs/Practico_4_original.pdf`](../../Practico_4_original.pdf).
