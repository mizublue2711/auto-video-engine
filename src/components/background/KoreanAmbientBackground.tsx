import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export interface AmbientOrbDefinition {
  color: string;
  size: number;
  initialX: number; // percentage from left (0 to 100) or pixels
  initialY: number; // percentage from top (0 to 100) or pixels
  driftRangeX: number;
  driftRangeY: number;
  freqX?: number;
  freqY?: number;
  phase?: number;
}

export interface SceneBackgroundTheme {
  gradientFrom: string;
  gradientTo: string;
  orbs: AmbientOrbDefinition[];
}

export const SCENE_BACKGROUND_THEMES: Record<
  'scene1' | 'scene2' | 'scene3' | 'scene4',
  SceneBackgroundTheme
> = {
  scene1: {
    // Frustration/Bored: Cool studio gray/blue (#F8FAFC -> #E2E8F0), dim ambient orbs
    gradientFrom: '#F8FAFC',
    gradientTo: '#E2E8F0',
    orbs: [
      {
        color: 'rgba(203, 213, 225, 0.6)',
        size: 650,
        initialX: 25,
        initialY: 30,
        driftRangeX: 80,
        driftRangeY: 50,
        freqX: 0.8,
        freqY: 0.6,
        phase: 0,
      },
      {
        color: 'rgba(226, 232, 240, 0.8)',
        size: 700,
        initialX: 75,
        initialY: 65,
        driftRangeX: 70,
        driftRangeY: 60,
        freqX: 0.7,
        freqY: 0.9,
        phase: Math.PI / 2,
      },
    ],
  },
  scene2: {
    // Solution Reveal: Electric Aqua & Soft Violet glow (#F0F9FF -> #E0F2FE), glowing orbs
    gradientFrom: '#F0F9FF',
    gradientTo: '#E0F2FE',
    orbs: [
      {
        color: 'rgba(56, 189, 248, 0.35)',
        size: 700,
        initialX: 20,
        initialY: 35,
        driftRangeX: 90,
        driftRangeY: 60,
        freqX: 0.9,
        freqY: 0.7,
        phase: 0.5,
      },
      {
        color: 'rgba(129, 140, 248, 0.25)',
        size: 650,
        initialX: 80,
        initialY: 60,
        driftRangeX: 75,
        driftRangeY: 70,
        freqX: 0.6,
        freqY: 0.8,
        phase: Math.PI / 3,
      },
    ],
  },
  scene3: {
    // Active Learning Loop: Warm daylight pastel (#FAFAF9 -> #F0FDF4), sunny gold & mint orbs
    gradientFrom: '#FAFAF9',
    gradientTo: '#F0FDF4',
    orbs: [
      {
        color: 'rgba(254, 240, 138, 0.4)',
        size: 650,
        initialX: 30,
        initialY: 40,
        driftRangeX: 80,
        driftRangeY: 55,
        freqX: 0.85,
        freqY: 0.65,
        phase: 1.2,
      },
      {
        color: 'rgba(187, 247, 208, 0.35)',
        size: 720,
        initialX: 70,
        initialY: 55,
        driftRangeX: 85,
        driftRangeY: 65,
        freqX: 0.7,
        freqY: 0.85,
        phase: 2.5,
      },
    ],
  },
  scene4: {
    // Carat Reward & Card: Deep Royal Sapphire & Carat Cyan (#F8FAFC -> #EFF6FF), faceted cyan glow, sapphire orb, and gold chip accent glow
    gradientFrom: '#F8FAFC',
    gradientTo: '#EFF6FF',
    orbs: [
      {
        color: 'rgba(0, 229, 255, 0.3)', // faceted cyan glow
        size: 680,
        initialX: 20,
        initialY: 30,
        driftRangeX: 80,
        driftRangeY: 60,
        freqX: 0.75,
        freqY: 0.6,
        phase: 0,
      },
      {
        color: 'rgba(59, 130, 246, 0.25)', // sapphire orb
        size: 720,
        initialX: 78,
        initialY: 65,
        driftRangeX: 90,
        driftRangeY: 50,
        freqX: 0.65,
        freqY: 0.8,
        phase: Math.PI / 2,
      },
      {
        color: 'rgba(251, 191, 36, 0.2)', // gold chip accent glow
        size: 500,
        initialX: 50,
        initialY: 50,
        driftRangeX: 60,
        driftRangeY: 45,
        freqX: 0.9,
        freqY: 0.75,
        phase: Math.PI,
      },
    ],
  },
};

export interface KoreanAmbientBackgroundProps {
  theme: SceneBackgroundTheme;
  style?: React.CSSProperties;
}

/**
 * KoreanAmbientBackground
 * Studio-grade, procedural Korean Aesthetic Ambient Background system.
 *
 * 3-Tier Layering:
 * Tier 1 (Base): 1080p studio vertical gradient.
 * Tier 2 (Atmosphere): Floating Light Orbs with heavy Gaussian blur (120px to 140px)
 *   animated via Remotion's interpolate() and useCurrentFrame() with harmonic sinusoidal drift.
 * Tier 3 (Structure & Polish): SVG Micro-Grid pattern (60x60px spacing, stroke opacity 0.04)
 *   and subtle inset vignette box-shadow.
 */
export const KoreanAmbientBackground: React.FC<KoreanAmbientBackgroundProps> = ({
  theme,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Normalized time in seconds
  const t = frame / fps;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      {/* Tier 1 (Base): 1080p studio vertical gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(180deg, ${theme.gradientFrom} 0%, ${theme.gradientTo} 100%)`,
        }}
      />

      {/* Tier 2 (Atmosphere): Dynamic Floating Light Orbs with heavy Gaussian blur */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
        }}
      >
        {theme.orbs.map((orb, index) => {
          const freqX = orb.freqX ?? 0.8;
          const freqY = orb.freqY ?? 0.7;
          const phase = orb.phase ?? 0;

          // Harmonic sinusoidal drift via interpolate() and useCurrentFrame()
          const offsetX = interpolate(
            Math.sin(t * freqX + phase),
            [-1, 1],
            [-orb.driftRangeX, orb.driftRangeX]
          );

          const offsetY = interpolate(
            Math.cos(t * freqY + phase),
            [-1, 1],
            [-orb.driftRangeY, orb.driftRangeY]
          );

          return (
            <div
              key={`ambient-orb-${index}`}
              style={{
                position: 'absolute',
                left: `${orb.initialX}%`,
                top: `${orb.initialY}%`,
                width: orb.size,
                height: orb.size,
                borderRadius: '50%',
                backgroundColor: orb.color,
                filter: 'blur(130px)',
                transform: `translate3d(-50%, -50%, 0) translate3d(${offsetX}px, ${offsetY}px, 0)`,
                willChange: 'transform',
                pointerEvents: 'none',
              }}
            />
          );
        })}
      </div>

      {/* Tier 3 (Structure & Polish): SVG Micro-Grid pattern (60x60px spacing, stroke opacity 0.04) */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="korean-ambient-microgrid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="#0F172A"
              strokeWidth="1"
              strokeOpacity="0.04"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#korean-ambient-microgrid)"
        />
      </svg>

      {/* Tier 3 (Structure & Polish): Subtle inset vignette box-shadow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 120px rgba(15, 23, 42, 0.05)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
