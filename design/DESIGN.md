---
version: alpha
name: Cromo Systems
description: >-
  Sistema visual para automatización, energía y seguridad residencial: metal
  reflejando poca luz, precisión documental y un acento funcional.
metadata:
  locale: es-CL
  status: internal-proposal-v1
  updated: "2026-07-23"
  authority: "Manual de marca Cromo Systems v0.1 (doc_746e60869c93_cromo-systems-manual-de-marca.md)"
colors:
  vanta: "#08090B"
  grafito: "#15181D"
  acero: "#3B424C"
  cromo: "#C3C9D2"
  especular: "#F2F5F9"
  senal: "#4DE3E8"
  brasa: "#E39A4A"
  linea-fuerte: "#6F7378"
typography:
  display-xl:
    fontFamily: "Archivo Expanded, Archivo, sans-serif"
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.0833
    letterSpacing: "0.08em"
  display:
    fontFamily: "Archivo Expanded, Archivo, sans-serif"
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.1875
    letterSpacing: "0.08em"
  titulo:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0em"
  cuerpo:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "0em"
  dato:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5385
    letterSpacing: "0.02em"
rounded:
  base: 2px
spacing:
  grid: 8px
  1: 8px
  2: 16px
  3: 24px
  4: 32px
  6: 48px
  8: 64px
  12: 96px
  16: 128px
borders:
  hairline: 1px
  focus: 2px
composition:
  columns: 12
  surface: "Decide/Learn"
  primaryActionPerViewport: 1
  accentAreaMaximum: "5%"
states:
  focus: "{colors.senal}"
  hoverBorder: "{colors.cromo}"
  error: "{colors.especular}"
components:
  button-primary:
    backgroundColor: "{colors.senal}"
    textColor: "{colors.vanta}"
    typography: "{typography.cuerpo}"
    rounded: "{rounded.base}"
    padding: "{spacing.2}"
  button-primary-hover:
    backgroundColor: "{colors.especular}"
    textColor: "{colors.vanta}"
    typography: "{typography.cuerpo}"
    rounded: "{rounded.base}"
    padding: "{spacing.2}"
  button-secondary:
    backgroundColor: "{colors.vanta}"
    textColor: "{colors.especular}"
    typography: "{typography.cuerpo}"
    rounded: "{rounded.base}"
    padding: "{spacing.2}"
  panel:
    backgroundColor: "{colors.grafito}"
    textColor: "{colors.cromo}"
    rounded: "{rounded.base}"
    padding: "{spacing.3}"
  technical-label:
    backgroundColor: "{colors.vanta}"
    textColor: "{colors.cromo}"
    typography: "{typography.dato}"
    rounded: "{rounded.base}"
    padding: "{spacing.1}"
  input-field:
    backgroundColor: "{colors.vanta}"
    textColor: "{colors.especular}"
    typography: "{typography.cuerpo}"
    rounded: "{rounded.base}"
    padding: "{spacing.2}"
---

# Cromo Systems — DESIGN.md

## Overview

Cromo Systems es un integrador de automatización, energía y seguridad para
casas de alto estándar y parcelas en Chile. No vende dispositivos: entrega una
casa medida y documentada. La marca visual expresa eso con un material, no con
un color: **metal reflejando poca luz**. Fondo casi negro, tipografía en plata,
un solo acento por pieza y profundidad por cambio de superficie, nunca por
sombra.

Principios que gobiernan cualquier pieza construida con este sistema:

1. **La seguridad viene del dato, no del adjetivo.** Toda cifra, código o
   etiqueta técnica se compone en monoespaciada. Un divisor sin etiqueta es
   decoración y se elimina.
2. **Pieza fresada, no botón de app.** Esquinas casi rectas (2 px), bordes de
   1 px, grilla de 8 px. Nada blando, nada difuso.
3. **El lujo es el vacío.** Márgenes generosos y composición editorial
   asimétrica. Nunca un héroe centrado ni una fila de tarjetas iguales como
   recurso principal.
