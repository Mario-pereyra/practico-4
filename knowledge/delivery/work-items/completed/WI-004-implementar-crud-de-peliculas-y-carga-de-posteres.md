---
type: feature
id: WI-004
title: "Implementar CRUD de películas y carga de pósteres"
knowledge_level: K3
status: done
phase: now
initiative: "Catálogo de Películas y Salas"
domains: []
code: ["backend/src/movies/**"]
created_at: 2026-06-24
source: roadmap
source_id: WI-004
source_initiative: RM-002
summary: "CRUD completo de películas bajo /admin/movies y carga multipart del póster."
---

# Implementar CRUD de películas y carga de pósteres

> Type: feature · Level: K3

## Source

- Source: roadmap
- Candidate: WI-004
- Initiative: RM-002 — Catálogo de Películas y Salas

## Expected Value

CRUD completo de películas bajo /admin/movies y carga multipart del póster.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-002.

**Related capabilities:** Administración (ADMIN), Gestión de Películas

**Domain:** Catálogo de Películas y Salas

**Impact:** Medium

**Risk:** Medium

**Dependencies:**
- WI-001

## Risks

Medium

## Notes

Implementar validación de cambio de duración y bloqueo de eliminación si tiene funciones asociadas.

## Open Questions

- None

## Out of scope

- Borrado lógico (se usa borrado físico condicionado).
- Subida de archivos a servicios externos (ej. AWS S3). Los pósteres se guardan localmente en el backend.

## Validation

1. Correr pruebas unitarias de películas: `npm run test --prefix backend`
2. Enviar POST `/api/v1/admin/movies` con campos válidos y un póster (JPEG/PNG/WebP de hasta 5 MB) usando `multipart/form-data` con token Bearer ADMIN. Verificar respuesta exitosa.
3. Intentar cambiar la duración de una película con funciones programadas en el futuro. Verificar que responde `409 MOVIE_DURATION_LOCKED`.
4. Intentar eliminar una película con funciones asociadas. Verificar que responde `409 MOVIE_HAS_SHOWTIMES`.

## Definition of Done

- [x] Endpoints administrativos bajo `/admin/movies` y públicos bajo `/movies` implementados.
- [x] Carga y almacenamiento físico de archivos locales implementada de forma segura.
- [x] Lógica de control de duración y eliminación protegida e integrada a nivel backend.
