import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export interface FxHandover_PhoneBurstProps {
  startFrame?: number;
  frameOffset?: number;
  scale?: number;
  x?: number;
  y?: number;
  className?: string;
}

export const FxHandover_PhoneBurst: React.FC<FxHandover_PhoneBurstProps> = ({
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
  if (relFrame < 0 || relFrame > 25) {
    return null;
  }

  // Core Driver: Spring animation (Duration: 20 frames)
  const spr = spring({
    frame: Math.max(0, relFrame),
    fps,
    config: { damping: 8, stiffness: 120 },
  });

  // Shockwave ring physics
  const shockwaveScale = interpolate(spr, [0, 1], [0.8, 1.45]);
  const shockwaveOpacity = interpolate(relFrame, [0, 12, 20], [1, 0.7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Particle Dispersion physics
  const gemDistance = interpolate(spr, [0, 1], [40, 150], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const gemRotation = interpolate(relFrame, [0, 20], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const gemOpacity = interpolate(relFrame, [0, 3, 16, 20], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Star twinkle physics (peaking at frame 10)
  const starScale = interpolate(relFrame, [0, 10, 20], [0, 1.2, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const starOpacity = interpolate(relFrame, [0, 10, 20], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const angles = [0, 60, 120, 180, 240, 300];
  const starAngles = [30, 150, 270];
  const starRadii = [130, 115, 135];

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 400,
        height: 400,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: '200px 200px',
        pointerEvents: 'none',
      }}
    >
      <svg
        viewBox="0 0 400 400"
        width="400"
        height="400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Shockwave Ring */}
        <g
          id="fx-shockwave-ring"
          opacity={shockwaveOpacity}
          transform={`translate(200, 200) scale(${shockwaveScale}) translate(-200, -200)`}
        >
          <circle
            cx="200"
            cy="200"
            r="120"
            fill="none"
            stroke="#00E5FF"
            strokeWidth="4"
          />
        </g>

        {/* Layer 2: 6 Radial Carat Diamonds */}
        <g id="fx-radial-carat-diamonds" opacity={gemOpacity}>
          {angles.map((angle, index) => {
            const isCyan = index % 2 === 0;
            return (
              <g
                key={angle}
                transform={`translate(200, 200) rotate(${angle}) translate(0, ${-gemDistance}) rotate(${gemRotation})`}
              >
                {isCyan ? (
                  /* Cyan Gem (#00E5FF) */
                  <>
                    <polygon points="-7,-11 7,-11 0,-2" fill="#00E5FF" />
                    <polygon points="-7,-11 -13,-2 -7,-2" fill="#38BDF8" />
                    <polygon points="-7,-11 -7,-2 0,-2" fill="#7DD3FC" />
                    <polygon points="7,-11 0,-2 7,-2" fill="#00E5FF" />
                    <polygon points="7,-11 7,-2 13,-2" fill="#38BDF8" />
                    <polygon points="-13,-2 -7,-2 0,12" fill="#38BDF8" />
                    <polygon points="-7,-2 0,-2 0,12" fill="#7DD3FC" />
                    <polygon points="0,-2 7,-2 0,12" fill="#0284C7" />
                    <polygon points="7,-2 13,-2 0,12" fill="#0369A1" />
                    <polygon
                      points="-7,-11 7,-11 13,-2 0,12 -13,-2"
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                    <circle cx="-7" cy="-11" r="1.5" fill="#FFFFFF" />
                  </>
                ) : (
                  /* Pure Ice White Gem (#FFFFFF) */
                  <>
                    <polygon points="-7,-11 7,-11 0,-2" fill="#FFFFFF" />
                    <polygon points="-7,-11 -13,-2 -7,-2" fill="#E2E8F0" />
                    <polygon points="-7,-11 -7,-2 0,-2" fill="#F1F5F9" />
                    <polygon points="7,-11 0,-2 7,-2" fill="#FFFFFF" />
                    <polygon points="7,-11 7,-2 13,-2" fill="#E2E8F0" />
                    <polygon points="-13,-2 -7,-2 0,12" fill="#CBD5E1" />
                    <polygon points="-7,-2 0,-2 0,12" fill="#E2E8F0" />
                    <polygon points="0,-2 7,-2 0,12" fill="#94A3B8" />
                    <polygon points="7,-2 13,-2 0,12" fill="#64748B" />
                    <polygon
                      points="-7,-11 7,-11 13,-2 0,12 -13,-2"
                      stroke="#00E5FF"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                    <circle cx="-7" cy="-11" r="1.5" fill="#00E5FF" />
                  </>
                )}
              </g>
            );
          })}
        </g>

        {/* Layer 3: 3 Sparkle Stars */}
        <g id="fx-sparkle-stars" opacity={starOpacity}>
          {starAngles.map((starAngle, i) => (
            <g
              key={starAngle}
              transform={`translate(200, 200) rotate(${starAngle}) translate(0, ${-starRadii[i]}) scale(${starScale}) rotate(${relFrame * 9})`}
            >
              <path
                d="M 0,-15 Q 0,0 15,0 Q 0,0 0,15 Q 0,0 -15,0 Q 0,0 0,-15 Z"
                fill="#FFFFFF"
              />
              <circle cx="0" cy="0" r="2.5" fill="#00E5FF" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};
