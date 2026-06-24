---
type: Product Requirements Document
title: PRD — Cine Reservas
version: 1.0.0
status: Aprobado para implementación
date: 2026-06-22
presentationDate: 2026-06-25
language: es
product: Cine Reservas
---

# Documento de Requisitos de Producto (PRD)

## Cine Reservas — Sistema de Gestión de Cartelera y Reserva de Asientos

**Versión:** 1.0.0  
**Estado:** Aprobado para implementación  
**Fecha del documento:** 22 de junio de 2026  
**Fecha de presentación del práctico:** 25 de junio de 2026  
**Contexto:** Práctico universitario 4  
**Producto:** Aplicación web de cartelera, reservas y administración de cine

---

# Control del documento

| Campo | Valor |
|---|---|
| Propósito | Consolidar en un único documento los requisitos de producto, reglas de negocio, alcance, experiencia, criterios de aceptación y condiciones de entrega del MVP. |
| Audiencia | Equipo de desarrollo, docente/evaluador, responsables de QA y agentes de codificación. |
| Estado | Aprobado para implementación. No existen preguntas bloqueantes. |
| Fuente primaria | `docs/Practico_4_original.pdf`. |
| Decisiones complementarias | `docs/OKP_cine_reservas/00_context/decisions.md`. |
| Contrato HTTP normativo | `docs/openapi.yaml`. |
| Sistema visual | `docs/DESIGN.md`. |
| Modelo y reglas detalladas | `docs/OKP_cine_reservas/`. |

## Historial de versiones

| Versión | Fecha | Estado | Descripción |
|---|---|---|---|
| 1.0.0 | 2026-06-22 | Aprobado | Primera versión integral. Incorpora el enunciado original y todas las decisiones cerradas del MVP. |

## Jerarquía de autoridad

Cuando dos documentos parezcan divergir, se aplica el siguiente orden:

1. El enunciado original define lo exigido por el docente.
2. Las decisiones cerradas aclaran ambigüedades sin ampliar innecesariamente el práctico.
3. Este PRD consolida el comportamiento esperado del producto.
4. OpenAPI es normativo para rutas, solicitudes y respuestas HTTP.
5. El modelo de datos es normativo para persistencia e integridad.
6. Las especificaciones de vista son normativas para comportamiento de interfaz.
7. El baseline Stitch es únicamente una referencia visual.

Todo cambio de producto debe revisar, como mínimo, este PRD, OpenAPI, modelo de datos, vistas afectadas, pruebas y matriz de trazabilidad.

---

# 1. Resumen ejecutivo

Cine Reservas es una aplicación web académica para una sede de cine. Permite que cualquier visitante consulte la cartelera, busque y filtre películas, revise su detalle y conozca las funciones futuras. Después de autenticarse, un usuario puede abrir el mapa de asientos de una función, seleccionar uno o varios asientos disponibles, confirmar una reserva y consultar su historial.

Un administrador creado mediante datos semilla gestiona películas, salas y funciones desde un panel protegido. El sistema debe preservar dos invariantes críticas: no aceptar funciones superpuestas en la misma sala y no asignar el mismo asiento dos veces para una misma función.

La solución prioriza simplicidad, integridad y facilidad de defensa académica. El MVP no incluye pagos, cancelaciones, varias sucursales, notificaciones, tickets QR ni arquitectura distribuida.

## 1.1 Problema

Sin una aplicación centralizada, la cartelera, la programación de salas y la disponibilidad de asientos pueden administrarse de manera inconsistente. Esto genera dificultades para:

- publicar información actualizada de películas y funciones;
- permitir que el público encuentre rápidamente una película;
- visualizar qué asientos siguen disponibles;
- evitar asignaciones duplicadas bajo solicitudes simultáneas;
- impedir que una sala tenga funciones incompatibles en el mismo horario;
- mantener una separación clara entre acciones públicas, autenticadas y administrativas.

## 1.2 Solución propuesta

Una aplicación full stack con:

- frontend React + Vite + TypeScript;
- backend NestJS + TypeScript;
- API REST documentada con OpenAPI;
- PostgreSQL mediante TypeORM;
- autenticación JWT y roles `CLIENT` y `ADMIN`;
- almacenamiento local de pósteres para el práctico;
- reglas de negocio aplicadas por el backend y reforzadas por restricciones de base de datos.

## 1.3 Resultado del MVP

Al finalizar, debe poder demostrarse de punta a punta el siguiente flujo:

```text
ADMIN crea película, sala y función
→ visitante consulta la cartelera
→ visitante se registra o inicia sesión
→ usuario selecciona función y asientos
→ sistema confirma la reserva de forma atómica
→ usuario consulta su reserva
→ un segundo intento sobre el mismo asiento recibe conflicto 409
```

---

# 2. Visión, objetivos y principios

## 2.1 Visión del producto

Ofrecer una experiencia clara y confiable para descubrir películas y reservar asientos, junto con una administración simple de la programación del cine, manteniendo un alcance proporcional a un práctico universitario.

## 2.2 Objetivos de producto

| ID | Objetivo |
|---|---|
| OBJ-01 | Permitir acceso público y sencillo a la cartelera y al detalle de películas. |
| OBJ-02 | Permitir que usuarios autenticados completen una reserva de uno o varios asientos. |
| OBJ-03 | Garantizar que un asiento no pueda asignarse dos veces para una misma función. |
| OBJ-04 | Permitir que un administrador gestione películas, salas y funciones. |
| OBJ-05 | Garantizar que una sala no tenga funciones superpuestas. |
| OBJ-06 | Mantener reglas, API, persistencia, interfaz y pruebas coherentes y trazables. |
| OBJ-07 | Producir una solución técnicamente defendible sin sobreingeniería. |

## 2.3 Principios de producto

1. **Integridad antes que conveniencia.** Una operación que comprometa horarios, reservas o historial se rechaza de forma explícita.
2. **Backend como autoridad.** Las restricciones críticas se validan en el servidor, aunque la interfaz también oriente al usuario.
3. **Claridad antes que ornamentación.** La UI debe explicar acciones, estados y errores sin patrones innecesarios.
4. **Un único significado por entidad.** Una película o sala puede corregirse, pero no reutilizarse para representar un recurso diferente.
5. **Historial mínimo pero consistente.** Horarios y precios se conservan como hechos históricos; no se agrega versionado completo de entidades.
6. **Alcance académico controlado.** Se evita introducir pagos, sucursales, notificaciones o infraestructura empresarial no requerida.

## 2.4 Criterios de éxito

El MVP se considera exitoso cuando:

- todos los requisitos obligatorios del enunciado pueden demostrarse;
- una carrera de dos reservas sobre el mismo asiento produce exactamente una confirmación y un `409 SEAT_ALREADY_RESERVED`;
- ninguna función superpuesta puede guardarse por las rutas administrativas;
- todas las rutas administrativas rechazan a un `CLIENT` con 403;
- una reserva ajena no puede consultarse y responde 404;
- las operaciones temporales usan el reloj del servidor y la zona del cine se muestra correctamente;
- OpenAPI, documentación y comportamiento implementado permanecen sincronizados;
- no aparecen funcionalidades declaradas fuera de alcance.

No se requiere un sistema de analítica de producto para el práctico; el éxito se mide por criterios funcionales, técnicos y de calidad verificables.

---

# 3. Contexto académico y partes interesadas

## 3.1 Contexto

El producto corresponde al Práctico 4, cuya presentación está prevista para el 25 de junio de 2026. El enunciado se refiere a una cadena de cines; para controlar el alcance, el MVP representa una sola sede. La solución puede desplegarse de manera independiente por sede, pero no incorpora una entidad de sucursal ni administración multi-sede.

## 3.2 Partes interesadas

