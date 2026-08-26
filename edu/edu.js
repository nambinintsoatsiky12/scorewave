/* ===== EduPrep · Moteur de quiz + filtres Niveau/Matière ===== */
let cur = null, idx = 0, picked = -1, answers = [], timeLeft = 0, tick = null;
let fLvl = loadLS("slate_edu_lvl", "Tous");   // niveau mémorisé entre deux visites
let fMat = "Toutes";
let fMode = "quiz";                            // "quiz" | "resumes"
const best = loadLS("slate_edu_best", {});
const LEVELS = ["Tous", "6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"];
const LVL_INFO = {
  "6ème": "Collège · début du collège", "5ème": "Collège", "4ème": "Collège",
  "3ème": "Collège · Préparation BEPC", "2nde": "Lycée · Seconde",
  "1ère": "Lycée · Première", "Terminale": "Lycée · Préparation BAC"
};
const esc = s => String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Filtres ---------- */
function renderLvlChips() {
  $("#chipsLvl").innerHTML = LEVELS.map(l =>
    `<button class="fchip ${l === fLvl ? "on" : ""}" data-l="${l}">${l}</button>`).join("");
  $$("#chipsLvl .fchip").forEach(b => b.onclick = () => {
    fLvl = b.dataset.l; fMat = "Toutes";
    saveLS("slate_edu_lvl", fLvl);
    renderLvlChips(); renderMatChips(); renderList();
  });
}
const DATA = () => fMode === "quiz" ? SUBJECTS : RESUMES;
function renderMatChips() {
  const pool = DATA().filter(s => fLvl === "Tous" || s.niveau === fLvl);
  const mats = ["Toutes", ...new Set(pool.map(s => s.matiere))];
  if (!mats.includes(fMat)) fMat = "Toutes";
  $("#chips").innerHTML = mats.map(m =>
    `<button class="fchip ${m === fMat ? "on" : ""}" data-m="${m}">${m}</button>`).join("");
  $$("#chips .fchip").forEach(b => b.onclick = () => { fMat = b.dataset.m; renderMatChips(); renderList(); });
}
const matchF = s => (fLvl === "Tous" || s.niveau === fLvl) && (fMat === "Toutes" || s.matiere === fMat);
const cardHTML = s => `
  <div class="scard" data-id="${s.id}">
    ${fMode === "quiz" && best[s.id] != null ? `<span class="best">★ ${best[s.id]}/${s.qs.length}</span>` : ""}
    <div class="ic">${s.icon}</div>
    <h3>${esc(s.titre)}</h3>
    <div class="meta">${esc(s.matiere)} · ${esc(s.niveau)} · ${fMode === "quiz" ? s.qs.length + " questions · ⏱ " + s.minutes + " min" : s.points.length + " points clés"}</div>
  </div>`;
function renderList() {
  const src = DATA();
  if (fLvl !== "Tous") {
    const list = src.filter(matchF);
    $("#subjList").innerHTML = list.length
      ? `<div class="subj-grid">${list.map(cardHTML).join("")}</div>`
      : `<p class="hint" style="padding:20px">Bientôt de nouveaux contenus pour ce niveau 🔜</p>`;
  } else {
    $("#subjList").innerHTML = LEVELS.slice(1).map(lv => {
      const list = src.filter(s => s.niveau === lv).filter(matchF);
      if (!list.length) return "";
      return `<h2 class="lvl-head">${lv}</h2>
        <p class="lvl-sub">${LVL_INFO[lv]}</p>
        <div class="subj-grid">${list.map(cardHTML).join("")}</div>`;
    }).join("");
  }
  $$("#subjList .scard").forEach(c => c.onclick = () =>
    fMode === "quiz" ? startQuiz(c.dataset.id) : openReader(c.dataset.id));
}
function setMode(m) {
  if (fMode === m) return;
  fMode = m; fMat = "Toutes";
  $("#tabQuiz").classList.toggle("on", m === "quiz");
  $("#tabRes").classList.toggle("on", m === "resumes");
  renderMatChips(); renderList();
}

/* ---------- Lecteur de résumé ---------- */
function openReader(id) {
  const r = RESUMES.find(x => x.id === id);
  if (!r) return;
  $("#readerCard").innerHTML = `
    <h2>${r.icon} ${esc(r.titre)}</h2>
    <div class="rmeta">${esc(r.matiere)} · Classe de ${esc(r.niveau)} · Programme de Madagascar</div>
    ${r.points.map((p, i) => `<div class="rpoint"><span class="rn">${i + 1}</span><span>${p}</span></div>`).join("")}
    <p class="hint" style="margin-top:18px">💡 Entraîne-toi ensuite dans l'onglet « Quiz », ou photographie un exercice avec le <a href="../scanner/"><b>Correcteur photo IA</b></a>.</p>`;
  view("readerView");
}
document.addEventListener("DOMContentLoaded", () => {
  $("#tabQuiz").onclick = () => setMode("quiz");
  $("#tabRes").onclick = () => setMode("resumes");
  const br = $("#backRead");
  if (br) br.onclick = () => view("listView");
});

