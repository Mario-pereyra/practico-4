---
type: feature
id: WI-009
title: "Implementar visualización gráfica del mapa de asientos"
knowledge_level: K3
status: done
phase: now
initiative: "Selección de Asientos y Reservas"
domains: []
code: ["backend/src/showtimes/**", "frontend/src/pages/SeatsSelection.tsx"]
created_at: 2026-06-24
source: roadmap
source_id: WI-009
source_initiative: RM-005
summary: "Vista interactiva /showtimes/:showtimeId/seats que presenta el mapa de asientos en estados AVAILABLE o RESERVED."
---

# Implementar visualización gráfica del mapa de asientos

> Type: feature · Level: K3

## Source

- Source: roadmap
- Candidate: WI-009
- Initiative: RM-005 — Selección de Asientos y Reservas

## Expected Value

Vista interactiva /showtimes/:showtimeId/seats que presenta el mapa de asientos en estados AVAILABLE o RESERVED.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-005.

**Related capabilities:** Mapa de Asientos e Historial de Reservas

**Domain:** Transacciones y Flujo de Clientes

**Impact:** High

**Risk:** High

**Dependencies:**
- WI-008

## Risks

High

## Notes

Los asientos RESERVED deben mostrarse deshabilitados.

## Open Questions

- None

## Out of scope

- Zoom interactivo complejo o visualización en 3D de la sala.

## Validation

1. Correr pruebas en el frontend: `npm run test --prefix frontend`
2. Reservar un asiento (ej. A1) en base de datos para una función específica.
3. Navegar a `/showtimes/:showtimeId/seats` con un usuario autenticado y verificar que el asiento A1 se renderiza deshabilitado (gris), mientras que el resto de los asientos están habilitados.

## Definition of Done

- [x] Ruta `/showtimes/:showtimeId/seats` configurada en el frontend.
- [x] Endpoint `/showtimes/{showtimeId}/seats` en NestJS que retorne la grilla completa con el estado (`AVAILABLE`/`RESERVED`) de cada asiento.
- [x] Componente visual de grilla interactiva desarrollado con estados de hover y selección en React.
