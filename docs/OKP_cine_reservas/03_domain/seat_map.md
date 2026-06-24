---
type: Domain Model
title: Mapa de asientos
description: Representación lógica y accesible de la disponibilidad por función.
tags:
- dominio
- asientos
- ui
timestamp: '2026-06-22T00:00:00-04:00'
---

# Generación

Al crear una sala se generan `rows × columns` asientos. Para una sala de 3 × 4:

```text
A1 A2 A3 A4
B1 B2 B3 B4
C1 C2 C3 C4
```

# Estados por función

| Estado técnico | Significado | Acción |
|---|---|---|
| `AVAILABLE` | No existe `reservation_seat` para la función y asiento. | Seleccionar/deseleccionar. |
| `RESERVED` | Ya existe una reserva para la función y asiento. | Deshabilitado. |

El estado “seleccionado” es local de la interfaz y no se persiste antes de confirmar.

# Accesibilidad

Cada asiento se representa como botón con código visible, `aria-label`, `aria-pressed` cuando corresponde y `disabled` si está reservado.
