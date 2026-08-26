/* ===== CV Pro · SLATE ===== */
const KEY = "slate_cv";
const DEFAULTS = {
  tpl: "cl", ac: "#22313f",
  name: "", role: "", email: "", phone: "", city: "", link: "", photo: "", summary: "",
  exp: [{ poste: "", org: "", debut: "", fin: "", desc: "" }],
  edu: [{ diplome: "", ecole: "", annees: "", desc: "" }],
  skills: "",
  langs: [{ lang: "", niveau: "Courant" }],
  certs: [{ nom: "", org: "", annees: "" }],
  refs: [{ nom: "", poste: "", contact: "" }]
};
let state = Object.assign({}, DEFAULTS, loadLS(KEY, {}));

/* ===== Niveaux d'accès (free / pro / hyper) ===== */
const API_URL = "https://slate-app-05xa.onrender.com";
const RANK = { free: 0, pro: 1, hyper: 2 };
const PRIX = { pro: 5000, hyper: 15000 };
let myTier = "free";

/* ===== 5 accroches prêtes (offre Pro) ===== */
const ACCROCHES = [
  { t: "😊 Généraliste motivé", x: "Personne rigoureuse, ponctuelle et déterminée, je m'adapte rapidement et j'accorde une grande importance au travail bien fait. Disponible immédiatement, je souhaite mettre mon énergie et mon sérieux au service de votre équipe." },
  { t: "🎓 Jeune diplômé(e)", x: "Jeune diplômé(e) en [votre domaine], passionné(e) et formé(e) aux méthodes actuelles de mon secteur. Je recherche un premier poste où apprendre vite, produire des résultats concrets et grandir aux côtés de votre équipe." },
  { t: "💼 Commercial / Vente", x: "Commercial(e) de terrain, à l'aise avec les clients et animé(e) par les résultats. J'ai appris à écouter, convaincre et fidéliser. Objectif constant : dépasser les objectifs fixés, avec le sourire et dans le respect des clients." },
  { t: "🏅 Profil expérimenté", x: "[X] années d'expérience dans [votre domaine], dont plusieurs chez [entreprise]. J'ai piloté [missions clés] avec un fil conducteur : la qualité du travail et la satisfaction client. Je sais coordonner une équipe et former les nouveaux." },
  { t: "💻 Technique / Informatique", x: "Profil technique rigoureux, autonome et curieux. Maîtrise de [vos outils / technologies]. J'aime résoudre des problèmes concrets et livrer un travail propre, documenté et dans les délais." }
];

/* ===== 10 secrets d'un CV gagnant (offre Pro) ===== */
const TIPS = [
  "<b>Une page, pas deux.</b> Un recruteur accorde 6 à 8 secondes à un CV : l'essentiel doit sauter aux yeux.",
  "<b>Personnalisez chaque envoi.</b> Reprenez les mots-clés exacts de l'annonce dans votre profil et vos compétences.",
  "<b>Chiffrez vos résultats.</b> « +30 % de ventes » convainc plus que « bon vendeur ».",
  "<b>Adresse e-mail professionnelle.</b> prenom.nom@mail.com — pas de surnom d'adolescence 😅.",
  "<b>Zéro faute.</b> Une seule coquille peut éliminer un CV : faites relire par quelqu'un de sérieux.",
  "<b>Le plus récent d'abord.</b> Expériences et formations en ordre antichronologique (le récent en haut).",
  "<b>Photo professionnelle ou rien.</b> Fond neutre, visage clair, tenue correcte — jamais de photo de fête.",
  "<b>Ne mentez jamais.</b> Tout se vérifie à l'entretien ou au téléphone avec vos anciens employeurs.",
  "<b>Verbes d'action.</b> Commencez chaque mission par : géré, créé, amélioré, formé, réduit, lancé…",
  "<b>Nommez le PDF proprement.</b> Prenom_NOM_CV.pdf — le recruteur vous retrouve instantanément."
];
const esc = s => String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const LEVELS = ["Débutant", "Intermédiaire", "Courant", "Bilingue", "Langue maternelle"];
let deb;
const save = () => { clearTimeout(deb); deb = setTimeout(() => saveLS(KEY, state), 300); };

