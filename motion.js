(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var observed = new WeakSet();
  var observer = reduce || !('IntersectionObserver' in window) ? null : new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
  }, { threshold: 0.12 });
  function reveal(el, delay) {
    if (!el || observed.has(el)) return;
    observed.add(el); el.classList.add('motion-reveal');
    if (delay) el.style.setProperty('--motion-delay', delay + 'ms');
    if (reduce || !observer) el.classList.add('is-visible'); else observer.observe(el);
  }
  function revealPage() {
    document.querySelectorAll('.cats .cat, .craft article, .steps li, .contact-links > *, .foot > *').forEach(function (el, i) { reveal(el, (i % 4) * 80); });
    document.querySelectorAll('.grid .card').forEach(function (el, i) { reveal(el, (i % 4) * 80); });
    document.querySelectorAll('.story .split > *, .section > h2, .section > .lede, .head-row').forEach(function (el) { reveal(el); });
  }
  revealPage();
  var grid = document.getElementById('grid');
  if (grid && 'MutationObserver' in window) new MutationObserver(revealPage).observe(grid, { childList: true });
}());
