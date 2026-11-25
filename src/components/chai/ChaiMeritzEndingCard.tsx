import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export interface ChaiEndingCardProps {
  startFrame?: number;
  primaryColor?: string;
  badgeGold?: string;
  brandName?: string;
  headlineText?: string;
  outcomeText?: string;
  ctaText?: string;
  isSquareLayout?: boolean;
}

export const ChaiEndingCard: React.FC<ChaiEndingCardProps> = ({
  startFrame = 52, // Cut 5 starts at global frame 528 -> 528 + 52 = global frame 580
  primaryColor = '#0052FF',
  badgeGold = '#F59E0B',
  brandName = 'MERITZ PARTNERS',
  headlineText = '먼저 준비하는 사람이 임자, 메리츠파트너스!',
  outcomeText = '첫 달 평균 150만원 부수익',
  ctaText = '메리츠 파트너스 지금 지원하기',
  isSquareLayout = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame) {
    return null;
  }

  const localFrame = frame - startFrame;

  const cardSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, mass: 0.85, stiffness: 110 },
  });

  const opacity = interpolate(cardSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(cardSpring, [0, 1], [44, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(cardSpring, [0, 1], [0.94, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(6, 11, 25, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: isSquareLayout ? 96 : 0,
        paddingLeft: 56,
        paddingRight: 56,
        boxSizing: 'border-box',
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        zIndex: 30,
      }}
    >
      {/* Official Meritz Partners Logo */}
      <div
        style={{
          marginBottom: isSquareLayout ? 20 : 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Img
          src={staticFile('assets/chai/logo/logo_wh.png')}
          alt={brandName}
          style={{
            width: isSquareLayout ? 300 : 360,
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Punchline Copy */}
      <div
        style={{
          fontSize: isSquareLayout ? 28 : 34,
          fontWeight: 800,
          color: '#E2E8F0',
          textAlign: 'center',
          lineHeight: 1.4,
          marginBottom: isSquareLayout ? 20 : 32,
          wordBreak: 'keep-all',
          fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
        }}
      >
        {headlineText}
      </div>

      {/* Outcome Badge */}
      <div
        style={{
          padding: isSquareLayout ? '12px 30px' : '14px 36px',
          borderRadius: 999,
          backgroundColor: 'rgba(245, 158, 11, 0.18)',
          border: `2px solid ${badgeGold}`,
          color: badgeGold,
          fontSize: isSquareLayout ? 28 : 34,
          fontWeight: 900,
          marginBottom: isSquareLayout ? 22 : 32,
          textAlign: 'center',
          fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
          boxShadow: '0 8px 24px rgba(245, 158, 11, 0.28)',
        }}
      >
        {outcomeText}
      </div>

      {/* CTA Pill */}
      <div
        style={{
          padding: isSquareLayout ? '18px 42px' : '24px 52px',
          borderRadius: 999,
          background: `linear-gradient(135deg, ${primaryColor} 0%, #2563EB 100%)`,
          color: '#FFFFFF',
          fontSize: isSquareLayout ? 30 : 36,
          fontWeight: 900,
          textAlign: 'center',
          fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
          boxShadow: '0 14px 36px rgba(0, 82, 255, 0.5)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        {ctaText}
      </div>
    </div>
  );
};

// Backwards-compatible alias
export const ChaiMeritzEndingCard = ChaiEndingCard;
export type ChaiMeritzEndingCardProps = ChaiEndingCardProps;
