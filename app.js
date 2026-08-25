/* ScoreWave v2 — flux ESPN réels · MAJ auto 45 s · zéro travail manuel */
const BASE = "https://site.api.espn.com/apis/site/v2/sports";
const FEEDS = [
  {cat:"FOOT", name:"Premier League", path:"soccer/eng.1"},
  {cat:"FOOT", name:"La Liga", path:"soccer/esp.1"},
  {cat:"FOOT", name:"Ligue 1", path:"soccer/fra.1"},
  {cat:"FOOT", name:"Serie A", path:"soccer/ita.1"},
  {cat:"FOOT", name:"Champions League", path:"soccer/uefa.champions"},
  {cat:"NBA", name:"NBA", path:"basketball/nba"},
  {cat:"NFL", name:"NFL", path:"football/nfl"},
  {cat:"MLB", name:"MLB", path:"baseball/mlb"},
  {cat:"NHL", name:"NHL", path:"hockey/nhl"},
  {cat:"MMA", name:"UFC", path:"mma/ufc"},
  {cat:"TENNIS", name:"ATP", path:"tennis/atp"}
];
const NEWS_FEEDS = [
  {cat:"FOOT", name:"Premier League", path:"soccer/eng.1"},
  {cat:"NBA", name:"NBA", path:"basketball/nba"},
  {cat:"NFL", name:"NFL", path:"football/nfl"}
];
const TABLE_LEAGUES = [
  {key:"epl", label:"Premier League", path:"soccer/eng.1"},
  {key:"laliga", label:"La Liga", path:"soccer/esp.1"},
  {key:"l1", label:"Ligue 1", path:"soccer/fra.1"},
  {key:"seriea", label:"Serie A", path:"soccer/ita.1"}
];

let currentCat = "ALL", allMatches = [], allNews = [], currentTable = "epl";
const VIEWS = ["scores","news","upcoming","table"];
const $ = id => document.getElementById(id);

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    VIEWS.forEach(v => $("view-"+v).classList.remove("active"));
    $("view-"+btn.dataset.view).classList.add("active");
    if (btn.dataset.view === "news") loadNews();
    if (btn.dataset.view === "table") loadTable(currentTable);
    window.scrollTo({top:0});
  });
});

const imgTag = (url) => url ? `<img src="${url}" alt="" onerror="this.style.display='none'">` : "";

function normEvent(ev, feed) {
  const comp = (ev.competitions||[])[0] || {};
  const home = (comp.competitors||[]).find(c=>c.homeAway==="home")||{};
  const away = (comp.competitors||[]).find(c=>c.homeAway==="away")||{};
  const st = ev.status||{}, tp = st.type||{};
  return {
    id: ev.id, cat: feed.cat, league: feed.name,
    state: tp.state||"pre",
    detail: tp.shortDetail||tp.detail||"",
    clock: st.displayClock||"",
    home: {name: home.team?.shortDisplayName||home.team?.displayName||"—", logo: home.team?.logo||"", score: home.score??""},
    away: {name: away.team?.shortDisplayName||away.team?.displayName||"—", logo: away.team?.logo||"", score: away.score??""},
    venue: comp.venue?.fullName||"", date: ev.date||""
  };
}

function fmtDay(iso){
  try{
    const d=new Date(iso);
    return d.toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"})+" · "+
           d.toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});
  }catch{return iso}
}

async function loadScores() {
  $("statusText").textContent = "Mise à jour…";
  const results = await Promise.allSettled(
    FEEDS.map(f => fetch(`${BASE}/${f.path}/scoreboard`).then(r=>r.json()).then(d=>({feed:f,data:d})))
  );
  const events = [];
  results.forEach(res => {
    if (res.status!=="fulfilled") return;
    (res.value.data.events||[]).forEach(ev => events.push(normEvent(ev, res.value.feed)));
  });
  allMatches = events;

  const live = events.filter(e=>e.state==="in").length;
  $("statusDot").style.visibility = live ? "visible" : "hidden";
  const t = new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});
  $("statusText").textContent = (live ? live+" match(s) en direct · " : "Aucun match en direct · ") + "maj "+t+" · auto 45 s";

  renderChips(); renderMatches(); renderFixtures();
}

function renderChips(){
  const cats = ["ALL", ...new Set(allMatches.map(e=>e.cat))];
  $("catChips").innerHTML = cats.map(c =>
    `<button class="chip ${c===currentCat?"active":""}" data-cat="${c}">${c==="ALL"?"TOUS":c}</button>`).join("");
  document.querySelectorAll("#catChips .chip").forEach(b =>
    b.onclick=()=>{currentCat=b.dataset.cat;renderChips();renderMatches()});
}

