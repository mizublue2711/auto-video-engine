import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CharacterRig } from '../components/characters/CharacterRig';
import { PhoneMockup } from '../components/devices/PhoneMockup';
import { KineticText } from '../components/text/KineticText';
import { Palette, Scene2ConfigSchema } from '../schemas/VideoConfigSchema';
import { z } from 'zod';

export interface Scene2SolutionRevealProps {
  sceneConfig: z.infer<typeof Scene2ConfigSchema>;
  palette: Palette;
}

/**
 * Scene 2: Phone reveal & expression morph.
 * Introduces the mobile app solution as the hero resolution.
 */
export const Scene2SolutionReveal: React.FC<Scene2SolutionRevealProps> = ({
  sceneConfig,
  palette,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.background,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 120px',
      }}
    >
      {/* Background Accent Disc */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 800,
          borderRadius: '50%',
          backgroundColor: palette.secondary,
          opacity: 0.12,
          right: '10%',
          zIndex: 8,
        }}
      />

      {/* Solution Copy Group */}
      <div style={{ maxWidth: 750, zIndex: 90 }}>
        <KineticText
          text={sceneConfig.headline}
          color={palette.primary}
          fontSize={68}
          fontWeight={900}
          delay={0}
        />
        <div style={{ marginTop: 24 }}>
          <KineticText
            text={sceneConfig.subheadline}
            color={palette.text}
            fontSize={34}
            fontWeight={500}
            delay={8}
          />
        </div>
      </div>

      {/* Hero Phone Mockup with character interaction */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <PhoneMockup frameColor="#111827" screenBg="#FFFFFF" delay={12} scale={1.1}>
          <div
            style={{
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              backgroundColor: palette.primary,
              color: '#FFFFFF',
              boxSizing: 'border-box',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  backgroundColor: palette.accent,
                }}
              />
            </div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>
              {sceneConfig.appScreenTitle}
            </div>
          </div>
        </PhoneMockup>

        {/* Character expression morphed to happy/neutral */}
        <div style={{ position: 'absolute', right: -180, bottom: -60 }}>
          <CharacterRig
            emotion="happy"
            bodyColor={palette.secondary}
            scale={0.9}
            armSwing={false}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
