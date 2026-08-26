/* ===== SLATE · Correcteur photo IA =====
   ⚠️ CONFIG : collez ici l'URL du Web Service Render (fait une seule fois) */
const API_URL = "https://A-CONFIGURER.onrender.com";

let imgData = null, imgMime = "image/jpeg", niveau = "", loadTick = null;

const MSGS = [
  "🤖 L'IA lit votre sujet…",
  "✍️ Elle rédige la correction étape par étape…",
  "🧮 Vérification des calculs en cours…",
  "☕ Astuce : au tout premier envoi, le serveur se réveille (~30 s)…",
  "🎓 Encore un petit instant…"
];

/* ---------- Niveau : chips ---------- */
function renderLvl() {
  const lvls = ["6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale"];
  $("#lvlChips").innerHTML = lvls.map(l =>
    `<button class="fchip ${l === niveau ? "on" : ""}" data-l="${l}">${l}</button>`).join("");
  $$("#lvlChips .fchip").forEach(b => b.onclick = () => {
    niveau = niveau === b.dataset.l ? "" : b.dataset.l;
    renderLvl();
  });
}

/* ---------- Photo : lecture + compression ---------- */
function handleFile(file) {
  if (!file || !file.type.startsWith("image/")) { toast("Choisis une image 📷"); return; }
  const rd = new FileReader();
  rd.onload = e => {
    const im = new Image();
    im.onload = () => {
      const MAX = 1400;
      let w = im.width, h = im.height;
      if (Math.max(w, h) > MAX) { const k = MAX / Math.max(w, h); w = Math.round(w * k); h = Math.round(h * k); }
      const cv = document.createElement("canvas");
      cv.width = w; cv.height = h;
      cv.getContext("2d").drawImage(im, 0, 0, w, h);
      const du = cv.toDataURL("image/jpeg", 0.85);
      imgData = du.split(",")[1];
      imgMime = "image/jpeg";
      $("#imgPrev").src = du;
      $("#imgPrev").classList.add("show");
      $("#goBtn").disabled = false;
      toast("Photo prête ✔ Lance la correction !");
    };
    im.src = e.target.result;
  };
  rd.readAsDataURL(file);
}

/* ---------- Mini formateur (gras, titres, listes) ---------- */
function fmtMD(t) {
  let h = String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  h = h.replace(/^###\s*(.+)$/gm, "<h3>$1</h3>")
       .replace(/^##\s*(.+)$/gm, "<h3>$1</h3>")
       .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
       .replace(/^[\-\*•]\s+(.+)$/gm, "• $1")
       .replace(/\n{2,}/g, "<br><br>")
       .replace(/\n/g, "<br>");
  return h;
}

function setLoad(on) {
  $("#loadBox").classList.toggle("show", on);
  $("#result").classList.remove("show");
  clearInterval(loadTick);
  if (on) {
    let i = 0;
    $("#loadMsg").textContent = MSGS[0];
    loadTick = setInterval(() => { i = (i + 1) % MSGS.length; $("#loadMsg").textContent = MSGS[i]; }, 3800);
  }
}

async function corriger() {
  if (!imgData) return;
  $("#errBox").classList.remove("show");
  if (API_URL.includes("A-CONFIGURER")) {
    $("#errBox").innerHTML = "⚙️ Le serveur IA n'est pas encore branché (configuration en cours côté Slate). Revenez très vite !";
    $("#errBox").classList.add("show");
    return;
  }
  $("#goBtn").disabled = true;
  setLoad(true);
  window.scrollTo({ top: 0, behavior: "smooth" });
  try {
    const r = await fetch(API_URL + "/api/corrige", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imgData, mime: imgMime, niveau })
    });
    const d = await r.json();
    if (!d.ok) throw new Error(d.error || "Erreur inconnue");
    $("#resTxt").innerHTML = fmtMD(d.text);
    setLoad(false);
    $("#result").classList.add("show");
    $("#result").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (e) {
    setLoad(false);
    $("#errBox").innerHTML = "😕 " + (e.message.includes("fetch")
      ? "Connexion impossible au serveur (il se réveille peut-être : réessaie dans 30 s) ☕"
      : e.message);
    $("#errBox").classList.add("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  $("#goBtn").disabled = false;
}

document.addEventListener("DOMContentLoaded", () => {
  renderLvl();
  $("#upzone").onclick = () => $("#fileIn").click();
  $("#fileIn").onchange = e => handleFile(e.target.files[0]);
  $("#goBtn").onclick = corriger;
  $("#againBtn").onclick = () => {
    imgData = null;
    $("#imgPrev").classList.remove("show");
    $("#result").classList.remove("show");
    $("#goBtn").disabled = true;
    $("#fileIn").value = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
});
