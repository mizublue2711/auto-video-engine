import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { createSpring } from '../../core/physics/springs';

export interface KineticTextProps {
  text: string;
  delay?: number;
  staggerDelay?: number;
  color?: string;
  fontSize?: number;
  fontWeight?: number | string;
  lineHeight?: number | string;
  splitBy?: 'words' | 'chars';
  style?: React.CSSProperties;
}

/**
 * High-impact kinetic typography with overflow clipping and staggered entrance springs.
 */
export const KineticText: React.FC<KineticTextProps> = ({
  text,
  delay = 0,
  staggerDelay = 3,
  color = '#111827',
  fontSize = 64,
  fontWeight = 800,
  lineHeight = 1.2,
  splitBy = 'words',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tokens = splitBy === 'words' ? text.split(' ') : text.split('');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: splitBy === 'words' ? '0.3em' : '0.02em',
        lineHeight,
        zIndex: 85, // Text reveals & kinetic overlays layer
        ...style,
      }}
    >
      {tokens.map((token, index) => {
        const tokenDelay = delay + index * staggerDelay;
        const progress = createSpring({
          frame,
          fps,
          preset: 'snappy',
          delay: tokenDelay,
          from: 0,
          to: 1,
        });

        const translateY = (1 - progress) * 100;
        const opacity = Math.min(1, Math.max(0, progress * 1.5));

        return (
          <span
            key={`${token}-${index}`}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              paddingBottom: '0.05em',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${translateY}%)`,
                opacity,
                color,
                fontSize,
                fontWeight,
              }}
            >
              {token}
            </span>
          </span>
        );
      })}
    </div>
  );
};