| Parte interesada | Necesidad principal | Participación |
|---|---|---|
| Docente/evaluador | Ver que el práctico cumple el enunciado y que las decisiones son coherentes. | Valida alcance, demo y defensa técnica. |
| Equipo de desarrollo | Contar con requisitos inequívocos y verificables. | Diseña, implementa, prueba y documenta. |
| Visitante | Consultar películas y funciones sin registrarse. | Usa la experiencia pública. |
| Usuario autenticado | Reservar asientos y revisar sus reservas. | Usa los flujos protegidos. |
| Administrador | Gestionar el catálogo y la programación. | Opera el panel administrativo. |

## 3.3 Actores

### Visitante

Puede consultar la cartelera y el detalle de película, buscar, filtrar, registrarse e iniciar sesión.

### Usuario autenticado `CLIENT`

Hereda las capacidades públicas y además puede consultar mapas de asientos, confirmar reservas y consultar únicamente las reservas propias.

### Administrador `ADMIN`

Se crea mediante seed. Tiene las capacidades de cualquier usuario autenticado y, adicionalmente, puede gestionar películas, salas y funciones. No puede consultar reservas ajenas en el MVP.

## 3.4 Matriz de permisos

| Capacidad | Visitante | CLIENT | ADMIN |
|---|---:|---:|---:|
| Ver cartelera y detalle | Sí | Sí | Sí |
| Registrarse como cliente | Sí | No aplica | No aplica |
| Iniciar sesión | Sí | Sí | Sí |
| Cerrar sesión localmente | No aplica | Sí | Sí |
| Ver mapa de asientos | No | Sí | Sí |
| Confirmar reserva | No | Sí | Sí |
| Ver reservas propias | No | Sí | Sí |
| Gestionar películas | No | No | Sí |
| Gestionar salas | No | No | Sí |
| Gestionar funciones | No | No | Sí |
| Ver reservas ajenas | No | No | No |

---

# 4. Alcance

## 4.1 Incluido en el MVP

- Registro de usuarios `CLIENT`.
- Inicio de sesión para `CLIENT` y `ADMIN`.
- Cierre de sesión local mediante eliminación del JWT.
- Cartelera pública paginada.
- Búsqueda parcial por título.
- Filtro por género. La API puede aceptar clasificación como refinamiento opcional, sin exigir un control adicional en la UI del MVP.
- Detalle de película con funciones futuras.
- Mapa gráfico de asientos para usuarios autenticados.
- Selección de 1 a 20 asientos.
- Confirmación atómica de reservas.
- Listado y detalle de reservas propias.
- CRUD administrativo de películas.
- Carga de póster como archivo.
- CRUD administrativo de salas.
- Generación automática de asientos por filas y columnas.
- Consulta administrativa del mapa de una sala.
- CRUD administrativo de funciones.
- Cálculo y persistencia de `endsAt`.
- Validación de función futura.
- Validación de no solapamiento.
- Restricciones de edición y eliminación según dependencias.
- Manejo común de errores.
- Estados de UI, responsive y accesibilidad mínima.
- Migraciones, seed, pruebas y documentación.

## 4.2 Fuera de alcance

- Pagos, pasarelas, facturación o reembolsos.
- Cancelación de reservas.
- Cancelación administrativa de funciones.
- Entradas QR o tickets digitales.
- Varias sedes o sucursales.
- Selección de tipos de butaca o precios diferenciados.
- Promociones, descuentos o combos.
- Notificaciones por correo, SMS o push.
- Recuperación de contraseña.
- Refresh tokens o revocación de JWT.
- Reportes avanzados y analítica de negocio.
- Registro de administradores desde la UI.
- Tiempo de limpieza entre funciones.
- Microservicios, CQRS, event sourcing o arquitectura distribuida.
- Redux, Zustand o TanStack Query.

## 4.3 Extensiones futuras posibles

Las siguientes ideas pueden evaluarse después del MVP, sin condicionar esta entrega:

- cancelación de reservas con historial y política asociada;
- cancelación administrativa de funciones;
- borrado lógico;
- varias sedes;
- revocación y renovación de tokens;
- notificaciones;
- pagos y emisión de entradas.

---

# 5. Supuestos y restricciones

## 5.1 Supuestos

- Existe una sola sede de cine.
- Existe un único administrador operativo.
- El administrador se crea mediante seed y usa la misma pantalla de login que un cliente.
- El registro público siempre crea rol `CLIENT`.
- El reloj del servidor es la autoridad para todas las decisiones temporales.
- La zona de presentación del cine es `America/La_Paz`.
- La base de datos almacena instantes en UTC con `timestamptz`.
- La moneda única es boliviano, código `BOB`.
- La UI está en español; API, código y base de datos usan inglés técnico.
- El póster se guarda en almacenamiento local del backend para la demo académica.
- La duración vigente de la película se usa al crear o editar una función.
- Las funciones pasadas conservan el `endsAt` persistido.
- Las reservas congelan horario y dinero, pero consultan la metadata descriptiva vigente de película y sala.

## 5.2 Restricciones técnicas

- Backend: NestJS + TypeScript.
- Frontend: React + Vite + TypeScript.
- Persistencia: PostgreSQL + TypeORM.
- API REST bajo `/api/v1`.
- Autenticación JWT Bearer.
- OpenAPI 3.1 como contrato HTTP.
- Pósteres JPEG, PNG o WebP de hasta 5 MB.
- Listados paginados con página inicial 1 y límite máximo 100.

## 5.3 Restricciones de entrada

| Dato | Regla |
|---|---|
| Nombre de usuario | Obligatorio, máximo 100 caracteres. |
| Email | Obligatorio, formato válido, máximo 254 y único. |
| Contraseña | 8 a 72 caracteres. |
| Título de película | 1 a 160 caracteres. |
| Sinopsis | 1 a 2000 caracteres. |
| Duración | Entero de 1 a 600 minutos. |
| Nombre de sala | 1 a 100 caracteres. |
| Filas de sala | Entero de 1 a 26. |
| Columnas de sala | Entero de 1 a 50. |
| Precio | 0,01 a 99.999.999,99 BOB, máximo dos decimales. |
| Asientos por reserva | 1 a 20 IDs distintos. |
| Póster | JPEG, PNG o WebP, máximo 5 MB. |

---

# 6. Necesidades y recorridos de usuario

## 6.1 Descubrimiento público

```text
Visitante abre /movies
→ revisa cartelera
→ busca por título y/o filtra
→ abre /movies/:movieId
→ revisa sinopsis y funciones futuras
```

Resultado esperado: el usuario conoce qué películas y horarios están disponibles sin iniciar sesión.

## 6.2 Registro e inicio de sesión

```text
Visitante abre /register
→ ingresa nombre, email y contraseña
→ cuenta CLIENT es creada
→ la API devuelve JWT y usuario autenticado
→ el frontend continúa hacia la cartelera o el `returnTo` permitido
```

El administrador no se registra: inicia sesión con las credenciales creadas por seed.

## 6.3 Reserva de asientos

```text
Usuario selecciona una función futura
→ si no tiene sesión, se redirige a /login con returnTo
→ abre /showtimes/:showtimeId/seats
→ revisa mapa y leyenda
→ elige entre 1 y 20 asientos AVAILABLE
→ confirma
→ backend valida y guarda en transacción
→ navega al detalle de reserva
```

Ante `SEAT_ALREADY_RESERVED`, el mapa se recarga y el usuario debe revisar su selección.

## 6.4 Consulta de reservas

```text
Usuario abre /my-reservations
→ ve reservas ordenadas por reservedAt descendente
→ abre /my-reservations/:reservationId
→ revisa película, sala, horario, asientos y total
```

No existe acción de cancelación.

## 6.5 Administración de películas

