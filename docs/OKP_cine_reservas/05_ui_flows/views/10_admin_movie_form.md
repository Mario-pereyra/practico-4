---
type: "view-spec"
title: "Admin formulario de película"
route: "/admin/movies/new | /admin/movies/:movieId/edit"
auth: "required"
role: "ADMIN"
priority: "MVP"
relatedApis:
  - "POST /admin/movies"
  - "PUT /admin/movies/{movieId}"
  - "GET /admin/movies/{movieId}"
updated: "2026-06-22"
---
# Admin formulario de película

## Objetivo

Permitir crear o editar película con todos los campos exigidos.

## Layout

- `AdminShell`.
- Formulario centrado de máximo 640px.
- Vista previa del póster si existe.

## Campos

- Título.
- Sinopsis.
- Género.
- Duración en minutos.
- Clasificación: Todo público, +14, R.
- Imagen del póster como archivo.

## Validaciones UI

- Título obligatorio, entre 1 y 160 caracteres.
- Sinopsis obligatoria, entre 1 y 2000 caracteres.
- Género obligatorio y seleccionado del catálogo técnico definido.
- Duración entera entre 1 y 600 minutos.
- Clasificación obligatoria y seleccionada del catálogo técnico definido.
- Imagen obligatoria al crear; opcional al editar si ya existe.
- Póster JPG, PNG o WebP de hasta 5 MB.

## Acciones

- Guardar.
- Cancelar.

## Reglas UX

- Usar el mismo layout para crear y editar.
- Mostrar en español los valores técnicos de género y clasificación.
- No mostrar campos no pedidos por el práctico.
- Mostrar errores debajo de cada campo.
- Si la API devuelve `MOVIE_DURATION_LOCKED`, conservar el formulario y explicar que la duración no puede cambiar mientras existan funciones futuras o en curso.

## Prompt Stitch recomendado

Crear un formulario administrativo para crear o editar una película de cine. Campos: título, sinopsis, género, duración, clasificación y carga de póster. Incluir vista previa de imagen, botones Guardar y Cancelar, validaciones visibles y diseño sobrio en español.

## Checklist de aceptación

- Permite crear película.
- Permite editar película.
- Sube póster como archivo.
- Valida campos obligatorios.