/* ---------- Formulaire : listes répétables ---------- */
function renderRows() {
  $("#expList").innerHTML = state.exp.map((x, i) => `
    <div class="row-item" data-k="exp" data-i="${i}">
      <button class="del" title="Supprimer">✕ Supprimer</button>
      <div class="grid2">
        <div class="field"><label>Poste</label><input data-f="poste" value="${esc(x.poste)}" placeholder="Ex : Vendeuse"></div>
        <div class="field"><label>Entreprise</label><input data-f="org" value="${esc(x.org)}" placeholder="Ex : Shop Tanà"></div>
      </div>
      <div class="grid2">
        <div class="field"><label>Début</label><input data-f="debut" value="${esc(x.debut)}" placeholder="2022"></div>
        <div class="field"><label>Fin</label><input data-f="fin" value="${esc(x.fin)}" placeholder="Aujourd'hui"></div>
      </div>
      <div class="field"><label>Missions / réalisations</label><textarea data-f="desc" placeholder="Décrivez vos résultats…">${esc(x.desc)}</textarea></div>
    </div>`).join("");
  $("#eduList").innerHTML = state.edu.map((x, i) => `
    <div class="row-item" data-k="edu" data-i="${i}">
      <button class="del" title="Supprimer">✕ Supprimer</button>
      <div class="field"><label>Diplôme</label><input data-f="diplome" value="${esc(x.diplome)}" placeholder="Ex : Licence Informatique"></div>
      <div class="grid2">
        <div class="field"><label>Établissement</label><input data-f="ecole" value="${esc(x.ecole)}" placeholder="Ex : Université d'Antananarivo"></div>
        <div class="field"><label>Années</label><input data-f="annees" value="${esc(x.annees)}" placeholder="2018 – 2022"></div>
      </div>
      <div class="field"><label>Détail (optionnel)</label><input data-f="desc" value="${esc(x.desc)}" placeholder="Mention, prix…"></div>
    </div>`).join("");
  $("#langList").innerHTML = state.langs.map((x, i) => `
    <div class="row-item" data-k="langs" data-i="${i}">
      <button class="del" title="Supprimer">✕ Supprimer</button>
      <div class="grid2">
        <div class="field"><label>Langue</label><input data-f="lang" value="${esc(x.lang)}" placeholder="Français"></div>
        <div class="field"><label>Niveau</label><select data-f="niveau">${LEVELS.map(l => `<option ${l === x.niveau ? "selected" : ""}>${l}</option>`).join("")}</select></div>
      </div>
    </div>`).join("");
  $("#certList").innerHTML = state.certs.map((x, i) => `
    <div class="row-item" data-k="certs" data-i="${i}">
      <button class="del" title="Supprimer">✕ Supprimer</button>
      <div class="field"><label>Certification / distinction</label><input data-f="nom" value="${esc(x.nom)}" placeholder="Ex : Permis B, TOEIC 850"></div>
      <div class="grid2">
        <div class="field"><label>Organisme</label><input data-f="org" value="${esc(x.org)}" placeholder="Ex : EMIT Fianarantsoa"></div>
        <div class="field"><label>Année</label><input data-f="annees" value="${esc(x.annees)}" placeholder="2024"></div>
      </div>
    </div>`).join("");
  $("#refList").innerHTML = state.refs.map((x, i) => `
    <div class="row-item" data-k="refs" data-i="${i}">
      <button class="del" title="Supprimer">✕ Supprimer</button>
      <div class="field"><label>Nom du référent</label><input data-f="nom" value="${esc(x.nom)}" placeholder="Ex : Mme Rasoanirina"></div>
      <div class="grid2">
        <div class="field"><label>Poste / lien</label><input data-f="poste" value="${esc(x.poste)}" placeholder="Ex : Directrice, Shop Tanà"></div>
        <div class="field"><label>Contact</label><input data-f="contact" value="${esc(x.contact)}" placeholder="Tél ou email"></div>
      </div>
    </div>`).join("");
}