4. **Un acento por pieza.** Señal es el sistema; Brasa es la casa vivida.
   Nunca conviven (única excepción: la carta de escenas de iluminación).
5. **Honestidad estructural.** Lo que no está medido o confirmado se marca
   `[PENDIENTE DE MEDICIÓN]` o `[PENDIENTE DE CONFIRMACIÓN]`; los ejemplos no
   reales se rotulan `EJEMPLO DE MÉTODO`.

Referencias: Manual §1, §3, §4, §7, §11.

## Colors

Tokens. Los nombres son identificadores portables; se referencian como
`color.<token>`.

| Token | Hex | Rol |
|---|---|---|
| `color.vanta` | `#08090B` | Fondo primario. Default de todo. |
| `color.grafito` | `#15181D` | Superficies elevadas: paneles, tarjetas, tablas. |
| `color.acero` | `#3B424C` | Bordes y divisores decorativos, texto deshabilitado. |
| `color.cromo` | `#C3C9D2` | Texto de cuerpo sobre fondo oscuro. |
| `color.especular` | `#F2F5F9` | Titulares, énfasis, un solo dato clave por pieza. |
| `color.senal` | `#4DE3E8` | Estado activo, foco, links, UI en vivo. |
| `color.brasa` | `#E39A4A` | Luz habitada: escenas cálidas, fotografía interior. |

Token derivado (no es un color nuevo: es Cromo mezclado con Vanta):

| Token | Definición | Rol |
|---|---|---|
| `color.linea-fuerte` | `color-mix(in srgb, color.cromo 55%, color.vanta)` ≈ `#6F7378` | Borde de componentes interactivos. Acero sobre Vanta rinde 1,96:1 y no cumple el mínimo 3:1 de WCAG 1.4.11 para límites de componentes. |

Reglas:

- **C1** — `color.vanta` es el fondo por defecto de toda superficie digital.
- **C2** — Un solo acento por pieza. `color.senal` y `color.brasa` nunca
  conviven en la misma pieza (excepción única: carta de escenas de
  iluminación).
- **C3** — El acento ocupa como máximo el **5 % del área**. Si se ve neón,
  está mal.
- **C4** — Sin degradados decorativos ni funcionales. El único gradiente
  autorizado del sistema es el especular del logotipo (Manual §6) y no se
  reproduce en componentes.
- **C5** — Sobre fondo claro (impresos, planos, cotizaciones): `color.vanta`
  sobre blanco puro `#FFFFFF`, `color.acero` para reglas y `color.senal`
  reservado a totales.
- **C6** — Texto de cuerpo nunca en `color.acero`. Contraste mínimo de
  lectura: `color.cromo` sobre `color.vanta` = 11:1.
- **C7** — Solo una superficie rellena de acento por pantalla (la acción
  primaria). Cualquier otro uso de Señal es línea o texto.

Referencias: Manual §4; `web/styles.css` (implementación vigente de C7 y
`color.linea-fuerte`).

## Typography

Familias. Se referencian como `font.<token>`. Ninguna se carga desde CDN; si
no están auto-alojadas se declaran con respaldo de sistema.

| Token | Familia | Uso |
|---|---|---|
| `font.display` | Archivo Expanded | Solo titulares y logotipo. Mayúsculas, peso 600, tracking `+0.08em`. |
| `font.body` | IBM Plex Sans | Todo el cuerpo, propuestas, web. Pesos 400/500/600. |
| `font.data` | JetBrains Mono | Códigos de proyecto, especificaciones, etiquetas, cifras técnicas. |

Escala (base 16 px, razón 1.25). Se referencia como `type.<token>`.

| Token | Tamaño / línea | Familia y peso |
|---|---|---|
| `type.display-xl` | 48 / 52 | `font.display` 600, mayúsculas, `+0.08em` |
| `type.display` | 32 / 38 | `font.display` 600, mayúsculas, `+0.08em` |
| `type.titulo` | 24 / 30 | `font.body` 600 |
| `type.subtitulo` | 20 / 28 | `font.body` 500 |
| `type.cuerpo` | 16 / 26 | `font.body` 400 |
| `type.menor` | 14 / 22 | `font.body` 400 |
| `type.dato` | 13 / 20 | `font.data` 400, `+0.02em` |

