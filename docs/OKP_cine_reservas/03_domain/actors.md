---
type: Domain Model
title: Actores y permisos de dominio
description: Actores que interactúan con el sistema y sus capacidades.
tags:
- dominio
- actores
- roles
timestamp: '2026-06-22T00:00:00-04:00'
---

# Visitante

Consulta cartelera y detalle; puede registrarse e iniciar sesión.

# CLIENT

Usuario registrado. Consulta contenido público, abre mapas de asientos, confirma reservas y consulta las propias.

# ADMIN

Usuario creado por seed. Tiene todas las capacidades de un usuario autenticado y además gestiona películas, salas y funciones.

# Regla de propiedad

Una reserva solo puede ser consultada por el usuario que la creó. El rol `ADMIN` no otorga acceso automático a reservas ajenas en el MVP.
