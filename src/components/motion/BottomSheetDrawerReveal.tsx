import React from 'react';
import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';

export interface BottomSheetDrawerRevealProps {
  children: React.ReactNode;
  startFrame?: number;                  // Frame bắt đầu xuất hiện (mặc định 100)
  fps?: number;                         // Tốc độ khung hình (mặc định lấy từ videoConfig hoặc 30)
  targetHeight?: number | string;       // Chiều cao khay giao diện (mặc định 560px)
  stiffness?: number;                   // Độ cứng lò xo (mặc định 95)
  damping?: number;                     // Độ giảm chấn lò xo (mặc định 15)
  style?: React.CSSProperties;
  className?: string;
}

export const BottomSheetDrawerReveal: React.FC<BottomSheetDrawerRevealProps> = ({
  children,
  startFrame = 100,
  fps,
  targetHeight = 560,
  stiffness = 95,
  damping = 15,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const actualFps = fps ?? videoConfig?.fps ?? 30;

  const progress = spring({
    frame: frame - startFrame,
    fps: actualFps,
    config: { stiffness, damping, mass: 0.9 },
  });

  // Trượt từ translateY(100%) lên translateY(0)
  const translateY = interpolate(progress, [0, 1], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(progress, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: targetHeight,
        transform: `translateY(${translateY}%)`,
        opacity: frame < startFrame ? 0 : opacity,
        pointerEvents: frame < startFrame ? 'none' : 'auto',
        zIndex: 50,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
