import React from 'react';

export const CrabitAppScreenUI: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Pretendard, -apple-system, sans-serif',
        padding: '24px 22px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* 1. STATUS BAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 18,
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: 16,
        }}
      >
        <span>09:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 16 }}>
          <div style={{ width: 18, height: 10, border: '1.5px solid #0F172A', borderRadius: 3 }} />
          <span>••</span>
        </div>
      </div>

      {/* 2. BRAND LOGO HEADER */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Cyan Gemstone Logo Mark */}
          <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
            <polygon points="16,2 30,12 25,29 7,29 2,12" fill="#00E5FF" />
            <polygon points="16,6 26,14 22,26 10,26 6,14" fill="#FFFFFF" fillOpacity="0.3" />
          </svg>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontSize: 26, fontWeight: 900, color: '#FF5252', letterSpacing: -0.5 }}>
              Crabit
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#FFFFFF',
                background: '#FF5252',
                padding: '2px 6px',
                borderRadius: 4,
              }}
            >
              KOREA
            </span>
          </div>
        </div>
        {/* User Avatar Circle */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#CBD5E1' }} />
        </div>
      </div>

      {/* 3. HERO SCHOLARSHIP BALANCE CARD */}
      <div
        style={{
          background: 'linear-gradient(145deg, #1E293B 0%, #0F172A 100%)',
          borderRadius: 24,
          padding: '22px 20px',
          boxShadow: '0 12px 28px rgba(15, 23, 42, 0.25)',
          marginBottom: 16,
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.8, color: '#94A3B8', marginBottom: 12 }}>
          MY SCHOLARSHIP BALANCE
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          {/* Faceted 3D Diamond */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #E0F2FE 0%, #38BDF8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.5)',
            }}
          >
            <span style={{ fontSize: 24 }}>💎</span>
          </div>
          <div>
            <span style={{ fontSize: 34, fontWeight: 900, color: '#FFFFFF', letterSpacing: -0.8 }}>
              50,000
            </span>{' '}
            <span style={{ fontSize: 24, fontWeight: 800, color: '#38BDF8' }}>
              Carats
            </span>
          </div>
        </div>

        {/* Currency Conversion Pill */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 12,
            padding: '10px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 14,
          }}
        >
          <span style={{ color: '#94A3B8', fontWeight: 500 }}>장학금 환산 가치</span>
          <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 16 }}>₩ 50,000 KRW</span>
        </div>
      </div>

      {/* 4. TODAY'S COMPLETED MISSION CARD */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 22,
          padding: '18px 20px',
          border: '1.5px solid #00E5FF',
          boxShadow: '0 8px 24px rgba(0, 229, 255, 0.16)',
          marginBottom: 14,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: 16,
                fontWeight: 900,
              }}
            >
              ✓
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#0F172A' }}>
                오늘의 미션 완료!
              </div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
                수학 집중 모드 30분 달성
              </div>
            </div>
          </div>
          <span
            style={{
              background: '#E0F2FE',
              color: '#0284C7',
              fontSize: 13,
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: 8,
            }}
          >
            +500 C
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
          <span style={{ color: '#64748B' }}>목표 달성률</span>
          <span style={{ color: '#0284C7' }}>100% 완료</span>
        </div>
        <div style={{ width: '100%', height: 7, background: '#E2E8F0', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: '100%', height: '100%', background: '#00E5FF', borderRadius: 999 }} />
        </div>
      </div>

      {/* 5. TEACHER AUTHENTICATION CARD */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 18,
          padding: '14px 18px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          👨‍🏫
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
            원장 선생님 인증 완료
          </div>
          <div style={{ fontSize: 12, color: '#10B981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>●</span> 실시간 캐럿 보상 지급 승인됨
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrabitAppScreenUI;