/* ---------- Collecte DOM → état ---------- */
function collect() {
  ["name", "role", "email", "phone", "city", "link", "summary", "skills"].forEach(k => state[k] = $("#f-" + k).value);
  state.tpl = $("#f-tpl").value;
  [["exp", ["poste", "org", "debut", "fin", "desc"]],
   ["edu", ["diplome", "ecole", "annees", "desc"]],
   ["langs", ["lang", "niveau"]],
   ["certs", ["nom", "org", "annees"]],
   ["refs", ["nom", "poste", "contact"]]].forEach(([k, fs]) => {
    $$(`.row-item[data-k="${k}"]`).forEach((row, i) => fs.forEach(f => {
      state[k][i][f] = row.querySelector(`[data-f="${f}"]`).value;
    }));
  });
}

/* ---------- Rendu Aperçu A4 ---------- */
const contactLine = () => [state.email, state.phone, state.city, state.link].filter(Boolean).map(esc).join(" · ");
const contactSpans = () => [[state.email, "✉"], [state.phone, "☎"], [state.city, "📍"], [state.link, "🔗"]].filter(x => x[0]).map(x => `<span>${x[1]} ${esc(x[0])}</span>`).join(" ");
const itemHTML = (t, o, d1, d2, p) => `
  <div class="it"><div class="r1"><span class="t">${esc(t)}</span><span class="d">${esc([d1, d2].filter(Boolean).join(" – "))}</span></div>
  ${o ? `<div class="o">${esc(o)}</div>` : ""}${p ? `<p>${esc(p)}</p>` : ""}</div>`;
const expHTML = () => state.exp.filter(x => x.poste || x.org).map(x => itemHTML(x.poste, x.org, x.debut, x.fin, x.desc)).join("");
const eduHTML = () => state.edu.filter(x => x.diplome || x.ecole).map(x => itemHTML(x.diplome, x.ecole, x.annees, "", x.desc)).join("");
const skillsArr = () => state.skills.split(",").map(s => s.trim()).filter(Boolean);
const dots = n => { const i = LEVELS.indexOf(n) + 1 || 3; return `<span class="dots">${[1,2,3,4,5].map(j => `<i class="${j <= i ? "f" : ""}"></i>`).join("")}</span>`; };
const certHTML = () => state.certs.filter(x => x.nom || x.org).map(x =>
  `<div class="it"><div class="r1"><span class="t" style="font-size:10px">${esc(x.nom)}</span><span class="d">${esc(x.annees)}</span></div>${x.org ? `<div class="o">${esc(x.org)}</div>` : ""}</div>`).join("");
const refHTML = () => state.refs.filter(x => x.nom || x.contact).map(x =>
  `<div class="it"><span class="t" style="font-size:10px">${esc(x.nom)}</span>${x.poste ? `<div class="o">${esc(x.poste)}</div>` : ""}${x.contact ? `<p style="margin:1px 0 0">${esc(x.contact)}</p>` : ""}</div>`).join("");
const langBars = () => state.langs.filter(l => l.lang).map(l => {
  const i = LEVELS.indexOf(l.niveau) + 1 || 3;
  return `<div style="font-size:9.5px;font-weight:700;color:#4b4637">${esc(l.lang)}</div><div class="bar"><i style="width:${i * 20}%"></i></div>`;
}).join("");

