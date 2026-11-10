import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  KoreanAmbientBackground,
  SCENE_BACKGROUND_THEMES,
} from '../components/background/KoreanAmbientBackground';
import { CreditCard } from '../components/finance/CreditCard';
import { NumberTicker } from '../components/finance/NumberTicker';
import { KineticText } from '../components/text/KineticText';
import { Palette, Scene4ConfigSchema } from '../schemas/VideoConfigSchema';
import { z } from 'zod';

export interface Scene4RewardCardProps {
  sceneConfig: z.infer<typeof Scene4ConfigSchema>;
  palette: Palette;
}

/**
 * Scene 4: Crabit Card & carrot deposit.
 * Climax scene: demonstrates gamified rewards deposited directly into the branded card.
 */
export const Scene4RewardCard: React.FC<Scene4RewardCardProps> = ({
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
      <KoreanAmbientBackground theme={SCENE_BACKGROUND_THEMES.scene4} />

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: 50, zIndex: 90 }}>
        <KineticText
          text={sceneConfig.headline}
          color={palette.primary}
          fontSize={68}
          fontWeight={900}
        />
      </div>

      {/* Hero Financial Card */}
      <div style={{ marginBottom: 40, zIndex: 65 }}>
        <CreditCard
          cardHolderName={sceneConfig.cardHolderName}
          backgroundColor={palette.primary}
          accentColor={palette.accent}
          scale={1.2}
          delay={5}
        />
      </div>

      {/* Animated Carat Balance and Real Scholarship Deposit Counters */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          zIndex: 80,
        }}
      >
        {/* Carat Balance Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            backgroundColor: '#FFFFFF',
            padding: '14px 28px',
            borderRadius: 20,
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
            border: `2px solid ${palette.secondary}`,
          }}
        >
          <NumberTicker
            value={sceneConfig.caratBalance}
            suffix=" CARATS"
            durationInFrames={45}
            delay={15}
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: palette.secondary,
            }}
          />
        </div>

        {/* Real Scholarship Recharge Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: '#FFFFFF',
            padding: '14px 28px',
            borderRadius: 20,
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
            border: `2px solid ${palette.accent}`,
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 700, color: palette.accent }}>
            +
          </span>
          <NumberTicker
            value={sceneConfig.rechargeAmountKRW}
            prefix="₩"
            suffix=" KRW"
            durationInFrames={45}
            delay={25}
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: palette.accent,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
