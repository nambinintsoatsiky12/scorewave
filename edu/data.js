/* ===== EduPrep · Banque de sujets (3ème, 1ère, Terminale) ===== */
window.SUBJECTS = [
  /* ================= 3ème (préparation BEPC) ================= */
  {
    id: "math-3e", matiere: "Maths", niveau: "3ème", icon: "📐", minutes: 10,
    titre: "Calcul, équations & géométrie",
    qs: [
      { q: "Développe : (x + 3)(x − 2)",
        c: ["x² + x − 6", "x² − x − 6", "x² + 5x − 6", "x² − 5x + 6"], a: 0,
        e: "(x+3)(x−2) = x² − 2x + 3x − 6. On regroupe : −2x + 3x = +x. Résultat : x² + x − 6." },
      { q: "Résous l'équation : 3x − 7 = 11",
        c: ["x = 5", "x = 6", "x = 4", "x = 18"], a: 1,
        e: "On isole x : 3x = 11 + 7 = 18, puis x = 18 ÷ 3 = 6." },
      { q: "Les droites (MN) et (BC) sont parallèles. AM = 4, AB = 10, AC = 15. Thalès : AN = ?",
        c: ["4", "5", "6", "7,5"], a: 2,
        e: "Théorème de Thalès : AM/AB = AN/AC → AN = (4 × 15) / 10 = 60 / 10 = 6." },
      { q: "Triangle rectangle : hypoténuse 13 cm, un côté 5 cm. L'autre côté mesure :",
        c: ["8 cm", "10 cm", "12 cm", "9 cm"], a: 2,
        e: "Pythagore : c² = 13² − 5² = 169 − 25 = 144, donc c = √144 = 12 cm." },
      { q: "Simplifie la fraction 36/48.",
        c: ["2/3", "3/4", "4/5", "5/6"], a: 1,
        e: "PGCD(36 ; 48) = 12. On divise en haut et en bas par 12 : 36/48 = 3/4." }
    ]
  },
  {
    id: "fr-3e", matiere: "Français", niveau: "3ème", icon: "📖", minutes: 8,
    titre: "Grammaire & conjugaison",
    qs: [
      { q: "Conjugue : « nous (chanter) » à l'imparfait.",
        c: ["nous chantions", "nous chantons", "nous chanterons", "nous chantâmes"], a: 0,
        e: "Imparfait : radical du présent + terminaisons -ais, -ais, -ait, -ions, -iez, -aient. → nous chantions." },
      { q: "Dans « Marie mange une pomme », le complément d'objet direct (COD) est :",
        c: ["Marie", "mange", "une pomme", "une"], a: 2,
        e: "Le COD répond à la question « Marie mange QUOI ? » → « une pomme »." },
      { q: "Quelle phrase au passé composé est correcte ?",
        c: ["Elles sont allées au marché", "Elles ont allées au marché", "Elles est allée au marché", "Elles sont aller au marché"], a: 0,
        e: "Avec l'auxiliaire « être », le participe passé s'accorde avec le sujet : « Elles » (féminin pluriel) → allées." },
      { q: "Quelle est la nature du mot « maison » ?",
        c: ["Un adjectif", "Un nom commun", "Un verbe", "Une préposition"], a: 1,
        e: "« Maison » désigne une chose, on peut mettre un déterminant devant (la maison) : c'est un nom commun." },
      { q: "Quel mot appartient au champ lexical de la maladie ?",
        c: ["chanter", "médecin", "rapide", "fenêtre"], a: 1,
        e: "Le champ lexical regroupe les mots d'un même thème : médecin, hôpital, fièvre… → médecin." }
    ]
  },
  {
    id: "svt-3e", matiere: "SVT", niveau: "3ème", icon: "🌿", minutes: 8,
    titre: "Le corps humain & la Terre",
    qs: [
      { q: "Quel organe pompe le sang dans tout le corps ?",
        c: ["Le poumon", "Le foie", "Le cœur", "Le rein"], a: 2,
        e: "Le cœur est un muscle qui se contracte sans arrêt pour propulser le sang dans les vaisseaux." },
      { q: "Quelles cellules du sang défendent l'organisme contre les microbes ?",
        c: ["Les globules blancs", "Les globules rouges", "Les plaquettes", "Les neurones"], a: 0,
        e: "Les globules blancs détruisent les microbes (anticorps, phagocytose). Les rouges transportent l'oxygène." },
      { q: "Comment s'appelle la roche en fusion EN PROFONDEUR sous un volcan ?",
        c: ["Le magma", "La lave", "Le sable", "Le charbon"], a: 0,
        e: "En profondeur → magma. Quand il sort en surface, on parle de lave." },
      { q: "Le point en profondeur où naît un séisme s'appelle :",
        c: ["L'épicentre", "Le foyer", "Le cratère", "La faille"], a: 1,
        e: "Le foyer (hypocentre) est en profondeur. L'épicentre est le point de la surface situé juste au-dessus." },
      { q: "Quel gaz les plantes vertes rejettent-elles grâce à la photosynthèse ?",
        c: ["Le dioxyde de carbone (CO₂)", "Le dioxygène (O₂)", "L'azote", "Le méthane"], a: 1,
        e: "Photosynthèse : la plante utilise CO₂ + eau + lumière et rejette du dioxygène O₂." }
    ]
  },
  {
    id: "hg-3e", matiere: "Histoire-Géo", niveau: "3ème", icon: "🌍", minutes: 8,
    titre: "Madagascar & le monde",
    qs: [
      { q: "Quelle est la capitale de Madagascar ?",
        c: ["Toamasina", "Antananarivo", "Mahajanga", "Fianarantsoa"], a: 1,
        e: "Antananarivo (« la ville des Mille ») est la capitale politique et économique du pays." },
      { q: "Quelle étendue d'eau sépare Madagascar du continent africain ?",
        c: ["La mer Rouge", "Le canal du Mozambique", "Le golfe de Guinée", "La mer Méditerranée"], a: 1,
        e: "Le canal du Mozambique, large d'environ 400 km, sépare l'île du Mozambique." },
      { q: "Par quel océan Madagascar est-elle bordée à l'est ?",
        c: ["L'océan Atlantique", "L'océan Pacifique", "L'océan Indien", "L'océan Arctique"], a: 2,
        e: "Madagascar est une île de l'océan Indien, au sud-est de l'Afrique." },
      { q: "Quel produit agricole célèbre est l'une des premières exportations de Madagascar ?",
        c: ["Le safran", "La vanille", "Le poivre noir", "La cannelle"], a: 1,
        e: "Madagascar fournit la majorité de la vanille mondiale, surtout dans la région de la SAVA." },
      { q: "Madagascar est…",
        c: ["un pays enclavé (sans littoral)", "la 4e plus grande île du monde", "un continent", "une presqu'île"], a: 1,
        e: "Avec ~587 000 km², Madagascar est la 4e plus grande île du monde (après Groenland, Nouvelle-Guinée, Bornéo)." }
    ]
  },

  /* ================= 1ère ================= */
  {
    id: "math-1e", matiere: "Maths", niveau: "1ère", icon: "📐", minutes: 10,
    titre: "Second degré, vecteurs & suites",
    qs: [
      { q: "Pour l'équation x² − 5x + 6 = 0, le discriminant Δ vaut :",
        c: ["1", "25", "−1", "11"], a: 0,
        e: "Δ = b² − 4ac = (−5)² − 4×1×6 = 25 − 24 = 1. Δ > 0 → deux solutions : x = 2 et x = 3." },
      { q: "Que vaut la dérivée de f(x) = x³ ?",
        c: ["x²", "3x²", "x³/3", "3x"], a: 1,
        e: "Formule : la dérivée de xⁿ est n·xⁿ⁻¹. Ici n = 3 → 3x²." },
      { q: "A(1 ; 2) et B(4 ; 6). Les coordonnées du vecteur AB sont :",
        c: ["(5 ; 8)", "(3 ; 4)", "(−3 ; −4)", "(2 ; 3)"], a: 1,
        e: "Vecteur AB = (xB − xA ; yB − yA) = (4 − 1 ; 6 − 2) = (3 ; 4)." },
      { q: "Suite géométrique : u₀ = 2, raison q = 3. Que vaut u₃ ?",
        c: ["18", "54", "27", "36"], a: 1,
        e: "uₙ = u₀ × qⁿ → u₃ = 2 × 3³ = 2 × 27 = 54." },
      { q: "cos(π/3), c'est-à-dire cos(60°), vaut :",
        c: ["√3/2", "1/2", "√2/2", "1"], a: 1,
        e: "À connaître par cœur : cos 60° = 1/2 et sin 60° = √3/2." }
    ]
  },
  {
    id: "phy-1e", matiere: "Physique", niveau: "1ère", icon: "⚡", minutes: 10,
    titre: "Mécanique & électricité",
    qs: [
      { q: "Le poids d'un objet de 5 kg (on prend g ≈ 10 N/kg) vaut :",
        c: ["5 N", "15 N", "50 N", "0,5 N"], a: 2,
        e: "P = m × g = 5 × 10 = 50 newtons. Attention : le poids est une force (N), la masse est en kg." },
      { q: "Un mobile parcourt 100 m en 20 s à vitesse constante. Sa vitesse vaut :",
        c: ["2 000 m/s", "0,2 m/s", "5 m/s", "20 m/s"], a: 2,
        e: "v = d / t = 100 / 20 = 5 m/s." },
      { q: "Deux résistances R₁ = 3 Ω et R₂ = 7 Ω sont branchées en série. Résistance équivalente :",
        c: ["4 Ω", "10 Ω", "21 Ω", "2,1 Ω"], a: 1,
        e: "En série, les résistances s'additionnent : R = R₁ + R₂ = 3 + 7 = 10 Ω." },
      { q: "Un appareil alimenté sous U = 220 V est traversé par I = 2 A. Sa puissance P vaut :",
        c: ["110 W", "222 W", "440 W", "218 W"], a: 2,
        e: "P = U × I = 220 × 2 = 440 watts." },
      { q: "Un rayon lumineux arrive sur un miroir avec un angle d'incidence de 30°. L'angle de réflexion vaut :",
        c: ["60°", "15°", "30°", "90°"], a: 2,
        e: "2e loi de la réflexion : l'angle de réflexion est égal à l'angle d'incidence → 30°." }
    ]
  },
  {
    id: "fr-1e", matiere: "Français", niveau: "1ère", icon: "📖", minutes: 8,
    titre: "Figures de style & analyse de texte",
    qs: [
      { q: "« Cet homme est un lion. » Quelle figure de style est employée ?",
        c: ["Une comparaison", "Une métaphore", "Une personnification", "Une hyperbole"], a: 1,
        e: "Métaphore : on assimile deux réalités SANS outil de comparaison. Avec « comme », ce serait une comparaison." },
      { q: "« Il court, il franchit la rivière, il escalade la montagne » : cette progression croissante est :",
        c: ["une énumération", "une gradation", "une antithèse", "un pléonasme"], a: 1,
        e: "La gradation aligne des termes de plus en plus forts. L'énumération, elle, se contente d'énumérer." },
      { q: "Dans une tragédie classique, le spectateur doit surtout éprouver :",
        c: ["le rire", "la pitié et la terreur", "l'ennui", "la nostalgie"], a: 1,
        e: "C'est la catharsis : la tragédie « purge les passions » en provoquant pitié et terreur." },
      { q: "Un récit à la première personne se reconnaît à :",
        c: ["l'emploi de « il »", "l'emploi de « je »", "l'absence de dialogues", "l'emploi du passé simple"], a: 1,
        e: "Le narrateur dit « je » : c'est un personnage de l'histoire qui raconte (narrateur interne)." },
      { q: "La structure attendue d'une dissertation est :",
        c: ["titre, résumé, poème", "introduction, développement, conclusion", "acte I, acte II, acte III", "début, milieu, suspense"], a: 1,
        e: "Introduction (sujet amené + problématique + plan), développement (2-3 parties), conclusion (bilan + ouverture)." }
    ]
  },

  /* ================= Terminale (préparation BAC) ================= */
  {
    id: "math-t", matiere: "Maths", niveau: "Terminale", icon: "📐", minutes: 10,
    titre: "Suites, dérivées & probabilités",
    qs: [
      { q: "Soit f(x) = 3x² − 2x + 1. Que vaut f′(x) ?",
        c: ["6x − 2", "3x − 2", "6x + 2", "3x² − 2"], a: 0,
        e: "On dérive terme par terme : (3x²)′ = 6x, (−2x)′ = −2, (1)′ = 0. Donc f′(x) = 6x − 2." },
      { q: "Une suite arithmétique (uₙ) a pour premier terme u₁ = 5 et pour raison r = 3. Que vaut u₁₀ ?",
        c: ["35", "32", "30", "50"], a: 1,
        e: "uₙ = u₁ + (n−1)×r → u₁₀ = 5 + 9×3 = 5 + 27 = 32." },
      { q: "Deux événements indépendants A et B : P(A) = 0,3 et P(B) = 0,5. P(A ∩ B) vaut :",
        c: ["0,8", "0,15", "0,2", "0,35"], a: 1,
        e: "Indépendance → on multiplie : 0,3 × 0,5 = 0,15." },
      { q: "Limite de (2x + 1) / (x − 3) quand x tend vers +∞ :",
        c: ["+∞", "0", "2", "1/3"], a: 2,
        e: "Aux infinis, on garde les termes dominants : 2x / x = 2." },
      { q: "Que vaut ∫₀¹ 2x dx ?",
        c: ["2", "1", "0,5", "1,5"], a: 1,
        e: "Primitive : x². [x²]₀¹ = 1 − 0 = 1." }
    ]
  },
  {
    id: "phy-t", matiere: "Physique", niveau: "Terminale", icon: "⚡", minutes: 10,
    titre: "Énergie, électricité & optique",
    qs: [
      { q: "Un objet de masse m = 2 kg se déplace à v = 10 m/s. Son énergie cinétique vaut :",
        c: ["20 J", "100 J", "200 J", "40 J"], a: 1,
        e: "Ec = ½mv² = ½ × 2 × 100 = 100 joules." },
      { q: "Un résistor R = 4 Ω est soumis à U = 12 V. Quelle intensité I le traverse ?",
        c: ["48 A", "0,33 A", "3 A", "8 A"], a: 2,
        e: "Loi d'Ohm : I = U / R = 12 / 4 = 3 ampères." },
      { q: "Une force F = 50 N déplace un objet de 4 m dans sa direction. Son travail vaut :",
        c: ["12,5 J", "54 J", "200 J", "100 J"], a: 2,
        e: "W = F × d = 50 × 4 = 200 joules." },
      { q: "Un phénomène périodique a une période T = 0,5 s. Sa fréquence vaut :",
        c: ["0,5 Hz", "2 Hz", "5 Hz", "1 Hz"], a: 1,
        e: "f = 1/T = 1/0,5 = 2 hertz." },
      { q: "Une lentille a une vergence C = 5 δ. Sa distance focale f vaut :",
        c: ["5 m", "0,2 m", "50 cm", "2 m"], a: 1,
        e: "f = 1/C = 1/5 = 0,2 m = 20 cm." }
    ]
  },
  {
    id: "philo-t", matiere: "Philosophie", niveau: "Terminale", icon: "🤔", minutes: 8,
    titre: "Les grandes notions du BAC",
    qs: [
      { q: "« Je pense, donc je suis » est une affirmation de :",
        c: ["Platon", "Descartes", "Kant", "Nietzsche"], a: 1,
        e: "Descartes trouve dans le doute une première certitude : puisque je doute, je pense ; puisque je pense, j'existe." },
      { q: "Pour Kant, agir moralement, c'est suivre :",
        c: ["le plaisir", "l'impératif catégorique", "l'instinct", "la mode"], a: 1,
        e: "Impératif catégorique : « Agis comme si la maxime de ton action devait devenir une loi universelle »." },
      { q: "Pour Sartre, l'homme est :",
        c: ["déterminé par son passé", "« condamné à être libre »", "guidé par les dieux", "irresponsable de ses actes"], a: 1,
        e: "Pour Sartre, il n'y a pas de nature humaine fixée d'avance : nous sommes responsables de ce que nous faisons de nous." },
      { q: "Pour Épicure, le bonheur consiste en :",
        c: ["la richesse", "la gloire", "l'absence de troubles (ataraxie)", "le pouvoir"], a: 2,
        e: "Épicure conseille les plaisirs simples et l'absence de troubles de l'âme (ataraxie) et du corps (aponie)." },
      { q: "Qu'est-ce qu'un syllogisme ?",
        c: ["Une figure de style", "Un raisonnement : 2 prémisses puis une conclusion", "Une erreur de logique", "Une question sans réponse"], a: 1,
        e: "Exemple fameux : « Tous les hommes sont mortels (prémisse 1), Socrate est un homme (prémisse 2), donc Socrate est mortel (conclusion) »." }
    ]
  },
  {
    id: "svt-t", matiere: "SVT", niveau: "Terminale", icon: "🌿", minutes: 8,
    titre: "Génétique & géologie",
    qs: [
      { q: "Quelle molécule porte l'information génétique ?",
        c: ["L'ARN", "L'ADN", "Les protéines", "Le glucose"], a: 1,
        e: "L'ADN contient les gènes : c'est le support de l'hérédité, présent dans le noyau des cellules." },
      { q: "Le noyau d'une cellule humaine contient normalement :",
        c: ["23 chromosomes", "44 chromosomes", "46 chromosomes", "48 chromosomes"], a: 2,
        e: "46 chromosomes = 23 paires : 23 viennent du père, 23 de la mère." },
      { q: "La méiose produit :",
        c: ["2 cellules identiques", "4 cellules haploïdes (23 chromosomes)", "des organes", "du sang"], a: 1,
        e: "La méiose forme les gamètes : 4 cellules à 23 chromosomes (haploïdes), toutes différentes." },
      { q: "Selon la tectonique des plaques :",
        c: ["les continents sont fixes", "la lithosphère est découpée en plaques qui se déplacent", "les volcans n'ont aucun lien avec les plaques", "la Terre a cessé d'évoluer"], a: 1,
        e: "La lithosphère est fragmentée en plaques rigides qui dérivent de quelques cm/an, d'où séismes et volcans à leurs limites." },
      { q: "La photosynthèse se déroule dans :",
        c: ["la mitochondrie", "le chloroplaste", "le noyau", "le ribosome"], a: 1,
        e: "Le chloroplaste contient la chlorophylle qui capte la lumière. (La mitochondrie, elle, réalise la respiration cellulaire.)" }
    ]
  }
];