Reglas:

- **T1** — El display va siempre en mayúsculas y espaciado: es una placa de
  máquina, no un titular de revista.
- **T2** — Toda cifra técnica (kW, ms, horas, m², códigos `CS-…`) va en
  `font.data`, incluso dentro de un párrafo.
- **T3** — Nunca más de dos pesos por pieza.
- **T4** — Ancho de línea de lectura: 65–75 caracteres.
- **T5** — Sin emojis, sin signos de exclamación, sin mayúsculas de énfasis
  fuera del display.

Referencias: Manual §3, §5.

## Layout

Espaciado. Todo múltiplo de 8 px; se referencia como `space.<n>` = n × 8 px.

| Token | Valor | Uso típico |
|---|---|---|
| `space.1` | 8 px | Separación mínima interna |
| `space.2` | 16 px | Relleno de controles |
| `space.3` | 24 px | Relleno de paneles, gap de columnas |
| `space.4` | 32 px | Separación entre bloques |
| `space.6` | 48 px | Separación entre grupos |
| `space.8` | 64 px | Aire de sección (mínimo) |
| `space.12` | 96 px | Aire de sección (desktop) |
| `space.16` | 128 px | Desfases editoriales grandes |

Reglas:

- **L1** — Grilla base de **8 px**. Todo espaciado, alto y desfase es
  múltiplo de 8.
- **L2** — Contenedor de contenido (`layout.shell`): máximo `72rem`,
  centrado, con canal lateral fluido.
- **L3** — **Composición editorial asimétrica obligatoria.** Sobre una
  retícula de 12 columnas, los bloques ocupan anchos desiguales y arrancan
  desfasados en vertical (desfases en múltiplos de `space.1`). Prohibido el
  héroe centrado y las filas de módulos de ancho idéntico como estructura
  principal de página.
- **L4** — Márgenes generosos: el lujo es el vacío, no el relleno. El aire
  entre secciones nunca baja de `space.8`.
- **L5** — Los divisores llevan siempre una etiqueta en `font.data` a la
  izquierda (código de sección, figura o dato). Un divisor sin dato se
  elimina.
- **L6** — Jerarquía por pantalla: una sola acción primaria visible; las
  secundarias ayudan a evaluar, no compiten.

Referencias: Manual §7; `WEB-COPY.md` §1 (regla de CTA única).

## Elevation & Depth

- **E1** — **Sin sombras difusas.** Nunca `box-shadow` ni `drop-shadow`
  suaves, ni resplandores.
- **E2** — La profundidad viene del cambio de superficie: `color.vanta`
  (nivel 0) → `color.grafito` (nivel 1), siempre con borde de 1 px.
- **E3** — Existen solo dos niveles. No se anidan paneles Grafito dentro de
  paneles Grafito; si un contenido necesita jerarquía interna, se usa un
  divisor etiquetado (L5).
- **E4** — El foco de teclado es un anillo de 2 px en `color.senal` con
  separación de 3 px (`outline-offset`). Es la única "luz" del sistema.
- **E5** — Estados hover: cambio de color de borde o de texto
  (`color.acero` → `color.cromo`, o texto → `color.senal`), nunca de escala,
  sombra u opacidad animada.

Referencias: Manual §7.

## Shapes

- **S1** — Radio de esquina único: **2 px** (`radius.base`). Casi recto —
  pieza fresada, no botón de app. Sin píldoras, sin círculos decorativos.
- **S2** — Bordes de **1 px** (`border.hairline`). `color.acero` para
  contenedores y divisores decorativos; `color.linea-fuerte` para límites de
  componentes interactivos (C7 de Colors, WCAG 1.4.11).
- **S3** — Filetes de acento: una línea de 1–2 px en `color.senal` puede
  marcar el canto izquierdo de una nota o aviso. Cuenta dentro del 5 % de C3.
