/* ===== CV Pro · SLATE ===== */
const KEY = "slate_cv";
const DEFAULTS = {
  tpl: "cl", ac: "#22313f",
  name: "", role: "", email: "", phone: "", city: "", link: "", photo: "", summary: "",
  exp: [{ poste: "", org: "", debut: "", fin: "", desc: "" }],
  edu: [{ diplome: "", ecole: "", annees: "", desc: "" }],
  skills: "",
  interests: "",
  langs: [{ lang: "", niveau: "Courant" }],
  certs: [{ nom: "", org: "", annees: "" }],
  refs: [{ nom: "", poste: "", contact: "" }]
};
let state = Object.assign({}, DEFAULTS, loadLS(KEY, {}));

/* ===== Niveaux d'accès (free / pro / hyper) ===== */
const API_URL = "https://slate-app-05xa.onrender.com";
const RANK = { free: 0, pro: 1, hyper: 2 };
const PRIX = { pro: 5000, hyper: 15000 };
let myTier = "free";

/* ===== Contenus prêts à l'emploi (offres payantes) ===== */
const MISSIONS = [
  { m: "🛒 Vendeur / Caissier", p: "Vendeur(se)", d: "Accueil et conseil de la clientèle au quotidien · Encaissements et gestion de la caisse en fin de journée · Mise en rayon, étiquetage et suivi des stocks · Objectifs de vente atteints régulièrement." },
  { m: "📋 Secrétaire / Assistant(e)", p: "Secrétaire administratif(ve)", d: "Rédaction et classement des courriers et dossiers · Accueil des visiteurs et filtrage des appels · Organisation des réunions et gestion des agendas · Saisie informatique (Word, Excel)." },
  { m: "🏫 Enseignant(e)", p: "Enseignant(e)", d: "Préparation et animation des cours selon le programme officiel · Évaluation des élèves et suivi individuel · Communication régulière avec les parents · Participation à la vie de l'établissement." },
  { m: "🍽 Serveur / Restauration", p: "Serveur / Employé de restauration", d: "Prise de commandes et service en salle avec le sourire · Gestion de plusieurs tables en simultané · Respect strict des règles d'hygiène · Encaissement et relation client." },
  { m: "🚗 Chauffeur / Livreur", p: "Chauffeur-livreur", d: "Livraisons quotidiennes dans les délais · Entretien et vérification du véhicule · Tenue du carnet de route · Accueil professionnel des clients lors des livraisons." },
  { m: "🧮 Comptable / Finance", p: "Assistant comptable", d: "Saisie et classement des pièces comptables · Suivi de trésorerie et rapprochements bancaires · Préparation des factures clients · Déclarations fiscales sous supervision." },
  { m: "💻 Développeur / Informatique", p: "Développeur", d: "Développement et maintenance d'applications web · Correction de bugs et tests avant déploiement · Documentation technique · Travail en équipe (Git, revues de code)." },
  { m: "🔧 Ouvrier / BTP", p: "Ouvrier qualifié", d: "Réalisation des travaux selon les plans et les normes · Respect des consignes de sécurité sur chantier · Entretien du matériel · Travail en équipe et respect des délais." },
  { m: "⚕️ Infirmier / Santé", p: "Infirmier(ère)", d: "Soins et suivi quotidien des patients · Prise des constantes et tenue des dossiers médicaux · Éducation des patients et des familles · Travail coordonné avec l'équipe médicale." },
  { m: "🛡 Agent de sécurité", p: "Agent de sécurité", d: "Surveillance des locaux et contrôle des accès · Rondes régulières et rédaction des rapports · Gestion calme des situations délicates · Premiers secours et réaction aux alertes." },
  { m: "🌾 Agriculture / Élevage", p: "Ouvrier agricole", d: "Culture, entretien et récolte des parcelles · Soin et alimentation du bétail · Utilisation et entretien du matériel agricole · Suivi des rendements." },
  { m: "📱 Community Manager", p: "Community manager", d: "Animation des pages (Facebook, WhatsApp Business) · Création de visuels et rédaction de publications · Réponse rapide aux messages clients · Suivi des vues et des ventes générées." }
];
const DIPLOMES = [
  { t: "BEPC", d: "" }, { t: "BACC série A (Littéraire)", d: "" },
  { t: "BACC série C (Sciences exactes)", d: "" }, { t: "BACC série D (Sciences naturelles)", d: "" },
  { t: "BTS", d: "Formation technique professionnalisante" }, { t: "Licence", d: "" },
  { t: "Master", d: "" }, { t: "Certificat professionnel", d: "Formation qualifiante" }
];
const SKILLCHIPS = ["Microsoft Word", "Excel", "Communication", "Travail en équipe", "Ponctualité", "Sens de l'organisation", "Gestion de caisse", "Relation client", "Conduite (permis B)", "Français écrit", "Anglais", "Informatique de base", "Gestion des stocks", "Réseaux sociaux", "Négociation"];
const INTCHIPS = ["Lecture", "Football", "Basket-ball", "Musique", "Chant", "Bénévolat / associatif", "Voyage", "Cuisine", "Randonnée", "Échecs"];
const ATOUTS = [
  "Ma rigueur et ma ponctualité sont reconnues de tous ceux qui m'ont vu travailler : je tiens mes engagements et je finis ce que je commence.",
  "Mon expérience de terrain m'a appris l'essentiel : comprendre vite le besoin du client ou du public, et y répondre avec efficacité.",
  "Mon sens du contact et mon aisance relationnelle me permettent de créer rapidement un climat de confiance avec les clients comme avec les collègues.",
  "À l'aise avec les outils informatiques (Word, Excel, messageries, réseaux sociaux), je suis capable de m'adapter rapidement à vos logiciels internes.",
  "Mon esprit d'équipe et mon sens de l'organisation me permettent de coordonner les tâches et de garder le cap même sous pression.",
  "Autonome et débrouillard(e), je sais prendre des initiatives responsables sans attendre qu'on me dicte chaque détail."
];
const LETTRES = {
  classe: (poste, ent, atout, nom, ville, date) => `${nom}
${ville}, le ${date}

À l'attention du Responsable du recrutement
${ent}

Objet : Candidature au poste de ${poste}

Madame, Monsieur,

Actuellement à la recherche d'une opportunité professionnelle, je me permets de vous adresser ma candidature au poste de ${poste} au sein de ${ent}.

${atout} Partager ces qualités au service d'une structure sérieuse comme la vôtre serait pour moi une source de fierté et d'engagement quotidien.

Disponible immédiatement, je serais honoré(e) de vous exposer ma motivation lors d'un entretien, à votre convenance.

Dans cette attente, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${nom}`,
  dyna: (poste, ent, atout, nom, ville, date) => `${nom}
${ville}, le ${date}

${ent}
Objet : Candidature au poste de ${poste} — et si on en parlait ?

Madame, Monsieur,

Votre entreprise cherche quelqu'un de fiable pour le poste de ${poste} : ce défi me motive, et ce message est ma candidature.

${atout} Ce que j'apporte est simple : du sérieux, des résultats mesurables, et l'envie de faire grandir votre équipe avec moi.

Je vous propose de nous rencontrer pour vous montrer concrètement ce que je peux apporter à ${ent}. Disponible dès maintenant.

Bien cordialement,

${nom}`,
  debut: (poste, ent, atout, nom, ville, date) => `${nom}
${ville}, le ${date}

À l'attention du Responsable du recrutement
${ent}

Objet : Candidature au poste de ${poste}

Madame, Monsieur,

Fraîchement diplômé(e), je me permets de vous présenter ma candidature au poste de ${poste} au sein de ${ent}, dont le sérieux et la réputation m'ont convaincu(e) de frapper à votre porte.

${atout} Conscient(e) qu'un premier poste se mérite, je suis prêt(e) à apprendre vite, à être formé(e) et à prouver ma valeur sur le terrain.

Je serais honoré(e) de pouvoir vous exposer ma motivation lors d'un entretien, à la date qui vous conviendra.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${nom}`
};
const ACCROCHES = [
  { t: "😊 Généraliste motivé", x: "Personne rigoureuse, ponctuelle et déterminée, je m'adapte rapidement et j'accorde une grande importance au travail bien fait. Disponible immédiatement, je souhaite mettre mon énergie et mon sérieux au service de votre équipe." },
  { t: "🎓 Jeune diplômé(e)", x: "Jeune diplômé(e) en [votre domaine], passionné(e) et formé(e) aux méthodes actuelles de mon secteur. Je recherche un premier poste où apprendre vite, produire des résultats concrets et grandir aux côtés de votre équipe." },
  { t: "💼 Commercial / Vente", x: "Commercial(e) de terrain, à l'aise avec les clients et animé(e) par les résultats. J'ai appris à écouter, convaincre et fidéliser. Objectif constant : dépasser les objectifs fixés, avec le sourire et dans le respect des clients." },
  { t: "🏅 Profil expérimenté", x: "[X] années d'expérience dans [votre domaine], dont plusieurs chez [entreprise]. J'ai piloté [missions clés] avec un fil conducteur : la qualité du travail et la satisfaction client. Je sais coordonner une équipe et former les nouveaux." },
  { t: "💻 Technique / Informatique", x: "Profil technique rigoureux, autonome et curieux. Maîtrise de [vos outils / technologies]. J'aime résoudre des problèmes concrets et livrer un travail propre, documenté et dans les délais." }
];

