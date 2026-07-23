# Cromo Systems — Brief operativo para Claude Design

*Instrucciones autocontenidas para Claude Design / Claude Code al proponer la landing primaria Decide/Learn · 23 de julio de 2026 · Estado: final para ejecución controlada*

**Propósito:** Dirigir una propuesta de landing para **Cromo Systems** que traduzca el sistema visual aprobado y el copy autorizado en una superficie residencial de alto estándar, sobria, técnica y verificable. Este brief define qué cargar, qué producir, qué no inventar y cómo validar el resultado antes de entregarlo.

---

## Resumen ejecutivo

La propuesta debe presentar automatización, energía y seguridad residencial como una práctica de **diseño, integración y documentación**, no como una exhibición de gadgets. La superficie primaria es **Decide/Learn**: el eje de decisión conduce a `Solicitar diagnóstico`; el eje de aprendizaje entrega método, evidencia y límites técnicos para evaluar la propuesta.

Claude debe construir desde `design/DESIGN.md` y usar únicamente copy autorizado de `WEB-COPY.md`. No se permiten fotos de stock, dashboards simulados, métricas o casos inventados, marcas de fabricantes, recursos externos ni tratamientos decorativos que contradigan el sistema.

---

## 1. Instrucción de arranque para Claude Design / Claude Code

Antes de diseñar, **detén la ejecución y lee estos archivos completos, en este orden**:

1. `design/DESIGN.md` — sistema normativo: tokens, reglas identificadas, componentes y prohibiciones.
2. `WEB-COPY.md` — única fuente de copy, CTA, límites de claims, privacidad y datos pendientes.
3. `WEB-CLAUDE-CODE-AUDIT.md` — restricciones auditadas del MVP y secuencia de verificación.
4. Este archivo: `design/claude-design-brief.md`.
5. El archivo de destino, si ya existe, antes de modificarlo.

Al iniciar, confirma internamente esta cadena de autoridad y resuelve conflictos en este orden:

| Prioridad | Fuente | Uso obligatorio |
|---:|---|---|
| 1 | Manual de marca Cromo Systems v0.1 | Autoridad final de identidad, voz y límites. |
| 2 | `design/DESIGN.md` | Sistema operativo de tokens, componentes y composición. |
| 3 | `WEB-COPY.md` | Copy visible, microcopy, claims, CTA y límites cercanos. |
| 4 | `WEB-CLAUDE-CODE-AUDIT.md` | Restricciones de alcance, privacidad, recursos y QA. |
| 5 | Este brief | Dirección concreta de la propuesta Decide/Learn. |

> **Regla de parada:** si falta una fuente, un token, un activo propio autorizado o un dato necesario para un claim, no lo sustituyas con una aproximación. Usa el marcador correspondiente —por ejemplo, `[PENDIENTE DE MEDICIÓN]`, `[PENDIENTE DE CONFIRMACIÓN]` o `[PENDIENTE DE PRODUCCIÓN]`— y declara el límite junto al contenido afectado.

### Prompt de ejecución reutilizable

Usa este encargo como punto de partida en Claude Code o Claude Design:

```text
Trabaja únicamente dentro del alcance declarado para la propuesta Cromo Systems.

Primero lee completos: design/DESIGN.md, WEB-COPY.md,
WEB-CLAUDE-CODE-AUDIT.md, design/claude-design-brief.md y el archivo destino.
Resume las reglas C1–C7, T1–T5, L1–L6, E1–E5 y S1–S5 que afectarán la propuesta
antes de editar. Usa solo los tokens y componentes definidos por DESIGN.md y
solo el copy autorizado por WEB-COPY.md.

Diseña una landing residencial de alto estándar para la superficie Decide/Learn.
El eje Decide debe conducir a la única CTA primaria visible por viewport:
“Solicitar diagnóstico”. El eje Learn debe demostrar método, entregables y
límites sin usar casos, métricas, dashboards ni estados en vivo inventados.

Construye una composición editorial asimétrica de 12 columnas, con bloques
escalonados y aire generoso; no reproduzcas una plantilla de héroe centrado ni
una grilla genérica de tarjetas iguales. Genera diagramas técnicos abstractos
propios con CSS o SVG inline, y reserva zonas de fotografía propia futura con
etiquetas honestas. No cargues imágenes, fuentes, iconos, scripts ni estilos
externos.

No modifiques ningún archivo fuera del alcance indicado. Antes de entregar,
valida la checklist de este brief, inspecciona el diff y reporta solamente
pruebas realmente ejecutadas y desviaciones documentadas.
```

