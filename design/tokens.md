# NeoBreath design tokens

The brand has exactly one source of truth: `design/tokens.ts`.

Two consumers read it:

| Consumer | How it gets the tokens |
| --- | --- |
| **Website** (this repo) | `app/globals.css` mirrors the values into Tailwind v4 `@theme`, producing utilities like `bg-nb-canvas`, `text-nb-primary`, `shadow-nb-warm`, `rounded-nb-card`. Components may also `import { color } from "@/design/tokens"` for values that must exist in JS (SVG fills, canvas, chart strokes). |
| **Animations** (`..\remotion`) | A generated mirror at `..\remotion\src\neobreath\tokens.ts`. |

```bash
npm run tokens:sync    # regenerate the Remotion mirror
npm run tokens:check   # verify no drift — exit 1 if the mirror is stale
```

## Why there is a mirror at all

The Remotion project is a **sibling** directory, outside this workspace's module
resolution and outside its write sandbox. It cannot `import` from here. Rather
than let the animations invent their own palette and slowly diverge from the
website, we generate an identical copy and fail CI on drift.

This duplication is a known, accepted cost of the project layout. If the two
projects are ever unified into one workspace, delete the mirror and import
directly.

**Never edit the mirror.** It is regenerated and its header says so.

## Canonical values

Full list in `design/tokens.ts`. The load-bearing ones:

### Surfaces and text

| Token | Value | Notes |
| --- | --- | --- |
| `canvas` | `#FBF4E8` | Warm cream. Avoids cold blue glare at the bedside. |
| `surface` | `#FFFFFF` | Primary data cards. |
| `surfaceWarm` | `#FDFBF7` | Nested / quiet secondary groups. |
| `hairline` | `#EAE3D5` | Soft warm divider. **Replaces hard borders entirely.** |
| `onSurface` | `#25313B` | Deep charcoal. Never pure black — too harsh on cream. |
| `muted` | `#64748B` | Units, timestamps, secondary context. |

### Brand

| Token | Value | Notes |
| --- | --- | --- |
| `primary` | `#0F766E` | Deep teal. Nav, primary buttons, authoritative metric labels. |
| `secondary` | `#F4805D` | Warm coral. Accents, active toggles, urgent caregiver prompts. |
| `ink` | `#0B2B28` | Dark editorial surface, for contrast sections only. |

### Status

| Token | Value | Shape partner (required) |
| --- | --- | --- |
| `normal` | `#2F9E64` | filled check / continuous ring |
| `watching` | `#E3A83B` | amber triangle / pulsing dash |
| `critical` | `#D64545` | solid octagon / gentle strobe |

**The accessibility rule is not optional.** Color is never the only carrier of
state. Every status render must pair its hue with the shape above, so the state
survives greyscale, color-blindness, and a dim nursery at 3am.

## Typography

- **Family:** Plus Jakarta Sans (400/500/600/700/800). Replaces Manrope.
- **Vital scale** (`vitalLg` … `vitalMdMobile`): weight 800, tight negative
  tracking, and **tabular numerals** via the `vital-numerals` utility. Live
  physiological values must not jitter as telemetry streams, and must stay
  legible from across a room.
- **Labels:** `labelSm` is uppercase-ish micro type for chips; track it out.

## Elevation

Depth comes from warm ambient shadow and luminance, never from a hard outline.

| Token | Use |
| --- | --- |
| `shadow-nb-warm` | Cards and tiles at rest. |
| `shadow-nb-pill` | Floating pills, drawers, active filter states. |
| `shadow-nb-alert` | Critical event active — a tinted aura, not a red border. |
| `shadow-nb-calm` | Normal event active — the calm counterpart to `alert`. |

## Known discrepancy, already resolved

`stitch_.../neobreath/DESIGN.md` contradicts itself: its YAML frontmatter says
`surface: #f6f9ff` and `primary: #005c55`, while its prose says canvas `#FBF4E8`
and primary `#0F766E`.

**The prose wins**, because the prose and the dashboard `code.html` agree with
each other and with the rendered screens. The frontmatter appears to be a generic
Material-3 seed that was never updated.

If the frontmatter was in fact the newer intent, this is a one-line change here
plus a regenerated mirror — but it would shift the entire palette from warm to
cool, so confirm before assuming.

## Migration note

`app/globals.css` currently carries a **LEGACY** `@theme` block holding the
pre-rebrand names (`--color-background`, `--color-primary: #13ec5b`, etc.) so the
un-migrated pages keep rendering during the rebuild. Delete that block — and flip
`body` to `var(--color-nb-canvas)` — in Phase 3, once every component uses `nb-*`.