- **S4** — El bisel a 45° y el gradiente especular pertenecen exclusivamente
  al logotipo (Manual §6). No se imitan en componentes, fondos ni
  ilustraciones.
- **S5** — Iconografía: solo trazos planos de 1–1.5 px derivados de la
  geometría del sistema (líneas, rectángulos, cheurones). Sin sets de íconos
  de relleno.

Referencias: Manual §6, §7.

## Components

Los componentes se definen **solo** con esta lista blanca de propiedades.
Cada valor debe referenciar un token (`color.*`, `type.*`, `space.*`,
`radius.base`, `border.hairline`) o una regla por identificador (`C1…C7`,
`T1…T5`, `L1…L6`, `E1…E5`, `S1…S5`). Propiedades fuera de la lista quedan
prohibidas; un componente nuevo se propone con esta misma estructura.

Lista blanca: `rol` · `superficie` · `borde` · `radio` · `relleno` ·
`tipografia` · `color-texto` · `acento` · `estados` · `referencias`

### accion-primaria

| Propiedad | Valor |
|---|---|
| rol | Única superficie de acento de la pantalla; conversión primaria. |
| superficie | `color.senal` |
| borde | ninguno |
| radio | `radius.base` |
| relleno | `space.2` en todos los lados |
| tipografia | `type.cuerpo` peso 600 |
| color-texto | `color.vanta` |
| acento | cuenta como la superficie de C7; una por pantalla |
| estados | hover: superficie `color.especular` (E5) · foco: E4 |
| referencias | C3, C7, L6 |

### accion-secundaria

| Propiedad | Valor |
|---|---|
| rol | Acción de evaluación; nunca compite con la primaria. |
| superficie | `color.vanta` |
| borde | `border.hairline` en `color.linea-fuerte` |
| radio | `radius.base` |
| relleno | `space.2` vertical · `space.3` horizontal |
| tipografia | `type.cuerpo` peso 600 |
| color-texto | `color.especular` |
| acento | ninguno |
| estados | hover: borde `color.cromo` (E5) · foco: E4 |
| referencias | L6, S2 |

### enlace-cta

| Propiedad | Valor |
|---|---|
| rol | CTA de texto dentro de un bloque de contenido. |
| superficie | ninguna |
| borde | subrayado inferior de 1 px en `color.senal` |
| radio | no aplica |
| relleno | ninguno |
| tipografia | `type.cuerpo` peso 600 |
| color-texto | `color.especular` |
| acento | línea, dentro del 5 % de C3 |
| estados | hover: texto `color.senal` (E5) · foco: E4 |
| referencias | C3, S3 |

### eyebrow

| Propiedad | Valor |
|---|---|
| rol | Etiqueta de sección o de contexto sobre un titular. |
| superficie | ninguna |
| borde | ninguno |
| radio | no aplica |
| relleno | ninguno |
| tipografia | `type.dato` en mayúsculas, tracking `+0.16em` |
| color-texto | `color.senal` |
| acento | texto, dentro del 5 % de C3 |
| estados | no interactivo |
| referencias | T2, L5 |

### clave-mono

| Propiedad | Valor |
|---|---|
| rol | Clave de dato o activo (`UNILINEAL`, `MAPA DE RED`, códigos `CS-…`). |
| superficie | ninguna |
| borde | ninguno |
| radio | no aplica |
| relleno | ninguno |
| tipografia | `type.dato` en mayúsculas, tracking `+0.14em` |
| color-texto | `color.especular` |
| acento | ninguno |
| estados | no interactivo |
| referencias | T2 |

### divisor-etiquetado

| Propiedad | Valor |
|---|---|
| rol | Separar bandas o filas de contenido con un dato a la izquierda. |
| superficie | ninguna |
| borde | regla superior `border.hairline` en `color.acero` |
| radio | no aplica |
| relleno | `space.3` sobre el contenido siguiente |
| tipografia | etiqueta en `type.dato` |
| color-texto | etiqueta en `color.cromo`; número o código puede ir en `color.senal` |
| acento | opcional en el código, dentro del 5 % de C3 |
| estados | no interactivo |
| referencias | L5, S2 |

