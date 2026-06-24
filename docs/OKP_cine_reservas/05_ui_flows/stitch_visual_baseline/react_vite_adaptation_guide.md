---
type: UI Guidance
title: Guía de adaptación React + Vite
description: Reglas para convertir referencias Stitch en componentes reales.
tags:
- ui
- react
- vite
- stitch
timestamp: '2026-06-22T00:00:00-04:00'
---

# Stack

Vite, React, TypeScript, React Router y un único cliente HTTP. `AuthContext` es el único estado global.

# Proceso

1. Elegir la especificación Markdown de la vista.
2. Consultar el baseline visual seleccionado si existe.
3. Separar layout, componentes y datos.
4. Conectar el endpoint OpenAPI correspondiente.
5. Agregar carga, vacío, error y éxito.
6. Verificar accesibilidad y responsive.

# Reglas

* No copiar scripts ni datos de ejemplo del HTML Stitch.
* No implementar limpieza, cancelaciones o reembolsos visibles en artefactos archivados.
* Póster mediante `FormData`.
* Fechas mediante un helper de `America/La_Paz`.
* Precio con dos decimales y BOB.
* `409` se muestra como conflicto de negocio, no como error genérico.
