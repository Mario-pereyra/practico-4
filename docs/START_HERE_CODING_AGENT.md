# START HERE — Agente de codificación

## Objetivo

Implementar el práctico con NestJS, TypeORM, PostgreSQL, React, Vite y TypeScript, respetando el alcance mínimo y las decisiones cerradas.

## Lectura obligatoria

1. `AGENTS.md`.
2. `agents/skills/cine-project-navigator/SKILL.md`.
3. `docs/OKP_cine_reservas/index.md`.
4. `docs/OKP_cine_reservas/00_context/enunciado_original.md`.
5. `docs/OKP_cine_reservas/00_context/decisions.md`.
6. `docs/OKP_cine_reservas/01_requirements/product_requirements_document.md`.
7. `docs/OKP_cine_reservas/01_requirements/business_rules.md`.
8. `docs/OKP_cine_reservas/04_architecture/openapi.yaml`.
9. `docs/OKP_cine_reservas/04_architecture/data_model.md`.
10. `docs/OKP_cine_reservas/06_quality/test_cases.md`.

## Orden de implementación

1. Configuración, PostgreSQL, migraciones y seed.
2. Auth y cartelera.
3. Películas multipart.
4. Salas y generación de asientos.
5. Funciones y no solapamiento.
6. Reservas transaccionales.
7. Frontend, roles, estados y QA.

## Desviación cero

No agregar cancelación de reservas, limpieza, pagos, reembolsos, QR, sucursales, Redux, Zustand, TanStack Query, microservicios, CQRS ni event sourcing.
