/* ===== SLATE — moteur commun ===== */
const $  = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function toast(msg, ms = 3200) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), ms);
}

/* Sauvegarde locale — vos données ne quittent jamais votre appareil */
function saveLS(key, obj) { try { localStorage.setItem(key, JSON.stringify(obj)); } catch {} }
function loadLS(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; }
}

document.addEventListener("DOMContentLoaded", () => {
  /* Année du footer */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* Menu mobile */
  const mb = document.getElementById("menuBtn"), mm = document.getElementById("mobileMenu");
  if (mb && mm) {
    mb.addEventListener("click", () => mm.classList.toggle("open"));
    mm.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mm.classList.remove("open")));
  }

  /* Animations d'apparition au défilement */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12 });
  $$(".reveal").forEach(el => io.observe(el));

  /* Newsletter (démo : stockage local) */
  const nf = document.getElementById("newsForm");
  if (nf) nf.addEventListener("submit", e => {
    e.preventDefault();
    const list = loadLS("slate_news", []);
    list.push({ email: $("#newsEmail").value, at: Date.now() });
    saveLS("slate_news", list);
    nf.reset();
    toast("Merci ! Vous serez informé des nouveautés Slate ✨");
  });
});
