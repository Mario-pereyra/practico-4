---
type: Reference
title: Notas de especificación OKF v0.1
description: Reglas de conformidad aplicadas al bundle.
tags:
- referencia
- okf
- formato
timestamp: '2026-06-22T00:00:00-04:00'
---

# Reglas aplicadas

* Cada documento conceptual Markdown tiene frontmatter YAML parseable y `type` no vacío.
* `index.md` es un nombre reservado y no lleva frontmatter, salvo el `okf_version` permitido en el índice raíz.
* `log.md` agrupa entradas por encabezados `YYYY-MM-DD`, más recientes primero.
* Los enlaces absolutos comienzan con `/` y son relativos a la raíz del bundle.

# Referencias

[1] [Open Knowledge Format v0.1 SPEC](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
