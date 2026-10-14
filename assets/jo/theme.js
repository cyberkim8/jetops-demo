/* JetOps theme switcher: follows the phone/computer setting by default ("auto"),
   the person can pin light or dark; the choice is remembered on this device.
   Load in <head> as an external script (works under script-src 'self'):
     <script src="…/jo/theme.js"></script>
   Toggle markup (any number per page):
     <button type="button" class="btn btn-quiet btn-s" data-jo-theme-toggle
             data-label-auto="Auto" data-label-light="Light" data-label-dark="Dark"></button>
   Call window.joTheme.relabel() after a language change if labels changed. */
(function () {
  var KEY = 'jo-theme';
  var ORDER = ['auto', 'light', 'dark'];
  var root = document.documentElement;
  var ICON = {
    auto: '<path d="M12 3a9 9 0 1 0 0 18z" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="9"/>',
    light: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    dark: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  };

  function read() {
    try { var v = localStorage.getItem(KEY); return ORDER.indexOf(v) >= 0 ? v : 'auto'; } catch (e) { return 'auto'; }
  }
  function apply(mode) {
    if (mode === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', mode);
  }
  function relabel() {
    var mode = read();
    var btns = document.querySelectorAll('[data-jo-theme-toggle]');
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var label = b.getAttribute('data-label-' + mode) || mode;
      b.innerHTML = '<svg class="ic ic-s" viewBox="0 0 24 24" aria-hidden="true">' + ICON[mode] + '</svg><span>' + label + '</span>';
      b.setAttribute('aria-label', (b.getAttribute('data-label-title') || 'Theme') + ': ' + label);
    }
  }
  function set(mode) {
    try { localStorage.setItem(KEY, mode); } catch (e) { /* storage blocked: theme just isn't remembered */ }
    apply(mode); relabel();
  }
  function cycle() { set(ORDER[(ORDER.indexOf(read()) + 1) % ORDER.length]); }

  apply(read()); // before first paint, no flash
  document.addEventListener('DOMContentLoaded', function () {
    relabel();
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-jo-theme-toggle]');
      if (t) cycle();
    });
  });
  window.joTheme = { get: read, set: set, cycle: cycle, relabel: relabel };
})();
