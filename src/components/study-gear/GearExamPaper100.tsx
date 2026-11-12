import React from 'react';

export interface GearExamPaper100Props {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GearExamPaper100: React.FC<GearExamPaper100Props> = ({
  size = 210,
  className,
  style,
}) => {
  const width = size;
  const height = size * 0.76;
  const scale = size / 210;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        height,
        borderRadius: 22 * scale,
        background: '#FFFFFF',
        border: `${Math.max(1, 1.5 * scale)}px solid #CBD5E1`,
        boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12), 0 6px 14px rgba(2, 132, 199, 0.1)',
        padding: `${20 * scale}px ${22 * scale}px`,
        boxSizing: 'border-box',
        fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        ...style,
      }}
    >
      {/* 3 Binder Hole Punches on Left Margin */}
      <div
        style={{
          position: 'absolute',
          left: 8 * scale,
          top: '25%',
          width: 6 * scale,
          height: 6 * scale,
          borderRadius: '50%',
          background: '#CBD5E1',
          boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 8 * scale,
          top: '50%',
          width: 6 * scale,
          height: 6 * scale,
          borderRadius: '50%',
          background: '#CBD5E1',
          boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.15)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 8 * scale,
          top: '75%',
          width: 6 * scale,
          height: 6 * scale,
          borderRadius: '50%',
          background: '#CBD5E1',
          boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.15)',
        }}
      />

      <div style={{ marginLeft: 8 * scale }}>
        <div style={{ fontSize: Math.max(9, 13 * scale), fontWeight: 700, color: '#64748B' }}>
          2026 전국 대학수학능력시험
        </div>
        <div
          style={{
            fontSize: Math.max(12, 18 * scale),
            fontWeight: 900,
            color: '#0F172A',
            marginTop: 4 * scale,
            letterSpacing: -0.5,
          }}
        >
          수학 영역 모의평가
        </div>

        {/* Simulated Question Lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 * scale, marginTop: 14 * scale }}>
          <div style={{ width: '65%', height: 6 * scale, borderRadius: 3 * scale, background: '#F1F5F9' }} />
          <div style={{ width: '45%', height: 6 * scale, borderRadius: 3 * scale, background: '#F1F5F9' }} />
        </div>
      </div>

      {/* Dấu mộc tròn đỏ 100 điểm dập nổi (Blue/Cyan CSAT Perfect Score Seal) */}
      <div
        style={{
          position: 'absolute',
          right: 18 * scale,
          bottom: 16 * scale,
          width: 62 * scale,
          height: 62 * scale,
          borderRadius: '50%',
          border: `${Math.max(2, 3 * scale)}px solid #0284C7`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0284C7',
          transform: 'rotate(-12deg)',
          background: 'rgba(224, 242, 254, 0.4)',
          boxShadow: '0 4px 10px rgba(2, 132, 199, 0.2)',
        }}
      >
        <span
          style={{
            fontSize: Math.max(15, 24 * scale),
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: -0.5,
          }}
        >
          100
        </span>
        <span style={{ fontSize: Math.max(6, 9 * scale), fontWeight: 800, marginTop: 1 * scale }}>
          만점 인증
        </span>
      </div>
    </div>
  );
};
