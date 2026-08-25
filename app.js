/* === TES DONNÉES LOCALES 🇲🇬 (modifie ici chaque semaine) === */
const APP_DATA = {
  matches: [
    {sport:"football",league:"THB Champions League 🇲🇬",status:"ft",minute:"Terminé",home:"Fosa Juniors",away:"CNaPS Sport",homeScore:2,awayScore:1},
    {sport:"basketball",league:"Championnat N1A 🇲🇬",status:"ft",minute:"Terminé",home:"GNBC",away:"COSFA",homeScore:83,awayScore:77}
  ],
  fixtures: [
    {sport:"football",league:"THB Champions League 🇲🇬",teams:"CNaPS Sport 🆚 Fosa Juniors",when:"Mer. 27 août · 15:00",where:"Mahamasina"},
    {sport:"basketball",league:"Championnat N1A 🇲🇬",teams:"GNBC 🆚 SEBAM",when:"Sam. 30 août · 16:30",where:"Palais des Sports"}
  ],
  news: [
    {tag:"⚽ Foot",title:"Les Barea reprennent l'entraînement à Mahamasina",summary:"La sélection nationale prépare son prochain match amical. Plusieurs jeunes joueurs locaux pourraient être testés.",time:"Il y a 2 h"},
    {tag:"🏀 Basket",title:"Le GNBC enchaîne les victoires en N1A",summary:"Portés par leur capitaine, les hommes de Mahamasina dominent le début de saison.",time:"Il y a 5 h"}
  ],
  standingsTitle:"Classement · THB Champions League 🇲🇬",
  standings: [
    {team:"Fosa Juniors",played:5,won:4,drawn:1,lost:0,pts:13},
    {team:"CNaPS Sport",played:5,won:3,drawn:1,lost:1,pts:10},
    {team:"Elgeco Plus",played:5,won:2,drawn:2,lost:1,pts:8},
    {team:"Disciples FC",played:5,won:1,drawn:3,lost:1,pts:6}
  ]
};

/* === MOTEUR DE L'APPLI (ne touche pas) === */
const API = "https://www.thesportsdb.com/api/v1/json/3";
const AUTO_SPORTS = ["Soccer","Basketball","Rugby","Tennis"];
const SPORT_MAP = {Soccer:"football",Basketball:"basketball",Rugby:"rugby",Tennis:"autres"};
const SPORT_ICONS = {football:"⚽",basketball:"🏀",rugby:"🏉",autres:"🎾"};
const LABELS = {all:"Tous",football:"⚽ Foot",basketball:"🏀 Basket",rugby:"🏉 Rugby",autres:"🎾 Autres"};
const VIEWS = ["scores","news","upcoming","table"];
let currentSport = "all", apiMatches = [], apiFixtures = [];

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    VIEWS.forEach(v => document.getElementById("view-"+v).classList.remove("active"));
    document.getElementById("view-"+btn.dataset.view).classList.add("active");
    window.scrollTo({top:0});
  });
});

function isoDate(o=0){return new Date(Date.now()+o*864e5).toISOString().slice(0,10)}

function mapEvent(ev){
  const sport = SPORT_MAP[ev.strSport]||"autres";
  const st = (ev.strStatus||"").toLowerCase();
  const fin = st.startsWith("match finished")||st==="ft"||st==="aet";
  const live = !fin && ev.intHomeScore!=null && ev.intHomeScore!=="";
  return {id:ev.idEvent,sport,league:"🌐 "+ev.strLeague,
    status:fin?"ft":(live?"live":"ns"),
    minute:fin?"Terminé":(ev.strProgress?ev.strProgress+"'":(ev.strStatus||"Live")),
    home:ev.strHomeTeam,away:ev.strAwayTeam,
    homeScore:ev.intHomeScore!=null?Number(ev.intHomeScore):0,
    awayScore:ev.intAwayScore!=null?Number(ev.intAwayScore):0,
    ts:ev.strTimestamp||""};
}

async function fetchApi(){
  const days=[isoDate(0),isoDate(-1),isoDate(1)],seen=new Set(),m=[],f=[];
  for(const s of AUTO_SPORTS)for(const d of days){
    const res=await fetch(`${API}/eventsday.php?d=${encodeURIComponent(d)}&s=${s}`);
    const json=await res.json();
    (json.events||[]).forEach(ev=>{
      if(!ev.idEvent||seen.has(ev.idEvent))return;seen.add(ev.idEvent);
      const e=mapEvent(ev);
      if(e.status==="ns"){
        if((ev.strTimestamp||"")>=isoDate(0))
          f.push({sport:e.sport,league:e.league,teams:`${e.home} 🆚 ${e.away}`,
            when:fmtWhen(ev.strTimestamp||ev.dateEvent),where:ev.strVenue||ev.strCountry||"—",ts:ev.strTimestamp||""});
      }else m.push(e);
    });
  }
  m.sort((a,b)=>(a.status==="live"?-1:0)-(b.status==="live"?-1:0)||(b.ts||"").localeCompare(a.ts||""));
  f.sort((a,b)=>(a.ts||"").localeCompare(b.ts||""));
  return {matches:m.slice(0,30),fixtures:f.slice(0,30)};
}

