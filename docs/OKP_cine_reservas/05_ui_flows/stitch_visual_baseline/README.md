---
type: UI Guidance
title: Baseline visual Stitch
description: Referencias visuales no normativas para la implementación React.
tags:
- ui
- stitch
- referencia-visual
timestamp: '2026-06-22T00:00:00-04:00'
---

# Autoridad

Las capturas y HTML son referencias visuales. Prevalecen OpenAPI, reglas de negocio y especificaciones de vista.

# Vistas seleccionadas

`selected_views/` contiene únicamente referencias sin contradicciones conocidas con el MVP actual.

# Vistas archivadas

Las referencias que muestran cancelaciones, limpieza, reembolsos o filtros de reservas canceladas se movieron a `legacy_views/` y no deben implementarse literalmente.

# Uso

1. Consultar `view_selection_map.md`.
2. Tomar composición y jerarquía visual.
3. Implementar con React + TypeScript.
4. Sustituir contenido según las vistas del OKP.
