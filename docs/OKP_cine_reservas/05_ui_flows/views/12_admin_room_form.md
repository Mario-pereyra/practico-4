---
type: "view-spec"
title: "Admin formulario de sala"
route: "/admin/rooms/new | /admin/rooms/:roomId/edit"
auth: "required"
role: "ADMIN"
priority: "MVP"
relatedApis:
  - "POST /admin/rooms"
  - "PUT /admin/rooms/{roomId}"
  - "GET /admin/rooms/{roomId}"
updated: "2026-06-22"
---
# Admin formulario de sala

## Objetivo

Crear o editar una sala definiendo filas y columnas, generando asientos formales.

## Layout

- `AdminShell`.
- Formulario centrado.
- Preview simple de capacidad.

## Campos

- Nombre de sala.
- Cantidad de filas.
- Cantidad de columnas.

## Datos calculados

- Capacidad total = filas × columnas.
- Preview textual: “Se generarán 40 asientos.”

## Validaciones UI

- Nombre obligatorio.
- Filas: entero entre 1 y 26.
- Columnas: entero entre 1 y 50.
- La capacidad se calcula como `filas × columnas`; no se edita manualmente.

## Reglas UX

- Al crear sala, los asientos se generan automáticamente.
- Al editar sala con funciones asociadas, bloquear cambio de filas/columnas.
- Explicar el bloqueo: “No se puede cambiar la distribución porque la sala tiene funciones asociadas.”

## Prompt Stitch recomendado

Crear un formulario administrativo para crear o editar una sala de cine. Campos: nombre, cantidad de filas y columnas. Mostrar capacidad calculada en tiempo real y un texto que indique cuántos asientos se generarán. Diseño claro, sobrio, con validaciones visibles.

## Checklist de aceptación

- Crea sala.
- Calcula capacidad.
- Genera asientos.
- Bloquea cambios peligrosos si hay dependencias.
