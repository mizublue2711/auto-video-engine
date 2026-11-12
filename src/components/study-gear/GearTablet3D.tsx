import React from 'react';

export interface GearTablet3DProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GearTablet3D: React.FC<GearTablet3DProps> = ({
  size = 260,
  className,
  style,
}) => {
  const width = size;
  const height = size * 0.7;
  const scale = size / 260;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        height,
        filter: 'drop-shadow(0 26px 40px rgba(2, 132, 199, 0.26)) drop-shadow(0 6px 16px rgba(15, 23, 42, 0.14))',
        fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ...style,
      }}
    >
      {/* 1. CHASSIS ISOMETRIC 3D DEPTH (Khối viền đáy nhôm Anodized) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: width - 8 * scale,
          height: height - 6 * scale,
          borderRadius: 22 * scale,
          background: 'linear-gradient(135deg, #CBD5E1 0%, #94A3B8 60%, #64748B 100%)',
          boxShadow: 'inset 0 -2px 5px rgba(0, 0, 0, 0.3)',
        }}
      />

      {/* 2. TABLET UNIBODY (Thân máy tính bảng viền siêu mỏng Porcelain White) */}
      <div
        style={{
          position: 'absolute',
          top: 8 * scale,
          left: 0,
          right: 8 * scale,
          bottom: 8 * scale,
          borderRadius: 20 * scale,
          background: '#0F172A',
          border: `${Math.max(1, 1.5 * scale)}px solid #CBD5E1`,
          padding: `${10 * scale}px ${12 * scale}px`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.2), 0 8px 24px rgba(0, 0, 0, 0.35)',
        }}
      >
        {/* OLED DISPLAY SURFACE */}
        <div
          style={{
            position: 'relative',
            flex: 1,
            borderRadius: 14 * scale,
            background: 'linear-gradient(145deg, #091326 0%, #031B38 50%, #022754 100%)',
            border: `${Math.max(1, 1 * scale)}px solid rgba(0, 229, 255, 0.25)`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Glass Specular Gloss Sweep */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(125deg, rgba(255,255,255,0.15) 0%, transparent 35%, rgba(0,229,255,0.06) 50%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          {/* STATUS BAR */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: `${4 * scale}px ${10 * scale}px`,
              fontSize: Math.max(7, 8 * scale),
              color: '#94A3B8',
              fontWeight: 600,
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 * scale }}>
              <span style={{ color: '#FFFFFF', fontWeight: 800 }}>09:42</span>
              <span style={{ color: '#00E5FF', fontSize: Math.max(6, 7 * scale) }}>● K-Study Live</span>
            </div>
            <span style={{ color: '#38BDF8', fontWeight: 700, letterSpacing: 0.5 }}>
              Crabit Note Pro • 수학 II
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 * scale }}>
              <span>98%</span>
              <div
                style={{
                  width: 14 * scale,
                  height: 7 * scale,
                  border: '1px solid #94A3B8',
                  borderRadius: 2 * scale,
                  padding: 1 * scale,
                }}
              >
                <div style={{ width: '90%', height: '100%', background: '#00E5FF', borderRadius: 1 * scale }} />
              </div>
            </div>
          </div>

          {/* NOTE CONTENT CANVAS */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              padding: `${8 * scale}px ${10 * scale}px`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 2,
            }}
          >
            {/* Note Title & Lesson Tag */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 * scale, background: 'rgba(2, 132, 199, 0.3)', padding: `${2 * scale}px ${6 * scale}px`, borderRadius: 4 * scale }}>
                  <span style={{ fontSize: Math.max(6, 8 * scale), fontWeight: 800, color: '#00E5FF' }}>
                    실전 개념 04
                  </span>
                </div>
                <div style={{ fontSize: Math.max(9, 12 * scale), fontWeight: 900, color: '#FFFFFF', marginTop: 2 * scale }}>
                  미분계수와 도함수의 기하학적 의미
                </div>
              </div>

              {/* Formula Badge */}
              <div
                style={{
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(0, 229, 255, 0.4)',
                  borderRadius: 6 * scale,
                  padding: `${3 * scale}px ${8 * scale}px`,
                  fontFamily: '"Courier New", monospace',
                  fontSize: Math.max(7, 9 * scale),
                  color: '#38BDF8',
                  fontWeight: 700,
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                }}
              >
                f'(a) = lim [f(x)-f(a)]/(x-a)
              </div>
            </div>

            {/* Vector Math Graph Canvas (SVG) */}
            <div style={{ position: 'relative', width: '100%', height: 60 * scale, margin: `${2 * scale}px 0` }}>
              <svg width="100%" height="100%" viewBox="0 0 240 60" fill="none">
                {/* Background Grid */}
                <line x1="10" y1="50" x2="230" y2="50" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <line x1="30" y1="5" x2="30" y2="55" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <line x1="10" y1="28" x2="230" y2="28" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 2" strokeWidth="1" />

                {/* Shaded Area under Curve */}
                <path
                  d="M 40 50 Q 80 10 130 35 T 210 15 L 210 50 Z"
                  fill="url(#tabletGradBlue)"
                  opacity="0.3"
                />

                {/* Main Neon Cyan Function Curve */}
                <path
                  d="M 30 52 Q 80 8 130 35 T 220 12"
                  stroke="#00E5FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Tangent Line */}
                <line x1="90" y1="42" x2="160" y2="26" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 2" />

                {/* Tangent Point P */}
                <circle cx="125" cy="34" r="3.5" fill="#FFFFFF" stroke="#00E5FF" strokeWidth="2" />
                <text x="132" y="32" fill="#BAE6FD" fontSize="8" fontWeight="bold">P(a, f(a))</text>

                <defs>
                  <linearGradient id="tabletGradBlue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Bottom Dock / Tool Palette */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(15, 23, 42, 0.8)',
                borderRadius: 8 * scale,
                padding: `${3 * scale}px ${8 * scale}px`,
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div style={{ display: 'flex', gap: 6 * scale }}>
                {/* Active Cyan Pen */}
                <div
                  style={{
                    background: '#00E5FF',
                    color: '#0C1E4A',
                    fontSize: Math.max(6, 7.5 * scale),
                    fontWeight: 900,
                    padding: `${2 * scale}px ${6 * scale}px`,
                    borderRadius: 4 * scale,
                    boxShadow: '0 0 8px rgba(0, 229, 255, 0.6)',
                  }}
                >
                  PEN 0.5
                </div>
                {/* Highlighter */}
                <div
                  style={{
                    background: 'rgba(56, 189, 248, 0.2)',
                    color: '#38BDF8',
                    fontSize: Math.max(6, 7.5 * scale),
                    fontWeight: 800,
                    padding: `${2 * scale}px ${6 * scale}px`,
                    borderRadius: 4 * scale,
                  }}
                >
                  HIGHLIGHTER
                </div>
                {/* Eraser */}
                <div
                  style={{
                    color: '#94A3B8',
                    fontSize: Math.max(6, 7.5 * scale),
                    fontWeight: 700,
                    padding: `${2 * scale}px ${4 * scale}px`,
                  }}
                >
                  ERASER
                </div>
              </div>

              <span style={{ fontSize: Math.max(6, 7.5 * scale), color: '#38BDF8', fontWeight: 700 }}>
                CRABIT ENGINE V2.4
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAGNETIC ATTACHED STYLUS (Bút cảm ứng Crabit Pencil hít nam châm đỉnh máy) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 40 * scale,
          width: 140 * scale,
          height: 10 * scale,
          borderRadius: 5 * scale,
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 60%, #CBD5E1 100%)',
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3), inset 0 1px 1px #FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `0 ${3 * scale}px`,
          zIndex: 5,
        }}
      >
        {/* Stylus Fine Nib (Mũi bút Cyan) */}
        <div
          style={{
            width: 8 * scale,
            height: 4 * scale,
            borderRadius: `0 ${2 * scale}px ${2 * scale}px 0`,
            background: '#00E5FF',
            boxShadow: '0 0 4px #00E5FF',
          }}
        />

        {/* Center Magnetic Branding */}
        <span
          style={{
            fontSize: Math.max(5, 5.5 * scale),
            fontWeight: 800,
            letterSpacing: 0.8 * scale,
            color: '#0284C7',
          }}
        >
          CRABIT PENCIL • WIRELESS CHARGING
        </span>

        {/* Charging LED */}
        <div
          style={{
            width: 4 * scale,
            height: 4 * scale,
            borderRadius: '50%',
            background: '#00E5FF',
            boxShadow: '0 0 6px #00E5FF',
          }}
        />
      </div>
    </div>
  );
};
