import React from 'react';
import { useCurrentFrame, spring, interpolate, useVideoConfig } from 'remotion';

export interface KineticStaggerWrapperProps {
  children: React.ReactNode;
  staggerIndex?: number;    // Thứ tự xuất hiện (0, 1, 2, 3) để tạo độ trễ nối tiếp
  inFrame?: number;         // Frame bắt đầu Move In (mặc định frame 15)
  outFrame?: number;        // Frame bắt đầu Move Out (nếu có)
  direction?: 'up' | 'down' | 'left' | 'right';
  fps?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const KineticStaggerWrapper: React.FC<KineticStaggerWrapperProps> = ({
  children,
  staggerIndex = 0,
  inFrame = 15,
  outFrame,
  direction = 'up',
  fps,
  className,
  style,
}) => {
  const frame = useCurrentFrame();
  const videoConfig = useVideoConfig();
  const actualFps = fps ?? videoConfig?.fps ?? 30;

  const delay = inFrame + staggerIndex * 6; // Mỗi thẻ trễ 6 frames tạo nhịp thác đổ (stagger cascade)

  // 1. SPRING PHYSICS ENTRANCE (MOVE IN)
  const springProgress = spring({
    frame: frame - delay,
    fps: actualFps,
    config: {
      damping: 14,
      stiffness: 110,
      mass: 0.8,
    },
  });

  // Độ mờ In
  const opacityIn = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tọa độ dịch chuyển In (offset giảm dần từ 40px về 0px)
  const translateIn = interpolate(springProgress, [0, 1], [40, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scaleIn = interpolate(springProgress, [0, 1], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 2. OPTIONAL EXIT (MOVE OUT)
  let opacityOut = 1;
  let translateOut = 0;
  if (outFrame && frame >= outFrame) {
    const exitDelay = outFrame + staggerIndex * 3;
    opacityOut = interpolate(frame, [exitDelay, exitDelay + 10], [1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    translateOut = interpolate(frame, [exitDelay, exitDelay + 10], [0, -30], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // Quyết định trục di chuyển
  const getTransform = () => {
    const currentOffset = translateIn + translateOut;
    switch (direction) {
      case 'left':
        return `translateX(-${currentOffset}px) scale(${scaleIn})`;
      case 'right':
        return `translateX(${currentOffset}px) scale(${scaleIn})`;
      case 'down':
        return `translateY(-${currentOffset}px) scale(${scaleIn})`;
      case 'up':
      default:
        return `translateY(${currentOffset}px) scale(${scaleIn})`;
    }
  };

  return (
    <div
      className={className}
      style={{
        opacity: opacityIn * opacityOut,
        transform: getTransform(),
        transformOrigin: 'center center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
