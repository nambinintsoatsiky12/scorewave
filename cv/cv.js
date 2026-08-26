/* ===== CV Pro · SLATE ===== */
const KEY = "slate_cv";
let state = loadLS(KEY, {
  tpl: "cl", ac: "#22313f",
  name: "", role: "", email: "", phone: "", city: "", link: "", photo: "", summary: "",
  exp: [{ poste: "", org: "", debut: "", fin: "", desc: "" }],
  edu: [{ diplome: "", ecole: "", annees: "", desc: "" }],
  skills: "",
  langs: [{ lang: "", niveau: "Courant" }]
});
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
}

/* ---------- Collecte DOM → état ---------- */
function collect() {
  ["name", "role", "email", "phone", "city", "link", "summary", "skills"].forEach(k => state[k] = $("#f-" + k).value);
  state.tpl = $("#f-tpl").value;
  [["exp", ["poste", "org", "debut", "fin", "desc"]],
   ["edu", ["diplome", "ecole", "annees", "desc"]],
   ["langs", ["lang", "niveau"]]].forEach(([k, fs]) => {
    $$(`.row-item[data-k="${k}"]`).forEach((row, i) => fs.forEach(f => {
      state[k][i][f] = row.querySelector(`[data-f="${f}"]`).value;
    }));
  });
}

/* ---------- Rendu Aperçu A4 ---------- */
const contactLine = () => [state.email, state.phone, state.city, state.link].filter(Boolean).map(esc).join(" · ");
const itemHTML = (t, o, d1, d2, p) => `
  <div class="it"><div class="r1"><span class="t">${esc(t)}</span><span class="d">${esc([d1, d2].filter(Boolean).join(" – "))}</span></div>
  ${o ? `<div class="o">${esc(o)}</div>` : ""}${p ? `<p>${esc(p)}</p>` : ""}</div>`;
const expHTML = () => state.exp.filter(x => x.poste || x.org).map(x => itemHTML(x.poste, x.org, x.debut, x.fin, x.desc)).join("");
const eduHTML = () => state.edu.filter(x => x.diplome || x.ecole).map(x => itemHTML(x.diplome, x.ecole, x.annees, "", x.desc)).join("");
const skillsArr = () => state.skills.split(",").map(s => s.trim()).filter(Boolean);
const dots = n => { const i = LEVELS.indexOf(n) + 1 || 3; return `<span class="dots">${[1,2,3,4,5].map(j => `<i class="${j <= i ? "f" : ""}"></i>`).join("")}</span>`; };

function render() {
  const s = state;
  let inner = "";
  if (s.tpl === "md") {
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
      <div class="ct">${contactLine() || "email · téléphone · ville"}</div>
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

/* ---------- Init formulaire ---------- */
function fillForm() {
  ["name", "role", "email", "phone", "city", "link", "summary", "skills"].forEach(k => $("#f-" + k).value = state[k] || "");
  $("#f-tpl").value = state.tpl;
  $$("#swatches .sw").forEach(sw => sw.classList.toggle("on", sw.dataset.c === state.ac));
  renderRows();
}

document.addEventListener("DOMContentLoaded", () => {
  fillForm(); render(); fit();
  window.addEventListener("resize", fit);

  $(".form-col").addEventListener("input", () => { collect(); render(); save(); });
  $(".form-col").addEventListener("change", () => { collect(); render(); save(); });

  $("#addExp").onclick  = () => { collect(); state.exp.push({ poste: "", org: "", debut: "", fin: "", desc: "" }); renderRows(); save(); };
  $("#addEdu").onclick  = () => { collect(); state.edu.push({ diplome: "", ecole: "", annees: "", desc: "" }); renderRows(); save(); };
  $("#addLang").onclick = () => { collect(); state.langs.push({ lang: "", niveau: "Courant" }); renderRows(); save(); };

  $(".form-col").addEventListener("click", e => {
    const del = e.target.closest(".del"); if (!del) return;
    const row = del.closest(".row-item"); collect();
    state[row.dataset.k].splice(+row.dataset.i, 1);
    renderRows(); render(); save();
  });

  $("#swatches").addEventListener("click", e => {
    const sw = e.target.closest(".sw"); if (!sw) return;
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
