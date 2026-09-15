/**
 * Research output.
 *
 * ── The status rule, which must not be relaxed ──────────────────────────────
 *
 * The manuscript below is a PREPRINT. As of 2026-09-15 it is:
 *
 *   - complete, and internally verified (18/18 symbolic checks pass)
 *   - packaged for arXiv (math.CO) and for Linear Algebra and its Applications
 *   - NOT posted to arXiv - the package still contains an endorsement-request
 *     template, so no arXiv identifier exists
 *   - NOT submitted, NOT peer-reviewed, NOT accepted anywhere
 *   - absent from the author's ORCID record, which registers zero works
 *
 * The ORCID iD was re-checked against the public ORCID API on 2026-09-15 and
 * still returns zero works. The submission state was re-checked against the
 * author's own sign-off checklist, whose boxes are all still unticked, and
 * against the revised package's own README, which speaks of arXiv posting
 * conditionally ("If the preprint has been posted").
 *
 * So `status` is "preprint" and the venue field does not exist. Do not add a
 * venue, a DOI, an arXiv id, a citation count, or the words "published" or
 * "peer-reviewed" until there is a URL that proves it. An unverifiable venue on
 * a portfolio is worse than no venue at all, and a referee is exactly the kind
 * of reader who will check.
 *
 * ── The scope rule, which is new in the 2026-09-08 revision ─────────────────
 *
 * The revision adds finite-field certificates, and they prove strictly less
 * than the real ones. Over the reals the paper proves M(P(n,3)) = Z(P(n,3)) = 8.
 * Over finite fields it proves Z(P(Lr,3)) = 8 ONLY - reduction modulo a prime
 * can lower rank, so a finite-field kernel need not lift to a real one. The
 * paper says so in its own words: "these certificates do not assert real
 * maximum nullity eight."
 *
 * That is why two different coverage figures appear below and must never be
 * merged into one number:
 *
 *   1/6      = 0.1667  real families {10, 24, 28, 42}, where M = Z = 8
 *   46.31%           the union including finite-field families, where Z = 8
 *
 * Writing "the paper covers 46% of cases" without the qualifier would be
 * claiming maximum nullity on families where only zero forcing is proved.
 */

export type Preprint = {
  id: string;
  title: string;
  authors: string;
  /** ISO date the manuscript was finalized. */
  date: string;
  status: "preprint" | "submitted" | "accepted" | "published";
  /** Where it is packaged to go. Explicitly an intention, not a claim. */
  preparedFor: string[];
  abstract: string;
  /** Plain-language framing for a non-specialist reader. */
  plainSummary: string;
  msc: string;
  keywords: string[];
  pages: number;
  pdf: string;
  supplement: string;
  /** The results, each as a self-contained statement. */
  results: Array<{ claim: string; detail: string }>;
  /** What the paper explicitly does NOT settle. Stated by the paper itself. */
  limits: string[];
};