---

## 2. Resultado que se debe proponer

### Objetivo de la experiencia

La página debe leerse como una **carpeta técnica editorial** de una instalación bien resuelta: precisión documental, metal con poca luz, códigos, figuras numeradas, evidencia y espacio. Debe comunicar que Cromo Systems revisa condiciones, integra funciones definidas y documenta lo acordado; no debe actuar como catálogo de productos ni como panel operativo.

La experiencia debe equilibrar dos tareas visibles:

| Eje | Función | Contenido dominante |
|---|---|---|
| **Decide** | Conducir una decisión informada. | Titular, contexto de la casa/proyecto, viabilidad y CTA primaria. |
| **Learn** | Permitir evaluar el método antes de contactar. | Etapas, diagramas abstractos, entregables, dependencias y límites. |

**La jerarquía no es una plantilla de dos columnas rígidas.** Decide debe dominar el inicio y las decisiones de lectura; Learn debe aparecer desplazado, como evidencia que acompaña. La composición puede alternar rieles, figuras fuera de eje, paneles angostos y bloques de contenido de distinto ancho, siempre dentro de la retícula y del orden lógico de lectura.

### Propuesta mínima de contenido

La propuesta debe usar la fuente autorizada y ordenar la landing, como mínimo, en estas bandas. No es obligatorio replicar una estructura existente, pero sí conservar la intención y los límites de cada banda.

1. **Inicio / decisión**
   - Eyebrow: `CS / INTEGRACIÓN RESIDENCIAL`.
   - Titular autorizado: `Sistemas para que la casa funcione con orden`.
   - Presentación de acceso, iluminación, clima, riego, energía y alertas, con el párrafo de compatibilidad por modelo y función.
   - CTA primaria: `Solicitar diagnóstico`.
   - CTA secundaria de evaluación: `Ver cómo trabajamos`.

2. **Promesa verificable / criterio**
   - Explicar operación clara, respaldo manual y documentación de alcance usando el copy de `WEB-COPY.md`.
   - Incorporar un `bloque-limite` junto al claim: la propuesta debe indicar función, equipos y comportamiento frente a conexión, cuenta externa o alimentación.

3. **Método / cinco etapas**
   - Presentar Precalificación, Levantamiento, Diseño, Pruebas y Entrega y revisión como un ledger o secuencia documental, no como cinco tarjetas idénticas.
   - La lectura debe poder identificar etapa, descripción y dependencia sin usar iconos de relleno.

4. **Evidencia / no catálogo**
   - Mostrar `UNILINEAL`, `MAPA DE RED`, `INVENTARIO`, `RESPALDO` y `PRUEBAS` como evidencia de método.
   - Todo contenido no correspondiente a una instalación autorizada debe decir `EJEMPLO DE MÉTODO` o usar el pie de figura obligatorio.

5. **Límites y contacto**
   - Hacer visibles los límites de compatibilidad, Internet/cloud, electricidad, seguridad, privacidad y energía del copy maestro.
   - Mantener el contacto como una siguiente decisión, sin simular recepción, disponibilidad, código correlativo ni operación de backend.

---

## 3. Sistema visual que debe cargarse y respetarse

### Tokens y materialidad

Implementa los valores de `design/DESIGN.md` como variables CSS espejo y no introduzcas valores visuales arbitrarios.

| Categoría | Decisión obligatoria |
|---|---|
| Fondo | `color.vanta` como superficie predeterminada. |
| Profundidad | Solo el paso Vanta → Grafito, con borde de 1 px; nunca sombras ni blur. |
| Texto | `color.cromo` para lectura y `color.especular` para titulares o un dato clave. Nunca cuerpo en Acero. |
| Acento | Una sola familia por pieza: Señal para estado/acción o Brasa solo en la excepción de escenas de iluminación. Máximo 5 % del área. |
| Tipografía | Archivo Expanded para displays, IBM Plex Sans para cuerpo y JetBrains Mono para códigos, etiquetas y cifras técnicas; usar fallback local/sistema si no existen activos autoalojados. |
| Geometría | Retícula de 8 px, radio único de 2 px y bordes de 1 px. |

