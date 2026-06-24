---
type: "view-spec"
title: "Detalle de película"
route: "/movies/:movieId"
auth: "public"
role: "VISITOR | CLIENT | ADMIN"
priority: "MVP"
relatedApis:
  - "GET /movies/{movieId}"
updated: "2026-06-22"
---
# Detalle de película

## Objetivo

Mostrar toda la información de una película y sus funciones disponibles para iniciar una reserva.

## Layout

- `AppShell` público.
- Sección superior con póster a la izquierda y datos principales a la derecha.
- Sección de sinopsis.
- Sección de funciones disponibles en tarjetas o lista.

## Datos visibles

- Imagen del póster.
- Título.
- Duración.
- Género.
- Clasificación.
- Sinopsis.
- Funciones disponibles con fecha, hora, sala y precio.

## Componentes

- `MoviePoster`
- `MovieMetadata`
- `ShowtimeCard`
- `StatusBadge`
- `EmptyState`

## Estados

- Loading: skeleton para póster y texto.
- Sin funciones: “No hay funciones disponibles para esta película.”
- Error 404: película no encontrada.

## Reglas UX

- El botón principal en cada función debe decir “Seleccionar asientos”.
- Si el usuario no está autenticado, puede ver funciones pero al seleccionar asientos debe redirigirse a login o mostrar mensaje de autenticación requerida.
- No mostrar funciones pasadas como reservables.

## Responsive

- Mobile: póster arriba, datos debajo.
- Desktop: póster y datos en dos columnas.

## Prompt Stitch recomendado

Crear una pantalla de detalle de película para una app web de reservas de cine. Mostrar póster grande, título, duración, género, clasificación, sinopsis y una lista de funciones disponibles con fecha, hora, sala, precio y botón “Seleccionar asientos”. Usar diseño sobrio, tarjetas blancas, acento ámbar oscuro, texto en español y excelente jerarquía visual.

## Checklist de aceptación

- Muestra todos los campos exigidos del práctico.
- Muestra funciones disponibles.
- Permite iniciar flujo de reserva.
- Maneja película sin funciones.
