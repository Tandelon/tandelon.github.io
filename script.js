// Small progressive-enhancement JS: year, scroll reveal, active nav highlighting

// Copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// IntersectionObserver reveal
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
} else {
  // Fallback: show immediately
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
}

// Smooth scroll enhancement for internal links (respects CSS scroll-behavior)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;
    // Let browser handle native smooth-scroll; prevent if needed
  });
});

// Active nav link based on section in view
(function activeNav() {
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  if (navLinks.length === 0 || !('IntersectionObserver' in window)) return;

  const map = new Map();
  navLinks.forEach(a => {
    const id = a.getAttribute('href');
    const sec = document.querySelector(id);
    if (sec) map.set(sec, a);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = map.get(entry.target);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  map.forEach((_, section) => io.observe(section));
})();

