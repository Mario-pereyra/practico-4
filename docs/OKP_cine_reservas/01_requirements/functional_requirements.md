---
type: Requirements
title: Requisitos funcionales
description: Listado funcional refinado y trazable del MVP.
tags:
- requisitos
- funcional
- mvp
timestamp: '2026-06-22T00:00:00-04:00'
---

# Autenticación

* **RF-01:** registrar usuarios `CLIENT`.
* **RF-02:** iniciar sesión con correo y contraseña.
* **RF-03:** cerrar sesión eliminando el JWT local.
* **RF-04:** obtener los datos del usuario autenticado.
* **RF-05:** permitir login de `ADMIN` creado por seed, sin registro administrativo.

# Cartelera

* **RF-06:** listar públicamente las películas que tengan al menos una función futura.
* **RF-07:** buscar películas parcialmente por título.
* **RF-08:** filtrar películas por género.
* **RF-09:** mostrar póster, título, duración, género, clasificación, sinopsis y funciones futuras.

# Reservas

* **RF-10:** exigir autenticación para abrir el mapa de asientos de una función.
* **RF-11:** mostrar asientos disponibles y reservados gráficamente.
* **RF-12:** permitir elegir entre 1 y 20 asientos.
* **RF-13:** confirmar la reserva de forma atómica.
* **RF-14:** listar las reservas propias.
* **RF-15:** mostrar el detalle de una reserva propia.

# Administración de películas

* **RF-16:** listar, crear, consultar, editar y eliminar películas.
* **RF-17:** cargar el póster como archivo JPEG, PNG o WebP.
* **RF-18:** bloquear cambio de duración cuando haya funciones futuras o en curso.
* **RF-19:** bloquear eliminación cuando haya funciones asociadas.

# Administración de salas

* **RF-20:** listar, crear, consultar, editar y eliminar salas.
* **RF-21:** calcular capacidad como filas por columnas.
* **RF-22:** generar asientos al crear o redimensionar una sala sin funciones.
* **RF-23:** bloquear cambio de distribución y eliminación cuando haya funciones asociadas.

# Administración de funciones

* **RF-24:** listar, crear, consultar, editar y eliminar funciones.
* **RF-25:** calcular y persistir `endsAt` con la duración vigente de la película.
* **RF-26:** impedir funciones pasadas o superpuestas.
* **RF-27:** bloquear edición/eliminación de funciones iniciadas, pasadas o con reservas.
