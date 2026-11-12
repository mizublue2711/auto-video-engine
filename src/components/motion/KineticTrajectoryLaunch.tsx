import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

export interface KineticTrajectoryLaunchProps {
  children: React.ReactNode;
  from?: { x: number; y: number };      // Điểm phóng (mặc định dưới trái: 200, 1150)
  to?: { x: number; y: number };        // Điểm đáp (mặc định tâm: 960, 540)
  startFrame?: number;                  // Frame bắt đầu phóng
  durationInFrames?: number;            // Thời lượng bay (mặc định 30)
  squashFactor?: number;                // Hệ số nén dẹt theo quán tính (mặc định 0.25)
  style?: React.CSSProperties;
  className?: string;
}

export const KineticTrajectoryLaunch: React.FC<KineticTrajectoryLaunchProps> = ({
  children,
  from = { x: 200, y: 1150 },
  to = { x: 960, y: 540 },
  startFrame = 0,
  durationInFrames = 30,
  squashFactor = 0.25,
  style,
  className,
}) => {
  const frame = useCurrentFrame();

  // Exponential ease-in acceleration (Lao vút nhanh dần)
  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, 1],
    {
      easing: Easing.bezier(0.7, 0, 0.85, 0.35),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Position interpolation
  const currentX = interpolate(progress, [0, 1], [from.x, to.x], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currentY = interpolate(progress, [0, 1], [from.y, to.y], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Velocity-based dynamic stretch along flight path
  const scaleX = 1 + progress * squashFactor;
  const scaleY = 1 - progress * (squashFactor * 0.7);

  // Flight Angle (Góc xoay theo hướng di chuyển)
  const angleRad = Math.atan2(to.y - from.y, to.x - from.x);
  const angleDeg = (angleRad * 180) / Math.PI;

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + Math.min(6, durationInFrames)],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        left: currentX,
        top: currentY,
        transform: `translate(-50%, -50%) rotate(${angleDeg * (1 - progress)}deg) scale(${scaleX}, ${scaleY})`,
        opacity: frame < startFrame ? 0 : opacity,
        pointerEvents: frame < startFrame ? 'none' : 'auto',
        transformOrigin: 'center center',
        willChange: 'transform, opacity, left, top',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
