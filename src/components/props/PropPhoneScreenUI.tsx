import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface PropPhoneScreenUIProps {
  /** Scroll offset in pixels for feed translation */
  scrollOffset?: number;
  /** Whether to render only the internal screen content without outer bezel (Default: false) */
  bareScreen?: boolean;
  /** Width in pixels (Default: 440 for chassis, or 480 for bare screen) */
  width?: number | string;
  /** Height in pixels (Default: 840 for chassis, or 840 for bare screen) */
  height?: number | string;
  /** Scale factor (Default: 1) */
  scale?: number;
  /** Entrance delay in frames (Default: 0) */
  delay?: number;
  /** Optional container style overrides */
  style?: React.CSSProperties;
  /** Optional container className */
  className?: string;
}

interface FeedItem {
  id: string;
  type: 'balance' | 'mission' | 'director' | 'analytics' | 'milestone' | 'scholarship' | 'streak';
  title: string;
  subtitle: string;
  tag: string;
  reward?: string;
  badge?: string;
}

const FEED_DATA: FeedItem[] = [
  {
    id: 'b1',
    type: 'balance',
    title: 'My Scholarship Balance',
    subtitle: '장학금 환산 가치: ₩ 50,000 KRW',
    tag: '50,000 Carats',
  },
  {
    id: 'm1',
    type: 'mission',
    title: '오늘의 미션 완료!',
    subtitle: '수학 집중 모드 30분 달성',
    tag: '100% 완료',
    reward: '+500 C',
    badge: '연속 7일째 미션 달성 중!',
  },
  {
    id: 'd1',
    type: 'director',
    title: '원장 선생님 인증 완료',
    subtitle: '실시간 캐럿 보상 지급 승인됨',
    tag: '인증 완료',
  },
  {
    id: 'a1',
    type: 'analytics',
    title: '학습 집중도 분석',
    subtitle: '주간 누적 순수 학습 14시간 30분 돌파',
    tag: '98% (최상위)',
  },
  {
    id: 'ms1',
    type: 'milestone',
    title: '수능 파이널 수학 모의고사 D-14',
    subtitle: '킬러 문항 22번 풀이 완료 시 캐럿 2배 부스터',
    tag: 'D-14',
  },
  {
    id: 's1',
    type: 'scholarship',
    title: '크래빗 실시간 장학금 적립',
    subtitle: 'KB국민/신한/하나 카드 연동 실시간 입금',
    tag: '+50,000 KRW',
  },
  {
    id: 'st1',
    type: 'streak',
    title: '7일 연속 완전 학습 스트릭 달성',
    subtitle: '상위 1% 자기주도학습 우수 장학생 선정',
    tag: 'STREAK BONUS',
    reward: '+1,000 C',
  },
  {
    id: 'm2',
    type: 'mission',
    title: '미적분 킬러 테마 심화 특강',
    subtitle: '삼차함수 그래프 추론 5문항 올클리어',
    tag: '100% 완료',
    reward: '+600 C',
    badge: '오답 제로 달성',
  },
  {
    id: 'd2',
    type: 'director',
    title: '대치동 대표 강사진 문제 검증',
    subtitle: 'CSAT 22번 고난도 유형 완벽 마스터 확인',
    tag: '검증 완료',
  },
  {
    id: 'a2',
    type: 'analytics',
    title: '일일 오답률 역대 최저 기록',
    subtitle: '전일 대비 취약 유형 해결률 +42% 상승',
    tag: '상위 0.5%',
  },
  {
    id: 's2',
    type: 'scholarship',
    title: '누적 장학금 50만원 돌파 축하',
    subtitle: '자율 출금 가능한 현금형 장학 포인트',
    tag: '₩ 50,000 KRW',
  },
  {
    id: 'ms2',
    type: 'milestone',
    title: '2025학년도 명문대 장학생 챌린지',
    subtitle: '30일 연속 미션 성공 시 특별 장학금 수여',
    tag: 'FINAL QUEST',
  },
  {
    id: 'm3',
    type: 'mission',
    title: '영어 독해 빈칸 추론 10제',
    subtitle: '수능 실전 시간 배분 훈련 완료',
    tag: '100% 완료',
    reward: '+400 C',
  },
  {
    id: 'st2',
    type: 'streak',
    title: '30일 장학생 챌린지 달성 임박',
    subtitle: '크래빗 마스터 장학생 메달 수여 확정',
    tag: 'MASTER LEVEL',
  },
];

/**
 * PropPhoneScreenUI: High-resolution Crabit App UI with kinetic task list scrolling
 * and dynamic button states. Features an expanded 3200px+ feed to eliminate white freeze.
 */
