// Pohyb na webu: odhalování prvků, scroll-scrubbing (proměnná --p 0–1), počítadla.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');
if (reduce) document.documentElement.classList.add('reduce');

// 1) Odhalení při posunu
const io = new IntersectionObserver(
  (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
  { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

// 2) Scrubbing: sekce s data-scrub dostane --p podle toho, jak daleko je proscrollovaná
const scrubs = Array.from(document.querySelectorAll<HTMLElement>('[data-scrub]'));
let ticking = false;
function update() {
  ticking = false;
  const vh = window.innerHeight;
  for (const el of scrubs) {
    const r = el.getBoundingClientRect();
    const mode = el.dataset.scrub;
    let p: number;
    if (mode === 'pass') p = (vh - r.top) / (vh + r.height); // prvek projíždí obrazovkou
    else p = -r.top / Math.max(1, r.height - vh); // sticky sekce
    p = Math.min(1, Math.max(0, p));
    if (reduce) p = Number(el.dataset.reduceP ?? 1);
    el.style.setProperty('--p', p.toFixed(4));
    const steps = Number(el.dataset.steps || 0);
    if (steps) el.dataset.step = String(Math.min(steps - 1, Math.floor(p * steps * 0.999)));
  }
}
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
if (scrubs.length) { window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll); update(); }

// 3) Počítadla čísel
const cio = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const el = e.target as HTMLElement; cio.unobserve(el);
  const to = Number(el.dataset.count); const from = Number(el.dataset.from ?? 0);
  if (reduce) { el.textContent = fmt(to, el); return; }
  const t0 = performance.now(); const dur = 1400;
  const step = (t: number) => {
    const k = Math.min(1, (t - t0) / dur); const v = from + (to - from) * (1 - Math.pow(1 - k, 3));
    el.textContent = fmt(v, el); if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}), { threshold: 0.6 });
function fmt(v: number, el: HTMLElement) {
  const r = Math.round(v);
  return (el.dataset.plain ? String(r) : r.toLocaleString('cs-CZ')).replace('-', '−');
}
document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));