### panel

| Propiedad | Valor |
|---|---|
| rol | Superficie elevada para contenido agrupado (entregables, estado, figura). |
| superficie | `color.grafito` |
| borde | `border.hairline` en `color.acero` |
| radio | `radius.base` |
| relleno | `space.3` a `space.4` |
| tipografia | hereda del contenido |
| color-texto | `color.cromo`; títulos `color.especular` |
| acento | ninguno propio |
| estados | no interactivo; no se anida (E3) |
| referencias | E2, E3, S2 |

### ficha-ledger

| Propiedad | Valor |
|---|---|
| rol | Lista de registro: activos de evidencia, etapas de método, partidas. |
| superficie | ninguna (vive sobre nivel 0 o dentro de `panel`) |
| borde | cada fila abre con regla superior `border.hairline` en `color.acero` |
| radio | no aplica |
| relleno | `space.2` a `space.3` vertical por fila |
| tipografia | clave en `type.dato`; descripción en `type.cuerpo` o `type.menor` |
| color-texto | clave `color.especular`; descripción `color.cromo` |
| acento | opcional: número de etapa en `color.senal` |
| estados | no interactivo |
| referencias | L5, T2 |

### bloque-limite

| Propiedad | Valor |
|---|---|
| rol | Límite técnico que debe permanecer visible junto al claim que acota. |
| superficie | ninguna |
| borde | opcional filete izquierdo 1 px en `color.senal` (S3) |
| radio | no aplica |
| relleno | `space.2` de sangría cuando lleva filete |
| tipografia | tema en `type.dato` mayúsculas; texto en `type.cuerpo` |
| color-texto | tema `color.senal` o `color.especular`; texto `color.cromo` |
| acento | filete o tema, dentro del 5 % de C3 |
| estados | no interactivo |
| referencias | C3, S3; `WEB-COPY.md` §7 y §14 (el límite vive cerca del claim) |

### marcador-pendiente

| Propiedad | Valor |
|---|---|
| rol | Señalar dato sin confirmar: `[PENDIENTE DE CONFIRMACIÓN]`, `[PENDIENTE DE MEDICIÓN]`. |
| superficie | ninguna |
| borde | subrayado inferior 1 px discontinuo en `color.acero` |
| radio | no aplica |
| relleno | ninguno |
| tipografia | `type.dato` |
| color-texto | `color.especular` |
| acento | ninguno |
| estados | no interactivo; nunca se reemplaza por un dato inventado |
| referencias | Overview 5; `WEB-COPY.md` §14 (regla para futuros claims) |

### zona-imagen-propia

| Propiedad | Valor |
|---|---|
| rol | Reservar el lugar de una fotografía propia futura (casa habitada de noche, detalle de instalación, territorio) sin usar stock. |
| superficie | `color.vanta` con trama de grilla arquitectónica en trazos planos `color.grafito` / `color.acero` (SVG en línea, sin gradientes) |
| borde | `border.hairline` en `color.acero` |
| radio | `radius.base` |
| relleno | proporción apaisada; etiqueta centrada dentro de la zona |
| tipografia | etiqueta en `type.dato` mayúsculas |
| color-texto | `color.cromo`; tipo de fotografía en `color.especular` |
| acento | ninguno |
| estados | no interactivo; lleva siempre `marcador-pendiente` de producción |
| referencias | Manual §8 (tipos y proporciones de fotografía), C4, S5 |

### diagrama-tecnico

