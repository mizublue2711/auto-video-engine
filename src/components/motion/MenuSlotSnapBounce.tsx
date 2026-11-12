import React from 'react';
import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';

export interface MenuSlotSnapBounceProps {
  children: React.ReactNode;
  snapFrame: number;                    // Frame thời điểm dụng cụ rơi trúng vào slot
  fps?: number;
  staggerIndex?: number;                // Độ trễ nếu nhiều slot xuất hiện đồng thời
  style?: React.CSSProperties;
  className?: string;
}

export const MenuSlotSnapBounce: React.FC<MenuSlotSnapBounceProps> = ({
  children,
  snapFrame,
  fps = 30,
  staggerIndex = 0,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const actualFps = fps ?? videoConfig?.fps ?? 30;
  const triggerFrame = snapFrame + staggerIndex * 4;

  const springProgress = spring({
    frame: frame - triggerFrame,
    fps: actualFps,
    config: {
      stiffness: 140,
      damping: 11,                      // Damping thấp để tạo độ nảy tưng đàn hồi
      mass: 0.7,
    },
  });

  // Elastic Scale Pop: 0.65 -> 1.08 -> 1.0
  const scale = interpolate(springProgress, [0, 1], [0.65, 1], {
    extrapolateLeft: 'clamp',
  });

  const opacity = interpolate(frame, [triggerFrame, triggerFrame + 3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className={className}
      style={{
        transform: `scale(${scale})`,
        opacity: frame < triggerFrame ? 0 : opacity,
        pointerEvents: frame < triggerFrame ? 'none' : 'auto',
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