> **No sustituir la ausencia de Archivo Expanded por una CDN.** Mantén el fallback aprobado y marca la dependencia de activo si la implementación requiere una decisión posterior.

### Composición, densidad y ritmo

- Trabaja sobre una **retícula de 12 columnas** con anchos desiguales y desfases verticales en múltiplos de 8 px.
- Construye una asimetría deliberada: título y CTA pueden ocupar un bloque dominante; la figura, el ledger o el límite pueden quedar fuera de eje. El ojo debe avanzar en zigzag, no por una columna central uniforme.
- El espacio entre secciones no baja de `space.8` (64 px); en desktop se prefiere `space.12` (96 px). **Ante la duda, elimina contenido visual antes de agregar relleno.**
- Alterna el ritmo: bloque ancho de decisión → panel angosto de criterio → figura técnica → texto con límite. Ninguna sección debe repetir exactamente el patrón anterior.
- Conserva un ancho de lectura de 65–75 caracteres. El monoespaciado sirve para datos y rótulos, no para convertir la interfaz en un terminal.
- Todo divisor requiere una etiqueta útil en mono (`01 · SISTEMA`, `FIGURA 02`, `MÉTODO / 05 ETAPAS`). Un divisor sin información se elimina.
- No uses más de una acción primaria visible por viewport. La única superficie llena de acento corresponde a esa acción.

---

## 4. Recursos visuales permitidos: método, no simulación

Ante la falta de fotografía propia aprobada, compón la superficie con recursos **propios**, planos y auditables. Se permiten CSS y SVG inline; no se permiten recursos remotos.

### Diagramas técnicos abstractos

Usa el componente `diagrama-tecnico` para construir las siguientes figuras sin representar un proyecto real:

| Figura | Estructura visual | Regla de honestidad |
|---|---|---|
| Unilineal de energía | Nodos rectangulares, bus de alimentación y una única ruta resaltada en Señal. | No usar cargas, autonomías, marcas, modelos ni cifras concretas. |
| Mapa de red | Nodo central, relaciones locales en línea continua y dependencia externa en discontinuo. | Etiquetar la dependencia; no exponer IP, QR, hosts, credenciales ni topología de cliente. |
| Panel de evidencia | Ledger de documentos y pruebas: UNILINEAL, MAPA DE RED, INVENTARIO, RESPALDO, PRUEBAS. | Explica el tipo de documento; no simula telemetría, gráficos ni estado en vivo. |
| Trama arquitectónica | Líneas finas de Grafito/Acero sobre Vanta dentro de una zona reservada. | Funciona como estructura de plano, no como adorno ni degradado. |

Para cada figura:

- Usa trazos de **1–1.5 px**, nodos rectangulares con radio de 2 px y rótulos en `type.dato`.
- Limita Señal a una ruta, estado o etiqueta por figura; no lo combines con Brasa.
- Incluye este pie o uno equivalente con el mismo sentido: `FIGURA NN · DIAGRAMA ABSTRACTO DE MÉTODO · NO CORRESPONDE A UN PROYECTO`.
- No uses marcas, dispositivos reconocibles, resultados, nombres de cliente ni métricas ficticias.

### Zonas para fotografía propia futura

Usa `zona-imagen-propia` cuando la composición requiera una imagen. La zona debe conservar proporción apaisada, borde de 1 px, trama arquitectónica plana y etiqueta visible.

```text
[ZONA DE IMAGEN PROPIA]
CASA HABITADA DE NOCHE / DETALLE DE INSTALACIÓN / TERRITORIO
[PENDIENTE DE PRODUCCIÓN]
```

No reemplaces esas zonas con stock, renders inmobiliarios, familias con tablets, manos usando apps, hologramas ni Wi‑Fi dibujado. Ninguna imagen puede incluir rostros identificables, direcciones, IP, QR, credenciales, datos de presencia ni información operativa sin autorización escrita.