export const preprint: Preprint = {
  id: "weighted-certificates-real-and-finite-fields",
  title:
    "Weighted certificates over real and finite fields for generalized Petersen graphs",
  authors: "Mohib Ahmad",
  date: "2026-09-08",
  status: "preprint",
  preparedFor: ["arXiv (math.CO)", "Linear Algebra and its Applications"],
  abstract:
    "We study the corrected conjecture Z(P(n,3))=8 for n≥ 13 using weighted graph-pattern matrices. Over the reals, Fourier certificates prove M(P(n,3))=Z(P(n,3))=8 whenever 10, 24, 28, or 42 divides n. We retain the complete six-triple rational classification and strengthen the arithmetic obstruction: no prime-power level supports nullity eight in the real constant-weight symmetric class. An exact modular sieve followed by cyclotomic verification gives a complete classification through level 420. Changing the coefficient field yields additional zero-forcing families. A polynomial greatest-common-divisor formula computes the nullity of a five-parameter cyclic matrix over any field, including when the characteristic divides the graph order. Explicit finite-field certificates prove Z(P(Lr,3))=8 for all r≥ 1 and L in {16,17,18,19,21,22,23,25,26,27,29,31}. In particular, a binary degree-eight divisor of z^17−1 proves Z(P(17r,3))=8. These certificates do not assert real maximum nullity eight. For the signed real specialization, we determine every root-of-unity zero and prove that Q_k(z)=z^(2k+2)+z^(2k)+z^(k+1)+z^2+1 is squarefree cyclotomic exactly when k=2,3,7. Finally, a first-force anchoring lemma reduces exhaustive seven-vertex zero-forcing search to O(n^4) candidate sets and verifies the conjecture for every 13≤ n≤ 64. The uniform conjecture remains open.",
  plainSummary:
    "There is a graph invariant that is hard to pin down, and a conjecture that it equals 8 for a whole infinite family of graphs. Working over the real numbers, this paper proves the conjecture outright for a sixth of all cases, by building matrices whose singularity is decided by where eight roots of a polynomial land on the unit circle — and then proves that this technique cannot finish the job, because an arithmetic obstruction rules out the rest. The revision changes the number system. Over finite fields the same construction reaches many more cases, raising the proved share to 46%, but it buys that reach at a price the paper states rather than hides: on the new families it settles the zero forcing number and not the maximum nullity. Establishing the limits of your own method, twice, is the less common half.",
  msc: "Primary 05C50; Secondary 15A03, 15A18, 11R18",
  keywords: [
    "zero forcing number",
    "maximum nullity",
    "generalized Petersen graph",
    "graph-pattern matrix",
    "block-circulant matrix",
    "Fourier diagonalization",
    "finite fields",
    "cyclotomic polynomial"
  ],
  pages: 19,
  pdf: "/assets/research/weighted-certificates-petersen-real-and-finite-fields.pdf",
  supplement: "/assets/research/petersen-supplementary-material.zip",
  results: [
    {
      claim: "M(P(n,3)) = Z(P(n,3)) = 8 when 10, 24, 28 or 42 divides n",
      detail:
        "Explicit root-of-unity certificates over the reals, covering a set of indices of natural density 1/6. This settles Krishnan’s conjecture on that set, and it is the only result here that reaches maximum nullity."
    },
    {
      claim: "Over finite fields, Z(P(Lr,3)) = 8 for twelve further base levels",
      detail:
        "A greatest-common-divisor formula gives the nullity of the five-parameter cyclic matrix over any field, including when the characteristic divides the graph order. Certificates follow for L in 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 29, 31 and every multiple. A binary degree-eight divisor of z¹⁷ − 1 handles L = 17."
    },
    {
      claim: "The two families together cover 46.31% of all indices",
      detail:
        "Natural density 6933083/14969435 by inclusion–exclusion over the fifteen base levels, after dropping 42 as a multiple of 21. On this union the zero forcing number is 8; on the real sixth of it, the maximum nullity is 8 as well."
    },
    {
      claim: "The rational part of the construction is classified completely",
      detail:
        "If the three weight parameters are rational and all eight roots are distinct roots of unity, exactly six parameter triples occur, with minimal moduli 10, 24, 40 and 42. The modulus-28 certificate is therefore genuinely algebraic rather than rational."
    },
    {
      claim: "A Lam–Leung obstruction bounds the whole real certificate class",
      detail:
        "Any certificate at level n forces 27 into the numerical semigroup generated by the prime divisors of n. No prime-power level supports nullity eight in the real constant-weight symmetric class, and an exact modular sieve with cyclotomic verification classifies every level through 420."
    },
    {
      claim: "The signed construction is squarefree cyclotomic exactly for k = 2, 3, 7",
      detail:
        "Every root-of-unity zero of Q_k(z) = z^(2k+2) + z^(2k) + z^(k+1) + z² + 1 is determined, and those three values of k are the only ones. For k = 7 this gives M(P(120r,7)) = Z(P(120r,7)) = 16."
    },
    {
      claim: "Exhaustive search verifies the conjecture for every 13 ≤ n ≤ 64",
      detail:
        "A first-force anchoring lemma cuts the seven-vertex search to O(n⁴) candidate sets. No seven-vertex forcing set exists in that range, and eight consecutive outer vertices force in every case tested."
    }
  ],
  limits: [
    "The finite-field certificates prove the zero forcing number only. Reduction modulo a prime can lower rank, so a finite-field kernel need not lift to a real one, and maximum nullity is not claimed on those families.",
    "The real certificate class cannot by itself settle the conjecture for all n ≥ 13. The paper proves this rather than leaving it open.",
    "The exhaustive computation establishes the range 13 ≤ n ≤ 64 and nothing beyond it. The uniform conjecture Z(P(n,3)) = 8 for every n ≥ 13 remains open.",
    "The paper does not establish priority over all existing literature, and no part of it has been peer-reviewed."
  ]
};

/**
 * The six valid rational certificates, verbatim from the supplement's
 * `classify_rational.py` output. Fourteen degree-8 products of distinct
 * cyclotomic polynomials were enumerated; eight are degenerate (τ = 0).
 *
 * This is the data the home-page instrument animates, and it is real: `roots`
 * is the multiset of root orders on the unit circle for each factorization.
 */
