---
type: "view-spec"
title: "Dashboard administrador"
route: "/admin"
auth: "required"
role: "ADMIN"
priority: "MVP"
relatedApis:
  - "GET /admin/movies"
  - "GET /admin/rooms"
  - "GET /admin/showtimes"
updated: "2026-06-22"
---
# Dashboard administrador

## Objetivo

Dar al administrador un punto de entrada claro hacia gestión de películas, salas y funciones.

## Layout

- `AdminShell`.
- Título “Panel administrativo”.
- Tres tarjetas principales: Películas, Salas, Funciones.
- Accesos rápidos: Crear película, Crear sala, Crear función.
- Bloque de recordatorio de reglas críticas.

## Componentes

- `AdminShell`
- `AdminNav`
- `MetricCard`
- `QuickActionCard`
- `RuleReminder`

## Reglas UX

- No intentar crear un dashboard analítico complejo.
- Mostrar la navegación administrativa de forma persistente.
- Recordar que el admin fue creado por seed, no se registra.

## Prompt Stitch recomendado

Crear un dashboard administrativo web para una aplicación de reservas de cine. Debe tener navegación lateral o superior con Películas, Salas y Funciones, tarjetas de acceso rápido para crear cada entidad y un bloque de reglas críticas. Estilo sobrio, profesional, claro y fácil de defender académicamente.

## Checklist de aceptación

- Acceso solo admin.
- Permite navegar a CRUDs principales.
- No muestra opciones de cliente como flujo principal.