```text
ADMIN abre /admin/movies
→ crea o edita datos y póster multipart
→ backend valida campos y archivo
→ si cambia duración, valida funciones futuras/en curso
→ si elimina, valida ausencia total de funciones
```

## 6.6 Administración de salas

```text
ADMIN abre /admin/rooms
→ crea sala con nombre, filas y columnas
→ backend calcula capacidad y genera asientos en transacción
→ ADMIN puede revisar la grilla de asientos
```

Si la sala tiene funciones, puede corregirse su nombre, pero no filas ni columnas; tampoco puede eliminarse.

## 6.7 Administración de funciones

```text
ADMIN selecciona película, sala, inicio y precio
→ backend calcula endsAt
→ verifica que startsAt sea futuro
→ verifica no solapamiento en la sala
→ guarda función
```

Una función solo puede editarse o eliminarse cuando es futura y no tiene reservas.

---

# 7. Arquitectura de información y pantallas

## 7.1 Rutas del frontend

| Ruta | Pantalla | Acceso |
|---|---|---|
| `/movies` | Cartelera pública | Público |
| `/movies/:movieId` | Detalle de película | Público |
| `/login` | Inicio de sesión | Público |
| `/register` | Registro de cliente | Público |
| `/showtimes/:showtimeId/seats` | Selección de asientos | Autenticado |
| `/my-reservations` | Mis reservas | Autenticado |
| `/my-reservations/:reservationId` | Detalle de reserva | Propietario |
| `/admin` | Inicio administrativo simple | ADMIN |
| `/admin/movies` | Listado de películas | ADMIN |
| `/admin/movies/new` | Crear película | ADMIN |
| `/admin/movies/:movieId/edit` | Editar película | ADMIN |
| `/admin/rooms` | Listado de salas | ADMIN |
| `/admin/rooms/new` | Crear sala | ADMIN |
| `/admin/rooms/:roomId` | Detalle y asientos de sala | ADMIN |
| `/admin/rooms/:roomId/edit` | Editar sala | ADMIN |
| `/admin/showtimes` | Listado de funciones | ADMIN |
| `/admin/showtimes/new` | Crear función | ADMIN |
| `/admin/showtimes/:showtimeId/edit` | Editar función | ADMIN |
| `*` | Error 404 | Público/mixto |

## 7.2 Navegación global

El área pública muestra:

- Cartelera;
- Mis reservas, cuando existe sesión;
- Login y Registro, cuando no existe sesión;
- identidad del usuario y Cerrar sesión, cuando existe sesión;
- acceso a Administración cuando el usuario es `ADMIN`.

El área administrativa muestra:

- inicio administrativo;
- Películas;
- Salas;
- Funciones;
- volver a Cartelera;
- cerrar sesión.

## 7.3 Redirecciones

- Una ruta autenticada sin JWT redirige a `/login` y conserva un `returnTo` interno.
- Tras login con `returnTo`, cualquier usuario autenticado vuelve a la ruta solicitada si está autorizada.
- Sin `returnTo`, `CLIENT` navega a `/movies` y `ADMIN` a `/admin`.
- Un 401 recibido por token inválido o expirado limpia la sesión local.
- Un 403 muestra acceso restringido; no se presenta como 404 de página.

---

# 8. Requisitos funcionales

Todos los requisitos de esta sección son prioridad **MUST** para el MVP, salvo que se indique lo contrario.

## 8.1 Autenticación

| ID | Requisito | Criterio de aceptación resumido |
|---|---|---|
| RF-01 | Registrar usuarios `CLIENT`. | Con nombre, email válido y contraseña válida se crea un usuario `CLIENT`; un email existente responde 409. |
| RF-02 | Iniciar sesión con email y contraseña. | Credenciales válidas devuelven JWT y usuario; credenciales inválidas devuelven 401 genérico. |
| RF-03 | Cerrar sesión localmente. | El frontend elimina JWT y estado de autenticación; no llama a un endpoint de revocación. |
| RF-04 | Obtener el usuario autenticado. | `/auth/me` devuelve identidad y rol para un JWT válido y 401 en caso contrario. |
| RF-05 | Permitir login del `ADMIN` creado por seed. | No existe formulario ni endpoint de registro administrativo. |

### Reglas adicionales de autenticación

- Las contraseñas se almacenan únicamente como hash.
- La respuesta de login nunca expone hash ni información sensible.
- El mensaje de credenciales inválidas no indica si el email existe.
- El token se presenta como Bearer en rutas protegidas.

## 8.2 Cartelera y detalle

| ID | Requisito | Criterio de aceptación resumido |
|---|---|---|
| RF-06 | Listar públicamente películas con al menos una función futura. | Un visitante sin sesión recibe una lista paginada; películas sin función futura no aparecen. |
| RF-07 | Buscar parcialmente por título. | La búsqueda recorta espacios y no distingue mayúsculas/minúsculas. |
| RF-08 | Filtrar por género. | El backend acepta el valor exacto del catálogo técnico; el parámetro opcional de clasificación puede soportarse sin ser un control obligatorio de la UI. |
| RF-09 | Mostrar el detalle completo de una película. | Incluye póster, título, duración, género, clasificación, sinopsis y funciones futuras. |

### Orden y paginación

- `page` comienza en 1.
- `limit` predeterminado es 20 y máximo 100.
- Una búsqueda vacía después de `trim` se trata como ausente.
- El frontend muestra estado vacío distinto para “sin cartelera” y “sin resultados de filtros”.

## 8.3 Mapa y reservas

| ID | Requisito | Criterio de aceptación resumido |
|---|---|---|
| RF-10 | Exigir autenticación para abrir el mapa de asientos. | Sin JWT se solicita login; con JWT válido se carga el mapa si la función es futura. |
| RF-11 | Mostrar disponibilidad gráfica por función. | Cada asiento indica `AVAILABLE` o `RESERVED`; los reservados están deshabilitados. |
| RF-12 | Permitir elegir entre 1 y 20 asientos. | No se confirma sin selección, con duplicados ni con más de 20. |
| RF-13 | Confirmar una reserva de forma atómica. | Reserva y detalles se guardan en una transacción o no se guarda nada. |
| RF-14 | Listar reservas propias. | El usuario recibe solo las suyas, paginadas y ordenadas por `reservedAt` descendente. |
| RF-15 | Mostrar el detalle de una reserva propia. | Una reserva ajena o inexistente responde 404. |

### Contenido de una reserva

La confirmación debe conservar:

- usuario propietario;
- función;
- fecha y hora de confirmación;
- asientos;
- precio unitario histórico por asiento;
- total histórico;
- moneda `BOB`.

No se persiste un estado preliminar ni cancelado. Una reserva existe únicamente después de confirmarse.

## 8.4 Administración de películas

| ID | Requisito | Criterio de aceptación resumido |
|---|---|---|
| RF-16 | Listar, crear, consultar, editar y eliminar películas. | Todas las operaciones requieren rol `ADMIN`. |
| RF-17 | Cargar el póster como archivo. | Crear exige archivo; editar permite conservar el actual; se valida tipo y tamaño. |
| RF-18 | Bloquear cambios de duración con funciones futuras o en curso. | Un intento inválido responde 409 `MOVIE_DURATION_LOCKED`. |
| RF-19 | Bloquear eliminación con funciones asociadas. | Cualquier función pasada, presente o futura impide eliminar y produce 409. |

### Campos de película

- título;
- sinopsis;
- género;
- duración en minutos;
- clasificación;
- archivo de póster.

La película no tiene campo `isActive`; el MVP usa borrado físico condicionado.

## 8.5 Administración de salas

