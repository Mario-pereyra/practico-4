---
type: feature
id: WI-011
title: "Implementar historial y detalle de reservas propias"
knowledge_level: K2
status: done
phase: now
initiative: "Selección de Asientos y Reservas"
domains: []
code: ["backend/src/reservations/**", "frontend/src/pages/MyReservations.tsx"]
created_at: 2026-06-24
source: roadmap
source_id: WI-011
source_initiative: RM-005
summary: "Vistas /my-reservations y /my-reservations/:reservationId para consultar el historial y los detalles de las reservas confirmadas del usuario."
---

# Implementar historial y detalle de reservas propias

> Type: feature · Level: K2

## Source

- Source: roadmap
- Candidate: WI-011
- Initiative: RM-005 — Selección de Asientos y Reservas

## Expected Value

Vistas /my-reservations y /my-reservations/:reservationId para consultar el historial y los detalles de las reservas confirmadas del usuario.

## Context From Roadmap

This candidate was created from the roadmap initiative RM-005.

**Related capabilities:** Mapa de Asientos e Historial de Reservas

**Domain:** Transacciones y Flujo de Clientes

**Impact:** Medium

**Risk:** Low

**Dependencies:**
- WI-010

## Risks

Low

## Notes

Validar rigurosamente que el usuario autenticado sea el propietario de la reserva (devolver 404 si es ajena).

## Open Questions

- None

## Out of scope

- Reportes acumulados de gastos o estadísticas de asistencia de usuario en la UI.

## Validation

1. Correr pruebas unitarias e integración en backend: `npm run test --prefix backend`
2. Iniciar sesión como CLIENT-A.
3. Consultar GET `/api/v1/reservations/my` y verificar que solo aparecen sus reservas.
4. Intentar consultar GET `/api/v1/reservations/{reservationId}` del CLIENT-B. Verificar que responde `404 Not Found`.

## Definition of Done

- [x] Endpoints `/reservations/my` y `/reservations/{reservationId}` implementados y protegidos.
- [x] Vistas `/my-reservations` y `/my-reservations/:id` desarrolladas y funcionales en React.
- [x] Control estricto de propiedad de recurso implementado a nivel de servicio en backend.
