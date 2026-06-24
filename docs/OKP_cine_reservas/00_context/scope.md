---
type: Scope
title: Alcance del MVP
description: Separación explícita entre requisitos obligatorios, decisiones del proyecto,
  extensiones y fuera de alcance.
tags:
- alcance
- mvp
- fuera-de-alcance
timestamp: '2026-06-22T00:00:00-04:00'
---

# MVP obligatorio

* Registro, inicio y cierre de sesión de usuarios.
* Cartelera pública.
* Búsqueda por título y filtro por género.
* Detalle de película y funciones disponibles.
* Mapa gráfico de asientos.
* Reserva de uno o varios asientos por usuario autenticado.
* Consulta de reservas propias.
* Gestión administrativa de películas, salas y funciones.
* Prevención de solapamientos en una misma sala.
* Prevención de doble reserva del mismo asiento para una función.

# Decisiones de implementación incluidas

* Administrador creado por seed.
* Asientos persistidos formalmente.
* CRUD administrativo completo con borrado físico condicionado.
* Una sola sede y zona horaria `America/La_Paz`.
* Moneda `BOB`.
* Póster cargado como archivo.

# Extensiones futuras posibles

* Cancelación de reservas.
* Cancelación administrativa de funciones.
* Borrado lógico.
* Varias sedes.
* Revocación de JWT y refresh tokens.
* Notificaciones.

# Fuera de alcance

* Pagos, facturación y reembolsos.
* Entradas QR o tickets digitales.
* Promociones y combos.
* Selección de butacas con precios diferenciados.
* Reportes avanzados.
* Microservicios, CQRS o event sourcing.
