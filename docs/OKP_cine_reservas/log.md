# Bundle Update Log

## 2026-06-22
* **Update**: Se agregó el PRD integral aprobado en `01_requirements/product_requirements_document.md` y su derivado DOCX de presentación.
* **Decision**: Se retiraron cancelación de reservas, estados cancelados y endpoint asociado.
* **Decision**: Se retiró el margen de limpieza; las funciones usan intervalos `[startsAt, endsAt)`.
* **Decision**: Se aprobó borrado físico condicionado y se eliminaron `isActive`/`includeInactive`.
* **Decision**: Cualquier usuario autenticado puede reservar; administración permanece exclusiva de `ADMIN`.
* **Decision**: Logout local sin endpoint backend.
* **Update**: Se definieron UTC/`America/La_Paz`, BOB y precisión `numeric(10,2)`.
* **Update**: Se unificaron `rowLabel` y `columnNumber`, rutas de reserva, géneros, errores y límites.
* **Update**: Se agregó trazabilidad, pruebas de concurrencia y restricciones físicas de base de datos.
* **Update**: Se regeneró OpenAPI y se archivaron referencias Stitch incompatibles.
* **Fix**: El bundle cumple las reglas reservadas de `index.md` y `log.md` de OKF v0.1.

## 2026-06-17
* **Creation**: Se creó el bundle documental inicial.
* **Update**: Se añadieron OpenAPI, diseño UI, arquitectura, baseline Stitch y skill de navegación.
