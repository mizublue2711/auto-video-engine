import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface CrabitKoreaAppScreenProps {
  /** Video frame index (optional, defaults to Remotion useCurrentFrame() or 0) */
  frame?: number;
  /** Uniform scale multiplier (default: 1) */
  scale?: number;
  /** Optional custom CSS class name */
  className?: string;
  /** Optional inline CSS style overrides */
  style?: React.CSSProperties;
  /** Screen width in pixels (base default: 360) */
  width?: number;
  /** Screen height in pixels (base default: 780, aspect ratio 9:19.5) */
  height?: number;
}

interface TaskItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  badgeBg: string;
  badgeTextColor: string;
  reward: string;
  rewardColor?: string;
  hasProgress?: boolean;
  progressPercent?: number;
  progressBarColor?: string;
}

const TASK_ITEMS: TaskItem[] = [
  {
    id: 'task-1',
    title: '11월 모의고사 오답노트 제출',
    subtitle: '수학 영역 킬러 3문항 오답 분석 완료',
    tag: '완료',
    badgeBg: 'rgba(16, 185, 129, 0.16)',
    badgeTextColor: '#10B981',
    reward: '+1,000 Carat',
    rewardColor: '#38BDF8',
  },
  {
    id: 'task-2',
    title: '심야 자율학습 출석 체크',
    subtitle: '대치 프리미엄 독서실 야간 세션',
    tag: '100% 출석',
    badgeBg: 'rgba(56, 189, 248, 0.16)',
    badgeTextColor: '#38BDF8',
    reward: '+500 Carat',
    rewardColor: '#38BDF8',
    hasProgress: true,
    progressPercent: 100,
    progressBarColor: '#10B981',
  },
  {
    id: 'task-3',
    title: '미적분 공식 30제 스피드 퀴즈',
    subtitle: '치환적분 & 부분적분 핵심 공식 마스터',
    tag: '진행 중',
    badgeBg: 'rgba(245, 158, 11, 0.16)',
    badgeTextColor: '#F59E0B',
    reward: '+1,500 Carat',
    rewardColor: '#00E5FF',
    hasProgress: true,
    progressPercent: 68,
    progressBarColor: '#F59E0B',
  },
  {
    id: 'task-4',
    title: '공간도형 심화 과제',
    subtitle: '삼수선의 정리 및 이면각 증명 제출',
    tag: '제출 대기',
    badgeBg: 'rgba(99, 102, 241, 0.16)',
    badgeTextColor: '#818CF8',
    reward: '+800 Carat',
    rewardColor: '#38BDF8',
  },
  {
    id: 'task-5',
    title: '킬러 문항 오답 분석 AI 코칭',
    subtitle: '최적화된 풀이 동선 및 계산 단축 피드백',
    tag: 'AI 피드백',
    badgeBg: 'rgba(236, 72, 153, 0.16)',
    badgeTextColor: '#F472B6',
    reward: '+1,200 Carat',
    rewardColor: '#00E5FF',
  },
  {
    id: 'task-6',
    title: '수능 D-7 최종 실전 모의고사',
    subtitle: '100분 타임어택 실전 시뮬레이션',
    tag: '모의고사',
    badgeBg: 'rgba(0, 229, 255, 0.16)',
    badgeTextColor: '#00E5FF',
    reward: '+3,000 Carat',
    rewardColor: '#38BDF8',
  },
];

// Helper to safely obtain frame inside or outside Remotion Composition
function useSafeFrame(explicitFrame?: number): number {
  let remotionFrame = 0;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    remotionFrame = useCurrentFrame();
  } catch {
    remotionFrame = 0;
  }
  return explicitFrame !== undefined ? explicitFrame : remotionFrame;
}

