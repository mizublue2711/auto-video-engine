import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

export interface TransitionProps {
  children: React.ReactNode;
  durationInFrames: number;
  direction?: 'left' | 'right' | 'up' | 'down';
}

/**
 * Whip-pan camera transition simulating high-speed directional motion blur.
 */
export const WhipPanTransition: React.FC<TransitionProps> = ({
  children,
  durationInFrames,
  direction = 'left',
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const getTranslate = () => {
    const distance = 100;
    switch (direction) {
      case 'left':
        return `translateX(${interpolate(progress, [0, 1], [distance, 0])}%)`;
      case 'right':
        return `translateX(${interpolate(progress, [0, 1], [-distance, 0])}%)`;
      case 'up':
        return `translateY(${interpolate(progress, [0, 1], [distance, 0])}%)`;
      case 'down':
        return `translateY(${interpolate(progress, [0, 1], [-distance, 0])}%)`;
    }
  };

  const blurAmount = interpolate(
    progress,
    [0, 0.5, 1],
    [0, 16, 0]
  );

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        transform: getTranslate(),
        filter: `blur(${blurAmount}px)`,
        willChange: 'transform, filter',
      }}
    >
      {children}
    </div>
  );
};

export interface ZoomBlurProps {
  children: React.ReactNode;
  durationInFrames: number;
  startScale?: number;
  endScale?: number;
}

/**
 * Zoom-blur dynamic focal punch transition.
 */
export const ZoomBlurTransition: React.FC<ZoomBlurProps> = ({
  children,
  durationInFrames,
  startScale = 1.3,
  endScale = 1.0,
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, durationInFrames], [startScale, endScale], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const blur = interpolate(frame, [0, durationInFrames * 0.7, durationInFrames], [12, 2, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, durationInFrames * 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
        opacity,
        transformOrigin: 'center center',
        willChange: 'transform, opacity, filter',
      }}
    >
      {children}
    </div>
  );
};