export type Certificate = {
  factors: string;
  /** Weight parameters (p, q, τ). */
  p: number;
  q: number;
  tau: number;
  /** Minimal modulus L. */
  L: number;
  /** Orders of the cyclotomic factors, which fix where the roots sit. */
  orders: number[];
};

export const rationalCertificates: Certificate[] = [
  { factors: "Φ₅·Φ₁₀", p: 0, q: 0, tau: -1, L: 10, orders: [5, 10] },
  { factors: "Φ₃·Φ₆·Φ₈", p: 0, q: 0, tau: -2, L: 24, orders: [3, 6, 8] },
  { factors: "Φ₅·Φ₈", p: 1, q: 1, tau: -1, L: 40, orders: [5, 8] },
  { factors: "Φ₈·Φ₁₀", p: -1, q: -1, tau: -1, L: 40, orders: [8, 10] },
  { factors: "Φ₃·Φ₁₄", p: 0, q: -1, tau: -1, L: 42, orders: [3, 14] },
  { factors: "Φ₆·Φ₇", p: 0, q: 1, tau: -1, L: 42, orders: [6, 7] }
];

/**
 * The divisibility families the REAL certificates cover, where the paper
 * proves maximum nullity and zero forcing together.
 *
 * These four are the site's whole visual identity, so a word on why the
 * revision did not disturb them: it added finite-field families, and those
 * prove a strictly weaker statement (see the scope rule at the top of this
 * file). The four real moduli, the six rational triples below, and the density
 * 1/6 are all unchanged from the original manuscript.
 */
export const coveredModuli = [10, 24, 28, 42] as const;

export type Modulus = (typeof coveredModuli)[number];

/**
 * One color per certificate modulus, and this is the site's whole palette.
 *
 * The paper proves M(P(n,3)) = Z(P(n,3)) = 8 on exactly four divisibility
 * families, so there are exactly four accents and each one means a modulus and
 * nothing else. Red carries 10 — the first and smallest certificate — and
 * doubles as the primary action color.
 *
 * `token` is the CSS custom property, so both themes resolve automatically.
 *
 * `note` says what makes that family different from the other three, and
 * deliberately does NOT name the factorization — every surface that shows a
 * note also shows the factors on the line above it, and repeating them there
 * reads as padding in print and as a stutter in a screen reader.
 */
export const modulusColors: Record<Modulus, { token: string; note: string }> = {
  10: { token: "--red", note: "the smallest certificate" },
  24: { token: "--yellow", note: "three cyclotomic factors, not two" },
  28: { token: "--cyan", note: "algebraic, not rational" },
  42: { token: "--violet", note: "two distinct certificates" }
};

/**
 * The finite-field base levels, added by the 2026-09-08 revision.
 *
 * Each row is a certificate over the stated characteristic proving
 * Z(P(Lr,3)) = 8 for every r >= 1. `characteristic` is the field; the
 * validator checks the divisibility identity by exact polynomial division,
 * then confirms the graph pattern and the modular rank directly at n = L and
 * n = 2L.
 *
 * `inseparable` marks the rows where the characteristic divides the graph
 * order, which is the case the ordinary Fourier argument cannot reach at all
 * and the reason the gcd formula is stated for any field. Verbatim from
 * `extensions/finite_field_validation.json`.
 *
 * L = 38 appears in that file and deliberately NOT here: 38 is a multiple of
 * 19, so it adds no index the L = 19 row does not already cover. The paper
 * drops it from the coverage computation for the same reason it drops the
 * real modulus 42, which is a multiple of 21.
 *
 * These prove ZERO FORCING ONLY. Do not merge this list into `coveredModuli`.
 */
export const finiteFieldFamilies: Array<{ L: number; characteristic: number; inseparable: boolean }> = [
  { L: 16, characteristic: 17, inseparable: false },
  { L: 17, characteristic: 2, inseparable: true },
  { L: 18, characteristic: 19, inseparable: false },
  { L: 19, characteristic: 229, inseparable: false },
  { L: 21, characteristic: 41, inseparable: false },
  { L: 22, characteristic: 23, inseparable: false },
  { L: 23, characteristic: 461, inseparable: false },
  { L: 25, characteristic: 499, inseparable: false },
  { L: 26, characteristic: 5, inseparable: true },
  { L: 27, characteristic: 271, inseparable: false },
  { L: 29, characteristic: 233, inseparable: false },
  { L: 31, characteristic: 743, inseparable: false }
];

/**
 * The two coverage figures, kept apart on purpose.
 *
 * `real` is the density of the four families where M = Z = 8. `combined` is
 * the density of the union with the finite-field families, where only Z = 8 is
 * proved. Both fractions are exact and both were recomputed here by
 * inclusion-exclusion rather than copied: the combined one is
 * 6933083/14969435, matching the corollary in the manuscript and
 * `extensions/coverage.json`.
 */
