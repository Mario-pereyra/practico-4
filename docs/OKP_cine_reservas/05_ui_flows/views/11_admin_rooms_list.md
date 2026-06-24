---
type: "view-spec"
title: "Admin listado de salas"
route: "/admin/rooms"
auth: "required"
role: "ADMIN"
priority: "MVP"
relatedApis:
  - "GET /admin/rooms"
  - "DELETE /admin/rooms/{roomId}"
updated: "2026-06-22"
---
# Admin listado de salas

## Objetivo

Permitir listar, crear, editar, eliminar y revisar capacidad de salas.

## Layout

- `AdminShell`.
- Header “Salas” + botón “Crear sala”.
- Tabla de salas.

## Columnas

- Nombre.
- Filas.
- Columnas.
- Capacidad total.
- Acciones.

## Acciones

- Ver asientos.
- Editar.
- Eliminar.

## Reglas UX

- Si una sala tiene funciones asociadas, eliminar debe bloquearse.
- Si una sala tiene funciones, editar filas/columnas debe bloquearse o advertirse.
- La capacidad total se presenta como dato calculado.

## Prompt Stitch recomendado

Crear una pantalla administrativa de listado de salas para un sistema de cine. Mostrar tabla con nombre, filas, columnas, capacidad total y acciones ver asientos, editar y eliminar. Incluir botón “Crear sala”. Diseño claro, administrativo, sobrio y fácil de entender.

## Checklist de aceptación

- Lista salas.
- Muestra capacidad total.
- Navega a crear/editar.
- Permite ver asientos.
- Maneja eliminación bloqueada por dependencias.