---

## 5. Copy, claims y seguridad de contenido

### Voz

Escribe como un ingeniero que ya revisó condiciones: frases breves, una idea por oración, resultado antes que protocolo. Nombra el resultado controlable —acceso, riego, clima, respaldo, coordinación— y mantén las condiciones cercanas a la afirmación que acotan.

No uses emojis, signos de exclamación, superlativos, mayúsculas de énfasis ni las frases prohibidas. `Domótica` puede aparecer de forma descriptiva o SEO cuando aporte precisión, pero nunca como titular. La primera aparición de la marca debe ser `Cromo Systems`; después puede usarse `Cromo` en cuerpo.

### Reglas de claims

- El copy visible se toma de `WEB-COPY.md`; no se reescribe para hacer una promesa más fuerte.
- La compatibilidad depende de **modelo exacto, firmware, función, entorno y dependencia externa**. Una marca sola no prueba integración.
- No prometas ahorro, autonomía, continuidad, cobertura, certificación, soporte, respuesta o disponibilidad sin condiciones verificables.
- Todo número o resultado exige qué se midió, condiciones, período, equipos incluidos, exclusiones y fecha de revisión. Si falta alguno, usa `[PENDIENTE DE MEDICIÓN]`.
- Los límites de Internet/cloud, alimentación, cuenta externa, modelo, respaldo o profesional habilitado viven junto al claim, no escondidos en un pie general.
- La integración no sustituye trabajos eléctricos regulados, certificaciones, vigilancia humana, centrales profesionales, seguros ni respuesta de emergencia.

### Estado del MVP y privacidad

- Es una **prepublicación estática**: conservar `noindex, nofollow` mientras no se complete el checklist de publicación.
- No simules envío de formulario, recepción de lead, correlativo, disponibilidad, horarios, teléfono, WhatsApp, dirección, área de atención, SLA, precios, certificados, política o términos definitivos.
- No solicitar ni exponer contraseñas, tokens, códigos de acceso, dirección exacta, imágenes de cámaras ni datos de presencia.
- Si se muestra una futura captura de datos, el consentimiento de respuesta es obligatorio, independiente del opt-in comercial y nunca premarcado. La validación real, sanitización, límites y antiabuso son tareas de backend futuro.

---

## 6. Prohibiciones no negociables

No se usa, no se dibuja, no se simula:

- Fotografías de stock o imágenes genéricas de familias, tablets, manos, hologramas, renders con Wi‑Fi o dispositivos como protagonista.
- Casos de cliente sin autorización, testimonios ficticios, resultados no medidos o proyectos presentados como reales.
- Logotipos, marcas o compatibilidades de fabricantes como argumento de prueba.
- Dashboards falsos, gráficos de telemetría, indicadores “en vivo”, métricas, porcentajes, tiempos de respuesta, autonomías o coberturas inventadas.
- Gradientes decorativos o funcionales, glassmorphism, transparencias difusas, blur, resplandores, sombras suaves, escalados o movimientos ornamentales.
- Iconos como relleno, bibliotecas de pictogramas, emojis, píldoras, círculos decorativos o radios mayores a 2 px.
- Héroe centrado, filas de tarjetas idénticas, composición simétrica dominante o acumulación de módulos sin jerarquía editorial.
- Fuentes por CDN, imágenes remotas, hotlinks, scripts, estilos o iconos externos.
- Precios, promesas comerciales, disponibilidad `24/7`, “garantizado”, “sin fallas”, “protegido al 100%”, “soluciones inteligentes”, “la casa del futuro”, “revolucionario”, “disruptivo”, “tecnología de punta”, “llave en mano” o “a la vanguardia”.

---

## 7. Responsive y accesibilidad

La propuesta debe conservar la jerarquía Decide/Learn sin depender de una pantalla amplia.

