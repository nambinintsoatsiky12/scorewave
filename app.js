/* ScoreWave v3 — ESPN live · favoris · recherche · notifs · cache */
const BASE = "https://site.api.espn.com/apis/site/v2/sports";
const FEEDS = [
  {cat:"FOOT", name:"Premier League", path:"soccer/eng.1"},
  {cat:"FOOT", name:"La Liga", path:"soccer/esp.1"},
  {cat:"FOOT", name:"Ligue 1", path:"soccer/fra.1"},
  {cat:"FOOT", name:"Serie A", path:"soccer/ita.1"},
  {cat:"FOOT", name:"Ligue des Champions", path:"soccer/uefa.champions"},
  {cat:"FOOT", name:"Europa League", path:"soccer/uefa.europa"},
  {cat:"FOOT", name:"Bundesliga", path:"soccer/ger.1"},
  {cat:"FOOT", name:"MLS", path:"soccer/mls"},
  {cat:"NBA", name:"NBA", path:"basketball/nba"},
  {cat:"WNBA", name:"WNBA", path:"basketball/wnba"},
  {cat:"NFL", name:"NFL", path:"football/nfl"},
  {cat:"MLB", name:"MLB", path:"baseball/mlb"},
  {cat:"NHL", name:"NHL", path:"hockey/nhl"},
  {cat:"MMA", name:"UFC", path:"mma/ufc"},
  {cat:"TENNIS", name:"ATP", path:"tennis/atp"},
  {cat:"TENNIS", name:"WTA", path:"tennis/wta"}
];
const NEWS_FEEDS = [
  {name:"Premier League", path:"soccer/eng.1"},
  {name:"NBA", path:"basketball/nba"},
  {name:"Champions League", path:"soccer/uefa.champions"}
];
const TABLE_LEAGUES = [
  {key:"epl", label:"Premier League", path:"soccer/eng.1"},
  {key:"laliga", label:"La Liga", path:"soccer/esp.1"},
  {key:"l1", label:"Ligue 1", path:"soccer/fra.1"},
  {key:"seriea", label:"Serie A", path:"soccer/ita.1"},
  {key:"bund", label:"Bundesliga", path:"soccer/ger.1"}
];
const CATS = ["TOUS","FOOT","NBA","WNBA","NFL","MLB","NHL","MMA","TENNIS","FAVORIS"];
const DAYS = [{o:0,label:"AUJ."},{o:-1,label:"HIER"},{o:1,label:"DEMAIN"}];

let currentCat = "FOOT", dayOffset = 0, searchQ = "", currentTable = "epl";
let allMatches = [], prevScores = {};
let favs = [];
try { favs = JSON.parse(localStorage.getItem("sw_favs") || "[]"); } catch {}
const $ = id => document.getElementById(id);
const feedOfCat = c => c === "TOUS" ? FEEDS : FEEDS.filter(f => f.cat === c);

