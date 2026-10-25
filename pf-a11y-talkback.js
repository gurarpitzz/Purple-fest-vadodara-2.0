/* PurpleFest Vadodara 2027 — Unified Accessibility Menu (purplefestdelhi.com Match) & TalkBack Screen Reader Engine */
(function () {
  if (typeof window === 'undefined') return;
  if (window.__pfTalkBackEngineLoaded) return;
  window.__pfTalkBackEngineLoaded = true;

  var ZOOM_LEVELS = [85, 100, 115, 130, 150];
  var zoomIdx = 1;
  var currentContrast = 'light';

  var A11Y_MENU_CSS = [
    '.sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important;}',
    '.pf-a11y-header-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:42px!important;height:42px!important;min-height:42px!important;min-width:42px!important;padding:0!important;border-radius:9999px!important;border:2px solid #4A1575!important;background-color:#190826!important;color:#FFFFFF!important;cursor:pointer!important;box-shadow:0 4px 14px rgba(25,8,38,0.28)!important;transition:transform 0.18s ease,background-color 0.2s ease,border-color 0.2s ease!important;}',
    '.pf-a11y-header-btn:hover,.pf-a11y-header-btn[aria-expanded="true"]{background-color:#4A1575!important;border-color:#E2D4F0!important;color:#FFFFFF!important;}',
    '.pf-a11y-icon-svg{width:24px!important;height:24px!important;flex-shrink:0!important;}',
    '.pf-a11y-footer-btn{display:inline-flex!important;align-items:center!important;gap:8px!important;padding:9px 16px!important;border-radius:8px!important;border:1.5px solid #4A1575!important;background-color:#190826!important;color:#FFFFFF!important;font-size:14px!important;font-weight:700!important;line-height:1.2!important;cursor:pointer!important;}',
    '.pf-a11y-footer-btn:hover,.pf-a11y-footer-btn[aria-expanded="true"]{background-color:#4A1575!important;border-color:#E2D4F0!important;}',
    '.pf-a11y-header-panel{display:none!important;position:fixed!important;top:72px!important;right:16px!important;z-index:2005!important;width:min(356px,calc(100vw - 24px))!important;max-height:calc(100vh - 88px)!important;overflow-y:auto!important;background-color:#190826!important;color:#FFFFFF!important;border:1.5px solid #3E1F5B!important;border-radius:14px!important;padding:18px!important;box-shadow:0 22px 54px rgba(10,2,18,0.65)!important;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif!important;text-align:left!important;}',
    '.pf-a11y-header-panel.is-open{display:block!important;}',
    '.pf-a11y-top-row{display:grid!important;grid-template-columns:64px 1fr 64px!important;gap:10px!important;align-items:stretch!important;margin-bottom:18px!important;}',
    '.pf-a11y-step-btn{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:44px!important;border-radius:8px!important;border:1.5px solid #4B2C6B!important;background-color:#210B33!important;color:#FFFFFF!important;font-size:16px!important;font-weight:700!important;cursor:pointer!important;}',
    '.pf-a11y-step-btn:hover{background-color:#361254!important;border-color:#9D6FD4!important;}',
    '.pf-a11y-zoom-val{display:flex!important;align-items:center!important;justify-content:center!important;min-height:44px!important;border-radius:8px!important;border:1.5px solid #351950!important;background-color:#13051E!important;color:#E2D4F0!important;font-size:15px!important;font-weight:600!important;letter-spacing:0.02em!important;}',
    '.pf-a11y-section{margin-bottom:16px!important;}',
    '.pf-a11y-section-title{font-size:13px!important;font-weight:700!important;color:#CDBCE0!important;margin:0 0 8px 0!important;letter-spacing:0.02em!important;text-transform:none!important;}',
    '.pf-a11y-card-list{display:flex!important;flex-direction:column!important;gap:8px!important;}',
    '.pf-a11y-radio-card,.pf-a11y-check-card{width:100%!important;display:flex!important;align-items:center!important;gap:12px!important;padding:11px 14px!important;border-radius:9px!important;border:1.5px solid #3E215B!important;background-color:#210C33!important;color:#FFFFFF!important;text-align:left!important;cursor:pointer!important;}',
    '.pf-a11y-radio-card{flex-direction:column!important;align-items:flex-start!important;gap:3px!important;}',
    '.pf-a11y-radio-card:hover,.pf-a11y-check-card:hover{background-color:#2D1147!important;border-color:#7D4BB8!important;}',
    '.pf-a11y-radio-card.is-active,.pf-a11y-radio-card[aria-checked="true"]{background-color:#4A1575!important;border-color:#B388EB!important;}',
    '.pf-a11y-check-card.is-active,.pf-a11y-check-card[aria-checked="true"]{background-color:#341154!important;border-color:#B388EB!important;}',
    '.pf-a11y-check-box{width:22px!important;height:22px!important;min-width:22px!important;border-radius:5px!important;border:1.5px solid #755399!important;background-color:transparent!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;color:transparent!important;}',
    '.pf-a11y-check-box svg{width:14px!important;height:14px!important;}',
    '.pf-a11y-check-card.is-active .pf-a11y-check-box,.pf-a11y-check-card[aria-checked="true"] .pf-a11y-check-box{background-color:#E2D4F0!important;border-color:#E2D4F0!important;color:#190826!important;}',
    '.pf-a11y-card-text{display:flex!important;flex-direction:column!important;gap:2px!important;}',
    '.pf-a11y-card-title{font-size:14.5px!important;font-weight:700!important;line-height:1.25!important;color:#FFFFFF!important;}',
    '.pf-a11y-card-sub{font-size:12.5px!important;font-weight:400!important;line-height:1.35!important;color:#C9B6DC!important;}',
    '.pf-a11y-reset-all-btn{width:100%!important;margin-top:4px!important;padding:11px 14px!important;border-radius:9px!important;border:1.5px solid #4B2C6B!important;background-color:#210C33!important;color:#E2D4F0!important;font-size:14px!important;font-weight:600!important;text-align:center!important;cursor:pointer!important;}',
    '.pf-a11y-reset-all-btn:hover{background-color:#3B155E!important;border-color:#9D6FD4!important;color:#FFFFFF!important;}',
    'html.pf-contrast-dark body,html.pf-contrast-dark main,html.pf-contrast-dark section,html.pf-contrast-dark header,html.pf-contrast-dark footer,html.pf-contrast-dark article,html.pf-contrast-dark aside,html.pf-contrast-dark [class*="card"],html.pf-contrast-dark [class*="panel"]{background-color:#12061C!important;color:#F5EEFC!important;}',
    'html.pf-contrast-dark h1,html.pf-contrast-dark h2,html.pf-contrast-dark h3,html.pf-contrast-dark h4,html.pf-contrast-dark p,html.pf-contrast-dark li,html.pf-contrast-dark label,html.pf-contrast-dark td,html.pf-contrast-dark th{color:#F5EEFC!important;}',
    'html.pf-contrast-yellow-black body,html.pf-contrast-yellow-black main,html.pf-contrast-yellow-black section,html.pf-contrast-yellow-black header,html.pf-contrast-yellow-black footer,html.pf-contrast-yellow-black nav,html.pf-contrast-yellow-black article,html.pf-contrast-yellow-black aside,html.pf-contrast-yellow-black div:not(#pf-a11y-header-panel):not(#pf-a11y-header-panel *){background-color:#000000!important;color:#FFFF00!important;}',
    'html.pf-contrast-yellow-black h1,html.pf-contrast-yellow-black h2,html.pf-contrast-yellow-black h3,html.pf-contrast-yellow-black h4,html.pf-contrast-yellow-black h5,html.pf-contrast-yellow-black h6,html.pf-contrast-yellow-black p,html.pf-contrast-yellow-black li,html.pf-contrast-yellow-black span:not(#pf-a11y-header-panel *),html.pf-contrast-yellow-black label,html.pf-contrast-yellow-black td,html.pf-contrast-yellow-black th{color:#FFFF00!important;}',
    'html.pf-contrast-yellow-black a,html.pf-contrast-yellow-black button:not(#pf-a11y-header-panel button),html.pf-contrast-yellow-black [role="button"]:not(#pf-a11y-header-panel *){background-color:#000000!important;color:#00FFFF!important;border:2px solid #FFFF00!important;}',
    'html.pf-contrast-yellow-black input,html.pf-contrast-yellow-black select,html.pf-contrast-yellow-black textarea{background-color:#000000!important;color:#FFFF00!important;border:2px solid #FFFF00!important;}',
    'html.pf-a11y-spacing body,html.pf-a11y-spacing p,html.pf-a11y-spacing li,html.pf-a11y-spacing span,html.pf-a11y-spacing a,html.pf-a11y-spacing label{line-height:1.85!important;letter-spacing:0.06em!important;word-spacing:0.14em!important;}',
    'html.pf-a11y-links a,html.pf-a11y-links button:not(#pf-a11y-header-panel button),html.pf-a11y-links [role="button"]:not(#pf-a11y-header-panel *){text-decoration:underline!important;text-decoration-thickness:2px!important;text-underline-offset:4px!important;outline:2px solid #8E2DE2!important;outline-offset:2px!important;}',
    'html.pf-a11y-reduce-motion *,html.pf-a11y-reduce-motion *::before,html.pf-a11y-reduce-motion *::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important;scroll-behavior:auto!important;}'
  ].join('\n');

  var A11Y_ICON_SVG =
    '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" class="pf-a11y-icon-svg">' +
    '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>' +
    '<circle cx="12" cy="6.5" r="1.75" fill="currentColor"/>' +
    '<path d="M7 10.25L12 11.25L17 10.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M12 11.25V14.5M12 14.5L9.75 18.5M12 14.5L14.25 18.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  var PANEL_INNER_HTML =
    '<div class="pf-a11y-top-row" role="group" aria-label="Text size">' +
      '<button type="button" class="pf-a11y-step-btn" data-pf-a11y-step="down" aria-label="Decrease text size">A-</button>' +
      '<div class="pf-a11y-zoom-val" id="pf-a11y-zoom-display" role="status" aria-live="polite" aria-atomic="true">100%</div>' +
      '<button type="button" class="pf-a11y-step-btn" data-pf-a11y-step="up" aria-label="Increase text size">A+</button>' +
    '</div>' +
    '<div class="pf-a11y-section">' +
      '<div class="pf-a11y-section-title" id="pf-a11y-contrast-heading">Contrast</div>' +
      '<div class="pf-a11y-card-list" role="radiogroup" aria-labelledby="pf-a11y-contrast-heading">' +
        '<button type="button" class="pf-a11y-radio-card is-active" role="radio" aria-checked="true" data-pf-contrast="light">' +
          '<span class="pf-a11y-card-title">Light</span>' +
          '<span class="pf-a11y-card-sub">Dark purple text on white</span>' +
        '</button>' +
        '<button type="button" class="pf-a11y-radio-card" role="radio" aria-checked="false" data-pf-contrast="dark">' +
          '<span class="pf-a11y-card-title">Dark</span>' +
          '<span class="pf-a11y-card-sub">Light text on a dark background</span>' +
        '</button>' +
        '<button type="button" class="pf-a11y-radio-card" role="radio" aria-checked="false" data-pf-contrast="yellow-black">' +
          '<span class="pf-a11y-card-title">Yellow on black</span>' +
          '<span class="pf-a11y-card-sub">High contrast yellow text on black</span>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<div class="pf-a11y-section">' +
      '<div class="pf-a11y-section-title" id="pf-a11y-more-heading">More settings</div>' +
      '<div class="pf-a11y-card-list" role="group" aria-labelledby="pf-a11y-more-heading">' +
        '<button type="button" class="pf-a11y-check-card" role="checkbox" aria-checked="false" data-pf-toggle="pf-a11y-links">' +
          '<span class="pf-a11y-check-box" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
          '<span class="pf-a11y-card-text">' +
            '<span class="pf-a11y-card-title">Highlight links and buttons</span>' +
            '<span class="pf-a11y-card-sub">Outlines and underlines every link and button</span>' +
          '</span>' +
        '</button>' +
        '<button type="button" class="pf-a11y-check-card" role="checkbox" aria-checked="false" data-pf-toggle="pf-a11y-spacing">' +
          '<span class="pf-a11y-check-box" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
          '<span class="pf-a11y-card-text">' +
            '<span class="pf-a11y-card-title">Wider text spacing</span>' +
            '<span class="pf-a11y-card-sub">More space between letters, words and lines</span>' +
          '</span>' +
        '</button>' +
        '<button type="button" class="pf-a11y-check-card" role="checkbox" aria-checked="false" data-pf-toggle="pf-a11y-reduce-motion">' +
          '<span class="pf-a11y-check-box" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
          '<span class="pf-a11y-card-text">' +
            '<span class="pf-a11y-card-title">Stop animations</span>' +
            '<span class="pf-a11y-card-sub">Stops the slideshow and all movement on the page</span>' +
          '</span>' +
        '</button>' +
        '<button type="button" class="pf-a11y-check-card" role="checkbox" aria-checked="false" data-pf-toggle="pf-talkback-mode">' +
          '<span class="pf-a11y-check-box" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
          '<span class="pf-a11y-card-text">' +
            '<span class="pf-a11y-card-title">TalkBack Screen Reader Audio</span>' +
            '<span class="pf-a11y-card-sub">Reads focused elements &amp; live status aloud</span>' +
          '</span>' +
        '</button>' +
      '</div>' +
    '</div>' +
    '<button type="button" class="pf-a11y-reset-all-btn" data-pf-a11y-reset="true">Reset all settings</button>';

  function ensureLiveRegion() {
    var live = document.getElementById('pf-talkback-live');
    if (!live && document.body) {
      live = document.createElement('div');
      live.id = 'pf-talkback-live';
      live.setAttribute('role', 'status');
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('aria-atomic', 'true');
      live.className = 'sr-only';
      document.body.appendChild(live);
    }
    return live;
  }

  function announceTalkBack(msg) {
    var live = ensureLiveRegion();
    if (live) live.textContent = msg;
    if (document.documentElement.classList.contains('pf-talkback-mode') && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(msg);
        u.rate = 1.0;
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }
  }
  window.__pfAnnounceTalkBack = announceTalkBack;

  function applyZoom() {
    var pct = ZOOM_LEVELS[zoomIdx] || 100;
    document.documentElement.style.zoom = pct === 100 ? '' : (pct / 100).toString();
    var disp = document.getElementById('pf-a11y-zoom-display');
    if (disp) disp.textContent = pct + '%';
    announceTalkBack('Text size ' + pct + ' percent');
  }

  function applyContrast(mode, silent) {
    currentContrast = mode || 'light';
    var root = document.documentElement;
    root.classList.remove('pf-contrast-light', 'pf-contrast-dark', 'pf-contrast-yellow-black', 'pf-a11y-contrast');
    document.body.classList.remove('high-contrast');
    root.classList.add('pf-contrast-' + currentContrast);
    if (currentContrast === 'dark') {
      root.classList.add('pf-a11y-contrast');
      document.body.classList.add('high-contrast');
    }
    var panel = document.getElementById('pf-a11y-header-panel');
    if (panel) {
      panel.querySelectorAll('[data-pf-contrast]').forEach(function (card) {
        var active = card.getAttribute('data-pf-contrast') === currentContrast;
        card.classList.toggle('is-active', active);
        card.setAttribute('aria-checked', active ? 'true' : 'false');
      });
    }
    if (!silent) announceTalkBack('Contrast mode set to ' + currentContrast.replace('-', ' '));
  }

  function togglePanel(forceState) {
    var panel = document.getElementById('pf-a11y-header-panel');
    if (!panel) return;
    var nextOpen = typeof forceState === 'boolean' ? forceState : !panel.classList.contains('is-open');
    panel.classList.toggle('is-open', nextOpen);
    panel.classList.toggle('open', nextOpen);
    panel.setAttribute('aria-hidden', nextOpen ? 'false' : 'true');
    document.querySelectorAll('.pf-a11y-header-btn, .pf-a11y-footer-btn, #a11y-toggle-btn').forEach(function (b) {
      b.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
    });
    if (nextOpen) {
      var firstBtn = panel.querySelector('button');
      if (firstBtn) firstBtn.focus();
      announceTalkBack('Accessibility options menu opened');
    } else {
      announceTalkBack('Accessibility options menu closed');
    }
  }
  window.toggleA11yPanel = togglePanel;

  function setupPanelEvents(panel) {
    if (!panel || panel.dataset.pfBound === 'true') return;
    panel.dataset.pfBound = 'true';

    panel.addEventListener('click', function (e) {
      var stepBtn = e.target.closest('[data-pf-a11y-step]');
      if (stepBtn) {
        var dir = stepBtn.getAttribute('data-pf-a11y-step');
        if (dir === 'down' && zoomIdx > 0) zoomIdx--;
        if (dir === 'up' && zoomIdx < ZOOM_LEVELS.length - 1) zoomIdx++;
        applyZoom();
        return;
      }
      var contrastCard = e.target.closest('[data-pf-contrast]');
      if (contrastCard) {
        applyContrast(contrastCard.getAttribute('data-pf-contrast'));
        return;
      }
      var checkCard = e.target.closest('[data-pf-toggle]');
      if (checkCard) {
        var cls = checkCard.getAttribute('data-pf-toggle');
        var enabled = document.documentElement.classList.toggle(cls);
        checkCard.classList.toggle('is-active', enabled);
        checkCard.setAttribute('aria-checked', enabled ? 'true' : 'false');
        if (cls === 'pf-a11y-spacing') {
          document.body.classList.toggle('wide-spacing', enabled);
        }
        if (cls === 'pf-a11y-reduce-motion') {
          document.querySelectorAll('video').forEach(function (v) {
            try { if (enabled) v.pause(); else v.play().catch(function () {}); } catch (err) {}
          });
        }
        var titleEl = checkCard.querySelector('.pf-a11y-card-title');
        announceTalkBack((titleEl ? titleEl.textContent : cls) + (enabled ? ' enabled' : ' disabled'));
        return;
      }
      var resetBtn = e.target.closest('[data-pf-a11y-reset]');
      if (resetBtn) {
        zoomIdx = 1;
        document.documentElement.style.zoom = '';
        var disp = document.getElementById('pf-a11y-zoom-display');
        if (disp) disp.textContent = '100%';
        applyContrast('light', true);
        ['pf-a11y-links', 'pf-a11y-spacing', 'pf-a11y-reduce-motion', 'pf-talkback-mode'].forEach(function (c) {
          document.documentElement.classList.remove(c);
        });
        document.body.classList.remove('wide-spacing');
        panel.querySelectorAll('[data-pf-toggle]').forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-checked', 'false');
        });
        announceTalkBack('All accessibility settings reset to default');
      }
    });
  }

  function normalizeTalkBackSplitText() {
    document.querySelectorAll('h1, h2, h3, h4, h5, h6, p').forEach(function (el) {
      var lineWrappers = el.querySelectorAll('.line-w, .line');
      if (lineWrappers.length > 0) {
        var existingSr = el.querySelector('[data-pf-tb-sr]');
        if (!existingSr) {
          var lines = Array.from(el.querySelectorAll('.line'));
          var fullText = (lines.length ? lines.map(function (l) { return l.textContent.trim(); }).join(' ') : el.textContent)
            .replace(/\s+/g, ' ').trim();
          if (fullText) {
            if (/^H[1-6]$/.test(el.tagName)) {
              el.setAttribute('aria-label', fullText);
            }
            var srSpan = document.createElement('span');
            srSpan.setAttribute('data-pf-tb-sr', 'true');
            srSpan.className = 'sr-only';
            srSpan.textContent = fullText;
            el.insertBefore(srSpan, el.firstChild);
            Array.from(el.children).forEach(function (child) {
              if (child !== srSpan) {
                child.setAttribute('aria-hidden', 'true');
              }
            });
            lineWrappers.forEach(function (lw) {
              lw.setAttribute('aria-hidden', 'true');
            });
          }
        }
      }
    });

    // Ensure dynamic custom field builder inputs in /admin have explicit aria-labels for TalkBack
    document.querySelectorAll('.cf-id').forEach(function (inp, i) {
      if (!inp.getAttribute('aria-label')) inp.setAttribute('aria-label', 'Custom field key ' + (i + 1));
    });
    document.querySelectorAll('.cf-label').forEach(function (inp, i) {
      if (!inp.getAttribute('aria-label')) inp.setAttribute('aria-label', 'Custom field label ' + (i + 1));
    });
    document.querySelectorAll('.cf-type').forEach(function (sel, i) {
      if (!sel.getAttribute('aria-label')) sel.setAttribute('aria-label', 'Custom field type ' + (i + 1));
    });
    document.querySelectorAll('.cf-options').forEach(function (inp, i) {
      if (!inp.getAttribute('aria-label')) inp.setAttribute('aria-label', 'Custom field options ' + (i + 1));
    });
  }

  function initDom() {
    if (document.head && !document.getElementById('pf-a11y-delhi-styles')) {
      var st = document.createElement('style');
      st.id = 'pf-a11y-delhi-styles';
      st.textContent = A11Y_MENU_CSS;
      document.head.appendChild(st);
    }
    ensureLiveRegion();

    // Remove legacy #a11y-panel if separate from #pf-a11y-header-panel
    var legacyAside = document.getElementById('a11y-panel');
    if (legacyAside && legacyAside.id !== 'pf-a11y-header-panel') {
      legacyAside.remove();
    }

    var panel = document.getElementById('pf-a11y-header-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'pf-a11y-header-panel';
      document.body.appendChild(panel);
    }
    panel.className = 'pf-a11y-header-panel';
    panel.removeAttribute('style');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-label', 'Accessibility options');
    if (!panel.classList.contains('is-open')) {
      panel.setAttribute('aria-hidden', 'true');
    }
    if (!panel.querySelector('[data-pf-contrast="yellow-black"]')) {
      panel.innerHTML = PANEL_INNER_HTML;
    }
    setupPanelEvents(panel);
    applyContrast(currentContrast, true);

    // Upgrade header trigger buttons
    document.querySelectorAll('.pf-a11y-header-btn, #a11y-toggle-btn').forEach(function (btn) {
      if (btn.classList.contains('a11y-trigger-btn')) {
        // Keep text for secondary inline delegate subnav button, but style cleanly
        btn.setAttribute('aria-controls', 'pf-a11y-header-panel');
      } else {
        btn.className = 'pf-a11y-header-btn';
        btn.removeAttribute('style');
        btn.setAttribute('aria-label', 'Accessibility options');
        btn.setAttribute('aria-haspopup', 'dialog');
        btn.setAttribute('aria-expanded', panel.classList.contains('is-open') ? 'true' : 'false');
        btn.setAttribute('aria-controls', 'pf-a11y-header-panel');
        btn.innerHTML = A11Y_ICON_SVG;
      }
      if (!btn.dataset.pfClickBound) {
        btn.dataset.pfClickBound = 'true';
        btn.removeAttribute('onclick');
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          togglePanel();
        });
      }
    });

    // Ensure footer has "Accessibility options" button
    var footer = document.querySelector('footer');
    if (footer && !footer.querySelector('.pf-a11y-footer-btn')) {
      var footerBtn = document.createElement('button');
      footerBtn.type = 'button';
      footerBtn.className = 'pf-a11y-footer-btn';
      footerBtn.setAttribute('aria-label', 'Accessibility options');
      footerBtn.setAttribute('aria-haspopup', 'dialog');
      footerBtn.setAttribute('aria-expanded', 'false');
      footerBtn.setAttribute('aria-controls', 'pf-a11y-header-panel');
      footerBtn.innerHTML = A11Y_ICON_SVG + '<span>Accessibility options</span>';
      footerBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        togglePanel();
      });
      var footerWrap = document.createElement('div');
      footerWrap.style.cssText = 'margin-top:16px;display:flex;align-items:center;';
      footerWrap.appendChild(footerBtn);
      footer.appendChild(footerWrap);
    }

    normalizeTalkBackSplitText();
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var panel = document.getElementById('pf-a11y-header-panel');
      if (panel && panel.classList.contains('is-open')) {
        togglePanel(false);
      }
    }
  });

  document.addEventListener('focusin', function (e) {
    if (!document.documentElement.classList.contains('pf-talkback-mode')) return;
    var t = e.target;
    if (!t || t === document.body) return;
    var label = t.getAttribute('aria-label') || (t.textContent || '').replace(/\s+/g, ' ').trim() || t.getAttribute('placeholder') || t.tagName;
    var role = t.getAttribute('role') || t.tagName.toLowerCase();
    if (label) announceTalkBack(label + ', ' + role);
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDom);
  } else {
    initDom();
  }
  setTimeout(initDom, 500);
})();
