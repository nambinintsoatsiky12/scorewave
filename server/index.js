/* ===== SLATE API — correcteur photo IA (Gemini) =====
   La clé GEMINI_API_KEY reste cachée ici côté serveur (jamais dans le site). */
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ limit: "8mb" }));

const KEY = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash";

const PROMPT = `Tu es un professeur expérimenté de Madagascar (système scolaire francophone : 3ème, 1ère, Terminale — BEPC et BAC).
Sur cette photo d'un sujet d'examen ou de devoir :
1. LIS et identifie chaque question ou exercice (même manuscrit si possible).
2. Pour CHACUN, donne la RÉPONSE correcte puis la CORRECTION DÉTAILLÉE étape par étape : formules utilisées, calculs posés, règles appliquées.
3. Réponds en FRANÇAIS, simplement, comme un prof qui explique au tableau.
4. Structure : "### Question 1" puis "✔ Réponse : ..." puis "📝 Étapes : ...".
5. Si une zone est illisible, dis-le honnêtement ("zone illisible") au lieu d'inventer.
6. Termine par un mini-conseil de révision adapté au sujet.`;

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SLATE API démarrée sur le port " + PORT));