export const PropPhoneScreenUI: React.FC<PropPhoneScreenUIProps> = ({
  scrollOffset,
  bareScreen = false,
  width,
  height,
  scale = 1,
  delay = 0,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy Spring Entrance (used when not bareScreen)
  const entranceSpring = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 13,
      mass: 0.8,
      stiffness: 120,
      overshootClamping: false,
    },
  });

  const popupScale = bareScreen ? 1 : interpolate(entranceSpring, [0, 1], [0.65, 1]) * scale;
  const popupOpacity = bareScreen ? 1 : interpolate(entranceSpring, [0, 1], [0, 1]);

  // Subtle floating hover physics when in floating mode
  const hoverY = bareScreen ? 0 : Math.sin((frame / fps) * 3) * 8;
  const hoverRotate = bareScreen ? 0 : Math.cos((frame / fps) * 2.2) * 1.2;

  // Kinetic continuous scroll offset across the entire shot
  const effectiveScrollOffset =
    typeof scrollOffset === 'number'
      ? scrollOffset
      : interpolate(frame - delay, [0, 119], [0, -2200], {
          extrapolateRight: 'clamp',
        });

  // Dynamic button pulse & shimmer
  const buttonPulse = 1 + Math.sin((frame / fps) * 6) * 0.03;
  const shimmerPos = interpolate((frame - delay) % 48, [0, 48], [-100, 200]);

  const defaultWidth = bareScreen ? 480 : 440;
  const defaultHeight = bareScreen ? 840 : 840;

  // The internal screen surface content (Expanded to >3200px feed height)
  const screenContent = (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#F8FAFC',
        borderRadius: bareScreen ? 24 : 42,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        userSelect: 'none',
      }}
    >
      {/* Status Bar (Always visible fixed header) */}
      <div
        style={{
          height: bareScreen ? 36 : 44,
          padding: bareScreen ? '0 18px' : '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: bareScreen ? 13 : 14,
          fontWeight: 700,
          color: '#0F172A',
          paddingTop: bareScreen ? 6 : 10,
          backgroundColor: '#F8FAFC',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <span>09:41</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div
            style={{
              width: bareScreen ? 20 : 22,
              height: bareScreen ? 10 : 11,
              borderRadius: 3,
              border: '1.5px solid #0F172A',
              padding: 1.5,
              display: 'flex',
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: '#10B981',
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* App Brand Header */}
      <div
        style={{
          padding: bareScreen ? '10px 18px' : '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: bareScreen ? 8 : 10 }}>
          <svg
            width={bareScreen ? 24 : 28}
            height={bareScreen ? 24 : 28}
            viewBox="0 0 36 36"
          >
            <polygon
              points="18,2 34,14 28,34 8,34 2,14"
              fill="#00E5FF"
              stroke="#0284C7"
              strokeWidth="1.5"
            />
            <circle cx="18" cy="18" r="4" fill="#FFFFFF" />
          </svg>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span
              style={{
                fontSize: bareScreen ? 20 : 22,
                fontWeight: 900,
                color: '#FF5E36',
                letterSpacing: -0.5,
              }}
            >
              Crabit
            </span>
            <span
              style={{
                fontSize: bareScreen ? 10 : 11,
                fontWeight: 800,
                color: '#0284C7',
                backgroundColor: '#E0F2FE',
                padding: '2px 6px',
                borderRadius: 6,
              }}
            >
              KOREA
            </span>
          </div>
        </div>

        <div
          style={{
            width: bareScreen ? 28 : 32,
            height: bareScreen ? 28 : 32,
            borderRadius: '50%',
            backgroundColor: '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <svg
            width={bareScreen ? 16 : 18}
            height={bareScreen ? 16 : 18}
            viewBox="0 0 24 24"
            fill="#475569"
          >
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <div
            style={{
              position: 'absolute',
              top: 2,
              right: 2,
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: '#FF5E36',
            }}
          />
        </div>
      </div>

      {/* Kinetic Continuous Scroll Feed Container (Height: 3400px+) */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          style={{
            padding: bareScreen ? '12px 16px 120px 16px' : '16px 18px 120px 18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            transform: `translateY(${effectiveScrollOffset}px)`,
            willChange: 'transform',
          }}
        >
          {FEED_DATA.map((item, index) => {
            if (item.type === 'balance') {
              return (
                <div
                  key={`${item.id}-${index}`}
                  style={{
                    background:
                      'linear-gradient(135deg, #0F172A 0%, #1E293B 55%, #0284C7 100%)',
                    borderRadius: 22,
                    padding: '16px 18px',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 24px -4px rgba(2, 132, 199, 0.35)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1.5px solid rgba(0, 229, 255, 0.4)',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 1,
                      color: '#93C5FD',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 36 36"
                      style={{ filter: 'drop-shadow(0 0 8px #00E5FF)' }}
                    >
                      <polygon
                        points="18,2 34,14 26,34 10,34 2,14"
                        fill="#00E5FF"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      <polygon points="18,2 34,14 22,18 18,8" fill="#FFFFFF" opacity={0.7} />
                      <polygon points="18,2 2,14 14,18 18,8" fill="#FFFFFF" opacity={0.5} />
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF' }}>
                        50,000
                      </span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#00E5FF' }}>
                        Carats
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: 'rgba(15, 23, 42, 0.75)',
                      borderRadius: 12,
                      padding: '8px 12px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>
                      장학금 환산 가치
                    </span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 900,
                        color: '#F8FAFC',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      ₩ 50,000 KRW
                    </span>
                  </div>
                </div>
              );
            }

            if (item.type === 'mission') {
              return (
                <div
                  key={`${item.id}-${index}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 20,
                    padding: '14px 16px',
                    border: '1.5px solid #E2E8F0',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          backgroundColor: '#10B981',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: 11, fontWeight: 600, color: '#64748B' }}>
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    {item.reward && (
                      <div
                        style={{
                          backgroundColor: '#E0F2FE',
                          color: '#0284C7',
                          fontSize: 12,
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: 10,
                        }}
                      >
                        {item.reward}
                      </div>
                    )}
                  </div>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#475569',
                        marginBottom: 4,
                      }}
                    >
                      <span>목표 달성률</span>
                      <span style={{ color: '#10B981' }}>{item.tag}</span>
                    </div>
                    <div
                      style={{
                        height: 7,
                        borderRadius: 4,
                        backgroundColor: '#F1F5F9',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background:
                            'linear-gradient(90deg, #38BDF8 0%, #00E5FF 100%)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            }

            if (item.type === 'director') {
              return (
                <div
                  key={`${item.id}-${index}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 18,
                    padding: '12px 14px',
                    border: '1.5px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: '#1E3A8A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: 13,
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    원장
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>
                      ● {item.subtitle}
                    </div>
                  </div>
                </div>
              );
            }

            if (item.type === 'scholarship') {
              return (
                <div
                  key={`${item.id}-${index}`}
                  style={{
                    background:
                      'linear-gradient(135deg, #0284C7 0%, #00E5FF 100%)',
                    borderRadius: 18,
                    padding: '14px 16px',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 20px rgba(0, 229, 255, 0.35)',
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#E0F2FE' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, marginTop: 4 }}>
                    {item.tag}
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.9, marginTop: 2 }}>
                    {item.subtitle}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={`${item.id}-${index}`}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 18,
                  padding: '12px 14px',
                  border: '1.5px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                  flexShrink: 0,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: 12, fontWeight: 900, color: '#0284C7' }}>
                    {item.tag}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                  {item.subtitle}
                </div>
              </div>
            );
          })}

          {/* Dynamic Bottom Action Button with Shimmer */}
          <div
            style={{
              marginTop: 10,
              marginBottom: 40,
              transform: `scale(${buttonPulse})`,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 16,
              boxShadow: '0 8px 24px rgba(0, 229, 255, 0.4)',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                background:
                  'linear-gradient(135deg, #00E5FF 0%, #0284C7 100%)',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: 14,
                letterSpacing: -0.2,
              }}
            >
              <span>장학금 50,000원 즉시 수령</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42 5.43 5.43H5v2.44z" />
              </svg>
            </div>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: `${shimmerPos}%`,
                width: '40%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
                transform: 'skewX(-20deg)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Dock */}
      <div
        style={{
          height: 48,
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: 2,
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#94A3B8' }} />
        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#94A3B8' }} />
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            backgroundColor: '#00E5FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(0, 229, 255, 0.6)',
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: 2, backgroundColor: '#FFFFFF' }} />
        </div>
        <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#94A3B8' }} />
      </div>
    </div>
  );

  if (bareScreen) {
    return (
      <div
        style={{
          width: width || defaultWidth,
          height: height || defaultHeight,
          position: 'relative',
          overflow: 'hidden',
          ...style,
        }}
        className={className}
      >
        {screenContent}
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translateY(${hoverY}px) rotate(${hoverRotate}deg) scale(${popupScale})`,
        opacity: popupOpacity,
        zIndex: 65,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      className={className}
    >
      <div
        style={{
          width: width || defaultWidth,
          height: height || defaultHeight,
          backgroundColor: '#0F172A',
          borderRadius: 54,
          padding: 14,
          boxShadow:
            '0 30px 70px -10px rgba(0, 0, 0, 0.65), 0 0 40px rgba(0, 229, 255, 0.35)',
          border: '3px solid #334155',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 24,
            backgroundColor: '#020617',
            borderRadius: 12,
            zIndex: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#1E293B' }} />
          <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#1E293B' }} />
        </div>
        {screenContent}
      </div>
    </div>
  );
};
