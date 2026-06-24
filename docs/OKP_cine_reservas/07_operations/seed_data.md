---
type: Operations
title: Datos seed
description: Datos mínimos para demostrar el flujo completo.
tags:
- seed
- demo
- datos
timestamp: '2026-06-22T00:00:00-04:00'
---

# Administrador

```text
email: admin@cine.local
password: Admin123!
role: ADMIN
```

La contraseña se hashea antes de persistir.

# Películas

* Película A: `ACTION`, 120 minutos, `AGE_14`.
* Película B: `ANIMATION`, 95 minutos, `ALL_AGES`.
* Película C: `DRAMA`, 110 minutos, `R`.

Cada una usa un póster de archivo válido.

# Salas

* Sala 1: 5 × 8 = 40 asientos.
* Sala 2: 4 × 6 = 24 asientos.

# Funciones

Crear funciones futuras en `America/La_Paz`, sin solapamiento, con precios BOB de dos decimales.
