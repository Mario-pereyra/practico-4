---
type: feature
id: WI-008
title: "Implementar detalle de película y horarios de funciones"
knowledge_level: K2
status: done
phase: now
initiative: "Cartelera Pública y Detalle"
domains: []
code: ["backend/src/movies/**", "frontend/src/pages/MovieDetails.tsx"]
created_at: 2026-06-24
source: roadmap
source_id: WI-008
source_initiative: RM-004
summary: "Vista de detalle /movies/:movieId que muestra la sinopsis, póster, y listado de funciones futuras asociadas a la película."
---

# Implementar detalle de película y horarios de funciones

> Type: feature · Level: K2

## Source

- Source: roadmap
- Candidate: WI-008
- Initiative: RM-004 — Cartelera Pública y Detalle

## Expected Value

Vista de detalle /movies/:movieId que muestra la sinopsis, póster, y listado de funciones futuras asociadas a la película.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-004.

**Related capabilities:** Descubrimiento y Cartelera

**Domain:** Portal de Clientes (Público)

**Impact:** Medium

**Risk:** Low

**Dependencies:**
- WI-007

## Risks

Low

## Notes

Asegurar que solo se devuelvan funciones futuras.

## Open Questions

- None

## Out of scope

- Administración de comentarios o valoraciones públicas.

## Validation

1. Correr pruebas en el frontend: `npm run test --prefix frontend`
2. Crear una película con 2 funciones (una de las cuales ya ha comenzado/terminado, y otra que es futura).
3. Navegar a `/movies/:movieId` y verificar que solo aparece listada la función futura.
4. Verificar que se renderizan todos los datos: título, sinopsis, duración, género, clasificación y póster.

## Definition of Done

- [x] Ruta `/movies/:movieId` implementada en React y conectada al backend.
- [x] Backend configurado para filtrar y retornar únicamente funciones futuras (`startsAt > now`) en el detalle de la película.
- [x] Vista del detalle maquetada de manera premium con diseño adaptativo.
