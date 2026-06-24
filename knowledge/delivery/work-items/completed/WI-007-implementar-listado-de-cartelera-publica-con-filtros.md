---
type: feature
id: WI-007
title: "Implementar listado de cartelera pública con filtros"
knowledge_level: K2
status: done
phase: now
initiative: "Cartelera Pública y Detalle"
domains: []
code: ["backend/src/movies/**", "frontend/src/pages/Movies.tsx"]
created_at: 2026-06-24
source: roadmap
source_id: WI-007
source_initiative: RM-004
summary: "Vista pública /movies con buscador por título (búsqueda parcial) y filtros exactos por género."
---

# Implementar listado de cartelera pública con filtros

> Type: feature · Level: K2

## Source

- Source: roadmap
- Candidate: WI-007
- Initiative: RM-004 — Cartelera Pública y Detalle

## Expected Value

Vista pública /movies con buscador por título (búsqueda parcial) y filtros exactos por género.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-004.

**Related capabilities:** Descubrimiento y Cartelera

**Domain:** Portal de Clientes (Público)

**Impact:** Medium

**Risk:** Low

**Dependencies:**
- WI-006

## Risks

Low

## Notes

Excluir de la cartelera aquellas películas que no posean funciones futuras programadas.

## Open Questions

- None

## Out of scope

- Filtros de fecha avanzados (el listado solo filtra por género y busca por título).

## Validation

1. Correr pruebas en el frontend: `npm run test --prefix frontend`
2. Crear una película con funciones pasadas y otra con funciones futuras.
3. Cargar la ruta pública `/movies` y verificar que solo aparece la película con funciones futuras programadas.
4. Escribir parte del título en el buscador y verificar el filtro inmediato. Filtrar por género y verificar que solo muestra las correspondientes.

## Definition of Done

- [x] Ruta pública `/movies` implementada en React y conectada al backend.
- [x] Lógica de filtrado en base de datos para excluir películas sin funciones futuras programadas.
- [x] Componente visual de buscador y filtro por género operativo y responsive.
