---
type: Technical Design
title: Stack tecnológico
description: Tecnologías aprobadas para implementación y razones de uso.
tags:
- stack
- nestjs
- react
- postgresql
timestamp: '2026-06-22T00:00:00-04:00'
---

# Backend

* Node.js + TypeScript.
* NestJS.
* TypeORM.
* PostgreSQL.
* JWT Bearer.
* Validación con `class-validator`/`class-transformer`.
* Swagger/OpenAPI generado o verificado contra el contrato canónico.

# Frontend

* React + Vite + TypeScript.
* React Router.
* `fetch` o Axios, eligiendo uno.
* CSS simple o la estrategia ya definida por el equipo.
* React Context solo para autenticación.

# Persistencia y archivos

* `timestamptz` para instantes.
* `numeric(10,2)` para importes.
* Pósteres en almacenamiento local del backend para el práctico, con URL pública derivada.

# Criterio

El stack prioriza simplicidad, aprendizaje, coherencia con el enunciado y facilidad de defensa académica.
