/* ===== EduPrep · Sujets & corrections détaillées ===== */
window.SUBJECTS = [
  {
    id: "math-t", matiere: "Maths", niveau: "Terminale", icon: "📐", minutes: 10,
    titre: "Suites, dérivées & probabilités",
    qs: [
      { q: "Soit f(x) = 3x² − 2x + 1. Que vaut f′(x) ?",
        c: ["6x − 2", "3x − 2", "6x + 2", "3x² − 2"],
        a: 0,
        e: "On dérive terme par terme : dérivée de 3x² → 3 × 2x = 6x · dérivée de −2x → −2 · dérivée d'une constante (+1) → 0. Donc f′(x) = 6x − 2." },
      { q: "Une suite arithmétique (uₙ) a pour premier terme u₁ = 5 et pour raison r = 3. Que vaut u₁₀ ?",
        c: ["35", "32", "30", "50"],
        a: 1,
        e: "Formule : uₙ = u₁ + (n−1) × r. Donc u₁₀ = 5 + (10−1) × 3 = 5 + 27 = 32." },
      { q: "Deux événements indépendants A et B : P(A) = 0,3 et P(B) = 0,5. Que vaut P(A ∩ B) ?",
        c: ["0,8", "0,15", "0,2", "0,35"],
        a: 1,
        e: "Si A et B sont indépendants, on multiplie les probabilités : P(A ∩ B) = P(A) × P(B) = 0,3 × 0,5 = 0,15." },
      { q: "Que vaut la limite de (2x + 1) / (x − 3) quand x tend vers +∞ ?",
        c: ["+∞", "0", "2", "1/3"],
        a: 2,
        e: "Aux infinis, une fraction rationnelle se comporte comme le rapport des termes dominants : 2x / x = 2. La limite vaut donc 2." },
      { q: "Que vaut l'intégrale ∫₀¹ 2x dx ?",
        c: ["2", "1", "0,5", "1,5"],
        a: 1,
        e: "Une primitive de 2x est x². On calcule : [x²]₀¹ = 1² − 0² = 1." }
      ]
  },
  {
    id: "phy-t", matiere: "Physique", niveau: "Terminale", icon: "⚡", minutes: 10,
    titre: "Énergie, électricité & optique",
    qs: [
      { q: "Un objet de masse m = 2 kg se déplace à v = 10 m/s. Son énergie cinétique vaut :",
        c: ["20 J", "100 J", "200 J", "40 J"],
        a: 1,
        e: "Ec = ½ × m × v² = ½ × 2 × 10² = 1 × 100 = 100 joules." },
      { q: "Un résistor de R = 4 Ω est soumis à une tension U = 12 V. Quelle intensité I le traverse ?",
        c: ["48 A", "0,33 A", "3 A", "8 A"],
        a: 2,
        e: "Loi d'Ohm : U = R × I donc I = U / R = 12 / 4 = 3 ampères." },
      { q: "Une force F = 50 N déplace un objet de d = 4 m dans sa direction. Le travail de cette force est :",
        c: ["12,5 J", "54 J", "200 J", "100 J"],
        a: 2,
        e: "W = F × d × cos(0°) = 50 × 4 × 1 = 200 joules." },
      { q: "Un phénomène a une période T = 0,5 s. Quelle est sa fréquence ?",
        c: ["0,5 Hz", "2 Hz", "5 Hz", "1 Hz"],
        a: 1,
        e: "La fréquence est l'inverse de la période : f = 1 / T = 1 / 0,5 = 2 hertz." },
      { q: "Une lentille convergente a une vergence C = 5 δ. Sa distance focale f est :",
        c: ["5 m", "0,2 m", "50 cm", "2 m"],
        a: 1,
        e: "f = 1 / C = 1 / 5 = 0,2 m, c'est-à-dire 20 cm." }
      ]
  },
  {
    id: "fr-bepc", matiere: "Français", niveau: "BEPC", icon: "📖", minutes: 8,
    titre: "Grammaire & vocabulaire",
    qs: [
      { q: "Quelle est la nature du mot « rapidement » ?",
        c: ["Un adjectif", "Un adverbe", "Un verbe", "Un nom"],
        a: 1,
        e: "« Rapidement » est invariable et modifie le sens d'un verbe (il court rapidement) : c'est un adverbe." },
      { q: "Quel est le pluriel de « cheval » ?",
        c: ["Chevals", "Chevaux", "Chevaus", "Chevalx"],
        a: 1,
        e: "Les noms en -al forment généralement leur pluriel en -aux : cheval → chevaux (comme canal → canaux)." },
      { q: "Quel est le contraire de « généreux » ?",
        c: ["Aimable", "Avare", "Courageux", "Fidèle"],
        a: 1,
        e: "Être généreux, c'est donner volontiers. Le contraire est être avare : quelqu'un qui garde tout pour lui." },
      { q: "La phrase « Quelle belle journée ! » est une phrase :",
        c: ["Déclarative", "Interrogative", "Exclamative", "Impérative"],
        a: 2,
        e: "Elle exprime une émotion (admiration) et se termine par un point d'exclamation : c'est une phrase exclamative." },
      { q: "Dans « L'élève travaille sérieusement », le mot « sérieusement » précise :",
        c: ["Le sujet", "Le verbe", "Le nom", "L'adjectif"],
        a: 1,
        e: "Un adverbe modifie généralement le verbe : il travaille COMMENT ? Sérieusement." }
      ]
  }
];
