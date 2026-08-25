/* ScoreWave v3 — extras : actus, classements, thème, navigation */
let newsLoaded = false;
async function loadNews() {
  if (newsLoaded) return; newsLoaded = true;
  $("newsList").innerHTML = '<div class="loading">Chargement…</div>';
  const results = await Promise.allSettled(
    NEWS_FEEDS.map(f => fetch(`${BASE}/${f.path}/news?limit=5`).then(r => r.json()).then(d => ({f, d})))
  );
  let news = [];
  results.forEach(res => {
    if (res.status !== "fulfilled") return;
    (res.value.d.articles || []).forEach(a => news.push({
      cat: res.value.f.name, title: a.headline || "", desc: a.description || "",
      img: a.images?.[0]?.url || "", time: a.published || "", link: a.links?.web?.href || ""
    }));
  });
  news.sort((a, b) => new Date(b.time) - new Date(a.time));
  $("newsList").innerHTML = news.slice(0, 15).map(n => `
    <div class="card news-card">
      ${n.img ? `<img class="news-thumb" src="${n.img}" alt="" loading="lazy" onerror="this.style.display='none'">` : ""}
      <div class="card-league" style="margin-bottom:6px">${n.cat}</div>
      <h3>${n.title}</h3>${n.desc ? `<p>${n.desc}</p>` : ""}
      <div class="news-foot"><time>${fmtDay(n.time)}</time>
      ${n.link ? `<button class="read-btn" onclick="window.open('${n.link}','_blank')">Lire</button>` : ""}</div>
    </div>`).join("") || '<div class="empty">Aucune actu disponible.</div>';
}

function renderTableChips() {
  $("tableChips").innerHTML = TABLE_LEAGUES.map(l =>
    `<button class="chip ${l.key === currentTable ? "active" : ""}" data-k="${l.key}">${l.label}</button>`).join("");
  $("tableChips").querySelectorAll(".chip").forEach(b =>
    b.onclick = () => { currentTable = b.dataset.k; loadTable(); });
}
async function loadTable() {
  renderTableChips();
  const lg = TABLE_LEAGUES.find(l => l.key === currentTable);
  $("tableWrap").style.opacity = .4;
  try {
    const d = await fetch(`${BASE}/${lg.path}/standings`).then(r => r.json());
    const entries = d.children?.[0]?.standings?.entries || d.standings?.entries || [];
    const g = (en, n) => { const s = (en.stats || []).find(x => x.name === n); return s ? (s.displayValue ?? s.value) : "-"; };
    $("standingsTable").querySelector("tbody").innerHTML = entries.map(en =>
      `<tr><td>${g(en,"rank")}</td><td>${en.team?.shortDisplayName || "—"}</td><td>${g(en,"gamesPlayed")}</td><td>${g(en,"wins")}</td><td>${g(en,"ties")}</td><td>${g(en,"losses")}</td><td class="pts">${g(en,"points")}</td></tr>`).join("");
  } catch {
    $("standingsTable").querySelector("tbody").innerHTML = '<tr><td colspan="7" style="padding:20px;color:var(--muted)">Indisponible (hors saison)</td></tr>';
  }
  $("tableWrap").style.opacity = 1;
}

function applyTheme() { document.body.classList.toggle("light", localStorage.getItem("sw_theme") === "light"); }
$("themeBtn").onclick = () => {
  localStorage.setItem("sw_theme", document.body.classList.contains("light") ? "dark" : "light");
  applyTheme();
};

$("searchInput").addEventListener("input", e => { searchQ = e.target.value.toLowerCase().trim(); renderMatches(); });

document.querySelectorAll(".nav-btn").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  ["scores", "news", "upcoming", "table"].forEach(v => $("view-" + v).classList.remove("active"));
  $("view-" + btn.dataset.view).classList.add("active");
  if (btn.dataset.view === "news") loadNews();
  if (btn.dataset.view === "table") loadTable();
  window.scrollTo({top: 0});
}));

$("bellBtn").onclick = askNotif;
$("shareApp").addEventListener("click", () => {
  const text = "ScoreWave — live scores multi-sports en direct.\n" + location.href;
  if (navigator.share) navigator.share({text}).catch(() => {});
  else { navigator.clipboard?.writeText(text); toast("Lien copié"); }
});

applyTheme(); syncBell();