function render() {
  const s = state;
  let inner = "";
  if (s.tpl === "pt") {
    /* ===== PRESTIGE (Hyper Pro) ===== */
    inner = `
    <div class="pt-head">
      ${s.photo ? `<img class="pt-ph" src="${s.photo}" alt="">` : ""}
      <div>
        <div class="pt-name">${esc(s.name) || "Votre Nom"}</div>
        <div class="pt-role">${esc(s.role) || "Titre du poste"}</div>
        <div class="pt-ct">${contactLine() || "email · téléphone · ville"}</div>
      </div>
    </div>
    <div class="pt-body">
      <div class="pt-main">
        ${s.summary ? `<div class="prsum">${esc(s.summary)}</div>` : ""}
        ${expHTML() ? `<div class="sec"><h6>Expérience professionnelle</h6><div class="timeline">${expHTML()}</div></div>` : ""}
        ${eduHTML() ? `<div class="sec"><h6>Formation</h6><div class="timeline">${eduHTML()}</div></div>` : ""}
      </div>
      <div class="pt-rail">
        ${skillsArr().length ? `<div class="blk" style="margin-bottom:16px"><h6>Compétences</h6>${skillsArr().map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>` : ""}
        ${s.langs.some(l => l.lang) ? `<div class="blk" style="margin-bottom:16px"><h6>Langues</h6>${langBars()}</div>` : ""}
        ${certHTML() ? `<div class="blk" style="margin-bottom:16px"><h6>Certifications</h6>${certHTML()}</div>` : ""}
        ${refHTML() ? `<div class="blk"><h6>Références</h6>${refHTML()}</div>` : ""}
      </div>
    </div>`;
  } else if (s.tpl === "md") {
    inner = `
    <aside>
      ${s.photo ? `<img class="ph" src="${s.photo}" alt="">` : ""}
      <div class="blk"><h6>Contact</h6><p>
        ${[s.email, s.phone, s.city, s.link].filter(Boolean).map(v => esc(v)).join("</p><p>") || '<span class="muted">—</span>'}
      </p></div>
      ${skillsArr().length ? `<div class="blk"><h6>Compétences</h6><p>${skillsArr().map(esc).join("</p><p>")}</p></div>` : ""}
      ${s.langs.some(l => l.lang) ? `<div class="blk"><h6>Langues</h6>${s.langs.filter(l => l.lang).map(l => `<div class="dotrow"><span style="flex:1">${esc(l.lang)}</span>${dots(l.niveau)}</div>`).join("")}</div>` : ""}
    </aside>
    <main>
      <div class="name">${esc(s.name) || "Votre Nom"}</div>
      <div class="role">${esc(s.role) || "Titre du poste"}</div>
      ${s.summary ? `<div class="sec" style="margin-top:18px"><h6>Profil</h6><p style="text-align:justify">${esc(s.summary)}</p></div>` : ""}
      ${expHTML() ? `<div class="sec"><h6>Expérience</h6>${expHTML()}</div>` : ""}
      ${eduHTML() ? `<div class="sec"><h6>Formation</h6>${eduHTML()}</div>` : ""}
    </main>`;
  } else {
    inner = `
    <div class="hd">
      <div class="name">${esc(s.name) || "Votre Nom"}</div>
      <div class="role">${esc(s.role) || "Titre du poste"}</div>
      <div class="ct">${contactSpans() || "✉ email · ☎ téléphone · 📍 ville"}</div>
      ${s.photo ? `<img src="${s.photo}" style="width:86px;height:86px;border-radius:50%;object-fit:cover;margin:12px auto 0;border:3px solid ${s.ac}">` : ""}
      <hr>
    </div>
    ${s.summary ? `<div class="sec"><h6>Profil</h6><p style="text-align:justify">${esc(s.summary)}</p></div>` : ""}
    ${expHTML() ? `<div class="sec"><h6>Expérience professionnelle</h6>${expHTML()}</div>` : ""}
    ${eduHTML() ? `<div class="sec"><h6>Formation</h6>${eduHTML()}</div>` : ""}
    ${skillsArr().length ? `<div class="sec"><h6>Compétences</h6><p>${skillsArr().map(esc).join(" · ")}</p></div>` : ""}
    ${s.langs.some(l => l.lang) ? `<div class="sec"><h6>Langues</h6><p>${s.langs.filter(l => l.lang).map(l => esc(l.lang) + " <span class='muted'>(" + esc(l.niveau) + ")</span>").join(" · ")}</p></div>` : ""}`;
  }
  $("#paper").innerHTML = `<div class="cv ${s.tpl}" style="--ac:${s.ac}">${inner}</div>`;
}

/* ---------- Aperçu responsive (papier A4 = 794×1123) ---------- */
function fit() {
  const w = $("#scaler").clientWidth, sc = w / 794;
  $("#paper").style.transform = `scale(${sc})`;
  $("#scaler").style.height = 1123 * sc + "px";
}

/* ---------- Niveaux payants : pass, verrous, rappel hebdo ---------- */
const TPL_RANK = { cl: 0, md: 1, pt: 2 };
let payTier = "pro", payImg = null, payMime = "image/jpeg";
const MSGS2 = ["🤖 L'IA lit votre reçu…", "🔎 Vérification du numéro et du montant…", "📅 Contrôle de la date et de la référence…", "☕ Le serveur se réveille peut-être (~30 s)…"];

function refreshPass(silent) {
  const pass = loadLS("slate_cv_pass", null);
  const now = Date.now();
  let html = "";
  if (pass && pass.until > now) {
    myTier = pass.tier;
    const days = Math.ceil((pass.until - now) / 864e5);
    html = `<div class="passbox ok">${pass.tier === "hyper" ? "👑 Mode Hyper Pro" : "💼 Mode Pro"} actif — plus que <b>&nbsp;${days} jour${days > 1 ? "s" : ""}</b></div>`;
    const weeks = Math.ceil(days / 7);
    const last = loadLS("slate_cv_notice", 0);
    if (!silent && now - last > 7 * 864e5) {
      saveLS("slate_cv_notice", now);
      setTimeout(() => toast(`⏳ Rappel d'abonnement : il te reste ${weeks} semaine${weeks > 1 ? "s" : ""} (${days} jours) de mode ${pass.tier === "hyper" ? "Hyper Pro 👑" : "Pro 💼"}`, 6500), 1500);
    }
  } else if (pass) {
    myTier = "free";
    html = `<div class="passbox warn">⏰ Ton accès Pro a expiré (30 jours écoulés). Renouvelle pour garder tes modèles premium. <button class="btn btn-gold" id="renewBtn">Renouveler →</button></div>`;
  } else {
    myTier = "free";
    html = `<div class="passbox free">✨ Version <b>gratuite</b> — débloquez les modèles premium, accroches et secrets de recruteurs <button class="btn btn-slate" id="renewBtn">👑 Voir les offres</button></div>`;
  }
  // Rétrogradation douce si le modèle sauvegardé dépasse le niveau actuel
  if (TPL_RANK[state.tpl] > RANK[myTier]) state.tpl = "cl";
  $("#passBar").innerHTML = html;
  applyTier();
}

function applyTier() {
  $$("#swatches .sw").forEach(sw => sw.classList.toggle("lock", RANK[sw.dataset.t || "free"] > RANK[myTier]));
  $$(".prolock").forEach(p => {
    const need = p.dataset.need;
    const covered = p.querySelector(":scope > .cover");
    if (RANK[need] > RANK[myTier]) {
      if (!covered) {
        const c = document.createElement("div");
        c.className = "cover";
        c.innerHTML = `<div><b>${need === "hyper" ? "👑 Hyper Pro" : "💼 Offre Pro"}</b>
          <p>Cette section fait partie de l'offre ${need === "hyper" ? "Hyper Pro — 15 000 Ar/mois" : "Pro — 5 000 Ar/mois"}.</p>
          <button class="btn btn-gold">Débloquer →</button></div>`;
        c.querySelector("button").onclick = () => openPay(need);
        p.appendChild(c);
      }
    } else if (covered) covered.remove();
  });
}

/* ---------- Modal paiement ---------- */
function openPay(t) { if (t) payTier = t; showStep1(); $("#payModal").classList.add("show"); }
function showStep1() { $("#payStep1").style.display = "block"; $("#payStep2").style.display = "none"; }
function showStep2() {
  $("#payStep1").style.display = "none"; $("#payStep2").style.display = "block";
  $("#payTitle").textContent = payTier === "hyper" ? "👑 CV Hyper Pro — 15 000 Ar / 30 jours" : "💼 CV Pro — 5 000 Ar / 30 jours";
  $("#payAmount").textContent = PRIX[payTier].toLocaleString("fr-FR") + " Ar";
  payImg = null; $("#payPrev").classList.remove("show"); $("#payPrev").removeAttribute("src");
  $("#payGo").disabled = true;
  $("#payErr").classList.remove("show"); $("#payOk").classList.remove("show"); $("#payLoad").style.display = "none";
}

function handlePayFile(file) {
  if (!file || !file.type.startsWith("image/")) { toast("Choisis une image 📷"); return; }
  const rd = new FileReader();
  rd.onload = e => {
    const im = new Image();
    im.onload = () => {
      const MAX = 1400; let w = im.width, h = im.height;
      if (Math.max(w, h) > MAX) { const k = MAX / Math.max(w, h); w = Math.round(w * k); h = Math.round(h * k); }
      const cv = document.createElement("canvas");
      cv.width = w; cv.height = h;
      cv.getContext("2d").drawImage(im, 0, 0, w, h);
      const du = cv.toDataURL("image/jpeg", 0.85);
      payImg = du.split(",")[1]; payMime = "image/jpeg";
      $("#payPrev").src = du; $("#payPrev").classList.add("show");
      $("#payGo").disabled = false;
      toast("Capture prête ✔ Lance la vérification !");
    };
    im.src = e.target.result;
  };
  rd.readAsDataURL(file);
}

async function verifier() {
  if (!payImg) return;
  $("#payErr").classList.remove("show");
  $("#payGo").disabled = true;
  $("#payLoad").style.display = "block";
  let mi = 0;
  $("#payLoadMsg").textContent = MSGS2[0];
  const mt = setInterval(() => { mi = (mi + 1) % MSGS2.length; $("#payLoadMsg").textContent = MSGS2[mi]; }, 3400);
  try {
    const r = await fetch(API_URL + "/api/verifie-paiement", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: payImg, mime: payMime })
    });
    const d = await r.json();
    clearInterval(mt);
    $("#payLoad").style.display = "none";
    if (!d.ok) {
      $("#payErr").innerHTML = "❌ " + esc(d.error || "Vérification refusée");
      $("#payErr").classList.add("show");
      $("#payGo").disabled = false;
      return;
    }
    saveLS("slate_cv_pass", { tier: d.tier, until: Date.now() + 30 * 864e5, at: new Date().toISOString() });
    myTier = d.tier;
    $("#payOk").innerHTML = `🎉 <b>Paiement validé par IA !</b><br>${d.operateur} · ${Number(d.montant).toLocaleString("fr-FR")} Ar<br>Mode <b>${d.tier === "hyper" ? "👑 Hyper Pro" : "💼 Pro"}</b> actif pendant 30 jours. Bon CV ! ✨`;
    $("#payOk").classList.add("show");
    toast("🎉 Bienvenue en mode " + (d.tier === "hyper" ? "Hyper Pro 👑" : "Pro 💼"), 5000);
    setTimeout(() => { $("#payModal").classList.remove("show"); refreshPass(true); }, 2800);
  } catch (e) {
    clearInterval(mt);
    $("#payLoad").style.display = "none";
    $("#payErr").innerHTML = "😕 Connexion impossible au serveur (il se réveille peut-être : réessaie dans 30 s) ☕";
    $("#payErr").classList.add("show");
    $("#payGo").disabled = false;
  }
}

