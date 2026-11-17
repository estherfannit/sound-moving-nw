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