| Propiedad | Valor |
|---|---|
| rol | Figura abstracta de método: unilineal de energía, mapa de red, panel de evidencia. SVG en línea, sin recursos externos. |
| superficie | nivel 0 o dentro de `panel` |
| borde | trazos de 1–1.5 px: `color.acero` para topología, `color.especular` para nodos clave |
| radio | nodos con `radius.base` |
| relleno | grilla interna en múltiplos de `space.1` |
| tipografia | rótulos en `type.dato` |
| color-texto | rótulos `color.cromo`; nodos clave `color.especular` |
| acento | una sola ruta o estado en `color.senal`, dentro del 5 % de C3 |
| estados | no interactivo; lleva siempre pie de figura: `FIGURA NN · DIAGRAMA ABSTRACTO DE MÉTODO · NO CORRESPONDE A UN PROYECTO` |
| referencias | C3, C4, S5, T2; Overview 5 (honestidad) |

### faq-item

| Propiedad | Valor |
|---|---|
| rol | Pregunta plegable (`details/summary`), navegable con teclado y sin JavaScript. |
| superficie | ninguna |
| borde | regla superior `border.hairline` en `color.acero`; la última fila cierra con regla inferior |
| radio | no aplica |
| relleno | `space.2` vertical en el summary |
| tipografia | pregunta en `type.cuerpo` peso 600; respuesta en `type.cuerpo` |
| color-texto | pregunta `color.especular`; respuesta `color.cromo` |
| acento | indicador `+` / `−` en `color.senal` |
| estados | foco: E4 · abierto: indicador cambia a `−` |
| referencias | E4, L5 |

### campo-entrada

| Propiedad | Valor |
|---|---|
| rol | Entrada de formulario (texto, select, textarea) cuando la superficie incluya captura real de datos. |
| superficie | `color.vanta` |
| borde | `border.hairline` en `color.linea-fuerte` |
| radio | `radius.base` |
| relleno | `space.1` a `space.2` |
| tipografia | `type.cuerpo`; ayuda en `type.menor`; contadores en `type.dato` |
| color-texto | `color.especular`; ayuda `color.cromo` |
| acento | ninguno en reposo |
| estados | hover: borde `color.cromo` · foco: E4 · error: borde `color.especular` + mensaje de texto (nunca solo color) |
| referencias | S2, E4, E5; `web/styles.css` (implementación vigente) |

## Do's and Don'ts

Hacer:

- Fondo Vanta por defecto; profundidad solo por cambio a Grafito con borde
  de 1 px.
- Un acento por pieza, ≤ 5 % del área, y una sola superficie de acento por
  pantalla.
- Display en mayúsculas espaciadas; toda cifra o código en JetBrains Mono.
- Composición editorial asimétrica sobre 12 columnas, desfases en múltiplos
  de 8 px, aire generoso.
- Divisores siempre etiquetados con un dato en mono.
- Diagramas técnicos abstractos propios (SVG en línea) con pie de figura
  honesto; zonas de imagen propia futuras marcadas `[PENDIENTE DE PRODUCCIÓN]`.
- Marcar `[PENDIENTE DE …]` todo dato sin confirmar y `EJEMPLO DE MÉTODO`
  todo ejemplo no real.
- Foco visible en Señal (E4) y contraste de lectura Cromo/Vanta 11:1.

No hacer:

- Sombras difusas, resplandores, glassmorphism o desenfoques.
- Degradados decorativos o funcionales (el especular es solo del logotipo).
- Señal y Brasa en la misma pieza (salvo la carta de escenas de iluminación).
- Héroe centrado, filas de tarjetas iguales o composiciones simétricas como
  estructura principal.
- Fotografía de stock, familias con tablet, hologramas, renders con Wi-Fi
  dibujado, ni logotipos de fabricantes.
- Dashboards falsos, métricas inventadas, casos sin autorización, precios o
  promesas sin medición.
- Texto de cuerpo en Acero; radios mayores a 2 px; píldoras y círculos.
- Emojis, signos de exclamación, superlativos y las frases prohibidas del
  Manual §3 (`soluciones inteligentes`, `la casa del futuro`, `revolucionario`,
  `disruptivo`, `tecnología de punta`, `llave en mano`, `a la vanguardia`).
- La palabra `domótica` como titular: los encabezados nombran resultados.
- Recursos externos: fuentes por CDN, imágenes remotas, íconos de terceros.
