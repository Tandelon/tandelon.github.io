const NAV_BREAK = 760;
const body = document.body;
const nav = document.getElementById('nav');
const navToggle = document.querySelector('.nav-toggle');
let scrim = document.querySelector('.nav-scrim');
if (!scrim) { scrim = document.createElement('div'); scrim.className = 'nav-scrim'; scrim.hidden = true; body.appendChild(scrim); }

function openNav(){
  if (!nav) return;
  nav.classList.remove('closed');
  nav.classList.add('open');
  navToggle?.setAttribute('aria-expanded','true');
  scrim.hidden = false;
}

function closeNav(){
  if (!nav) return;
  nav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded','false');
  nav.classList.add('closed');
  scrim.hidden = true;
}

// ensure closed on load
closeNav();

navToggle?.addEventListener('click', () => nav.classList.contains('open') ? closeNav() : openNav());
scrim?.addEventListener('click', closeNav);
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
window.addEventListener('resize', () => { if (window.innerWidth > NAV_BREAK) closeNav(); });

// also close after clicking a nav link
nav?.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', closeNav));
