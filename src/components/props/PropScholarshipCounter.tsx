import React, { useMemo } from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface PropScholarshipCounterProps {
  targetAmount?: number; // Default: 50000
  currencySymbol?: string; // Default: "KRW"
  particleCount?: number; // Default: 24
  delay?: number; // Default: 0
  durationInFrames?: number; // Default: 45
  style?: React.CSSProperties;
}

interface ParticleConfig {
  angle: number;
  distance: number;
  staggerDelay: number;
  size: number;
  color: string;
  spinDirection: number;
}

/**
 * Faceted Carat Diamond Gem SVG (#00E5FF cyan & #E0F7FA ice diamond)
 */
const CaratDiamond: React.FC<{
  color: string;
  size: number;
}> = ({ color, size }) => {
  const isCyan = color === '#00E5FF';

  return (
    <svg
      width={size}
      height={size}
      viewBox="-24 -24 48 48"
      style={{
        overflow: 'visible',
        filter: `drop-shadow(0 0 8px ${color})`,
      }}
    >
      {/* Outer faceted outline */}
      <polygon
        points="-14,-16 14,-16 22,-4 0,22 -22,-4"
        fill={color}
        stroke="#FFFFFF"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Top crown highlight */}
      <polygon
        points="-14,-16 14,-16 8,-4 -8,-4"
        fill="#FFFFFF"
        opacity={0.88}
      />
      {/* Upper left & right crown triangles */}
      <polygon
        points="-14,-16 -8,-4 -22,-4"
        fill={isCyan ? '#38BDF8' : '#FFFFFF'}
        opacity={0.75}
      />
      <polygon
        points="14,-16 8,-4 22,-4"
        fill={isCyan ? '#0284C7' : '#BAE6FD'}
        opacity={0.75}
      />
      {/* Lower pavilion facets */}
      <polygon
        points="-22,-4 -8,-4 0,22"
        fill={isCyan ? '#00B4D8' : '#E0F2FE'}
        opacity={0.85}
      />
      <polygon
        points="22,-4 8,-4 0,22"
        fill={isCyan ? '#0096C7' : '#90E0EF'}
        opacity={0.85}
      />
      {/* Center pavilion facet */}
      <polygon
        points="-8,-4 8,-4 0,22"
        fill="#FFFFFF"
        opacity={0.92}
      />
    </svg>
  );
};

/**
 * PropScholarshipCounter: Standalone reward celebration layer (Z-index: 80-100)
 * Features an animated Korean Won number ticker (+50,000 KRW),
 * followed by the "충전 완료" status badge reveal and explosive procedural Carat diamond burst.
 */
