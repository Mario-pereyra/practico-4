---
type: feature
id: WI-002
title: "Implementar módulo de autenticación"
knowledge_level: K3
status: done
phase: now
initiative: "Base y Autenticación"
domains: []
code: ["backend/src/auth/**"]
created_at: 2026-06-24
source: roadmap
source_id: WI-002
source_initiative: RM-001
summary: "Registro de clientes, inicio de sesión y endpoints protegidos con roles de usuario en base a JWT."
---

# Implementar módulo de autenticación

> Type: feature · Level: K3

## Source

- Source: roadmap
- Candidate: WI-002
- Initiative: RM-001 — Base y Autenticación

## Expected Value

Registro de clientes, inicio de sesión y endpoints protegidos con roles de usuario en base a JWT.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-001.

**Related capabilities:** Autenticación y Roles

**Domain:** Seguridad e Infraestructura

**Impact:** High

**Risk:** Low

**Dependencies:**
- WI-001

## Risks

Low

## Notes

Implementar endpoints /auth/register, /auth/login y /auth/me.

## Open Questions

- None

## Out of scope

- Refresh tokens y revocación de JWT en base de datos.
- Recuperación de contraseña.

## Validation

1. Ejecutar pruebas unitarias de autenticación en backend: `npm run test --prefix backend`
2. Ejecutar prueba manual de POST `/api/v1/auth/register` con payload de usuario y verificar respuesta `201` con JWT.
3. Ejecutar prueba manual de POST `/api/v1/auth/login` con credenciales correctas y verificar `200` + token.
4. Probar GET `/api/v1/auth/me` con y sin Bearer token y comprobar respuesta `200` y `401`.

## Definition of Done

- [x] Endpoints `/auth/register`, `/auth/login` y `/auth/me` implementados según el contrato OpenAPI.
- [x] Seguridad por roles configurada con roles `CLIENT` y `ADMIN`.
- [x] Pruebas unitarias de controladores y servicios desarrolladas y exitosas.
- [x] Sin advertencias en el análisis de código estático (lint).
