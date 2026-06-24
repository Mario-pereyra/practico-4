---
type: "reference"
title: "Referencias para diseño frontend y prompts UI"
description: "Fuentes externas usadas para orientar DESIGN.md, especificación UI/UX y prompts incrementales de Stitch."
updated: "2026-06-22"
---

# Referencias para diseño frontend y prompts UI

Este proyecto usa estas referencias para mantener coherencia visual, generar prompts UI pantalla por pantalla y documentar decisiones de diseño de forma consumible por agentes.

## Referencias principales

1. Stitch prompting documentation  
   https://stitch.withgoogle.com/docs/learn/prompting/

   Uso en el proyecto:
   - Orientar prompts de generación UI.
   - Diseñar pantallas de forma incremental.
   - Evitar pedir toda la aplicación en un solo prompt.
   - Mantener instrucciones claras, específicas y accionables.

2. Stitch Prompt Guide — Google AI Developers Forum  
   https://discuss.ai.google.dev/t/stitch-prompt-guide/83844

   Uso en el proyecto:
   - Empezar con un concepto general y luego refinar pantalla por pantalla.
   - Usar prompts específicos para componentes o vistas concretas.
   - Hacer uno o dos cambios por iteración.
   - Evitar mezclar cambios de layout, estilo y lógica en un solo prompt.
   - Mantener prompts cortos, claros y enfocados.

3. DESIGN.md — google-labs-code/design.md  
   https://github.com/google-labs-code/design.md

   Uso en el proyecto:
   - Mantener un archivo `DESIGN.md` con tokens visuales en YAML frontmatter y racional humano en Markdown.
   - Dar al agente valores concretos de color, tipografía, bordes, espaciado y componentes.
   - Evitar que cada pantalla reinvente el sistema visual.
   - Permitir auditoría de consistencia visual entre diseño, UI y código.

## Aplicación concreta dentro del OKP

- `05_ui_flows/design.md`: define identidad visual, tokens y reglas de aplicación.
- `05_ui_flows/ui_ux_spec.md`: define vistas, estados globales, flujos y reglas de experiencia.
- `05_ui_flows/stitch_prompt_pack.md`: contiene prompts incrementales para generar/refinar pantallas.
- `05_ui_flows/views/*.md`: especifica cada vista individualmente.

## Regla operativa para el frontend

Cuando se diseñe o implemente una vista React:

1. Revisar primero `05_ui_flows/design.md`.
2. Revisar la vista individual en `05_ui_flows/views/`.
3. Usar `05_ui_flows/ui_ux_spec.md` para confirmar flujo y estados.
4. Si se usa Stitch u otra herramienta de generación UI, usar prompts incrementales del `stitch_prompt_pack.md`.
5. No introducir librerías de estado global no aprobadas. El frontend usa Context solo para autenticación, servicios API por recurso, hooks simples, `useState` y `useEffect`.
