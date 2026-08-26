/* ===== EduPrep · Moteur de quiz + filtres Niveau/Matière ===== */
let cur = null, idx = 0, picked = -1, answers = [], timeLeft = 0, tick = null;
let fLvl = loadLS("slate_edu_lvl", "Tous");   // niveau mémorisé entre deux visites
let fMat = "Toutes";
const best = loadLS("slate_edu_best", {});
const LEVELS = ["Tous", "3ème", "1ère", "Terminale"];
const LVL_INFO = { "3ème": "Préparation BEPC", "1ère": "Première", "Terminale": "Préparation BAC" };
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
function renderMatChips() {
  const pool = SUBJECTS.filter(s => fLvl === "Tous" || s.niveau === fLvl);
  const mats = ["Toutes", ...new Set(pool.map(s => s.matiere))];
  if (!mats.includes(fMat)) fMat = "Toutes";
  $("#chips").innerHTML = mats.map(m =>
    `<button class="fchip ${m === fMat ? "on" : ""}" data-m="${m}">${m}</button>`).join("");
  $$("#chips .fchip").forEach(b => b.onclick = () => { fMat = b.dataset.m; renderMatChips(); renderList(); });
}
const matchF = s => (fLvl === "Tous" || s.niveau === fLvl) && (fMat === "Toutes" || s.matiere === fMat);
const cardHTML = s => `
  <div class="scard" data-id="${s.id}">
    ${best[s.id] != null ? `<span class="best">★ ${best[s.id]}/${s.qs.length}</span>` : ""}
    <div class="ic">${s.icon}</div>
    <h3>${esc(s.titre)}</h3>
    <div class="meta">${esc(s.matiere)} · ${esc(s.niveau)} · ${s.qs.length} questions · ⏱ ${s.minutes} min</div>
  </div>`;
function renderList() {
  if (fLvl !== "Tous") {
    const list = SUBJECTS.filter(matchF);
    $("#subjList").innerHTML = list.length
      ? `<div class="subj-grid">${list.map(cardHTML).join("")}</div>`
      : `<p class="hint" style="padding:20px">Bientôt de nouveaux sujets pour ce niveau 🔜</p>`;
  } else {
    $("#subjList").innerHTML = ["3ème", "1ère", "Terminale"].map(lv => {
      const list = SUBJECTS.filter(s => s.niveau === lv).filter(matchF);
      if (!list.length) return "";
      return `<h2 class="lvl-head">${lv}</h2>
        <p class="lvl-sub">${LVL_INFO[lv]}</p>
        <div class="subj-grid">${list.map(cardHTML).join("")}</div>`;
    }).join("");
  }
  $$("#subjList .scard").forEach(c => c.onclick = () => startQuiz(c.dataset.id));
}

/* ---------- Quiz ---------- */
function view(name) {
  ["listView", "quizView", "resView"].forEach(v => $("#" + v).style.display = v === name ? "block" : "none");
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
