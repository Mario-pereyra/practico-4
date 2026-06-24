---
type: Quality
title: Casos borde
description: Escenarios límite que deben considerarse en implementación y QA.
tags:
- qa
- edge-cases
- riesgos
timestamp: '2026-06-22T00:00:00-04:00'
---

# Horarios

* Inicio exactamente igual al fin de otra función.
* Inicio un milisegundo antes del fin.
* Edición que cambia de sala y genera conflicto.
* `startsAt` exactamente igual al reloj del servidor.
* Cambio de duración cuando una función está en curso.

# Asientos

* Lista vacía, repetida o superior a 20.
* Asiento inexistente.
* Asiento de otra sala.
* Doble clic en confirmar.
* Carrera entre dos usuarios.
* Dos reservas multi-asiento con los mismos IDs enviados en orden inverso.

# Dependencias

* Eliminar película o sala con funciones pasadas.
* Cambiar filas/columnas de sala con cualquier función asociada.
* Editar/eliminar función con una reserva histórica.
* Eliminar sala sin funciones y verificar cascada solo de asientos.

# Archivos

* MIME declarado distinto al contenido.
* Extensión inválida.
* Archivo superior a 5 MB.

# Seguridad

* JWT expirado.
* CLIENT en `/admin`.
* Usuario intenta ver reserva ajena.
* ID manipulado en URL.
