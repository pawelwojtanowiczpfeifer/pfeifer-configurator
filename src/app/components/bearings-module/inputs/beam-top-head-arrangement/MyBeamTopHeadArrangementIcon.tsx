import type { MyBearingsBeamTopHeadArrangement } from "../../model/types";

type MyBeamTopHeadArrangementIconProps = {
  arrangement: MyBearingsBeamTopHeadArrangement;
};

type BeamProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const OUTLINE_COLOR = "#71717A";
const SUPPORT_FILL = "#d4d4d4";
const BEAM_FILL = "url(#beam-hatch)";

function Beam({ x, y, width, height }: BeamProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={BEAM_FILL}
      stroke={OUTLINE_COLOR}
      strokeWidth="1"
    />
  );
}

function Support({ x, y, width, height }: BeamProps) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={SUPPORT_FILL}
      stroke={OUTLINE_COLOR}
      strokeWidth="1"
    />
  );
}

/**
 * Static selector-only schematics. They deliberately do not reuse geometry
 * from the calculation drawing, so this file remains safe to adjust visually.
 */
export default function MyBeamTopHeadArrangementIcon({
  arrangement,
}: MyBeamTopHeadArrangementIconProps) {
  return (
    <svg
      viewBox="0 0 132 82"
      fill="none"
      aria-hidden="true"
      className="h-12 w-full max-w-24"
    >
      <defs>
        <pattern
          id="beam-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 0 0 L 8 8" stroke="#a1a1aa" strokeWidth="1" />
          <path d="M 8 0 L 0 8" stroke="#a1a1aa" strokeWidth="1" />
        </pattern>
      </defs>

      {arrangement === "no-upstand" ? (
        <>
          <Beam x={25} y={12} width={80} height={30} />
          <Support x={25} y={45} width={45} height={37} />
        </>
      ) : null}

      {arrangement === "two-beams" ? (
        <>
          <Beam x={8} y={12} width={56} height={30} />
          <Beam x={68} y={12} width={56} height={30} />
          <Support x={44} y={45} width={45} height={37} />
        </>
      ) : null}

      {arrangement === "outer-head-upstand" ? (
        <>
          <rect x={25} y={45} width={45} height={37} fill={SUPPORT_FILL} />
          <rect x={25} y={12} width={12} height={33} fill={SUPPORT_FILL} />
          <path
            d="M 25 12 H 37 V 45 H 70 V 82 H 25 Z"
            fill="none"
            stroke={OUTLINE_COLOR}
            strokeWidth="1"
            strokeLinejoin="miter"
          />
          <Beam x={40} y={12} width={65} height={30} />
        </>
      ) : null}

      {arrangement === "three-sided-head-upstand" ? (
        <>
          <Support x={25} y={12} width={45} height={70} />
          <Beam x={70} y={12} width={35} height={30} />
        </>
      ) : null}
    </svg>
  );
}