export const PropScholarshipCounter: React.FC<PropScholarshipCounterProps> = ({
  targetAmount = 50000,
  currencySymbol = 'KRW',
  particleCount = 24,
  delay = 0,
  durationInFrames = 45,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Deterministic Korean Number Formatter
  const formatter = useMemo(() => new Intl.NumberFormat('ko-KR'), []);

  // Procedural deterministic particle configurations
  const particles = useMemo<ParticleConfig[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      // 360-degree radial distribution with deterministic angular offset
      const baseAngle = (i / particleCount) * Math.PI * 2;
      const angleJitter = Math.sin((i + 1) * 31.4159) * 0.18;
      const angle = baseAngle + angleJitter;

      // Distance variance (180px - 360px)
      const distVariance = Math.sin((i + 1) * 53.123) * 0.5 + 0.5;
      const distance = 190 + distVariance * 170;

      // Staggered launch timing
      const staggerDelay = (i % 6) * 2 + Math.floor(i / 6) * 3;

      // Alternating Carat Diamond colors: #00E5FF (Vivid Cyan) and #E0F7FA (Ice Diamond)
      const color = i % 2 === 0 ? '#00E5FF' : '#E0F7FA';

      // Varied particle sizes (20px to 36px)
      const size = 20 + ((i * 7) % 17);

      // Alternating spin directions
      const spinDirection = i % 2 === 0 ? 1 : -1;

      return {
        angle,
        distance,
        staggerDelay,
        size,
        color,
        spinDirection,
      };
    });
  }, [particleCount]);

  // Entrance spring for counter card
  const entranceSpring = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 120,
      overshootClamping: false,
    },
  });
  const entranceScale = interpolate(entranceSpring, [0, 1], [0.8, 1]);
  const entranceOpacity = interpolate(entranceSpring, [0, 1], [0, 1]);

  // Number roller interpolation (from 0 to targetAmount)
  const rollProgress = interpolate(
    frame - delay,
    [0, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: (t) => 1 - Math.pow(1 - t, 3), // Smooth cubic ease-out
    }
  );
  const currentAmount = Math.round(rollProgress * targetAmount);
  const formattedText = `+${formatter.format(currentAmount)} ${currencySymbol}`;

  // Reveal spring for "충전 완료" (Top-up Complete) badge as roll completes
  const badgeStartFrame = delay + Math.max(10, durationInFrames - 8);
  const badgeSpring = spring({
    frame: frame - badgeStartFrame,
    fps,
    config: {
      damping: 10,
      mass: 0.6,
      stiffness: 160,
      overshootClamping: false,
    },
  });
  const badgeScale = interpolate(badgeSpring, [0, 1], [0, 1]);
  const badgeOpacity = interpolate(badgeSpring, [0, 0.4, 1], [0, 1, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 90,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Relative container centering burst particles and counter card */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* =================================================================== */}
        {/* CARAT DIAMOND BURST PARTICLES (Trigonometric Coordinates)            */}
        {/* =================================================================== */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 0,
            height: 0,
            pointerEvents: 'none',
          }}
        >
          {particles.map((p, idx) => {
            const particleFrame = frame - delay - p.staggerDelay;
            const pSpring = spring({
              frame: particleFrame,
              fps,
              config: {
                damping: 12,
                mass: 0.5,
                stiffness: 100,
                overshootClamping: false,
              },
            });

            // Trigonometric displacement from center driven by spring
            const currentR = pSpring * p.distance;
            const x = Math.cos(p.angle) * currentR;
            const y = Math.sin(p.angle) * currentR;

            const scale = interpolate(
              pSpring,
              [0, 0.25, 0.75, 1],
              [0, 1.25, 1, 0.2]
            );
            const opacity = interpolate(
              pSpring,
              [0, 0.1, 0.7, 1],
              [0, 1, 1, 0]
            );
            const rotation =
              p.angle * (180 / Math.PI) + pSpring * 240 * p.spinDirection;

            if (opacity <= 0) return null;

            return (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`,
                  opacity,
                  pointerEvents: 'none',
                }}
              >
                <CaratDiamond color={p.color} size={p.size} />
              </div>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* SCHOLARSHIP NUMBER ROLLER CARD                                      */}
        {/* =================================================================== */}
        <div
          style={{
            transform: `scale(${entranceScale})`,
            opacity: entranceOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            background:
              'linear-gradient(135deg, rgba(30, 58, 138, 0.92) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: '2px solid rgba(0, 229, 255, 0.65)',
            borderRadius: 28,
            padding: '24px 44px',
            boxShadow:
              '0 24px 60px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 229, 255, 0.35)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Header Tag with Mini Diamond Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: 2,
              color: '#93C5FD',
              textTransform: 'uppercase',
            }}
          >
            <CaratDiamond color="#00E5FF" size={16} />
            <span>장학금 실시간 적립</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span style={{ color: '#38BDF8' }}>CARAT REWARD</span>
          </div>

          {/* Large Animated Korean Won Numeric Roller */}
          <div
            style={{
              fontVariantNumeric: 'tabular-nums',
              fontSize: 58,
              fontWeight: 900,
              letterSpacing: 1,
              color: '#FFFFFF',
              textShadow:
                '0 0 24px rgba(0, 229, 255, 0.75), 0 0 48px rgba(0, 229, 255, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {formattedText}
          </div>

          {/* ================================================================= */}
          {/* "충전 완료" BADGE REVEAL                                         */}
          {/* ================================================================= */}
          <div
            style={{
              transform: `scale(${badgeScale})`,
              opacity: badgeOpacity,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'linear-gradient(90deg, #059669 0%, #10B981 100%)',
              border: '1.5px solid #A7F3D0',
              borderRadius: 20,
              padding: '6px 20px',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)',
            }}
          >
            {/* White Check Circle Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#FFFFFF" />
              <path
                d="M 8,12 L 11,15 L 16,9"
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: 0.5,
              }}
            >
              충전 완료
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
