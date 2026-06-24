---
type: Requirements
title: Requisitos no funcionales
description: Atributos mínimos de seguridad, integridad, usabilidad y mantenibilidad.
tags:
- requisitos
- no-funcional
- calidad
timestamp: '2026-06-22T00:00:00-04:00'
---

# Seguridad

* Contraseñas hasheadas; nunca se almacenan ni registran en texto plano.
* JWT Bearer para rutas autenticadas.
* Roles y propiedad de reservas se validan en backend.
* Una reserva ajena responde 404 para no revelar su existencia.
* MIME, extensión y tamaño del póster se validan en backend.

# Integridad

* Migraciones reproducibles y claves foráneas explícitas.
* Reserva en transacción con restricción única de asiento/función.
* Creación o regeneración de asientos en transacción.
* No usar eliminaciones en cascada sobre funciones o reservas.

# Usabilidad y accesibilidad

* Estados de carga, vacío, error y éxito visibles.
* Mapa de asientos utilizable con teclado y etiquetas accesibles.
* No depender exclusivamente del color para representar disponibilidad.
* Fechas mostradas en `America/La_Paz` y precios como `Bs. 0,00`.

# Mantenibilidad

* OpenAPI es la fuente normativa del contrato HTTP.
* Reglas críticas residen en servicios backend, no solo en la UI.
* Código simple, modular y defendible para una entrega universitaria.
