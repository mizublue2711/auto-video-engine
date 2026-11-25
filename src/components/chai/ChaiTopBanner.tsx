import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export interface ChaiTopBannerProps {
  title?: string;
  text?: string;
  badgeGold?: string;
  isSquareLayout?: boolean;
}

export const ChaiTopBanner: React.FC<ChaiTopBannerProps> = ({
  title,
  text,
  badgeGold = '#F59E0B',
  isSquareLayout = false,
}) => {
  const frame = useCurrentFrame();
  const displayTitle = title ?? text ?? '150만원 소문에 장터가 뒤집혔다';

  // Subtle breaking-news pulse glow (clamped per AGENT.md Rule 1.3)
  const pulsePhase = (frame % 36) / 36;
  const glowOpacity = interpolate(
    pulsePhase,
    [0, 0.5, 1],
    [0.4, 0.9, 0.4],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Clean mount entrance at frame 0 (clamped)
  const mountOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const mountTranslateY = interpolate(frame, [0, 10], [-24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: isSquareLayout ? 124 : 184,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: isSquareLayout ? 12 : 28,
        paddingLeft: 36,
        paddingRight: 36,
        boxSizing: 'border-box',
        borderBottom: `3px solid ${badgeGold}`,
        boxShadow: `0 8px 32px rgba(245, 158, 11, ${glowOpacity * 0.45})`,
        opacity: mountOpacity,
        transform: `translateY(${mountTranslateY}px)`,
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 8,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: badgeGold,
            boxShadow: `0 0 12px ${badgeGold}`,
            opacity: glowOpacity,
          }}
        />
        <span
          style={{
            fontSize: isSquareLayout ? 18 : 22,
            fontWeight: 800,
            letterSpacing: '0.14em',
            color: badgeGold,
            fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
          }}
        >
          BREAKING NEWS · 장터 속보
        </span>
      </div>
      <div
        style={{
          fontSize: isSquareLayout ? 36 : 44,
          fontWeight: 900,
          color: '#FFFFFF',
          textAlign: 'center',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          textShadow: `0 2px 16px rgba(245, 158, 11, ${glowOpacity * 0.55})`,
          fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
        }}
      >
        {displayTitle}
      </div>
    </div>
  );
};