| ID | Requisito | Criterio de aceptación resumido |
|---|---|---|
| RF-20 | Listar, crear, consultar, editar y eliminar salas. | Todas las operaciones requieren rol `ADMIN`. |
| RF-21 | Calcular capacidad automáticamente. | `capacity = rows × columns`; no se acepta capacidad enviada por el cliente. |
| RF-22 | Generar asientos automáticamente. | Crear o redimensionar una sala sin funciones genera exactamente `rows × columns` asientos en transacción. |
| RF-23 | Proteger distribución y eliminación cuando existen funciones. | Con cualquier función asociada solo puede cambiarse el nombre; eliminar y redimensionar responden 409. |

### Convención de asientos

- `rowLabel`: `A` a `Z`.
- `columnNumber`: 1 a 50.
- `code`: concatenación, por ejemplo `A1`, `B12`.
- Un asiento pertenece a una única sala.

## 8.6 Administración de funciones

| ID | Requisito | Criterio de aceptación resumido |
|---|---|---|
| RF-24 | Listar, crear, consultar, editar y eliminar funciones. | Todas las operaciones requieren rol `ADMIN`. |
| RF-25 | Calcular y persistir la hora de finalización. | `endsAt = startsAt + durationMinutes` de la película vigente. |
| RF-26 | Impedir funciones pasadas o superpuestas. | Inicio no futuro responde validación; solapamiento responde 409. |
| RF-27 | Bloquear edición/eliminación de funciones protegidas. | Una función iniciada, pasada o con reservas no puede editarse ni eliminarse. |

### Filtros administrativos de funciones

El listado puede filtrar por:

- película;
- sala;
- inicio inclusivo de rango `from`;
- fin exclusivo de rango `to`;
- paginación.

---

# 9. Reglas de negocio

| ID | Regla |
|---|---|
| RB-01 | La cartelera y el detalle son públicos. La cartelera solo contiene películas con función futura y el detalle solo muestra funciones futuras. |
| RB-02 | Cualquier usuario autenticado, `CLIENT` o `ADMIN`, puede reservar y consultar solo sus propias reservas. |
| RB-03 | Solo `ADMIN` puede modificar películas, salas y funciones. |
| RB-04 | El registro público crea únicamente `CLIENT`; el `ADMIN` se crea por seed. |
| RB-05 | La duración de una película solo cambia si no tiene funciones futuras ni en curso. |
| RB-06 | La capacidad de sala es `rows × columns`; con funciones asociadas, filas y columnas quedan bloqueadas. |
| RB-07 | El borrado es físico y condicionado: no se eliminan recursos con dependencias históricas. |
| RB-08 | Toda función referencia una película y una sala existentes. |
| RB-09 | `endsAt` se calcula con la duración de la película y se persiste; no existe limpieza adicional. |
| RB-10 | Dos funciones de una sala no pueden superponerse; se usan intervalos semiabiertos. |
| RB-11 | Cuando `startsAt <= now`, la función no puede crearse, reservarse, editarse ni eliminarse. |
| RB-12 | Una función solo puede editarse si es futura y no tiene reservas. |
| RB-13 | Una reserva contiene entre 1 y 20 `seatIds` únicos de la sala de la función. |
| RB-14 | Existe unicidad de asiento por función: `UNIQUE(showtime_id, seat_id)`. |
| RB-15 | La reserva se procesa de forma transaccional; una carrera perdida responde 409. |
| RB-16 | Las reservas son inmutables y no cancelables en el MVP. |
| RB-17 | La API usa ISO 8601; DB usa UTC/`timestamptz`; UI muestra `America/La_Paz`. |
| RB-18 | Todos los importes usan `BOB`, son mayores a cero y tienen dos decimales. |
| RB-19 | La búsqueda es parcial, recorta espacios y no distingue mayúsculas; género es exacto. |

## 9.1 Regla de solapamiento

Para una función nueva o editada existe solapamiento cuando:

```text
newStart < existingEnd
AND
newEnd > existingStart
```

Los intervalos son `[startsAt, endsAt)`. Por lo tanto:

```text
18:00–20:00 y 20:00–22:00 → permitido
18:00–20:00 y 19:59–22:00 → rechazado
```

En una edición se excluye la propia función de la búsqueda de conflictos.

## 9.2 Política temporal

```text
startsAt <= reloj_del_servidor
→ función no creable, no reservable, no editable y no eliminable
```

La interfaz puede anticipar el bloqueo, pero el backend vuelve a evaluarlo en cada operación.

## 9.3 Política de duración

- Con funciones futuras o en curso: la duración no puede modificarse.
- Con solo funciones pasadas: la duración puede corregirse.
- Las funciones pasadas no se recalculan porque conservan su `endsAt`.
- Las funciones nuevas usan la duración vigente.

## 9.4 Política de dependencias y borrado

| Recurso | Puede eliminarse cuando | Comportamiento si está bloqueado |
|---|---|---|
| Película | No tiene ninguna función. | 409 `MOVIE_HAS_SHOWTIMES`. |
| Sala | No tiene ninguna función. | 409 `ROOM_HAS_SHOWTIMES`. |
| Función | Es futura y no tiene reservas. | 409 `SHOWTIME_NOT_DELETABLE`. |
| Asientos | Solo mediante eliminación de una sala sin funciones. | Cascada controlada desde sala. |
| Reserva | No se elimina desde el producto. | Sin endpoint de borrado/cancelación. |

---

# 10. Modelo de dominio y datos

## 10.1 Entidades

| Entidad | Atributos principales | Invariantes |
|---|---|---|
| `User` | id, name, email, passwordHash, role, createdAt | Email único; rol `CLIENT` o `ADMIN`. |
| `Movie` | id, title, synopsis, genre, durationMinutes, rating, posterUrl | Duración 1–600; póster obligatorio; sin `isActive`. |
| `Room` | id, name, rows, columns, capacity | Capacidad calculada; distribución bloqueada con funciones. |
| `Seat` | id, roomId, rowLabel, columnNumber, code | Único dentro de la sala por fila/columna y por código. |
| `Showtime` | id, movieId, roomId, startsAt, endsAt, price | Película/sala válidas; futura al crear; sin solapamiento. |
| `Reservation` | id, userId, showtimeId, reservedAt, total | Inmutable; total histórico positivo. |
| `ReservationSeat` | id, reservationId, showtimeId, seatId, unitPrice | Único por función/asiento; precio histórico positivo. |

## 10.2 Relaciones

```text
Movie 1 ── * Showtime
Room 1 ── * Seat
Room 1 ── * Showtime
User 1 ── * Reservation
Showtime 1 ── * Reservation
Reservation 1 ── * ReservationSeat
Seat 1 ── * ReservationSeat
```

## 10.3 Datos históricos

Se congelan:

- `Showtime.startsAt`;
- `Showtime.endsAt`;
- `Reservation.reservedAt`;
- `Reservation.total`;
- `ReservationSeat.unitPrice`.

Título de película y nombre de sala se leen de las entidades actuales. Por ello, las ediciones deben ser correcciones de metadata y no reutilizaciones de una entidad para representar otra película o sala.

## 10.4 Integridad física mínima

- `UNIQUE(users.email)`.
- `UNIQUE(seats.room_id, row_label, column_number)`.
- `UNIQUE(seats.room_id, code)`.
- `UNIQUE(reservation_seats.showtime_id, seat_id)`.
- `UNIQUE(reservation_seats.reservation_id, seat_id)`.
- claves foráneas con `RESTRICT` sobre películas, salas, funciones y reservas históricas;
- `ON DELETE CASCADE` únicamente de sala a asientos y de reserva a sus detalles, aunque el producto no expone eliminación de reservas;
- checks para duración, dimensiones, capacidad, precio, total e intervalo temporal.

## 10.5 Mapa de asientos

Estados devueltos por el backend:

| Estado | Significado | Interacción |
|---|---|---|
| `AVAILABLE` | No existe asignación para esa función. | Puede seleccionarse o deseleccionarse. |
| `RESERVED` | Existe `ReservationSeat` para esa función y asiento. | Se muestra deshabilitado. |

