import { color } from "../tokens";

/**
 * BeltDiagram — a schematic of the wearable, not a drawing of a baby.
 *
 * Deliberately abstract. A realistic infant illustration in a medical-device
 * explainer invites scrutiny of the anatomy instead of the mechanism, and a
 * schematic reads at video-compression bitrates where a soft illustration turns
 * to mush.
 *
 * Props are all 0..1 so the composition owns the choreography.
 */
export default function BeltDiagram({
  width = 520,
  height = 560,
  /** Chest/abdomen expansion. */
  breath = 0.5,
  /** Sensing is active — the belt and foot module glow. */
  sensing = 1,
  /** On-board processing emphasis. */
  showMcu = 0,
  /** Foot module presence. */
  showFoot = 0,
  /** Vibrotactile intervention, radiated as rings. */
  ripple = 0,
  /** 0..1 opacity for the whole figure. */
  opacity = 1,
}: {
  width?: number;
  height?: number;
  breath?: number;
  sensing?: number;
  showMcu?: number;
  showFoot?: number;
  ripple?: number;
  opacity?: number;
}) {
  const cx = width / 2;
  // Expansion moves the abdomen edge outward by a couple of percent.
  const expand = 1 + breath * 0.055;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ opacity, display: "block" }}
    >
      <defs>
        <linearGradient id="nb-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDF3F1" />
          <stop offset="100%" stopColor="#DCE7E4" />
        </linearGradient>
        <clipPath id="nb-clip">
          <rect x="0" y="0" width={width} height={height} />
        </clipPath>
      </defs>

      <g clipPath="url(#nb-clip)">
        {/* Vibrotactile ripple, radiating from the belt */}
        {ripple > 0
          ? [0, 1, 2].map((i) => {
              const t = Math.max(0, Math.min(1, ripple * 1.6 - i * 0.28));
              if (t <= 0 || t >= 1) return null;
              return (
                <ellipse
                  key={i}
                  cx={cx}
                  cy={height * 0.55}
                  rx={110 + t * 130}
                  ry={70 + t * 88}
                  fill="none"
                  stroke={color.primary}
                  strokeWidth={3 - i * 0.6}
                  opacity={(1 - t) * 0.5}
                />
              );
            })
          : null}

        {/*
          Silhouette order matters: legs behind, torso, then the head OVERLAPS
          the shoulders. An earlier version drew a head on a neck stem, which
          read as a lightbulb rather than an infant.
        */}
        {/* Legs / feet, behind the torso */}
        {[-1, 1].map((side) => (
          <rect
            key={side}
            x={cx + side * 26 - 24}
            y={height * 0.795}
            width={48}
            height={height * 0.15}
            rx={22}
            fill="url(#nb-body)"
          />
        ))}

        {/* Torso — expands with the breath */}
        <path
          d={`M ${cx - 92 * expand} ${height * 0.30}
              C ${cx - 120 * expand} ${height * 0.40}, ${cx - 122 * expand} ${height * 0.62}, ${cx - 106 * expand} ${height * 0.80}
              Q ${cx} ${height * 0.845}, ${cx + 106 * expand} ${height * 0.80}
              C ${cx + 122 * expand} ${height * 0.62}, ${cx + 120 * expand} ${height * 0.40}, ${cx + 92 * expand} ${height * 0.30}
              Q ${cx} ${height * 0.255}, ${cx - 92 * expand} ${height * 0.30}
              Z`}
          fill="url(#nb-body)"
        />

        {/* Head, overlapping the shoulders so there is no neck stem */}
        <circle cx={cx} cy={height * 0.185} r={height * 0.1} fill="url(#nb-body)" />

        {/* Chest expansion indicator — a soft arc that widens on inhale */}
        <ellipse
          cx={cx}
          cy={height * 0.45}
          rx={72 * expand}
          ry={44 * expand}
          fill="none"
          stroke={color.primary}
          strokeWidth={2}
          opacity={0.12 + breath * 0.22}
          strokeDasharray="6 8"
        />

        {/* The respiratory sensing belt */}
        <g>
          <rect
            x={cx - 118 * expand}
            y={height * 0.56}
            width={236 * expand}
            height={34}
            rx={17}
            fill={color.primary}
            opacity={0.16 + sensing * 0.84}
          />
          <rect
            x={cx - 118 * expand}
            y={height * 0.56}
            width={236 * expand}
            height={34}
            rx={17}
            fill="none"
            stroke={color.primary}
            strokeWidth={2.5}
            opacity={0.5 + sensing * 0.5}
          />
          {/* Sensing pulse travelling along the belt */}
          <circle
            cx={cx - 100 * expand + 200 * expand * sensing}
            cy={height * 0.56 + 17}
            r={7}
            fill="#fff"
            opacity={sensing * 0.95}
          />

          {/* The on-board MCU — the point of the whole architecture */}
          <g opacity={0.25 + showMcu * 0.75}>
            <rect
              x={cx - 30}
              y={height * 0.545}
              width={60}
              height={48}
              rx={9}
              fill={color.surface}
              stroke={color.primary}
              strokeWidth={2.5}
            />
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={cx - 18 + c * 13}
                  y={height * 0.555 + r * 13}
                  width={9}
                  height={9}
                  rx={2}
                  fill={color.primary}
                  opacity={0.45 + showMcu * 0.55}
                />
              ))
            )}
            {[-1, 1].map((s) =>
              [0, 1, 2].map((i) => (
                <rect
                  key={`${s}-${i}`}
                  x={s < 0 ? cx - 40 : cx + 30}
                  y={height * 0.556 + i * 13}
                  width={10}
                  height={4}
                  rx={2}
                  fill={color.primary}
                  opacity={0.6}
                />
              ))
            )}
          </g>
        </g>

        {/* Foot module — a cuff on the ankle, orange so it reads as the second
            sensing site rather than as part of the belt */}
        <g opacity={showFoot}>
          <rect
            x={cx + 2}
            y={height * 0.855}
            width={70}
            height={30}
            rx={15}
            fill={color.secondary}
            opacity={0.22 + showFoot * 0.78}
          />
          <rect
            x={cx + 2}
            y={height * 0.855}
            width={70}
            height={30}
            rx={15}
            fill="none"
            stroke={color.secondary}
            strokeWidth={2.5}
          />
          <circle cx={cx + 37} cy={height * 0.855 + 15} r={5.5} fill="#fff" opacity={showFoot} />
        </g>
      </g>
    </svg>
  );
}
