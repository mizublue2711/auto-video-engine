import React from 'react';

export interface GearSmartCalculatorProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GearSmartCalculator: React.FC<GearSmartCalculatorProps> = ({
  size = 180,
  className,
  style,
}) => {
  const width = size;
  const height = size * 1.3;
  const scale = size / 180;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: 24 * scale,
        background: 'linear-gradient(145deg, #FFFFFF 0%, #F1F5F9 100%)',
        border: `${Math.max(1, 1.5 * scale)}px solid #E2E8F0`,
        boxShadow: '0 20px 36px rgba(2, 132, 199, 0.22)',
        padding: 18 * scale,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ...style,
      }}
    >
      {/* Mini OLED Display */}
      <div
        style={{
          width: '100%',
          height: 48 * scale,
          borderRadius: 14 * scale,
          background: '#0F172A',
          color: '#00E5FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: `0 ${14 * scale}px`,
          boxSizing: 'border-box',
          fontSize: Math.max(14, 22 * scale),
          fontWeight: 900,
          fontFamily: '"SF Pro Display", "Roboto Mono", "Courier New", monospace',
          letterSpacing: 1 * scale,
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
        }}
      >
        +50,000C
      </div>

      {/* Modern Round Neumorphic Keypad */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8 * scale,
          marginTop: 12 * scale,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 28 * scale,
              borderRadius: 10 * scale,
              background: i === 8 ? '#0284C7' : '#FFFFFF',
              border: `${Math.max(1, 1 * scale)}px solid #E2E8F0`,
              boxShadow: '0 2px 4px rgba(0,0,0,0.06)',
            }}
          />
        ))}
      </div>

      <div
        style={{
          fontSize: Math.max(8, 11 * scale),
          fontWeight: 700,
          color: '#94A3B8',
          textAlign: 'center',
          marginTop: 6 * scale,
          letterSpacing: 0.5 * scale,
        }}
      >
        CRABIT SCHOLAR
      </div>
    </div>
  );
};