function matchCard(e){
  let pill;
  if (e.state==="in") pill = `<span class="pill live">${e.clock||e.detail||"LIVE"}</span>`;
  else if (e.state==="post") pill = `<span class="pill ft">${e.detail||"Terminé"}</span>`;
  else pill = `<span class="pill pre">${fmtDay(e.date)}</span>`;
  const hw = e.state==="post" && +e.home.score>+e.away.score;
  const aw = e.state==="post" && +e.away.score>+e.home.score;
  const hs = e.state==="pre" ? "" : e.home.score, as = e.state==="pre" ? "" : e.away.score;
  return `<div class="card">
    <div class="card-top"><span class="card-league">${e.league}</span>${pill}</div>
    <div class="team ${hw?"winner":""}">${imgTag(e.home.logo)}<span class="nm">${e.home.name}</span><span class="sc">${hs}</span></div>
    <div class="team ${aw?"winner":""}">${imgTag(e.away.logo)}<span class="nm">${e.away.name}</span><span class="sc">${as}</span></div>
    ${e.venue?`<div class="meta"><span>${e.venue}</span><span>${e.detail&&e.state!=="pre"?e.detail:""}</span></div>`:""}
  </div>`;
}

function renderMatches(){
  const list = allMatches.filter(e=>e.state!=="pre"&&(currentCat==="ALL"||e.cat===currentCat))
    .sort((a,b)=>(a.state==="in"?-1:0)-(b.state==="in"?-1:0)||new Date(b.date)-new Date(a.date)).slice(0,40);
  $("matchList").innerHTML = list.map(matchCard).join("") ||
    `<div class="empty"><span class="big">—</span>Aucun match récent ou en direct aujourd'hui.<br>Consulte l'Agenda.</div>`;
}

function renderFixtures(){
  const list = allMatches.filter(e=>e.state==="pre")
    .sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,40);
  $("fixtureList").innerHTML = list.map(matchCard).join("") ||
    `<div class="empty"><span class="big">—</span>Aucun match programmé pour l'instant.</div>`;
}

let newsLoaded=false;
async function loadNews(){
  if (newsLoaded) return; newsLoaded=true;
  $("newsList").innerHTML = `<div class="loading">Chargement des actus ESPN…</div>`;
  const results = await Promise.allSettled(
    NEWS_FEEDS.map(f => fetch(`${BASE}/${f.path}/news?limit=5`).then(r=>r.json()).then(d=>({feed:f,data:d})))
  );
  allNews = [];
  results.forEach(res=>{
    if(res.status!=="fulfilled")return;
    (res.value.data.articles||[]).forEach(a=>{
      allNews.push({cat:res.value.feed.name, title:a.headline||"", desc:a.description||"",
        img:(a.images&&a.images[0]&&a.images[0].url)||"", time:a.published||"",
        link:(a.links&&a.links.web&&a.links.web.href)||""});
    });
  });
  allNews.sort((a,b)=>new Date(b.time)-new Date(a.time));
  $("newsList").innerHTML = allNews.slice(0,15).map(n=>`
    <div class="card news-card">
      ${n.img?`<img class="news-thumb" src="${n.img}" alt="" loading="lazy" onerror="this.style.display='none'">`:""}
      <div class="card-league" style="margin-bottom:6px">${n.cat}</div>
      <h3>${n.title}</h3>
      ${n.desc?`<p>${n.desc}</p>`:""}
      <div class="news-foot"><time>${fmtDay(n.time)}</time>
      ${n.link?`<button class="read-btn" onclick="window.open('${n.link}','_blank')">Lire</button>`:""}</div>
    </div>`).join("") || `<div class="empty"><span class="big">—</span>Aucune actu disponible.</div>`;
}

function renderTableChips(){
  $("tableChips").innerHTML = TABLE_LEAGUES.map(l=>
    `<button class="chip ${l.key===currentTable?"active":""}" data-key="${l.key}">${l.label}</button>`).join("");
  document.querySelectorAll("#tableChips .chip").forEach(b=>
    b.onclick=()=>{currentTable=b.dataset.key;loadTable(currentTable)});
}

async function loadTable(key){
  renderTableChips();
  const lg = TABLE_LEAGUES.find(l=>l.key===key);
  $("tableWrap").style.opacity=.4;
  try{
    const d = await fetch(`${BASE}/${lg.path}/standings`).then(r=>r.json());
    const entries = (((d.children||[])[0]||{}).standings||{}).entries || d.standings?.entries || [];
    const rows = entries.map(en=>{
      const g=(n)=>{const s=(en.stats||[]).find(x=>x.name===n);return s?(s.displayValue??s.value):"-"};
      return {team:en.team?.shortDisplayName||en.team?.displayName||"—",
        rank:g("rank"),j:g("gamesPlayed"),w:g("wins"),n:g("ties"),l:g("losses"),pts:g("points")};
    });
    $("standingsTable").querySelector("tbody").innerHTML = rows.map(t=>
      `<tr><td>${t.rank}</td><td>${t.team}</td><td>${t.j}</td><td>${t.w}</td><td>${t.n}</td><td>${t.l}</td><td class="pts">${t.pts}</td></tr>`).join("");
  }catch{
    $("standingsTable").querySelector("tbody").innerHTML = `<tr><td colspan="7" style="color:var(--muted);padding:20px">Classement indisponible (hors saison ou réseau)</td></tr>`;
  }
  $("tableWrap").style.opacity=1;
}

$("shareApp").addEventListener("click",()=>{
  const text="ScoreWave — live scores, actus et classements en direct.\n"+location.href;
  if(navigator.share)navigator.share({text}).catch(()=>{});
  else{navigator.clipboard?.writeText(text);alert("Lien copié.");}
});

loadScores();
setInterval(()=>{ if(document.visibilityState==="visible") loadScores(); }, 45000);
