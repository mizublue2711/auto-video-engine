import React from 'react';

export interface GearPlanner3DProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GearPlanner3D: React.FC<GearPlanner3DProps> = ({
  size = 220,
  className,
  style,
}) => {
  const width = size;
  const height = size * 1.28;
  const scale = size / 220;

  // Number of spiral rings along the top edge
  const spiralCount = 8;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        height,
        filter: 'drop-shadow(0 24px 38px rgba(2, 132, 199, 0.24)) drop-shadow(0 6px 16px rgba(15, 23, 42, 0.12))',
        fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ...style,
      }}
    >
      {/* 1. PAPER STACK DEPTH (Độ dày gáy tập 200 trang giấy ngọc 100gsm) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: width - 6 * scale,
          height: height - 10 * scale,
          borderRadius: `0 0 ${16 * scale}px ${16 * scale}px`,
          background: 'repeating-linear-gradient(180deg, #FFFFFF 0px, #E2E8F0 2px, #FFFFFF 4px)',
          boxShadow: 'inset 0 -2px 6px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)',
        }}
      />

      {/* 2. MAIN PLANNER SHEET (Trang lập kế hoạch 10분 플래너) */}
      <div
        style={{
          position: 'absolute',
          top: 8 * scale,
          left: 0,
          right: 8 * scale,
          bottom: 8 * scale,
          borderRadius: 16 * scale,
          background: '#FFFFFF',
          border: `${Math.max(1, 1.5 * scale)}px solid #E2E8F0`,
          boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 0.8), 0 4px 14px rgba(2, 132, 199, 0.1)',
          padding: `${22 * scale}px ${16 * scale}px ${14 * scale}px`,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Subtle dot-grid paper texture background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(#CBD5E1 0.75px, transparent 0.75px)',
            backgroundSize: `${8 * scale}px ${8 * scale}px`,
            opacity: 0.45,
            pointerEvents: 'none',
          }}
        />

        {/* Diagonal Cyan Highlighter Stroke behind title */}
        <div
          style={{
            position: 'absolute',
            top: 28 * scale,
            left: 14 * scale,
            width: 130 * scale,
            height: 12 * scale,
            background: 'rgba(0, 229, 255, 0.22)',
            borderRadius: 4 * scale,
            transform: 'rotate(-1deg)',
            pointerEvents: 'none',
          }}
        />

        {/* HEADER: Title, Date, D-Day Badge */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div
                style={{
                  fontSize: Math.max(7, 9 * scale),
                  fontWeight: 800,
                  color: '#0284C7',
                  letterSpacing: 1.2 * scale,
                  textTransform: 'uppercase',
                }}
              >
                K-STUDY 10-MIN PLANNER
              </div>
              <div
                style={{
                  fontSize: Math.max(12, 18 * scale),
                  fontWeight: 900,
                  color: '#0C1E4A',
                  letterSpacing: -0.5,
                  marginTop: 2 * scale,
                }}
              >
                오늘의 실전 몰입
              </div>
            </div>

            {/* Cyan D-Day Badge */}
            <div
              style={{
                background: '#00E5FF',
                color: '#0C1E4A',
                fontWeight: 900,
                fontSize: Math.max(9, 11 * scale),
                padding: `${4 * scale}px ${10 * scale}px`,
                borderRadius: 8 * scale,
                boxShadow: '0 3px 8px rgba(0, 229, 255, 0.4)',
                letterSpacing: 0.5,
              }}
            >
              D-DAY 28
            </div>
          </div>

          {/* Sub-bar: Target hours */}
          <div
            style={{
              display: 'flex',
              gap: 8 * scale,
              alignItems: 'center',
              marginTop: 6 * scale,
              fontSize: Math.max(6.5, 8.5 * scale),
              color: '#64748B',
              fontWeight: 700,
            }}
          >
            <span>DATE: 2026. 11. 12</span>
            <span style={{ color: '#CBD5E1' }}>|</span>
            <span style={{ color: '#0284C7' }}>TARGET: 12H 00M</span>
          </div>
        </div>

        {/* 10-MINUTE TIMELINE HEATMAP (Bảng theo dõi 10 phút tập trung cao độ) */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%)',
            border: '1px solid #E2E8F0',
            borderRadius: 10 * scale,
            padding: `${8 * scale}px ${10 * scale}px`,
            margin: `${6 * scale}px 0`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: Math.max(6, 7.5 * scale), fontWeight: 800, color: '#0284C7', marginBottom: 4 * scale }}>
            <span>10분 몰입 타임테이블 (08:00 - 24:00)</span>
            <span style={{ color: '#00E5FF' }}>TOTAL: 10.5H</span>
          </div>

          {/* 4 Rows of 10-minute micro blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 * scale }}>
            {[
              { time: '09:00', active: 6 },
              { time: '13:00', active: 5 },
              { time: '16:00', active: 6 },
              { time: '20:00', active: 4 },
            ].map((row, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', alignItems: 'center', gap: 4 * scale }}>
                <span style={{ fontSize: Math.max(5.5, 7 * scale), color: '#94A3B8', width: 26 * scale, fontWeight: 700 }}>
                  {row.time}
                </span>
                <div style={{ display: 'flex', gap: 2 * scale, flex: 1 }}>
                  {Array.from({ length: 6 }).map((_, bIdx) => (
                    <div
                      key={bIdx}
                      style={{
                        flex: 1,
                        height: 7 * scale,
                        borderRadius: 2 * scale,
                        background:
                          bIdx < row.active
                            ? bIdx % 2 === 0
                              ? '#00E5FF'
                              : '#0284C7'
                            : '#E2E8F0',
                        boxShadow: bIdx < row.active ? '0 1px 3px rgba(0, 229, 255, 0.35)' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CHECKLIST / TODAY'S TARGET GOALS (Mục tiêu học tập hàng ngày) */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 4.5 * scale }}>
          {[
            { tag: '수학', text: '킬러 문항 10제 완벽 정복', done: true },
            { tag: '국어', text: '수능특강 비문학 지문 분석', done: true },
            { tag: '영어', text: '고난도 빈칸추론 5문항 풀이', done: true },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6 * scale,
                fontSize: Math.max(7, 9 * scale),
                color: '#1E293B',
                fontWeight: 600,
              }}
            >
              {/* Checkbox with Cyan check */}
              <div
                style={{
                  width: 14 * scale,
                  height: 14 * scale,
                  borderRadius: 4 * scale,
                  background: item.done ? '#00E5FF' : '#F1F5F9',
                  border: `1px solid ${item.done ? '#00E5FF' : '#CBD5E1'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: item.done ? '0 2px 5px rgba(0, 229, 255, 0.4)' : 'none',
                }}
              >
                {item.done && (
                  <svg width={9 * scale} height={9 * scale} viewBox="0 0 24 24" fill="none">
                    <path d="M4 12l5 5L20 6" stroke="#0C1E4A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {/* Tag */}
              <span
                style={{
                  fontSize: Math.max(6, 7.5 * scale),
                  fontWeight: 800,
                  color: '#0284C7',
                  background: 'rgba(2, 132, 199, 0.1)',
                  padding: `${1 * scale}px ${4 * scale}px`,
                  borderRadius: 3 * scale,
                }}
              >
                {item.tag}
              </span>

              {/* Text */}
              <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* BOTTOM BRANDING & EMBOSSED SEAL */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #F1F5F9',
            paddingTop: 6 * scale,
          }}
        >
          <div style={{ display: 'flex', gap: 4 * scale, alignItems: 'center' }}>
            <div style={{ width: 6 * scale, height: 6 * scale, borderRadius: '50%', background: '#00E5FF' }} />
            <span style={{ fontSize: Math.max(6, 7.5 * scale), fontWeight: 800, color: '#94A3B8' }}>
              CRABIT ACADEMIC SERIES
            </span>
          </div>

          <div
            style={{
              fontSize: Math.max(6, 7.5 * scale),
              fontWeight: 900,
              color: '#0284C7',
              letterSpacing: 0.5,
              opacity: 0.85,
            }}
          >
            ★ VERIFIED PASS
          </div>
        </div>
      </div>

      {/* 3. TWIN-WIRE SPIRAL BINDING RINGS (Gáy xoắn kép kim loại ánh Cyan đỉnh sổ) */}
      <div
        style={{
          position: 'absolute',
          top: -2 * scale,
          left: 18 * scale,
          right: 26 * scale,
          display: 'flex',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        {Array.from({ length: spiralCount }).map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Metallic Double Ring (Vòng xoắn kim loại) */}
            <div
              style={{
                width: 7 * scale,
                height: 18 * scale,
                borderRadius: `${3.5 * scale}px`,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 30%, #00E5FF 70%, #0284C7 100%)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25), inset 0 1px 1px #FFFFFF',
                border: '0.5px solid rgba(255, 255, 255, 0.8)',
              }}
            />
            {/* Paper Punch-hole shadow (Lỗ bấm gáy) */}
            <div
              style={{
                width: 5 * scale,
                height: 5 * scale,
                borderRadius: '50%',
                background: '#CBD5E1',
                marginTop: -4 * scale,
                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.4)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
