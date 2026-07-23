/* ============================================================================
   Cromo Systems — fondo líquido cyberpunk del hero (WebGL, sin dependencias)
   ----------------------------------------------------------------------------
   Alcance deliberado de este módulo:
   - Dibuja SOLO dentro de `.section--hero`. Nada fuera del hero se toca.
   - El canvas es decorativo: `aria-hidden`, sin foco, sin puntero, detrás del
     contenido. Si este archivo no carga, el hero sigue siendo legible.
   - Sin red, sin dependencias, sin fuentes externas, sin almacenamiento.

   Comportamiento exigido:
   - Pausa el rAF cuando la pestaña se oculta o el hero sale del viewport.
   - `prefers-reduced-motion: reduce` dibuja un único frame estático y no
     mantiene ningún bucle de animación.
   - Si falta WebGL, falla la compilación/enlace del shader o se pierde el
     contexto, se activa la clase `is-fallback` y el degradado CSS local ocupa
     su lugar.
   ============================================================================ */

(function () {
  'use strict';

  var hero = document.querySelector('.section--hero');
  if (!hero) return;

  var canvas = hero.querySelector('.hero-canvas');
  if (!canvas) return;

  /* ------------------------------------------------------------- ajustes --- */

  var SPEED      = 0.70;  // velocidad global del flujo
  var ZOOM       = 1.45;  // escala de los remolinos
  var GLITCH     = 0.35;  // ráfagas de glitch, contenidas (0 = sin glitch)
  var CHROMA     = 0.10;  // aberración cromática de los filamentos
  var GAIN       = 0.85;  // intensidad global del campo sobre el fondo Vanta

  /* Resolución interna conservadora: el hero es decorativo y no debe competir
     por GPU con el resto de la página. En pantallas angostas baja todavía más. */
  var SCALE_DESKTOP = 0.50;   // límite operativo: nunca por encima de 0,55
  var SCALE_MOBILE  = 0.40;
  var MOBILE_MAX_PX = 700;

  var GL_OPTS = {
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
    powerPreference: 'low-power'
  };

  /** Único camino de degradación: el CSS local dibuja el campo y oculta el canvas. */
  function useFallback() {
    hero.classList.add('is-fallback');
  }

  if (!window.requestAnimationFrame) { useFallback(); return; }

  /* --------------------------------------------------------------- contexto --- */

  var gl = null;
  try {
    gl = canvas.getContext('webgl', GL_OPTS) || canvas.getContext('experimental-webgl', GL_OPTS);
  } catch (e) {
    gl = null;
  }
  if (!gl) { useFallback(); return; }

  /* --------------------------------------------------------------- shaders --- */

  var VERT = [
    'attribute vec2 aPos;',
    'void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }'
  ].join('\n');

  var FRAG = [
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    'precision highp float;',
    '#else',
    'precision mediump float;',
    '#endif',

    'uniform vec2  uRes;',
    'uniform float uTime;',
    'uniform float uZoom;',
    'uniform float uGlitch;',
    'uniform float uChroma;',
    'uniform float uGain;',

    /* Paleta neón del campo líquido y fondo Vanta de la pieza (#08090B). */
    '#define NEON_MAGENTA vec3(1.00, 0.17, 0.84)',
    '#define NEON_CYAN    vec3(0.05, 0.94, 1.00)',
    '#define NEON_VIOLET  vec3(0.45, 0.24, 1.00)',
    '#define VANTA        vec3(0.031, 0.035, 0.043)',

    'mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }',

    'float hash(vec2 p){',
    '  p = fract(p * vec2(234.34, 435.345));',
    '  p += dot(p, p + 34.23);',
    '  return fract(p.x * p.y);',
    '}',

    'float vnoise(vec2 p){',
    '  vec2 i = floor(p), f = fract(p);',
    '  f = f * f * (3.0 - 2.0 * f);',
    '  float a = hash(i);',
    '  float b = hash(i + vec2(1.0, 0.0));',
    '  float c = hash(i + vec2(0.0, 1.0));',
    '  float d = hash(i + vec2(1.0, 1.0));',
    '  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);',
    '}',

    'float fbm(vec2 p){',
    '  float v = 0.0, a = 0.5;',
    '  mat2 m = rot(0.62);',
    '  for(int i = 0; i < 5; i++){',
    '    v += a * vnoise(p);',
    '    p = m * p * 2.03;',
    '    a *= 0.5;',
    '  }',
    '  return v;',
    '}',

    /* Filamento especular fino a partir de una fase. */
    'float ridge(float x, float k){ return pow(1.0 - abs(sin(x)), k); }',

    'void main(){',
    '  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;',
    '  float t = uTime * 0.05;',

    /* Glitch contenido: ráfagas breves y poco frecuentes que desplazan filas. */
    '  float gt    = floor(uTime * 4.0);',
    '  float burst = step(0.975, hash(vec2(gt, 3.7))) * step(0.001, uGlitch);',
    '  if (burst > 0.5) {',
    '    float row   = floor((uv.y + 1.0) * 22.0);',
    '    float pick  = step(0.62, hash(vec2(row + 13.0, gt)));',
    '    float shift = (hash(vec2(row, gt)) - 0.5) * 0.055 * uGlitch;',
    '    uv.x += shift * pick;',
    '  }',

    '  vec2 p = uv * uZoom;',

    /* Deformación de dominio en dos capas: el "líquido". */
    '  vec2 q = vec2(',
    '    fbm(p + vec2(0.0, 0.8 * t)),',
    '    fbm(p + vec2(5.2, 1.3) - 0.6 * t)',
    '  );',
    '  vec2 r = vec2(',
    '    fbm(p + 2.2 * q + vec2(1.7, 9.2) + 0.5 * t),',
    '    fbm(p + 2.2 * q + vec2(8.3, 2.8) - 0.4 * t)',
    '  );',
    '  float f = fbm(p + 2.6 * r);',

    /* Color del campo continuo: eje violeta → magenta → cian sobre todo el
       lienzo, con energía alta pero sin picos duros. */
    '  float s1 = smoothstep(0.20, 0.80, f);',
    '  float s2 = smoothstep(0.28, 0.84, r.y);',
    '  vec3 col = mix(NEON_VIOLET, NEON_MAGENTA, s1);',
    '  col = mix(col, NEON_CYAN, s2 * 0.8);',
    '  col *= 0.30 + 1.30 * f;',

    /* Filamentos con aberración cromática (fringe RGB). */
    '  float a1 = f * 11.0 + r.x * 6.0 - t * 2.2;',
    '  float a2 = f * 24.0 + q.y * 8.0 + t * 1.5;',
    '  vec3 fil1 = vec3(ridge(a1 + uChroma, 3.0), ridge(a1, 3.0), ridge(a1 - uChroma, 3.0));',
    '  vec3 fil2 = vec3(ridge(a2 + uChroma, 6.0), ridge(a2, 6.0), ridge(a2 - uChroma, 6.0)) * 0.55;',
    '  vec3 specTint = mix(vec3(1.0, 0.65, 1.0), vec3(0.6, 1.0, 1.0), s1);',
    '  col += (fil1 + fil2) * specTint;',

    /* Bruma neón de base sobre Vanta: incluso las zonas calmas del líquido
       conservan color, para que el campo siga presente detrás del texto. */
    '  float haze = fbm(uv * 2.2 + 11.0);',
    '  vec3 bg = VANTA;',
    '  bg += NEON_VIOLET * haze * 0.045;',
    '  bg += NEON_CYAN * pow(haze, 3.0) * 0.040;',

    '  vec3 fx = col;',

    /* Línea de barrido durante la ráfaga de glitch. */
    '  if (burst > 0.5) {',
    '    float yLine = hash(vec2(gt, 9.1)) * 1.2 - 0.6;',
    '    fx += NEON_CYAN * exp(-abs(uv.y - yLine) * 150.0) * 0.45 * uGlitch;',
    '  }',

    /* Viñeta suave: atenúa apenas los bordes para empalmar con el Vanta del
       resto de la página sin apagar el campo en ninguna zona del hero. */
    '  float vig = smoothstep(1.65, 0.35, length(uv));',
    '  fx *= mix(0.55, 1.0, vig);',

    /* Hombro tonal exponencial: permite subir la energía sin recorte duro; los
       picos de los filamentos se comprimen en vez de saturar en blanco. */
    '  vec3 outCol = bg + fx * uGain;',
    '  outCol = 1.0 - exp(-outCol * 1.15);',
    '  gl_FragColor = vec4(outCol, 1.0);',
    '}'
  ].join('\n');

  function compile(type, src) {
    var s = gl.createShader(type);
    if (!s) return null;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  var vs = compile(gl.VERTEX_SHADER, VERT);
  var fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) { useFallback(); return; }

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { useFallback(); return; }
  gl.useProgram(prog);

  /* Un solo triángulo que cubre el viewport. */
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var locPos = gl.getAttribLocation(prog, 'aPos');
  gl.enableVertexAttribArray(locPos);
  gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

  var uRes    = gl.getUniformLocation(prog, 'uRes');
  var uTime   = gl.getUniformLocation(prog, 'uTime');
  var uZoom   = gl.getUniformLocation(prog, 'uZoom');
  var uGlitch = gl.getUniformLocation(prog, 'uGlitch');
  var uChroma = gl.getUniformLocation(prog, 'uChroma');
  var uGain   = gl.getUniformLocation(prog, 'uGain');

  gl.uniform1f(uZoom, ZOOM);
  gl.uniform1f(uGlitch, GLITCH);
  gl.uniform1f(uChroma, CHROMA);
  gl.uniform1f(uGain, GAIN);

  /* ------------------------------------------- tamaño / resolución interna --- */

  function renderScale() {
    return window.innerWidth <= MOBILE_MAX_PX ? SCALE_MOBILE : SCALE_DESKTOP;
  }

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2) * renderScale();
    var w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
    var h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    }
  }

  /* ------------------------------------------ bucle con pausas y reduced motion --- */

  var reduceQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var reduced = !!(reduceQuery && reduceQuery.matches);

  var visible = !document.hidden;
  var inView  = true;
  var lost    = false;
  var rafId   = null;
  var elapsed = 0;
  var last    = 0;

  function nowMs() {
    return (window.performance && window.performance.now) ? window.performance.now() : Date.now();
  }

  /** El bucle continuo solo procede con movimiento permitido, pestaña visible,
      hero a la vista y contexto vivo. En cualquier otro caso se dibuja un frame
      y no se encadena otro. */
  function shouldLoop() {
    return !reduced && visible && inView && !lost;
  }

  function frame(now) {
    rafId = null;
    if (lost) return;
    // Si el estado cambió entre el encolado y este callback (la pestaña se
    // ocultó o el hero salió del viewport), no se dibuja: el redibujado lo
    // hace el propio evento de reentrada.
    if (!visible || !inView) return;

    var dt = Math.min(now - last, 100);
    last = now;
    // Con movimiento reducido el tiempo no avanza: el frame es siempre el mismo.
    if (!reduced) elapsed += dt * 0.001 * SPEED;

    resize();
    gl.uniform1f(uTime, elapsed);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (shouldLoop()) rafId = window.requestAnimationFrame(frame);
  }

  /** Punto de entrada único del dibujo y único guardia de la pausa: con la
      pestaña oculta o el hero fuera del viewport no se encola ningún rAF, así
      que tampoco se dibuja, venga la llamada de donde venga (resize, cambio de
      preferencia de movimiento o arranque). El guardia de `rafId` evita encolar
      dos bucles cuando varios eventos coinciden (visibilidad + viewport + resize). */
  function schedule() {
    if (rafId !== null || lost) return;
    if (!visible || !inView) return;
    last = nowMs();
    rafId = window.requestAnimationFrame(frame);
  }

  function stop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  /* Un solo listener por evento; ninguno se registra dos veces. */

  window.addEventListener('resize', function () {
    // En pausa esto no encola nada: el buffer se reajusta y se redibuja en la
    // reentrada, que es el único momento en que el frame se vería.
    schedule();
  }, { passive: true });

  document.addEventListener('visibilitychange', function () {
    visible = !document.hidden;
    if (!visible) { stop(); return; }
    // Al volver siempre se redibuja: con movimiento reducido es un único frame
    // estático (que además reajusta el tamaño si hubo resize en pausa); si no,
    // el bucle se reanuda solo.
    schedule();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[entries.length - 1].isIntersecting;
      if (!inView) { stop(); return; }
      schedule();
    }).observe(hero);
  }

  // Contexto perdido: no se intenta restaurar, se degrada al fondo CSS local.
  canvas.addEventListener('webglcontextlost', function (ev) {
    ev.preventDefault();
    lost = true;
    stop();
    useFallback();
  });

  // Si la preferencia de movimiento cambia en caliente, el bucle la sigue.
  if (reduceQuery) {
    var syncMotion = function (ev) {
      reduced = ev.matches;
      if (reduced) stop();
      schedule(); // continúa el bucle, deja un único frame estático, o nada si está en pausa
    };
    if (reduceQuery.addEventListener) reduceQuery.addEventListener('change', syncMotion);
    else if (reduceQuery.addListener) reduceQuery.addListener(syncMotion);
  }

  // Con movimiento reducido esto dibuja un único frame y termina. Si la página
  // arranca oculta, no dibuja nada: lo hará el primer `visibilitychange`.
  schedule();
})();