/* ===== 10 secrets d'un CV gagnant (offre Pro) ===== */
const TIPS = [
  "<b>Une page, pas deux.</b> Un recruteur accorde 6 à 8 secondes à un CV : l'essentiel doit sauter aux yeux.",
  "<b>Personnalisez chaque envoi.</b> Reprenez les mots-clés exacts de l'annonce dans votre profil et vos compétences.",
  "<b>Chiffrez vos résultats.</b> « +30 % de ventes » convainc plus que « bon vendeur ».",
  "<b>Adresse e-mail professionnelle.</b> prenom.nom@mail.com — pas de surnom d'adolescence 😅.",
  "<b>Zéro faute.</b> Une seule coquille peut éliminer un CV : faites relire par quelqu'un de sérieux.",
  "<b>Le plus récent d'abord.</b> Expériences et formations en ordre antichronologique (le récent en haut).",
  "<b>Photo professionnelle ou rien.</b> Fond neutre, visage clair, tenue correcte — jamais de photo de fête.",
  "<b>Ne mentez jamais.</b> Tout se vérifie à l'entretien ou au téléphone avec vos anciens employeurs.",
  "<b>Verbes d'action.</b> Commencez chaque mission par : géré, créé, amélioré, formé, réduit, lancé…",
  "<b>Nommez le PDF proprement.</b> Prenom_NOM_CV.pdf — le recruteur vous retrouve instantanément."
];
const esc = s => String(s || "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const LEVELS = ["Débutant", "Intermédiaire", "Courant", "Bilingue", "Langue maternelle"];
let deb;
const save = () => { clearTimeout(deb); deb = setTimeout(() => saveLS(KEY, state), 300); };

/* ---------- Formulaire : listes répétables ---------- */
function renderRows() {
  $("#expList").innerHTML = state.exp.map((x, i) => `
    <div class="row-item" data-k="exp" data-i="${i}">
      <button class="del" title="Supprimer">✕ Supprimer</button>
      <div class="grid2">
        <div class="field"><label>Poste</label><input data-f="poste" value="${esc(x.poste)}" placeholder="Ex : Vendeuse"></div>
        <div class="field"><label>Entreprise</label><input data-f="org" value="${esc(x.org)}" placeholder="Ex : Shop Tanà"></div>
      </div>
      <div class="grid2">
        <div class="field"><label>Début</label><input data-f="debut" value="${esc(x.debut)}" placeholder="2022"></div>
        <div class="field"><label>Fin</label><input data-f="fin" value="${esc(x.fin)}" placeholder="Aujourd'hui"></div>
      </div>
      <div class="field"><label>Missions / réalisations</label><textarea data-f="desc" placeholder="Décrivez vos résultats…">${esc(x.desc)}</textarea></div>
    </div>`).join("");
  $("#eduList").innerHTML = state.edu.map((x, i) => `
    <div class="row-item" data-k="edu" data-i="${i}">
      <button class="del" title="Supprimer">✕ Supprimer</button>
      <div class="field"><label>Diplôme</label><input data-f="diplome" value="${esc(x.diplome)}" placeholder="Ex : Licence Informatique"></div>
      <div class="grid2">
        <div class="field"><label>Établissement</label><input data-f="ecole" value="${esc(x.ecole)}" placeholder="Ex : Université d'Antananarivo"></div>
        <div class="field"><label>Années</label><input data-f="annees" value="${esc(x.annees)}" placeholder="2018 – 2022"></div>
      </div>
      <div class="field"><label>Détail (optionnel)</label><input data-f="desc" value="${esc(x.desc)}" placeholder="Mention, prix…"></div>
    </div>`).join("");
  $("#langList").innerHTML = state.langs.map((x, i) => `
    <div class="row-item" data-k="langs" data-i="${i}">
      <button class="del" title="Supprimer">✕ Supprimer</button>
      <div class="grid2">
        <div class="field"><label>Langue</label><input data-f="lang" value="${esc(x.lang)}" placeholder="Français"></div>
        <div class="field"><label>Niveau</label><select data-f="niveau">${LEVELS.map(l => `<option ${l === x.niveau ? "selected" : ""}>${l}</option>`).join("")}</select></div>
      </div>
    </div>`).join("");
  $("#certList").innerHTML = state.certs.map((x, i) => `
    <div class="row-item" data-k="certs" data-i="${i}">
      <button class="del" title="Supprimer">✕ Supprimer</button>
      <div class="field"><label>Certification / distinction</label><input data-f="nom" value="${esc(x.nom)}" placeholder="Ex : Permis B, TOEIC 850"></div>
      <div class="grid2">
        <div class="field"><label>Organisme</label><input data-f="org" value="${esc(x.org)}" placeholder="Ex : EMIT Fianarantsoa"></div>
        <div class="field"><label>Année</label><input data-f="annees" value="${esc(x.annees)}" placeholder="2024"></div>
      </div>
    </div>`).join("");
  $("#refList").innerHTML = state.refs.map((x, i) => `
    <div class="row-item" data-k="refs" data-i="${i}">
      <button class="del" title="Supprimer">✕ Supprimer</button>
      <div class="field"><label>Nom du référent</label><input data-f="nom" value="${esc(x.nom)}" placeholder="Ex : Mme Rasoanirina"></div>
      <div class="grid2">
        <div class="field"><label>Poste / lien</label><input data-f="poste" value="${esc(x.poste)}" placeholder="Ex : Directrice, Shop Tanà"></div>
        <div class="field"><label>Contact</label><input data-f="contact" value="${esc(x.contact)}" placeholder="Tél ou email"></div>
      </div>
    </div>`).join("");
}

/* ---------- Collecte DOM → état ---------- */
function collect() {
  ["name", "role", "email", "phone", "city", "link", "summary", "skills", "interests"].forEach(k => state[k] = $("#f-" + k).value);
  state.tpl = $("#f-tpl").value;
  [["exp", ["poste", "org", "debut", "fin", "desc"]],
   ["edu", ["diplome", "ecole", "annees", "desc"]],
   ["langs", ["lang", "niveau"]],
   ["certs", ["nom", "org", "annees"]],
   ["refs", ["nom", "poste", "contact"]]].forEach(([k, fs]) => {
    $$(`.row-item[data-k="${k}"]`).forEach((row, i) => fs.forEach(f => {
      state[k][i][f] = row.querySelector(`[data-f="${f}"]`).value;
    }));
  });
}

/* ---------- Rendu Aperçu A4 ---------- */
const contactLine = () => [state.email, state.phone, state.city, state.link].filter(Boolean).map(esc).join(" · ");
const contactSpans = () => [[state.email, "✉"], [state.phone, "☎"], [state.city, "📍"], [state.link, "🔗"]].filter(x => x[0]).map(x => `<span>${x[1]} ${esc(x[0])}</span>`).join(" ");
const itemHTML = (t, o, d1, d2, p) => `
  <div class="it"><div class="r1"><span class="t">${esc(t)}</span><span class="d">${esc([d1, d2].filter(Boolean).join(" – "))}</span></div>
  ${o ? `<div class="o">${esc(o)}</div>` : ""}${p ? `<p>${esc(p)}</p>` : ""}</div>`;
const expHTML = () => state.exp.filter(x => x.poste || x.org).map(x => itemHTML(x.poste, x.org, x.debut, x.fin, x.desc)).join("");
const eduHTML = () => state.edu.filter(x => x.diplome || x.ecole).map(x => itemHTML(x.diplome, x.ecole, x.annees, "", x.desc)).join("");
const skillsArr = () => state.skills.split(",").map(s => s.trim()).filter(Boolean);
const intsArr = () => (state.interests || "").split(",").map(s => s.trim()).filter(Boolean);
const dots = n => { const i = LEVELS.indexOf(n) + 1 || 3; return `<span class="dots">${[1,2,3,4,5].map(j => `<i class="${j <= i ? "f" : ""}"></i>`).join("")}</span>`; };
const certHTML = () => state.certs.filter(x => x.nom || x.org).map(x =>
  `<div class="it"><div class="r1"><span class="t" style="font-size:10px">${esc(x.nom)}</span><span class="d">${esc(x.annees)}</span></div>${x.org ? `<div class="o">${esc(x.org)}</div>` : ""}</div>`).join("");
const refHTML = () => state.refs.filter(x => x.nom || x.contact).map(x =>
  `<div class="it"><span class="t" style="font-size:10px">${esc(x.nom)}</span>${x.poste ? `<div class="o">${esc(x.poste)}</div>` : ""}${x.contact ? `<p style="margin:1px 0 0">${esc(x.contact)}</p>` : ""}</div>`).join("");
const initials = () => {
  const n = (state.name || "").trim().split(/\s+/).filter(Boolean);
  return (((n[0]?.[0] || "") + (n.length > 1 ? n[n.length - 1][0] : "")).toUpperCase()) || "✒";
};
const contactLI = () => [[state.email, "✉"], [state.phone, "☎"], [state.city, "📍"], [state.link, "🔗"]]
  .filter(x => x[0]).map(x => `<p>${x[1]} ${esc(x[0])}</p>`).join("");
const langBars = () => state.langs.filter(l => l.lang).map(l => {
  const i = LEVELS.indexOf(l.niveau) + 1 || 3;
  return `<div style="font-size:9.5px;font-weight:700;color:#4b4637">${esc(l.lang)}</div><div class="bar"><i style="width:${i * 20}%"></i></div>`;
}).join("");
const langBarsW = () => state.langs.filter(l => l.lang).map(l => {
  const i = LEVELS.indexOf(l.niveau) + 1 || 3;
  return `<div class="lg"><b>${esc(l.lang)}</b><div class="bar"><i style="width:${i * 20}%"></i></div></div>`;
}).join("");

/* Titres de sections en anglais (offre Hyper Pro — traduction IA) */
const EN_TITLES = { "Expérience professionnelle": "Work Experience", "Expérience": "Experience", "Formation": "Education", "Profil": "Profile", "Compétences": "Skills", "Langues": "Languages", "Certifications": "Certifications", "Références": "References", "Centres d'intérêt": "Interests", "Intérêts": "Interests", "Contact": "Contact" };

function render() {
  const s = state;
  let inner = "";
  if (s.tpl === "pt") {
    /* ===== PRESTIGE (Hyper Pro) ===== */
    inner = `
    <div class="pt-head">
      ${s.photo ? `<img class="pt-ph" src="${s.photo}" alt="">` : `<div class="pt-av">${initials()}</div>`}
      <div>
        <div class="pt-name">${esc(s.name) || "Votre Nom"}</div>
        <div class="pt-role">${esc(s.role) || "Titre du poste"}</div>
        <div class="pt-ct">${contactSpans() || "✉ email · ☎ téléphone · 📍 ville"}</div>
      </div>
    </div>
    <div class="pt-body">
      <div class="pt-main">
        ${s.summary ? `<div class="prsum">${esc(s.summary)}</div>` : ""}
        ${expHTML() ? `<div class="sec"><h6>Expérience professionnelle</h6><div class="timeline">${expHTML()}</div></div>` : ""}
        ${eduHTML() ? `<div class="sec"><h6>Formation</h6><div class="timeline">${eduHTML()}</div></div>` : ""}
      </div>
      <div class="pt-rail">
        ${skillsArr().length ? `<div class="blk" style="margin-bottom:16px"><h6>Compétences</h6>${skillsArr().map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>` : ""}
        ${s.langs.some(l => l.lang) ? `<div class="blk" style="margin-bottom:16px"><h6>Langues</h6>${langBars()}</div>` : ""}
        ${certHTML() ? `<div class="blk" style="margin-bottom:16px"><h6>Certifications</h6>${certHTML()}</div>` : ""}
        ${refHTML() ? `<div class="blk" style="${intsArr().length ? "margin-bottom:16px" : ""}"><h6>Références</h6>${refHTML()}</div>` : ""}
        ${intsArr().length ? `<div class="blk"><h6>Intérêts</h6>${intsArr().map(x => `<span class="chip">${esc(x)}</span>`).join("")}</div>` : ""}
      </div>
    </div>`;
  } else if (s.tpl === "md") {
    inner = `
    <aside>
      ${s.photo ? `<img class="ph" src="${s.photo}" alt="">` : `<div class="av">${initials()}</div>`}
      <div class="blk"><h6>Contact</h6>${contactLI() || "<p>—</p>"}</div>
      ${skillsArr().length ? `<div class="blk"><h6>Compétences</h6>${skillsArr().map(x => `<div class="sk">${esc(x)}</div>`).join("")}</div>` : ""}
      ${s.langs.some(l => l.lang) ? `<div class="blk"><h6>Langues</h6>${langBarsW()}</div>` : ""}
      ${intsArr().length ? `<div class="blk"><h6>Intérêts</h6>${intsArr().map(x => `<div class="sk">${esc(x)}</div>`).join("")}</div>` : ""}
    </aside>
    <main>
      <div class="name">${esc(s.name) || "Votre Nom"}</div>
      <div class="role">${esc(s.role) || "Titre du poste"}</div>
      ${s.summary ? `<div class="sec" style="margin-top:20px"><h6>Profil</h6><div class="prof">${esc(s.summary)}</div></div>` : ""}
      ${expHTML() ? `<div class="sec"><h6>Expérience</h6><div class="tl">${expHTML()}</div></div>` : ""}
      ${eduHTML() ? `<div class="sec"><h6>Formation</h6><div class="tl">${eduHTML()}</div></div>` : ""}
    </main>`;
  } else {
    inner = `
    <div class="hd">
      <div class="name">${esc(s.name) || "Votre Nom"}</div>
      <div class="role">${esc(s.role) || "Titre du poste"}</div>
      <div class="ct">${contactSpans() || "✉ email · ☎ téléphone · 📍 ville"}</div>
      ${s.photo ? `<img src="${s.photo}" style="width:86px;height:86px;border-radius:50%;object-fit:cover;margin:12px auto 0;border:3px solid ${s.ac}">` : ""}
      <hr>
    </div>
    ${s.summary ? `<div class="sec"><h6>Profil</h6><p style="text-align:justify">${esc(s.summary)}</p></div>` : ""}
    ${expHTML() ? `<div class="sec"><h6>Expérience professionnelle</h6>${expHTML()}</div>` : ""}
    ${eduHTML() ? `<div class="sec"><h6>Formation</h6>${eduHTML()}</div>` : ""}
    ${skillsArr().length ? `<div class="sec"><h6>Compétences</h6><p>${skillsArr().map(esc).join(" · ")}</p></div>` : ""}
    ${s.langs.some(l => l.lang) ? `<div class="sec"><h6>Langues</h6><p>${s.langs.filter(l => l.lang).map(l => esc(l.lang) + " <span class='muted'>(" + esc(l.niveau) + ")</span>").join(" · ")}</p></div>` : ""}
    ${intsArr().length ? `<div class="sec"><h6>Centres d'intérêt</h6><p class="ints">${intsArr().map(esc).join(" · ")}</p></div>` : ""}`;
  }
  if ((s.lang || "fr") === "en")
    inner = inner.replace(/<h6>([^<]+)<\/h6>/g, (m, t) => `<h6>${EN_TITLES[t.trim()] || t}</h6>`);
  $("#paper").innerHTML = `<div class="cv ${s.tpl}" style="--ac:${s.ac}">${inner}</div>`;
}

/* ---------- Aperçu responsive (papier A4 = 794×1123) ---------- */
function fit() {
  const w = $("#scaler").clientWidth, sc = w / 794;
  $("#paper").style.transform = `scale(${sc})`;
  $("#scaler").style.height = 1123 * sc + "px";
}

/* ---------- Niveaux payants : pass, verrous, rappel hebdo ---------- */
const TPL_RANK = { cl: 0, md: 1, pt: 2 };
let payTier = "pro", payImg = null, payMime = "image/jpeg";
const MSGS2 = ["🤖 L'IA lit votre reçu…", "🔎 Vérification du numéro et du montant…", "📅 Contrôle de la date et de la référence…", "☕ Le serveur se réveille peut-être (~30 s)…"];

function refreshPass(silent) {
  /* 🔑 Pass propriétaire : ouvrir une fois cv/#vip=slate-maitre-2026 */
  if (location.hash.includes("vip=slate-maitre-2026")) {
    saveLS("slate_cv_pass", { tier: "hyper", until: Date.now() + 3650 * 864e5, at: new Date().toISOString(), owner: true });
    history.replaceState(null, "", location.pathname);
    setTimeout(() => toast("👑 Mode propriétaire activé — Hyper Pro à vie sur cet appareil !", 5000), 800);
  }
  const pass = loadLS("slate_cv_pass", null);
  const now = Date.now();
  let html = "";
  if (pass && pass.until > now) {
    myTier = pass.tier;
    const days = Math.ceil((pass.until - now) / 864e5);
    html = `<div class="passbox ok">${pass.tier === "hyper" ? "👑 Mode Hyper Pro" : "💼 Mode Pro"} actif — plus que <b>&nbsp;${days} jour${days > 1 ? "s" : ""}</b></div>`;
    const weeks = Math.ceil(days / 7);
    const last = loadLS("slate_cv_notice", 0);
    if (!silent && now - last > 7 * 864e5) {
      saveLS("slate_cv_notice", now);
      setTimeout(() => toast(`⏳ Rappel d'abonnement : il te reste ${weeks} semaine${weeks > 1 ? "s" : ""} (${days} jours) de mode ${pass.tier === "hyper" ? "Hyper Pro 👑" : "Pro 💼"}`, 6500), 1500);
    }
  } else if (pass) {
    myTier = "free";
    html = `<div class="passbox warn">⏰ Ton accès Pro a expiré (30 jours écoulés). Renouvelle pour garder tes modèles premium. <button class="btn btn-gold" id="renewBtn">Renouveler →</button></div>`;
  } else {
    myTier = "free";
    html = `<div class="passbox free">✨ Version <b>gratuite</b> — débloquez les modèles premium, accroches et secrets de recruteurs <button class="btn btn-slate" id="renewBtn">👑 Voir les offres</button></div>`;
  }
  // Rétrogradation douce si le modèle sauvegardé dépasse le niveau actuel
  if (TPL_RANK[state.tpl] > RANK[myTier]) state.tpl = "cl";
  $("#passBar").innerHTML = html;
  applyTier();
}

function applyTier() {
  document.body.classList.toggle("paid", myTier !== "free"); // PDF payant = zéro mention SLATE
  $$("#swatches .sw").forEach(sw => sw.classList.toggle("lock", RANK[sw.dataset.t || "free"] > RANK[myTier]));
  $$(".prolock").forEach(p => {
    const need = p.dataset.need;
    const covered = p.querySelector(":scope > .cover");
    if (RANK[need] > RANK[myTier]) {
      if (!covered) {
        const c = document.createElement("div");
        c.className = "cover";
        c.innerHTML = `<div><b>${need === "hyper" ? "👑 Hyper Pro" : "💼 Offre Pro"}</b>
          <p>Cette section fait partie de l'offre ${need === "hyper" ? "Hyper Pro — 15 000 Ar/mois" : "Pro — 5 000 Ar/mois"}.</p>
          <button class="btn btn-gold">Débloquer →</button></div>`;
        c.querySelector("button").onclick = () => openPay(need);
        p.appendChild(c);
      }
    } else if (covered) covered.remove();
  });
  /* 👑 Abonné = zéro encart sponsorisé */
  $$(".promo-mini").forEach(el => el.style.display = myTier === "free" ? "" : "none");
}

/* ---------- Modal paiement ---------- */
function openPay(t) { if (t) payTier = t; showStep1(); $("#payModal").classList.add("show"); }
function showStep1() { $("#payStep1").style.display = "block"; $("#payStep2").style.display = "none"; }
function showStep2() {
  $("#payStep1").style.display = "none"; $("#payStep2").style.display = "block";
  $("#payTitle").textContent = payTier === "hyper" ? "👑 CV Hyper Pro — 15 000 Ar / 30 jours" : "💼 CV Pro — 5 000 Ar / 30 jours";
  $("#payAmount").textContent = PRIX[payTier].toLocaleString("fr-FR") + " Ar";
  payImg = null; $("#payPrev").classList.remove("show"); $("#payPrev").removeAttribute("src");
  $("#payGo").disabled = true;
  $("#payErr").classList.remove("show"); $("#payOk").classList.remove("show"); $("#payLoad").style.display = "none";
}

function handlePayFile(file) {
  if (!file || !file.type.startsWith("image/")) { toast("Choisis une image 📷"); return; }
  const rd = new FileReader();
  rd.onload = e => {
    const im = new Image();
    im.onload = () => {
      const MAX = 1400; let w = im.width, h = im.height;
      if (Math.max(w, h) > MAX) { const k = MAX / Math.max(w, h); w = Math.round(w * k); h = Math.round(h * k); }
      const cv = document.createElement("canvas");
      cv.width = w; cv.height = h;
      cv.getContext("2d").drawImage(im, 0, 0, w, h);
      const du = cv.toDataURL("image/jpeg", 0.85);
      payImg = du.split(",")[1]; payMime = "image/jpeg";
      $("#payPrev").src = du; $("#payPrev").classList.add("show");
      $("#payGo").disabled = false;
      toast("Capture prête ✔ Lance la vérification !");
    };
    im.src = e.target.result;
  };
  rd.readAsDataURL(file);
}

async function verifier() {
  if (!payImg) return;
  $("#payErr").classList.remove("show");
  $("#payGo").disabled = true;
  $("#payLoad").style.display = "block";
  let mi = 0;
  $("#payLoadMsg").textContent = MSGS2[0];
  const mt = setInterval(() => { mi = (mi + 1) % MSGS2.length; $("#payLoadMsg").textContent = MSGS2[mi]; }, 3400);
  try {
    const r = await fetch(API_URL + "/api/verifie-paiement", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: payImg, mime: payMime })
    });
    const d = await r.json();
    clearInterval(mt);
    $("#payLoad").style.display = "none";
    if (!d.ok) {
      $("#payErr").innerHTML = "❌ " + esc(d.error || "Vérification refusée");
      $("#payErr").classList.add("show");
      $("#payGo").disabled = false;
      return;
    }
    saveLS("slate_cv_pass", { tier: d.tier, until: Date.now() + 30 * 864e5, at: new Date().toISOString() });
    myTier = d.tier;
    $("#payOk").innerHTML = `🎉 <b>Paiement validé par IA !</b><br>${d.operateur} · ${Number(d.montant).toLocaleString("fr-FR")} Ar<br>Mode <b>${d.tier === "hyper" ? "👑 Hyper Pro" : "💼 Pro"}</b> actif pendant 30 jours. Bon CV ! ✨`;
    $("#payOk").classList.add("show");
    toast("🎉 Bienvenue en mode " + (d.tier === "hyper" ? "Hyper Pro 👑" : "Pro 💼"), 5000);
    setTimeout(() => { $("#payModal").classList.remove("show"); refreshPass(true); }, 2800);
  } catch (e) {
    clearInterval(mt);
    $("#payLoad").style.display = "none";
    $("#payErr").innerHTML = "😕 Connexion impossible au serveur (il se réveille peut-être : réessaie dans 30 s) ☕";
    $("#payErr").classList.add("show");
    $("#payGo").disabled = false;
  }
}

