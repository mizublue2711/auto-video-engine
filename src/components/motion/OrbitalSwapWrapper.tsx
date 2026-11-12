import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export interface OrbitalSwapWrapperProps {
  children: React.ReactNode;
  from: { x: number; y: number };
  to: { x: number; y: number };
  arcHeight?: number;           // Độ cong vồng lên (-) hoặc võng xuống (+) của đường đi (mặc định 60)
  arcCurvature?: number;        // Độ cong tương đương arcHeight
  arcDirection?: 'clockwise' | 'counter-clockwise';
  startFrame?: number;          // Frame bắt đầu tráo đổi vị trí
  durationInFrames?: number;     // Tổng số frames diễn ra quá trình di chuyển (mặc định 45)
  tiltAngle?: [number, number]; // Góc xoay nghiêng [bắt đầu, kết thúc] (mặc định [-10, 10])
  style?: React.CSSProperties;
  className?: string;
}

export const OrbitalSwapWrapper: React.FC<OrbitalSwapWrapperProps> = ({
  children,
  from,
  to,
  arcHeight,
  arcCurvature = 60,
  arcDirection = 'clockwise',
  startFrame = 0,
  durationInFrames = 45,
  tiltAngle = [-10, 10],
  style,
  className,
}) => {
  const frame = useCurrentFrame();

  const effectiveArcHeight = (arcHeight ?? arcCurvature) * (arcDirection === 'counter-clockwise' ? -1 : 1);

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, 1],
    {
      easing: Easing.bezier(0.45, 0.05, 0.55, 0.95),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Đường cong quỹ đạo (Arc trajectory)
  const linearX = interpolate(progress, [0, 1], [from.x, to.x], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const linearY = interpolate(progress, [0, 1], [from.y, to.y], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const arc = Math.sin(progress * Math.PI) * effectiveArcHeight;

  // Góc nghiêng vật lý
  const rotate = interpolate(progress, [0, 1], tiltAngle, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: linearX,
        top: linearY + arc,
        transform: `translate(-50%, -50%) rotate(${rotate.toFixed(2)}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
