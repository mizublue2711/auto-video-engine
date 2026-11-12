import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export interface FxStudy_IdeaPopProps {
  startFrame?: number;
  frameOffset?: number;
  scale?: number;
  x?: number;
  y?: number;
  className?: string;
}

export const FxStudy_IdeaPop: React.FC<FxStudy_IdeaPopProps> = ({
  startFrame,
  frameOffset = 0,
  scale = 1,
  x = 0,
  y = 0,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const offset = startFrame ?? frameOffset;
  const relFrame = frame - offset;
  if (relFrame < 0 || relFrame > 45) {
    return null;
  }

  // 1. Idea Core Physics: Pop from 0 to 1.25, settling to 1.0
  const coreSpring = spring({
    frame: Math.max(0, relFrame),
    fps,
    config: { damping: 9, stiffness: 180 },
  });
  const coreScale = interpolate(coreSpring, [0, 1], [0, 1]);

  // 2. Action Lines Physics: Burst outward via strokeDasharray/offset from frames 2 to 14
  const lineDrawProgress = interpolate(relFrame, [2, 8], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lineOpacity = interpolate(relFrame, [2, 5, 14], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Floating Bounce Physics: Vertical floating offset Math.sin(frame * 0.2) * 4 px from frame 12 to 40
  const floatOffset =
    relFrame >= 12 && relFrame <= 42
      ? Math.sin((relFrame - 12) * 0.2) * 4
      : 0;

  const diagLength = 35.36;
  const horizLength = 30.0;

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 200,
        height: 200,
        transform: `translate(-50%, -90%) scale(${scale})`,
        transformOrigin: '100px 180px',
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width="200"
        height="200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 2: Action Burst Lines (Burst outward frames 2 to 14) */}
        <g id="fx-action-burst-lines" opacity={lineOpacity}>
          {/* Top-Left: (75,55) -> (50,30) */}
          <line
            x1="75"
            y1="55"
            x2="50"
            y2="30"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={diagLength}
            strokeDashoffset={diagLength * lineDrawProgress}
          />
          {/* Top-Right: (125,55) -> (150,30) */}
          <line
            x1="125"
            y1="55"
            x2="150"
            y2="30"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={diagLength}
            strokeDashoffset={diagLength * lineDrawProgress}
          />
          {/* Mid-Left: (65,90) -> (35,90) */}
          <line
            x1="65"
            y1="90"
            x2="35"
            y2="90"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={horizLength}
            strokeDashoffset={horizLength * lineDrawProgress}
          />
          {/* Mid-Right: (135,90) -> (165,90) */}
          <line
            x1="135"
            y1="90"
            x2="165"
            y2="90"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={horizLength}
            strokeDashoffset={horizLength * lineDrawProgress}
          />
        </g>

        {/* Layer 1: Idea Core (Spring pop + Floating bounce) */}
        <g
          id="fx-idea-core"
          transform={`translate(100, ${95 + floatOffset}) scale(${coreScale}) translate(-100, -95)`}
        >
          {/* Upper Diamond Facet */}
          <polygon
            points="100,45 112,75 100,120 88,75"
            fill="#F59E0B"
          />
          {/* Pure White Highlight Core */}
          <polygon
            points="100,55 106,75 100,105 94,75"
            fill="#FFFFFF"
          />
          {/* Lower Dot */}
          <circle cx="100" cy="138" r="6" fill="#F59E0B" />
          <circle cx="100" cy="138" r="2.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};