function teamOf(c) {
  return {
    id: String(c.team?.id || c.athlete?.id || c.team?.displayName || c.athlete?.displayName || ""),
    name: c.team?.shortDisplayName || c.athlete?.shortName || c.team?.displayName || c.athlete?.displayName || "—",
    logo: c.team?.logo || c.athlete?.headshot?.href || "",
    score: c.score ?? ""
  };
}
function normEvent(ev, feed) {
  const comp = (ev.competitions || [])[0] || {};
  const home = (comp.competitors || []).find(c => c.homeAway === "home") || {};
  const away = (comp.competitors || []).find(c => c.homeAway === "away") || {};
  const tp = ev.status?.type || {};
  return {
    id: ev.id, path: feed.path, cat: feed.cat, league: feed.name,
    state: tp.state || "pre",
    detail: tp.shortDetail || tp.detail || "",
    clock: ev.status?.displayClock || "",
    home: teamOf(home), away: teamOf(away),
    venue: comp.venue?.fullName || "", date: ev.date || ""
  };
}
function yyyymmdd(off) {
  return new Date(Date.now() + off * 864e5).toISOString().slice(0, 10).replace(/-/g, "");
}
function fmtDay(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-FR", {weekday: "short", day: "numeric", month: "short"}) + " · " +
           d.toLocaleTimeString("fr-FR", {hour: "2-digit", minute: "2-digit"});
  } catch { return iso; }
}
function relTime(iso) {
  const ms = new Date(iso) - Date.now();
  if (ms <= 0) return "";
  const m = Math.floor(ms / 60000), h = Math.floor(m / 60), d = Math.floor(h / 24);
  if (d > 0) return `dans ${d} j ${h % 24} h`;
  if (h > 0) return `dans ${h} h ${m % 60} min`;
  return `dans ${m} min`;
}
const imgTag = u => u ? `<img src="${u}" alt="" loading="lazy" onerror="this.style.display='none'">` : "";
function toast(msg, ms = 3500) {
  const t = $("toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), ms);
}

const isFav = id => favs.some(f => f.id === id);
function toggleFav(id, name) {
  if (isFav(id)) { favs = favs.filter(f => f.id !== id); toast(name + " retiré de tes favoris"); }
  else { favs.push({id, name}); toast(name + " ajouté à tes favoris ★"); askNotif(); }
  localStorage.setItem("sw_favs", JSON.stringify(favs));
}
const matchIsFav = e => isFav(e.home.id) || isFav(e.away.id);
window.toggleFavMatch = (evt, btn) => {
  evt.stopPropagation();
  const h = btn.dataset.home, hn = btn.dataset.homeName, a = btn.dataset.away, an = btn.dataset.awayName;
  if (isFav(h) || isFav(a)) { if (isFav(h)) toggleFav(h, hn); else toggleFav(a, an); }
  else { toggleFav(h, hn); toggleFav(a, an); }
  renderMatches();
};
const starSVG = `<svg viewBox="0 0 24 24"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2L7 14.2 2 9.3l6.9-1L12 2z"/></svg>`;

function askNotif() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") Notification.requestPermission().then(syncBell);
  else syncBell();
}
function syncBell() {
  if ("Notification" in window && Notification.permission === "granted") $("bellBtn").classList.add("on");
  else $("bellBtn").classList.remove("on");
}
function notifyGoal(e) {
  const txt = `${e.home.name} ${e.home.score} - ${e.away.score} ${e.away.name} · ${e.clock || e.league}`;
  if ("Notification" in window && Notification.permission === "granted")
    new Notification("BUT ! " + e.league, {body: txt});
  toast("BUT ! " + txt, 5000);
  if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
}
function detectGoals(list) {
  list.forEach(e => {
    if (e.state !== "in" || !matchIsFav(e)) { prevScores[e.id] = e.home.score + "-" + e.away.score; return; }
    const key = e.home.score + "-" + e.away.score;
    if (prevScores[e.id] && prevScores[e.id] !== key) notifyGoal(e);
    prevScores[e.id] = key;
  });
}

async function loadScores() {
  if (currentCat === "FAVORIS") { renderChips(); renderMatches(); return; }
  const feeds = feedOfCat(currentCat);
  const dateQ = dayOffset !== 0 ? `?dates=${yyyymmdd(dayOffset)}` : "";
  const results = await Promise.allSettled(
    feeds.map(f => fetch(`${BASE}/${f.path}/scoreboard${dateQ}`).then(r => r.json()).then(d => ({feed: f, data: d})))
  );
  const events = [];
  let ok = 0;
  results.forEach(res => {
    if (res.status !== "fulfilled") return; ok++;
    (res.value.data.events || []).forEach(ev => events.push(normEvent(ev, res.value.feed)));
  });
  if (ok === 0 && allMatches.length === 0) {
    try {
      const snap = JSON.parse(localStorage.getItem("sw_snap") || "null");
      if (snap) { allMatches = snap.matches; $("statusText").textContent = "Hors ligne · derniers scores du " + fmtDay(snap.ts); }
    } catch {}
  } else {
    allMatches = events;
    try { localStorage.setItem("sw_snap", JSON.stringify({ts: Date.now(), matches: events})); } catch {}
  }
  detectGoals(allMatches);
  const live = allMatches.filter(e => e.state === "in").length;
  $("statusDot").style.visibility = live ? "visible" : "hidden";
  const t = new Date().toLocaleTimeString("fr-FR", {hour: "2-digit", minute: "2-digit"});
  $("statusText").textContent = `${live ? live + " en direct · " : ""}maj ${t} · auto 45 s`;
  renderChips(); renderMatches(); renderFixtures();
}

