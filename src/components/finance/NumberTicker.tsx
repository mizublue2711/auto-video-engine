import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export interface NumberTickerProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationInFrames?: number;
  delay?: number;
  style?: React.CSSProperties;
  formatter?: (n: number) => string;
}

/**
 * Deterministic animated counter for currency and point increments.
 */
export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  prefix = '',
  suffix = '',
  durationInFrames = 45,
  delay = 0,
  style = {},
  formatter = (n) => Math.round(n).toLocaleString(),
}) => {
  const frame = useCurrentFrame();

  const currentCount = interpolate(
    frame - delay,
    [0, durationInFrames],
    [0, value],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <span
      style={{
        fontVariantNumeric: 'tabular-nums',
        display: 'inline-flex',
        alignItems: 'center',
        ...style,
      }}
    >
      {prefix}
      {formatter(currentCount)}
      {suffix}
    </span>
  );
};
