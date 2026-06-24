---
type: Operations
title: Estándares de codificación
description: Convenciones simples para backend, frontend y base de datos.
tags:
- codigo
- estandares
- operacion
timestamp: '2026-06-22T00:00:00-04:00'
---

# Principios

* YAGNI y SOLID moderado.
* Servicios pequeños por dominio.
* Nombres técnicos en inglés y UI en español.
* No capturar errores de integridad como mensajes genéricos.
* No implementar reglas críticas únicamente en React.

# Backend

* DTOs para entrada.
* Entidades sin lógica HTTP.
* Transacciones explícitas para reservas y generación de asientos.
* Ordenar `seatIds` ascendentemente antes de insertar detalles concurrentes.
* Filtro común para `ErrorResponse`.
* Reloj inyectable o encapsulado para pruebas temporales.
* Dinero con decimal/numeric, no cálculos persistentes en `float`.

# Frontend

* Componentes presentacionales y servicios API por recurso.
* `AuthContext` únicamente para sesión.
* Deshabilitar envíos durante petición.
* Helpers únicos para fechas y dinero.
* `FormData` para pósteres.

# SQL crítico

```sql
UNIQUE (showtime_id, seat_id)
```

No usar índice parcial porque no existe cancelación ni estado de reserva.
