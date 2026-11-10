import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  KoreanAmbientBackground,
  SCENE_BACKGROUND_THEMES,
} from '../components/background/KoreanAmbientBackground';
import { CharacterRig } from '../components/characters/CharacterRig';
import { KineticText } from '../components/text/KineticText';
import { createSpring } from '../core/physics/springs';
import { Palette, Scene3ConfigSchema } from '../schemas/VideoConfigSchema';
import { z } from 'zod';

export interface Scene3ActiveLoopProps {
  sceneConfig: z.infer<typeof Scene3ConfigSchema>;
  palette: Palette;
}

/**
 * Scene 3: Focused study & staggered props.
 * Shows high engagement, study metrics, and positive feedback loop.
 */
export const Scene3ActiveLoop: React.FC<Scene3ActiveLoopProps> = ({
  sceneConfig,
  palette,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeEntrance = createSpring({
    frame,
    fps,
    preset: 'snappy',
    delay: 20,
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.background,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
      }}
    >
      {/* Studio-Grade Korean Ambient Background */}
      <KoreanAmbientBackground theme={SCENE_BACKGROUND_THEMES.scene3} />

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 60, zIndex: 90 }}>
        <KineticText
          text={sceneConfig.headline}
          color={palette.primary}
          fontSize={68}
          fontWeight={900}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 100,
          width: '100%',
          zIndex: 20,
        }}
      >
        {/* Character focused in active loop */}
        <div style={{ position: 'relative', width: 320, height: 480, zIndex: 30 }}>
          <CharacterRig
            emotion="neutral"
            bodyColor={palette.primary}
            scale={1.2}
            armSwing={true}
          />
        </div>

        {/* Dynamic Study Metric Badge Card */}
        <div
          style={{
            transform: `scale(${badgeEntrance})`,
            transformOrigin: 'center center',
            backgroundColor: '#FFFFFF',
            borderRadius: 32,
            padding: '40px 60px',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
            border: `2px solid ${palette.secondary}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 60,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: palette.text,
              opacity: 0.8,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            {sceneConfig.studyMetricLabel}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: palette.secondary,
            }}
          >
            {sceneConfig.studyMetricValue}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
