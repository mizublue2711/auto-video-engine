import React from 'react';

export interface CrabitDebitCardProps {
  cardHolder?: string;
  validThru?: string;
  chargedAmount?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
}

export const CrabitDebitCard: React.FC<CrabitDebitCardProps> = ({
  cardHolder = 'KIM MIN-JUN',
  validThru = '12/29',
  chargedAmount = '+50,000 KRW CHARGED',
  width = 720,
  height = 450,
  style,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        height,
        // Đảm bảo không bị cắt bất kỳ góc hay mép nào
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {/* 1. SOFT AMBIENT GLOW BEHIND THE CARD */}
      <div
        style={{
          position: 'absolute',
          inset: -12,
          background: 'radial-gradient(circle at 60% 40%, rgba(0, 229, 255, 0.35) 0%, transparent 70%)',
          borderRadius: 36,
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      {/* 2. THE MASTER CARD SURFACE (SMOOTH 28px SQUIRCLE) */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 28,
          background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 45%, #0F224A 100%)',
          border: '1.5px solid rgba(255, 255, 255, 0.35)',
          boxShadow: '0 24px 60px -12px rgba(2, 44, 94, 0.45), 0 10px 24px -6px rgba(0, 229, 255, 0.25)',
          position: 'relative',
          overflow: 'hidden',
          padding: '36px 42px',
          boxSizing: 'border-box',
          fontFamily: 'Pretendard, -apple-system, sans-serif',
          color: '#FFFFFF',
        }}
      >
        {/* Subtle diagonal metallic sheen overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.12) 50%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* HEADER: LOGO & TYPE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Cyan Gemstone Symbol */}
            <svg width={28} height={28} viewBox="0 0 32 32" fill="none">
              <polygon points="16,2 30,12 25,29 7,29 2,12" fill="#00E5FF" />
              <polygon points="16,6 26,14 22,26 10,26 6,14" fill="#FFFFFF" fillOpacity="0.3" />
            </svg>
            <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: 0.5, color: '#FFFFFF' }}>
              CRABIT
            </span>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#38BDF8', letterSpacing: 1 }}>
              // SCHOLARSHIP
            </span>
          </div>

          {/* Contactless Wave Icon */}
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round">
            <path d="M8.5 16.5a5 5 0 0 1 0-9" />
            <path d="M12 19a8.5 8.5 0 0 0 0-14" />
            <path d="M15.5 21.5a12 12 0 0 0 0-19" />
          </svg>
        </div>

        {/* MID: GOLD CHIP EMV */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
          <div
            style={{
              width: 68,
              height: 52,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)',
              border: '1px solid #FCD34D',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.35)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Chip circuitry lines */}
            <div style={{ position: 'absolute', inset: 4, border: '1px solid rgba(180, 83, 9, 0.4)', borderRadius: 6 }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'rgba(180, 83, 9, 0.4)' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(180, 83, 9, 0.4)' }} />
          </div>

          {/* Interlocking Card Circles Brand Mark */}
          <div style={{ position: 'relative', width: 54, height: 34, marginLeft: 'auto' }}>
            <div style={{ position: 'absolute', left: 0, width: 34, height: 34, borderRadius: '50%', background: 'rgba(255, 255, 255, 0.25)', border: '1.5px solid rgba(255, 255, 255, 0.6)' }} />
            <div style={{ position: 'absolute', right: 0, width: 34, height: 34, borderRadius: '50%', background: 'rgba(0, 229, 255, 0.3)', border: '1.5px solid rgba(0, 229, 255, 0.8)' }} />
          </div>
        </div>

        {/* MASKED CARD NUMBER */}
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4, color: '#E2E8F0', marginBottom: 28, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
          •••• &nbsp; •••• &nbsp; •••• &nbsp; 5022
        </div>

        {/* FOOTER: HOLDER NAME, DATE & CELEBRATION PILL BADGE */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 36 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: 1, marginBottom: 4 }}>
                CARDHOLDER NAME
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.5, color: '#FFFFFF' }}>
                {cardHolder}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', letterSpacing: 1, marginBottom: 4 }}>
                VALID THRU
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: 0.5, color: '#FFFFFF' }}>
                {validThru}
              </div>
            </div>
          </div>

          {/* K-FINTECH CELEBRATION PILL BADGE */}
          <div
            style={{
              background: 'rgba(0, 229, 255, 0.15)',
              border: '1.5px solid #00E5FF',
              borderRadius: 999,
              padding: '10px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 4px 18px rgba(0, 229, 255, 0.35)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 8px #00E5FF' }} />
            <span style={{ fontSize: 16, fontWeight: 800, color: '#FFFFFF', letterSpacing: 0.5 }}>
              {chargedAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
