---
type: "view-spec"
title: "Inicio de sesión"
route: "/login"
auth: "public"
role: "VISITOR"
priority: "MVP"
relatedApis:
  - "POST /auth/login"
updated: "2026-06-22"
---
# Inicio de sesión

## Objetivo

Permitir que clientes y administrador seed inicien sesión.

## Layout

- Página centrada.
- Card de autenticación con título “Iniciar sesión”.
- Email y contraseña.
- Botón principal “Ingresar”.
- Link secundario “Crear cuenta” para clientes.

## Componentes

- `AuthLayout`
- `FormField`
- `PasswordField`
- `ErrorAlert`
- `Button`

## Validaciones UI

- Email obligatorio y formato válido.
- Contraseña obligatoria.
- No mostrar contraseña por defecto.

## Estados

- Loading durante envío.
- Credenciales inválidas.
- Usuario ya autenticado: redirigir según rol.

## Redirección post-login

- Si existe un `returnTo` interno y autorizado, volver a esa página para cualquier usuario autenticado.
- Sin `returnTo`, CLIENT navega a `/movies`.
- Sin `returnTo`, ADMIN navega a `/admin`.

## Reglas UX

- No existe link para registrar administrador.
- El admin usa la misma pantalla de login que el cliente.
- El mensaje de error debe ser genérico: “Email o contraseña inválidos.”

## Prompt Stitch recomendado

Crear una pantalla web de inicio de sesión para una aplicación de reservas de cine. Debe tener una tarjeta centrada con título “Iniciar sesión”, campos email y contraseña, botón ámbar oscuro “Ingresar”, link “Crear cuenta” y mensaje de error. Estilo sobrio, profesional y claro.

## Checklist de aceptación

- Permite login cliente.
- Permite login admin seed.
- No permite registro admin.
- Respeta `returnTo` y aplica el destino predeterminado según rol.
