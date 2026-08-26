/* ===== SLATE API — correcteur photo IA (Gemini) =====
   La clé GEMINI_API_KEY reste cachée ici côté serveur (jamais dans le site). */
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ limit: "8mb" }));

const KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-3.6-flash";

const PROMPT = `Tu es un professeur expérimenté de Madagascar (programme officiel MEN, système francophone : collège 6ème→3ème/BEPC, lycée 2nde→Terminale/BAC).

CAS A — Si la photo montre un SUJET d'examen ou de devoir :
1. LIS et identifie chaque question ou exercice (même manuscrit si possible).
2. Pour CHACUN, donne la RÉPONSE correcte puis la CORRECTION DÉTAILLÉE étape par étape : formules utilisées, calculs posés, règles appliquées.
3. Chaque réponse doit être MOTIVÉE : justifie-la et indique son ORIGINE (nom du théorème, de la règle de grammaire, de la leçon du programme malgache concernée).

CAS B — Si la photo montre le TRAVAIL / la COPIE d'un élève (ses propres réponses) :
1. Corrige TOUTES les fautes une par une : orthographe (ex : on écrit "trois", pas "troix"), grammaire, conjugaison, calculs, raisonnement.
2. Pour chaque faute : cite ce qui est écrit, donne la BONNE forme, puis explique POURQUOI (origine de la règle) et motive la correction.
3. Termine par une NOTE indicative sur 20 et un conseil personnalisé.

RÈGLES GÉNÉRALES :
- Réponds en FRANÇAIS, simplement, comme un prof qui explique au tableau, avec un ton encourageant.
- Structure : "### Question 1" (ou "### Faute 1") puis "✔ Réponse : ..." puis "📝 Étapes / Explication : ...".
- Si une zone est illisible, dis-le honnêtement ("zone illisible") au lieu d'inventer.
- Termine par un mini-conseil de révision adapté au sujet.`;

app.get("/", (req, res) => res.send("SLATE API — OK ✅"));

app.post("/api/corrige", async (req, res) => {
  try {
    if (!KEY) return res.status(500).json({ ok: false, error: "Clé GEMINI_API_KEY non configurée sur le serveur." });
    const { image, mime, niveau } = req.body || {};
    if (!image) return res.status(400).json({ ok: false, error: "Aucune image reçue." });

    const prompt = PROMPT + (niveau ? `\nL'élève est en classe de ${niveau} : adapte les explications à son niveau.` : "");
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [
            { text: prompt },
            { inline_data: { mime_type: mime || "image/jpeg", data: image } }
          ]}]
        })
      }
    );
    const d = await r.json();
    if (d.error) return res.status(502).json({ ok: false, error: "Gemini : " + (d.error.message || "erreur") });
    const text = (d.candidates?.[0]?.content?.parts || []).map(p => p.text).join("");
    if (!text) return res.status(502).json({ ok: false, error: "Réponse vide de l'IA — réessayez avec une photo plus nette." });
    res.json({ ok: true, text });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Erreur serveur : " + e.message });
  }
});

/* ===== VÉRIFICATION DE PAIEMENTS (Mobile Money MG) =====
   Le client envoie la capture de son reçu Mvola / Airtel Money.
   L'IA extrait les données, le serveur valide et débloque l'accès. */
const fs = require("fs");
const REFS_FILE = "./refs.json";
const PRIX = { pro: 5000, hyper: 15000 }; // Ariary
// Numéros autorisés à recevoir l'argent (format international sans +) :
const PAYEES = [
  { op: "Mvola",       numero: "261385303211" }, // 038 53 032 11
  { op: "Airtel Money", numero: "261334989048" }  // 033 49 890 48
];

const loadRefs = () => { try { return JSON.parse(fs.readFileSync(REFS_FILE, "utf8")); } catch { return { refs: [] }; } };
const saveRefs = d => { try { fs.writeFileSync(REFS_FILE, JSON.stringify(d)); } catch {} };

const digits = v => String(v || "").replace(/\D/g, "");
const matchNum = receipt => {
  const n = digits(receipt);
  if (n.length < 9) return null;
  return PAYEES.find(p => p.numero.endsWith(n.slice(-9)) || n.endsWith(p.numero.slice(-9))) || null;
};

