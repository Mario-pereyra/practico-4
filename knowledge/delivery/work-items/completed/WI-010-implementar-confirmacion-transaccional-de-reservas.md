---
type: feature
id: WI-010
title: "Implementar confirmación transaccional de reservas"
knowledge_level: K4
status: done
phase: now
initiative: "Selección de Asientos y Reservas"
domains: []
code: ["backend/src/reservations/**"]
created_at: 2026-06-24
source: roadmap
source_id: WI-010
source_initiative: RM-005
summary: "Endpoint /reservations para reservar de 1 a 20 asientos de forma atómica y transaccional, previniendo carreras de solicitudes concurrentes."
---

# Implementar confirmación transaccional de reservas

> Type: feature · Level: K4

## Source

- Source: roadmap
- Candidate: WI-010
- Initiative: RM-005 — Selección de Asientos y Reservas

## Expected Value

Endpoint /reservations para reservar de 1 a 20 asientos de forma atómica y transaccional, previniendo carreras de solicitudes concurrentes.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-005.

**Related capabilities:** Reserva atómica, Unicidad de asiento por función

**Domain:** Transacciones y Flujo de Clientes

**Impact:** High

**Risk:** High

**Dependencies:**
- WI-009

## Risks

High

## Notes

Proteger la doble reserva mediante restricción de unicidad UNIQUE(showtime_id, seat_id).

## Open Questions

- None

## Out of scope

- Re-intentos automáticos del lado del servidor (si falla, el cliente debe seleccionar otro asiento en el mapa).

## Validation

1. Correr pruebas de integración de concurrencia: `npm run test --prefix backend`
2. Enviar dos peticiones POST simultáneas (carrera de solicitudes) a `/api/v1/reservations` intentando reservar el mismo asiento en la misma función.
3. Verificar que exactamente una petición finaliza con éxito (`201 Created`), y la otra es rechazada con un error `409 SEAT_ALREADY_RESERVED`.

## Definition of Done

- [x] Endpoint de reservas POST `/reservations` implementado bajo transaccionalidad TypeORM.
- [x] Restricción de unicidad de base de datos `UNIQUE(showtime_id, seat_id)` en la tabla `reservation_seats` aplicada.
- [x] Validación de que todos los asientos pertenezcan a la sala de la función y que no exceda el límite de 20 asientos por reserva.
