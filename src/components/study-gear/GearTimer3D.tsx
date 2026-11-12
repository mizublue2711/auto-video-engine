import React from 'react';

export interface GearTimer3DProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GearTimer3D: React.FC<GearTimer3DProps> = ({
  size = 200,
  className,
  style,
}) => {
  const width = size;
  const height = size * 0.95;
  const scale = size / 200;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        height,
        filter: 'drop-shadow(0 20px 32px rgba(2, 132, 199, 0.22)) drop-shadow(0 6px 14px rgba(15, 23, 42, 0.12))',
        fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ...style,
      }}
    >
      {/* 1. CHASSIS ISOMETRIC 3D DEPTH (Góc vát chân đế tạo khối 3D) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: width - 8 * scale,
          height: height - 6 * scale,
          borderRadius: 28 * scale,
          background: 'linear-gradient(135deg, #CBD5E1 0%, #94A3B8 50%, #64748B 100%)',
          boxShadow: 'inset 0 -2px 6px rgba(0, 0, 0, 0.25)',
        }}
      />

      {/* 2. MAIN PORCELAIN WHITE CHASSIS (Thân máy Dretec trắng ngọc cao cấp) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 8 * scale,
          bottom: 10 * scale,
          borderRadius: 26 * scale,
          background: 'linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 60%, #E2E8F0 100%)',
          border: `${Math.max(1, 1.5 * scale)}px solid rgba(255, 255, 255, 0.95)`,
          boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.9), inset 0 -3px 6px rgba(15, 23, 42, 0.05), 0 8px 18px rgba(2, 132, 199, 0.12)',
          padding: `${16 * scale}px ${18 * scale}px`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Subtle diagonal specular gloss */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, rgba(255,255,255,0.6) 0%, transparent 40%, rgba(255,255,255,0.2) 60%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* TOP HEADER: Branding & Cyan Status LED */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 * scale }}>
            <div
              style={{
                width: 7 * scale,
                height: 7 * scale,
                borderRadius: '50%',
                background: '#00E5FF',
                boxShadow: '0 0 8px #00E5FF, 0 0 14px rgba(0, 229, 255, 0.6)',
              }}
            />
            <span
              style={{
                fontSize: Math.max(7, 9 * scale),
                fontWeight: 800,
                letterSpacing: 1.2 * scale,
                color: '#0284C7',
                textTransform: 'uppercase',
              }}
            >
              CRABIT D-DAY TIMER
            </span>
          </div>

          <div
            style={{
              background: '#00E5FF',
              color: '#0C1E4A',
              fontSize: Math.max(8, 10 * scale),
              fontWeight: 900,
              padding: `${2 * scale}px ${8 * scale}px`,
              borderRadius: 12 * scale,
              letterSpacing: 0.5,
              boxShadow: '0 2px 6px rgba(0, 229, 255, 0.35)',
            }}
          >
            D-30
          </div>
        </div>

        {/* RECESSED OLED DIGITAL DISPLAY (Màn hình kỹ thuật số hiển thị thời gian học) */}
        <div
          style={{
            position: 'relative',
            borderRadius: 14 * scale,
            background: 'linear-gradient(180deg, #091326 0%, #0C1E4A 60%, #0F172A 100%)',
            border: `${Math.max(1, 1.5 * scale)}px solid rgba(2, 132, 199, 0.3)`,
            boxShadow: 'inset 0 4px 10px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0,0,0,0.08)',
            padding: `${10 * scale}px ${12 * scale}px`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 1,
          }}
        >
          {/* Glass reflection strip */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)',
              borderRadius: `${13 * scale}px ${13 * scale}px 0 0`,
              pointerEvents: 'none',
            }}
          />

          {/* Screen Sub-header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: Math.max(6, 8 * scale), color: '#38BDF8', fontWeight: 700, letterSpacing: 0.5 }}>
            <span>FOCUS STOPWATCH</span>
            <span>0.01s ACCURACY</span>
          </div>

          {/* Main Segmented Digital Readout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'center',
              gap: 2 * scale,
              marginTop: 4 * scale,
              marginBottom: 4 * scale,
            }}
          >
            <span
              style={{
                fontFamily: '"SF Pro Display", "Roboto Mono", "Courier New", monospace',
                fontSize: Math.max(16, 32 * scale),
                fontWeight: 900,
                color: '#00E5FF',
                letterSpacing: 1.5 * scale,
                textShadow: '0 0 14px rgba(0, 229, 255, 0.8), 0 0 24px rgba(0, 229, 255, 0.4)',
              }}
            >
              04:25:38
            </span>
            <span
              style={{
                fontFamily: '"SF Pro Display", "Roboto Mono", "Courier New", monospace',
                fontSize: Math.max(10, 16 * scale),
                fontWeight: 700,
                color: '#38BDF8',
                opacity: 0.9,
              }}
            >
              .62
            </span>
          </div>

          {/* Screen Bottom indicators */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: Math.max(6, 7.5 * scale), color: '#94A3B8', fontWeight: 600 }}>
              K-CSAT TARGET 10H
            </span>
            <div style={{ display: 'flex', gap: 3 * scale }}>
              <div style={{ width: 14 * scale, height: 3 * scale, borderRadius: 1.5 * scale, background: '#00E5FF' }} />
              <div style={{ width: 14 * scale, height: 3 * scale, borderRadius: 1.5 * scale, background: '#0284C7' }} />
              <div style={{ width: 14 * scale, height: 3 * scale, borderRadius: 1.5 * scale, background: 'rgba(255,255,255,0.2)' }} />
            </div>
          </div>
        </div>

        {/* BOTTOM TACTILE BUTTONS (Nút bấm vật lý công thái học) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1, marginTop: 4 * scale }}>
          <div style={{ display: 'flex', gap: 6 * scale }}>
            {/* RESET BUTTON */}
            <div
              style={{
                padding: `${5 * scale}px ${10 * scale}px`,
                borderRadius: 8 * scale,
                background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)',
                border: '1px solid #CBD5E1',
                boxShadow: '0 2px 4px rgba(15, 23, 42, 0.08), inset 0 1px 0 #FFFFFF',
                fontSize: Math.max(7, 8 * scale),
                fontWeight: 800,
                color: '#64748B',
                letterSpacing: 0.3,
              }}
            >
              RESET
            </div>

            {/* MODE BUTTON */}
            <div
              style={{
                padding: `${5 * scale}px ${10 * scale}px`,
                borderRadius: 8 * scale,
                background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)',
                border: '1px solid #CBD5E1',
                boxShadow: '0 2px 4px rgba(15, 23, 42, 0.08), inset 0 1px 0 #FFFFFF',
                fontSize: Math.max(7, 8 * scale),
                fontWeight: 800,
                color: '#0284C7',
                letterSpacing: 0.3,
              }}
            >
              MODE
            </div>
          </div>

          {/* PRIMARY TACTILE START / STOP BUTTON (Nút bấm tròn Cyan chủ đạo) */}
          <div
            style={{
              width: 38 * scale,
              height: 38 * scale,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00E5FF 0%, #0284C7 100%)',
              border: `${Math.max(1, 2 * scale)}px solid #FFFFFF`,
              boxShadow: '0 4px 10px rgba(0, 229, 255, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Play/Pause glyph */}
            <svg width={14 * scale} height={14 * scale} viewBox="0 0 24 24" fill="none">
              <path d="M7 6v12l10-6L7 6z" fill="#0C1E4A" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
