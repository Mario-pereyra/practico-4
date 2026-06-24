---
type: "view-spec"
title: "Registro de cliente"
route: "/register"
auth: "public"
role: "VISITOR"
priority: "MVP"
relatedApis:
  - "POST /auth/register"
updated: "2026-06-22"
---
# Registro de cliente

## Objetivo

Permitir registrar únicamente usuarios cliente.

## Layout

- Página centrada.
- Card con título “Crear cuenta”.
- Campos: nombre, email, contraseña, confirmar contraseña.
- Botón “Registrarme”.
- Link “Ya tengo cuenta”.

## Componentes

- `AuthLayout`
- `FormField`
- `PasswordField`
- `ErrorAlert`

## Validaciones UI

- Nombre obligatorio.
- Email obligatorio y válido.
- Contraseña de 8 a 72 caracteres.
- Confirmación debe coincidir.

## Estados

- Email ya registrado.
- Error de validación.
- Loading durante envío.
- Registro exitoso: guardar el JWT recibido, autenticar como CLIENT y navegar a un `returnTo` interno o a `/movies`.

## Reglas UX

- Aclarar con texto pequeño: “El registro crea una cuenta de cliente.”
- No mencionar ni ofrecer creación de cuenta admin.

## Prompt Stitch recomendado

Crear una pantalla web de registro de cliente para una aplicación de cartelera y reservas de cine. Usar una tarjeta centrada con campos nombre, email, contraseña y confirmar contraseña, botón principal “Registrarme” y enlace “Ya tengo cuenta”. Debe verse simple, académico, moderno y claro.

## Checklist de aceptación

- Solo crea usuarios CLIENT.
- Valida campos.
- Maneja email repetido.
- Autentica al nuevo usuario con el JWT devuelto por la API y redirige de forma determinista.
