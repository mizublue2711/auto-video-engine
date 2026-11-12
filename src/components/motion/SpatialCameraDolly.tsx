import React from 'react';
import { useCurrentFrame, interpolate, Easing, useVideoConfig } from 'remotion';

export interface SpatialCameraDollyProps {
  children: React.ReactNode;
  durationInFrames?: number;
  zoomAmount?: number; // Tỉ lệ zoom đẩy tới (mặc định 1.0 -> 1.04)
  className?: string;
  style?: React.CSSProperties;
}

export const SpatialCameraDolly: React.FC<SpatialCameraDollyProps> = ({
  children,
  durationInFrames,
  zoomAmount = 1.04,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const totalFrames = durationInFrames ?? videoConfig?.durationInFrames ?? 119;

  // Slow Cinematic Push-in
  const scale = interpolate(frame, [0, totalFrames], [1, zoomAmount], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle Parallax Pan
  const panX = interpolate(frame, [0, totalFrames], [0, -12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        transform: `scale(${scale}) translateX(${panX}px)`,
        transformOrigin: 'center center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
