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

/* ===== 💬 Widget flottant "Notez SLATE" (sur toutes les pages) =====
   Les avis partent sur le serveur — le propriétaire les lit dans son espace privé. */
(function () {
  const API = "https://slate-app-05xa.onrender.com";
  const css = `
  #fbBtn{position:fixed;right:14px;bottom:86px;z-index:150;background:linear-gradient(120deg,#22313f,#31465c);color:#fff;border:1.5px solid rgba(201,162,39,.55);border-radius:99px;padding:11px 16px;font-size:13px;font-weight:800;cursor:pointer;font-family:inherit;box-shadow:0 10px 28px rgba(21,31,41,.35);display:flex;align-items:center;gap:7px;transition:transform .15s}
  #fbBtn:hover{transform:translateY(-2px)}
  #fbBox{position:fixed;right:14px;bottom:146px;z-index:151;width:300px;max-width:calc(100vw - 28px);background:#fff;border:1px solid #e9e3d6;border-radius:16px;box-shadow:0 24px 60px rgba(21,31,41,.35);padding:18px;display:none;font-family:inherit}
  #fbBox.show{display:block;animation:fbIn .25s}
  @keyframes fbIn{from{opacity:0;transform:translateY(10px)}to{opacity:1}}
  #fbBox b{font-size:15px;color:#22313f;display:block}
  #fbBox p{font-size:11.5px;color:#7a8491;margin:4px 0 10px}
  #fbStars{display:flex;gap:4px;margin-bottom:10px}
  #fbStars button{background:none;border:none;font-size:26px;cursor:pointer;color:#d9d2c0;padding:0;transition:transform .1s}
  #fbStars button.on{color:#c9a227;transform:scale(1.12)}
  #fbBox textarea{width:100%;min-height:72px;border:1.5px solid #e7e1d3;border-radius:10px;padding:10px;font-size:12.5px;font-family:inherit;resize:vertical;background:#fdfcf9}
  #fbBox textarea:focus{outline:none;border-color:#c9a227}
  #fbSend{width:100%;margin-top:10px;background:linear-gradient(90deg,#c9a227,#a8842c);color:#fff;border:none;border-radius:10px;padding:12px;font-size:13px;font-weight:800;cursor:pointer}
  #fbSend:disabled{opacity:.55}
  #fbBox .x{position:absolute;top:10px;right:12px;background:none;border:none;font-size:15px;color:#b0a894;cursor:pointer}`;
  document.addEventListener("DOMContentLoaded", () => {
    const done = loadLS("slate_avis_done", 0);
    if (done && Date.now() - done < 30 * 864e5) return; // déjà noté → tranquille 30 jours
    const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <button id="fbBtn">💬 Avis</button>
      <div id="fbBox">
        <button class="x" id="fbClose">✕</button>
        <b>Notez SLATE ⭐</b>
        <p>Suggestion, critique, idée ? Dites tout — lu personnellement par l'équipe 🌱</p>
        <div id="fbStars">${[1,2,3,4,5].map(i => `<button data-s="${i}">★</button>`).join("")}</div>
        <textarea id="fbMsg" placeholder="Ex : Ajoutez ceci… j'adore cela… ceci ne marche pas…"></textarea>
        <button id="fbSend" disabled>Envoyer mon avis 🚀</button>
      </div>`;
    document.body.appendChild(wrap);
    let stars = 0;
    const box = document.getElementById("fbBox");
    document.getElementById("fbBtn").onclick = () => box.classList.toggle("show");
    document.getElementById("fbClose").onclick = () => box.classList.remove("show");
    document.querySelectorAll("#fbStars button").forEach(b => b.onclick = () => {
      stars = +b.dataset.s;
      document.querySelectorAll("#fbStars button").forEach(x => x.classList.toggle("on", +x.dataset.s <= stars));
      document.getElementById("fbSend").disabled = false;
    });
    document.getElementById("fbSend").onclick = async () => {
      const msg = document.getElementById("fbMsg").value.trim();
      if (!stars) { toast("Choisissez d'abord une note ⭐"); return; }
      if (msg.length < 2) { toast("Écrivez un petit message ✍️"); return; }
      const btn = document.getElementById("fbSend");
      btn.disabled = true; btn.textContent = "Envoi en cours… (le serveur se réveille ~30 s ☕)";
      try {
        const r = await fetch(API + "/api/avis", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ stars, msg, page: location.pathname })
        });
        const d = await r.json();
        if (!d.ok) throw new Error(d.error || "err");
        saveLS("slate_avis_done", Date.now());
        box.classList.remove("show");
        document.getElementById("fbBtn").style.display = "none";
        toast("🙏 Merci infiniment pour votre avis !", 4500);
      } catch (e) {
        btn.disabled = false; btn.textContent = "Envoyer mon avis 🚀";
        toast("😕 Connexion impossible — réessayez dans 30 s");
      }
    };
  });
})();