export const CrabitKoreaAppScreen: React.FC<CrabitKoreaAppScreenProps> = ({
  frame: propFrame,
  scale = 1,
  className,
  style,
  width = 360,
  height = 780,
}) => {
  const frame = useSafeFrame(propFrame);

  // Deterministic pulse animations driven by frame math
  const caratPulse = Math.sin(frame * 0.1);
  const caratWalletScale = 1 + caratPulse * 0.035;
  const caratGlowAlpha = 0.4 + caratPulse * 0.25;

  const heroBreathingAlpha = 0.4 + 0.15 * Math.sin(frame * 0.08);
  const heroBreathingBlur = 16 + 4 * Math.sin(frame * 0.08);

  const ctaPulse = Math.sin(frame * 0.12);
  const ctaScale = 1 + ctaPulse * 0.025;

  // Single card height (76px) + margin bottom (10px) = 86px
  const CARD_ITEM_HEIGHT = 86;
  const loopCycleHeight = TASK_ITEMS.length * CARD_ITEM_HEIGHT;
  const scrollOffset = (frame * 1.5) % loopCycleHeight;

  // Duplicate items 3 times for seamless infinite vertical scroll
  const loopedFeed = [...TASK_ITEMS, ...TASK_ITEMS, ...TASK_ITEMS];

  return (
    <div
      className={className}
      style={{
        width: width * scale,
        height: height * scale,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#090D16',
        borderRadius: 44 * scale,
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 1px 1px rgba(255, 255, 255, 0.1) inset',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", "Segoe UI", Roboto, sans-serif',
        userSelect: 'none',
        WebkitFontSmoothing: 'antialiased',
        ...style,
      }}
    >
      {/* Internal Vector-Scaled Canvas (Base 360x780, 9:19.5 aspect ratio) */}
      <div
        style={{
          width,
          height,
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top left',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, #090D16 0%, #0F172A 40%, #0B1120 100%)',
          color: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        {/* Dynamic Island / Subtle Speaker Grill */}
        <div
          style={{
            position: 'absolute',
            top: 9,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 90,
            height: 22,
            backgroundColor: '#000000',
            borderRadius: 12,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 8,
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Selfie camera lens reflection */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#1E293B',
              border: '1.5px solid #0F172A',
            }}
          />
        </div>

        {/* =========================================================================
            SECTION 1: STICKY HEADER & PROFILE (TOP)
           ========================================================================= */}
        <header
          style={{
            flexShrink: 0,
            zIndex: 50,
            background: 'linear-gradient(180deg, #090D16 0%, rgba(15, 23, 42, 0.95) 100%)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(51, 65, 85, 0.4)',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          {/* Status Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 24,
              fontSize: 12,
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '-0.2px',
              fontFamily: '"SF Mono", "Fira Code", monospace, sans-serif',
              marginBottom: 8,
            }}
          >
            {/* Clock Time */}
            <span style={{ fontSize: 13, fontWeight: 700, paddingLeft: 2 }}>22:45</span>

            {/* Right Status Icons: SKT 5G, Full Signal, 98% Battery */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Carrier & Network */}
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#94A3B8',
                  letterSpacing: '0.5px',
                  background: 'rgba(51, 65, 85, 0.4)',
                  padding: '1px 4px',
                  borderRadius: 4,
                }}
              >
                SKT 5G
              </span>

              {/* Cellular Signal Bars (Full Signal) */}
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none" style={{ display: 'block' }}>
                <rect x="0.5" y="7.5" width="2.2" height="2.5" rx="0.5" fill="#FFFFFF" />
                <rect x="4" y="5" width="2.2" height="5" rx="0.5" fill="#FFFFFF" />
                <rect x="7.5" y="2.5" width="2.2" height="7.5" rx="0.5" fill="#FFFFFF" />
                <rect x="11" y="0" width="2.2" height="10" rx="0.5" fill="#FFFFFF" />
              </svg>

              {/* Battery Pill (98%) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#FFFFFF' }}>98%</span>
                <div
                  style={{
                    width: 20,
                    height: 10,
                    borderRadius: 3,
                    border: '1.2px solid #94A3B8',
                    padding: 1,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '98%',
                      height: '100%',
                      backgroundColor: '#10B981',
                      borderRadius: 1.5,
                    }}
                  />
                  {/* Battery tip */}
                  <div
                    style={{
                      position: 'absolute',
                      right: -3,
                      top: 2.5,
                      width: 1.5,
                      height: 4,
                      backgroundColor: '#94A3B8',
                      borderRadius: '0 1px 1px 0',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Bar & Carat Wallet Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
            }}
          >
            {/* Student Profile Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              {/* Avatar Icon */}
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
                  border: '1.5px solid #00E5FF',
                  boxShadow: '0 0 10px rgba(0, 229, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                {/* Stylized Student/Scholar Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#00E5FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 10.5V16C6 17.5 8.7 19 12 19C15.3 19 18 17.5 18 16V10.5"
                    stroke="#00E5FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M22 7V14" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {/* Active Online Indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    right: -1,
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    border: '1.5px solid #090D16',
                  }}
                />
              </div>

              {/* Name & Academic Meta */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    lineHeight: 1.2,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>김민준</span>
                  <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>Kim Min-jun</span>
                  <span style={{ color: '#475569', fontSize: 10 }}>•</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: '#00E5FF',
                      backgroundColor: 'rgba(0, 229, 255, 0.1)',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      padding: '1px 5px',
                      borderRadius: 4,
                    }}
                  >
                    고3 수능 대비
                  </span>
                </div>

                {/* Streak Badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 3,
                    marginTop: 3,
                    padding: '1px 6px',
                    borderRadius: 10,
                    background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.15) 0%, rgba(239, 68, 68, 0.15) 100%)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#F59E0B' }}>
                    7일 연속 학습 달성 🔥
                  </span>
                </div>
              </div>
            </div>

            {/* Carat Wallet Pill (Top Right) */}
            <div
              style={{
                flexShrink: 0,
                transform: `scale(${caratWalletScale})`,
                transition: 'transform 0.05s ease-out',
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                border: '1px solid #38BDF8',
                borderRadius: 14,
                padding: '5px 9px',
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                boxShadow: `0 0 14px rgba(0, 229, 255, ${caratGlowAlpha})`,
              }}
            >
              {/* Cyan Diamond Icon with Pulsing Glow */}
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 7,
                  backgroundColor: 'rgba(0, 229, 255, 0.15)',
                  border: '1px solid #00E5FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 0 8px rgba(0, 229, 255, ${caratGlowAlpha})`,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <polygon
                    points="12,2 22,8.5 12,22 2,8.5"
                    fill="url(#caratGrad)"
                    stroke="#00E5FF"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <line x1="2" y1="8.5" x2="22" y2="8.5" stroke="#00E5FF" strokeWidth="1.2" />
                  <line x1="12" y1="2" x2="7" y2="8.5" stroke="#00E5FF" strokeWidth="1.2" />
                  <line x1="12" y1="2" x2="17" y2="8.5" stroke="#00E5FF" strokeWidth="1.2" />
                  <line x1="7" y1="8.5" x2="12" y2="22" stroke="#00E5FF" strokeWidth="1.2" />
                  <line x1="17" y1="8.5" x2="12" y2="22" stroke="#00E5FF" strokeWidth="1.2" />
                  <defs>
                    <linearGradient id="caratGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00E5FF" stopOpacity="0.8" />
                      <stop offset="1" stopColor="#38BDF8" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Balance Amount & Micro Subtext */}
              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: '"SF Mono", "Fira Code", monospace, sans-serif',
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#38BDF8',
                    letterSpacing: '-0.3px',
                    lineHeight: 1.1,
                  }}
                >
                  12,500 <span style={{ fontSize: 9, color: '#00E5FF' }}>Carat</span>
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: '#94A3B8',
                    fontWeight: 500,
                    marginTop: 1,
                  }}
                >
                  학습 장학금
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: HAGWON DIRECTOR HERO QUEST (BANNER)
           ========================================================================= */}
        <section
          style={{
            flexShrink: 0,
            zIndex: 40,
            padding: '10px 16px 8px 16px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'relative',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #1E293B 0%, #151F32 70%, #0F172A 100%)',
              border: '1px solid #00E5FF',
              boxShadow: `0 0 ${heroBreathingBlur}px rgba(0, 229, 255, ${heroBreathingAlpha})`,
              padding: '12px 14px',
              overflow: 'hidden',
            }}
          >
            {/* Ambient Background Glow Effect inside Card */}
            <div
              style={{
                position: 'absolute',
                top: -30,
                right: -20,
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0, 229, 255, 0.22) 0%, rgba(0, 229, 255, 0) 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Quest Header Tag */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  fontFamily: '"SF Mono", "Fira Code", monospace, sans-serif',
                  fontSize: 10,
                  fontWeight: 800,
                  color: '#00E5FF',
                  letterSpacing: '0.3px',
                }}
              >
                <span
                  style={{
                    backgroundColor: 'rgba(0, 229, 255, 0.15)',
                    padding: '2px 6px',
                    borderRadius: 4,
                    border: '1px solid rgba(0, 229, 255, 0.4)',
                  }}
                >
                  [원장님 특별 퀘스트]
                </span>
                <span style={{ color: '#F43F5E', fontWeight: 900 }}>// CSAT KILLER</span>
              </div>

              {/* Reward Badge (Large, Bold #00E5FF) */}
              <div
                style={{
                  fontFamily: '"SF Mono", "Fira Code", monospace, sans-serif',
                  fontSize: 13,
                  fontWeight: 900,
                  color: '#00E5FF',
                  textShadow: '0 0 10px rgba(0, 229, 255, 0.6)',
                  letterSpacing: '-0.3px',
                }}
              >
                +5,000 Carat
              </div>
            </div>

            {/* Title */}
            <h3
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.4px',
                lineHeight: 1.25,
              }}
            >
              수능 수학 22번 킬러 문항 정복
            </h3>

            {/* Description */}
            <p
              style={{
                margin: '4px 0 10px 0',
                fontSize: 11,
                color: '#94A3B8',
                fontWeight: 500,
                lineHeight: 1.35,
              }}
            >
              함수 추론 및 정적분 킬러 문항 심화 풀이
            </p>

            {/* Bottom Row: Mission Metadata & Action CTA Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              {/* Mission Metadata Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: '#38BDF8',
                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                    padding: '2px 6px',
                    borderRadius: 6,
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                  }}
                >
                  마감 23:59까지
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    padding: '2px 6px',
                    borderRadius: 6,
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                  }}
                >
                  원장 1:1 검수
                </span>
              </div>

              {/* Action CTA Button: Rounded pill '도전하기' with glowing cyan gradient */}
              <button
                type="button"
                style={{
                  transform: `scale(${ctaScale})`,
                  background: 'linear-gradient(135deg, #00E5FF 0%, #0284C7 100%)',
                  border: 'none',
                  borderRadius: 20,
                  padding: '6px 16px',
                  color: '#090D16',
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  boxShadow: '0 0 14px rgba(0, 229, 255, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '-0.2px',
                }}
              >
                <span>도전하기</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="#090D16"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: SCROLLABLE TASK FEED (ANIMATED LIST)
           ========================================================================= */}
        <section
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 2,
          }}
        >
          {/* Feed Title / Section Subheading */}
          <div
            style={{
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 6,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
                오늘의 실시간 학습 과제
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#00E5FF',
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                  borderRadius: 10,
                  padding: '1px 6px',
                  fontFamily: '"SF Mono", monospace',
                }}
              >
                LIVE
              </span>
            </div>
            <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>
              자동 갱신 중
            </span>
          </div>

          {/* Continuous Smooth Scrolling Container */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              overflow: 'hidden',
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <div
              style={{
                transform: `translateY(-${scrollOffset}px)`,
                willChange: 'transform',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {loopedFeed.map((task, index) => {
                const uniqueKey = `${task.id}-${index}`;
                return (
                  <div
                    key={uniqueKey}
                    style={{
                      height: 76,
                      boxSizing: 'border-box',
                      backgroundColor: '#1E293B',
                      border: '1px solid #334155',
                      borderRadius: 14,
                      padding: '10px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
                      flexShrink: 0,
                    }}
                  >
                    {/* Top Row: Task Title & Status Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: '#FFFFFF',
                          letterSpacing: '-0.3px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: 210,
                        }}
                      >
                        {task.title}
                      </div>

                      {/* State Badge */}
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: task.badgeTextColor,
                          backgroundColor: task.badgeBg,
                          padding: '2px 7px',
                          borderRadius: 6,
                          border: `1px solid ${task.badgeTextColor}40`,
                          flexShrink: 0,
                        }}
                      >
                        {task.tag}
                      </span>
                    </div>

                    {/* Middle Row: Progress Bar (if task has progress) or Subtitle */}
                    {task.hasProgress ? (
                      <div style={{ marginTop: 2, marginBottom: 2 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: 10,
                            color: '#94A3B8',
                            marginBottom: 3,
                          }}
                        >
                          <span>{task.subtitle}</span>
                          <span
                            style={{
                              fontFamily: '"SF Mono", monospace',
                              fontWeight: 700,
                              color: task.progressBarColor || '#10B981',
                            }}
                          >
                            {task.progressPercent}%
                          </span>
                        </div>
                        <div
                          style={{
                            width: '100%',
                            height: 4,
                            backgroundColor: 'rgba(51, 65, 85, 0.6)',
                            borderRadius: 2,
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${task.progressPercent}%`,
                              height: '100%',
                              backgroundColor: task.progressBarColor || '#10B981',
                              borderRadius: 2,
                              boxShadow: `0 0 6px ${task.progressBarColor || '#10B981'}`,
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: 11,
                          color: '#94A3B8',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {task.subtitle}
                      </div>
                    )}

                    {/* Bottom Row: Micro Meta & Reward Pill */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span style={{ fontSize: 9.5, color: '#64748B', fontWeight: 600 }}>
                        크래빗 대치학원 본원 인증
                      </span>

                      {/* Reward Badge */}
                      <span
                        style={{
                          fontFamily: '"SF Mono", "Fira Code", monospace, sans-serif',
                          fontSize: 11,
                          fontWeight: 800,
                          color: task.rewardColor || '#38BDF8',
                          letterSpacing: '-0.2px',
                        }}
                      >
                        {task.reward}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fade Mask at Bottom of Feed for smooth visual occlusion */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 28,
              background: 'linear-gradient(180deg, rgba(11, 17, 32, 0) 0%, #0B1120 100%)',
              pointerEvents: 'none',
              zIndex: 30,
            }}
          />
        </section>

        {/* =========================================================================
            BOTTOM NAVIGATION BAR & HOME INDICATOR
           ========================================================================= */}
        <footer
          style={{
            flexShrink: 0,
            height: 52,
            backgroundColor: '#090D16',
            borderTop: '1px solid rgba(51, 65, 85, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 6,
            paddingBottom: 4,
            paddingLeft: 24,
            paddingRight: 24,
            zIndex: 60,
          }}
        >
          {/* Navigation Items */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Nav 1: Home (Active) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z"
                  stroke="#00E5FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M9 21V12H15V21" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: '#00E5FF' }}>홈</span>
            </div>

            {/* Nav 2: Quests */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="#64748B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: '#64748B' }}>퀘스트</span>
            </div>

            {/* Nav 3: Carat Shop */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polygon
                  points="12,2 22,8.5 12,22 2,8.5"
                  stroke="#64748B"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <line x1="2" y1="8.5" x2="22" y2="8.5" stroke="#64748B" strokeWidth="1.5" />
              </svg>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: '#64748B' }}>장학 스토어</span>
            </div>

            {/* Nav 4: My Profile */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="#64748B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="7" r="4" stroke="#64748B" strokeWidth="2" />
              </svg>
              <span style={{ fontSize: 9.5, fontWeight: 600, color: '#64748B' }}>마이</span>
            </div>
          </div>

          {/* iOS Style Home Indicator Bar */}
          <div
            style={{
              width: 120,
              height: 4,
              backgroundColor: '#475569',
              borderRadius: 2,
              margin: '0 auto',
            }}
          />
        </footer>
      </div>
    </div>
  );
};

export default CrabitKoreaAppScreen;
