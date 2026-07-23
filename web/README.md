# Cromo Systems — MVP web estático

Sitio de una página, sin dependencias, sin build y sin backend. Implementa el copy
maestro de [`../WEB-COPY.md`](../WEB-COPY.md) con la arquitectura de conversión de
[`../WEB-CRO-IA-BRIEF.md`](../WEB-CRO-IA-BRIEF.md) y los guardrails de claims de
[`../WEB-MARKET-SEO-BRIEF.md`](../WEB-MARKET-SEO-BRIEF.md).

**Estado: no publicable todavía.** El formulario no envía nada y quedan campos
`[PENDIENTE DE CONFIRMACIÓN]` en el pie, la privacidad y el horario de contacto.
La página lleva `<meta name="robots" content="noindex, nofollow">` a propósito.

## Archivos

| Archivo | Contenido |
|---|---|
| `index.html` | Página completa: portada, contextos, escenarios, método, evidencia, servicios y límites, B2B, FAQ, privacidad, contacto y pie. |
| `styles.css` | Tokens de marca, composición asimétrica Decide/Learn, navegación móvil, foco y movimiento reducido. |
| `app.js` | Navegación móvil, formulario en dos pasos con validación de cliente y stub de eventos. Sin red. |
| `favicon.svg` | Marca original mínima: arco abierto en Especular sobre Vanta y barra en Señal. |

## Ejecutar en local

No hay instalación ni compilación. Cualquier servidor estático sirve:

```bash
cd projects/Domotica/web
python3 -m http.server 8099 --bind 127.0.0.1
# abrir http://127.0.0.1:8099/index.html
```

Abrir `index.html` con `file://` también funciona: no hay `fetch`, módulos ni
recursos externos.

## Sistema visual aplicado

Tokens del manual de marca, sin colores inventados:

| Token | Valor | Uso en esta pieza |
|---|---|---|
| Vanta | `#08090B` | Fondo de toda la página y texto sobre la superficie de acento. |
| Grafito | `#15181D` | Tarjetas, panel del formulario, bloque de caso. |
| Acero | `#3B424C` | Divisiones y bordes de contenedor (decorativos). |
| Cromo | `#C3C9D2` | Texto de lectura. |
| Especular | `#F2F5F9` | Titulares, texto enfatizado, mensajes de error. |
| Señal | `#4DE3E8` | Acento único: superficie de la CTA primaria, foco, filetes y etiquetas. |
| Brasa | `#E39A4A` | Declarado y **sin uso**: no se mezcla con Señal en la misma pieza. |

Reglas respetadas:

- **Sin degradados.** Ni decorativos ni funcionales; el cheurón de los `select` es un
  SVG plano embebido.
- **Una sola superficie de acento:** el relleno Señal sobre Vanta de `.btn--primary`,
  reutilizado por el enlace de salto. El resto del uso de Señal es línea o texto.
- **Una CTA primaria por pantalla.** Las CTA secundarias son `.btn--ghost` o enlaces
  subrayados.
- Un tono derivado de Cromo (`--line-strong`, `color-mix` de Cromo 55 % con Vanta)
  para los bordes de campos y botones: Acero sobre Vanta da 1,96:1 y no cumple el
  mínimo 3:1 de WCAG 1.4.11 para límites de componentes.

### Composición asimétrica Decide / Learn

Cada sección se arma con dos columnas de ancho distinto y desfase vertical:

- **Decide** sostiene la acción: titular, CTA, tarjetas de contexto, listas de alcance
  y el formulario.
- **Learn** sostiene el criterio para evaluar: promesa de marca, límites, privacidad,
  bloque de caso y encabezados de sección.

En la portada la proporción es 7/5 con la columna Learn desfasada 5,5 rem y separada
por un filete. En método, escenarios, FAQ, privacidad y contacto se invierte a 4/7 con
la columna Learn angosta, pegajosa y encabezando. Por debajo de 62 rem todo colapsa a
una columna en orden de lectura.

## Tipografías

Las familias de marca se declaran en la pila (`IBM Plex Sans`, `JetBrains Mono`) con
respaldo de sistema. **No se auto-alojan todavía** y no se cargan desde un CDN: un
recurso de terceros contradice la sección de privacidad de esta misma página. Alojar
los `.woff2` propios es un paso de lanzamiento.

## Formulario

Dos pasos, con barra de progreso, validación en cliente y **sin backend**.

- Paso 1 (contexto), **obligatorio**: motivo, zona general, 1–3 prioridades, descripción
  de 20–600 caracteres y momento esperado.
- Paso 1, **opcional de verdad**: `tipo` de proyecto, `etapa` y equipos existentes. No se
  validan, su ayuda dice `Opcional.` y viven plegados tras
  `Agregar detalles opcionales del proyecto`.
- Paso 2 (contacto): nombre, empresa o estudio, correo, teléfono, canal preferido,
  consentimiento obligatorio y opt-in separado para comunicaciones futuras.
