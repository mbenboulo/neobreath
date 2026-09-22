/**
 * NeoBreath copy deck — the canonical website prose.
 *
 * This is a .ts module rather than a .md deck on purpose: components consume it
 * directly, so the words that are reviewed are the words that render. A separate
 * markdown deck would drift.
 *
 * Style rules (apply to all prose here):
 *   - American English clinical spelling: "apnea", "artifact", "program".
 *     Matches NeoBreath_Current_Project_Context.md and the cited literature.
 *   - Calm, precise, warm. No hype, no superlatives, no exclamation marks.
 *   - Short sentences. Name the limitation as readily as the capability.
 *   - Any string carrying a medical or capability claim MUST set `claimId`.
 *     See content/claims.ts and AGENTS.md §9 rule 4.
 */

import type { ClaimTier } from "../design/tokens";

export interface CopyLine {
  text: string;
  /** Registered claim backing this line. Renders a <ClaimBadge>. */
  claimId?: string;
  /** Overrides the badge tier (rare — only when a line spans tiers). */
  tier?: ClaimTier;
}

export interface StatPanel extends CopyLine {
  label: string;
}

export interface FlowNode {
  label: string;
  detail: string;
}

// ───────────────────────────────────────────────────────────────────────────
// Site-level
// ───────────────────────────────────────────────────────────────────────────

export const meta = {
  name: "NeoBreath",
  title: "NeoBreath — Wearable monitoring and intervention for apnea of prematurity",
  description:
    "NeoBreath is a wearable monitoring and intervention system being developed for apnea of prematurity: a respiratory sensing belt with on-board processing, a foot-worn SpO2 and heart-rate module, and a mobile app.",
  /**
   * Rendered in the footer and anywhere an at-a-glance honesty note is needed.
   *
   * NOTE ON "YET": the project is at prototype stage, so validation is ahead of
   * it rather than absent from it. "Not clinically validated" reads as a permanent
   * deficiency; "not clinically validated yet" is the same factual statement about
   * the present, plus the stage that explains why. Keep this framing consistent —
   * see AGENTS.md §9 rule 13.
   */
  disclaimer:
    "NeoBreath is a research and development project at the prototype stage. It is not a medical device, it has not been clinically validated yet, and it is not a replacement for professional care.",
} as const;

export const nav = [
  { label: "The problem", href: "/#problem" },
  { label: "Technology", href: "/technology" },
  { label: "AI & research", href: "/research" },
  { label: "Evidence", href: "/evidence" },
  { label: "About", href: "/about" },
] as const;

