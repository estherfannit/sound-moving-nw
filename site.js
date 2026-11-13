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
