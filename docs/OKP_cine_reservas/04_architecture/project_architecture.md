---
type: Technical Design
title: Arquitectura del proyecto
description: Arquitectura monolítica modular, estructura de repositorio y responsabilidades.
tags:
- arquitectura
- nestjs
- react
- repositorio
timestamp: '2026-06-22T00:00:00-04:00'
---

# Enfoque

Monolito modular con backend NestJS y frontend React. No se usan microservicios, CQRS, event sourcing ni una Clean Architecture pesada.

# Estructura documental entregada

```text
repo/
├── AGENTS.md
├── agents/
│   └── skills/cine-project-navigator/
└── docs/
    ├── README_ENTREGA.md
    ├── START_HERE_CODING_AGENT.md
    ├── openapi.yaml
    ├── DESIGN.md
    ├── Practico_4_original.pdf
    └── OKP_cine_reservas/
```

# Estructura recomendada de código

```text
repo/
├── backend/
│   └── src/
│       ├── common/
│       ├── config/
│       ├── database/
│       └── modules/
│           ├── auth/
│           ├── users/
│           ├── movies/
│           ├── rooms/
│           ├── showtimes/
│           └── reservations/
├── frontend/
│   └── src/
│       ├── api/
│       ├── auth/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       └── utils/
├── AGENTS.md
├── agents/
└── docs/
```

# Backend

* Controladores traducen HTTP.
* DTOs validan forma y límites.
* Servicios aplican reglas de negocio y transacciones.
* Repositorios TypeORM persisten.
* Guards aplican JWT y roles.
* Interceptor/filtro común genera `ErrorResponse`.

Módulos:

```text
AuthModule
UsersModule
MoviesModule
RoomsModule
ShowtimesModule
ReservationsModule
```

# Frontend

* `AuthContext` conserva sesión y usuario.
* Servicios API por recurso.
* `useState`/`useEffect` para estado de pantalla.
* Rutas públicas, autenticadas y administrativas.
* Logout local: borrar token y estado de auth.

Rutas principales:

```text
/movies
/movies/:movieId
/showtimes/:showtimeId/seats
/my-reservations
/my-reservations/:reservationId
/admin/movies
/admin/rooms
/admin/showtimes
```

# Fuentes de autoridad

1. Enunciado original.
2. Decisiones y reglas.
3. OpenAPI para HTTP.
4. Modelo de datos para persistencia.
5. Especificaciones de vista para UI.
6. Baseline Stitch solo como referencia visual.
