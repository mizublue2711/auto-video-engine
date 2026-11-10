import React from 'react';
import { AbsoluteFill } from 'remotion';
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

      {/* Animated Currency / Points Deposit Counter */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          backgroundColor: '#FFFFFF',
          padding: '16px 36px',
          borderRadius: 24,
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
          border: `2px solid ${palette.accent}`,
          zIndex: 80,
        }}
      >
        <span style={{ fontSize: 28, fontWeight: 700, color: palette.text }}>
          +
        </span>
        <NumberTicker
          value={sceneConfig.rewardAmount}
          suffix={` ${sceneConfig.rewardCurrency}`}
          durationInFrames={45}
          delay={25}
          style={{
            fontSize: 36,
            fontWeight: 900,
            color: palette.accent,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