const todayMG = () => new Intl.DateTimeFormat("fr-FR", {
  timeZone: "Indian/Antananarivo", day: "2-digit", month: "2-digit", year: "numeric"
}).format(new Date());

const MOIS = { janvier: "01", "février": "02", fevrier: "02", feb: "02", mars: "03", avril: "04", apr: "04", mai: "05", juin: "06", jun: "06", juillet: "07", jul: "07", "août": "08", aout: "08", aug: "08", septembre: "09", sept: "09", sep: "09", octobre: "10", oct: "10", novembre: "11", nov: "11", "décembre": "12", decembre: "12", dec: "12" };
function parseDateAny(s) {
  if (!s) return null;
  const t = String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  let m = t.match(/(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{2,4})/);
  if (m) return norm(m[1], m[2], m[3]);
  m = t.match(/(\d{4})[/\-.](\d{1,2})[/\-.](\d{1,2})/);
  if (m) return norm(m[3], m[2], m[1]);
  m = t.match(/(\d{1,2})\s*([a-zéû.]+)\s*(\d{4})/);
  if (m) { const mm = MOIS[m[2].replace(/\./g, "")] || MOIS[m[2].replace(/\./g, "").slice(0, 3)]; if (mm) return norm(m[1], mm, m[3]); }
  return null;
  function norm(j, m2, a) { a = a.length === 2 ? "20" + a : a; return String(j).padStart(2, "0") + "/" + String(m2).padStart(2, "0") + "/" + a; }
}

const PROMPT_PAY = `Analyse cette capture d'écran. C'est censé être un reçu de paiement Mobile Money malgache (Mvola, Airtel Money ou Orange Money).
Réponds UNIQUEMENT avec un objet JSON compact, sans markdown, sans autre texte :
{"est_recu":true,"operateur":"Mvola","numero_destinataire":"038 53 032 11","montant_ariary":5000,"reference":"PP240826.1234.A56789","date_transaction":"26/08/2026","statut":"reussi"}
Règles strictes :
- "est_recu" = true UNIQUEMENT si l'image montre clairement une confirmation de transfert d'argent RÉUSSI (SMS ou capture d'appli Mvola / Airtel Money / Orange Money). Sinon false.
- "numero_destinataire" = le numéro qui a REÇU l'argent (le bénéficiaire), tel qu'affiché.
- "montant_ariary" = nombre entier (sans espaces ni "Ar").
- "reference" = l'identifiant/code de transaction complet (lettres, chiffres, points).
- "statut" = "reussi", "echoue" ou "inconnu".
- Si une information est illisible, mets null. Ne devine JAMAIS.`;