export const cta = {
  exploreTechnology: "Explore the technology",
  readResearch: "Read the research direction",
  support: "Support the work",
  talkToTeam: "Talk to the team",
  watch: "Watch the animation",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// Act I — The Pause (hero)
// ───────────────────────────────────────────────────────────────────────────

export const hero = {
  eyebrow: "Apnea of prematurity",
  title: "Apnea of prematurity is quiet. That is the problem.",
  lede:
    "NeoBreath is a wearable monitoring and intervention system being developed for premature infants: a respiratory sensing belt that processes signals on board, a foot-worn SpO2 and heart-rate module, and a mobile app for the people at the bedside.",
  statusNote: "In development — not yet clinically validated.",
  /** Caption emitted beneath the hero animation, on-screen at all times. */
  animationCaption:
    "Illustrative animation of the intended system behavior. Values shown are representative, not measured clinical data.",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// Act II — Why It Happens
// ───────────────────────────────────────────────────────────────────────────

export const problem = {
  eyebrow: "The problem",
  title: "A pause the room cannot see",
  body:
    "Apnea of prematurity is a pause in breathing that is common in infants born early, and it often arrives alongside bradycardia and falling oxygen saturation. The infant cannot ask for help. In a busy nursery, the gap between two breaths is not something a person can watch for continuously.",
  panels: [
    {
      label: "Prematurity",
      text:
        "Apnea of prematurity affects preterm infants, whose control of breathing is still developing.",
    },
    {
      label: "Attention",
      text:
        "Manual observation depends on a person watching. Human attention is not continuous, and it is not meant to be.",
    },
    {
      label: "False alarms",
      text:
        "Published work from the same research line reports a high proportion of false central-apnea alarms in clinical practice.",
      claimId: "context-clinical-false-alarms",
    },
    {
      label: "Access",
      text:
        "Apnea monitoring is often unavailable or unaffordable in low- and middle-income settings, and manual monitoring is prone to human error.",
      claimId: "context-lmic-access",
    },
  ] satisfies StatPanel[],
  /**
   * A deliberate trust device: stating the limits is part of the argument.
   * Sourced from AGENTS.md §5 (deleted claims) and the context doc's scope notes.
   */
  notTitle: "What NeoBreath is not",
  notList: [
    "Not a SIDS prevention device. We make no claim about sudden infant death.",
    "Not a consumer baby monitor.",
    "Not a multi-infant nurse triage platform. That was deliberately excluded from the current scope.",
    "Not clinically validated yet, and not a replacement for professional care.",
  ],
} as const;

// ───────────────────────────────────────────────────────────────────────────
// Act III — The System
// ───────────────────────────────────────────────────────────────────────────

export const system = {
  eyebrow: "The system",
  title: "One belt. One foot module. One app. One infant.",
  body:
    "The belt senses respiration and interprets the signal on board. A module worn on the foot tracks oxygen saturation and heart rate. The app is the caregiver's window into both. There is no separate processing hub, and no dependence on a cloud round-trip.",
  flow: [
    { label: "Sense", detail: "Respiration, SpO2, heart rate" },
    { label: "Interpret", detail: "On the belt's microcontroller" },
    { label: "Intervene", detail: "Vibrotactile stimulation" },
    { label: "Notify", detail: "To the caregiver's app" },
  ] satisfies FlowNode[],
  components: [
    {
      name: "Respiratory sensing belt",
      text:
        "Sensing of chest and abdominal movement, with signal processing running on the belt's own microcontroller rather than in a separate box.",
      claimId: "onboard-processing",
    },
    {
      name: "Foot-worn module",
      text:
        "A second physiological channel — oxygen saturation and heart rate — so that interpretation has more than one signal to reason over.",
      claimId: "foot-spo2-hr",
    },
    {
      name: "On-board processing",
      text:
        "Interpreting on the wearable means lower latency, less dependence on connectivity, and raw physiology that does not have to leave the device.",
      claimId: "ai-edge-inference",
    },
    {
      name: "Vibrotactile intervention",
      text:
        "When an event is detected, the belt applies gentle mechanosensory stimulation to the infant.",
      claimId: "vibrotactile-intervention",
    },
    {
      name: "Mobile app",
      text:
        "A live breathing waveform, current vitals, event alerts and history — written for a caregiver who is tired and standing up.",
      claimId: "wireless-to-app",
    },
    {
      name: "One device, one infant",
      text:
        "The current scope is deliberately a single infant per device. Prioritizing many infants for one nurse is not part of this work.",
      claimId: "one-device-one-infant",
    },
  ] satisfies { name: string; text: string; claimId?: string }[],
} as const;

// ───────────────────────────────────────────────────────────────────────────
// Act IV — The Intelligence
// ───────────────────────────────────────────────────────────────────────────

export const intelligence = {
  eyebrow: "The AI",
  title: "Telling a real pause apart from a kicking leg",
  body:
    "A wearable does not produce a clean physiological signal. An infant moving can generate a pattern that resembles deterioration. A fixed threshold cannot tell the difference — and that is what drives false alarms.",
  workTitle: "What we are working on now",
  work: [
    {
      name: "Artifact rejection",
      text:
        "Decide whether a fall in the respiratory signal reflects a genuine event or a sensor artifact.",
      claimId: "ai-artifact-rejection",
    },
    {
      name: "Signal classification",
      text:
        "Reason over respiratory morphology, oxygen saturation and heart rate together, rather than one channel alone.",
      claimId: "ai-signal-classification",
    },
    {
      name: "Fewer false alarms",
      text:
        "The purpose is a more trustworthy alarm, not a demonstration of machine learning.",
      claimId: "ai-false-alarm-reduction",
    },
    {
      name: "Inference at the edge",
      text: "Run the model on the wearable, inside its processing and power budget.",
      claimId: "ai-edge-inference",
    },
  ] satisfies { name: string; text: string; claimId: string }[],
  modelsTitle: "Candidate model families",
  models:
    "Decision trees, regularized logistic regression, small gradient-boosted models, and lightweight neural networks.",
  modelsCaveat:
    "No specific model has been established as the final NeoBreath model. This is an open question, not a settled design.",
  /** Stochastic resonance needs unusually careful wording. Do not simplify. */
  stimulationTitle: "On the stimulation",
  stimulation: [
    {
      text:
        "We are exploring gentle vibrotactile mechanosensory stimulation, informed by research into mechanical stimulation and stochastic resonance in apnea of prematurity.",
      claimId: "intervention-mechanosensory",
    },
    {
      text:
        "The therapeutic benefit of mechanical stimulation does not establish that randomness is itself the active mechanism. We treat that as an open scientific question.",
    },
  ] satisfies CopyLine[],
  provenanceTitle: "Where this direction comes from",
  provenance: [
    {
      text:
        "This direction is informed by published research on machine-learning-based central apnea detection in premature infants, including work by Varisco et al.",
      claimId: "ai-literature-informed",
    },
    {
      text:
        "We cite that literature as evidence that the approach is worth pursuing. It is not evidence about NeoBreath.",
    },
  ] satisfies CopyLine[],
} as const;

// ───────────────────────────────────────────────────────────────────────────
// Act V — The Direction
// ───────────────────────────────────────────────────────────────────────────

export const direction = {
  eyebrow: "Roadmap",
  title: "Three levels of response",
  body:
    "Today NeoBreath reacts. The research direction is preventive, and then adaptive — each level depending on the one before it.",
  levels: [
    {
      level: "Level 1",
      name: "Reactive",
      rule: "Event detected → tactile stimulation",
      text:
        "The system detects an apnea event and responds. This is closest to what the current prototype does.",
      tier: "TODAY" as ClaimTier,
      claimId: "vibrotactile-intervention",
    },
    {
      level: "Level 2",
      name: "Preventive",
      rule: "Rising risk → preventive stimulation",
      text:
        "The system identifies increasing risk before a full event and intervenes earlier. This depends on predictive AI that does not exist yet.",
      tier: "RESEARCH" as ClaimTier,
      claimId: "roadmap-predictive-risk",
    },
    {
      level: "Level 3",
      name: "Adaptive",
      rule: "Individual baseline + predicted risk → individualized response",
      text:
        "The system learns one infant's respiratory behavior and adjusts its response to that infant.",
      tier: "RESEARCH" as ClaimTier,
      claimId: "roadmap-adaptive-intervention",
    },
  ],
  loopTitle: "The loop we are working toward",
  loop: [
    { label: "Sense", detail: "Respiratory signal, SpO2, heart rate" },
    { label: "Interpret", detail: "Separate event from artifact" },
    { label: "Predict", detail: "Estimate rising risk — research" },
    { label: "Intervene", detail: "Stimulation, preventive or reactive" },
    { label: "Observe", detail: "Did the infant respond?" },
    { label: "Adapt", detail: "Update the individual baseline — research" },
  ] satisfies FlowNode[],
  railTitle: "Where the project stands",
  rail: [
    {
      when: "Today",
      tier: "TODAY" as ClaimTier,
      text:
        "Wearable monitoring and intervention architecture, with AI development focused on signal and artifact interpretation.",
    },
    {
      when: "Next",
      tier: "IN DEVELOPMENT" as ClaimTier,
      text: "Infant-specific models and improved discrimination between events and artifacts.",
      claimId: "roadmap-personalised-models",
    },
    {
      when: "Later",
      tier: "RESEARCH" as ClaimTier,
      text: "Predictive apnea-risk estimation and early warning.",
      claimId: "roadmap-predictive-risk",
    },
    {
      when: "Longer-term research",
      tier: "RESEARCH" as ClaimTier,
      text:
        "Predictive, personalized control of vibrotactile stimulation inside a closed loop.",
      claimId: "roadmap-closed-loop",
    },
  ],
} as const;

// ───────────────────────────────────────────────────────────────────────────
// Act VI — Evidence & the ask
// ───────────────────────────────────────────────────────────────────────────

export const evidence = {
  eyebrow: "Evidence",
  title: "What we have actually built",
  body:
    "A working prototype, shown in public. The findings below include the parts that did not work, because those are the ones we are working on.",
  results: [
    {
      text: "Wireless transmission of sensor data to the mobile app works.",
      claimId: "prototype-bluetooth",
    },
    {
      text: "The breathing waveform is visualised in the app in real time.",
      claimId: "prototype-live-waveform",
    },
    {
      text: "The alarm fires and reaches the caregiver when an apneic event is detected.",
      claimId: "prototype-alarm-worked",
    },
    {
      text:
        "The belt picks up abdominal movement, but sensitivity is not yet where it needs to be.",
      claimId: "prototype-sensitivity-gap",
    },
  ] satisfies CopyLine[],
  showcaseTitle: "Shown at the Pediatric Society of Ghana",
  showcaseBody:
    "The prototype was presented at the Pediatric Society of Ghana conference on prematurity.",
  postsTitle: "Project posts",
  postsBody: "Two write-ups from the team, embedded from LinkedIn.",
  supportTitle: "Support the work",
  supportBody:
    "NeoBreath is being developed at KNUST with the DIPPER Lab. If you work in neonatal care, medical devices, or signal processing, we would like to hear from you.",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// /technology — the deep dive
// ───────────────────────────────────────────────────────────────────────────

export const technologyPage = {
  eyebrow: "Technology",
  title: "How the system is put together",
  lede:
    "Sensing, signal processing, event detection, intervention and notification — and where each part currently stands.",
  stages: [
    {
      name: "Sensing",
      text:
        "The belt senses chest and abdominal movement. A foot-worn module adds oxygen saturation and heart rate as a second, independent channel.",
      claimId: "belt-respiratory-sensing",
    },
    {
      name: "On-board processing",
      text:
        "The signal is filtered and interpreted on the belt's own microcontroller. There is no separate hub, and no cloud round-trip in the detection path.",
      claimId: "onboard-processing",
    },
    {
      name: "Event detection",
      text:
        "The system decides whether a change in the respiratory signal represents a genuine event or a sensor artifact.",
      claimId: "ai-artifact-rejection",
    },
    {
      name: "Intervention",
      text:
        "When an event is detected, the belt applies gentle vibrotactile mechanosensory stimulation.",
      claimId: "vibrotactile-intervention",
    },
    {
      name: "Notification",
      text:
        "The wearable connects wirelessly to a mobile app, which shows the live trace, current vitals and event history.",
      claimId: "wireless-to-app",
    },
  ],
  focusTitle: "Current engineering focus",
  focusIntro:
    "The prototype works; these are the parts that do not yet work well enough. They are listed as open problems rather than as progress bars, because a percentage would imply a measurement we have not made.",
  focus: [
    {
      name: "Belt sensitivity",
      text:
        "The belt picks up abdominal movement, but sensitivity is not yet where it needs to be for reliable event detection.",
      claimId: "prototype-sensitivity-gap",
    },
    {
      name: "The processing and power budget",
      text:
        "Fitting sensing, wireless communication and eventual on-device inference inside the belt is an open constraint, not a solved one.",
      claimId: "onboard-processing",
    },
    {
      name: "Signal interpretation",
      text:
        "Distinguishing a true event from motion artifact is the active research problem, and the reason false alarms are the focus.",
      claimId: "ai-false-alarm-reduction",
    },
  ],
  /** Explicitly retired language. Kept visible so the correction is on the record. */
  correctedTitle: "Corrected from an earlier description",
  corrected:
    "Earlier material described a separate processing hub and a multi-node architecture. Processing has since moved onto the belt itself, and the hub is no longer part of the design. Earlier material also cited detection-accuracy, artifact-reduction and battery figures that were not measured. They have been removed rather than restated.",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// /research — the AI direction and the roadmap
// ───────────────────────────────────────────────────────────────────────────

export const researchPage = {
  eyebrow: "Research",
  title: "The AI direction, and how far along it is",
  lede:
    "What we are working on now, what is merely proposed, and the published work that informs the direction.",
  framingTitle: "Why false alarms are the first problem",
  framing:
    "A wearable does not produce a clean physiological signal. An infant moving can generate a pattern that resembles deterioration, and a fixed threshold cannot tell the difference. Published work from the same research line reports a high proportion of false central-apnea alarms in clinical practice — the problem is not a shortage of alarms.",
  literatureTitle: "Published work we draw on",
  literature: [
    {
      text:
        "Varisco et al., on machine-learning-based central apnea detection in premature infants — evidence that the approach is worth pursuing.",
      claimId: "ai-literature-informed",
    },
    {
      text:
        "Work reporting a high proportion of false central-apnea alarms in clinical practice, which frames the false-alarm problem as the priority.",
      claimId: "context-clinical-false-alarms",
    },
    {
      text:
        "Smith et al. (2015) and Zeldich et al. (2021), on mechanical stimulation and stochastic resonance in apnea of prematurity — informing the intervention work.",
      claimId: "intervention-mechanosensory",
    },
  ],
  notClaimedTitle: "What this page does not claim",
  notClaimed: [
    "That NeoBreath has demonstrated clinical performance comparable to any published study.",
    "That a specific model has been selected — the candidate families are an open question.",
    "That predictive risk estimation or adaptive stimulation exist. They are proposed.",
    "That randomness is the proven mechanism of the intervention. That remains an open scientific question.",
  ],
} as const;

// ───────────────────────────────────────────────────────────────────────────
// /evidence — what has been built and shown
// ───────────────────────────────────────────────────────────────────────────

export const evidencePage = {
  eyebrow: "Evidence",
  title: "What has been built and shown",
  lede:
    "Prototype findings, the public showcase, and the team's own write-ups.",
  resultsTitle: "Prototype findings",
  resultsIntro:
    "Recorded as they are, including the finding that the sensing is not yet good enough.",
  showcaseTitle: "Shown at the Pediatric Society of Ghana",
  showcaseBody:
    "The prototype was presented at the Pediatric Society of Ghana conference on prematurity. Both recordings from that showcase are below.",
  postsTitle: "Project posts",
  postsBody:
    "Two write-ups from the team. If the embeds below do not load, the links open them directly on LinkedIn.",
  /** Verified live at the time of writing; the embed degrades to a link if not. */
  posts: [
    {
      url: "https://lnkd.in/p/dxn525Fn",
      label: "Project and prototype showcase explanation by our research associate",
    },
    {
      url: "https://lnkd.in/p/dCE8pbgg",
      label: "NeoBreath showcased at the Pediatric Society of Ghana prematurity conference",
    },
  ],
  /**
   * Copied into `public/conference/`, NOT `public/videos/`.
   *
   * `.gitignore` contains a bare `videos` pattern, which matches a directory of
   * that name at ANY depth — so `public/videos/` would be ignored and these
   * would 404 on a deployed build while working perfectly in local dev.
   */
  videos: [
    {
      src: "/conference/pediatric-society-of-ghana-conference-neobreath.mp4",
      label: "NeoBreath at the Pediatric Society of Ghana prematurity conference",
    },
    {
      src: "/conference/pediatric-society-of-ghana-conference-neobreath-research-associate.mp4",
      label: "Prototype walkthrough by the NeoBreath research associate",
    },
  ],
} as const;

// ───────────────────────────────────────────────────────────────────────────
// /about — who is building it
// ───────────────────────────────────────────────────────────────────────────

export const aboutPage = {
  eyebrow: "About",
  title: "Who is building this",
  lede:
    "NeoBreath is developed at KNUST with the DIPPER Lab, as an engineering and research project rather than a product launch.",
  labTitle: "Where the work happens",
  labBody:
    "The project sits in the DIPPER Lab at Kwame Nkrumah University of Science and Technology. It is a hardware, signal-processing and clinical-collaboration effort, and it is early.",
  teamTitle: "The team",
  teamBody:
    "The prototype has been built and presented by the project's research associate together with the supervising team at the lab. A full roster is being prepared; in the meantime, contact goes to the team directly.",
  collaborateTitle: "Ways to be involved",
  collaborate: [
    {
      name: "Clinical collaboration",
      text: "If you work in neonatal care, we would like to understand the alarm burden you actually experience.",
    },
    {
      name: "Signal processing and ML",
      text: "Artifact rejection on low-power wearable hardware is the open technical problem.",
    },
    {
      name: "Hardware and power",
      text: "Fitting sensing, radio and inference inside the belt's power budget is unsolved.",
    },
    {
      name: "Support and funding",
      text: "The project is developed without commercial backing at this stage.",
    },
  ],
} as const;

export const copy = {
  meta,
  nav,
  cta,
  hero,
  problem,
  system,
  intelligence,
  direction,
  evidence,
  technologyPage,
  researchPage,
  evidencePage,
  aboutPage,
};

export default copy;
