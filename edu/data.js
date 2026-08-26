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
  },

  /* ================= Encore plus de matières ================= */
  {
    id: "pc-3e", matiere: "Physique-Chimie", niveau: "3ème", icon: "⚗️", minutes: 8,
    titre: "Atomes, molécules & circuits",
    qs: [
      { q: "La formule chimique de l'eau est :",
        c: ["H₂O", "CO₂", "O₂", "NaCl"], a: 0,
        e: "Une molécule d'eau = 2 atomes d'hydrogène + 1 atome d'oxygène → H₂O." },
      { q: "L'unité de la tension électrique est :",
        c: ["l'ampère (A)", "le volt (V)", "le watt (W)", "l'ohm (Ω)"], a: 1,
        e: "Tension → volt (V). Intensité → ampère (A). Résistance → ohm (Ω)." },
      { q: "Le poids d'un objet est :",
        c: ["une masse en kg", "une force en newtons", "une énergie en joules", "une tension en volts"], a: 1,
        e: "Le poids est la force d'attraction de la Terre : il se mesure en newtons (P = m × g)." },
      { q: "Quel métal est attiré par un aimant ?",
        c: ["le cuivre", "l'aluminium", "le fer", "le zinc"], a: 2,
        e: "Le fer (et l'acier) est attiré par l'aimant. Cuivre, aluminium et zinc ne le sont pas." },
      { q: "Le noyau d'un atome contient :",
        c: ["uniquement des électrons", "des protons et des neutrons", "uniquement des protons", "des molécules"], a: 1,
        e: "Le noyau = protons + neutrons. Les électrons, eux, tournent autour." }
    ]
  },
  {
    id: "ang-3e", matiere: "Anglais", niveau: "3ème", icon: "🇬🇧", minutes: 8,
    titre: "English basics — BEPC",
    qs: [
      { q: "Choose the correct sentence :",
        c: ["She go to school every day", "She goes to school every day", "She going to school", "She gone to school"], a: 1,
        e: "Au présent simple avec he/she/it, le verbe prend un -s : she goes." },
      { q: "Traduis : « un chat noir »",
        c: ["a black cat", "a cat black", "an black cat", "the cat black"], a: 0,
        e: "En anglais, l'adjectif se place AVANT le nom : a black cat (ordre inversé par rapport au français !)." },
      { q: "What is the past of « eat » ?",
        c: ["eated", "ate", "eats", "eaten"], a: 1,
        e: "Eat est un verbe irrégulier : eat → ate → eaten." },
      { q: "___ are you ? — I'm fine, thanks !",
        c: ["What", "Who", "How", "Where"], a: 2,
        e: "How are you = Comment vas-tu ? What = quoi, Who = qui, Where = où." },
      { q: "Choose : They ___ TV at the moment.",
        c: ["watch", "are watching", "watches", "watched"], a: 1,
        e: "« At the moment » (en ce moment) → present continuous : be + verbe-ing → are watching." }
    ]
  },
  {
    id: "mg-3e", matiere: "Malagasy", niveau: "3ème", icon: "💬", minutes: 8,
    titre: "Fiteny & ohabolana",
    qs: [
      { q: "Amin'ny fehezanteny « Mihira ny ankizy », inona no matoanteny ?",
        c: ["Mihira", "ny", "ankizy", "tsy misy"], a: 0,
        e: "Ny matoanteny dia ny teny maneho asa na fihetseham-po : eto hoe « Mihira »." },
      { q: "Ny teny hoe « tsara » dia :",
        c: ["anarana", "matoanteny", "mpamaritra", "tambajotra"], a: 2,
        e: "« Tsara » dia manoritsoritra ny zavatra na olona iray → mpamaritra (adjectif)." },
      { q: "Amin'ny fehezanteny « Mihinana vary i Koto », iza no tompon'oratra (sujet) ?",
        c: ["Mihinana", "vary", "i Koto", "tsy misy"], a: 2,
        e: "Amin'ny fiteny malagasy, ny tompon'oratra dia eo an-tsofam-pihezanteny matetika — tsy toy ny amin'ny frantsay !" },
      { q: "Inona ny dikan'ny ohabolana hoe « Tsy misy tsy voavadika fa ny maty » ?",
        c: ["Tsy misy vahaolana na inona na inona", "Ny olana rehetra dia manana vahaolana, afa-tsy ny fahafatesana", "Ny maty dia tsy olona", "Tsy mila mikatsaka vahaolana mihitsy"], a: 1,
        e: "Ity ohabolana ity dia mampahatsiahy fa ny olana rehetra azo vahana, ka tsy tokony kivy na aiza na aiza." },
      { q: "Ny hoe « fa » amin'ny fehezanteny « Mandeha aho fa marary izy » dia :",
        c: ["matoanteny", "mpamaritra", "tambajotra", "anarana"], a: 2,
        e: "« Fa » dia mampitohy fehezanteny roa → tambajotra (conjonction)." }
    ]
  },
  {
    id: "svt-1e", matiere: "SVT", niveau: "1ère", icon: "🌿", minutes: 8,
    titre: "Cellules, neurones & nutrition",
    qs: [
      { q: "L'unité fonctionnelle du système nerveux est :",
        c: ["le muscle", "le neurone", "l'os", "le globule rouge"], a: 1,
        e: "Le neurone reçoit, transmet et traite l'information nerveuse (message nerveux)." },
      { q: "La mitose permet :",
        c: ["de fabriquer les gamètes", "la multiplication des cellules (2 cellules identiques)", "la digestion", "la photosynthèse"], a: 1,
        e: "Mitose : 1 cellule mère → 2 cellules filles identiques (croissance, renouvellement). À ne pas confondre avec la méiose !" },
      { q: "Les protéines sont constituées de :",
        c: ["sucres", "acides aminés", "vitamines", "graisses"], a: 1,
        e: "Les protéines sont de longues chaînes d'acides aminés (viande, œufs, voanjo…)." },
      { q: "Quel est le rôle des racines chez une plante ?",
        c: ["capter la lumière", "absorber l'eau et les sels minéraux", "fabriquer les graines", "rejeter l'oxygène"], a: 1,
        e: "Les racines fixent la plante et absorbent l'eau + sels minéraux qui montent vers les feuilles." },
      { q: "La digestion des aliments commence dans :",
        c: ["l'estomac", "l'intestin", "la bouche", "l'œsophage"], a: 2,
        e: "Dès la bouche : mastication + salive (enzymes) commencent la digestion des glucides." }
    ]
  },
  {
    id: "hg-1e", matiere: "Histoire-Géo", niveau: "1ère", icon: "🌍", minutes: 8,
    titre: "Histoire de Madagascar & mondialisation",
    qs: [
      { q: "Quel royaume dominait les Hautes Terres de Madagascar au XIXe siècle ?",
        c: ["Le royaume Sakalava", "Le royaume Merina (Imerina)", "Le royaume Betsimisaraka", "Le royaume Antakarana"], a: 1,
        e: "Le royaume Merina, avec Antananarivo pour capitale (Rova), a unifié une grande partie de l'île." },
      { q: "Madagascar devient officiellement colonie française en :",
        c: ["1885", "1896", "1945", "1960"], a: 1,
        e: "En 1896, le Parlement français vote l'annexion ; la reine Ranavalona III est exilée." },
      { q: "La reine Ranavalona Ire reste célèbre pour :",
        c: ["avoir vendu l'île", "sa résistance à l'influence étrangère", "avoir fondé l'ONU", "son invention de l'écriture latine"], a: 1,
        e: "Ranavalona Ire a cherché à limiter l'influence européenne pour préserver l'indépendance du royaume." },
      { q: "La mondialisation, c'est :",
        c: ["l'isolement des pays", "l'interconnexion croissante des économies et des cultures", "une guerre mondiale", "un régime politique"], a: 1,
        e: "Échanges, communications, transport : le monde fonctionne de plus en plus comme un réseau unique." },
      { q: "Dans quelles structures cultive-t-on surtout le riz sur les Hauts Plateaux ?",
        c: ["dans les déserts", "dans les rizières en terrasses", "dans les forêts", "dans les lagunes"], a: 1,
        e: "Les rizières en terrasses, irriguées, dominent les paysages des Hautes Terres." }
    ]
  },
  {
    id: "ang-1e", matiere: "Anglais", niveau: "1ère", icon: "🇬🇧", minutes: 8,
    titre: "Tenses & relatifs — 1ère",
    qs: [
      { q: "Choose : I ___ in Antananarivo since 2010.",
        c: ["live", "have lived", "am living", "lived"], a: 1,
        e: "Avec « since » (depuis un point de départ), on utilise le present perfect : have lived." },
      { q: "Passive voice : « The cake was ___ by Marie. »",
        c: ["ate", "eaten", "eats", "eating"], a: 1,
        e: "Passif = be + participe passé. Eat → eaten : « The cake was eaten by Marie. »" },
      { q: "Choose the future : « Tomorrow we ___ football. »",
        c: ["will play", "played", "plays", "playing"], a: 0,
        e: "Demain → futur avec will : we will play." },
      { q: "« The girl ___ won the prize is my sister. »",
        c: ["which", "who", "whose", "whom"], a: 1,
        e: "Pour une PERSONNE sujet, on utilise who. Which = pour les choses." },
      { q: "What is a synonym of « rapid » ?",
        c: ["slow", "fast", "lazy", "weak"], a: 1,
        e: "Rapid = fast = quick = rapide." }
    ]
  },
  {
    id: "fr-t", matiere: "Français", niveau: "Terminale", icon: "📖", minutes: 8,
    titre: "Argumentation & dissertation",
    qs: [
      { q: "Le but principal d'un texte argumentatif est :",
        c: ["raconter une histoire", "convaincre ou persuader", "décrire un paysage", "donner des nouvelles"], a: 1,
        e: "Argumenter = défendre une thèse avec des arguments (convaincre par la raison, persuader par les émotions)." },
      { q: "Dans l'introduction d'une dissertation, la problématique sert à :",
        c: ["faire joli", "poser la question qui guide tout le devoir", "résumer le roman", "donner son avis sans arguments"], a: 1,
        e: "Introduction = sujet amené → sujet posé → problématique → annonce du plan." },
      { q: "« Les vagues furieuses frappaient le rocher » : figure de style ?",
        c: ["métaphore", "comparaison", "personnification", "antithèse"], a: 2,
        e: "On prête un sentiment humain (« furieuses ») à des vagues : personnification." },
      { q: "Quel connecteur exprime la CONSÉQUENCE ?",
        c: ["mais", "donc", "bien que", "avant"], a: 1,
        e: "« Donc », « ainsi », « par conséquent » introduisent une conséquence. « Mais » = opposition." },
      { q: "La thèse dans un texte argumentatif est :",
        c: ["le titre du livre", "l'opinion défendue par l'auteur", "la biographie du personnage", "une figure de style"], a: 1,
        e: "Thèse = position soutenue. Le devoir consiste à la discuter avec des arguments et des exemples." }
    ]
  },
  {
    id: "hg-t", matiere: "Histoire-Géo", niveau: "Terminale", icon: "🌍", minutes: 8,
    titre: "Histoire contemporaine & géopolitique",
    qs: [
      { q: "Madagascar accède à l'indépendance le :",
        c: ["26 juin 1960", "14 juillet 1789", "11 novembre 1918", "1er janvier 2000"], a: 0,
        e: "Le 26 juin 1960 : fin de la colonisation française — fête nationale malgache." },
      { q: "Le premier président de la République malgache est :",
        c: ["Didier Ratsiraka", "Philibert Tsiranana", "Albert Zafy", "Marc Ravalomanana"], a: 1,
        e: "Philibert Tsiranana, « père de l'indépendance », dirige la Première République (1959-1972)." },
      { q: "L'Organisation des Nations unies (ONU) est créée en :",
        c: ["1918", "1939", "1945", "1989"], a: 2,
        e: "Créée en 1945, au lendemain de la Seconde Guerre mondiale, pour maintenir la paix." },
      { q: "La guerre froide (1947-1991) opposait principalement :",
        c: ["la France et l'Angleterre", "les États-Unis et l'URSS", "la Chine et le Japon", "l'Allemagne et l'Italie"], a: 1,
        e: "Un conflit idéologique sans bataille directe entre le bloc capitaliste (USA) et le bloc communiste (URSS)." },
      { q: "Quelle région de Madagascar est surnommée « le grenier à riz » ?",
        c: ["le Sud (Androy)", "le lac Alaotra", "la côte ouest", "le cap Sainte-Marie"], a: 1,
        e: "La région du lac Alaotra (nord-est) est la grande zone rizicole du pays." }
    ]
  },
  {
    id: "ang-t", matiere: "Anglais", niveau: "Terminale", icon: "🇬🇧", minutes: 8,
    titre: "BAC English — conditionals & modals",
    qs: [
      { q: "Choose : « If I ___ rich, I would travel the world. »",
        c: ["am", "was", "were", "be"], a: 2,
        e: "Conditionnel irréel (2e type) : if + past simple → « If I were rich… »." },
      { q: "Reported speech : She said she ___ tired.",
        c: ["is", "was", "be", "were been"], a: 1,
        e: "Au discours indirect, le présent recule au passé : is → was." },
      { q: "« You ___ smoke here. It's forbidden. »",
        c: ["mustn't", "don't have to", "can", "should"], a: 0,
        e: "Interdiction → mustn't. (Don't have to = pas obligé, ce n'est pas interdit.)" },
      { q: "Passive : « English ___ all over the world. »",
        c: ["speaks", "is spoken", "is speak", "spoken"], a: 1,
        e: "Passif : be + participe passé → is spoken." },
      { q: "The phrasal verb « to give up » means :",
        c: ["donner", "continuer", "abandonner", "commencer"], a: 2,
        e: "To give up = abandonner, arrêter : « Never give up! » = N'abandonne jamais !" }
    ]
  },

  /* ================= 6ème (entrée au collège) ================= */
  {
    id: "math-6e", matiere: "Maths", niveau: "6ème", icon: "📐", minutes: 10,
    titre: "Fractions, décimaux & aires",
    qs: [
      { q: "Calcule : 3/4 + 1/4",
        c: ["4/8", "4/4 = 1", "3/4", "1/2"], a: 1,
        e: "Même dénominateur : on additionne les numérateurs : 3 + 1 = 4 → 4/4 = 1." },
      { q: "Périmètre d'un rectangle de longueur 8 cm et largeur 5 cm ?",
        c: ["13 cm", "26 cm", "40 cm", "21 cm"], a: 1,
        e: "P = (L + l) × 2 = (8 + 5) × 2 = 13 × 2 = 26 cm." },
      { q: "Calcule : 0,5 × 100",
        c: ["5", "50", "500", "0,05"], a: 1,
        e: "Multiplier par 100 décale la virgule de 2 rangs vers la droite : 0,5 → 50." },
      { q: "Quelle fraction est la plus grande ?",
        c: ["1/2", "1/3", "1/4", "1/5"], a: 0,
        e: "À numérateur égal, plus le dénominateur est petit, plus la part est grande : 1/2 est la plus grande." },
      { q: "Dans un triangle, deux angles mesurent 90° et 35°. Le 3e angle mesure :",
        c: ["45°", "55°", "65°", "35°"], a: 1,
        e: "La somme des angles d'un triangle = 180° : 180 − 90 − 35 = 55°." }
    ]
  },
  {
    id: "fr-6e", matiere: "Français", niveau: "6ème", icon: "📖", minutes: 8,
    titre: "Classes de mots & pluriels",
    qs: [
      { q: "Quel est le pluriel de « cheval » ?",
        c: ["chevals", "chevaux", "chevaus", "chevalles"], a: 1,
        e: "Les noms en -al font leur pluriel en -aux : cheval → chevaux (comme journal → journaux)." },
      { q: "Quelle est la nature du mot « rapidement » ?",
        c: ["Un adjectif", "Un verbe", "Un adverbe", "Un nom"], a: 2,
        e: "Il précise COMMENT se fait l'action (il court rapidement) : c'est un adverbe en -ment." },
      { q: "Dans « Le petit chat dort sur le mur », le sujet du verbe « dort » est :",
        c: ["Le petit chat", "dort", "sur le mur", "le mur"], a: 0,
        e: "Qui est-ce qui dort ? → « Le petit chat ». C'est le groupe sujet." },
      { q: "Quelle phrase est correctement accordée ?",
        c: ["des fleurs rouge", "des fleurs rouges", "des fleure rouges", "des fleurs roudes"], a: 1,
        e: "L'adjectif s'accorde avec le nom : « fleurs » est féminin pluriel → rouges." },
      { q: "Quel est le pluriel de « un hibou » ?",
        c: ["des hibous", "des hiboux", "des hibousx", "des hibeaux"], a: 1,
        e: "Les noms en -ou comme hibou, chou, bijou prennent un x : des hiboux." }
    ]
  },
  {
    id: "svt-6e", matiere: "SVT", niveau: "6ème", icon: "🌿", minutes: 8,
    titre: "Le vivant & son milieu",
    qs: [
      { q: "Lequel N'EST PAS un caractère des êtres vivants ?",
        c: ["Se nourrir", "Se reproduire", "Être fabriqué en usine", "Grandir"], a: 2,
        e: "Les êtres vivants naissent, se nourrissent, respirent, grandissent, se reproduisent et meurent — ils ne sont pas fabriqués." },
      { q: "Dans la chaîne herbe → sauterelle → caméléon, le caméléon est :",
        c: ["un producteur", "un herbivore", "un carnivore", "un décomposeur"], a: 2,
        e: "Il mange un animal (la sauterelle) : c'est un consommateur carnivore. La plante est le producteur." },
      { q: "À quelle classe appartient le zébu ?",
        c: ["Reptiles", "Oiseaux", "Mammifères", "Poissons"], a: 2,
        e: "Le zébu allaite ses petits et a des poils : c'est un mammifère (vertébré)." },
      { q: "De quoi une plante verte a-t-elle besoin pour fabriquer sa matière ?",
        c: ["De viande", "D'eau, de sels minéraux et de lumière", "De sucre seulement", "D'obscurité totale"], a: 1,
        e: "La plante puise eau + sels minéraux (sève brute) et utilise la lumière : c'est la photosynthèse." },
      { q: "Quel geste d'hygiène protège le mieux des microbes avant le repas ?",
        c: ["Se laver les mains", "Se brosser les cheveux", "Courir", "Regarder la télé"], a: 0,
        e: "Le lavage des mains élimine les microbes responsables de nombreuses maladies (diarrhées…)." }
    ]
  },

  /* ================= 5ème ================= */
  {
    id: "math-5e", matiere: "Maths", niveau: "5ème", icon: "📐", minutes: 10,
    titre: "Relatifs, proportionnalité & triangles",
    qs: [
      { q: "Calcule : (−3) + (−5)",
        c: ["−8", "+8", "−2", "+2"], a: 0,
        e: "Mêmes signes : on ajoute les distances à zéro (3 + 5 = 8) et on garde le signe − → −8." },
      { q: "3 cahiers coûtent 6 000 Ar. Combien coûtent 5 cahiers ?",
        c: ["8 000 Ar", "9 000 Ar", "10 000 Ar", "12 000 Ar"], a: 2,
        e: "Proportionnalité : 1 cahier = 6 000 ÷ 3 = 2 000 Ar → 5 cahiers = 5 × 2 000 = 10 000 Ar." },
      { q: "Quelle est la somme des angles d'un triangle ?",
        c: ["90°", "180°", "270°", "360°"], a: 1,
        e: "Dans tout triangle, la somme des trois angles vaut exactement 180°." },
      { q: "Calcule : (−4) × (+2)",
        c: ["+8", "−8", "−6", "+6"], a: 1,
        e: "Signes contraires → résultat négatif ; 4 × 2 = 8 → −8." },
      { q: "Combien font 45 % de 200 ?",
        c: ["45", "90", "100", "92"], a: 1,
        e: "45 % de 200 = 0,45 × 200 = 90 (ou produit en croix : 45 × 200 ÷ 100)." }
    ]
  },
  {
    id: "fr-5e", matiere: "Français", niveau: "5ème", icon: "📖", minutes: 8,
    titre: "Le récit au passé & expansions du nom",
    qs: [
      { q: "« Hier, nous (finir) nos devoirs » au passé composé :",
        c: ["nous finissions", "nous avons fini", "nous finirons", "nous finîmes"], a: 1,
        e: "Passé composé = auxiliaire avoir au présent + participe passé : nous avons fini (action achevée, hier)." },
      { q: "Quel temps exprime une habitude ou une description dans le passé ?",
        c: ["Le passé composé", "Le futur", "L'imparfait", "Le présent"], a: 2,
        e: "L'imparfait décrit le décor et les habitudes ; le passé composé raconte les actions ponctuelles." },
      { q: "Dans « une maison blanche », le mot « blanche » est :",
        c: ["un complément du nom", "un adjectif épithète", "une apposition", "un adverbe"], a: 1,
        e: "« Blanche » qualifie directement le nom « maison » : c'est un adjectif épithète." },
      { q: "Le futur simple de « il (être) » est :",
        c: ["il est", "il était", "il sera", "il serait"], a: 2,
        e: "Futur de l'infinitif + -ai, -as, -a : être → il sera (serait = conditionnel)." },
      { q: "Dans « la maison de briques », « de briques » est :",
        c: ["le sujet", "un complément du nom", "un COD", "un adjectif"], a: 1,
        e: "Il complète le nom « maison » (une maison DE QUOI ?) : c'est un complément du nom." }
    ]
  },
  {
    id: "pc-5e", matiere: "Physique-Chimie", niveau: "5ème", icon: "⚗️", minutes: 8,
    titre: "Matière & électricité",
    qs: [
      { q: "Le passage de l'état solide à l'état liquide s'appelle :",
        c: ["la solidification", "la fusion", "la vaporisation", "la condensation"], a: 1,
        e: "Solide → liquide = fusion (la glace fond). Liquide → solide = solidification." },
      { q: "À pression normale, l'eau bout à :",
        c: ["0 °C", "37 °C", "100 °C", "1000 °C"], a: 2,
        e: "L'eau gèle à 0 °C et bout (vaporisation) à 100 °C à pression atmosphérique normale." },
      { q: "Quelle est l'unité de la tension électrique ?",
        c: ["L'ampère (A)", "Le volt (V)", "L'ohm (Ω)", "Le watt (W)"], a: 1,
        e: "Tension U en volts (voltmètre) ; intensité I en ampères ; résistance R en ohms." },
      { q: "Dans un circuit en SÉRIE, si une lampe grille :",
        c: ["les autres brillent plus fort", "tout le circuit s'éteint", "rien ne change", "la pile explose"], a: 1,
        e: "En série, il n'y a qu'une seule boucle : si elle est coupée, le courant ne passe plus nulle part." },
      { q: "Un atome est électriquement :",
        c: ["positif", "négatif", "neutre", "alternatif"], a: 2,
        e: "Il contient autant de protons (+) que d'électrons (−) : sa charge totale est nulle." }
    ]
  },

  /* ================= 4ème ================= */
  {
    id: "math-4e", matiere: "Maths", niveau: "4ème", icon: "📐", minutes: 10,
    titre: "Pythagore, fractions & puissances",
    qs: [
      { q: "Triangle rectangle : côtés de l'angle droit 3 cm et 4 cm. L'hypoténuse mesure :",
        c: ["5 cm", "6 cm", "7 cm", "12 cm"], a: 0,
        e: "Pythagore : c² = 3² + 4² = 9 + 16 = 25 → c = √25 = 5 cm." },
      { q: "Calcule : 2/3 × 3/4",
        c: ["5/7", "6/12 = 1/2", "2/4", "3/2"], a: 1,
        e: "On multiplie numérateurs entre eux et dénominateurs entre eux : (2×3)/(3×4) = 6/12 = 1/2." },
      { q: "Combien vaut 10³ ?",
        c: ["30", "100", "1 000", "10 000"], a: 2,
        e: "10³ = 10 × 10 × 10 = 1 000 (l'exposant 3 donne 3 zéros)." },
      { q: "Dans un triangle rectangle, cos(angle) = ?",
        c: ["opposé / hypoténuse", "adjacent / hypoténuse", "opposé / adjacent", "hypoténuse / adjacent"], a: 1,
        e: "SOH-CAH-TOA : Cosinus = côté Adjacent / Hypoténuse." },
      { q: "Calcule : (−2)²",
        c: ["−4", "+4", "−2", "+2"], a: 1,
        e: "(−2)² = (−2) × (−2) = +4 (mêmes signes → résultat positif)." }
    ]
  },
  {
    id: "fr-4e", matiere: "Français", niveau: "4ème", icon: "📖", minutes: 8,
    titre: "Phrase complexe & discours rapporté",
    qs: [
      { q: "Dans « le livre que je lis », « que je lis » est une subordonnée :",
        c: ["complétive", "relative", "circonstancielle", "indépendante"], a: 1,
        e: "Introduite par le pronom relatif « que », elle complète le nom « livre » : subordonnée relative." },
      { q: "Discours direct : Il dit : « Je viens. » → Discours indirect :",
        c: ["Il dit : je viens.", "Il dit que je viens.", "Il dit qu'il vient.", "Il dit venir."], a: 2,
        e: "Au discours indirect, « je » devient « il » (3e personne) et on supprime les guillemets : Il dit qu'il vient." },
      { q: "« Bien que tu sois fatigué, tu travailles. » « Bien que » exprime :",
        c: ["la cause", "le but", "l'opposition (concession)", "le temps"], a: 2,
        e: "Bien que + subjonctif introduit une opposition : malgré la fatigue, l'action continue." },
      { q: "Dans « Je pense que tu as raison », « que tu as raison » est :",
        c: ["une subordonnée complétive", "une relative", "une indépendante", "un adjectif"], a: 0,
        e: "Elle complète le verbe « pense » (je pense QUOI ?) : subordonnée complétive COD introduite par « que »." },
      { q: "Le plus-que-parfait de « nous (partir) » est :",
        c: ["nous partions", "nous étions partis", "nous avons parti", "nous serons partis"], a: 1,
        e: "Plus-que-parfait = auxiliaire à l'imparfait + participe passé : nous étions partis (être → accord : partis)." }
    ]
  },
  {
    id: "svt-4e", matiere: "SVT", niveau: "4ème", icon: "🌿", minutes: 8,
    titre: "Reproduction & activité interne du globe",
    qs: [
      { q: "Quelle cellule donne la fécondation chez l'Homme ?",
        c: ["Un globule rouge", "La cellule-œuf (spermatozoïde + ovule)", "Un neurone", "Une plaquette"], a: 1,
        e: "La fécondation = rencontre d'un spermatozoïde et d'un ovule → une seule cellule : la cellule-œuf." },
      { q: "Le déplacement des plaques tectoniques provoque :",
        c: ["la pluie", "séismes, volcans et montagnes", "les marées", "le jour et la nuit"], a: 1,
        e: "Aux limites des plaques : frottements (séismes), remontées de magma (volcans), plissements (montagnes)." },
      { q: "Où se déroule le réflexe (ex : retirer la main d'un objet chaud) ?",
        c: ["Dans le cerveau uniquement", "Via la moelle épinière", "Dans le cœur", "Dans l'estomac"], a: 1,
        e: "Le réflexe est une réponse rapide et involontaire commandée par la moelle épinière (sans attendre le cerveau)." },
      { q: "Quels organes filtrent le sang et produisent l'urine ?",
        c: ["Les poumons", "Le foie", "Les reins", "Le cœur"], a: 2,
        e: "Les reins filtrent le sang, éliminent les déchets et fabriquent l'urine évacuée par la vessie." },
      { q: "Où se déroule la photosynthèse dans la plante ?",
        c: ["Dans les racines", "Dans les parties vertes (chlorophylle)", "Dans les fleurs seulement", "Dans le sol"], a: 1,
        e: "La chlorophylle (pigment vert des feuilles) capte la lumière nécessaire à la photosynthèse." }
    ]
  },

  /* ================= 2nde (entrée au lycée) ================= */
  {
    id: "math-2nde", matiere: "Maths", niveau: "2nde", icon: "📐", minutes: 10,
    titre: "Fonctions, vecteurs & statistiques",
    qs: [
      { q: "Soit f(x) = 2x + 3. Calcule f(4).",
        c: ["9", "10", "11", "24"], a: 2,
        e: "On remplace x par 4 : f(4) = 2×4 + 3 = 8 + 3 = 11." },
      { q: "Dans l'équation de droite y = mx + p, que représente m ?",
        c: ["L'ordonnée à l'origine", "Le coefficient directeur (pente)", "L'abscisse", "Une erreur"], a: 1,
        e: "m est la pente : quand x augmente de 1, y varie de m. p est l'ordonnée à l'origine." },
      { q: "Avec A(1 ; 2) et B(4 ; 6), les coordonnées du vecteur AB sont :",
        c: ["(5 ; 8)", "(3 ; 4)", "(4 ; 6)", "(−3 ; −4)"], a: 1,
        e: "AB = (xB − xA ; yB − yA) = (4 − 1 ; 6 − 2) = (3 ; 4)." },
      { q: "Quelle est la moyenne de 10 ; 12 ; 14 ?",
        c: ["11", "12", "13", "36"], a: 1,
        e: "Moyenne = (10 + 12 + 14) ÷ 3 = 36 ÷ 3 = 12." },
      { q: "x ∈ [2 ; 5] signifie :",
        c: ["2 < x < 5 strictement", "2 ≤ x ≤ 5", "x = 2 ou x = 5", "x > 5"], a: 1,
        e: "Les crochets fermés incluent les bornes : x est compris entre 2 et 5, bornes comprises." }
    ]
  },
  {
    id: "fr-2nde", matiere: "Français", niveau: "2nde", icon: "📖", minutes: 8,
    titre: "Analyse littéraire & registres",
    qs: [
      { q: "Un narrateur personnage de l'histoire raconte à la :",
        c: ["1re personne (je)", "2e personne (tu)", "3e personne (il)", "il ne raconte pas"], a: 0,
        e: "Quand le narrateur est un personnage du récit, il dit « je » : point de vue interne." },
      { q: "Quel registre vise à faire rire le lecteur ?",
        c: ["Le registre tragique", "Le registre comique", "Le registre lyrique", "Le registre épique"], a: 1,
        e: "Comique = rire (ironie, caricature) ; tragique = mort et destin ; lyrique = sentiments ; épique = héros." },
      { q: "« Cette obscure clarté qui tombe des étoiles » (Corneille) est :",
        c: ["une métaphore", "un oxymore", "une comparaison", "une litote"], a: 1,
        e: "Oxymore = réunion de deux mots contraires (« obscure » + « clarté ») dans une même expression." },
      { q: "« Antigone », l'héroïne qui brave l'interdit de Créon, est une tragédie de :",
        c: ["Molière", "Sophocle", "Victor Hugo", "Racine"], a: 1,
        e: "Antigone est une tragédie grecque de Sophocle (Ve siècle av. J.-C.), reprise depuis par de nombreux auteurs." },
      { q: "Quel mot N'APPARTIENT PAS au champ lexical de la mer ?",
        c: ["les flots", "la vague", "le marin", "le sommet"], a: 3,
        e: "« Sommet » appartient au champ lexical de la montagne. Flots, vague et marin renvoient à la mer." }
    ]
  },
  {
    id: "pc-2nde", matiere: "Physique-Chimie", niveau: "2nde", icon: "⚗️", minutes: 8,
    titre: "Mécanique & chimie",
    qs: [
      { q: "Une voiture parcourt 150 km en 2 h. Sa vitesse moyenne est :",
        c: ["300 km/h", "75 km/h", "152 km/h", "50 km/h"], a: 1,
        e: "v = d ÷ t = 150 ÷ 2 = 75 km/h." },
      { q: "Quelle est l'unité de la force ?",
        c: ["Le joule (J)", "Le newton (N)", "Le pascal (Pa)", "Le volt (V)"], a: 1,
        e: "La force (ex : le poids) se mesure en newtons (N), au dynamomètre." },
      { q: "Un ion négatif (anion) est un atome qui a :",
        c: ["perdu des électrons", "gagné des électrons", "perdu des protons", "gagné des neutrons"], a: 1,
        e: "Gagner des électrons (−) rend l'atome négatif → anion. En perdre → cation (+)." },
      { q: "Quelle est la formule de la molécule d'eau ?",
        c: ["CO₂", "H₂O", "O₂", "NaCl"], a: 1,
        e: "H₂O : 2 atomes d'hydrogène + 1 atome d'oxygène. CO₂ = gaz carbonique ; NaCl = sel." },
      { q: "Une solution dont le pH vaut 3 est :",
        c: ["acide", "neutre", "basique", "pure"], a: 0,
        e: "pH < 7 = acide ; pH = 7 = neutre ; pH > 7 = basique. Un pH de 3 est fortement acide." }
    ]
  }
];

