---
type: product
status: consolidated
---

# Product

## Product Brief

Cine Reservas es un sistema de cartelera y reserva de asientos para una única sede de cine. Su objetivo es permitir a los visitantes consultar las películas en cartelera y sus horarios de funciones, posibilitar que los clientes registrados reserven entre 1 y 20 asientos para una función en un mapa interactivo visualizando en tiempo real la disponibilidad (`AVAILABLE`/`RESERVED`), y ofrecer a los administradores un panel para gestionar el catálogo de películas, salas y la programación de funciones de manera segura y sin solapamientos.

## Capabilities

* **Autenticación y Roles:**
  * Registro e inicio de sesión de usuarios con rol `CLIENT`.
  * Inicio de sesión del rol `ADMIN` (creado exclusivamente por seed).
  * Cierre de sesión local borrando el JWT.
* **Descubrimiento y Cartelera:**
  * Visualización de la cartelera pública de películas (exclusivamente aquellas que tengan al menos una función futura programada).
  * Filtro por género y búsqueda parcial por título de la película.
  * Vista de detalle de película con sinopsis, póster, metadatos y listado de funciones futuras.
* **Mapa de Asientos e Historial de Reservas:**
  * Mapa visual interactivo de asientos con indicador de estado por butaca (`AVAILABLE` / `RESERVED`).
  * Selección de 1 a 20 asientos y confirmación de reserva atómica.
  * Historial de reservas realizadas por el usuario y detalle individualizado de cada reserva.
* **Administración (ADMIN):**
  * CRUD de películas con carga de archivos de póster (bloqueo de cambios de duración si tiene funciones en curso/futuras y bloqueo de eliminación si tiene funciones asociadas).
  * CRUD de salas con generación transaccional automática de asientos en base a filas y columnas (bloqueada la redimensión y eliminación si tiene funciones).
  * CRUD de funciones con validación automática de inicio futuro, cálculo de hora final (`endsAt`) en base a la película y control de no solapamiento en sala (bloqueada edición/eliminación si tiene reservas o ya se inició).

## Scope

* Registro de usuarios y login general.
* Cartelera pública y detalle de película con funciones futuras.
* Buscador por título y filtros por género.
* Selección de asientos y reservas transaccionales (atómicas).
* Historial y detalles de reservas propias.
* Panel administrativo exclusivo para CRUDs de películas, salas y funciones.
* Carga multipart de pósteres de películas.
* Autogeneración de asientos al crear salas.
* Control de solapamientos de funciones.
* Restricciones de edición y borrado condicionado de entidades.

## Out of Scope

* Pagos, pasarelas de pago, facturación y reembolsos.
* Cancelación de reservas por parte de usuarios.
* Cancelación manual/administrativa de funciones.
* Tickets digitales o códigos QR de entrada.
* Gestión de sucursales o multi-sede.
* Selección de tipos de butacas o precios diferenciados.
* Promociones, combos de comida o descuentos.
* Notificaciones (por correo, SMS o notificaciones push).
* Mecanismos de recuperación de contraseñas.
* Gestión de Refresh Tokens o revocación de tokens JWT en el backend.

## Success Criteria

* Demostración exitosa de extremo a extremo: creación de datos por `ADMIN` -> navegación y búsqueda pública -> registro e inicio de sesión de cliente -> reserva atómica exitosa -> consulta del historial.
* Ante solicitudes simultáneas sobre el mismo asiento para la misma función, se otorga a una única petición y la otra recibe un error `409 SEAT_ALREADY_RESERVED`.
* Cualquier intento de guardar funciones superpuestas en una misma sala es bloqueado por el backend con un error `409`.
* Las rutas protegidas de administración bloquean solicitudes de usuarios con rol `CLIENT` devolviendo código `403`.
* Intentos de consulta sobre reservas ajenas o inexistentes devuelven error `404`.
* Todos los tiempos se calculan basados en el reloj del servidor y se muestran adaptados a la zona horaria del cine (`America/La_Paz`).
* Los precios se procesan y devuelven en moneda boliviana (`BOB`) con dos decimales.

## Assumptions

* Existe una sola sede y un único administrador operativo (semilla).
* El registro de usuarios por la interfaz es únicamente para el rol `CLIENT`.
* El reloj del servidor de backend tiene la hora correcta y actúa como autoridad de tiempo.
* Las reservas son históricas y congelan el precio e intervalo, pero muestran los metadatos descriptivos actuales de película y sala.

## Open Questions

_(Ninguna)_

## Quality checklist

- [x] The product fits in one page.
- [x] Scope and out-of-scope are explicit.