| Contexto | Requisito de ejecución |
|---|---|
| Desktop | Retícula de 12 columnas, asimetría y desfases conservados; aire de `space.12` cuando corresponda. |
| Tablet | Reorganizar bloques sin convertir la composición en una tarjeta uniforme; mantener evidencia cercana a su claim. |
| Móvil desde 320 px | Una columna en orden lógico de lectura; los desfases desaparecen y el riel de códigos pasa a etiqueta de encabezado. Cero overflow horizontal. |
| Interacción | Objetivos táctiles de al menos 44 px; una CTA primaria visible por viewport; secundarios sin competir. |
| Teclado | Landmarks semánticos, enlace de salto, orden de foco lógico y foco visible: contorno de 2 px en Señal con `outline-offset: 3px`. |
| Movimiento | Respetar `prefers-reduced-motion`; no usar movimiento como única señal de estado o jerarquía. |
| Lectura | Contraste de texto suficiente, etiquetas de figuras legibles y estructura HTML que un lector de pantalla pueda recorrer. |

---

## 8. Entrega y verificación obligatoria

### Entregables de una propuesta

Al finalizar una propuesta, Claude debe entregar:

1. La pieza en el **archivo de destino expresamente autorizado** y ninguna modificación adicional fuera del alcance.
2. Variables CSS espejo de los tokens utilizados y SVG/CSS inline para todos los recursos abstractos.
3. Una lista corta de secciones/figuras implementadas y la regla de `DESIGN.md` que guía cualquier decisión no obvia.
4. Un registro de desviaciones, si existe, con motivo, fuente afectada y decisión pendiente. Sin registro, la desviación es un defecto.
5. Resultados reales de las verificaciones ejecutadas; no declarar una prueba como hecha si no se corrió.

### Checklist de aceptación

Antes de declarar la propuesta lista, verificar y marcar cada punto:

- [ ] Se leyeron `DESIGN.md`, `WEB-COPY.md`, la auditoría y este brief antes de editar.
- [ ] La pieza usa solo tokens, reglas y componentes definidos en `DESIGN.md`; las variables CSS espejo están presentes.
- [ ] La composición es editorial y asimétrica sobre 12 columnas; no hay héroe centrado ni filas de módulos idénticos como estructura dominante.
- [ ] Decide/Learn se entiende en el orden visual y semántico; hay una sola CTA primaria visible por viewport.
- [ ] Señal o Brasa, no ambos, son el único acento de la pieza; el acento ocupa ≤ 5 % del área y solo una superficie llena por pantalla.
- [ ] La profundidad se resuelve con Vanta/Grafito y borde de 1 px, sin sombras, blur, glassmorphism ni gradientes.
- [ ] Cada divisor está etiquetado; las cifras/códigos usan mono y el cuerpo mantiene una lectura de 65–75 caracteres.
- [ ] Los diagramas son CSS/SVG propios, con pie honesto y sin datos, métricas, marcas ni proyectos inventados.
- [ ] Las zonas visuales futuras dicen `[PENDIENTE DE PRODUCCIÓN]`; no hay fotografía de stock, recurso remoto ni CDN.
- [ ] El copy proviene de `WEB-COPY.md`; cada claim condicionado conserva su límite cercano y los datos no confirmados mantienen su marcador.
- [ ] No se introdujeron formularios falsos, datos operativos, precios, promesas, casos, logos ni declaraciones sin fuente.
- [ ] La interfaz tiene HTML semántico, skip link, foco visible, teclado, movimiento reducido y objetivos táctiles de 44 px.
- [ ] No existe overflow horizontal desde 320 px y el orden móvil preserva el sentido de lectura.
- [ ] La pieza conserva `noindex, nofollow` mientras siga siendo una prepublicación estática.
- [ ] Se revisó el diff y se ejecutaron las pruebas disponibles; cualquier desviación quedó documentada.

---

## Referencias

- [Sistema de diseño Cromo Systems](DESIGN.md) — tokens, reglas identificadas y componentes normativos.
- [Copy maestro web](../WEB-COPY.md) — fuente autorizada de contenido, claims, CTA, privacidad y límites.
- [Auditoría de referencias y flujo de Claude Code](../WEB-CLAUDE-CODE-AUDIT.md) — restricciones del MVP, alcance y verificación.
- [Manual de marca Cromo Systems](file:///home/lalito/.hermes/cache/documents/doc_746e60869c93_cromo-systems-manual-de-marca.md) — autoridad de identidad, voz, fotografía y límites editoriales.
