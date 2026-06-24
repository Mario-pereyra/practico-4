---
type: UI Guidance
title: Desviaciones visuales conocidas
description: Diferencias entre artefactos Stitch archivados y el contrato actual.
tags:
- ui
- stitch
- desviaciones
timestamp: '2026-06-22T00:00:00-04:00'
---

# No implementar desde referencias archivadas

| Contenido visual antiguo | Regla actual |
|---|---|
| Cancelar reserva | Fuera del MVP. |
| Estado o pestaña “Cancelada” | Las reservas confirmadas son inmutables. |
| Reembolso | Pagos y reembolsos están fuera de alcance. |
| Limpieza de 15 minutos | No existe margen de limpieza. |
| Columna “Disponible desde” | Usar únicamente inicio y fin. |
| Mapa solo para CLIENT | Cualquier usuario autenticado puede reservar. |
| Ruta `/reservations/:id` | La ruta frontend es `/my-reservations/:id`. |

# Principio

No copiar HTML de Stitch como lógica funcional. Adaptar estructura y estilo a las especificaciones actuales.