- Obligatoriedad condicional: empresa se exige cuando el motivo es
  `Arquitecto o constructora`; `profesional a cargo` es el único campo condicional del
  paso 1 —permanece oculto y sin validar salvo que el motivo sea profesional o que la
  etapa declarada sea `Anteproyecto` u `Obra en curso`, y solo entonces es obligatorio.
- Si un campo con error quedó dentro de un grupo plegado, el grupo se despliega antes de
  mover el foco.
- Los errores usan el microcopy exacto de `WEB-COPY.md` §12, aparecen junto al campo
  con `role="alert"`, marcan `aria-invalid` y mueven el foco al primer campo con
  problema. Nada se borra al corregir.
- Una heurística bloquea contraseñas, claves, códigos de acceso, tokens y OTP escritos
  en los campos de texto libre. **Es una ayuda, no un control de seguridad.**
- Al validar el envío, la confirmación dice explícitamente que **la solicitud no se
  envió**, que los datos quedaron solo en el navegador y que se revisará cuando el
  backend esté conectado. No se asigna código de solicitud porque no hubo registro.

### Contexto preservado desde las CTA

Las tres rutas de audiencia llegan al formulario sin perder por qué llegaron.

- **Enum cerrado.** El único parámetro aceptado es `contexto`, con tres valores:
  `parcela`, `residencia` y `proyecto`. Cualquier otro valor se descarta en
  `contextFromQuery()`; el parámetro nunca transporta texto libre ni datos personales.
- **Enlaces.** Las CTA segmentadas apuntan a `index.html?contexto=<valor>#contacto`
  (tarjetas de contexto, cierres de escenario y la CTA primaria B2B). Las CTA generales
  —cabecera, hero, método y servicios— siguen apuntando a `#contacto` sin contexto.
- **Con JavaScript** el clic no recarga: se preselecciona el radio `motivo`, se reescribe
  la URL con `history.replaceState` y se desplaza el foco al título de contacto.
  **Sin JavaScript** el enlace sigue siendo una navegación válida al formulario, solo que
  sin preselección. El `href` lleva `index.html` para que también funcione con `file://`;
  al servir el sitio en la raíz de un dominio conviene cambiarlo por `/?contexto=…`.
- **Encabezado contextual.** `#contacto-title` pasa a
  `Cuéntanos qué debe funcionar mejor en tu parcela / … tu residencia / … tu proyecto`.
  El texto de `WEB-COPY.md` §10 (`… en tu casa`) queda en `data-title-default` y vuelve
  cuando no hay contexto.
- **Resumen de ruta visible y editable.** Sobre el formulario aparece
  `Ruta seleccionada` con el contexto en palabras. `Cambiar contexto` devuelve el foco al
  campo `motivo`, anuncia el cambio por `aria-live` y no borra nada de lo escrito. El
  resumen se oculta si no hay motivo elegido y durante la confirmación.
- **Prioridades ordenadas por contexto.** Las cuatro más frecuentes de la ruta quedan
  primero y las otras cuatro se pliegan tras `Ver más opciones`. Se mantiene la regla de
  1 a 3. Si una prioridad marcada queda en el grupo plegado, el grupo se abre solo.
- **Progresivo.** Los botones de plegado (`Ver más opciones` y
  `Agregar detalles opcionales del proyecto`) los crea `app.js`; sin JavaScript no hay
  controles muertos y los ocho checkboxes y los tres campos opcionales se muestran
  completos.

### Instrumentación

`app.js` emite `CustomEvent('cs:analytics')` con los nombres estables `cta_click`,
`form_start`, `form_step_complete` y `lead_submit`, más `context_preselect` cuando la
URL trae un contexto válido. Todos llevan la propiedad `contexto` con el valor del enum
—o vacío—, que no es un dato personal. **No hay transporte, cookies ni terceros**, y el
detalle nunca incluye nombre, correo, teléfono ni texto libre. Para conectar una
herramienta más adelante basta escuchar ese evento.

## Desviaciones respecto del copy maestro

1. **Confirmación de envío.** `WEB-COPY.md` §10 dice `Recibimos tu solicitud`. Sería
   falso sin backend, así que se reemplazó por `Tu solicitud no se envió` con la
   explicación completa. El texto original vuelve cuando exista recepción real.
2. **Rutas de navegación.** El copy define `/casa`, `/proyectos/...`, etc. Este MVP es
   una sola página: las etiquetas visibles se conservan literalmente y los destinos son
   anclas internas.
3. **WhatsApp** no aparece como canal preferido: el copy lo condiciona a que el canal
   esté habilitado y no lo está.
4. **Horario preferido** no se implementa como campo: solo deben mostrarse bloques de
   atención confirmados y no hay ninguno.
5. **Columna "Condición de publicación"** de la tabla de evidencia: es guía editorial
   interna, no copy visible. Se publica solo la descripción visible.
6. Se omite `og:image` y no se declara `LocalBusiness`, dirección, teléfono, horario,
   `areaServed` ni `logo` en el JSON-LD porque esos datos no están confirmados.
