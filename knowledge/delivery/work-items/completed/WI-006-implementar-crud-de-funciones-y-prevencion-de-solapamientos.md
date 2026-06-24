---
type: feature
id: WI-006
title: "Implementar CRUD de funciones y prevención de solapamientos"
knowledge_level: K4
status: done
phase: now
initiative: "Programación de Funciones"
domains: []
code: ["backend/src/showtimes/**"]
created_at: 2026-06-24
source: roadmap
source_id: WI-006
source_initiative: RM-003
summary: "Programación de funciones bajo /admin/showtimes con cálculo automático de endsAt y prevención estricta de solapamientos en la sala."
---

# Implementar CRUD de funciones y prevención de solapamientos

> Type: feature · Level: K4

## Source

- Source: roadmap
- Candidate: WI-006
- Initiative: RM-003 — Programación de Funciones

## Expected Value

Programación de funciones bajo /admin/showtimes con cálculo automático de endsAt y prevención estricta de solapamientos en la sala.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-003.

**Related capabilities:** Programación de Funciones, Regla de solapamiento

**Domain:** Programación horaria

**Impact:** High

**Risk:** High

**Dependencies:**
- WI-004
- WI-005

## Risks

High

## Notes

Aplicar la regla de solapamiento en intervalos semiabiertos [startsAt, endsAt) a nivel backend y bloquear modificaciones de funciones pasadas o con reservas.

## Open Questions

- None

## Out of scope

- Tiempo de limpieza entre funciones (no requerido por el MVP). Dos funciones pueden ser perfectamente adyacentes.

## Validation

1. Correr pruebas en backend: `npm run test --prefix backend`
2. Intentar crear una función con inicio en el pasado (`startsAt <= now`). Verificar que es rechazada por el backend.
3. Intentar crear una función en la sala 1 de `18:00` a `20:00`, y otra función en la misma sala de `19:30` a `21:30`. Verificar que el backend responde `409 SHOWTIME_OVERLAP`.
4. Crear una función de `18:00` a `20:00` y otra de `20:00` a `22:00` en la misma sala. Verificar que es exitoso (adyacencia permitida).

## Definition of Done

- [x] Endpoints administrativos bajo `/admin/showtimes` implementados y validados.
- [x] Cálculo automático de finalización `endsAt = startsAt + movie.durationMinutes` implementado.
- [x] Lógica de validación de no solapamiento temporal semiabierto integrada en base de datos/backend.
