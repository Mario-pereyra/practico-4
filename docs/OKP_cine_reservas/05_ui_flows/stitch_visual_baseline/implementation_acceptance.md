---
type: Quality
title: Aceptación visual frontend
description: Checklist para validar la adaptación del baseline a React.
tags:
- ui
- qa
- frontend
timestamp: '2026-06-22T00:00:00-04:00'
---

# Checklist

- [ ] Rutas frontend coinciden con `ui_ux_spec.md`.
- [ ] Login no ofrece registro administrativo.
- [ ] Registro crea únicamente `CLIENT`.
- [ ] `ADMIN` puede usar administración y flujo de reserva.
- [ ] Moneda visible unificada como `Bs.`/BOB.
- [ ] Fechas se muestran en `America/La_Paz`.
- [ ] No hay pagos, reembolsos, cancelaciones, QR ni facturación.
- [ ] Formulario/listado de función no muestran limpieza ni “disponible desde”.
- [ ] Mis reservas no tiene pestaña de canceladas.
- [ ] Póster se envía como archivo multipart.
- [ ] Mapa tiene estados disponible, seleccionado y reservado.
- [ ] Botones de envío se deshabilitan durante la petición.
- [ ] 401, 403, 404 y 409 tienen tratamiento visible.