7. **Encabezado del escenario de parcela.** `WEB-COPY.md` §4 dice
   `Menos puntos ciegos en una propiedad dispersa`. Es un comparativo sin línea base,
   métrica ni caso autorizado, así que se reemplazó por la formulación de proceso
   `Revisar condiciones en una propiedad dispersa`. El cuerpo del escenario no cambia.
   Corresponde a `WEB-SEO-CLAIMS-REVIEW.md` I-02.
8. **Rótulo del bloque de caso.** `WEB-COPY.md` §6 propone
   `CASO AUTORIZADO / [PENDIENTE DE MEDICIÓN]`, que al escanear puede leerse como un
   caso real. Se publica como `Estructura de caso / AÚN SIN DATOS`, con
   `EJEMPLO DE MÉTODO` sobre el título y una línea que explica que los campos siguen
   vacíos a propósito. Corresponde a `WEB-CRO-REVIEW.md` I-03.
9. **Duración del formulario.** Se retiró
   `Completar este formulario toma aproximadamente 2–3 minutos`: no hay medición con
   usuarios y el paso 1 cambió de largo. En su lugar va
   `Completar este formulario requiere algunos datos del proyecto y contacto`.
   Corresponde a `WEB-SEO-CLAIMS-REVIEW.md` I-05.
10. **Campos del paso 1.** El copy §10 lista los nueve campos como un bloque. Aquí
    `tipo`, `etapa` y equipos existentes quedan opcionales y plegados, y
    `profesional a cargo` es condicional. Las etiquetas visibles no cambian. La ayuda de
    prioridades se acortó a `Elige entre 1 y 3 opciones.` porque las opciones ya están a
    la vista como checkboxes. Corresponde a `WEB-CRO-REVIEW.md` I-01.
11. **Respaldo.** Se añadió al activo `RESPALDO` la frase
    `Un respaldo no equivale a una restauración probada, salvo que el alcance incluya esa
    prueba`, para que el límite quede junto al claim. Corresponde a
    `WEB-SEO-CLAIMS-REVIEW.md` I-03.

## Antes de publicar

1. Confirmar el dominio y reemplazar el canonical provisional `https://www.cromosystems.cl/`
   en `<link rel="canonical">`, `og:url` y los tres `@id` del JSON-LD.
2. Quitar `<meta name="robots" content="noindex, nofollow">`.
3. Conectar un backend con validación de servidor, saneamiento, límite de longitud,
   protección antiabuso no invasiva y registro de consentimiento con marca de tiempo,
   origen y versión de política. La validación de cliente orienta; no se puede confiar.
4. Restaurar el copy de confirmación y asignar el correlativo `CS-LEAD-26-###`.
5. Publicar Política de Privacidad y Términos, y enlazarlos donde hoy dice
   `[PENDIENTE DE URL]`.
6. Completar área de atención, horario, teléfono y correo del pie.
7. Auto-alojar IBM Plex Sans y JetBrains Mono.
8. Reemplazar el bloque `Estructura de caso / AÚN SIN DATOS` por un caso con
   autorización escrita, o mantenerlo rotulado como `EJEMPLO DE MÉTODO`.
9. Producir una imagen propia para `og:image` y para las secciones que hoy son solo
   texto, sin IP, QR, credenciales, direcciones ni rostros reconocibles.
10. Agregar `sitemap.xml`, `robots.txt` y Search Console.
11. Cambiar los `href` de contexto de `index.html?contexto=…#contacto` a
    `/?contexto=…#contacto` si el sitio se sirve en la raíz del dominio.

## Hallazgos de revisión que siguen abiertos

No se implementaron aquí porque dependen de decisiones de backend, legales, operativas o
de material propio que este MVP no puede resolver:

- **Recepción real del lead y confirmación con código** (`WEB-CRO-REVIEW.md` B-01,
  `WEB-SEO-CLAIMS-REVIEW.md` B-02). El formulario sigue siendo una demo local.
- **Política de Privacidad, Términos y datos operativos del pie** (B-02 en ambas
  revisiones, I-04 de SEO). Los `[PENDIENTE DE URL]` y `[PENDIENTE DE CONFIRMACIÓN]`
  se mantienen a propósito: no se inventa un canal ni una URL legal.
- **Localización de Santiago en title, meta y hero** (`WEB-SEO-CLAIMS-REVIEW.md` I-01).
  Requiere área de servicio, traslados y soporte confirmados.
- **Razón social, dominio y aviso de derechos** (`WEB-SEO-CLAIMS-REVIEW.md` I-06).
- **Artefacto visual de evidencia y alternativa de aprendizaje**
  (`WEB-CRO-REVIEW.md` I-04, I-05). Exigen material propio autorizado; no se usa stock,
  renders ni logos de fabricantes.
- **QA ejecutada**: axe/Lighthouse, teclado, lector de pantalla, zoom al 200 % y medición
  real en 320/360/390/768/1280 px. Las reglas responsive están escritas y revisadas de
  forma estática, pero no se han medido en dispositivos.
