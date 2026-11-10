import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  KoreanAmbientBackground,
  SCENE_BACKGROUND_THEMES,
} from '../components/background/KoreanAmbientBackground';
import { CharacterRig } from '../components/characters/CharacterRig';
import { KineticText } from '../components/text/KineticText';
import { Palette, Scene1ConfigSchema } from '../schemas/VideoConfigSchema';
import { z } from 'zod';

export interface Scene1FrustrationProps {
  sceneConfig: z.infer<typeof Scene1ConfigSchema>;
  palette: Palette;
}

/**
 * Scene 1: Director & bored student.
 * Portrays initial customer pain point / classroom frustration.
 */
export const Scene1Frustration: React.FC<Scene1FrustrationProps> = ({
  sceneConfig,
  palette,
}) => {
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
      <KoreanAmbientBackground theme={SCENE_BACKGROUND_THEMES.scene1} />

      {/* Main Kinetic Typography */}
      <div
        style={{
          position: 'absolute',
          top: 120,
          left: 140,
          maxWidth: 900,
          zIndex: 90,
        }}
      >
        <KineticText
          text={sceneConfig.title}
          color={palette.primary}
          fontSize={72}
          fontWeight={900}
          delay={0}
        />
        <div style={{ marginTop: 20 }}>
          <KineticText
            text={sceneConfig.subtitle}
            color={palette.text}
            fontSize={36}
            fontWeight={500}
            delay={10}
          />
        </div>
      </div>

      {/* Character Rig (Student in bored state) */}
      <CharacterRig
        emotion={sceneConfig.studentEmotion}
        bodyColor={palette.primary}
        scale={1.3}
        x={350}
        y={120}
      />
    </AbsoluteFill>
  );
};
