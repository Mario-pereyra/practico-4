---
type: "view-spec"
title: "Cartelera pública"
route: "/movies"
auth: "public"
role: "VISITOR | CLIENT | ADMIN"
priority: "MVP"
relatedApis:
  - "GET /movies"
updated: "2026-06-22"
---
# Cartelera pública

## Objetivo

Permitir que cualquier visitante vea la cartelera, busque películas por nombre y filtre por género sin iniciar sesión.

## Usuario principal

Visitante o cliente autenticado.

## Layout

- `AppShell` público.
- Header de página con título “Cartelera”.
- Barra de filtros debajo del título.
- Grid de tarjetas de películas.
- Empty state cuando no existan resultados.

## Componentes

- `PageHeader`
- `SearchInput`
- `GenreSelect`
- `MovieCard`
- `EmptyState`
- `Pagination` si el backend pagina

## Contenido por tarjeta

- Póster.
- Título.
- Género.
- Duración.
- Clasificación.
- Botón “Ver detalle”.

## Estados

- Loading: skeleton cards.
- Empty inicial: “No hay películas disponibles.”
- Empty con filtros: “No se encontraron películas con esos criterios.”
- Error: “No se pudo cargar la cartelera.”

## Reglas UX

- La búsqueda debe aceptar coincidencia parcial.
- El filtro de género debe poder limpiarse.
- El usuario no autenticado puede ver toda esta vista.
- No mostrar acciones administrativas en esta vista.

## Responsive

- Mobile: una columna.
- Tablet: dos columnas.
- Desktop: tres o cuatro columnas.

## Prompt Stitch recomendado

Crear una pantalla web pública de cartelera de cine en español. Debe tener una barra superior oscura, título “Cartelera”, buscador por nombre, filtro por género y una grilla de tarjetas de películas con póster, título, género, duración, clasificación y botón “Ver detalle”. Estilo moderno, claro, sobrio y académico; fondo gris claro, tarjetas blancas, acento ámbar oscuro para botones.

## Checklist de aceptación

- Se puede acceder sin login.
- Muestra películas.
- Permite buscar por nombre.
- Permite filtrar por género.
- Cada película navega a su detalle.
