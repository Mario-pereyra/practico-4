---
type: chore
id: WI-003
title: "Crear seed y configuración de base de datos"
knowledge_level: K2
status: done
phase: now
initiative: "Base y Autenticación"
domains: []
code: ["backend/src/database/**"]
created_at: 2026-06-24
source: roadmap
source_id: WI-003
source_initiative: RM-001
summary: "Base de datos PostgreSQL inicializada con migraciones de TypeORM y usuario ADMIN pre-cargado."
---

# Crear seed y configuración de base de datos

> Type: chore · Level: K2

## Source

- Source: roadmap
- Candidate: WI-003
- Initiative: RM-001 — Base y Autenticación

## Expected Value

Base de datos PostgreSQL inicializada con migraciones de TypeORM y usuario ADMIN pre-cargado.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-001.

**Related capabilities:** None

**Domain:** Seguridad e Infraestructura

**Impact:** High

**Risk:** Low

**Dependencies:**
- WI-001

## Risks

Low

## Notes

Crear script de seed para base de datos local y entorno de demo.

## Open Questions

- None

## Out of scope

- Scripts de inicialización en la nube o entornos de staging externos.

## Validation

1. Correr las migraciones: `npm run migration:run --prefix backend`
2. Correr el comando de seed: `npm run seed --prefix backend`
3. Verificar mediante cliente SQL (ej. pgAdmin o CLI) que la tabla `users` contenga al usuario administrador con la contraseña debidamente hasheada.

## Definition of Done

- [x] Conexión a PostgreSQL configurada mediante variables de entorno en el backend.
- [x] Entidades base y esquema inicial de base de datos mapeado con TypeORM.
- [x] Script de seed ejecutable creado y validado para insertar el usuario `ADMIN`.
