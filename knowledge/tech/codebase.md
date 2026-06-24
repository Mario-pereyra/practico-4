---
type: codebase
status: consolidated
---

# Codebase

## Repository Structure

El proyecto está estructurado como un monorepositorio con las siguientes carpetas principales:
```text
repo/
├── backend/                     # Backend NestJS + TypeScript
│   ├── src/                     # Código fuente de NestJS (módulos, controladores, servicios, etc.)
│   ├── test/                    # Pruebas automatizadas (Jest)
│   └── package.json
├── frontend/                    # Frontend React + Vite + TypeScript
│   ├── src/                     # Componentes React, vistas, hooks y estilos
│   ├── public/                  # Activos estáticos públicos
│   └── package.json
├── docs/                        # Documentación técnica, PRD, OpenAPI, y especificaciones de diseño
├── knowledge/                   # Base de conocimiento administrada por Kaddo
└── .gitignore                   # Archivo de ignorados de Git
```

## Candidate Stack

* **Frontend:** React + Vite + TypeScript.
* **Backend:** NestJS + TypeScript.
* **Base de datos:** PostgreSQL.
* **ORM:** TypeORM para la persistencia e integridad de datos.
* **Autenticación:** JWT (JSON Web Tokens) Bearer.
* **Integración API:** REST documentada con OpenAPI 3.1 (`docs/openapi.yaml`).
* **Archivos/Pósteres:** Almacenamiento local directo en el backend (servido de forma estática) para la demo académica.
* **Testing:** Jest + Supertest en el backend (estándar nativo de NestJS) y Vitest + React Testing Library en el frontend (integración nativa con Vite).

## Quality Attributes

* **Integridad Transaccional:** Uso de transacciones (`TypeORM`) para operaciones críticas como la creación de salas (con autogeneración de asientos) y la reserva de asientos (para evitar doble reserva).
* **Seguridad:** Separación estricta de rutas por roles (`CLIENT` y `ADMIN`). Cifrado seguro de contraseñas con hash en el backend.
* **Consistencia Temporal:** Todos los campos temporales de la base de datos se guardan en formato UTC con zona horaria (`timestamptz`). La API se comunica usando ISO 8601 con desplazamiento, y la UI traduce a la zona horaria del cine (`America/La_Paz`).
* **Tratamiento Uniforme de Errores:** Estructura estándar `ErrorResponse` en todas las respuestas fallidas de la API, con códigos de error técnicos uniformes (ej. `409 SEAT_ALREADY_RESERVED`, `409 MOVIE_DURATION_LOCKED`, etc.).

## Development Standards

* **Prefijo de API:** Todas las rutas expuestas por el backend deben comenzar con `/api/v1`.
* **Convención de Idiomas:** El código fuente, la API (rutas, payloads, respuestas, códigos de error), la base de datos (nombres de tablas, columnas) y la documentación técnica de desarrollo se escriben en inglés técnico. La interfaz de usuario (UI) y las descripciones del negocio se muestran en español.
* **Carga de Archivos:** La creación y edición de películas con póster usa codificación `multipart/form-data`.
* **Paginación:** Todas las rutas que retornan listados de recursos deben estar paginadas por defecto (parámetros `page` y `limit`), con un límite máximo de 100 elementos.

## Git Strategy

GitHub Flow + Conventional Commits + SemVer. Se trabajará en ramas de características basadas en ítems de trabajo (ej. `feature/<id>-<slug>`) creadas a partir de la rama principal (`main` o `master`). Kaddo se utiliza como validador de consistencia y no ejecuta comandos de Git directamente.

## Initial Modules

* **Auth:** Módulo de registro, login y perfil del usuario (`/auth/register`, `/auth/login`, `/auth/me`).
* **Movies:** Catálogo de películas públicas y gestión administrativa (`/movies`, `/admin/movies`).
* **Rooms:** Administración de salas y visualización física de asientos (`/admin/rooms`).
* **Showtimes:** Programación de funciones y control de solapamiento de horarios (`/showtimes`, `/admin/showtimes`).
* **Reservations:** Confirmación atómica de reservas de asientos y consulta de historial (`/reservations`, `/reservations/my`).

## Assumptions

* El backend NestJS actúa como autoridad exclusiva de validación de reglas de negocio y seguridad (roles). El frontend proporciona validación orientada a la experiencia de usuario.
* La base de datos PostgreSQL se inicializará y mantendrá mediante migraciones de TypeORM.
* Los datos de prueba y del administrador operativo se crearán mediante un script de seed al levantar la base de datos.

## Open Questions

_(Ninguna)_

## Quality checklist

- [x] Structure follows business and product, not a framework default.
- [x] No production code is described here — only the foundation.
