import { color } from "../tokens";

/**
 * LoopRing — the closed-loop diagram for "The Closed Loop".
 *
 * Nodes sit on a circle and light in sequence. The ring is the argument: the
 * project is not adding a model to a monitor, it is closing a physiological
 * control loop. `predictiveFrom` exists so the animation can show `Predict`
 * being *added* to a loop that already works without it — which is exactly the
 * claims story.
 */

export interface LoopNode {
  label: string;
  detail: string;
  /** False for nodes that are future work; drawn dashed and dimmer. */
  real: boolean;
}

export default function LoopRing({
  size = 620,
  nodes,
  /** 0..n — how many nodes have lit. Fractional values cross-fade. */
  progress = 0,
  /** Per-node opacity multiplier, for nodes that fade in on a later beat. */
  nodeOpacity,
  style,
}: {
  /** Diameter of the RING. The SVG element is larger, to fit the labels. */
  size?: number;
  nodes: LoopNode[];
  progress?: number;
  nodeOpacity?: number[];
  style?: React.CSSProperties;
}) {
  /**
   * Labels sit outside the ring and are wide words ("Intervene", "Respiratory
   * signal, SpO2, heart rate"). An SVG clips at its own bounds, so the element
   * must be bigger than the ring or the labels get cut to "Interp" / "erve".
   * `pad` is the room reserved on every side for them.
   */
  const pad = size * 0.4;
  const box = size + pad * 2;
  const cx = box / 2;
  const cy = box / 2;
  const r = size * 0.5;
  const nodeR = size * 0.075;

  return (
    <svg width={box} height={box} viewBox={`0 0 ${box} ${box}`} style={style} overflow="visible">
      {/* The ring itself */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color.hairline} strokeWidth={3} />
      {/* Travelling arc showing loop direction */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color.primary}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeDasharray={`${r * 2 * Math.PI * Math.min(1, progress / nodes.length)} ${
          r * 2 * Math.PI
        }`}
        transform={`rotate(-90 ${cx} ${cy})`}
        opacity={0.85}
      />

      {nodes.map((n, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const lit = Math.max(0, Math.min(1, progress - i));
        const isFuture = !n.real;

        // Labels sit outside the ring, anchored so they grow away from it.
        const lx = cx + Math.cos(angle) * (r + nodeR + size * 0.045);
        const ly = cy + Math.sin(angle) * (r + nodeR + size * 0.045);
        const anchor =
          Math.abs(Math.cos(angle)) < 0.25 ? "middle" : Math.cos(angle) > 0 ? "start" : "end";
        const labelSize = size * 0.058;
        const detailSize = size * 0.042;

        /*
         * `watchingInk` for the future nodes, not `watching`: the base amber
         * measures 2.11:1 against the cream canvas, below the 3:1 that a
         * meaningful outline needs to be reliably seen.
         */
        const stroke = isFuture ? color.watchingInk : color.primary;
        const fill = lit > 0.5 ? stroke : isFuture ? color.watchingWash : color.primaryWash;

        return (
          <g key={n.label} opacity={(0.34 + lit * 0.66) * (nodeOpacity ? nodeOpacity[i] : 1)}>
            <circle
              cx={x}
              cy={y}
              r={nodeR + lit * size * 0.006}
              fill={fill}
              stroke={stroke}
              strokeWidth={2.6}
              strokeDasharray={isFuture ? "6 5" : undefined}
            />
            <text
              x={x}
              y={y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={size * 0.046}
              fontWeight={800}
              fill={lit > 0.5 ? "#fff" : stroke}
              fontFamily='"Plus Jakarta Sans", system-ui, sans-serif'
            >
              {i + 1}
            </text>

            <text
              x={lx}
              y={ly - labelSize * 0.15}
              textAnchor={anchor}
              fontSize={labelSize}
              fontWeight={700}
              fill={color.onSurface}
              fontFamily='"Plus Jakarta Sans", system-ui, sans-serif'
            >
              {n.label}
            </text>
            <text
              x={lx}
              y={ly + detailSize * 1.15}
              textAnchor={anchor}
              fontSize={detailSize}
              fontWeight={500}
              fill={color.muted}
              fontFamily='"Plus Jakarta Sans", system-ui, sans-serif'
            >
              {n.detail}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
