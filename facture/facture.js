/* ===== Facture+ · SLATE ===== */
const KEY = "slate_fact";
const today = () => new Date().toISOString().slice(0, 10);
const esc = s => String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let state = loadLS(KEY, {
  type: "Facture", num: "", devise: "Ar", dateEm: today(), dateEc: "",
  em: { nom: "", tel: "", mail: "", adr: "" },
  cl: { nom: "", tel: "", adr: "" },
  items: [{ desc: "", qte: 1, pu: 0 }],
  tvaOn: "0", tva: 20, notes: ""
});
if (!state.num) { state.num = nextNum(); }

function nextNum() {
  const seq = (loadLS("slate_fact_seq", 0) + 1);
  saveLS("slate_fact_seq", seq);
  return (state.type === "Devis" ? "DE" : "FA") + "-" + new Date().getFullYear() + "-" + String(seq).padStart(3, "0");
}

let deb;
const save = () => { clearTimeout(deb); deb = setTimeout(() => saveLS(KEY, state), 300); };

const fmt = n => {
  const dec = state.devise === "Ar" ? 0 : 2;
  return new Intl.NumberFormat("fr-FR", { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(n || 0) + " " + state.devise;
};
const totals = () => {
  const ht = state.items.reduce((s, x) => s + (parseFloat(x.qte) || 0) * (parseFloat(x.pu) || 0), 0);
  const tva = state.tvaOn === "1" ? ht * (parseFloat(state.tva) || 0) / 100 : 0;
  return { ht, tva, ttc: ht + tva };
};

/* ---------- Formulaire ---------- */
function renderRows() {
  $("#itemList").innerHTML = state.items.map((x, i) => `
    <div class="row-item" data-i="${i}">
      <button class="del">✕ Supprimer</button>
      <div class="field"><label>Description</label><input data-f="desc" value="${esc(x.desc)}" placeholder="Ex : Création de logo"></div>
      <div class="grid2">
        <div class="field"><label>Quantité</label><input data-f="qte" type="number" min="0" step="1" value="${esc(x.qte)}"></div>
        <div class="field"><label>Prix unitaire</label><input data-f="pu" type="number" min="0" step="0.01" value="${esc(x.pu)}"></div>
      </div>
    </div>`).join("");
}
function collect() {
  state.type = $("#f-type").value; state.num = $("#f-num").value; state.devise = $("#f-devise").value;
  state.dateEm = $("#f-dateEm").value; state.dateEc = $("#f-dateEc").value;
  state.em = { nom: $("#f-emNom").value, tel: $("#f-emTel").value, mail: $("#f-emMail").value, adr: $("#f-emAdr").value };
  state.cl = { nom: $("#f-clNom").value, tel: $("#f-clTel").value, adr: $("#f-clAdr").value };
  state.tvaOn = $("#f-tvaOn").value; state.tva = $("#f-tva").value; state.notes = $("#f-notes").value;
  $$("#itemList .row-item").forEach((row, i) => ["desc", "qte", "pu"].forEach(f => state.items[i][f] = row.querySelector(`[data-f="${f}"]`).value));
}

/* ---------- Aperçu ---------- */
const fdate = iso => { try { return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }); } catch { return iso; } };
function render() {
  const s = state, t = totals();
  $("#paper").innerHTML = `
  <div class="inv">
    <div class="top">
      <div class="co">
        <b>${esc(s.em.nom) || "Votre Entreprise"}</b>
        ${[s.em.adr, s.em.tel, s.em.mail].filter(Boolean).map(v => `<span>${esc(v)}</span>`).join("")}
      </div>
      <div class="doc">
        <div class="tp">${esc(s.type)}</div>
        <div class="num">${esc(s.num)}</div>
        <div class="dt">Émise le ${fdate(s.dateEm)}</div>
        ${s.dateEc ? `<div class="dt">${s.type === "Devis" ? "Valable" : "Échéance"} : ${fdate(s.dateEc)}</div>` : ""}
      </div>
    </div>
    <div class="billed">
      <h6>${s.type === "Devis" ? "Devis pour" : "Facturé à"}</h6>
      <b>${esc(s.cl.nom) || "Nom du client"}</b>
      ${[s.cl.adr, s.cl.tel].filter(Boolean).map(v => `<span>${esc(v)}</span>`).join("")}
    </div>
    <table>
      <thead><tr><th>Description</th><th>Qté</th><th>Prix unit.</th><th>Total</th></tr></thead>
      <tbody>${s.items.filter(x => x.desc || +x.pu).map(x => `
        <tr><td>${esc(x.desc) || "—"}</td><td>${esc(x.qte)}</td><td>${fmt(+x.pu)}</td><td>${fmt((+x.qte || 0) * (+x.pu || 0))}</td></tr>`).join("")
        || '<tr><td colspan="4" style="color:#9aa5b1;text-align:center;padding:18px">Aucune ligne pour le moment</td></tr>'}
      </tbody>
    </table>
    <div class="tot">
      <div class="ln"><span>Total HT</span><span>${fmt(t.ht)}</span></div>
      ${s.tvaOn === "1" ? `<div class="ln"><span>TVA (${esc(s.tva)}%)</span><span>${fmt(t.tva)}</span></div>` : ""}
      <div class="tt"><span>Total à payer</span><b>${fmt(t.ttc)}</b></div>
    </div>
    ${s.notes ? `<div class="nt"><b style="color:#22313f">Notes :</b>\n${esc(s.notes)}</div>` : ""}
    <div class="ft">${esc(s.em.nom) || "Votre Entreprise"} — Merci de votre confiance · Document généré avec SLATE</div>
  </div>`;
}
function fit() {
  const w = $("#scaler").clientWidth, sc = w / 794;
  $("#paper").style.transform = `scale(${sc})`;
  $("#scaler").style.height = 1123 * sc + "px";
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const f = id => $("#f-" + id);
  f("type").value = state.type; f("num").value = state.num; f("devise").value = state.devise;
  f("dateEm").value = state.dateEm; f("dateEc").value = state.dateEc;
  f("emNom").value = state.em.nom; f("emTel").value = state.em.tel; f("emMail").value = state.em.mail; f("emAdr").value = state.em.adr;
  f("clNom").value = state.cl.nom; f("clTel").value = state.cl.tel; f("clAdr").value = state.cl.adr;
  f("tvaOn").value = state.tvaOn; f("tva").value = state.tva; f("notes").value = state.notes;
  renderRows(); render(); fit();
  window.addEventListener("resize", fit);

  $(".form-col").addEventListener("input", () => { collect(); render(); save(); });
  $(".form-col").addEventListener("change", () => { collect(); render(); save(); });
  $("#addItem").onclick = () => { collect(); state.items.push({ desc: "", qte: 1, pu: 0 }); renderRows(); save(); };
  $("#itemList").addEventListener("click", e => {
    const del = e.target.closest(".del"); if (!del) return;
    collect(); state.items.splice(+del.closest(".row-item").dataset.i, 1);
    renderRows(); render(); save();
  });

  $("#newBtn").onclick = () => {
    if (!confirm("Créer un nouveau document ? (le client et les lignes seront vidés)")) return;
    state.cl = { nom: "", tel: "", adr: "" };
    state.items = [{ desc: "", qte: 1, pu: 0 }];
    state.num = nextNum(); state.dateEm = today(); state.dateEc = "";
    saveLS(KEY, state); location.reload();
  };
  $("#pdfBtn").onclick = () => { toast("Choisissez « Enregistrer au format PDF » 📄"); setTimeout(() => window.print(), 600); };
  $("#waBtn").onclick = () => {
    const t = totals();
    const msg = `🧾 ${state.type} ${state.num}\nDe : ${state.em.nom || "—"}\nPour : ${state.cl.nom || "—"}\nTotal à payer : ${fmt(t.ttc)}\n${state.notes ? "\n" + state.notes : ""}\n\n— Envoyé avec SLATE`;
    window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank");
    toast("Astuce : joignez le PDF téléchargé à votre message 📎");
  };

  $("#seg").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#seg button").forEach(x => x.classList.toggle("on", x === b));
    $("#ws").classList.toggle("showP", b.dataset.t === "view");
    setTimeout(fit, 30);
  });
});
