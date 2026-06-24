---
type: Quality
title: Definition of Done
description: Condiciones funcionales, técnicas y documentales para cerrar la entrega.
tags:
- dod
- calidad
- entrega
timestamp: '2026-06-22T00:00:00-04:00'
---

# Funcional

- [ ] Cartelera pública, búsqueda, filtro y detalle operativos.
- [ ] Registro, login y logout local operativos.
- [ ] Mapa y reserva múltiple para cualquier usuario autenticado.
- [ ] Mis reservas y detalle propio operativos.
- [ ] CRUD de películas con archivo de póster.
- [ ] CRUD de salas con generación de asientos.
- [ ] CRUD de funciones con fin calculado y no solapamiento.
- [ ] Restricciones de duración, distribución y dependencias aplicadas.
- [ ] No existe cancelación, pago, limpieza ni gestión de sucursales.

# Técnico

- [ ] Contraseñas hasheadas y JWT validado.
- [ ] Permisos backend por rol y propiedad.
- [ ] PostgreSQL con migraciones, checks, FKs y unicidad.
- [ ] Concurrencia de reserva probada.
- [ ] Fechas UTC/`America/La_Paz` y dinero `numeric(10,2)`/BOB.
- [ ] OpenAPI válido y sincronizado en sus dos copias.
- [ ] Estados de UI y accesibilidad mínima cubiertos.

# Documental

- [ ] OKF v0.1 conforme.
- [ ] Enunciado original conservado.
- [ ] Decisiones, requisitos, API, modelo y pruebas sin contradicciones.
- [ ] Matriz de trazabilidad actualizada.
- [ ] Script de coherencia pasa sin errores.
