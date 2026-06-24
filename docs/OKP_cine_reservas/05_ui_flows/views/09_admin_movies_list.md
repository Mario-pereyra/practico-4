---
type: "view-spec"
title: "Admin listado de películas"
route: "/admin/movies"
auth: "required"
role: "ADMIN"
priority: "MVP"
relatedApis:
  - "GET /admin/movies"
  - "DELETE /admin/movies/{movieId}"
updated: "2026-06-22"
---
# Admin listado de películas

## Objetivo

Permitir listar, buscar, crear, editar y eliminar películas.

## Layout

- `AdminShell`.
- Header: “Películas” + botón “Crear película”.
- Filtros: búsqueda por título, género opcional.
- Tabla de películas.

## Columnas

- Póster miniatura.
- Título.
- Género.
- Duración.
- Clasificación.
- Acciones.

## Acciones

- Editar.
- Eliminar.

## Reglas UX

- Si una película tiene funciones asociadas, la eliminación debe bloquearse o mostrar error claro.
- Confirmar antes de eliminar.
- Empty state con CTA “Crear película”.

## Prompt Stitch recomendado

Crear una pantalla administrativa de listado de películas para una app de cine. Mostrar tabla con miniatura del póster, título, género, duración, clasificación y acciones editar/eliminar. Incluir botón “Crear película” y buscador. Estilo limpio, sobrio, con navegación admin clara.

## Checklist de aceptación

- Lista películas.
- Permite ir a crear.
- Permite editar.
- Permite eliminar con confirmación y validación.
