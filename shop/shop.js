/* ===== LinkShop · mini-boutique partageable par lien (sans serveur) =====
   La boutique entière est encodée dans l'URL : zéro base de données. */

const LS_KEY = "slate_shop";
let shop = loadLS(LS_KEY, { name: "", wa: "", desc: "", products: [] });

const esc = s => String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtAr = p => String(p).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Ar";

/* ---------- Numéro WhatsApp malgache ---------- */
function normWa(v) {
  let n = String(v || "").replace(/\D/g, "");
  if (n.startsWith("261")) return n;
  if (n.startsWith("0")) return "261" + n.slice(1);
  return n;
}

/* ---------- Encodage base64url (lien partageable) ---------- */
const b64u = {
  enc: obj => btoa(unescape(encodeURIComponent(JSON.stringify(obj)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""),
  dec: str => { try { return JSON.parse(decodeURIComponent(escape(atob(str.replace(/-/g, "+").replace(/_/g, "/"))))); } catch { return null; } }
};

const shareURL = () => location.href.split("#")[0] + "#b=" + b64u.enc(shop);

/* ---------- QR ---------- */
const qrSrc = (url, size) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(url)}`;

/* ================= MODE CLIENT (lien ouvert par un client) ================= */
function renderClient(data) {
  document.title = (data.name || "Boutique") + " · LinkShop by SLATE";
  $("#clientMode").style.display = "block";
  $("#cTitle").textContent = "🛍️ " + (data.name || "Boutique");
  $("#cName").textContent = data.name || "Ma boutique";
  $("#cDesc").textContent = data.desc || "Bienvenue ! Commandez directement sur WhatsApp 📲";
  const wa = normWa(data.wa);
  $("#cGrid").innerHTML = (data.products || []).length
    ? data.products.map(p => {
        const txt = encodeURIComponent(`Bonjour ! 👋 Je veux commander : ${p.e || "🛍"} ${p.n} — ${fmtAr(p.p)} (boutique « ${data.name} »)`);
        const href = wa ? `https://wa.me/${wa}?text=${txt}` : `https://wa.me/?text=${txt}`;
        return `<div class="pcard">
          <div class="e">${p.e || "🛍"}</div>
          <h3>${esc(p.n)}</h3>
          <div class="price">${fmtAr(p.p)}</div>
          <div class="d">${esc(p.d || "")}</div>
          <a class="wabtn" href="${href}" target="_blank" rel="noopener">💬 Commander</a>
        </div>`;
      }).join("")
    : `<p class="hint" style="grid-column:1/-1;text-align:center;padding:20px">Cette boutique ajoute bientôt ses produits 🛍</p>`;
  $("#cMine").href = location.href.split("#")[0];
}

/* ================= MODE VENDEUR ================= */
function save() { saveLS(LS_KEY, shop); refreshShare(); }

function renderSeller() {
  $("#sellerMode").style.display = "block";
  $("#sName").value = shop.name; $("#sWa").value = shop.wa; $("#sDesc").value = shop.desc;
  renderProds(); refreshShare();
}

function renderProds() {
  $("#prodList").innerHTML = shop.products.length
    ? shop.products.map((p, i) => `
      <div class="prod">
        <span class="pe">${p.e || "🛍"}</span>
        <span><span class="pn">${esc(p.n)}</span><br>
        <span class="pp">${fmtAr(p.p)}</span>${p.d ? ` · <span class="pd">${esc(p.d)}</span>` : ""}</span>
        <button class="del" data-i="${i}" title="Supprimer">✕</button>
      </div>`).join("")
    : `<p class="hint" style="margin-top:14px">Aucun produit pour l'instant — ajoutez le premier au-dessus ☝️</p>`;
  $$("#prodList .del").forEach(b => b.onclick = () => {
    shop.products.splice(+b.dataset.i, 1); save(); renderProds();
    toast("Produit supprimé");
  });
}

function refreshShare() {
  const url = shareURL();
  $("#shareUrl").value = shop.products.length ? url : "(ajoutez d'abord au moins un produit ☝️)";
  if (shop.products.length) { $("#qrImg").src = qrSrc(url, 300); }
  else $("#qrImg").removeAttribute("src");
}

/* ---------- Onglet vendeur : vitrine aperçu ---------- */
let inPreview = false;
function togglePreview() {
  inPreview = !inPreview;
  if (inPreview) {
    $("#clientMode").style.display = "block";
    renderClient(shop);
    $("#sellerMode").style.display = "none";
    $("#previewBtn").textContent = "← Retour à l'édition";
    // ré-affiche le bandeau client par-dessus
    $("#sellerMode").style.display = "none";
    document.title = "Aperçu vitrine · LinkShop";
  } else {
    $("#clientMode").style.display = "none";
    renderSeller();
    $("#previewBtn").textContent = "👁 Voir ma vitrine";
    document.title = "LinkShop · SLATE — Votre mini-boutique";
  }
  window.scrollTo({ top: 0 });
}

/* ---------- Affiche QR ---------- */
function printPoster() {
  if (!shop.name) { toast("Donne d'abord un nom à ta boutique 😊"); return; }
  if (!shop.products.length) { toast("Ajoute au moins un produit avant d'imprimer 🛍"); return; }
  $("#poName").textContent = "🛍 " + shop.name;
  $("#poDesc").textContent = shop.desc || "Commandes directes sur WhatsApp";
  $("#poQr").src = qrSrc(shareURL(), 640);
  setTimeout(() => window.print(), 700);
}

/* ================= Démarrage ================= */
document.addEventListener("DOMContentLoaded", () => {
  const hash = location.hash;
  if (hash.startsWith("#b=")) {
    const data = b64u.dec(hash.slice(3));
    if (data && Array.isArray(data.products)) { renderClient(data); return; }
    toast("Lien de boutique invalide 😕");
  }
  renderSeller();

  ["sName", "sWa", "sDesc"].forEach(id => $("#" + id).addEventListener("input", e => {
    shop[id === "sName" ? "name" : id === "sWa" ? "wa" : "desc"] = e.target.value.trim();
    save();
  }));

  $("#addBtn").onclick = () => {
    const n = $("#pName").value.trim(), p = $("#pPrice").value.replace(/\D/g, "");
    if (!n) { toast("Donne un nom au produit 😊"); return; }
    if (!p) { toast("Mets un prix en Ariary 💰"); return; }
    if (shop.products.length >= 20) { toast("Maximum 20 produits (pour garder un lien court) 🛍"); return; }
    shop.products.push({ e: $("#pEmoji").value.trim() || "🛍", n, p, d: $("#pDesc").value.trim() });
    $("#pEmoji").value = $("#pName").value = $("#pPrice").value = $("#pDesc").value = "";
    save(); renderProds();
    toast("Produit ajouté ✔ Ta vitrine est à jour !");
  };

  $("#copyBtn").onclick = async () => {
    if (!shop.products.length) { toast("Ajoute d'abord un produit 😊"); return; }
    const url = shareURL();
    try { await navigator.clipboard.writeText(url); toast("Lien copié ! Partage-le partout 🚀"); }
    catch { $("#shareUrl").select(); document.execCommand("copy"); toast("Lien copié ! 🚀"); }
  };

  $("#printBtn").onclick = printPoster;
  $("#previewBtn").onclick = togglePreview;
});