/* ---------- Quiz ---------- */
function view(name) {
  ["listView", "quizView", "resView", "readerView"].forEach(v => { const el = $("#" + v); if (el) el.style.display = v === name ? "block" : "none"; });
  window.scrollTo({ top: 0 });
}
function startQuiz(id) {
  cur = SUBJECTS.find(s => s.id === id);
  idx = 0; picked = -1; answers = [];
  timeLeft = cur.minutes * 60;
  $("#qtimer").classList.remove("hot");
  clearInterval(tick);
  tick = setInterval(() => { timeLeft--; renderTime(); if (timeLeft <= 0) finish(); }, 1000);
  renderTime();
  view("quizView");
  showQ();
}
function renderTime() {
  const m = Math.floor(Math.max(timeLeft, 0) / 60), s = Math.max(timeLeft, 0) % 60;
  const el = $("#qtimer");
  el.textContent = m + ":" + String(s).padStart(2, "0");
  el.classList.toggle("hot", timeLeft <= 60);
}
function showQ() {
  picked = -1;
  const q = cur.qs[idx];
  $("#qbar").style.width = (idx / cur.qs.length * 100) + "%";
  $("#qcount").textContent = `${cur.matiere} · ${cur.niveau} — Question ${idx + 1}/${cur.qs.length}`;
  $("#qtext").textContent = q.q;
  $("#explain").classList.remove("show");
  $("#nextBtn").disabled = true;
  $("#nextBtn").textContent = idx === cur.qs.length - 1 ? "Voir mon score ✔" : "Question suivante →";
  $("#choices").innerHTML = q.c.map((c, i) => `<button class="choice" data-i="${i}">${esc(c)}</button>`).join("");
  $$("#choices .choice").forEach(b => b.onclick = () => choose(+b.dataset.i));
}
function choose(i) {
  if (picked >= 0) return;
  picked = i;
  const q = cur.qs[idx];
  answers[idx] = i;
  $$("#choices .choice").forEach((b, j) => {
    b.disabled = true;
    if (j === q.a) b.classList.add("good");
    else if (j === i) b.classList.add("bad");
  });
  $("#explainTxt").textContent = q.e;
  $("#explain").classList.add("show");
  $("#nextBtn").disabled = false;
}
function next() { idx < cur.qs.length - 1 ? (idx++, showQ()) : finish(); }
function finish() {
  clearInterval(tick);
  if (timeLeft <= 0) toast("⏱ Temps écoulé !");
  const score = cur.qs.reduce((s, q, i) => s + (answers[i] === q.a ? 1 : 0), 0);
  best[cur.id] = Math.max(best[cur.id] ?? -1, score);
  saveLS("slate_edu_best", best);
  const n = cur.qs.length, pct = score / n;
  $("#scoreNum").innerHTML = score + "<em>/" + n + "</em>";
  $("#scoreMsg").textContent =
    pct === 1 ? "🏆 Parfait ! Niveau examen atteint !" :
    pct >= .8 ? "💪 Très bien ! Encore un petit effort." :
    pct >= .5 ? "📚 Pas mal — relisez les corrections ci-dessous." :
                "🌱 On progresse ! Étudiez bien chaque étape ci-dessous.";
  $("#review").innerHTML = cur.qs.map((q, i) => `
    <div class="review">
      <div class="qt">${i + 1}. ${esc(q.q)}</div>
      <div class="rr ${answers[i] === q.a ? "good" : "bad"}">Votre réponse : ${answers[i] != null ? esc(q.c[answers[i]]) : "—"}</div>
      ${answers[i] !== q.a ? `<div class="rr good">✔ Bonne réponse : ${esc(q.c[q.a])}</div>` : ""}
      <div class="rx">💡 ${esc(q.e)}</div>
    </div>`).join("");
  view("resView");
  renderList();
}

document.addEventListener("DOMContentLoaded", () => {
  renderLvlChips(); renderMatChips(); renderList();
  $("#nextBtn").onclick = next;
  $("#retryBtn").onclick = () => startQuiz(cur.id);
  $("#backBtn").onclick = () => { cur = null; view("listView"); };
  $("#quitBtn").onclick = () => { clearInterval(tick); cur = null; view("listView"); };
});
