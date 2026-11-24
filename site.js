// Shared menu behaviour for every page: mobile panel, dropdowns on tap.
(function () {
  var btn = document.getElementById('smMenu');
  var panel = document.getElementById('smPanel');
  if (btn && panel) {
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }
  var wide = window.matchMedia('(min-width:1440px)');
  document.querySelectorAll('.sm-dd-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var menu = b.nextElementSibling, dd = b.parentNode;
      // Desktop: if hover already shows the menu, a click on the heading closes it
      if (wide.matches && getComputedStyle(menu).visibility === 'visible') {
        menu.classList.remove('open'); b.setAttribute('aria-expanded', 'false');
        dd.classList.add('sm-dd-suppress'); b.blur(); return;
      }
      dd.classList.remove('sm-dd-suppress');
      var open = !menu.classList.contains('open');
      document.querySelectorAll('.sm-dd-menu.open').forEach(function (m) { m.classList.remove('open'); });
      document.querySelectorAll('.sm-dd-btn').forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
      menu.classList.toggle('open', open);
      b.setAttribute('aria-expanded', String(open));
    });
  });
  // Desktop: close dropdowns when the mouse leaves, on a click elsewhere, or on Escape
  function closeAll() {
    document.querySelectorAll('.sm-dd-menu.open').forEach(function (m) { m.classList.remove('open'); });
    document.querySelectorAll('.sm-dd-btn').forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
  }
  var desktop = window.matchMedia('(min-width:1440px)');
  document.querySelectorAll('.sm-dd').forEach(function (dd) {
    // Picking a sub-page closes the dropdown straight away
    dd.querySelectorAll('.sm-dd-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        closeAll();
        if (desktop.matches) { dd.classList.add('sm-dd-suppress'); a.blur(); }
      });
    });
    dd.addEventListener('mouseleave', function () {
      dd.classList.remove('sm-dd-suppress');
      if (!desktop.matches) return;
      closeAll();
      if (dd.contains(document.activeElement)) document.activeElement.blur();
    });
  });
  document.addEventListener('click', function (e) { if (!e.target.closest('.sm-dd')) closeAll(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });
})();

// Scroll reveal for every page that loads theme.css: sections and cards fade up once as they come into view.
(function () {
  if (!document.querySelector('link[href="theme.css"]')) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  var selectors = ['.hp-reveal', '.hp-cards > *', '.hp-links > *', '.hp-steps > li', '.articles-grid > .article-card', '.article-content > *', '.content > *'];
  var els = [];
  selectors.forEach(function (s) { document.querySelectorAll(s).forEach(function (e) { if (els.indexOf(e) === -1) els.push(e); }); });
  els.forEach(function (e) {
    var sibs = e.parentElement ? Array.prototype.indexOf.call(e.parentElement.children, e) : 0;
    e.classList.add('hp-reveal');
    e.style.transitionDelay = (Math.min(sibs, 5) * 0.08) + 's';
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(function (e) { io.observe(e); });
})();

// Open the FAQ or Documents pop-up when the homepage is reached from another page's menu
(function () {
  function openFromHash() {
    var h = location.hash;
    if (h === '#faq' && typeof window.openFaqModal === 'function') window.openFaqModal();
    else if (h === '#documents' && typeof window.openFormsModal === 'function') window.openFormsModal();
  }
  if (document.readyState === 'complete') openFromHash(); else window.addEventListener('load', openFromHash);
  window.addEventListener('hashchange', openFromHash);
})();

// Contact Us forms (contact page and service/location heroes):
// the date fields show only for "Check my move date", required fields are checked,
// and the thank-you replaces the form in place so the page does not jump.
(function () {
  var MSG = {
    'Check my move date': "Thank you! We'll reach out shortly to confirm your availability.",
    'Get an estimate': "Thank you! We'll reach out shortly with your quote.",
    'Ask a question': "Thank you! We'll reach out shortly to answer your question."
  };
  var preset = (location.search.match(/[?&]help=([a-z-]+)/) || [])[1];
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  Array.prototype.forEach.call(document.querySelectorAll('form.sm-contact'), function (form) {
    var box = form.closest('.sm-contact-box');
    var thanks = box.querySelector('.cf-thanks');
    var dateRow = form.querySelector('.cf-date');
    function field(key) { return form.querySelector('[data-field="' + key + '"]'); }
    function choice() { var c = form.querySelector('[data-field="help"] input:checked'); return c ? c.value : ''; }
    function err(key, text) {
      var el = form.querySelector('[data-err="' + key + '"]'); if (el) el.textContent = text || '';
      var f = field(key);
      if (f && (f.tagName === 'INPUT' || f.tagName === 'TEXTAREA')) { if (text) f.setAttribute('aria-invalid', 'true'); else f.removeAttribute('aria-invalid'); }
    }
    var msgRow = form.querySelector('.cf-msg');
    function sync() {
      var on = choice() === 'Check my move date';
      dateRow.hidden = !on;
      Array.prototype.forEach.call(dateRow.querySelectorAll('input, select'), function (i) { i.disabled = !on; });
      if (!on) { err('date'); err('flex'); err('location'); }
      if (msgRow) {
        var ask = choice() === 'Ask a question';
        msgRow.hidden = !ask;
        msgRow.querySelector('textarea').disabled = !ask;
        if (!ask) err('message');
      }
    }
    if (preset) { var p = form.querySelector('[data-help="' + preset + '"]'); if (p) p.checked = true; }
    sync();
    form.addEventListener('change', function (e) {
      if (e.target.closest('[data-field="help"]')) { err('help'); sync(); }
      if (e.target.closest('[data-field="flex"]')) err('flex');
    });
    form.addEventListener('input', function (e) { var k = e.target.getAttribute('data-field'); if (k) err(k); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = [];
      function need(key, ok, text) { err(key, ok ? '' : text); if (!ok) bad.push(key); }
      var help = choice();
      need('help', !!help, 'Please choose how we can help.');
      need('first', field('first').value.trim() !== '', 'This field is required.');
      need('last', field('last').value.trim() !== '', 'This field is required.');
      if (help === 'Check my move date') {
        need('date', field('date').value !== '', 'Please choose a date.');
        need('flex', !!form.querySelector('[data-field="flex"] input:checked'), 'Please choose Yes or No.');
        need('location', field('location').value.trim() !== '', 'Please enter the city or ZIP you are moving from.');
      }
      need('phone', field('phone').value.replace(/\D/g, '').length >= 10, 'Please enter a 10-digit phone number.');
      if (help === 'Ask a question' && field('message')) need('message', field('message').value.trim() !== '', 'Please type your question.');
      need('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field('email').value.trim()), 'Please enter a valid email address.');
      if (bad.length) {
        var f = field(bad[0]); var target = f && (f.tagName === 'INPUT' || f.tagName === 'TEXTAREA') ? f : f && f.querySelector('input:not([disabled])');
        if (target) target.focus();
        return;
      }
      box.style.minHeight = box.offsetHeight + 'px';
      box.classList.add('is-sent');
      thanks.querySelector('.cf-thanks-msg').textContent = MSG[help] || MSG['Ask a question'];
      form.hidden = true;
      thanks.hidden = false;
      thanks.focus({ preventScroll: true });
      var r = thanks.getBoundingClientRect();
      if (r.top < 90 || r.bottom > window.innerHeight) thanks.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    });
  });
})();