export const coverage = {
  real: { fraction: "1/6", percent: 16.67, proves: "M = Z = 8" },
  combined: { fraction: "6933083/14969435", percent: 46.31, proves: "Z = 8" }
} as const;

/**
 * Verification evidence shipped with the paper. Numbers only where a recorded
 * output file backs them; each corresponds to a file in the supplement.
 */
export const verification = [
  { label: "Symbolic checks", value: "18 / 18 pass", source: "verify_paper.py" },
  { label: "Original proofs retained", value: "17 / 17 verbatim", source: "integration_validation.json" },
  { label: "Rational classification", value: "14 candidates → 6 valid", source: "classify_rational.py" },
  { label: "Exact sieve", value: "complete through level 420", source: "exact_search.py" },
  { label: "Finite-field certificates", value: "12 levels, ranks confirmed", source: "verify_finite_fields.py" },
  { label: "Zero forcing, exhaustive", value: "13 ≤ n ≤ 64, no 7-set", source: "direct_zf_anchor.c" }
];

/**
 * Independently computed zero forcing numbers for P(n,3), from the exhaustive
 * C search in the supplement. Included because it reproduces Krishnan's
 * boundary counterexample Z(P(12,3)) = 7 rather than assuming it.
 *
 * The table stops at 20 for display, not for lack of data. The original
 * program covers 7 <= n <= 27; the anchored rerun added by the revision covers
 * 13 <= n <= 64 and is reported in `verification` instead, because 52 more
 * tiles of the same number 8 would say less than one line of prose does.
 */
export const zeroForcingTable: Array<{ n: number; z: number }> = [
  { n: 7, z: 6 },
  { n: 8, z: 6 },
  { n: 9, z: 6 },
  { n: 10, z: 8 },
  { n: 11, z: 7 },
  { n: 12, z: 7 },
  { n: 13, z: 8 },
  { n: 14, z: 8 },
  { n: 15, z: 8 },
  { n: 16, z: 8 },
  { n: 17, z: 8 },
  { n: 18, z: 8 },
  { n: 19, z: 8 },
  { n: 20, z: 8 }
];

/**
 * Open engineering questions, each grounded in a project that exists in this
 * repository. Nothing here claims a paper - these are restatements of the
 * `hardPart` and `tradeoff` fields recorded against real work, so every one is
 * traceable to code a reader can open.
 */
export type ResearchTrack = {
  id: string;
  area: string;
  question: string;
  approach: string;
  methods: string[];
  /** Slug of the grounding project in data/projects.ts. */
  groundedIn: string;
};

export const researchTracks: ResearchTrack[] = [
  {
    id: "rules-as-code",
    area: "Rules as code, and the limits of model-assisted extraction",
    question:
      "How much of the translation from published regulation to executable logic can a language model do, if it is never allowed to decide anything?",
    approach:
      "Built a compiler where the model only ever proposes candidates, six deterministic checks stand between it and the IR, every semantic object carries a source span back to the authoritative text, and no rule executes until a human approves it. Then tried to break the review gate on purpose with seeded errors.",
    methods: [
      "Typed IR with a closed expression AST",
      "Four-state deterministic evaluation",
      "Mutation testing",
      "Adversarial review gate",
      "Provenance to source spans"
    ],
    groundedIn: "ruleweaver"
  },
  {
    id: "evidence-over-prediction",
    area: "Clinical operations, evidence versus prediction",
    question:
      "Is a denial-risk probability the wrong output for a prior-authorization workflow, and is criterion-level evidence the right one?",
    approach:
      "Started with a denial-prediction prototype, then rejected that framing. The current architecture will not let a denial probability sort a work queue or feed a gate; what it produces instead is criterion-level provenance against versioned policy, moving through one canonical state machine.",
    methods: [
      "Criterion DSL",
      "Five-value status algebra",
      "Versioned policy",
      "Determinism boundary",
      "Hash-chained audit"
    ],
    groundedIn: "priora"
  },
  {
    id: "backpressure-telemetry",
    area: "Concurrent systems and observability",
    question:
      "What is the minimum telemetry needed to see queue pressure and ordering faults in a streaming pipeline, without coupling observability to packet processing?",
    approach:
      "Implemented a three-stage pipeline over bounded multiprocessing queues with signature verification and packet re-sequencing, exposing state through an observer rather than reaching into the workers.",
    methods: ["Bounded queues", "Multiprocessing", "Observer pattern", "Packet re-sequencing"],
    groundedIn: "streamscope"
  }
];
