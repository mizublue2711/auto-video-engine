import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export interface VortexSuckWrapperProps {
  children: React.ReactNode;
  origin?: { x: number; y: number };        // Tọa độ ban đầu (nếu là absolute item)
  targetCenter?: { x: number; y: number };  // Tâm hút xoáy (mặc định 960, 540)
  startFrame?: number;                      // Frame bắt đầu hút (mặc định 0)
  durationInFrames: number;                 // Số frames hút
  spins?: number;                           // Số vòng xoay khi bị hút (mặc định 1.5)
  style?: React.CSSProperties;
  className?: string;
}

export const VortexSuckWrapper: React.FC<VortexSuckWrapperProps> = ({
  children,
  origin,
  targetCenter = { x: 960, y: 540 },
  startFrame = 0,
  durationInFrames,
  spins = 1.5,
  style,
  className,
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, 1],
    {
      easing: Easing.bezier(0.65, 0, 0.85, 0.2),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const scale = 1 - progress;
  const rotation = progress * 360 * spins;
  const opacity = interpolate(progress, [0.7, 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Nếu có origin cụ thể, tính toán quỹ đạo xoắn ốc hướng tâm về targetCenter
  if (origin) {
    const dx0 = origin.x - targetCenter.x;
    const dy0 = origin.y - targetCenter.y;
    const initialRadius = Math.hypot(dx0, dy0);
    const initialAngle = Math.atan2(dy0, dx0);

    const currentRadius = initialRadius * (1 - progress);
    const currentAngle = initialAngle + progress * 2 * Math.PI * spins;

    const currentX = targetCenter.x + currentRadius * Math.cos(currentAngle);
    const currentY = targetCenter.y + currentRadius * Math.sin(currentAngle);

    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          left: currentX,
          top: currentY,
          transform: `translate(-50%, -50%) scale(${scale.toFixed(3)}) rotate(${rotation.toFixed(2)}deg)`,
          opacity,
          transformOrigin: 'center center',
          pointerEvents: 'none',
          ...style,
        }}
      >
        {children}
      </div>
    );
  }

  // Chế độ thuần Transform (theo đúng spec mặc định)
  return (
    <div
      className={className}
      style={{
        transform: `scale(${scale.toFixed(3)}) rotate(${rotation.toFixed(2)}deg)`,
        opacity,
        transformOrigin: 'center center',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