`SELECTED` es un estado exclusivo del frontend y no se persiste antes de confirmar.

---

# 11. API y contrato de integración

## 11.1 Convenciones

- Base: `/api/v1`.
- Respuestas JSON, salvo cuerpos multipart de película.
- Autenticación `Authorization: Bearer <token>`.
- Fechas ISO 8601 con desplazamiento.
- Moneda `BOB` en respuestas económicas.
- Errores con forma común `ErrorResponse`.
- OpenAPI en `docs/openapi.yaml` es el contrato normativo.

## 11.2 Catálogo de endpoints

| Método | Ruta | Propósito | Acceso |
|---|---|---|---|
| POST | `/auth/register` | Registrar cliente. | Público |
| POST | `/auth/login` | Iniciar sesión. | Público |
| GET | `/auth/me` | Obtener usuario autenticado. | Autenticado |
| GET | `/movies` | Listar cartelera pública. | Público |
| GET | `/movies/{movieId}` | Obtener detalle público. | Público |
| GET | `/showtimes/{showtimeId}/seats` | Obtener mapa de asientos. | Autenticado |
| POST | `/reservations` | Confirmar reserva. | Autenticado |
| GET | `/reservations/my` | Listar reservas propias. | Autenticado |
| GET | `/reservations/{reservationId}` | Obtener una reserva propia. | Propietario |
| GET | `/admin/movies` | Listar películas para administración. | ADMIN |
| POST | `/admin/movies` | Crear película multipart. | ADMIN |
| GET | `/admin/movies/{movieId}` | Obtener película administrativa. | ADMIN |
| PUT | `/admin/movies/{movieId}` | Actualizar película multipart. | ADMIN |
| DELETE | `/admin/movies/{movieId}` | Eliminar película. | ADMIN |
| GET | `/admin/rooms` | Listar salas. | ADMIN |
| POST | `/admin/rooms` | Crear sala. | ADMIN |
| GET | `/admin/rooms/{roomId}` | Obtener sala. | ADMIN |
| PUT | `/admin/rooms/{roomId}` | Actualizar sala. | ADMIN |
| DELETE | `/admin/rooms/{roomId}` | Eliminar sala. | ADMIN |
| GET | `/admin/rooms/{roomId}/seats` | Listar asientos de sala. | ADMIN |
| GET | `/admin/showtimes` | Listar funciones. | ADMIN |
| POST | `/admin/showtimes` | Crear función. | ADMIN |
| GET | `/admin/showtimes/{showtimeId}` | Obtener función. | ADMIN |
| PUT | `/admin/showtimes/{showtimeId}` | Actualizar función. | ADMIN |
| DELETE | `/admin/showtimes/{showtimeId}` | Eliminar función. | ADMIN |

## 11.3 Rutas deliberadamente inexistentes

- No existe `POST /auth/logout`: el cierre de sesión es local.
- No existe endpoint de cancelación de reserva.
- No existe endpoint separado de funciones públicas por película; el detalle de película ya incluye funciones futuras.
- No existen recursos de sucursales, pagos o tickets.

## 11.4 Formato común de error

```json
{
  "statusCode": 409,
  "code": "SHOWTIME_OVERLAP",
  "message": "La sala ya está ocupada durante el intervalo solicitado.",
  "errors": []
}
```

`errors` es opcional y se usa para validaciones por campo.

---

# 12. Experiencia de usuario y diseño

## 12.1 Principios de UX

- Claridad antes que estética ornamental.
- Una acción principal visible por pantalla o bloque.
- Estados de carga, vacío, error y éxito explícitos.
- Restricciones explicadas en lenguaje de usuario.
- Formularios consistentes con labels visibles.
- El panel administrativo prioriza tablas y formularios simples.
- La UI refleja las reglas del backend, pero nunca las sustituye.

## 12.2 Sistema visual

El producto utiliza:

- barra superior oscura;
- fondo neutro claro;
- superficies blancas;
- acento ámbar oscuro para acciones primarias;
- azul para asientos seleccionados;
- gris para asientos reservados;
- verde para éxito, ámbar para advertencia y rojo para peligro/error.

Los tokens exactos y componentes se definen en `docs/DESIGN.md`.

## 12.3 Estados transversales

Toda vista que consume datos debe contemplar:

```text
loading
empty
error
success/data
```

Los conflictos 409 deben:

- mostrar el mensaje estable de la API;
- conservar información útil del formulario cuando sea seguro;
- ofrecer una acción correctiva, por ejemplo recargar asientos o revisar horario.

## 12.4 Formularios

- Labels siempre visibles.
- Validaciones debajo del campo correspondiente.
- Error general del backend en una alerta superior.
- Botón de envío deshabilitado durante la solicitud.
- Create y edit reutilizan estructura.
- Las eliminaciones requieren confirmación.
- El formulario de película usa `multipart/form-data`.
- Capacidad y `endsAt` se muestran como valores calculados, no editables.

## 12.5 Mapa de asientos

- Disponible: botón habilitado con borde visible.
- Seleccionado: botón con estado visual y `aria-pressed=true`.
- Reservado: botón deshabilitado.
- Leyenda siempre visible.
- Código de asiento visible.
- Contador y total actualizados localmente.
- Confirmar deshabilitado con cero asientos o durante envío.
- Ante conflicto, refrescar disponibilidad.

## 12.6 Responsive

- Mobile: cartelera en una columna y filtros apilados.
- Tablet: dos columnas de películas.
- Desktop: tres o cuatro columnas.
- Tablas administrativas pueden usar scroll horizontal o adaptación a cards.
- El mapa permite scroll horizontal cuando la sala es ancha.

## 12.7 Accesibilidad

- Contraste suficiente para texto y controles.
- Navegación de formularios por teclado.
- Asientos como botones accesibles.
- No depender exclusivamente del color.
- Errores asociados mediante `aria-describedby`.
- Controles sin texto visible deben tener `aria-label`.
- Los reservados deben usar `disabled`.

---

# 13. Requisitos no funcionales

## 13.1 Seguridad

| ID | Requisito |
|---|---|
| RNF-SEC-01 | Contraseñas hasheadas con una función adecuada; nunca en texto plano ni logs. |
| RNF-SEC-02 | JWT Bearer obligatorio para rutas autenticadas. |
| RNF-SEC-03 | Roles y propiedad se validan en backend. |
| RNF-SEC-04 | Una reserva ajena responde 404 para no revelar su existencia. |
| RNF-SEC-05 | El backend valida MIME, extensión y tamaño de archivos. |
| RNF-SEC-06 | No exponer stack traces ni datos sensibles al frontend. |
| RNF-SEC-07 | Configurar CORS únicamente para los orígenes de desarrollo/entrega requeridos. |

## 13.2 Integridad y confiabilidad

| ID | Requisito |
|---|---|
| RNF-INT-01 | Migraciones reproducibles y claves foráneas explícitas. |
| RNF-INT-02 | Reserva en una única transacción. |
| RNF-INT-03 | Restricción única de función/asiento como garantía final. |
| RNF-INT-04 | Creación o regeneración de asientos en transacción. |
| RNF-INT-05 | No usar cascadas que destruyan funciones o historial. |
| RNF-INT-06 | Traducir errores de integridad a códigos de negocio estables. |

## 13.3 Rendimiento y capacidad

El MVP no tiene un SLA de producción. Para la demo académica:

- las listas deben paginarse;
- la interfaz debe mostrar un estado de carga inmediatamente;
- las operaciones con el volumen de seed deben completarse sin bloqueos perceptibles;
- los pósteres no deben superar 5 MB;
- no se cargará el catálogo completo cuando exista paginación;
- el mapa de asientos admite como máximo 26 × 50 = 1300 asientos por sala.