function renderChips() {
  $("catChips").innerHTML = CATS.map(c =>
    `<button class="chip ${c === currentCat ? "active" : ""}" data-c="${c}">${c === "FAVORIS" ? "★ Favoris" : c}</button>`).join("");
  $("catChips").querySelectorAll(".chip").forEach(b =>
    b.onclick = () => { currentCat = b.dataset.c; renderChips(); renderMatches(); if (currentCat !== "FAVORIS") loadScores(); });
  $("dateChips").innerHTML = DAYS.map(d =>
    `<button class="chip ${d.o === dayOffset ? "active" : ""}" data-o="${d.o}">${d.label}</button>`).join("");
  $("dateChips").querySelectorAll(".chip").forEach(b =>
    b.onclick = () => { dayOffset = +b.dataset.o; renderChips(); loadScores(); });
}

function matchCard(e) {
  let pill;
  if (e.state === "in") pill = `<span class="pill live">${e.clock || "LIVE"}</span>`;
  else if (e.state === "post") pill = `<span class="pill ft">${e.detail || "Terminé"}</span>`;
  else pill = `<span class="pill pre">${fmtDay(e.date)}</span>`;
  const hw = e.state === "post" && +e.home.score > +e.away.score;
  const aw = e.state === "post" && +e.away.score > +e.home.score;
  const hs = e.state === "pre" ? "" : e.home.score, as = e.state === "pre" ? "" : e.away.score;
  const fav = matchIsFav(e);
  return `<div class="card" onclick="openDetail('${e.id}','${e.path}')">
    <div class="card-top">
      <span class="card-league">${e.league}</span>
      <button class="star-btn ${fav ? "on" : ""}" data-home="${e.home.id}" data-home-name="${e.home.name.replace(/"/g, "")}" data-away="${e.away.id}" data-away-name="${e.away.name.replace(/"/g, "")}" onclick="toggleFavMatch(event,this)">${starSVG}</button>
      ${pill}
    </div>
    <div class="team ${hw ? "winner" : ""}">${imgTag(e.home.logo)}<span class="nm">${e.home.name}</span><span class="sc">${hs}</span></div>
    <div class="team ${aw ? "winner" : ""}">${imgTag(e.away.logo)}<span class="nm">${e.away.name}</span><span class="sc">${as}</span></div>
    <div class="meta"><span>${e.venue || e.cat}</span><span class="count">${e.state === "pre" ? relTime(e.date) : ""}</span></div>
  </div>`;
}

function filterView(list) {
  let l = list;
  if (currentCat === "FAVORIS") l = l.filter(matchIsFav);
  else if (currentCat !== "TOUS") l = l.filter(e => e.cat === currentCat);
  if (searchQ) l = l.filter(e => (e.home.name + " " + e.away.name).toLowerCase().includes(searchQ));
  return l;
}
function renderMatches() {
  const list = filterView(allMatches.filter(e => e.state !== "pre"))
    .sort((a, b) => (a.state === "in" ? -1 : 0) - (b.state === "in" ? -1 : 0) || new Date(b.date) - new Date(a.date)).slice(0, 50);
  $("matchList").innerHTML = list.map(matchCard).join("") ||
    `<div class="empty">${currentCat === "FAVORIS" ? "Aucun favori pour l'instant.<br>Touche l'étoile d'un match pour suivre l'équipe." : "Aucun match trouvé.<br>Essaie une autre date ou un autre sport."}</div>`;
}
function renderFixtures() {
  const list = allMatches.filter(e => e.state === "pre")
    .sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 40);
  $("fixtureList").innerHTML = list.map(matchCard).join("") ||
    `<div class="empty">Aucun match programmé.</div>`;
}

applyGuardInit();
function applyGuardInit(){ renderChips(); loadScores(); }
setInterval(() => { if (document.visibilityState === "visible") loadScores(); }, 45000);
setInterval(renderFixtures, 30000);