app.post("/api/verifie-paiement", async (req, res) => {
  try {
    if (!KEY) return res.status(500).json({ ok: false, error: "Serveur non configuré." });
    const { image, mime } = req.body || {};
    if (!image) return res.status(400).json({ ok: false, error: "Aucune capture reçue." });

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
      {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [
          { text: PROMPT_PAY },
          { inline_data: { mime_type: mime || "image/jpeg", data: image } }
        ]}]})
      }
    );
    const d = await r.json();
    if (d.error) return res.status(502).json({ ok: false, error: "IA indisponible — réessayez dans 1 minute." });
    const txt = (d.candidates?.[0]?.content?.parts || []).map(p => p.text).join("");
    let pay = null;
    try {
      const clean = txt.replace(/```[a-z]*/gi, "").trim();
      pay = JSON.parse(clean.slice(clean.indexOf("{"), clean.lastIndexOf("}") + 1));
    } catch { return res.json({ ok: false, error: "Capture illisible — photographie le reçu complet et net." }); }

    if (pay.est_recu !== true)
      return res.json({ ok: false, error: "Cette image ne semble pas être un reçu de paiement Mobile Money." });
    if (pay.statut && /echou|échou|fail/i.test(pay.statut))
      return res.json({ ok: false, error: "Cette transaction apparaît comme ÉCHOUÉE sur le reçu." });

    const dest = matchNum(pay.numero_destinataire);
    if (!dest)
      return res.json({ ok: false, error: "Le numéro bénéficiaire sur la capture ne correspond pas à nos comptes officiels." });

    const montant = parseInt(digits(pay.montant_ariary), 10) || 0;
    const tier = montant >= PRIX.hyper ? "hyper" : montant >= PRIX.pro ? "pro" : null;
    if (!tier)
      return res.json({ ok: false, error: `Montant insuffisant : ${montant.toLocaleString("fr-FR")} Ar (minimum ${PRIX.pro.toLocaleString("fr-FR")} Ar).` });

    const jour = parseDateAny(pay.date_transaction);
    if (!jour || jour !== todayMG())
      return res.json({ ok: false, error: "La transaction doit dater d'aujourd'hui (" + todayMG() + ")." });

    const ref = String(pay.reference || "").replace(/\s/g, "").toUpperCase();
    if (ref.length < 6 || !/[A-Z0-9]/.test(ref))
      return res.json({ ok: false, error: "Référence de transaction introuvable sur la capture." });
    const used = loadRefs();
    if (used.refs.includes(ref))
      return res.json({ ok: false, error: "Cette référence a déjà servi à débloquer un accès." });
    used.refs.push(ref);
    if (used.refs.length > 500) used.refs = used.refs.slice(-500);
    saveRefs(used);

    res.json({ ok: true, tier, montant, operateur: dest.op });
  } catch (e) {
    res.status(500).json({ ok: false, error: "Erreur serveur : " + e.message });
  }
});

/* ===== BOÎTE À AVIS (suggestions & critiques des visiteurs) =====
   Lecture par le propriétaire via /api/avis?secret=slate-maitre-2026 */
const AVIS_FILE = "./avis.json";
const AVIS_SECRET = "slate-maitre-2026";
const loadAvis = () => { try { return JSON.parse(fs.readFileSync(AVIS_FILE, "utf8")); } catch { return { avis: [] }; } };

app.post("/api/avis", (req, res) => {
  try {
    const { stars, msg, page } = req.body || {};
    const n = parseInt(stars, 10);
    if (!n || n < 1 || n > 5) return res.status(400).json({ ok: false, error: "note invalide" });
    if (!msg || String(msg).trim().length < 2) return res.status(400).json({ ok: false, error: "message vide" });
    const d = loadAvis();
    d.avis.push({ stars: n, msg: String(msg).trim().slice(0, 500), page: String(page || "/").slice(0, 60), at: new Date().toISOString() });
    if (d.avis.length > 500) d.avis = d.avis.slice(-500);
    try { fs.writeFileSync(AVIS_FILE, JSON.stringify(d)); } catch {}
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ ok: false, error: e.message }); }
});

app.get("/api/avis", (req, res) => {
  if ((req.query.secret || "") !== AVIS_SECRET) return res.status(403).send("Accès refusé 🔒");
  const d = loadAvis();
  const rows = d.avis.slice().reverse().map(a => {
    const date = new Date(a.at).toLocaleString("fr-FR", { timeZone: "Indian/Antananarivo" });
    const escH = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
    return `<tr><td>${"⭐".repeat(a.stars)}</td><td>${escH(a.msg)}</td><td>${escH(a.page)}</td><td>${date}</td></tr>`;
  }).join("");
  const moyenne = d.avis.length ? (d.avis.reduce((s, a) => s + a.stars, 0) / d.avis.length).toFixed(1) : "—";
  res.send(`<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Avis SLATE (privé)</title><style>body{font-family:system-ui;margin:16px;background:#faf9f6;color:#22313f}
  h1{font-size:20px}table{width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;font-size:13px}
  td,th{padding:9px 10px;border-bottom:1px solid #eee;text-align:left}th{background:#22313f;color:#fff;font-size:11px;letter-spacing:1px}
  tr:last-child td{border:none}</style></head><body>
  <h1>📊 Avis SLATE — ${d.avis.length} message(s) · Moyenne : ${moyenne} ⭐</h1>
  <table><tr><th>Note</th><th>Message</th><th>Page</th><th>Date (Mada)</th></tr>${rows || '<tr><td colspan="4">Aucun avis pour le moment 🌱</td></tr>'}</table></body></html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SLATE API démarrée sur le port " + PORT));
