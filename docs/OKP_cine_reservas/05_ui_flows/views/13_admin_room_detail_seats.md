---
type: "view-spec"
title: "Admin detalle de sala y asientos"
route: "/admin/rooms/:roomId"
auth: "required"
role: "ADMIN"
priority: "MVP"
relatedApis:
  - "GET /admin/rooms/{roomId}"
  - "GET /admin/rooms/{roomId}/seats"
updated: "2026-06-22"
---
# Admin detalle de sala y asientos

## Objetivo

Permitir que el administrador revise la distribución formal de asientos de una sala.

## Layout

- `AdminShell`.
- Header con nombre de sala, filas, columnas y capacidad.
- Grilla de asientos no interactiva o solo lectura.
- Botón volver.

## Componentes

- `RoomSummary`
- `SeatMapReadOnly`

## Reglas UX

- Esta vista no reserva asientos.
- Sirve para comprobar que la sala fue generada correctamente.
- Si no hay asientos por error, mostrar alerta técnica: “La sala no tiene asientos generados.”

## Prompt Stitch recomendado

Crear una pantalla administrativa de detalle de sala con resumen de nombre, filas, columnas y capacidad total. Mostrar una grilla de asientos en modo solo lectura con códigos A1, A2, B1, etc. Diseño simple, funcional y claro.

## Checklist de aceptación

- Muestra datos de sala.
- Muestra grilla de asientos.
- No permite reservar desde admin.
