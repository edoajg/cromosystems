/* ============================================================================
   Cromo Systems — comportamiento del MVP estático
   ----------------------------------------------------------------------------
   Alcance deliberado de esta versión:
   - Navegación móvil accesible.
   - Formulario de precalificación en dos pasos con validación SOLO de cliente.
   - Sin backend, sin red, sin almacenamiento persistente, sin terceros.
     Nada de lo que se escribe sale del navegador.
   La validación de cliente orienta; la validación que se puede confiar es la del
   servidor y todavía no existe (ver README.md, "Brechas de lanzamiento").
   ============================================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------ utilidades --- */

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /**
   * Instrumentación mínima. No transporta nada ni toca la red: emite un evento
   * del DOM con nombres estables para que una herramienta de analítica pueda
   * conectarse después. Nunca incluye nombre, correo, teléfono ni texto libre.
   */
  function track(name, props) {
    var detail = { event: name, props: props || {} };
    document.dispatchEvent(new CustomEvent('cs:analytics', { detail: detail }));
  }

  /* ------------------------------------------------------- navegación móvil --- */

  var toggle = $('#nav-toggle');
  var nav = $('#nav-primary');

  function setNav(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function navIsOpen() {
    return !!nav && nav.classList.contains('is-open');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(!navIsOpen());
    });

    // Al elegir un destino, el panel se cierra y no tapa el contenido.
    $$('a', nav).forEach(function (link) {
      link.addEventListener('click', function () { setNav(false); });
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && navIsOpen()) {
        setNav(false);
        toggle.focus();
      }
    });

    // En escritorio el panel siempre está visible: se limpia el estado abierto.
    var desktop = window.matchMedia('(min-width: 62rem)');
    var syncViewport = function (mq) { if (mq.matches) setNav(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', syncViewport);
    else if (desktop.addListener) desktop.addListener(syncViewport);
  }

  /* -------------------------------------------------------------- CTA track --- */

  /* Los CTA segmentados llevan `?contexto=parcela|residencia|proyecto#contacto`.
     El parámetro es un enum cerrado —nunca texto libre ni datos personales— y con
     JavaScript se aplica sin recargar. Sin JavaScript el enlace sigue siendo una
     navegación válida hacia el formulario, solo que sin preselección. */
  $$('[data-cta]').forEach(function (el) {
    el.addEventListener('click', function (ev) {
      var wanted = el.getAttribute('data-contexto') || '';
      track('cta_click', {
        cta: el.getAttribute('data-cta'),
        label: (el.textContent || '').trim(),
        contexto: wanted || contextKey()
      });
      if (wanted && applyContext(wanted)) {
        ev.preventDefault();
        rememberContextInUrl(wanted);
        goToContact();
      }
    });
  });

  /* --------------------------------------------- figuras de método animadas --- */

  /* Las dos figuras `data-animate` se dibujan una sola vez al entrar en pantalla.
     Todo el movimiento vive en styles.css; aquí solo se colocan las clases:
     `anim-ready` habilita el estado oculto inicial e `is-visible` dispara el
     dibujo. Sin IntersectionObserver no se oculta nada y las figuras quedan
     completas y estáticas, igual que sin JavaScript. */
  var diagrams = $$('.diagram[data-animate]');
  if (diagrams.length && 'IntersectionObserver' in window) {
    var diagramObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        diagramObserver.unobserve(entry.target);
      });
    }, { threshold: 0.35 });

    diagrams.forEach(function (fig) {
      fig.classList.add('anim-ready');
      diagramObserver.observe(fig);
    });
  }

  /* ------------------------------------------------------------- formulario --- */

  var form = $('#lead-form');
  if (!form) return;

  var step1 = $('#step-1');
  var step2 = $('#step-2');
  var confirmation = $('#confirmation');
  var progress = $('#form-progress');
  var progressLabel = $('#progress-label');
  var progressBar = $('#progress-bar');
  var progressFill = $('#progress-fill');
  var status = $('#form-status');

  var contactTitle  = $('#contacto-title');
  var routeSummary  = $('#route-summary');
  var routeValue    = $('#route-summary-value');
  var routeChange   = $('#route-summary-change');
  var prioWrap      = $('#field-prioridades');
  var prioMain      = $('#prioridades-main');
  var prioExtra     = $('#prioridades-extra');
  var optionalFields = $('#optional-fields');
  var prioMore = null;
  var optionalToggle = null;

  var MSG = {
    required:   'Completa este dato para continuar.',
    choose:     'Elige una opción para que podamos orientar la solicitud.',
    priorities: 'Selecciona entre 1 y 3 prioridades.',
    tooShort:   'Cuéntanos un poco más sobre el problema o el resultado que buscas.',
    email:      'Revisa el formato del correo.',
    phone:      'Revisa el teléfono e incluye los dígitos necesarios para contactarte.',
    consent:    'Necesitamos tu autorización para responder esta solicitud.',
    sensitive:  'No incluyas contraseñas, códigos de acceso, dirección exacta, imágenes de cámaras ni datos de presencia.'
  };

  /**
   * Heurística de datos sensibles. Es una ayuda, no un filtro de seguridad:
   * bloquea los patrones más frecuentes para que nadie pegue una credencial.
   */
  var SENSITIVE = [
    /contrase[ñn]a/i,
    /\bpasswords?\b/i,
    /\bpasswd\b/i,
    /\bclave\s+(de|del|wifi|wi-?fi|router|acceso|port[oó]n|alarma)/i,
    /\b(mi|la)\s+clave\b/i,
    /c[oó]digo\s+(de\s+)?(acceso|seguridad|alarma|port[oó]n|verificaci[oó]n)/i,
    /\bpin\s+(de|del)\b/i,
    /\btokens?\b/i,
    /\bapi[\s-]?key\b/i,
    /\botp\b/i
  ];

  function looksSensitive(value) {
    return SENSITIVE.some(function (re) { return re.test(value); });
  }

  /* ---- helpers de error --------------------------------------------------- */

  function errorNode(id) { return $('#err-' + id); }

  function clearError(id, controls) {
    var node = errorNode(id);
    if (node) node.textContent = '';
    (controls || []).forEach(function (c) { c.removeAttribute('aria-invalid'); });
  }

  function setError(id, message, controls) {
    var node = errorNode(id);
    if (node) node.textContent = message;
    (controls || []).forEach(function (c) { c.setAttribute('aria-invalid', 'true'); });
    return controls && controls[0] ? controls[0] : null;
  }

  function group(name) { return $$('[name="' + name + '"]', form); }

  function checkedValues(name) {
    return group(name).filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
  }

  function firstChecked(name) {
    var v = checkedValues(name);
    return v.length ? v[0] : '';
  }

  /* ---- reglas ------------------------------------------------------------- */

  function isEmail(value) {
    // Formato razonable. No afirma que la cuenta exista.
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
  }

  function phoneDigits(value) {
    return (value.match(/\d/g) || []).length;
  }

  function needsCompany() {
    return firstChecked('motivo') === 'Arquitecto o constructora';
  }

  function needsProfessional() {
    var etapa = $('#etapa').value;
    return needsCompany() || etapa === 'Anteproyecto' || etapa === 'Obra en curso';
  }

  /* ---- contexto de ruta --------------------------------------------------- */

  /* Enum cerrado de contextos. Cada clave define el motivo que se preselecciona, el
     texto del resumen visible, el encabezado contextual y las cuatro prioridades más
     frecuentes de ese público. Nada de esto es un dato personal. */
  var CONTEXTS = {
    parcela: {
      motivo: 'Parcela',
      resumen: 'Parcela o segunda vivienda',
      titulo: 'Cuéntanos qué debe funcionar mejor en tu parcela',
      prioridades: ['Acceso o portón', 'Riego o agua', 'Alertas', 'Energía o medición']
    },
    residencia: {
      motivo: 'Residencia',
      resumen: 'Residencia',
      titulo: 'Cuéntanos qué debe funcionar mejor en tu residencia',
      prioridades: ['Iluminación', 'Clima', 'Acceso o portón', 'Alertas']
    },
    proyecto: {
      motivo: 'Arquitecto o constructora',
      resumen: 'Proyecto con arquitecto o constructora',
      titulo: 'Cuéntanos qué debe funcionar mejor en tu proyecto',
      prioridades: ['Acceso o portón', 'Iluminación', 'Clima', 'Energía o medición']
    }
  };

  var MOTIVO_CONTEXT = {
    'Parcela': 'parcela',
    'Residencia': 'residencia',
    'Arquitecto o constructora': 'proyecto'
  };

  // Orden por defecto cuando todavía no hay contexto o el motivo es "Otro".
  var PRIORIDADES_BASE = ['Acceso o portón', 'Iluminación', 'Clima', 'Alertas'];

  var prioItems = prioWrap ? $$('[data-prioridad]', prioWrap) : [];

  function known(key) {
    return Object.prototype.hasOwnProperty.call(CONTEXTS, key);
  }

  function contextKey() {
    return MOTIVO_CONTEXT[firstChecked('motivo')] || '';
  }

  /** Lee `?contexto=` y lo descarta si no pertenece al enum. */
  function contextFromQuery() {
    var match = (window.location.search || '').match(/[?&]contexto=([^&#]*)/);
    if (!match) return '';
    var key = '';
    try { key = decodeURIComponent(match[1]).toLowerCase(); } catch (e) { return ''; }
    return known(key) ? key : '';
  }

  function applyContext(key) {
    if (!known(key)) return false;
    var wanted = CONTEXTS[key].motivo;
    var hit = false;
    group('motivo').forEach(function (radio) {
      if (radio.value === wanted) { radio.checked = true; hit = true; }
    });
    if (hit) {
      clearError('motivo', group('motivo'));
      syncContext();
    }
    return hit;
  }

  /** Deja el contexto en la URL para que compartirla o recargarla lo conserve.
      Si deja de haber contexto conocido, el parámetro se retira en vez de quedar obsoleto. */
  function rememberContextInUrl(key) {
    if (!window.history || !history.replaceState) return;
    var query = known(key) ? '?contexto=' + encodeURIComponent(key) : '';
    try {
      history.replaceState(null, '', window.location.pathname + query + '#contacto');
    } catch (e) {
      /* Algunos navegadores rechazan replaceState en file://. El contexto ya se aplicó. */
    }
  }

  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function goToContact() {
    var section = $('#contacto');
    if (section && section.scrollIntoView) {
      try {
        section.scrollIntoView({ block: 'start', behavior: reducedMotion() ? 'auto' : 'smooth' });
      } catch (e) {
        section.scrollIntoView();
      }
    }
    if (contactTitle && contactTitle.focus) {
      try { contactTitle.focus({ preventScroll: true }); } catch (e) { contactTitle.focus(); }
    }
  }

  function setPrioridadesExtra(open) {
    if (!prioExtra || !prioMore) return;
    prioExtra.hidden = !open;
    prioMore.setAttribute('aria-expanded', open ? 'true' : 'false');
    prioMore.textContent = open ? 'Ver menos opciones' : 'Ver más opciones';
  }

  /** Coloca primero las cuatro prioridades más frecuentes del contexto elegido. */
  function orderPriorities(key) {
    if (!prioMain || !prioExtra || !prioItems.length) return;
    var top = (known(key) && CONTEXTS[key].prioridades) || PRIORIDADES_BASE;

    prioItems.forEach(function (item) {
      var target = top.indexOf(item.getAttribute('data-prioridad')) !== -1 ? prioMain : prioExtra;
      target.appendChild(item);
    });
    top.forEach(function (value) {
      var item = prioMain.querySelector('[data-prioridad="' + value + '"]');
      if (item) prioMain.appendChild(item);
    });

    // Si una prioridad marcada quedó en el grupo plegado, se mantiene a la vista.
    var hidden = checkedValues('prioridades').some(function (v) { return top.indexOf(v) === -1; });
    if (hidden) setPrioridadesExtra(true);
  }

  function setOptional(open) {
    if (!optionalFields || !optionalToggle) return;
    optionalFields.hidden = !open;
    optionalToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    optionalToggle.textContent = open
      ? 'Ocultar detalles opcionales del proyecto'
      : 'Agregar detalles opcionales del proyecto';
  }

  /** El profesional a cargo solo se pide cuando el caso lo justifica. */
  function syncProfessional() {
    var wrap = $('#field-profesional');
    if (!wrap) return;
    var show = needsProfessional();
    wrap.hidden = !show;
    if (!show) clearError('profesional', [$('#profesional')]);
  }

  /** Encabezado, resumen de ruta, orden de prioridades y campo condicional. */
  function syncContext() {
    var key = contextKey();
    var motivo = firstChecked('motivo');

    if (contactTitle) {
      var fallback = contactTitle.getAttribute('data-title-default');
      contactTitle.textContent = known(key)
        ? CONTEXTS[key].titulo
        : (fallback || contactTitle.textContent);
    }

    if (routeSummary && routeValue) {
      if (motivo) {
        routeValue.textContent = known(key) ? CONTEXTS[key].resumen : 'Otro tipo de proyecto';
        routeSummary.hidden = false;
      } else {
        routeSummary.hidden = true;
      }
    }

    orderPriorities(key);
    syncProfessional();
  }

  /** Despliega el grupo plegado que contenga un campo con error. */
  function reveal(el) {
    if (!el) return;
    if (optionalFields && optionalFields.hidden && optionalFields.contains(el)) setOptional(true);
    if (prioExtra && prioExtra.hidden && prioExtra.contains(el)) setPrioridadesExtra(true);
  }

  /* ---- validación por paso ------------------------------------------------ */

  function validateStep1() {
    var invalid = [];
    var motivo = group('motivo');
    var prioridades = group('prioridades');
    var tipo = $('#tipo'), zona = $('#zona'), etapa = $('#etapa');
    var descripcion = $('#descripcion'), equipos = $('#equipos');
    var profesional = $('#profesional'), momento = $('#momento');

    clearError('motivo', motivo);
    clearError('tipo', [tipo]);
    clearError('zona', [zona]);
    clearError('etapa', [etapa]);
    clearError('prioridades', prioridades);
    clearError('descripcion', [descripcion]);
    clearError('equipos', [equipos]);
    clearError('profesional', [profesional]);
    clearError('momento', [momento]);

    // Obligatorios del paso 1: contexto, zona general, prioridades, problema y momento.
    // `tipo` y `etapa` son realmente opcionales: no se validan y su ayuda lo declara.
    if (!firstChecked('motivo')) invalid.push(setError('motivo', MSG.choose, motivo));
    if (!zona.value.trim()) invalid.push(setError('zona', MSG.required, [zona]));

    var picked = checkedValues('prioridades').length;
    if (picked < 1 || picked > 3) invalid.push(setError('prioridades', MSG.priorities, prioridades));

    var desc = descripcion.value.trim();
    if (!desc) invalid.push(setError('descripcion', MSG.required, [descripcion]));
    else if (desc.length < 20) invalid.push(setError('descripcion', MSG.tooShort, [descripcion]));
    else if (looksSensitive(desc)) invalid.push(setError('descripcion', MSG.sensitive, [descripcion]));

    if (equipos.value.trim() && looksSensitive(equipos.value)) {
      invalid.push(setError('equipos', MSG.sensitive, [equipos]));
    }

    // Único campo condicionalmente obligatorio: se pide cuando el motivo es profesional
    // o cuando la etapa declarada es Anteproyecto u Obra en curso. En cualquier otro
    // caso el campo ni siquiera se muestra.
    if (needsProfessional() && !profesional.value) {
      invalid.push(setError('profesional', MSG.choose, [profesional]));
    }
    if (!momento.value) invalid.push(setError('momento', MSG.choose, [momento]));

    return invalid.filter(Boolean);
  }

  function validateStep2() {
    var invalid = [];
    var nombre = $('#nombre'), empresa = $('#empresa'), correo = $('#correo');
    var telefono = $('#telefono'), consentimiento = $('#consentimiento');
    var canal = group('canal');

    clearError('nombre', [nombre]);
    clearError('empresa', [empresa]);
    clearError('correo', [correo]);
    clearError('telefono', [telefono]);
    clearError('canal', canal);
    clearError('consentimiento', [consentimiento]);

    var n = nombre.value.trim();
    if (!n || n.length < 2) invalid.push(setError('nombre', MSG.required, [nombre]));

    if (needsCompany() && !empresa.value.trim()) {
      invalid.push(setError('empresa', MSG.required, [empresa]));
    }

    if (!correo.value.trim()) invalid.push(setError('correo', MSG.required, [correo]));
    else if (!isEmail(correo.value)) invalid.push(setError('correo', MSG.email, [correo]));

    var digits = phoneDigits(telefono.value);
    if (!telefono.value.trim()) invalid.push(setError('telefono', MSG.required, [telefono]));
    else if (digits < 8 || digits > 15) invalid.push(setError('telefono', MSG.phone, [telefono]));

    if (!firstChecked('canal')) invalid.push(setError('canal', MSG.choose, canal));
    if (!consentimiento.checked) invalid.push(setError('consentimiento', MSG.consent, [consentimiento]));

    return invalid.filter(Boolean);
  }

  /* ---- navegación entre pasos --------------------------------------------- */

  function announce(text) {
    if (status) status.textContent = text;
  }

  /**
   * `focusPanel` es falso en el arranque: enfocar un campo al cargar arrastraría la
   * página hasta el formulario antes de que nadie lo pida.
   */
  function showStep(n, focusPanel) {
    step1.hidden = n !== 1;
    step2.hidden = n !== 2;
    confirmation.hidden = true;
    form.hidden = false;
    if (progress) progress.hidden = false;
    syncContext();

    if (progressLabel) {
      progressLabel.textContent = n === 1
        ? 'Paso 1 de 2 — Contexto del proyecto'
        : 'Paso 2 de 2 — Contacto';
    }
    if (progressBar) progressBar.setAttribute('aria-valuenow', String(n));
    if (progressFill) progressFill.style.width = n === 1 ? '50%' : '100%';

    // La etiqueta condicional de empresa se actualiza con el motivo elegido.
    var helpEmpresa = $('#help-empresa');
    if (helpEmpresa) {
      helpEmpresa.textContent = needsCompany()
        ? 'Obligatorio para arquitectos y constructoras.'
        : 'Opcional en este caso. Obligatorio para arquitectos y constructoras.';
    }

    if (focusPanel === false) return;
    var panel = n === 1 ? step1 : step2;
    var target = $('input, select, textarea, button', panel);
    if (target) target.focus();
  }

  function focusFirstInvalid(list) {
    if (!list.length) return;
    var first = list[0];
    reveal(first);
    if (typeof first.focus === 'function') first.focus();
  }

  var started = false;
  form.addEventListener('input', function () {
    if (started) return;
    started = true;
    track('form_start', { form: 'precalificacion', contexto: contextKey() });
  }, true);

  // Contadores de longitud, para que el límite sea visible antes de toparse con él.
  $$('[data-counter-for]').forEach(function (counter) {
    var field = document.getElementById(counter.getAttribute('data-counter-for'));
    if (!field) return;
    var max = field.getAttribute('maxlength') || '';
    var render = function () { counter.textContent = field.value.length + ' / ' + max; };
    field.addEventListener('input', render);
    render();
  });

  // Aviso inmediato si se superan las tres prioridades.
  group('prioridades').forEach(function (box) {
    box.addEventListener('change', function () {
      var picked = checkedValues('prioridades').length;
      if (picked > 3) setError('prioridades', MSG.priorities, group('prioridades'));
      else if (picked >= 1) clearError('prioridades', group('prioridades'));
    });
  });

  $('#to-step-2').addEventListener('click', function () {
    var invalid = validateStep1();
    if (invalid.length) {
      announce('Revisa los datos marcados del paso 1. Lo que escribiste se mantiene.');
      focusFirstInvalid(invalid);
      return;
    }
    announce('');
    track('form_step_complete', { step: 1, contexto: contextKey() });
    showStep(2);
  });

  $('#to-step-1').addEventListener('click', function () {
    announce('');
    showStep(1);
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault(); // No hay backend: nunca se envía nada.

    var invalid1 = validateStep1();
    if (invalid1.length) {
      announce('Revisa los datos marcados del paso 1. Lo que escribiste se mantiene.');
      showStep(1);
      focusFirstInvalid(invalid1);
      return;
    }

    var invalid2 = validateStep2();
    if (invalid2.length) {
      announce('Revisa los datos marcados del paso 2. Lo que escribiste se mantiene.');
      focusFirstInvalid(invalid2);
      return;
    }

    track('form_step_complete', { step: 2, contexto: contextKey() });
    // Se registra la intención, no el contenido, y sin transporte de datos.
    // `contexto`, `motivo` y `etapa` son enums cerrados: no hay PII ni texto libre.
    track('lead_submit', {
      contexto: contextKey(),
      motivo: firstChecked('motivo'),
      etapa: $('#etapa').value,
      transport: 'none'
    });

    // El formulario permanece en el DOM con todo lo escrito: volver no pierde nada.
    form.hidden = true;
    if (progress) progress.hidden = true;
    if (routeSummary) routeSummary.hidden = true;
    announce('');
    confirmation.hidden = false;
    confirmation.focus();
  });

  $('#back-to-form').addEventListener('click', function () {
    showStep(2);
  });

  /* ---- montaje de los controles plegables y del contexto inicial ----------- */

  /* Ambos botones se crean aquí y no en el marcado: sin JavaScript no aparece un
     control muerto y los campos quedan visibles y utilizables. */
  if (prioMain && prioExtra) {
    prioMore = document.createElement('button');
    prioMore.type = 'button';
    prioMore.className = 'disclosure';
    prioMore.id = 'prioridades-more';
    prioMore.setAttribute('aria-controls', 'prioridades-extra');
    prioExtra.parentNode.insertBefore(prioMore, prioExtra);
    prioMore.addEventListener('click', function () { setPrioridadesExtra(prioExtra.hidden); });
    setPrioridadesExtra(false);
  }

  if (optionalFields) {
    optionalToggle = document.createElement('button');
    optionalToggle.type = 'button';
    optionalToggle.className = 'disclosure';
    optionalToggle.id = 'optional-toggle';
    optionalToggle.setAttribute('aria-controls', 'optional-fields');
    optionalFields.parentNode.insertBefore(optionalToggle, optionalFields);
    optionalToggle.addEventListener('click', function () { setOptional(optionalFields.hidden); });
    setOptional(false);
  }

  // El contexto se recalcula ante cualquier cambio de motivo; la etapa solo decide si
  // corresponde pedir el profesional a cargo.
  group('motivo').forEach(function (radio) {
    radio.addEventListener('change', function () {
      syncContext();
      rememberContextInUrl(contextKey());
    });
  });
  $('#etapa').addEventListener('change', syncProfessional);

  // Resumen de ruta editable: devuelve el foco al campo que define el contexto.
  if (routeChange) {
    routeChange.addEventListener('click', function () {
      var first = group('motivo')[0];
      if (first) first.focus();
      announce('Elige el contexto que corresponda. Lo que escribiste se mantiene.');
    });
  }

  var initial = contextFromQuery();
  if (initial && applyContext(initial)) {
    track('context_preselect', { contexto: initial, source: 'query' });
  }

  showStep(1, false);
})();