function fmtWhen(ts){
  try{
    const d=new Date(ts.includes("T")?ts:ts+"T12:00:00");
    return d.toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"})+" · "+
           d.toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});
  }catch{return ts}
}

async function loadApiData(){
  try{
    const data=await fetchApi();
    apiMatches=data.matches;apiFixtures=data.fixtures;
    document.getElementById("updatedAt").textContent="🛰️ Scores internationaux auto · maj "+new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});
  }catch{
    document.getElementById("updatedAt").textContent="📴 Scores internationaux indisponibles · scores locaux visibles";
  }
  renderMatches();renderFixtures();
}

function renderChips(){
  const all=[...APP_DATA.matches,...apiMatches];
  const sports=["all",...new Set(all.map(x=>x.sport))];
  const box=document.getElementById("sportChips");box.innerHTML="";
  sports.forEach(s=>{
    const c=document.createElement("button");
    c.className="chip"+(s===currentSport?" active":"");
    c.textContent=LABELS[s]||s;
    c.onclick=()=>{currentSport=s;renderChips();renderMatches()};
    box.appendChild(c);
  });
}

function matchCard(m){
  const badge=m.status==="live"?`<span class="badge live">● LIVE ${m.minute}</span>`:`<span class="badge ft">${m.minute}</span>`;
  const hw=m.status==="ft"&&m.homeScore>m.awayScore, aw=m.status==="ft"&&m.awayScore>m.homeScore;
  const text=`${m.home} ${m.homeScore}-${m.awayScore} ${m.away} (${m.league})`;
  return `<div class="card">
    <div class="match-top"><span class="league">${SPORT_ICONS[m.sport]||"🏅"} ${m.league}</span>${badge}</div>
    <div class="teams">
      <div class="team ${hw?"winner":""}"><span class="name">${m.home}</span><span class="score">${m.homeScore}</span></div>
      <div class="team ${aw?"winner":""}"><span class="name">${m.away}</span><span class="score">${m.awayScore}</span></div>
    </div>
    <div class="card-actions"><button class="mini-btn" onclick="shareText('${encodeURIComponent(text)}')">Partager 📲</button></div>
  </div>`;
}

function renderMatches(){
  const all=[...APP_DATA.matches,...apiMatches].filter(m=>currentSport==="all"||m.sport===currentSport);
  document.getElementById("matchList").innerHTML=all.map(matchCard).join("")||`<div class="empty"><span>🏟️</span><p>Aucun match pour ce sport aujourd'hui.</p></div>`;
}

function renderNews(){
  document.getElementById("newsList").innerHTML=APP_DATA.news.map(n=>`
    <div class="card news-card"><span class="tag">${n.tag}</span><h3>${n.title}</h3><p>${n.summary}</p><time>🕐 ${n.time}</time>
    <div class="card-actions"><button class="mini-btn" onclick="shareText('${encodeURIComponent(n.title+" — via ScoreWave")}')">Partager 📲</button></div></div>`).join("");
}

function renderFixtures(){
  const all=[...APP_DATA.fixtures,...apiFixtures];
  document.getElementById("fixtureList").innerHTML=all.map(f=>`
    <div class="card">
      <div class="match-top"><span class="league">${SPORT_ICONS[f.sport]||"🏅"} ${f.league}</span><span class="badge soon">À VENIR</span></div>
      <div class="fixture"><div><div class="vs">${f.teams}</div><div class="where">📍 ${f.where}</div></div><span class="when">${f.when}</span></div>
    </div>`).join("")||`<div class="empty"><span>📅</span><p>Aucun match programmé.</p></div>`;
}

function renderTable(){
  document.getElementById("tableTitle").textContent=APP_DATA.standingsTitle||"Classement";
  document.querySelector("#standingsTable tbody").innerHTML=APP_DATA.standings.map((t,i)=>`
    <tr class="${i===0?"leader":""}"><td>${i+1}</td><td>${t.team}</td><td>${t.played}</td><td>${t.won}</td><td>${t.drawn}</td><td>${t.lost}</td><td class="pts">${t.pts}</td></tr>`).join("");
}

function shareText(enc){
  const text=decodeURIComponent(enc)+"\n\n⚡ ScoreWave — tous les sports en direct";
  if(navigator.share)navigator.share({text}).catch(()=>{});
  else{navigator.clipboard?.writeText(text);alert("Copié ! Colle-le où tu veux.");}
}

document.getElementById("shareApp").addEventListener("click",()=>{
  const text="⚡ ScoreWave — live scores, tous les sports, gratuit !\n"+location.href;
  if(navigator.share)navigator.share({text}).catch(()=>{});
  else{navigator.clipboard?.writeText(text);alert("Lien copié !");}
});

renderChips();renderMatches();renderNews();renderFixtures();renderTable();
loadApiData();
