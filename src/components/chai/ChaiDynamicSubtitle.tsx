import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface ChaiDynamicSubtitleProps {
  text: string;
  speaker?: string;
  badgeText?: string;
  isSquareLayout?: boolean;
}

interface ParsedDialogueLine {
  speakerLabel?: string;
  content: string;
  isMeri: boolean;
}

const parseDialogueLines = (rawText: string): ParsedDialogueLine[] => {
  return rawText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const colonIdx = line.indexOf(':');
      if (colonIdx > 0 && colonIdx <= 8) {
        const speakerLabel = line.slice(0, colonIdx).trim();
        const content = line.slice(colonIdx + 1).trim();
        const isMeri = speakerLabel.includes('메리') || speakerLabel.toLowerCase().includes('meri');
        return { speakerLabel, content, isMeri };
      }
      return { content: line, isMeri: false };
    });
};

export const ChaiDynamicSubtitle: React.FC<ChaiDynamicSubtitleProps> = ({
  text,
  speaker,
  badgeText,
  isSquareLayout = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 14,
      mass: 0.8,
      stiffness: 120,
    },
  });

  const translateY = interpolate(entrance, [0, 1], [36, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scale = interpolate(entrance, [0, 1], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(entrance, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Kinetic pop-up badge spring (delayed slightly for snappy reveal)
  const badgeSpring = spring({
    frame: Math.max(0, frame - 6),
    fps,
    config: {
      damping: 10,
      mass: 0.7,
      stiffness: 180,
    },
  });

  const badgeScale = interpolate(badgeSpring, [0, 1], [0.6, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const badgeOpacity = interpolate(badgeSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lines = parseDialogueLines(text);
  const isDualSpeaker = lines.length > 1;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 44,
        paddingRight: 44,
        boxSizing: 'border-box',
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
      }}
    >
      {/* Kinetic Highlight Pop-Up Badge (e.g., 150냥, 멘토 스승) */}
      {badgeText && (
        <div
          style={{
            marginBottom: 14,
            padding: '10px 28px',
            borderRadius: 999,
            background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
            color: '#111827',
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: '0.02em',
            fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.55)',
            border: '2px solid rgba(255, 255, 255, 0.65)',
            transform: `scale(${badgeScale})`,
            opacity: badgeOpacity,
          }}
        >
          ★ {badgeText}
        </div>
      )}

      {/* Single-speaker pill tag when not already inline in dual-speaker mode */}
      {!isDualSpeaker && speaker && (
        <div
          style={{
            marginBottom: 10,
            padding: '5px 18px',
            borderRadius: 999,
            backgroundColor: 'rgba(245, 158, 11, 0.22)',
            border: '1.5px solid #F59E0B',
            color: '#FDE68A',
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '0.04em',
            fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
          }}
        >
          {speaker}
        </div>
      )}

      {/* High-Contrast Subtitle Container */}
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.78)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderRadius: 24,
          padding: isDualSpeaker ? '22px 32px' : '22px 36px',
          border: '1.5px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 14px 36px rgba(0, 0, 0, 0.55)',
          maxWidth: '94%',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {lines.map((line, idx) => (
          <div
            key={`${idx}-${line.speakerLabel ?? 'line'}`}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            {line.speakerLabel && (
              <span
                style={{
                  padding: '3px 12px',
                  borderRadius: 8,
                  backgroundColor: line.isMeri
                    ? 'rgba(245, 158, 11, 0.92)'
                    : 'rgba(59, 130, 246, 0.88)',
                  color: line.isMeri ? '#111827' : '#FFFFFF',
                  fontSize: 24,
                  fontWeight: 900,
                  fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
                  flexShrink: 0,
                }}
              >
                {line.speakerLabel}
              </span>
            )}
            <p
              style={{
                margin: 0,
                color: line.isMeri ? '#FDE68A' : '#FFFFFF',
                fontSize: isSquareLayout
                  ? isDualSpeaker
                    ? 28
                    : 32
                  : isDualSpeaker
                    ? 34
                    : 38,
                fontWeight: 800,
                lineHeight: 1.35,
                textAlign: 'center',
                wordBreak: 'keep-all',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                fontFamily: 'Pretendard, "Noto Sans KR", sans-serif',
              }}
            >
              {line.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