## 13.4 Usabilidad

- Textos visibles en español.
- Fechas localizadas a `America/La_Paz`.
- Precios en formato `Bs. 0,00`.
- Mensajes accionables y no técnicos.
- Diseño consistente entre listados y formularios.
- Flujos críticos sin pasos innecesarios.

## 13.5 Mantenibilidad

- Monolito modular y responsabilidades claras.
- Reglas críticas en servicios backend.
- DTOs para forma y límites.
- OpenAPI como contrato único.
- Nombres técnicos en inglés.
- No introducir librerías o patrones fuera del alcance sin una decisión documentada.
- Código y documentación deben poder explicarse en una defensa universitaria.

## 13.6 Compatibilidad

- Aplicación web responsive.
- Compatibilidad objetivo con versiones modernas de Chrome, Edge y Firefox.
- No se requiere soporte para navegadores obsoletos.
- La UI no depende de funcionalidades nativas no disponibles en navegadores modernos comunes.

## 13.7 Observabilidad mínima

- Registrar errores del servidor con contexto técnico suficiente.
- No registrar contraseñas, JWT completos ni archivos binarios.
- Incluir método, ruta y código de resultado en logs de desarrollo.
- Mantener mensajes públicos separados de detalles internos.

## 13.8 Privacidad

El sistema almacena únicamente los datos necesarios para el práctico: nombre, email, hash de contraseña y reservas. No procesa datos de pago. El acceso a reservas está limitado a su propietario.

---

# 14. Autenticación, autorización y sesión

## 14.1 Registro

- Solo crea `CLIENT`.
- Email único.
- No acepta un rol enviado por el cliente.
- No existe endpoint de alta de `ADMIN`.

## 14.2 Login

- Cliente y administrador usan la misma operación.
- Devuelve JWT, tipo de token y usuario.
- Mensaje inválido genérico.

## 14.3 Sesión

- El frontend conserva token y usuario para la sesión.
- `/auth/me` permite restaurar o verificar identidad.
- Ante 401, se elimina la sesión local.
- No existen refresh token ni lista de revocación.

## 14.4 Logout

```text
Usuario pulsa Cerrar sesión
→ frontend elimina JWT
→ limpia AuthContext
→ navega a cartelera o login
```

Un token emitido puede seguir siendo criptográficamente válido hasta expirar, pero deja de estar disponible en el cliente. Esta simplificación es deliberada para el MVP.

## 14.5 Autorización

- Guards JWT protegen rutas autenticadas.
- Guards de rol protegen `/admin/**`.
- Los servicios vuelven a verificar permisos y propiedad.
- Ocultar un botón en React no se considera control de seguridad.

---

# 15. Concurrencia y consistencia

## 15.1 Reservas concurrentes

La protección debe incluir:

1. Validar y normalizar `seatIds`.
2. Rechazar duplicados dentro de la solicitud.
3. Ordenar IDs ascendentemente para inserción estable.
4. Iniciar transacción.
5. Verificar función futura y pertenencia de asientos.
6. Insertar reserva y detalles.
7. Confirmar la transacción.
8. Traducir violación de unicidad a `409 SEAT_ALREADY_RESERVED`.

La consulta previa mejora el mensaje, pero la restricción de base de datos es la garantía definitiva.

## 15.2 Funciones concurrentes

Existe un único administrador operativo. Por ello:

- el servicio consulta solapamientos antes de guardar;
- la edición excluye la propia función;
- la UI deshabilita Guardar durante el envío;
- no se implementan bloqueos pesimistas ni una restricción `EXCLUDE` de PostgreSQL.

Esta decisión deberá reevaluarse si el producto admite varios administradores concurrentes.

---

# 16. Catálogo de errores

| Código | HTTP | Significado/uso |
|---|---:|---|
| `VALIDATION_ERROR` | 400 | Campos, query, formato temporal o archivo inválido. |
| `UNAUTHORIZED` | 401 | JWT ausente, inválido o expirado. |
| `INVALID_CREDENTIALS` | 401 | Login incorrecto. |
| `FORBIDDEN` | 403 | Rol insuficiente. |
| `MOVIE_NOT_FOUND` | 404 | Película inexistente. |
| `ROOM_NOT_FOUND` | 404 | Sala inexistente. |
| `SHOWTIME_NOT_FOUND` | 404 | Función inexistente. |
| `RESERVATION_NOT_FOUND` | 404 | Reserva inexistente o ajena. |
| `EMAIL_ALREADY_EXISTS` | 409 | Email ya registrado. |
| `MOVIE_DURATION_LOCKED` | 409 | Cambio de duración con función futura o en curso. |
| `MOVIE_HAS_SHOWTIMES` | 409 | Eliminación de película con funciones. |
| `ROOM_LAYOUT_LOCKED` | 409 | Cambio de distribución con funciones. |
| `ROOM_HAS_SHOWTIMES` | 409 | Eliminación de sala con funciones. |
| `SHOWTIME_OVERLAP` | 409 | Horario superpuesto en la misma sala. |
| `SHOWTIME_NOT_MODIFIABLE` | 409 | Función iniciada/pasada o con reservas. |
| `SHOWTIME_NOT_DELETABLE` | 409 | Función iniciada/pasada o con reservas. |
| `SHOWTIME_NOT_BOOKABLE` | 409 | Función iniciada o pasada. |
| `SEAT_ALREADY_RESERVED` | 409 | Uno o más asientos ya fueron asignados. |
| `SHOWTIME_OR_SEAT_NOT_FOUND` | 404 | ID de función/asiento inválido. |
| `MOVIE_OR_ROOM_NOT_FOUND` | 404 | Relación administrativa inválida. |

## 16.1 Reglas de presentación

- 400: corregir campos y reintentar.
- 401: limpiar sesión y solicitar login.
- 403: mostrar acceso restringido.
- 404: mostrar recurso no encontrado sin filtrar información.
- 409: explicar el conflicto y mantener contexto útil.
- Nunca mostrar stack trace o SQL al usuario.

---

# 17. Criterios de aceptación

## 17.1 Autenticación

| ID | Escenario | Resultado esperado |
|---|---|---|
| AC-AUTH-01 | Registro válido. | Se crea usuario `CLIENT`; no puede elegirse rol. |
| AC-AUTH-02 | Registro con email existente. | 409 `EMAIL_ALREADY_EXISTS`. |
| AC-AUTH-03 | Login válido de CLIENT. | JWT y usuario `CLIENT`. |
| AC-AUTH-04 | Login válido de ADMIN seed. | JWT y usuario `ADMIN`. |
| AC-AUTH-05 | Login inválido. | 401 `INVALID_CREDENTIALS` con mensaje genérico. |
| AC-AUTH-06 | Logout. | Token y estado local eliminados; ruta protegida vuelve a requerir login. |

## 17.2 Cartelera

| ID | Escenario | Resultado esperado |
|---|---|---|
| AC-MOV-01 | Visitante abre cartelera. | Puede verla sin JWT. |
| AC-MOV-02 | Película sin función futura. | No aparece en cartelera pública. |
| AC-MOV-03 | Búsqueda ` mat ` con título “Matrix”. | Coincidencia encontrada tras recortar y sin distinguir mayúsculas. |
| AC-MOV-04 | Filtro de género. | Solo devuelve el género técnico seleccionado. |
| AC-MOV-05 | Detalle existente. | Muestra todos los campos y solo funciones futuras. |
| AC-MOV-06 | Película inexistente. | 404 `MOVIE_NOT_FOUND`. |

## 17.3 Películas administrativas

