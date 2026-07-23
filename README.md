# Cromo Systems — sitio estático

Landing estática de **Cromo Systems** para automatización, energía y seguridad residencial. La fuente de producción vive en `web/`; no requiere dependencias, compilación ni backend.

> **Estado:** MVP de prepublicación. Mantiene `noindex, nofollow` y el formulario valida únicamente en el navegador; no transmite solicitudes.

## Arquitectura

| Ruta | Propósito |
|---|---|
| `web/index.html` | Contenido, metadata, navegación y formulario local. |
| `web/styles.css` | Tokens, responsive, foco y preferencias de movimiento. |
| `web/app.js` | Menú móvil y validación local sin red. |
| `web/favicon.svg` | Favicon SVG local. |
| `design/DESIGN.md` | Sistema visual portable y reglas normativas. |
| `design/tokens.json` | Exportación DTCG de tokens. |
| `design/tailwind.theme.json` | Exportación de tokens para Tailwind. |
| `design/claude-design-brief.md` | Brief operativo para futuras iteraciones visuales. |

## Ejecutar localmente

No se instala ni compila nada. Sirve el directorio `web/` con cualquier servidor HTTP estático:

```bash
python3 -m http.server 8099 --bind 127.0.0.1 --directory web
```

Abre `http://127.0.0.1:8099/index.html`.

## Vercel

`vercel.json` define `web/` como `outputDirectory`; no hay comando de build. Para conectar este repositorio en Vercel, importa el proyecto y conserva ese directorio de salida. No habilites indexación ni conectes un receptor de leads hasta resolver las dependencias funcionales, legales y operativas documentadas en la interfaz.

## Alcance de la fuente publicada

Este repositorio conserva el sitio, el sistema de diseño portable y sus exportaciones. Los borradores, respaldos, reportes internos y material de propuesta se excluyen deliberadamente mediante `.gitignore`.
