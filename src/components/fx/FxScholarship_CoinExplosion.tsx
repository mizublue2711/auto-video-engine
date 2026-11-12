import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export interface FxScholarship_CoinExplosionProps {
  startFrame?: number;
  frameOffset?: number;
  scale?: number;
  x?: number;
  y?: number;
  className?: string;
}

interface ConfettiRibbonData {
  baseAngle: number;
  speed: number;
  color: string;
  w: number;
  h: number;
}

const CONFETTI_DATA: ConfettiRibbonData[] = [
  { baseAngle: 25, speed: 4.8, color: '#2563EB', w: 6, h: 16 },
  { baseAngle: 60, speed: 5.5, color: '#F59E0B', w: 6, h: 16 },
  { baseAngle: 95, speed: 4.2, color: '#2563EB', w: 6, h: 16 },
  { baseAngle: 140, speed: 5.2, color: '#F59E0B', w: 6, h: 16 },
  { baseAngle: 185, speed: 4.6, color: '#2563EB', w: 6, h: 16 },
  { baseAngle: 220, speed: 5.8, color: '#F59E0B', w: 6, h: 16 },
  { baseAngle: 265, speed: 4.4, color: '#2563EB', w: 6, h: 16 },
  { baseAngle: 300, speed: 5.6, color: '#F59E0B', w: 6, h: 16 },
  { baseAngle: 335, speed: 4.5, color: '#2563EB', w: 6, h: 16 },
  { baseAngle: 355, speed: 5.0, color: '#F59E0B', w: 6, h: 16 },
];

const GLINT_POSITIONS = [
  { x: 290, y: 190, s: 1.1 },
  { x: 365, y: 305, s: 0.9 },
  { x: 195, y: 360, s: 1.2 },
  { x: 130, y: 220, s: 0.95 },
  { x: 210, y: 135, s: 1.05 },
  { x: 250, y: 250, s: 1.3 },
];

export const FxScholarship_CoinExplosion: React.FC<FxScholarship_CoinExplosionProps> = ({
  startFrame,
  frameOffset = 0,
  scale = 1,
  x = 0,
  y = 0,
  className,
}) => {
  const frame = useCurrentFrame();
  useVideoConfig();

  const offset = startFrame ?? frameOffset;
  const relFrame = frame - offset;
  if (relFrame < 0 || relFrame > 55) {
    return null;
  }

  const t = Math.max(0, relFrame);

  // Coin Fade-in / Fade-out Opacity
  const coinOpacity = interpolate(relFrame, [0, 2, 40, 50], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Confetti Flutter Opacity
  const confettiOpacity = interpolate(
    relFrame,
    [0, 5, 35, 45],
    [0, 1, 0.8, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Star Glints Opacity & Scale
  const glintScale = interpolate(relFrame, [0, 8, 22], [0, 1.25, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const initialX = 250;
  const initialY = 250;

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 500,
        height: 500,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: '250px 250px',
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 500 500"
        width="500"
        height="500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Confetti Ribbons with Slower Flutter Physics */}
        <g id="fx-confetti-ribbons" opacity={confettiOpacity}>
          {CONFETTI_DATA.map((ribbon, i) => {
            const rad = (ribbon.baseAngle * Math.PI) / 180;
            const cX =
              initialX +
              Math.cos(rad) * ribbon.speed * t * 1.2 +
              Math.sin(t * 0.25 + i) * 10;
            const cY =
              initialY -
              (ribbon.speed * 0.8 * t) +
              (0.5 * 0.22 * t * t);
            const rotZ = relFrame * (10 + (i % 4) * 3);
            const flipY = Math.cos(relFrame * 0.35 + i);

            return (
              <g
                key={i}
                transform={`translate(${cX}, ${cY}) rotate(${rotZ}) scale(1, ${flipY})`}
              >
                <rect
                  x={-ribbon.w / 2}
                  y={-ribbon.h / 2}
                  width={ribbon.w}
                  height={ribbon.h}
                  rx={1}
                  fill={ribbon.color}
                />
              </g>
            );
          })}
        </g>

        {/* Layer 2: 8 Parabolic Carat Coins with 3D-Tumbling Illusion */}
        <g id="fx-carat-coins" opacity={coinOpacity}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const angle = (i * 45) * (Math.PI / 180);
            const velocity = 8 + (i % 3) * 3;

            // Parabolic Physics: Y = initialY - (velocity * t) + (0.5 * 0.6 * t^2)
            const posX = initialX + Math.cos(angle) * (velocity * t * 1.5);
            const posY = initialY - (velocity * t) + (0.5 * 0.6 * t * t);

            // 3D Tumbling simulation via rotateZ and horizontal perspective compress (simulating rotateY)
            const rotZ = relFrame * 6;
            const rotYRad = ((relFrame * 18) * Math.PI) / 180;
            const scaleX = Math.cos(rotYRad); // Cosine simulates rotateY foreshortening cleanly in 2D SVG

            return (
              <g
                key={i}
                transform={`translate(${posX}, ${posY}) rotate(${rotZ}) scale(${scaleX}, 1)`}
              >
                {/* Coin Outer Ring */}
                <circle
                  r="14"
                  fill="#F59E0B"
                  stroke="#B45309"
                  strokeWidth="2"
                />
                {/* Coin Inner Rim */}
                <circle r="10" fill="#FBBF24" />
                {/* Coin Embossed Hex Facet */}
                <polygon
                  points="0,-7 6,-3.5 6,3.5 0,7 -6,3.5 -6,-3.5"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="0.8"
                  opacity={0.6}
                />
                {/* Coin Center Carat Glyph */}
                <polygon
                  points="0,-6 5,0 0,6 -5,0"
                  fill="#B45309"
                />
                {/* Coin Specular Highlight */}
                <circle
                  cx="-4"
                  cy="-4"
                  r="1.5"
                  fill="#FFFFFF"
                  opacity={0.9}
                />
              </g>
            );
          })}
        </g>

        {/* Layer 3: Glint Particles */}
        <g id="fx-glint-particles" opacity={glintScale > 0 ? 1 : 0}>
          {GLINT_POSITIONS.map((glint, idx) => (
            <g
              key={idx}
              transform={`translate(${glint.x}, ${glint.y}) scale(${glint.s * glintScale}) rotate(${relFrame * 12})`}
            >
              <path
                d="M 0,-8 Q 0,0 8,0 Q 0,0 0,8 Q 0,0 -8,0 Q 0,0 0,-8 Z"
                fill="#FBBF24"
              />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export const FxScholarshipCoinExplosion = FxScholarship_CoinExplosion;
export type FxScholarshipCoinExplosionProps = FxScholarship_CoinExplosionProps;

