---
type: UI Guidance
title: App shell compartido
description: Navegación y layout según sesión y rol.
tags:
- ui
- layout
- navegacion
timestamp: '2026-06-22T00:00:00-04:00'
---

# Navegación pública

* Cartelera.
* Login y Registro sin sesión.
* Mis reservas y Cerrar sesión con sesión.

# ADMIN

El administrador ve además acceso al panel y puede navegar a Películas, Salas y Funciones. También puede usar el flujo normal de reserva.

# Logout

La acción borra token y estado local; no llama al backend.
