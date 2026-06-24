---
type: UI Guidance
version: beta
name: Cine Reservas
description: Sistema visual sobrio para cartelera, reservas y administración.
colors:
  primary: '#111827'
  secondary: '#374151'
  accent: '#92400E'
  accent-hover: '#78350F'
  background: '#F9FAFB'
  surface: '#FFFFFF'
  surface-alt: '#F3F4F6'
  border: '#D1D5DB'
  text: '#111827'
  text-muted: '#6B7280'
  text-inverse: '#FFFFFF'
  success: '#15803D'
  warning: '#B45309'
  danger: '#B91C1C'
  info: '#1D4ED8'
  available-seat: '#FFFFFF'
  selected-seat: '#1D4ED8'
  reserved-seat: '#9CA3AF'
typography:
  fontFamily: Inter, system-ui, sans-serif
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  full: 9999px
timestamp: '2026-06-22T00:00:00-04:00'
---

# DESIGN.md — Cine Reservas

## Overview

La interfaz debe ser clara, sobria y defendible académicamente. El usuario debe encontrar una película, seleccionar una función, elegir asientos y confirmar una reserva sin ambigüedad. El administrador opera CRUDs con tablas, formularios y validaciones visibles.

## Principios de UX

1. **Claridad antes que ornamentación.**
2. **Estados visibles:** carga, vacío, error, éxito, 401, 403, 404 y conflictos 409.
3. **Reglas críticas explícitas:** asiento ocupado, función superpuesta y dependencias administrativas.
4. **Administración eficiente:** tablas y formularios consistentes.
5. **Sin sobreingeniería:** no agregar dashboards o animaciones sin valor para el práctico.

## Layout global

La aplicación usa `AppShell` con barra superior y contenido centrado. La zona pública muestra Cartelera, Mis reservas y Login/Registro o Usuario/Cerrar sesión. El área admin usa navegación para Películas, Salas y Funciones.

* Contenido público: máximo 1120 px.
* Formularios: máximo 640 px.
* Tablas: máximo 1280 px.
* Mapa de asientos: responsive, con scroll horizontal si hace falta.

## Color usage

* `primary`: topbar y navegación.
* `accent`: reservar, confirmar y guardar.
* `danger`: eliminar y errores críticos.
* `success`: confirmaciones.
* `warning`: conflictos.
* `info`: selección de asientos.

## Component rules

### Botones

* Una acción principal por bloque.
* El botón de envío se deshabilita mientras procesa.
* Eliminar requiere confirmación.
* “Cancelar” en formularios significa abandonar la edición, no cancelar una reserva.

### Formularios

* Labels visibles.
* Validaciones junto al campo.
* Error de backend arriba del formulario.
* Crear/editar película usa archivo real para el póster.

### Tablas administrativas

* Columnas esenciales.
* Acciones al final.
* Empty state con CTA.
* Paginación cuando corresponda.

### Mapa de asientos

* Disponible: fondo blanco y seleccionable.
* Seleccionado: azul y reversible.
* Reservado: gris y deshabilitado.
* Leyenda visible y no depender solo del color.

## Accessibility

* Contraste WCAG AA.
* Navegación por teclado.
* Asientos como botones con `aria-label`, `aria-pressed` y `disabled`.
* Errores asociados con `aria-describedby`.

## Responsive behavior

* Móvil: una columna y filtros apilados.
* Tablet: dos columnas para cartelera.
* Desktop: tres o cuatro columnas y tablas completas.

## Content style

UI en español. Ejemplos:

* “Reservar asientos”.
* “Confirmar reserva”.
* “No hay funciones futuras disponibles”.
* “La sala ya está ocupada durante ese horario”.
* “Uno o más asientos ya fueron reservados. Actualiza el mapa”.

## Implementation notes for React

Componentes sugeridos: `AppShell`, `AdminShell`, `PageHeader`, `MovieCard`, `DataTable`, `FormField`, `ConfirmDialog`, `SeatMap`, `EmptyState`, `ErrorAlert`.

Las reglas críticas se validan en backend; la UI solo las comunica.
