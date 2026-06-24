---
type: Glossary
title: Glosario
description: Definiciones comunes usadas en requisitos, API, dominio y UI.
tags:
- glosario
- dominio
timestamp: '2026-06-22T00:00:00-04:00'
---

# Términos

| Término | Definición |
|---|---|
| Cartelera | Conjunto de películas publicadas con funciones futuras. |
| Película (`Movie`) | Obra con título, sinopsis, género, duración, clasificación y póster. |
| Sala (`Room`) | Espacio físico definido por filas, columnas y asientos. |
| Asiento (`Seat`) | Ubicación estable de una sala, identificada por `rowLabel`, `columnNumber` y `code`. |
| Función (`Showtime`) | Proyección de una película en una sala durante `[startsAt, endsAt)`. |
| Reserva (`Reservation`) | Confirmación inmutable de uno o varios asientos para una función. |
| Visitante | Persona sin sesión; puede consultar cartelera. |
| CLIENT | Usuario registrado; puede reservar y consultar sus reservas. |
| ADMIN | Usuario creado por seed; administra y también puede reservar como usuario autenticado. |
| Solapamiento | Intersección temporal entre dos funciones de la misma sala. |
| BOB | Código ISO de la moneda boliviano. |
| Hora local del cine | Zona `America/La_Paz` usada para mostrar horarios. |
