/* ScoreWave v3 — Détail du match : buteurs, moments clés, stats */
const D_BASE = "https://site.api.espn.com/apis/site/v2/sports";

window.openDetail = async (id, path) => {
  const ov = $("detailOverlay");
  ov.classList.add("open");
  ov.scrollTop = 0;
  $("detailBody").innerHTML = `<div class="loading">Chargement du match…</div>`;
  try {
    const d = await fetch(`${D_BASE}/${path}/summary?event=${id}`).then(r => r.json());
    renderDetail(d);
  } catch {
    $("detailBody").innerHTML = `<div class="empty">Détail indisponible pour ce match.</div>`;
  }
};

$("detailBack").addEventListener("click", () => $("detailOverlay").classList.remove("open"));

function dTeam(comp, side) {
  const c = (comp.competitors || []).find(x => x.homeAway === side) || {};
  return {
    name: c.team?.shortDisplayName || c.team?.displayName || "—",
    logo: c.team?.logo || "",
    score: c.score ?? "",
    winner: !!c.winner
  };
}

function statRows(d) {
  const teams = d.boxscore?.teams || [];
  if (teams.length < 2) return "";
  const a = teams.find(t => t.homeAway === "home") || teams[0];
  const b = teams.find(t => t.homeAway === "away") || teams[1];
  const wanted = ["possessionPct", "shotsOnTarget", "totalShots", "fouls", "cornerKicks", "yellowCards", "redCards"];
  const rows = wanted.map(k => {
    const sa = (a.statistics || []).find(s => s.name === k);
    const sb = (b.statistics || []).find(s => s.name === k);
    if (!sa && !sb) return "";
    const va = parseFloat(sa?.displayValue ?? sa?.value ?? 0) || 0;
    const vb = parseFloat(sb?.displayValue ?? sb?.value ?? 0) || 0;
    const tot = va + vb || 1;
    const label = sa?.label || sb?.label || k;
    return `<div class="statrow">
      <div class="statnames"><span><b style="color:var(--text)">${sa?.displayValue ?? "0"}</b></span><span>${label}</span><span><b style="color:var(--text)">${sb?.displayValue ?? "0"}</b></span></div>
      <div class="statbar"><div class="sA" style="width:${va / tot * 100}%"></div><div class="sB" style="width:${vb / tot * 100}%"></div></div>
    </div>`;
  }).join("");
  return rows ? `<div class="dsec">Statistiques</div>${rows}` : "";
}

function eventRows(d) {
  const evs = d.keyEvents || [];
  if (!evs.length) return "";
  const rows = evs.map(e => {
    const min = e.clock?.displayValue || "";
    const txt = (e.type?.text || "") + (e.team?.displayName ? " — " + e.team.displayName : "");
    return `<div class="evrow"><span class="evmin">${min}</span><span class="evtxt">${txt}</span></div>`;
  }).join("");
  return `<div class="dsec">Moments clés</div>${rows}`;
}

function scorersRows(d) {
  const sc = d.scoringPlays || [];
  if (!sc.length) return "";
  const rows = sc.map(e => {
    const min = e.clock?.displayValue || "";
    const txt = e.text || (e.type?.text || "But");
    return `<div class="evrow"><span class="evmin">${min}</span><span class="evtxt">${txt}</span></div>`;
  }).join("");
  return `<div class="dsec">Buteurs</div>${rows}`;
}

function renderDetail(d) {
  const c = d.header?.competitions?.[0] || {};
  const home = dTeam(c, "home"), away = dTeam(c, "away");
  const tp = c.status?.type || {};
  const league = d.header?.name || "";
  const state = tp.state || "post";
  const label = state === "in" ? (c.status?.displayClock || "EN DIRECT")
              : state === "pre" ? "À VENIR" : (tp.shortDetail || "TERMINÉ");
  const cls = state === "in" ? "pill live" : state === "pre" ? "pill pre" : "pill ft";
  const hs = state === "pre" ? "–" : home.score, as = state === "pre" ? "–" : away.score;

  $("detailBody").innerHTML = `
    <div class="dscore">
      <div class="lg">${league}</div>
      <div class="dteams">
        <div class="dteam">${home.logo ? `<img src="${home.logo}" alt="" onerror="this.style.display='none'">` : ""}<span class="tn" ${home.winner ? 'style="color:var(--accent)"' : ""}>${home.name}</span></div>
        <div class="dmid"><div class="ddigits">${hs}<span style="color:var(--muted);font-size:24px"> - </span>${as}</div><span class="dst ${cls}">${label}</span></div>
        <div class="dteam">${away.logo ? `<img src="${away.logo}" alt="" onerror="this.style.display='none'">` : ""}<span class="tn" ${away.winner ? 'style="color:var(--accent)"' : ""}>${away.name}</span></div>
      </div>
      ${c.venue?.fullName ? `<div class="lg" style="margin-top:14px">${c.venue.fullName}</div>` : ""}
    </div>
    ${(scorersRows(d) + eventRows(d)) || ""}
    ${statRows(d)}
    <div class="empty" style="padding:20px">Données fournies par ESPN</div>
  `;
}
