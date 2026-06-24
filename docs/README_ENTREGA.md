# Paquete documental actualizado — Cine Reservas

Este paquete reúne el enunciado original, el bundle OKF/OKP, OpenAPI, DESIGN.md, instrucciones para agentes y la auditoría final de coherencia.

## Estructura

```text
repo/
├── AGENTS.md
├── agents/skills/cine-project-navigator/
└── docs/
    ├── README_ENTREGA.md
    ├── START_HERE_CODING_AGENT.md
    ├── SKILLS_README.md
    ├── CHANGELOG_CORRECCIONES.md
    ├── AUDITORIA_COHERENCIA_OKP_AGENTS.md
    ├── PRD_CINE_RESERVAS.md
    ├── PRD_CINE_RESERVAS.docx
    ├── openapi.yaml
    ├── DESIGN.md
    ├── Practico_4_original.pdf
    └── OKP_cine_reservas/
```

## Orden de lectura

1. `AGENTS.md`.
2. `agents/skills/cine-project-navigator/SKILL.md`.
3. `docs/OKP_cine_reservas/index.md`.
4. `docs/OKP_cine_reservas/00_context/enunciado_original.md`.
5. `docs/OKP_cine_reservas/00_context/decisions.md`.
6. `docs/OKP_cine_reservas/00_context/scope.md`.
7. `docs/OKP_cine_reservas/01_requirements/product_requirements_document.md`.
8. `docs/OKP_cine_reservas/04_architecture/openapi.yaml`.
9. Arquitectura, modelo, vistas y pruebas.

## Fuentes normativas

* El PDF y su transcripción gobiernan el alcance original.
* El PRD canónico está en `docs/OKP_cine_reservas/01_requirements/product_requirements_document.md`; `docs/PRD_CINE_RESERVAS.md` es su copia sincronizada y el DOCX es el derivado de presentación.
* OpenAPI gobierna HTTP.
* El modelo de datos gobierna restricciones de persistencia.
* Stitch es referencia visual, no contrato funcional.

## Validación

Ejecutar:

```bash
python agents/skills/cine-project-navigator/scripts/check_project_docs.py
npx --yes @redocly/cli@latest lint docs/openapi.yaml --format stylish
```
