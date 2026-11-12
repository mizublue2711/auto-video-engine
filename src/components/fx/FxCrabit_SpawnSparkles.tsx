import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export interface FxCrabit_SpawnSparklesProps {
  startFrame?: number;
  frameOffset?: number;
  scale?: number;
  x?: number;
  y?: number;
  loop?: boolean;
  className?: string;
}

interface BubbleData {
  cx: number;
  cy: number;
  r: number;
  fill: string;
}

const BUBBLES: BubbleData[] = [
  { cx: 115, cy: 190, r: 4, fill: '#00E5FF' },
  { cx: 138, cy: 204, r: 6, fill: '#C084FC' },
  { cx: 160, cy: 186, r: 3.5, fill: '#FFFFFF' },
  { cx: 175, cy: 208, r: 7, fill: '#00E5FF' },
  { cx: 195, cy: 188, r: 5, fill: '#C084FC' },
  { cx: 215, cy: 204, r: 6, fill: '#FFFFFF' },
  { cx: 235, cy: 192, r: 3, fill: '#00E5FF' },
  { cx: 255, cy: 198, r: 5, fill: '#C084FC' },
];

export const FxCrabit_SpawnSparkles: React.FC<FxCrabit_SpawnSparklesProps> = ({
  startFrame,
  frameOffset = 0,
  scale = 1,
  x = 0,
  y = 0,
  loop = false,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const offset = startFrame ?? frameOffset;
  const relFrame = frame - offset;
  if (!loop && (relFrame < 0 || relFrame > 40)) {
    return null;
  }

  const animFrame = loop ? (Math.max(0, relFrame) % 35) : Math.max(0, relFrame);

  // 1. Prismatic Aura Physics: Rotates continuously (frame * 2.5) % 360 with breathing scale [0.95 -> 1.05]
  const auraRotation = (animFrame * 2.5) % 360;
  const auraScale = interpolate(Math.sin(animFrame * 0.2), [-1, 1], [0.95, 1.05]);
  const auraOpacity = interpolate(
    animFrame,
    [0, 6, 28, 35],
    [0, 0.85, 0.85, loop ? 0.85 : 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 2. Bubble Rise Physics: Upward translation -90px with sine-wave X jitter
  const bubbleY = interpolate(animFrame, [0, 35], [0, -90], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const bubbleOpacity = interpolate(
    animFrame,
    [0, 5, 28, 35],
    [0, 1, 0.9, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // 3. Claw Flares Physics: Flash on at frame 6 with spring pop, fade out by frame 24
  const flareSpr = spring({
    frame: Math.max(0, animFrame - 6),
    fps,
    config: { damping: 10, stiffness: 200 },
  });
  const flareScale = interpolate(flareSpr, [0, 1], [0, 1.25]);
  const flareOpacity = interpolate(
    animFrame,
    [6, 9, 24],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 350,
        height: 250,
        transform: `translate(-50%, -80%) scale(${scale})`,
        transformOrigin: '175px 200px',
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 350 250"
        width="350"
        height="250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Prismatic Aura Ring */}
        <g
          id="fx-prismatic-aura-ring"
          opacity={auraOpacity}
          transform={`translate(175, 200) rotate(${auraRotation}) scale(${auraScale}) translate(-175, -200)`}
        >
          <polygon
            points="285,200 277,210 253,218 217,224 175,226 133,224 97,218 73,210 65,200 73,190 97,182 133,176 175,174 217,176 253,182 277,190"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="2"
            opacity="0.8"
          />
          <polygon
            points="255,200 248,208 230,214 204,218 175,220 146,218 120,214 102,208 95,200 102,192 120,186 146,182 175,180 204,182 230,186 248,192"
            fill="none"
            stroke="#C084FC"
            strokeWidth="1.2"
            opacity="0.6"
          />
        </g>

        {/* Layer 2: 8 Mini Energy Bubbles */}
        <g id="fx-energy-bubbles" opacity={bubbleOpacity}>
          {BUBBLES.map((bubble, i) => {
            const jitterX = Math.sin(animFrame * 0.3 + i) * 8;
            return (
              <circle
                key={i}
                cx={bubble.cx + jitterX}
                cy={bubble.cy + bubbleY}
                r={bubble.r}
                fill={bubble.fill}
                opacity={0.88}
              />
            );
          })}
        </g>

        {/* Layer 3: Claw Flares */}
        <g id="fx-claw-flares" opacity={flareOpacity}>
          {/* Left Claw Flare */}
          <g
            id="fx-left-claw-flare"
            transform={`translate(80, 70) scale(${flareScale})`}
          >
            <path
              d="M 0,-24 Q 0,0 24,0 Q 0,0 0,24 Q 0,0 -24,0 Q 0,0 0,-24 Z"
              fill="#00E5FF"
              opacity="0.85"
            />
            <path
              d="M 0,-14 Q 0,0 14,0 Q 0,0 0,14 Q 0,0 -14,0 Q 0,0 0,-14 Z"
              fill="#FFFFFF"
            />
            <polygon
              points="0,-8 8,0 0,8 -8,0"
              transform="rotate(45)"
              fill="#FFFFFF"
              opacity="0.9"
            />
            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          </g>

          {/* Right Claw Flare */}
          <g
            id="fx-right-claw-flare"
            transform={`translate(270, 70) scale(${flareScale})`}
          >
            <path
              d="M 0,-24 Q 0,0 24,0 Q 0,0 0,24 Q 0,0 -24,0 Q 0,0 0,-24 Z"
              fill="#00E5FF"
              opacity="0.85"
            />
            <path
              d="M 0,-14 Q 0,0 14,0 Q 0,0 0,14 Q 0,0 -14,0 Q 0,0 0,-14 Z"
              fill="#FFFFFF"
            />
            <polygon
              points="0,-8 8,0 0,8 -8,0"
              transform="rotate(45)"
              fill="#FFFFFF"
              opacity="0.9"
            />
            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
};
