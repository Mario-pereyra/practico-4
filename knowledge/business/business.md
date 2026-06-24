---
type: business
status: consolidated
---

# Business

## Problem

En la gestión de cines tradicionales, la falta de una plataforma integrada genera inconsistencias críticas en tres áreas clave:
1. **Administración de Cartelera y Programación:** Es difícil mantener sincronizadas y actualizadas las funciones y películas disponibles para el público.
2. **Superposición de Funciones:** Existe el riesgo de programar funciones que se solapan en la misma sala y horario, afectando la operación del cine.
3. **Inconsistencia en Reservas:** La falta de un sistema atómico permite reservas duplicadas (doble reserva) sobre el mismo asiento para una misma función, dañando la experiencia del cliente.

## Users

### Visitante (Público)
* **Objetivos:** Consultar la cartelera de películas, buscar por título, filtrar por género, ver detalles de las películas y revisar las funciones futuras sin necesidad de estar registrado.
* **Acciones:** Registrarse como cliente (`CLIENT`) o iniciar sesión.

### Cliente (`CLIENT`)
* **Objetivos:** Seleccionar asientos para funciones futuras, realizar reservas atómicas de forma segura y ver su historial de reservas propias.
* **Acciones:** Consulta y visualización del mapa de asientos interactivo (`AVAILABLE`/`RESERVED`), creación de reservas y consulta de sus reservas pasadas y futuras.

### Administrador (`ADMIN`)
* **Objetivos:** Gestionar de manera eficiente el catálogo de películas, la distribución física de las salas (generando asientos) y la programación de las funciones.
* **Acciones:** Crear, editar y eliminar películas (cargando pósteres), salas y funciones (con prevención de solapamientos). Creado únicamente por seed.

## Value Proposition

Ofrecer una plataforma de cartelera y reserva de asientos confiable y sin fricciones para una sede de cine, que garantice la integridad de la programación (previniendo solapamientos de funciones) y de las reservas (bloqueando de forma transaccional y atómica la doble reserva de butacas), manteniendo una administración operativa simple e intuitiva.

## Business Rules

* **RB-01 Cartelera pública:** La cartelera solo contiene películas con funciones futuras y el detalle solo muestra funciones futuras. Es accesible sin iniciar sesión.
* **RB-02 Reserva autenticada:** Cualquier usuario con sesión activa (`CLIENT` o `ADMIN`) puede realizar reservas y ver únicamente sus propias reservas.
* **RB-03 Administración restringida:** Solo el rol `ADMIN` tiene permisos para gestionar (crear, editar, eliminar) películas, salas y funciones.
* **RB-04 Registro único:** El registro público crea exclusivamente usuarios con rol `CLIENT`. El `ADMIN` se define únicamente vía base de datos / seed.
* **RB-05 Cambio de duración:** La duración de una película solo se puede editar si no tiene funciones futuras o en curso programadas.
* **RB-06 Distribución de sala:** La capacidad de una sala es `rows × columns`. Si la sala tiene funciones programadas, no se pueden modificar sus dimensiones ni eliminarse.
* **RB-07 Borrado condicionado (físico):** No se permite la eliminación de recursos con dependencias históricas (por ejemplo, películas o salas con funciones asociadas, o funciones con reservas asociadas).
* **RB-10 No solapamiento:** Las funciones programadas en una misma sala no pueden solaparse. Los intervalos son semiabiertos `[startsAt, endsAt)`.
* **RB-11 Función futura:** No es posible crear, reservar, editar o eliminar funciones cuya hora de inicio sea igual o anterior a la hora actual del servidor (`startsAt <= now`).
* **RB-13 Límite de asientos:** Una reserva individual puede contener entre 1 y 20 asientos únicos correspondientes a la sala de la función.
* **RB-14 Unicidad de asiento por función:** Se garantiza la exclusividad a nivel base de datos mediante la restricción de unicidad `UNIQUE(showtime_id, seat_id)`.
* **RB-15 Reserva transaccional:** Las reservas se guardan dentro de una transacción base de datos. Si hay conflicto por carrera de solicitudes, se rechaza con código `409 SEAT_ALREADY_RESERVED`.
* **RB-16 Reservas inmutables:** No se admite la cancelación ni edición de reservas realizadas.

## Constraints

* **Moneda:** Boliviano (`BOB`), importes mayores a cero y con dos decimales (`numeric(10,2)`).
* **Ubicación y Zona Horaria:** Sede única ubicada en Bolivia. La zona horaria de presentación es `America/La_Paz`, y el almacenamiento interno es UTC (`timestamptz`).
* **Límites de Capacidad:** Las salas pueden tener de 1 a 26 filas (A-Z) y de 1 a 50 columnas (1-50).
* **Límite de Reservas:** Entre 1 y 20 asientos por reserva.
* **Tamaño del póster:** Archivos JPEG, PNG o WebP de hasta 5 MB.

## Assumptions

* **Administrador semilla:** El sistema cuenta con un único administrador pre-creado por seed y no requiere interfaz de registro administrativo.
* **Reloj del servidor:** El servidor de backend es la única fuente de verdad para validar las reglas y políticas temporales.
* **Preservación histórica:** Las reservas y detalles de asientos congelan la tarifa unitaria e histórico en el momento de la confirmación, pero la visualización descriptiva de películas y salas lee sus entidades vigentes (las cuales no deben ser reutilizadas para otros fines).

## Open Questions

_(Ninguna)_

## Quality checklist

- [x] The problem is stated without assuming the solution.
- [x] Users have goals, not just labels.
