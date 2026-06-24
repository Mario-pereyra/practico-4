---
type: Reference Analysis
title: 'Análisis del artículo Open Knowledge Format'
description: 'Lectura crítica del artículo de Google Cloud y aplicación al proyecto.'
tags: [okf, documentacion, knowledge-management, agentes]
timestamp: '2026-06-22T00:00:00-04:00'
---


# Lectura crítica

El artículo de Google Cloud presenta Open Knowledge Format como una respuesta al problema de contexto fragmentado para agentes y equipos: conocimiento disperso en wikis, catálogos, comentarios de código, documentos y personas senior. La tesis central es que el problema no se resuelve con otro servicio propietario, sino con un formato portable: un directorio de archivos Markdown con frontmatter YAML.

# Principios aplicables al proyecto

1. Cada concepto importante del proyecto debe vivir en un archivo propio.
2. Cada archivo conceptual debe tener `type` en YAML frontmatter.
3. El cuerpo debe usar Markdown estructurado: títulos, listas, tablas y bloques de código.
4. Los enlaces internos deben formar un grafo navegable entre requisitos, reglas, entidades, historias y pruebas.
5. Los índices `index.md` sirven para disclosure progresivo: un humano o agente puede inspeccionar una carpeta antes de cargar documentos profundos.
6. `log.md` conserva cambios de decisiones.

# Decisión de diseño documental

Este proyecto no necesita una herramienta compleja de documentación. Un bundle OKF permite que la documentación sea editable, versionable en Git, útil para humanos y consumible por agentes.

# Beneficios concretos

* Reduce ambigüedad: las decisiones quedan explícitas en [Decisiones cerradas](/00_context/decisions.md).
* Mejora trazabilidad: las historias enlazan con reglas y entidades.
* Ayuda al desarrollo: el backend puede implementar desde [Modelo de datos](/04_architecture/data_model.md) y [Validaciones](/04_architecture/validation_rules.md).
* Ayuda a QA: las pruebas están separadas en [Casos de prueba](/06_quality/test_cases.md) y [Casos borde](/06_quality/edge_cases.md).

# Riesgo del enfoque

OKF no sustituye especificaciones formales como OpenAPI, SQL migrations o diagramas UML. Debe referenciarlas o complementarlas. Para este práctico, el bundle funciona como documentación viva; si luego se desarrolla código, conviene agregar `openapi.yaml`, migraciones SQL y diagramas en carpetas externas o referenciadas.

# Referencias

[1] [Google Cloud Blog — How the Open Knowledge Format can improve data sharing](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)
[2] [GoogleCloudPlatform/knowledge-catalog](https://github.com/GoogleCloudPlatform/knowledge-catalog)
[3] [Open Knowledge Format v0.1 SPEC](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
