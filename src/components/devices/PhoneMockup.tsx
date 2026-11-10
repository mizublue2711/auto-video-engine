import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { createSpring } from '../../core/physics/springs';

export interface PhoneMockupProps {
  children?: React.ReactNode;
  frameColor?: string;
  screenBg?: string;
  delay?: number;
  scale?: number;
  rotation?: number;
}

/**
 * Responsive vector mobile UI frame with dynamic content viewport and bezel notch.
 */
export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  children,
  frameColor = '#1F2937',
  screenBg = '#FFFFFF',
  delay = 0,
  scale = 1,
  rotation = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = createSpring({
    frame,
    fps,
    preset: 'snappy',
    delay,
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        width: 380,
        height: 760,
        backgroundColor: frameColor,
        borderRadius: 48,
        padding: 12,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        transform: `scale(${entrance * scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 60, // Devices & hero cards layer
        boxSizing: 'border-box',
      }}
    >
      {/* Phone Speaker & Camera Notch */}
      <div
        style={{
          width: 140,
          height: 24,
          backgroundColor: '#111827',
          borderRadius: '0 0 16px 16px',
          alignSelf: 'center',
          position: 'absolute',
          top: 12,
          zIndex: 70,
        }}
      />

      {/* Internal Screen Viewport */}
      <div
        style={{
          flex: 1,
          backgroundColor: screenBg,
          borderRadius: 36,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
};
