import React from 'react';

export interface GearTextbook3DProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GearTextbook3D: React.FC<GearTextbook3DProps> = ({
  size = 220,
  className,
  style,
}) => {
  const width = size;
  const height = size * 1.25;
  const scale = size / 220;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        height,
        filter: 'drop-shadow(0 24px 36px rgba(2, 132, 199, 0.28))',
        ...style,
      }}
    >
      {/* 1. BOOK PAGES DEPTH (Gáy trang sách trắng ngọc) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 10 * scale,
          bottom: 10 * scale,
          width: 22 * scale,
          background: 'repeating-linear-gradient(90deg, #FFFFFF 0px, #E2E8F0 2px, #FFFFFF 4px)',
          borderRadius: `0 ${8 * scale}px ${8 * scale}px 0`,
          boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.1)',
        }}
      />

      {/* 2. HARDCOVER FRONT (Bìa cứng K-Math) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          right: 14 * scale,
          borderRadius: 22 * scale,
          background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 60%, #0C1E4A 100%)',
          border: `${Math.max(1.5, 2 * scale)}px solid rgba(255, 255, 255, 0.45)`,
          padding: `${24 * scale}px ${22 * scale}px`,
          boxSizing: 'border-box',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Metallic diagonal gloss sweep */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Tag & Bookmark Ribbon */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span
            style={{
              fontSize: Math.max(9, 12 * scale),
              fontWeight: 800,
              color: '#FFFFFF',
              background: 'rgba(255, 255, 255, 0.22)',
              padding: `${4 * scale}px ${10 * scale}px`,
              borderRadius: 8 * scale,
              letterSpacing: 0.5,
              backdropFilter: 'blur(4px)',
            }}
          >
            수학 I • CSAT
          </span>
          {/* Cyan Bookmark Ribbon */}
          <div
            style={{
              width: 16 * scale,
              height: 38 * scale,
              background: '#00E5FF',
              borderRadius: `0 0 ${4 * scale}px ${4 * scale}px`,
              boxShadow: '0 4px 8px rgba(0, 229, 255, 0.5)',
              marginTop: -24 * scale,
            }}
          />
        </div>

        {/* Center Title */}
        <div>
          <div
            style={{
              fontSize: Math.max(14, 26 * scale),
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: -0.5,
            }}
          >
            킬러 문항 <br />
            <span style={{ color: '#38BDF8' }}>실전 정복</span>
          </div>
          <div
            style={{
              fontSize: Math.max(8, 13 * scale),
              fontWeight: 600,
              color: '#BAE6FD',
              marginTop: 6 * scale,
            }}
          >
            Crabit Academic Series
          </div>
        </div>

        {/* Bottom Spine Indicator */}
        <div style={{ display: 'flex', gap: 6 * scale, alignItems: 'center' }}>
          <div
            style={{
              width: 8 * scale,
              height: 8 * scale,
              borderRadius: '50%',
              background: '#00E5FF',
              boxShadow: '0 0 8px rgba(0, 229, 255, 0.8)',
            }}
          />
          <div
            style={{
              width: 24 * scale,
              height: 8 * scale,
              borderRadius: 4 * scale,
              background: 'rgba(255,255,255,0.3)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
