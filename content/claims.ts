/**
 * NeoBreath claims registry — the honesty spine of the website.
 *
 * Every factual or near-factual statement the site makes is registered here with
 * a tier. The `<ClaimBadge>` component reads this file. Nothing renders on the
 * site as an unregistered claim.
 *
 * Authority: NeoBreath_Current_Project_Context.md. Where this file and the old
 * website copy disagree, this file wins. See AGENTS.md §5 for the full gap
 * analysis of what had to be deleted.
 *
 * Tiers:
 *   TODAY          — built and demonstrated in the current prototype
 *   IN DEVELOPMENT — active engineering / research work, not finished
 *   RESEARCH       — future direction, not yet validated
 */

import { claimTier, type ClaimTier } from "../design/tokens";

export type ClaimSource =
  | "context:core-system"
  | "context:ai-current"
  | "context:ai-future"
  | "context:intervention-research"
  | "context:scope-exclusion"
  | "context:prototype"
  | "context:research-literature";

export interface Claim {
  id: string;
  /** The wording as it may appear on the site. */
  text: string;
  tier: ClaimTier;
  source: ClaimSource;
  /** Required qualifier whenever this claim is rendered. */
  caveat?: string;
}

/**
 * Helper so the list below is checked against the canonical tier strings.
 * If `claimTier` in design/tokens.ts changes, this file fails to compile.
 */
const tier = claimTier;

export const claims: Claim[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // TODAY — the current, core system
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "belt-respiratory-sensing",
    text: "A wearable respiratory sensing belt monitors the infant's breathing.",
    tier: tier.today,
    source: "context:core-system",
  },
  {
    id: "onboard-processing",
    text: "Signal processing runs on the belt itself — there is no separate processing hub.",
    tier: tier.today,
    source: "context:core-system",
    caveat:
      "Fitting sensing, wireless communication and potential ML inference inside the belt's processing and power budget is an open engineering challenge, not a solved problem.",
  },
  {
    id: "foot-spo2-hr",
    text: "A foot-worn module monitors SpO₂ and heart rate alongside the belt.",
    tier: tier.today,
    source: "context:core-system",
  },
  {
    id: "vibrotactile-intervention",
    text: "The system applies vibrotactile mechanosensory stimulation as its intervention.",
    tier: tier.today,
    source: "context:core-system",
  },
  {
    id: "wireless-to-app",
    text: "The wearable connects wirelessly to a mobile application for monitoring.",
    tier: tier.today,
    source: "context:core-system",
  },
  {
    id: "one-device-one-infant",
    text: "One NeoBreath device is dedicated to one infant.",
    tier: tier.today,
    source: "context:core-system",
  },
  {
    id: "wearable-form-factor",
    text: "The system is wearable, built around the infant rather than a bedside machine.",
    tier: tier.today,
    source: "context:core-system",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Prototype findings — evidenced by the built prototype, including the gaps
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "prototype-bluetooth",
    text: "The prototype transmits sensor data wirelessly to the mobile app.",
    tier: tier.today,
    source: "context:prototype",
  },
  {
    id: "prototype-live-waveform",
    text: "The app visualises the breathing waveform in real time.",
    tier: tier.today,
    source: "context:prototype",
  },
  {
    id: "prototype-alarm-worked",
    text: "The alarm fires and alerts the caregiver when an apnoeic event is detected.",
    tier: tier.today,
    source: "context:prototype",
  },
  {
    id: "prototype-sensitivity-gap",
    text: "The belt picks up abdominal movement, but sensitivity is not yet where it needs to be.",
    tier: tier.inDevelopment,
    source: "context:prototype",
    caveat:
      "Stated deliberately as an open engineering problem. Do not soften it into a success.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // IN DEVELOPMENT — the current AI direction
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ai-signal-interpretation",
    text: "We are developing machine-learning-based interpretation of the wearable's physiological signals.",
    tier: tier.inDevelopment,
    source: "context:ai-current",
  },
  {
    id: "ai-artifact-rejection",
    text: "The immediate AI problem is telling a genuine apnoea event apart from motion and other sensor artefacts.",
    tier: tier.inDevelopment,
    source: "context:ai-current",
  },
  {
    id: "ai-false-alarm-reduction",
    text: "The purpose is to reduce false apnoea alarms — not to add AI for its own sake.",
    tier: tier.inDevelopment,
    source: "context:ai-current",
  },
  {
    id: "ai-signal-classification",
    text: "This is a physiological signal classification problem over respiratory, SpO₂ and heart-rate features.",
    tier: tier.inDevelopment,
    source: "context:ai-current",
  },
  {
    id: "ai-edge-inference",
    text: "Inference is intended to run on the wearable platform itself, at the edge.",
    tier: tier.inDevelopment,
    source: "context:ai-current",
    caveat: "Constrained by the belt's processing and power budget.",
  },
  {
    id: "ai-model-not-chosen",
    text: "Candidate model families include decision trees, regularised logistic regression, small gradient-boosted models and lightweight neural networks.",
    tier: tier.inDevelopment,
    source: "context:ai-current",
    caveat: "No specific model has been established as the final NeoBreath model.",
  },
  {
    id: "ai-literature-informed",
    text: "This direction is informed by published research on machine-learning-based central apnoea detection in premature infants (Varisco et al.).",
    tier: tier.inDevelopment,
    source: "context:research-literature",
    caveat:
      "The literature supports the research direction. NeoBreath has not yet demonstrated equivalent clinical performance, and must never imply that it has.",
  },
  {
    id: "intervention-mechanosensory",
    text: "We are exploring gentle vibrotactile mechanosensory stimulation to help stabilise respiratory activity.",
    tier: tier.inDevelopment,
    source: "context:intervention-research",
    caveat:
      "Informed by research into mechanical stimulation and stochastic resonance. The therapeutic benefit of mechanical stimulation does not establish that randomness is the active mechanism.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // RESEARCH — future direction. Every one of these must render with its tier.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "roadmap-personalised-models",
    text: "Personalised models that learn an individual infant's respiratory baseline.",
    tier: tier.research,
    source: "context:ai-future",
    caveat: "Proposed development direction, not yet a clinically validated capability.",
  },
  {
    id: "roadmap-predictive-risk",
    text: "Predictive apnoea-risk estimation that produces a rising-risk signal before a conventional threshold is crossed.",
    tier: tier.research,
    source: "context:ai-future",
    caveat: "Requires substantially more longitudinal data than the initial artefact-rejection problem.",
  },
  {
    id: "roadmap-early-warning",
    text: "Early warning that gives a caregiver the opportunity to act before the event.",
    tier: tier.research,
    source: "context:ai-future",
  },
  {
    id: "roadmap-adaptive-intervention",
    text: "Adaptive intervention that adjusts its response to the individual infant.",
    tier: tier.research,
    source: "context:ai-future",
  },
  {
    id: "roadmap-ai-guided-stimulation",
    text: "AI-guided modulation of vibrotactile stimulation.",
    tier: tier.research,
    source: "context:ai-future",
  },
  {
    id: "roadmap-closed-loop",
    text: "A closed loop that senses physiological state, estimates risk, intervenes and adapts.",
    tier: tier.research,
    source: "context:ai-future",
    caveat:
      "The entire adaptive predictive intervention concept is research / future development. It must never be presented as an established clinical capability.",
  },

  // ─────────────────────────────────────────────────────────────────────────
  // Context / motivation — deployment framing, not a product claim
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "context-lmic-access",
    text: "Apnoea monitoring is often unavailable or unaffordable in low- and middle-income settings, and manual monitoring is prone to human error.",
    tier: tier.today,
    source: "context:prototype",
  },
  {
    id: "context-clinical-false-alarms",
    text: "Published work from the same research line reports a high proportion of false central-apnoea alarms in clinical practice.",
    tier: tier.today,
    source: "context:research-literature",
    caveat: "This describes the published literature, not a measurement of NeoBreath.",
  },
];

