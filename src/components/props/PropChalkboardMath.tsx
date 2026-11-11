import React from 'react';
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';

export interface PropChalkboardMathProps {
  /** Width in pixels (Default: 800) */
  width?: number;
  /** Height in pixels (Default: 466) */
  height?: number;
  /** Frame at which procedural chalkboard animation begins (Default: 10) */
  revealStartFrame?: number;
  /** Total frame duration for complete reveal of graph & calculus formulas (Default: 45) */
  revealDuration?: number;
  /** Asset path to empty chalkboard frame SVG (Default: 'props/prop_chalkboard_empty_master.svg') */
  boardFrameSvgPath?: string;
  /** Optional container style overrides */
  style?: React.CSSProperties;
  /** Optional container className */
  className?: string;
}

/**
 * Procedural CSAT Chalkboard Solver Component (Bảng đen giải toán Remotion).
 * Renders prop_chalkboard_empty_master.svg as base container, procedurally revealing
 * coordinate axes (x, y) and cubic polynomial curve f(x) = x³ - 3x with real-time chalk stroke animation.
 */
export const PropChalkboardMath: React.FC<PropChalkboardMathProps> = ({
  width = 800,
  height = 466,
  revealStartFrame = 10,
  revealDuration = 45,
  boardFrameSvgPath = 'props/prop_chalkboard_empty_master.svg',
  style,
  className,
}) => {
  const frame = useCurrentFrame();

  // Smooth easing curve specified in foundry task: Easing.bezier(0.16, 1, 0.3, 1)
  const chalkEasing = Easing.bezier(0.16, 1, 0.3, 1);

  // Proportional timeline choreography across revealDuration
  const start = revealStartFrame;
  const duration = Math.max(1, revealDuration);

  // 1. Coordinate Axes Stroke-Dash Reveal (White chalk #F8FAFC)
  const axisXLength = 990; // Line from x1=100 to x2=1090
  const axisXStart = start;
  const axisXEnd = start + Math.round(duration * 0.28);
  const axisXOffset = interpolate(frame, [axisXStart, axisXEnd], [axisXLength, 0], {
    easing: chalkEasing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const axisYLength = 480; // Line from y1=570 to y2=90
  const axisYStart = start + Math.round(duration * 0.08);
  const axisYEnd = start + Math.round(duration * 0.36);
  const axisYOffset = interpolate(frame, [axisYStart, axisYEnd], [axisYLength, 0], {
    easing: chalkEasing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Axis Labels & Grid markers fade-in
  const axesLabelsOpacity = interpolate(
    frame,
    [start + Math.round(duration * 0.22), start + Math.round(duration * 0.4)],
    [0, 1],
    {
      easing: chalkEasing,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // 2. Cubic Polynomial Curve f(x) = x³ - 3x (White chalk #F8FAFC)
  // Exact arc length of cubic bezier is ~1345.2px
  const curveLength = 1350;
  const curveStart = start + Math.round(duration * 0.25);
  const curveEnd = start + Math.round(duration * 0.85);
  const curveOffset = interpolate(frame, [curveStart, curveEnd], [curveLength, 0], {
    easing: chalkEasing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. CSAT Calculus Formulas Reveal (Title & Derivative)
  const formulaStart = start + Math.round(duration * 0.55);
  const formulaEnd = start + Math.round(duration * 0.88);
  const formulaOpacity = interpolate(frame, [formulaStart, formulaEnd], [0, 1], {
    easing: chalkEasing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Formula underline stroke animation
  const underlineLength = 310;
  const underlineOffset = interpolate(frame, [formulaStart, formulaEnd], [underlineLength, 0], {
    easing: chalkEasing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Critical Peak Target (Local Maximum at x = -1, y = 2 -> canvas [560, 180])
  const peakStart = start + Math.round(duration * 0.65);
  const peakEnd = start + duration;

  // Tangent horizontal line at extremum [f'(-1) = 0]
  const tangentLength = 170; // x: 475 -> 645
  const tangentOffset = interpolate(frame, [peakStart, peakEnd], [tangentLength, 0], {
    easing: chalkEasing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Projection line down to X-axis [x = -1]
  const projectionLength = 280; // y: 180 -> 460
  const projectionOffset = interpolate(frame, [peakStart, peakEnd], [projectionLength, 0], {
    easing: chalkEasing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Pulsating highlight badge around maximum point
  const peakScale = interpolate(
    frame,
    [peakStart + Math.round(duration * 0.1), start + duration],
    [0, 1],
    {
      easing: chalkEasing,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const pulseRadius = 20 + Math.sin(frame * 0.2) * 3;
  const pulseOpacity = interpolate(
    frame,
    [start + duration - 5, start + duration],
    [0.4, 0.85],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Local minimum point at [850, 420]
  const minPointScale = interpolate(
    frame,
    [start + Math.round(duration * 0.75), start + duration],
    [0, 1],
    {
      easing: chalkEasing,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Safely resolve SVG asset URL for Remotion
  const resolvedFrameSrc =
    boardFrameSvgPath &&
    (boardFrameSvgPath.startsWith('http') || boardFrameSvgPath.startsWith('data:')
      ? boardFrameSvgPath
      : staticFile(boardFrameSvgPath));

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        boxSizing: 'border-box',
        overflow: 'hidden',
        ...style,
      }}
      className={className}
    >
      {/* Outer Container Base: prop_chalkboard_empty_master.svg via Remotion Img */}
      {resolvedFrameSrc && (
        <Img
          src={resolvedFrameSrc}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Procedural Mathematical Chalkboard Drawing Layer */}
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          {/* Subtle Chalk Glow Filter */}
          <filter id="chalk-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="#F8FAFC" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* ================================================================== */}
        {/* 1. COORDINATE GRID & AXES (Chalk Lines: #F8FAFC, #34D399)         */}
        {/* ================================================================== */}
        <g id="chalk_grid_and_axes">
          {/* Faint Dashed Minor Grid Lines */}
          <g opacity={axesLabelsOpacity * 0.22}>
            <line x1="120" y1="180" x2="1080" y2="180" stroke="#34D399" strokeWidth="1" strokeDasharray="4,8" />
            <line x1="120" y1="280" x2="1080" y2="280" stroke="#34D399" strokeWidth="1" strokeDasharray="4,8" />
            <line x1="120" y1="380" x2="1080" y2="380" stroke="#34D399" strokeWidth="1" strokeDasharray="4,8" />
            <line x1="420" y1="70" x2="420" y2="570" stroke="#34D399" strokeWidth="1" strokeDasharray="4,8" />
            <line x1="700" y1="70" x2="700" y2="570" stroke="#34D399" strokeWidth="1" strokeDasharray="4,8" />
            <line x1="980" y1="70" x2="980" y2="570" stroke="#34D399" strokeWidth="1" strokeDasharray="4,8" />
          </g>

          {/* Main X-Axis: Real-Time Chalk Stroke Animation */}
          <line
            x1="100"
            y1="460"
            x2="1090"
            y2="460"
            stroke="#F8FAFC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={axisXLength}
            strokeDashoffset={axisXOffset}
            filter="url(#chalk-glow)"
          />

          {/* X-Axis Arrowhead */}
          <polygon
            points="1090,455 1105,460 1090,465"
            fill="#F8FAFC"
            opacity={axesLabelsOpacity}
          />
          <text
            x="1102"
            y="492"
            fill="#F8FAFC"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
            fontSize="24"
            opacity={axesLabelsOpacity}
          >
            x
          </text>

          {/* Main Y-Axis: Real-Time Chalk Stroke Animation */}
          <line
            x1="260"
            y1="570"
            x2="260"
            y2="90"
            stroke="#F8FAFC"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={axisYLength}
            strokeDashoffset={axisYOffset}
            filter="url(#chalk-glow)"
          />

          {/* Y-Axis Arrowhead */}
          <polygon
            points="255,90 260,75 265,90"
            fill="#F8FAFC"
            opacity={axesLabelsOpacity}
          />
          <text
            x="225"
            y="85"
            fill="#F8FAFC"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
            fontSize="24"
            opacity={axesLabelsOpacity}
          >
            y
          </text>

          {/* Origin Marker 'O' */}
          <text
            x="232"
            y="488"
            fill="#F8FAFC"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="600"
            fontSize="20"
            opacity={axesLabelsOpacity * 0.8}
          >
            O
          </text>
        </g>

        {/* ================================================================== */}
        {/* 2. CUBIC POLYNOMIAL CURVE: f(x) = x³ - 3x (White Chalk #F8FAFC)    */}
        {/* ================================================================== */}
        <g id="chalk_polynomial_curve">
          <path
            d="M 140,530 C 250,510 380,180 560,180 C 690,180 730,420 850,420 C 940,420 1000,260 1080,120"
            stroke="#F8FAFC"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={curveLength}
            strokeDashoffset={curveOffset}
            filter="url(#chalk-glow)"
          />
        </g>

        {/* ================================================================== */}
        {/* 3. AUTHENTIC CSAT FORMULAS & CALCULUS RULES                       */}
        {/* ================================================================== */}
        <g id="chalk_formulas" opacity={formulaOpacity}>
          {/* Main Function Formula: f(x) = x³ - 3x */}
          <text
            x="100"
            y="115"
            fill="#F8FAFC"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="26"
            letterSpacing="0.5"
          >
            f(x) = x³ − 3x
          </text>
          {/* Real-time chalk underline */}
          <line
            x1="98"
            y1="126"
            x2="408"
            y2="126"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={underlineLength}
            strokeDashoffset={underlineOffset}
          />

          {/* First Derivative Rule: f'(x) = 3x² - 3 = 0 */}
          <text
            x="710"
            y="115"
            fill="#34D399"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
            fontSize="22"
            letterSpacing="0.5"
          >
            f′(x) = 3x² − 3 = 0
          </text>

          {/* Extrema coordinates rule: x = ±1 */}
          <text
            x="710"
            y="145"
            fill="#FEF08A"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="600"
            fontSize="18"
          >
            ⇒ x = −1 (MAX) , x = 1 (MIN)
          </text>
        </g>

        {/* ================================================================== */}
        {/* 4. LOCAL MINIMUM POINT (x = 1, y = -2 -> canvas [850, 420])       */}
        {/* ================================================================== */}
        <g id="chalk_min_point" opacity={minPointScale}>
          <circle cx="850" cy="420" r="6" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
          <text
            x="850"
            y="455"
            textAnchor="middle"
            fill="#38BDF8"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="18"
          >
            MIN (1, −2)
          </text>
        </g>

        {/* ================================================================== */}
        {/* 5. CRITICAL PEAK TARGET: LOCAL MAXIMUM (canvas [560, 180])         */}
        {/* ================================================================== */}
        <g id="chalk_critical_peak" opacity={peakScale}>
          {/* Dashed Vertical Projection Line to X-Axis */}
          <line
            x1="560"
            y1="180"
            x2="560"
            y2="460"
            stroke="#F87171"
            strokeWidth="2"
            strokeDasharray="6,4"
            strokeDashoffset={projectionOffset}
            opacity="0.75"
          />

          {/* Horizontal Tangent Line at Extremum [f'(-1) = 0] */}
          <line
            x1="475"
            y1="180"
            x2="645"
            y2="180"
            stroke="#FEF08A"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={tangentLength}
            strokeDashoffset={tangentOffset}
          />

          {/* Pulsating Target Accent Rings */}
          <circle
            cx="560"
            cy="180"
            r={pulseRadius}
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            opacity={pulseOpacity}
          />
          <circle
            cx="560"
            cy="180"
            r="16"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2.5"
            strokeDasharray="4,3"
            opacity="0.85"
          />

          {/* Solid Core Pin Marker with White Outline */}
          <circle cx="560" cy="180" r="7" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />

          {/* Prominent Chalk Annotation: "MAX (-1, 2)" */}
          <text
            x="560"
            y="140"
            textAnchor="middle"
            fill="#FEF08A"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="26"
            letterSpacing="1"
            filter="url(#chalk-glow)"
          >
            MAX (−1, 2)
          </text>

          {/* Critical Root Coordinate on Axis: x = -1 */}
          <rect
            x="530"
            y="470"
            width="60"
            height="28"
            rx="5"
            fill="#0F172A"
            stroke="#EF4444"
            strokeWidth="1.5"
          />
          <text
            x="560"
            y="490"
            textAnchor="middle"
            fill="#EF4444"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="16"
          >
            x = −1
          </text>
        </g>
      </svg>
    </div>
  );
};
