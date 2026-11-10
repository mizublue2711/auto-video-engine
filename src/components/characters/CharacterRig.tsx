import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { createSpring } from '../../core/physics/springs';

export interface CharacterRigProps {
  emotion?: 'bored' | 'frustrated' | 'happy' | 'neutral';
  bodyColor?: string;
  headRotationRange?: [number, number];
  armSwing?: boolean;
  scale?: number;
  x?: number;
  y?: number;
}

/**
 * Modular 2D Character Rig with isolated head, torso, arm joints, and expression layers.
 * Follows transform origin standards:
 * - Head: bottom center (neck joint)
 * - Limbs: top center/left
 */
export const CharacterRig: React.FC<CharacterRigProps> = ({
  emotion = 'neutral',
  bodyColor = '#3B82F6',
  armSwing = true,
  scale = 1,
  x = 0,
  y = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring
  const entrance = createSpring({
    frame,
    fps,
    preset: 'snappy',
    from: 0,
    to: 1,
  });

  // Subtle breathing / idle motion
  const breathing = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.98, 1.02]
  );

  // Head tilt angle based on emotion
  const headTilt = emotion === 'bored' ? -8 : emotion === 'frustrated' ? 6 : 0;

  // Arm sway
  const armAngle = armSwing
    ? interpolate(Math.sin((frame / fps) * Math.PI * 1.5), [-1, 1], [-12, 12])
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y}px) scale(${scale * entrance})`,
        width: 320,
        height: 480,
        zIndex: 30, // Midground layer
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}
    >
      <svg
        viewBox="0 0 320 480"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        {/* Torso / Body Group */}
        <g id="char_torso" style={{ zIndex: 25 }}>
          <rect
            x="110"
            y="220"
            width="100"
            height="160"
            rx="30"
            fill={bodyColor}
            style={{
              transformOrigin: 'center bottom',
              transform: `scaleY(${breathing})`,
            }}
          />
        </g>

        {/* Arms Group */}
        <g id="char_arms" style={{ zIndex: 28 }}>
          {/* Left Arm */}
          <rect
            x="80"
            y="230"
            width="24"
            height="110"
            rx="12"
            fill={bodyColor}
            style={{
              transformOrigin: '20px 20px',
              transform: `rotate(${armAngle}deg)`,
            }}
          />
          {/* Right Arm */}
          <rect
            x="216"
            y="230"
            width="24"
            height="110"
            rx="12"
            fill={bodyColor}
            style={{
              transformOrigin: '20px 20px',
              transform: `rotate(${-armAngle}deg)`,
            }}
          />
        </g>

        {/* Head & Expression Group */}
        <g
          id="char_head_group"
          style={{
            transformOrigin: '160px 210px', // Neck base anchor
            transform: `rotate(${headTilt}deg)`,
            zIndex: 55, // Forehead / expressions layer
          }}
        >
          {/* Head base */}
          <circle cx="160" cy="140" r="70" fill="#FFE0B2" />

          {/* Eyes */}
          {emotion === 'bored' ? (
            <g id="char_eyes_bored">
              <line x1="130" y1="140" x2="150" y2="140" stroke="#333" strokeWidth="5" strokeLinecap="round" />
              <line x1="170" y1="140" x2="190" y2="140" stroke="#333" strokeWidth="5" strokeLinecap="round" />
            </g>
          ) : emotion === 'frustrated' ? (
            <g id="char_eyes_frustrated">
              <line x1="130" y1="135" x2="150" y2="145" stroke="#333" strokeWidth="5" strokeLinecap="round" />
              <line x1="170" y1="145" x2="190" y2="135" stroke="#333" strokeWidth="5" strokeLinecap="round" />
            </g>
          ) : (
            <g id="char_eyes_default">
              <circle cx="140" cy="140" r="6" fill="#333" />
              <circle cx="180" cy="140" r="6" fill="#333" />
            </g>
          )}

          {/* Mouth */}
          <g id="char_mouth">
            {emotion === 'bored' ? (
              <line x1="145" y1="175" x2="175" y2="175" stroke="#333" strokeWidth="4" strokeLinecap="round" />
            ) : emotion === 'frustrated' ? (
              <path d="M 145 180 Q 160 165 175 180" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round" />
            ) : (
              <path d="M 145 170 Q 160 185 175 170" stroke="#333" strokeWidth="4" fill="none" strokeLinecap="round" />
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
