import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface ZeroGFloatWrapperProps {
  children: React.ReactNode;
  amplitude?: number;          // Biên độ lắc lư tổng quát (px, mặc định 12)
  frequency?: number;          // Tốc độ sóng dao động (mặc định 0.08)
  phaseOffset?: number;        // Độ lệch pha (radian, mặc định 0)
  amplitudeX?: number;         // Biên độ lắc dạt ngang px (tuỳ chọn)
  amplitudeY?: number;         // Biên độ lắc bồng bềnh dọc px (tuỳ chọn, fallback về amplitude)
  amplitudeRotate?: number;    // Biên độ xoay nghiêng deg (tuỳ chọn, mặc định 2)
  style?: React.CSSProperties;
  className?: string;
}

export const ZeroGFloatWrapper: React.FC<ZeroGFloatWrapperProps> = ({
  children,
  amplitude = 12,
  frequency = 0.08,
  phaseOffset = 0,
  amplitudeX = 0,
  amplitudeY,
  amplitudeRotate = 2,
  style,
  className,
}) => {
  const frame = useCurrentFrame();

  const effY = amplitudeY ?? amplitude;
  const offsetY = Math.sin(frame * frequency + phaseOffset) * effY;
  const rotateOffset = Math.cos(frame * frequency + phaseOffset) * amplitudeRotate;
  const offsetX = amplitudeX ? Math.sin(frame * frequency * 0.7 + phaseOffset) * amplitudeX : 0;

  const transform = offsetX
    ? `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0) rotate(${rotateOffset.toFixed(2)}deg)`
    : `translateY(${offsetY.toFixed(2)}px) rotate(${rotateOffset.toFixed(2)}deg)`;

  return (
    <div
      className={className}
      style={{
        transform,
        transformOrigin: 'center center',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