| ID | Escenario | Resultado esperado |
|---|---|---|
| AC-ADM-MOV-01 | ADMIN crea película con póster válido. | 201 y URL pública del archivo. |
| AC-ADM-MOV-02 | Póster inválido o mayor a 5 MB. | 400 `VALIDATION_ERROR`. |
| AC-ADM-MOV-03 | CLIENT intenta crear película. | 403 `FORBIDDEN`. |
| AC-ADM-MOV-04 | Cambiar duración con función futura. | 409 `MOVIE_DURATION_LOCKED`. |
| AC-ADM-MOV-05 | Cambiar duración cuando solo hay funciones pasadas. | Se permite; no cambia `endsAt` histórico. |
| AC-ADM-MOV-06 | Eliminar película con cualquier función. | 409 `MOVIE_HAS_SHOWTIMES`. |
| AC-ADM-MOV-07 | Eliminar película sin funciones. | 204 y recurso deja de existir. |

## 17.4 Salas

| ID | Escenario | Resultado esperado |
|---|---|---|
| AC-ROOM-01 | Crear sala 3 × 4. | Capacidad 12 y asientos A1–C4. |
| AC-ROOM-02 | Crear con filas o columnas fuera de límite. | 400 `VALIDATION_ERROR`. |
| AC-ROOM-03 | Renombrar sala con funciones. | Permitido si no cambia distribución. |
| AC-ROOM-04 | Redimensionar sala con funciones. | 409 `ROOM_LAYOUT_LOCKED`. |
| AC-ROOM-05 | Eliminar sala con funciones. | 409 `ROOM_HAS_SHOWTIMES`. |
| AC-ROOM-06 | Eliminar sala sin funciones. | 204 y sus asientos se eliminan en cascada. |

## 17.5 Funciones

| ID | Escenario | Resultado esperado |
|---|---|---|
| AC-SHO-01 | Crear función futura. | `endsAt` calculado y persistido. |
| AC-SHO-02 | Crear con película o sala inexistente. | 404 `MOVIE_OR_ROOM_NOT_FOUND`. |
| AC-SHO-03 | Crear con `startsAt <= now`. | 400 `VALIDATION_ERROR`, sin guardar. |
| AC-SHO-04 | Función 18:00–20:00 y nueva a 20:00. | Permitida. |
| AC-SHO-05 | Función 18:00–20:00 y nueva a 19:59. | 409 `SHOWTIME_OVERLAP`. |
| AC-SHO-06 | Editar función futura sin reservas. | Recalcula fin y vuelve a validar solapamiento. |
| AC-SHO-07 | Editar función con reserva. | 409 `SHOWTIME_NOT_MODIFIABLE`. |
| AC-SHO-08 | Eliminar función futura sin reservas. | 204. |
| AC-SHO-09 | Eliminar función iniciada/pasada o con reservas. | 409 `SHOWTIME_NOT_DELETABLE`. |

## 17.6 Reservas

| ID | Escenario | Resultado esperado |
|---|---|---|
| AC-RES-01 | Usuario sin JWT abre mapa. | 401 y flujo de login. |
| AC-RES-02 | Usuario abre función futura. | Mapa con estados correctos. |
| AC-RES-03 | Lista vacía, repetida o superior a 20. | 400 `VALIDATION_ERROR`. |
| AC-RES-04 | Asiento de otra sala. | Rechazo sin crear reserva. |
| AC-RES-05 | Reserva válida. | 201, total calculado y todos los detalles guardados. |
| AC-RES-06 | Función iniciada antes de confirmar. | 409 `SHOWTIME_NOT_BOOKABLE`. |
| AC-RES-07 | Dos usuarios compiten por el mismo asiento. | Uno recibe 201 y otro 409; no queda reserva parcial. |
| AC-RES-08 | Usuario lista reservas. | Solo recibe las propias, más recientes primero. |
| AC-RES-09 | Usuario consulta reserva ajena. | 404 `RESERVATION_NOT_FOUND`. |
| AC-RES-10 | Reserva confirmada. | No existe acción ni endpoint de cancelación. |

## 17.7 Escenarios Gherkin críticos

```gherkin
Dado una función en Sala 1 de 18:00 a 20:00
Cuando el administrador crea otra función en Sala 1 a las 20:00
Entonces la nueva función es válida
```

```gherkin
Dado una función en Sala 1 de 18:00 a 20:00
Cuando el administrador intenta crear otra función a las 19:59
Entonces el sistema responde 409 con SHOWTIME_OVERLAP
```

```gherkin
Dado dos usuarios que confirman simultáneamente el mismo asiento
Cuando ambas transacciones llegan al backend
Entonces una reserva se crea y la otra responde 409 SEAT_ALREADY_RESERVED
```

```gherkin
Dado una función con al menos una reserva
Cuando el administrador intenta editarla o eliminarla
Entonces el sistema responde 409 y conserva la función y la reserva
```

---

# 18. Estrategia de pruebas

## 18.1 Pruebas unitarias

Deben cubrir al menos:

- cálculo de `endsAt`;
- fórmula de solapamiento, incluidos límites adyacentes;
- validación de duración bloqueada;
- cálculo de capacidad;
- cálculo de total;
- normalización de búsqueda;
- validación de límites de asientos;
- traducción de enums para la UI cuando corresponda.

## 18.2 Pruebas de integración

- autenticación y guards;
- CRUDs con PostgreSQL de prueba;
- restricciones de claves foráneas;
- creación transaccional de sala/asientos;
- reserva transaccional;
- unicidad de función/asiento;
- propiedad de reservas;
- subida y validación de póster.

## 18.3 Pruebas end-to-end/manuales

- flujo completo de demo;
- redirección con `returnTo`;
- estados loading/empty/error;
- responsive básico;
- teclado y etiquetas del mapa;
- 401, 403, 404 y 409;
- doble clic en confirmar y guardar;
- carga de póster real;
- visualización de fecha y moneda.

## 18.4 Prueba de concurrencia obligatoria

Ejecutar dos solicitudes simultáneas con el mismo `showtimeId` y `seatId`. El resultado válido es:

```text
1 × 201 Created
1 × 409 SEAT_ALREADY_RESERVED
0 reservas parciales
1 asignación del asiento en base de datos
```

---

# 19. Plan de implementación y entrega

## Fase 1 — Base

- estructura del repositorio;
- configuración de entorno;
- conexión PostgreSQL;
- migraciones;
- seed de administrador;
- filtro común de errores;
- Swagger/OpenAPI.

## Fase 2 — Autenticación y cartelera

- registro;
- login;
- `/auth/me`;
- logout local;
- catálogo público;
- detalle de película;
- carga administrativa de póster.

## Fase 3 — Salas y funciones

- CRUD de salas;
- generación de asientos;
- CRUD de funciones;
- cálculo de `endsAt`;
- validación temporal y de solapamiento.

## Fase 4 — Reservas

- mapa de asientos;
- creación transaccional;
- restricción única;
- Mis reservas;
- detalle propio.

## Fase 5 — Frontend y QA

- rutas y layouts;
- AuthContext;
- formularios y tablas;
- estados de pantalla;
- responsive y accesibilidad;
- pruebas de límites y concurrencia.

## Fase 6 — Cierre

- sincronizar OpenAPI;
- revisar documentación;
- ejecutar migraciones desde cero;
- ejecutar script de coherencia;
- validar la demo completa;
- preparar credenciales y datos de presentación.

---

