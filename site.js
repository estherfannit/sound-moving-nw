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
  document.querySelectorAll('.sm-dd-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var menu = b.nextElementSibling;
      var open = !menu.classList.contains('open');
      document.querySelectorAll('.sm-dd-menu.open').forEach(function (m) { m.classList.remove('open'); });
      document.querySelectorAll('.sm-dd-btn').forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
      menu.classList.toggle('open', open);
      b.setAttribute('aria-expanded', String(open));
    });
  });
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
