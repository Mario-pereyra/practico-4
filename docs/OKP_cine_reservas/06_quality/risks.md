---
type: Risk Register
title: Riesgos
description: Riesgos principales y mitigaciones proporcionales al práctico.
tags:
- riesgos
- calidad
timestamp: '2026-06-22T00:00:00-04:00'
---

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Doble reserva concurrente | Alto | Transacción y unicidad `(showtime_id, seat_id)`. |
| Solapamiento por cálculo incorrecto | Alto | Persistir `endsAt`, fórmula semiabierta y pruebas de límites. |
| Cambio de duración altera horarios | Alto | Bloquear con funciones futuras/en curso y conservar `endsAt` pasado. |
| Eliminación rompe historial | Alto | `RESTRICT` y reglas de dependencia. |
| Zona horaria inconsistente | Medio | UTC en DB, ISO 8601 y helper `America/La_Paz`. |
| Precio con errores de precisión | Medio | `numeric(10,2)` y total calculado en backend. |
| Póster no cumple enunciado | Medio | Multipart y validación de archivo. |
| Un administrador reutiliza un registro para otra película/sala | Medio | Documentar que las ediciones corrigen metadata; crear una entidad nueva para un recurso distinto. |
| Drift documental | Medio | OpenAPI canónico, hashes y script de chequeo. |
| Baseline visual induce funciones descartadas | Medio | Mover vistas conflictivas a `legacy_views/`. |
