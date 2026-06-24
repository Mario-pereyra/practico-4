---
type: Acceptance Criteria
title: Criterios de aceptación
description: Escenarios verificables que cierran el comportamiento principal y los
  casos límite.
tags:
- aceptacion
- gherkin
- qa
timestamp: '2026-06-22T00:00:00-04:00'
---

# Cartelera

```gherkin
Dado que no inicié sesión
Cuando abro la cartelera
Entonces veo las películas y puedo buscar por título o filtrar por género
```

# Funciones adyacentes y superpuestas

```gherkin
Dado una función en Sala 1 de 18:00 a 20:00
Cuando creo otra función en Sala 1 a las 20:00
Entonces la nueva función es válida
```

```gherkin
Dado una función en Sala 1 de 18:00 a 20:00
Cuando intento crear otra función en Sala 1 a las 19:59
Entonces el sistema responde 409 con SHOWTIME_OVERLAP
```

# Duración de película

```gherkin
Dado una película con una función futura
Cuando intento cambiar su duración
Entonces el sistema responde 409 con MOVIE_DURATION_LOCKED
```

# Edición de función

```gherkin
Dado una función futura sin reservas
Cuando el administrador la modifica con un horario no superpuesto
Entonces se recalcula endsAt y se guarda
```

```gherkin
Dado una función con al menos una reserva
Cuando el administrador intenta editarla o eliminarla
Entonces el sistema responde 409
```

# Reserva

```gherkin
Dado un usuario autenticado y una función futura
Cuando confirma entre 1 y 20 asientos libres de su sala
Entonces se crea una reserva con total y precios históricos
```

```gherkin
Dado dos usuarios que confirman simultáneamente el mismo asiento
Cuando ambas transacciones llegan al backend
Entonces una reserva se crea y la otra responde 409 SEAT_ALREADY_RESERVED
```

# Seguridad

```gherkin
Dado un CLIENT autenticado
Cuando accede a una ruta /admin
Entonces recibe 403
```

```gherkin
Dado una reserva de otro usuario
Cuando intento obtenerla por ID
Entonces recibo 404
```
