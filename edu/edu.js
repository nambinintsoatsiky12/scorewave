/* ===== EduPrep · Moteur de quiz ===== */
let cur = null, idx = 0, picked = -1, answers = [], timeLeft = 0, tick = null, filter = "Toutes";
const best = loadLS("slate_edu_best", {});
const esc = s => String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Liste des sujets ---------- */
function renderChips() {
  const mats = ["Toutes", ...new Set(SUBJECTS.map(s => s.matiere))];
  $("#chips").innerHTML = mats.map(m => `<button class="fchip ${m === filter ? "on" : ""}" data-m="${m}">${m}</button>`).join("");
  $$("#chips .fchip").forEach(b => b.onclick = () => { filter = b.dataset.m; renderChips(); renderList(); });
}
function renderList() {
  const list = SUBJECTS.filter(s => filter === "Toutes" || s.matiere === filter);
  $("#subjList").innerHTML = list.map(s => `
    <div class="scard" data-id="${s.id}">
      ${best[s.id] != null ? `<span class="best">★ ${best[s.id]}/${s.qs.length}</span>` : ""}
      <div class="ic">${typeof s.icon === "string" ? s.icon : "📝"}</div>
      <h3>${esc(s.titre)}</h3>
      <div class="meta">${s.icon} ${esc(s.matiere)} · ${esc(s.niveau)} · ${s.qs.length} questions · ⏱ ${s.minutes} min</div>
    </div>`).join("");
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
  tick = setInterval(() => {
    timeLeft--;
    renderTime();
    if (timeLeft <= 0) { finish(); }
  }, 1000);
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
  $("#qcount").textContent = `Question ${idx + 1}/${cur.qs.length}`;
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
function next() {
  if (idx < cur.qs.length - 1) { idx++; showQ(); }
  else finish();
}
function finish() {
  clearInterval(tick);
  if (answers.length === 0 && picked < 0 && timeLeft <= 0 && idx === 0) toast("⏱ Temps écoulé !");
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
  renderChips(); renderList();
  $("#nextBtn").onclick = next;
  $("#retryBtn").onclick = () => startQuiz(cur.id);
  $("#backBtn").onclick = () => { cur = null; view("listView"); };
  $("#quitBtn").onclick = () => { clearInterval(tick); cur = null; view("listView"); };
});
