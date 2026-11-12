import React from 'react';
import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';

export interface SpringBurstWrapperProps {
  children: React.ReactNode;
  origin?: { x: number; y: number }; // Điểm bắt đầu bung (mặc định tâm 960, 540)
  target: { x: number; y: number };  // Điểm đáp đến
  startFrame?: number;
  fps?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  scaleFrom?: number;
  scaleTo?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const SpringBurstWrapper: React.FC<SpringBurstWrapperProps> = ({
  children,
  origin = { x: 960, y: 540 },
  target,
  startFrame = 0,
  fps,
  stiffness = 85,
  damping = 13,
  mass = 0.8,
  scaleFrom = 0.1,
  scaleTo = 1,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const actualFps = fps ?? videoConfig?.fps ?? 30;

  const progress = spring({
    frame: frame - startFrame,
    fps: actualFps,
    config: { stiffness, damping, mass },
  });

  const x = interpolate(progress, [0, 1], [origin.x, target.x], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(progress, [0, 1], [origin.y, target.y], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(progress, [0, 1], [scaleFrom, scaleTo], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: frame < startFrame ? 0 : opacity,
        pointerEvents: frame < startFrame ? 'none' : 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