/* ---------- Init formulaire ---------- */
function fillForm() {
  ["name", "role", "email", "phone", "city", "link", "summary", "skills", "interests"].forEach(k => $("#f-" + k).value = state[k] || "");
  $("#f-tpl").value = state.tpl;
  $$("#swatches .sw").forEach(sw => sw.classList.toggle("on", sw.dataset.c === state.ac));
  renderRows();
}

document.addEventListener("DOMContentLoaded", () => {
  /* Contenus Pro : accroches + astuces */
  $("#f-accroche").innerHTML = `<option value="">— Choisir une accroche prête à l'emploi —</option>` +
    ACCROCHES.map((a, i) => `<option value="${i}">${a.t}</option>`).join("");
  $("#tipsList").innerHTML = TIPS.map(t => `<li>${t}</li>`).join("");
  $("#f-accroche").addEventListener("change", e => {
    if (e.target.value === "") return;
    $("#f-summary").value = ACCROCHES[+e.target.value].x;
    collect(); render(); save();
    toast("Accroche insérée ✨ Adaptez-la à votre profil !");
    e.target.value = "";
  });

  /* ---------- Assistant d'inspiration (Pro/Hyper) ---------- */
  $("#f-metier").innerHTML = `<option value="">— Choisir un métier —</option>` + MISSIONS.map((m, i) => `<option value="${i}">${m.m}</option>`).join("");
  $("#f-diplome").innerHTML = `<option value="">— Choisir un diplôme —</option>` + DIPLOMES.map((d, i) => `<option value="${i}">${d.t}</option>`).join("");
  $("#f-ltr-atout").innerHTML = ATOUTS.map((a, i) => `<option value="${i}">Atout ${i + 1} — ${a.slice(0, 48)}…</option>`).join("");
  $("#insMetier").onclick = () => {
    const i = $("#f-metier").value;
    if (i === "") { toast("Choisis un métier d'abord 😊"); return; }
    collect();
    const M = MISSIONS[+i];
    state.exp.push({ poste: M.p, org: "", debut: "", fin: "", desc: M.d });
    renderRows(); render(); save();
    toast("Expérience insérée ✨ Complète l'entreprise et les dates !");
    $("#f-metier").value = "";
  };
  $("#insDiplome").onclick = () => {
    const i = $("#f-diplome").value;
    if (i === "") { toast("Choisis un diplôme d'abord 😊"); return; }
    collect();
    const D = DIPLOMES[+i];
    state.edu.push({ diplome: D.t, ecole: "", annees: "", desc: D.d });
    renderRows(); render(); save();
    toast("Formation insérée ✨ Ajoute l'établissement !");
    $("#f-diplome").value = "";
  };
  const chipAdd = (chip, fieldId, arrFn) => {
    if (RANK.pro > RANK[myTier]) { openPay("pro"); return; }
    const inp = $("#" + fieldId);
    const cur = inp.value.split(",").map(s => s.trim()).filter(Boolean);
    if (!cur.includes(chip)) cur.push(chip);
    inp.value = cur.join(", ");
    collect(); render(); save();
  };
  $("#skillChips").innerHTML = SKILLCHIPS.map(s => `<button class="schip" data-c="${s}">+ ${s}</button>`).join("");
  $$("#skillChips .schip").forEach(b => b.onclick = () => { chipAdd(b.dataset.c, "f-skills"); b.classList.add("added"); });
  $("#intChips").innerHTML = INTCHIPS.map(s => `<button class="schip" data-c="${s}">+ ${s}</button>`).join("");
  $$("#intChips .schip").forEach(b => b.onclick = () => { chipAdd(b.dataset.c, "f-interests"); b.classList.add("added"); });

  /* ---------- Générateur de lettre de motivation (Hyper) ---------- */
  let LTR_TEXT = "";
  $("#ltrGo").onclick = () => {
    if (RANK.hyper > RANK[myTier]) { openPay("hyper"); return; }
    const ton = $("#f-ltr-ton").value;
    const poste = $("#f-ltr-poste").value.trim() || "le poste proposé";
    const ent = $("#f-ltr-ent").value.trim() || "votre entreprise";
    const atout = ATOUTS[+($("#f-ltr-atout").value || 0)];
    const nom = state.name || "[Votre Nom]";
    const ville = state.city || "Antananarivo";
    const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    LTR_TEXT = LETTRES[ton](poste, ent, atout, nom, ville, date);
    $("#ltrPrev").textContent = LTR_TEXT;
    $("#ltrOut").style.display = "block";
    $("#ltrOut").scrollIntoView({ behavior: "smooth", block: "nearest" });
    toast("Lettre générée ✉️ Relis et adapte-la à ta situation !");
  };
  $("#ltrCopy").onclick = async () => {
    if (!LTR_TEXT) return;
    try { await navigator.clipboard.writeText(LTR_TEXT); toast("Lettre copiée 📋"); }
    catch { toast("Sélectionne le texte et copie-le manuellement 📋"); }
  };
  const ltrBrand = () => myTier === "free" ? `<div class="lbl">Créée avec <b>SLATE</b> · slate-vh8d.onrender.com</div>` : "";
  $("#ltrPrint2").onclick = () => {
    if (!LTR_TEXT) return;
    $("#ltrPrint").innerHTML = `<div class="ltb">${esc(LTR_TEXT).replace(/\n/g, "<br>")}</div>${ltrBrand()}`;
    document.body.classList.add("printLtr");
    window.print();
    setTimeout(() => document.body.classList.remove("printLtr"), 500);
  };
  /* Modèles du guide : boutons copier */
  $$(".copybtn").forEach(b => b.onclick = async () => {
    const pre = b.closest(".gsec").querySelector(".tpl");
    try { await navigator.clipboard.writeText(pre.textContent); toast("Modèle copié 📋"); } catch { toast("Sélectionne et copie manuellement 📋"); }
  });

  /* ---------- 🤖 Lettre IA 100 % personnalisée (Hyper) ---------- */
  const ltrAiBtn = $("#ltrAiGo");
  if (ltrAiBtn) ltrAiBtn.onclick = async () => {
    if (RANK.hyper > RANK[myTier]) { openPay("hyper"); return; }
    const offre = $("#f-ltr-ai").value.trim();
    if (offre.length < 10) { toast("Colle l'annonce du poste d'abord 📋"); return; }
    collect();
    ltrAiBtn.disabled = true; ltrAiBtn.textContent = "🤖 L'IA rédige ta lettre… (~15 s)";
    try {
      const r = await fetch(API_URL + "/api/lettre-ia", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offre, cv: { name: state.name, role: state.role, city: state.city, summary: state.summary, skills: state.skills } }) });
      const d = await r.json();
      if (!d.ok) toast("❌ " + (d.error || "Erreur IA"));
      else {
        LTR_TEXT = d.text.trim();
        $("#ltrAiPrev").textContent = LTR_TEXT;
        $("#ltrAiOut").style.display = "block";
        $("#ltrAiOut").scrollIntoView({ behavior: "smooth", block: "nearest" });
        toast("Lettre IA prête ✨ Relis-la avant de l'envoyer !");
      }
    } catch { toast("😕 Serveur en réveil (~30 s) — réessaie ☕"); }
    ltrAiBtn.disabled = false; ltrAiBtn.textContent = "🤖 Générer avec l'IA";
  };
  const ltrAiCopy = $("#ltrAiCopy");
  if (ltrAiCopy) ltrAiCopy.onclick = async () => {
    if (!LTR_TEXT) return;
    try { await navigator.clipboard.writeText(LTR_TEXT); toast("Lettre copiée 📋"); } catch { toast("Sélectionne et copie manuellement 📋"); }
  };
  const ltrAiPrint = $("#ltrAiPrint");
  if (ltrAiPrint) ltrAiPrint.onclick = () => {
    if (!LTR_TEXT) return;
    $("#ltrPrint").innerHTML = `<div class="ltb">${esc(LTR_TEXT).replace(/\n/g, "<br>")}</div>${ltrBrand()}`;
    document.body.classList.add("printLtr"); window.print();
    setTimeout(() => document.body.classList.remove("printLtr"), 500);
  };

  /* ---------- 🇬🇧 CV en anglais — traduction IA (Hyper) ---------- */
  state.lang = state.lang || "fr";
  const markEnBtn = () => {
    const b = $("#enGo"); if (!b) return;
    b.textContent = state.lang === "en" ? "🇫🇷 Revenir à la version française" : "🇬🇧 Traduire mon CV en anglais";
  };
  const enBtn = $("#enGo");
  if (enBtn) enBtn.onclick = async () => {
    if (RANK.hyper > RANK[myTier]) { openPay("hyper"); return; }
    collect();
    if (state.lang === "en") {
      const fr = loadLS("slate_cv_fr", null);
      if (fr) { const keepPhoto = state.photo, keepTpl = state.tpl, keepAc = state.ac;
        state = Object.assign({}, fr); state.photo = keepPhoto; state.tpl = keepTpl; state.ac = keepAc; }
      state.lang = "fr";
      fillForm(); renderRows(); render(); save(); markEnBtn();
      toast("CV revenu en français 🇫🇷");
      return;
    }
    if (!state.name && !state.summary) { toast("Remplis d'abord ton CV ✍️"); return; }
    enBtn.disabled = true; enBtn.textContent = "🤖 Traduction en cours… (~15 s)";
    const payload = {
      role: state.role, summary: state.summary, skills: state.skills, interests: state.interests,
      exp: state.exp.map(x => ({ poste: x.poste, desc: x.desc })),
      edu: state.edu.map(x => ({ diplome: x.diplome, desc: x.desc })),
      niveaux: state.langs.map(l => l.niveau)
    };
    try {
      const r = await fetch(API_URL + "/api/traduis-cv", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ cv: payload }) });
      const d = await r.json();
      if (!d.ok) { toast("❌ " + (d.error || "Erreur de traduction")); }
      else {
        const t = d.cv || {};
        saveLS("slate_cv_fr", JSON.parse(JSON.stringify(state)));
        if (t.role) state.role = t.role;
        if (t.summary) state.summary = t.summary;
        if (t.skills) state.skills = t.skills;
        if (t.interests) state.interests = t.interests;
        (t.exp || []).forEach((x, i) => { if (state.exp[i]) { state.exp[i].poste = x.poste || state.exp[i].poste; state.exp[i].desc = x.desc || ""; } });
        (t.edu || []).forEach((x, i) => { if (state.edu[i]) { state.edu[i].diplome = x.diplome || state.edu[i].diplome; state.edu[i].desc = x.desc || ""; } });
        (t.niveaux || []).forEach((n, i) => { if (state.langs[i]) state.langs[i].niveau = n || state.langs[i].niveau; });
        state.lang = "en";
        fillForm(); renderRows(); render(); save(); markEnBtn();
        toast("CV traduit en anglais 🇬🇧✨ Le PDF sortira 100 % anglais !");
      }
    } catch { toast("😕 Serveur en réveil (~30 s) — réessaie ☕"); }
    enBtn.disabled = false; markEnBtn();
  };
  markEnBtn();

  /* ---------- 🎤 Simulateur d'entretien IA (Hyper) ---------- */
  let entHist = [];
  const entLog = (who, txt) => {
    $("#entChat").insertAdjacentHTML("beforeend", `<div class="bub ${who}">${esc(txt).replace(/\n/g, "<br>")}</div>`);
    $("#entChat").scrollTop = $("#entChat").scrollHeight;
  };
  const entAsk = async () => {
    $("#entLoad").style.display = "block"; $("#entSend").disabled = true;
    try {
      const r = await fetch(API_URL + "/api/entretien-ia", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poste: state.role || "employé polyvalent", history: entHist }) });
      const d = await r.json();
      $("#entLoad").style.display = "none"; $("#entSend").disabled = false;
      if (!d.ok) { entLog("sys", "❌ " + (d.error || "Erreur IA — renvoie ta réponse.")); return; }
      entLog("ai", d.text.trim());
      entHist.push({ role: "q", t: d.text.trim() });
      if (d.termine) $("#entInputRow").style.display = "none";
      else $("#entInput").focus();
    } catch { $("#entLoad").style.display = "none"; $("#entSend").disabled = false; entLog("sys", "😕 Serveur en réveil (~30 s) — renvoie ta réponse ☕"); }
  };
  const entOpen = $("#entGo");
  if (entOpen) entOpen.onclick = () => {
    if (RANK.hyper > RANK[myTier]) { openPay("hyper"); return; }
    collect();
    entHist = [];
    $("#entChat").innerHTML = ""; $("#entInput").value = "";
    $("#entInputRow").style.display = "flex";
    $("#entPosteName").textContent = state.role || "votre poste";
    $("#entModal").classList.add("show");
    entAsk();
  };
  $("#entClose").onclick = () => $("#entModal").classList.remove("show");
  $("#entModal").addEventListener("click", e => { if (e.target.id === "entModal") $("#entModal").classList.remove("show"); });
  const entSendF = () => {
    const v = $("#entInput").value.trim(); if (!v || $("#entSend").disabled) return;
    entLog("me", v); entHist.push({ role: "a", t: v });
    $("#entInput").value = "";
    entAsk();
  };
  $("#entSend").onclick = entSendF;
  $("#entInput").addEventListener("keydown", e => { if (e.key === "Enter") entSendF(); });

  refreshPass(); fillForm(); render(); fit();
  window.addEventListener("resize", fit);

  /* ---------- Éditeur guidé : étapes ---------- */
  const STEPS = [
    { i: "👤", t: "Identité" }, { i: "🎨", t: "Modèle & style" }, { i: "💼", t: "Expérience" },
    { i: "🎓", t: "Formation" }, { i: "⚡", t: "Compétences" }, { i: "👑", t: "Bonus Pro" }
  ];
  let curStep = 0;
  function goStep(n) {
    curStep = Math.max(0, Math.min(STEPS.length - 1, n));
    $$(".form-col [data-step]").forEach(el => el.classList.toggle("on", +el.dataset.step === curStep));
    $("#stepper").innerHTML = STEPS.map((s, k) =>
      `<button class="stc ${k === curStep ? "on" : k < curStep ? "done" : ""}" data-k="${k}"><span class="n">${k < curStep ? "✓" : k + 1}</span>${s.i} ${s.t}</button>`).join("");
    $$("#stepper .stc").forEach(b => b.onclick = () => goStep(+b.dataset.k));
    $("#stepLbl").textContent = (curStep + 1) + " / " + STEPS.length;
    $("#prevStep").style.visibility = curStep === 0 ? "hidden" : "visible";
    $("#nextStep").textContent = curStep === STEPS.length - 1 ? "Terminer ✔" : "Continuer →";
    applyTier();
    setTimeout(fit, 30);
    const wsTop = $("#ws").getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: wsTop, behavior: "smooth" });
  }
  goStep(0);
  $("#prevStep").onclick = () => goStep(curStep - 1);
  $("#nextStep").onclick = () => {
    if (curStep < STEPS.length - 1) { goStep(curStep + 1); return; }
    toast("🎉 CV prêt ! Clique sur « Télécharger en PDF » en haut 📄", 5000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- Vignettes de modèles ---------- */
  function markTpl() {
    $$("#tplGrid .tcard").forEach(c => {
      c.classList.toggle("on", c.dataset.tpl === state.tpl);
      c.classList.toggle("lock", RANK[c.dataset.t] > RANK[myTier]);
    });
  }
  $$("#tplGrid .tcard").forEach(c => c.onclick = () => {
    if (RANK[c.dataset.t] > RANK[myTier]) {
      toast("🔒 Ce modèle est réservé à l'offre " + (c.dataset.t === "hyper" ? "Hyper Pro 👑" : "Pro 💼"));
      openPay(c.dataset.t);
      return;
    }
    state.tpl = c.dataset.tpl;
    $("#f-tpl").value = state.tpl;
    markTpl(); render(); save();
    toast("Modèle « " + { cl: "Classique", md: "Moderne ✨", pt: "Prestige 👑" }[c.dataset.tpl] + " » appliqué !");
  });
  markTpl();

  /* ---------- Zone photo ---------- */
  const setPhCirc = () => { $("#phCirc").innerHTML = state.photo ? `<img src="${state.photo}" alt="Photo">` : "📷"; };
  setPhCirc();
  $("#phCirc").onclick = () => $("#f-photo").click();
  const _origPhotoHandler = null;

  /* Modal paiement */
  $("#proBtn").onclick = () => openPay();
  $("#payClose").onclick = () => $("#payModal").classList.remove("show");
  $("#payBack").onclick = showStep1;
  $("#payModal").addEventListener("click", e => { if (e.target.id === "payModal") $("#payModal").classList.remove("show"); });
  $$(".offer").forEach(o => o.onclick = () => { payTier = o.dataset.tier; showStep2(); });
  $$(".paynum .cp").forEach(b => b.onclick = async () => {
    try { await navigator.clipboard.writeText(b.dataset.n); } catch {}
    b.textContent = "Copié ✔"; setTimeout(() => b.textContent = "Copier", 1500);
  });
  $("#payZone").onclick = () => $("#payFile").click();
  $("#payFile").onchange = e => handlePayFile(e.target.files[0]);
  $("#payGo").onclick = verifier;

  /* Garde du sélecteur de modèle */
  $("#f-tpl").addEventListener("change", e => {
    const opt = e.target.selectedOptions[0];
    const need = RANK[opt.dataset.t || "free"];
    if (need > RANK[myTier]) {
      toast("🔒 Ce modèle est réservé à l'offre " + (opt.dataset.t === "hyper" ? "Hyper Pro 👑" : "Pro 💼"));
      openPay(opt.dataset.t);
      e.target.value = state.tpl = "cl";
      render(); save();
    }
  });

  $(".form-col").addEventListener("input", () => { collect(); render(); save(); });
  $(".form-col").addEventListener("change", () => { collect(); render(); save(); });

  $("#addExp").onclick  = () => { collect(); state.exp.push({ poste: "", org: "", debut: "", fin: "", desc: "" }); renderRows(); save(); };
  $("#addEdu").onclick  = () => { collect(); state.edu.push({ diplome: "", ecole: "", annees: "", desc: "" }); renderRows(); save(); };
  $("#addLang").onclick = () => { collect(); state.langs.push({ lang: "", niveau: "Courant" }); renderRows(); save(); };
  const addCert = document.getElementById("addCert"); if (addCert) addCert.onclick = () => { collect(); state.certs.push({ nom: "", org: "", annees: "" }); renderRows(); save(); };
  const addRef = document.getElementById("addRef"); if (addRef) addRef.onclick = () => { collect(); state.refs.push({ nom: "", poste: "", contact: "" }); renderRows(); save(); };

  $(".form-col").addEventListener("click", e => {
    const del = e.target.closest(".del"); if (!del) return;
    const row = del.closest(".row-item"); collect();
    state[row.dataset.k].splice(+row.dataset.i, 1);
    renderRows(); render(); save();
  });

  $("#swatches").addEventListener("click", e => {
    const sw = e.target.closest(".sw"); if (!sw) return;
    if (RANK[sw.dataset.t || "free"] > RANK[myTier]) {
      toast("🔒 Cette couleur est réservée à l'offre " + (sw.dataset.t === "hyper" ? "Hyper Pro 👑" : "Pro 💼"));
      openPay(sw.dataset.t);
      return;
    }
    state.ac = sw.dataset.c;
    $$("#swatches .sw").forEach(x => x.classList.toggle("on", x === sw));
    render(); save();
  });

  $("#f-photo").addEventListener("change", e => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      const done = data => {
        state.photo = data;
        $("#phCirc").innerHTML = `<img src="${data}" alt="Photo">`;
        render(); save();
      };
      if (RANK[myTier] >= RANK.pro) {
        /* 📸 Retouche auto pro (offre Pro & Hyper) : contraste + lumière + netteté */
        const im = new Image();
        im.onload = () => {
          const c = document.createElement("canvas");
          const MAX = 900; let w = im.width, h = im.height;
          if (Math.max(w, h) > MAX) { const k = MAX / Math.max(w, h); w = Math.round(w * k); h = Math.round(h * k); }
          c.width = w; c.height = h;
          const ctx = c.getContext("2d");
          try { ctx.filter = "contrast(1.1) saturate(1.12) brightness(1.05)"; } catch {}
          ctx.drawImage(im, 0, 0, w, h);
          done(c.toDataURL("image/jpeg", 0.88));
          toast("Photo ajoutée + retouche pro appliquée 📸✨");
        };
        im.onerror = () => { done(r.result); toast("Photo ajoutée ✨"); };
        im.src = r.result;
      } else { done(r.result); toast("Photo ajoutée ✨ (retouche auto incluse dans l'offre Pro 💼)"); }
    };
    r.readAsDataURL(f);
  });

  $("#resetBtn").onclick = () => {
    if (!confirm("Effacer toutes les informations du CV ?")) return;
    localStorage.removeItem(KEY); location.reload();
  };
  $("#pdfBtn").onclick = () => { toast("Choisissez « Enregistrer au format PDF » dans la fenêtre d'impression 📄"); setTimeout(() => window.print(), 600); };

  /* Onglets mobile Éditer / Aperçu */
  $("#seg").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    $$("#seg button").forEach(x => x.classList.toggle("on", x === b));
    $("#ws").classList.toggle("showP", b.dataset.t === "view");
    setTimeout(fit, 30);
  });
});
