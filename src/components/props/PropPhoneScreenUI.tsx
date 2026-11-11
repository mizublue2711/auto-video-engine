import React from 'react';
import { Easing, interpolate, useCurrentFrame } from 'remotion';

export interface PropPhoneScreenUIProps {
  /** Optional entrance delay in frames */
  delay?: number;
  /** Scale factor (Default: 1) */
  scale?: number;
  /** Optional container style overrides */
  style?: React.CSSProperties;
  /** Optional container className */
  className?: string;
  /** Optional scroll start frame (Default: 15) */
  scrollStartFrame?: number;
  /** Optional scroll end frame (Default: 105) */
  scrollEndFrame?: number;
  /** Optional scroll distance in px (Default: -1400) */
  scrollDistance?: number;
}

/**
 * PropPhoneScreenUI: High-resolution extended Crabit App UI Mockup
 * engineered for Chroma Matte compositing in Sequence 3.
 *
 * Viewport: 400px x 860px (borderRadius: 36px, overflow: hidden, bg: #0F172A)
 * Feed height: ~2400px with procedural scroll translation (scrollY: 0 -> -1400px)
 */
export const PropPhoneScreenUI: React.FC<PropPhoneScreenUIProps> = ({
  delay = 0,
  scale = 1,
  style,
  className,
  scrollStartFrame = 15,
  scrollEndFrame = 105,
  scrollDistance = -1400,
}) => {
  const frame = useCurrentFrame();

  // Procedural Scroll Physics: smoothly translates feed upward across 119 frames
  const scrollY = interpolate(
    frame - delay,
    [scrollStartFrame, scrollEndFrame], // Starts scrolling after frame 15, decelerates before frame 105
    [0, scrollDistance], // Smoothly translates feed upward by 1400px
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );

  const isPositioned = style?.left !== undefined || style?.top !== undefined;

  return (
    <div
      style={{
        width: 400,
        height: 860,
        borderRadius: 36,
        overflow: 'hidden',
        backgroundColor: '#0F172A',
        position: isPositioned ? 'absolute' : 'relative',
        transform: isPositioned
          ? `translate(-50%, -50%) scale(${scale})`
          : scale !== 1
          ? `scale(${scale})`
          : undefined,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Pretendard", "SF Pro Display", "Segoe UI", Roboto, sans-serif',
        boxSizing: 'border-box',
        boxShadow:
          '0 25px 60px rgba(0, 0, 0, 0.65), 0 0 40px rgba(0, 229, 255, 0.25)',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        userSelect: 'none',
        ...style,
      }}
      className={className}
    >
      {/* =================================================================== */}
      {/* 1. STICKY HEADER: Status Bar + Profile + Balance Pill (Z-Index: 50) */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Status Bar */}
        <div
          style={{
            height: 38,
            padding: '8px 20px 0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 13,
            fontWeight: 700,
            color: '#F8FAFC',
            letterSpacing: -0.2,
          }}
        >
          <span>22:45</span>

          {/* Dynamic Island Notch */}
          <div
            style={{
              width: 84,
              height: 18,
              backgroundColor: '#020617',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#1E293B',
              }}
            />
            <div
              style={{
                width: 28,
                height: 3,
                borderRadius: 2,
                backgroundColor: '#1E293B',
              }}
            />
          </div>

          {/* System Icons: Cellular + Wifi + Battery */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {/* Cellular signal */}
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
              <rect x="0" y="8" width="2.5" height="3" rx="0.5" fill="#F8FAFC" />
              <rect x="4" y="5.5" width="2.5" height="5.5" rx="0.5" fill="#F8FAFC" />
              <rect x="8" y="3" width="2.5" height="8" rx="0.5" fill="#F8FAFC" />
              <rect x="12" y="0" width="2.5" height="11" rx="0.5" fill="#F8FAFC" />
            </svg>

            {/* Wifi Icon */}
            <svg width="15" height="11" viewBox="0 0 16 12" fill="#F8FAFC">
              <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-4.2-3a5.9 5.9 0 018.4 0 .9.9 0 001.3-1.3 7.7 7.7 0 00-11 0 .9.9 0 001.3 1.3zm-2.8-2.8a9.9 9.9 0 0114 0 .9.9 0 001.3-1.3 11.7 11.7 0 00-16.6 0 .9.9 0 001.3 1.3z" />
            </svg>

            {/* Battery Pill */}
            <div
              style={{
                width: 22,
                height: 11,
                borderRadius: 3,
                border: '1.5px solid #F8FAFC',
                padding: 1.5,
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '92%',
                  height: '100%',
                  backgroundColor: '#10B981',
                  borderRadius: 1.5,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: -3.5,
                  width: 2,
                  height: 4,
                  backgroundColor: '#F8FAFC',
                  borderRadius: '0 1px 1px 0',
                }}
              />
            </div>
          </div>
        </div>

        {/* User Profile & Balance Pill */}
        <div
          style={{
            padding: '8px 18px 14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* User profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Avatar with status indicator */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0284C7 0%, #00E5FF 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: 15,
                boxShadow: '0 0 12px rgba(0, 229, 255, 0.45)',
                position: 'relative',
              }}
            >
              <span>준</span>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  border: '2px solid #0F172A',
                }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    letterSpacing: -0.3,
                  }}
                >
                  Kim Min-jun
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: '#38BDF8',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    padding: '2px 6px',
                    borderRadius: 6,
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                  }}
                >
                  D-120
                </span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>
                17yo CSAT candidate (고3)
              </div>
            </div>
          </div>

          {/* Balance Pill: Vibrant Cyan Carat diamond icon + 12,500 Carat */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '7px 12px',
              borderRadius: 20,
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              border: '1.5px solid rgba(0, 229, 255, 0.55)',
              boxShadow: '0 0 16px rgba(0, 229, 255, 0.28)',
              background:
                'linear-gradient(135deg, rgba(0, 229, 255, 0.18) 0%, rgba(2, 132, 199, 0.28) 100%)',
            }}
          >
            {/* Vibrant Cyan Carat Diamond Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 36 36"
              style={{ filter: 'drop-shadow(0 0 6px #00E5FF)' }}
            >
              <polygon
                points="18,2 34,14 26,34 10,34 2,14"
                fill="#00E5FF"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
              <polygon points="18,2 34,14 22,18 18,8" fill="#FFFFFF" opacity={0.65} />
              <polygon points="18,2 2,14 14,18 18,8" fill="#FFFFFF" opacity={0.45} />
            </svg>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 900,
                  color: '#00E5FF',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                12,500
              </span>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#E0F2FE' }}>
                Carat
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. EXTENDED VERTICAL FEED (Total Height ~2400px, Translates scrollY) */}
      {/* =================================================================== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          transform: `translateY(${scrollY}px)`,
          padding: '116px 16px 60px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxSizing: 'border-box',
        }}
      >
        {/* SECTION 1: HERO CHALLENGE CARD */}
        <div
          style={{
            background:
              'linear-gradient(135deg, #1E1B4B 0%, #0F172A 55%, #0369A1 100%)',
            borderRadius: 24,
            padding: '20px 18px',
            border: '1.5px solid rgba(0, 229, 255, 0.45)',
            boxShadow:
              '0 14px 30px -6px rgba(0, 229, 255, 0.22), 0 8px 20px rgba(0, 0, 0, 0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                backgroundColor: 'rgba(0, 229, 255, 0.15)',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                padding: '3px 9px',
                borderRadius: 12,
                fontSize: 10,
                fontWeight: 800,
                color: '#00E5FF',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              <span>⚡ WEEKLY QUEST</span>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#93C5FD' }}>
              ⏱ D-3 Days Left
            </div>
          </div>

          <div
            style={{
              fontSize: 17,
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.35,
              marginBottom: 4,
            }}
          >
            Hagwon Director's Weekly Quest: CSAT Calculus Drill
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#94A3B8',
              marginBottom: 14,
            }}
          >
            대치 미래탐구 이원장 추천 수능 미적분 킬러 드릴 30제
          </div>

          {/* Reward Badge: +5,000 Carat */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 14px',
              borderRadius: 14,
              background:
                'linear-gradient(135deg, rgba(0, 229, 255, 0.25) 0%, rgba(2, 132, 199, 0.35) 100%)',
              border: '1.5px solid #00E5FF',
              boxShadow: '0 0 18px rgba(0, 229, 255, 0.35)',
              marginBottom: 16,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 36 36"
              style={{ filter: 'drop-shadow(0 0 6px #00E5FF)' }}
            >
              <polygon
                points="18,2 34,14 26,34 10,34 2,14"
                fill="#00E5FF"
                stroke="#FFFFFF"
                strokeWidth="1.2"
              />
              <polygon points="18,2 34,14 22,18 18,8" fill="#FFFFFF" opacity={0.7} />
              <polygon points="18,2 2,14 14,18 18,8" fill="#FFFFFF" opacity={0.5} />
            </svg>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#E0F2FE' }}>
                REWARD:
              </span>
              <span style={{ fontSize: 16, fontWeight: 900, color: '#00E5FF' }}>
                +5,000 Carat
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#93C5FD' }}>
                (₩ 50,000)
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              borderRadius: 12,
              padding: '10px 12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 11,
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              <span style={{ color: '#94A3B8' }}>Drill Completion</span>
              <span style={{ color: '#00E5FF' }}>24 / 30 Solved (80%)</span>
            </div>
            <div
              style={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '80%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #38BDF8 0%, #00E5FF 100%)',
                  boxShadow: '0 0 10px #00E5FF',
                }}
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: MISSION CHECKLIST (4 CARDS) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 4px',
            }}
          >
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: -0.2,
              }}
            >
              Mission Checklist
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>
              ● 2 / 4 Completed
            </span>
          </div>

          {/* Quest 01: CSAT Math Problem 22 (COMPLETED) */}
          <div
            style={{
              backgroundColor: '#1E293B',
              borderRadius: 18,
              padding: '14px 16px',
              border: '1.5px solid rgba(16, 185, 129, 0.45)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 12px rgba(16, 185, 129, 0.4)',
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: 2,
                  }}
                >
                  Quest 01: CSAT Math Problem 22
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>
                  수능 공통 22번 킬러 문항 정복 · 풀이 검증 완료
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 4,
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  color: '#10B981',
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 8,
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                }}
              >
                COMPLETED
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#00E5FF' }}>
                +1,500 C
              </span>
            </div>
          </div>

          {/* Quest 02: Attendance at Hagwon Evening Study (100%) */}
          <div
            style={{
              backgroundColor: '#1E293B',
              borderRadius: 18,
              padding: '14px 16px',
              border: '1.5px solid rgba(0, 229, 255, 0.35)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  backgroundColor: '#0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 12px rgba(2, 132, 199, 0.4)',
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: 2,
                  }}
                >
                  Quest 02: Attendance at Hagwon Evening Study
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>
                  학원 야간 자율학습 출석 · 3시간 30분 달성
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 4,
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(0, 229, 255, 0.2)',
                  color: '#00E5FF',
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 8,
                  border: '1px solid rgba(0, 229, 255, 0.4)',
                }}
              >
                100%
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#00E5FF' }}>
                +1,000 C
              </span>
            </div>
          </div>

          {/* Quest 03: Speed Quiz Challenge - 30 questions */}
          <div
            style={{
              backgroundColor: '#1E293B',
              borderRadius: 18,
              padding: '14px 16px',
              border: '1.5px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  backgroundColor: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#F8FAFC">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: 2,
                  }}
                >
                  Quest 03: Speed Quiz Challenge - 30 questions
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>
                  스피드 개념 퀴즈 30제 · 26/30 진행 중
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 4,
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  color: '#38BDF8',
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 8,
                }}
              >
                26/30
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8' }}>
                +1,200 C
              </span>
            </div>
          </div>

          {/* Quest 04: Weekly Homework Submission */}
          <div
            style={{
              backgroundColor: '#1E293B',
              borderRadius: 18,
              padding: '14px 16px',
              border: '1.5px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  backgroundColor: '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#F8FAFC">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#FFFFFF',
                    marginBottom: 2,
                  }}
                >
                  Quest 04: Weekly Homework Submission
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>
                  주간 실전 모의고사 오답노트 제출 · 마감 오늘 23:59
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 4,
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(249, 115, 22, 0.2)',
                  color: '#FB923C',
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: 8,
                  border: '1px solid rgba(249, 115, 22, 0.4)',
                }}
              >
                DUE 23:59
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8' }}>
                +1,300 C
              </span>
            </div>
          </div>
        </div>

        {/* SECTION 3: LEARNING GROWTH CHART */}
        <div
          style={{
            backgroundColor: '#1E293B',
            borderRadius: 24,
            padding: '20px 18px',
            border: '1.5px solid rgba(0, 229, 255, 0.3)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF' }}>
                Learning Growth Chart
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>
                주간 학습 몰입도 & 참여 지표 분석
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '4px 8px',
                borderRadius: 8,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10B981',
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              <span>↗ +28%</span>
            </div>
          </div>

          {/* Metrics summary */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 8,
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              borderRadius: 14,
              padding: '10px 12px',
            }}
          >
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B' }}>
                TOTAL TIME
              </div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#FFFFFF' }}>
                42.5h
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B' }}>
                AVG FOCUS
              </div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#00E5FF' }}>
                96.4%
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#64748B' }}>
                STREAK
              </div>
              <div style={{ fontSize: 15, fontWeight: 900, color: '#10B981' }}>
                14 Days
              </div>
            </div>
          </div>

          {/* Mini Bar Chart */}
          <div style={{ paddingTop: 10, position: 'relative' }}>
            {/* Target benchmark dashed line */}
            <div
              style={{
                position: 'absolute',
                top: 40,
                left: 0,
                right: 0,
                borderTop: '1px dashed rgba(148, 163, 184, 0.3)',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: '#64748B',
                  marginTop: -14,
                }}
              >
                Target 7.0h
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                height: 120,
                padding: '0 4px',
              }}
            >
              {[
                { day: 'Mon', h: '4.8h', pct: 55, active: false },
                { day: 'Tue', h: '6.2h', pct: 70, active: false },
                { day: 'Wed', h: '5.5h', pct: 62, active: false },
                { day: 'Thu', h: '7.4h', pct: 82, active: false },
                { day: 'Fri', h: '8.8h', pct: 95, active: true },
                { day: 'Sat', h: '9.6h', pct: 100, active: true },
                { day: 'Sun', h: '7.8h', pct: 86, active: true },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: item.active ? '#00E5FF' : '#64748B',
                    }}
                  >
                    {item.h}
                  </span>
                  <div
                    style={{
                      width: 22,
                      height: `${item.pct}%`,
                      borderRadius: '6px 6px 2px 2px',
                      background: item.active
                        ? 'linear-gradient(180deg, #00E5FF 0%, #0284C7 100%)'
                        : 'linear-gradient(180deg, #334155 0%, #1E293B 100%)',
                      boxShadow: item.active
                        ? '0 0 12px rgba(0, 229, 255, 0.45)'
                        : 'none',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: item.active ? '#F8FAFC' : '#94A3B8',
                    }}
                  >
                    {item.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: CRABIT CARD WALLET PREVIEW */}
        <div
          style={{
            backgroundColor: '#1E293B',
            borderRadius: 24,
            padding: '20px 18px',
            border: '1.5px solid rgba(0, 229, 255, 0.35)',
            boxShadow: '0 8px 28px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF' }}>
                Crabit Card Wallet
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>
                수능 수험생 전용 장학 혜택 체크카드
              </div>
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: '#00E5FF',
                backgroundColor: 'rgba(0, 229, 255, 0.15)',
                padding: '3px 8px',
                borderRadius: 8,
                border: '1px solid rgba(0, 229, 255, 0.3)',
              }}
            >
              ACTIVE
            </div>
          </div>

          {/* Mini Preview of the Midnight Navy Crabit Debit Card */}
          <div
            style={{
              width: '100%',
              height: 200,
              borderRadius: 18,
              background:
                'linear-gradient(135deg, #020617 0%, #0F172A 45%, #1E293B 80%, #0369A1 100%)',
              border: '1.5px solid rgba(0, 229, 255, 0.4)',
              boxShadow:
                '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 25px rgba(0, 229, 255, 0.25)',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            {/* Holographic accent wave curve in background */}
            <div
              style={{
                position: 'absolute',
                top: -40,
                right: -40,
                width: 180,
                height: 180,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(0, 229, 255, 0.2) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Card Top: Brand & Contactless */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 36 36"
                  style={{ filter: 'drop-shadow(0 0 6px #00E5FF)' }}
                >
                  <polygon
                    points="18,2 34,14 26,34 10,34 2,14"
                    fill="#00E5FF"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                  />
                </svg>
                <span
                  style={{
                    fontSize: 17,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    letterSpacing: 1.5,
                  }}
                >
                  CRABIT
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: '#00E5FF',
                    backgroundColor: 'rgba(0, 229, 255, 0.2)',
                    padding: '1px 5px',
                    borderRadius: 4,
                  }}
                >
                  DEBIT
                </span>
              </div>

              {/* Contactless Waves SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#93C5FD">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                  opacity="0.3"
                />
                <path d="M7.5 12c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5h-2c0-1.38-1.12-2.5-2.5-2.5S9.5 10.62 9.5 12h-2z" />
                <path d="M5 12c0-3.86 3.14-7 7-7s7 3.14 7 7h-2c0-2.76-2.24-5-5-5s-5 2.24-5 5H5z" />
              </svg>
            </div>

            {/* Card Middle: EMV Chip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 38,
                  height: 28,
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)',
                  border: '1px solid #D97706',
                  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '80%',
                    height: '50%',
                    border: '1px solid #92400E',
                    borderRadius: 2,
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#93C5FD',
                  letterSpacing: 1,
                }}
              >
                MIDNIGHT NAVY EDITION
              </span>
            </div>

            {/* Card Bottom: Number, Holder & Expiry */}
            <div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#F8FAFC',
                  letterSpacing: 2.5,
                  fontFamily: 'monospace',
                  marginBottom: 6,
                }}
              >
                •••• &nbsp;•••• &nbsp;•••• &nbsp;4821
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div>
                  <div style={{ fontSize: 9, fontWeight: 600, color: '#94A3B8' }}>
                    CARDHOLDER
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: 0.5,
                    }}
                  >
                    KIM MIN JUN
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 600, color: '#94A3B8' }}>
                    EXPIRES
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: 0.5,
                    }}
                  >
                    08 / 29
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 900,
                    color: '#00E5FF',
                    fontStyle: 'italic',
                  }}
                >
                  BC Card
                </div>
              </div>
            </div>
          </div>

          {/* Linked Balance & Benefits Info */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.65)',
              borderRadius: 14,
              padding: '12px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>
                학습 장학 지원금 한도
              </div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#FFFFFF' }}>
                ₩ 1,250,000 KRW
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'rgba(0, 229, 255, 0.15)',
                color: '#00E5FF',
                fontSize: 12,
                fontWeight: 800,
                padding: '6px 12px',
                borderRadius: 10,
                border: '1px solid rgba(0, 229, 255, 0.3)',
              }}
            >
              즉시 출금 가능
            </div>
          </div>
        </div>

        {/* SECTION 5: RECENT CASHBACK TRANSACTIONS FEED */}
        <div
          style={{
            backgroundColor: '#1E293B',
            borderRadius: 24,
            padding: '20px 18px',
            border: '1.5px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 800, color: '#FFFFFF' }}>
              Recent Rewards & Cashback
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8' }}>
              View All →
            </span>
          </div>

          {[
            {
              title: '대치 미래탐구 학원비 장학 캐시백',
              cat: 'Academy Tuition',
              time: 'Today 18:40',
              amount: '+ ₩15,000',
              carat: '+1,500 C',
            },
            {
              title: '교보문고 수능특강 과탐 교재',
              cat: 'Study Materials',
              time: 'Yesterday',
              amount: '+ ₩2,400',
              carat: '+240 C',
            },
            {
              title: '작심 독서실 4주 집중 이용권',
              cat: 'Study Cafe',
              time: '2 days ago',
              amount: '+ ₩8,000',
              carat: '+800 C',
            },
          ].map((tx, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                backgroundColor: 'rgba(15, 23, 42, 0.5)',
                borderRadius: 14,
              }}
            >
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#FFFFFF' }}>
                  {tx.title}
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#94A3B8' }}>
                  {tx.cat} · {tx.time}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: '#10B981' }}>
                  {tx.amount}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#00E5FF' }}>
                  {tx.carat}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 6: HAGWON LEADERBOARD PREVIEW */}
        <div
          style={{
            backgroundColor: '#1E293B',
            borderRadius: 24,
            padding: '18px',
            border: '1.5px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF' }}>
            🏆 Daechi CSAT Math Squad Top 3
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 229, 255, 0.1)',
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(0, 229, 255, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>🥇</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF' }}>
                Rank 3: Kim Min-jun (You)
              </span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#00E5FF' }}>
              18,400 Carats
            </span>
          </div>
        </div>

        {/* Bottom padding safety spacer */}
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
};
