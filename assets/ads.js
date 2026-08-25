/* ============================================================
   💰 PUBLICITÉ MONETAG — COLLEZ VOTRE CODE ICI (une seule fois)
   ------------------------------------------------------------
   1) Dans votre tableau de bord Monetag : ajoutez ce site
      (Settings → Sites → Add site) puis copiez le code de la zone.
   2) Collez ce code ci-dessous entre les guillemets inversés (backticks).
   3) Il apparaîtra automatiquement dans TOUS les emplacements
      pub du site (page d'accueil + outils).

   Exemple :
   const MONETAG_SNIPPET = `<script src="https://exemple.com/zone.js"></script>`;
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