/**
 * Claims that must NEVER appear on the site. Kept as executable documentation so
 * that a future contributor can see exactly what was removed and why.
 * Referenced by AGENTS.md §5.
 */
export const forbiddenClaims: { text: string; reason: string }[] = [
  {
    text: "Sudden Infant Death Syndrome (SIDS) prevention or risk reduction",
    reason:
      "Unsupported. The project context never establishes a SIDS claim, and implying one is a serious overreach for an unvalidated device.",
  },
  {
    text: "A central processing hub / multi-node architecture",
    reason:
      "The hub was removed. Processing moved onto the belt. The old site's architecture diagram is obsolete.",
  },
  {
    text: "Detection accuracy percentages (e.g. 85%)",
    reason: "Fabricated. No source in the project material supports a specific figure.",
  },
  {
    text: "Motion-artefact reduction percentages (e.g. 75%)",
    reason: "Fabricated. Artefact rejection is an open research problem, not a measured progress bar.",
  },
  {
    text: "Battery life figures (e.g. 6+ hours)",
    reason: "No source. The power budget is an identified open challenge.",
  },
  {
    text: "Safe for infants 0–12 months",
    reason: "No source. This is a regulatory/clinical assertion the project cannot make.",
  },
  {
    text: "Multi-infant nurse triage / prioritisation dashboard",
    reason:
      "Explicitly excluded from the current scope. The current model is one device to one infant.",
  },
  {
    text: "Clinically validated / medical-grade / proven",
    reason:
      "NeoBreath is not a completed clinical AI system. The AI component is being formulated; it is not validated yet.",
  },
  {
    text: "Stochastic resonance is the proven mechanism of the intervention",
    reason:
      "Therapeutic benefit of mechanical stimulation does not establish randomness as the active mechanism. Use 'informed by'.",
  },
];

/** Look up a registered claim by id. Throws loudly so a typo cannot ship. */
export function claim(id: string): Claim {
  const found = claims.find((c) => c.id === id);
  if (!found) {
    throw new Error(
      `[claims] Unknown claim id "${id}". Register it in content/claims.ts before using it.`
    );
  }
  return found;
}

/** Group claims by tier — used to render the roadmap rail. */
export function claimsByTier(t: ClaimTier): Claim[] {
  return claims.filter((c) => c.tier === t);
}

export default claims;