/* ---------- Init formulaire ---------- */
function fillForm() {
  ["name", "role", "email", "phone", "city", "link", "summary", "skills"].forEach(k => $("#f-" + k).value = state[k] || "");
  $("#f-tpl").value = state.tpl;
  $$("#swatches .sw").forEach(sw => sw.classList.toggle("on", sw.dataset.c === state.ac));
  renderRows();
}

document.addEventListener("DOMContentLoaded", () => {
  /* Contenus Pro : accroches + astuces */
  $("#f-accroche").innerHTML = `<option value="">— Choisir une accroche prête à l'emploi —</option>` +
    ACCROCHES.map((a, i) => `<option value="${i}">${a.t}</option>`).join("");
  $("#tipsList").innerHTML = TIPS.map(t => `<li>${t}</li>`).join("");
  $("#f-accroche").addEventListener("change", e => {
    if (e.target.value === "") return;
    $("#f-summary").value = ACCROCHES[+e.target.value].x;
    collect(); render(); save();
    toast("Accroche insérée ✨ Adaptez-la à votre profil !");
    e.target.value = "";
  });

  refreshPass(); fillForm(); render(); fit();
  window.addEventListener("resize", fit);

  /* Modal paiement */
  $("#proBtn").onclick = () => openPay();
  $("#payClose").onclick = () => $("#payModal").classList.remove("show");
  $("#payBack").onclick = showStep1;
  $("#payModal").addEventListener("click", e => { if (e.target.id === "payModal") $("#payModal").classList.remove("show"); });
  $$(".offer").forEach(o => o.onclick = () => { payTier = o.dataset.tier; showStep2(); });
  $$(".paynum .cp").forEach(b => b.onclick = async () => {
    try { await navigator.clipboard.writeText(b.dataset.n); } catch {}
    b.textContent = "Copié ✔"; setTimeout(() => b.textContent = "Copier", 1500);
  });
  $("#payZone").onclick = () => $("#payFile").click();
  $("#payFile").onchange = e => handlePayFile(e.target.files[0]);
  $("#payGo").onclick = verifier;

  /* Garde du sélecteur de modèle */
  $("#f-tpl").addEventListener("change", e => {
    const opt = e.target.selectedOptions[0];
    const need = RANK[opt.dataset.t || "free"];
    if (need > RANK[myTier]) {
      toast("🔒 Ce modèle est réservé à l'offre " + (opt.dataset.t === "hyper" ? "Hyper Pro 👑" : "Pro 💼"));
      openPay(opt.dataset.t);
      e.target.value = state.tpl = "cl";
      render(); save();
    }
  });

  $(".form-col").addEventListener("input", () => { collect(); render(); save(); });
  $(".form-col").addEventListener("change", () => { collect(); render(); save(); });

  $("#addExp").onclick  = () => { collect(); state.exp.push({ poste: "", org: "", debut: "", fin: "", desc: "" }); renderRows(); save(); };
  $("#addEdu").onclick  = () => { collect(); state.edu.push({ diplome: "", ecole: "", annees: "", desc: "" }); renderRows(); save(); };
  $("#addLang").onclick = () => { collect(); state.langs.push({ lang: "", niveau: "Courant" }); renderRows(); save(); };
  const addCert = document.getElementById("addCert"); if (addCert) addCert.onclick = () => { collect(); state.certs.push({ nom: "", org: "", annees: "" }); renderRows(); save(); };
  const addRef = document.getElementById("addRef"); if (addRef) addRef.onclick = () => { collect(); state.refs.push({ nom: "", poste: "", contact: "" }); renderRows(); save(); };

  $(".form-col").addEventListener("click", e => {
    const del = e.target.closest(".del"); if (!del) return;
    const row = del.closest(".row-item"); collect();
    state[row.dataset.k].splice(+row.dataset.i, 1);
    renderRows(); render(); save();
  });

  $("#swatches").addEventListener("click", e => {
    const sw = e.target.closest(".sw"); if (!sw) return;
    if (RANK[sw.dataset.t || "free"] > RANK[myTier]) {
      toast("🔒 Cette couleur est réservée à l'offre " + (sw.dataset.t === "hyper" ? "Hyper Pro 👑" : "Pro 💼"));
      openPay(sw.dataset.t);
      return;
    }
    state.ac = sw.dataset.c;
    $$("#swatches .sw").forEach(x => x.classList.toggle("on", x === sw));
    render(); save();
  });

  $("#f-photo").addEventListener("change", e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { state.photo = r.result; render(); save(); toast("Photo ajoutée ✨"); };
    r.readAsDataURL(f);
  });

  $("#resetBtn").onclick = () => {
    if (!confirm("Effacer toutes les informations du CV ?")) return;
    localStorage.removeItem(KEY); location.reload();
  };
  $("#pdfBtn").onclick = () => { toast("Choisissez « Enregistrer au format PDF » dans la fenêtre d'impression 📄"); setTimeout(() => window.print(), 600); };

  /* Onglets mobile Éditer / Aperçu */
  $("#seg").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#seg button").forEach(x => x.classList.toggle("on", x === b));
    $("#ws").classList.toggle("showP", b.dataset.t === "view");
    setTimeout(fit, 30);
  });
});
