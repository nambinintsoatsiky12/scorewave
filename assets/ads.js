/* ============================================================
   💰 PUBLICITÉ MONETAG — ÉTAT ACTUEL
   ------------------------------------------------------------
   ✅ Push Notification (zone 11645525) : installée dans le <head>
      des 3 pages (index.html, cv/, facture/)
   ✅ Smartlink (https://omg10.com/4/11645531) : boutons
      « Offre du moment » (hero), « Bonus Slate » (accueil),
      « Offre sponsorisée » (CV Pro + Facture+)

   BANNIÈRES SUPPLÉMENTAIRES — si vous créez une zone bannière
   dans Monetag, collez son code ci-dessous entre les backticks :
   elle apparaîtra dans tous les emplacements .ad-slot du site.
   ============================================================ */
const MONETAG_SNIPPET = ``;

/* Injecte le snippet dans chaque .ad-slot (gère aussi les <script>) */
function injectSnippet(container, html) {
  const tmp = document.createElement("template");
  tmp.innerHTML = html;
  [...tmp.content.childNodes].forEach(node => {
    if (node.tagName === "SCRIPT") {
      const s = document.createElement("script");
      [...node.attributes].forEach(a => s.setAttribute(a.name, a.value));
      if (node.textContent) s.textContent = node.textContent;
      container.appendChild(s);
    } else {
      container.appendChild(node.cloneNode(true));
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ad-slot").forEach(slot => {
    if (!MONETAG_SNIPPET.trim()) { slot.style.display = "none"; return; }
    injectSnippet(slot, MONETAG_SNIPPET);
  });
});