# 20. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Doble reserva concurrente | Alto | Transacción y unicidad `(showtime_id, seat_id)`. |
| Solapamiento calculado incorrectamente | Alto | `endsAt` persistido, intervalos semiabiertos y pruebas de límite. |
| Cambio de duración altera programación | Alto | Bloqueo con funciones futuras/en curso. |
| Eliminación rompe historial | Alto | FKs `RESTRICT` y borrado físico condicionado. |
| Zona horaria inconsistente | Medio | UTC en DB, ISO 8601 y presentación `America/La_Paz`. |
| Errores de precisión monetaria | Medio | `numeric(10,2)` y cálculos en backend. |
| Póster implementado como URL manual | Medio | Exigir multipart y almacenamiento local. |
| Reutilización incorrecta de película/sala | Medio | Ediciones solo como correcciones; crear entidad nueva para otro recurso. |
| Baseline visual introduce funciones descartadas | Medio | PRD y OpenAPI prevalecen; no copiar reembolsos/cancelación. |
| Drift entre documentos y código | Medio | OpenAPI canónico, trazabilidad y script de coherencia. |
| Tiempo reducido antes de la presentación | Alto | Implementación incremental y corte estricto del alcance. |

---

# 21. Dependencias

## 21.1 Dependencias técnicas

- Node.js y gestor de paquetes.
- PostgreSQL disponible para desarrollo y demo.
- Sistema de archivos escribible para pósteres.
- Variables de entorno para DB, JWT, puerto y ruta de archivos.
- Navegador moderno.

## 21.2 Datos de seed

Como mínimo:

- un usuario `ADMIN` con credenciales documentadas para la demo;
- géneros y clasificaciones definidos como enums de código;
- opcionalmente películas, salas y funciones de ejemplo para acelerar la presentación.

Las credenciales de demo no deben reutilizarse como práctica de producción.

## 21.3 Integraciones externas

No existen integraciones externas obligatorias. No se conecta con pagos, correo, almacenamiento cloud, servicios de trailers ni sistemas de terceros.

---

# 22. Definition of Done

## 22.1 Funcional

- [ ] Cartelera pública, búsqueda, filtro y detalle operativos.
- [ ] Registro, login, `/auth/me` y logout local operativos.
- [ ] Mapa y reserva múltiple operativos para cualquier usuario autenticado.
- [ ] Mis reservas y detalle propio operativos.
- [ ] CRUD de películas con archivo de póster.
- [ ] CRUD de salas con generación correcta de asientos.
- [ ] CRUD de funciones con fin calculado y no solapamiento.
- [ ] Restricciones de duración, distribución y dependencias aplicadas.
- [ ] No existe cancelación, pago, limpieza ni gestión de sucursales.

## 22.2 Técnico

- [ ] Contraseñas hasheadas y JWT validado.
- [ ] Permisos por rol y propiedad aplicados en backend.
- [ ] PostgreSQL con migraciones, checks, FKs y unicidad.
- [ ] Concurrencia de reserva probada.
- [ ] Fechas UTC/`America/La_Paz` y dinero `numeric(10,2)`/BOB.
- [ ] OpenAPI válido y sincronizado.
- [ ] Errores estables y sin datos sensibles.

## 22.3 UX y calidad

- [ ] Estados loading, empty, error y success/data.
- [ ] Mapa usable con teclado y sin depender solo del color.
- [ ] Formularios con validación visible.
- [ ] Responsive básico validado.
- [ ] Flujos 401, 403, 404 y 409 validados.

## 22.4 Documental

- [ ] Enunciado original conservado.
- [ ] PRD, decisiones, OpenAPI, modelo y pruebas sin contradicciones.
- [ ] Matriz de trazabilidad actualizada.
- [ ] Script de coherencia pasa sin errores.
- [ ] README de ejecución y credenciales de demo actualizado.

---

# 23. Trazabilidad con el enunciado original

| Requisito del práctico | Sección PRD | Endpoint/artefacto principal |
|---|---|---|
| Registro, login y logout | 8.1, 14 | `/auth/register`, `/auth/login`, logout local |
| Cartelera pública | 8.2 | `GET /movies` |
| Buscar por nombre y filtrar género | 8.2, RB-19 | `GET /movies?search=&genre=` |
| Detalle con imagen, título, duración, género, clasificación, sinopsis y funciones | 8.2 | `GET /movies/{movieId}` |
| Imagen cargada como archivo | 8.4, 12.4 | multipart `/admin/movies` |
| Seleccionar función | 6.3 | detalle de película |
| Mapa gráfico de asientos | 8.3, 10.5 | `GET /showtimes/{showtimeId}/seats` |
| Elegir uno o varios asientos | 8.3 | `POST /reservations` |
| Confirmar reserva | 8.3, 15 | `POST /reservations` |
| Ver reservas realizadas | 8.3 | `/reservations/my`, `/reservations/{id}` |
| CRUD de películas | 8.4 | `/admin/movies` |
| Crear sala y definir filas/columnas/capacidad | 8.5 | `/admin/rooms` |
| Gestionar funciones | 8.6 | `/admin/showtimes` |
| Impedir funciones superpuestas | 9.1 | `SHOWTIME_OVERLAP` |
| No reservar asiento dos veces | 15.1 | unicidad función/asiento |
| Solo autenticados reservan | RB-02, 14 | JWT Bearer |
| Solo administradores modifican catálogo | RB-03, 14.5 | rol `ADMIN` |
| Función asociada a película y sala existentes | RB-08 | FKs y validación de servicio |

---

# 24. Catálogos técnicos

## 24.1 Roles

| Valor técnico | Etiqueta visible |
|---|---|
| `CLIENT` | Cliente |
| `ADMIN` | Administrador |

## 24.2 Géneros

| Valor técnico | Etiqueta visible |
|---|---|
| `ACTION` | Acción |
| `COMEDY` | Comedia |
| `DRAMA` | Drama |
| `HORROR` | Terror |
| `SCIENCE_FICTION` | Ciencia ficción |
| `ANIMATION` | Animación |
| `DOCUMENTARY` | Documental |
| `THRILLER` | Suspenso |
| `ROMANCE` | Romance |
| `OTHER` | Otro |

Cada película tiene un único género en el MVP.

## 24.3 Clasificación

| Valor técnico | Etiqueta visible |
|---|---|
| `ALL_AGES` | Todo público |
| `AGE_14` | +14 |
| `R` | R |

## 24.4 Disponibilidad de asiento

| Valor técnico | Etiqueta/estado visible |
|---|---|
| `AVAILABLE` | Disponible |
| `RESERVED` | Reservado |

---

# 25. Preguntas abiertas y decisiones futuras

No existen preguntas bloqueantes para comenzar la implementación.

Las siguientes decisiones solo serán necesarias si se amplía el producto:

- comportamiento de cancelación y posibles reembolsos;
- cancelación administrativa de funciones;
- estrategia de borrado lógico;
- multi-sede;
- revocación/refresh de JWT;
- notificaciones;
- pagos y tickets.

Ninguna de ellas debe implementarse en el MVP actual.

---

# 26. Glosario

| Término | Definición |
|---|---|
| Cartelera | Conjunto de películas con al menos una función futura disponible. |
| Función / Showtime | Proyección de una película en una sala, con inicio, fin y precio. |
| Sala / Room | Espacio físico con filas, columnas y asientos generados. |
| Asiento / Seat | Posición física identificada por fila y columna. |
| Reserva / Reservation | Confirmación inmutable de uno o varios asientos para una función. |
| Reserva atómica | Operación que se guarda completa o se revierte por completo. |
| Solapamiento | Intersección temporal entre dos funciones de la misma sala. |
| Intervalo semiabierto | Intervalo `[inicio, fin)` que permite una función exactamente al terminar otra. |
| JWT | Token usado para autenticar solicitudes protegidas. |
| Seed | Datos iniciales automatizados, incluido el administrador. |
| BOB | Código ISO del boliviano. |
| MVP | Versión mínima obligatoria para la entrega del práctico. |
| PRD | Documento de Requisitos de Producto. |

---

# Aprobación para implementación

Este PRD consolida el comportamiento esperado de Cine Reservas y se considera **aprobado para implementación del MVP**. Cualquier desviación debe registrarse antes de modificar el contrato OpenAPI, el modelo de datos o las reglas de negocio.
