---
type: feature
id: WI-005
title: "Implementar CRUD de salas y generación de asientos"
knowledge_level: K3
status: done
phase: now
initiative: "Catálogo de Películas y Salas"
domains: []
code: ["backend/src/rooms/**"]
created_at: 2026-06-24
source: roadmap
source_id: WI-005
source_initiative: RM-002
summary: "CRUD de salas bajo /admin/rooms con generación atómica automática de asientos (capacidad = filas * columnas)."
---

# Implementar CRUD de salas y generación de asientos

> Type: feature · Level: K3

## Source

- Source: roadmap
- Candidate: WI-005
- Initiative: RM-002 — Catálogo de Películas y Salas

## Expected Value

CRUD de salas bajo /admin/rooms con generación atómica automática de asientos (capacidad = filas * columnas).

## Context From Roadmap

This candidate was created from the roadmap initiative RM-002.

**Related capabilities:** Administración (ADMIN), Gestión de Salas

**Domain:** Catálogo de Películas y Salas

**Impact:** Medium

**Risk:** Medium

**Dependencies:**
- WI-001

## Risks

Medium

## Notes

Impedir cambios en filas/columnas y eliminación si la sala cuenta con funciones programadas.

## Open Questions

- None

## Out of scope

- Layouts de asientos no rectangulares (los asientos siempre son filas por columnas).
- Butacas con precios diferenciados dentro de la misma sala.

## Validation

1. Correr pruebas de salas y asientos en backend: `npm run test --prefix backend`
2. Crear sala con 5 filas y 10 columnas enviando POST `/api/v1/admin/rooms`. Verificar que en base de datos se crearon 50 asientos con códigos secuenciales `A1` a `E10`.
3. Intentar eliminar o cambiar filas y columnas de una sala que ya cuenta con funciones programadas en el futuro. Verificar que responde `409 ROOM_HAS_SHOWTIMES`.

## Definition of Done

- [x] Endpoints administrativos bajo `/admin/rooms` y consulta de asientos `/admin/rooms/:id/seats` implementados.
- [x] Generación automática y transaccional de asientos en base a dimensiones implementada.
- [x] Bloqueo de cambios en salas con funciones activas implementado y probado.
