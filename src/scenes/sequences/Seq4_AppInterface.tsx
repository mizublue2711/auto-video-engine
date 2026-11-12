import React from 'react';
import {
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { CrabitSmartphone3D } from '../../components/props/CrabitSmartphone3D';
import { SpatialTunerFrame } from '../../components/dev/SpatialTunerFrame';
import {
  IconCaratDiamond,
  IconFlashQuest,
  IconTargetMission,
} from '../../components/ui/VectorIcons';
import { CouponTicketCard } from '../../components/ui/CouponTicketCard';
import {
  KineticStaggerWrapper,
  SpatialCameraDolly,
} from '../../components/motion';
import { THEME_TOKENS } from '../MasterCompositeScene';

/**
 * SEQUENCE 4: Dedicated 3D Smartphone & Interactive App Interface Showcase.
 * Features:
 * 1. Split-screen 3D Phone + K-Fintech Mission Cards & Badges.
 * 2. Aerodynamic app slide-in whoosh (Frame 0).
 * 3. Staggered bubble pop-in clicks for mission badges (Frames 15, 22, 29).
 */
export const Seq4_AppInterface: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SpatialCameraDolly durationInFrames={119}>
      <div
        style={{
          position: 'relative',
          width: 1920,
          height: 1080,
          background: THEME_TOKENS.background.global,
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow layer behind phone */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: THEME_TOKENS.background.ambientGlow,
            pointerEvents: 'none',
          }}
        />

        {/* =====================================================================
            SFX SOUND DESIGN: APP SLIDE-IN & MISSION BADGES POP-IN
           ===================================================================== */}
        {/* 1. App Interface Slide-in (Frame 0) */}
        <Sequence from={0} durationInFrames={35}>
          <Audio src={staticFile('audio/sfx/app_swoosh_soft.mp3')} volume={0.45} />
        </Sequence>

        {/* 2. Badge 1 Pop-in (Frame 15) */}
        <Sequence from={15} durationInFrames={15}>
          <Audio src={staticFile('audio/sfx/bubble_pop_ui.mp3')} volume={0.5} />
        </Sequence>

        {/* 3. Badge 2 Pop-in (Frame 22) */}
        <Sequence from={22} durationInFrames={15}>
          <Audio src={staticFile('audio/sfx/bubble_pop_ui.mp3')} volume={0.5} />
        </Sequence>

        {/* 4. Badge 3 Pop-in (Frame 29) */}
        <Sequence from={29} durationInFrames={15}>
          <Audio src={staticFile('audio/sfx/bubble_pop_ui.mp3')} volume={0.5} />
        </Sequence>

        {/* REUSABLE LEGO WRAPPER: Handles positioning and real-time visual tuning */}
        <SpatialTunerFrame
          storageKey="scene3_phone"
          enabled={false}
          zIndex={10}
          initialValues={{
            leftPercent: -2,
            topPercent: 21,
            boxWidth: 1080,
            boxHeight: 1080,
            scale: 1.2,
          }}
        >
          <CrabitSmartphone3D />
        </SpatialTunerFrame>

        {/* RIGHT COLUMN: K-FINTECH FEATURE CARDS & SQUIRCLE BADGES */}
        <div
          style={{
            position: 'absolute',
            right: '5%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 760,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            fontFamily:
              'Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* Stagger 0: Top Pill Badge */}
          <KineticStaggerWrapper staggerIndex={0} inFrame={12} direction="up">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: 'rgba(255, 255, 255, 0.85)',
                border: '1.5px solid rgba(2, 132, 199, 0.25)',
                borderRadius: THEME_TOKENS.cards.borderRadiusPill,
                padding: '10px 24px',
                width: 'fit-content',
                boxShadow: '0 8px 20px rgba(2, 132, 199, 0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <IconFlashQuest
                size={THEME_TOKENS.icons.size.badge}
                fillColor={THEME_TOKENS.icons.lightning.fill}
              />
              <span
                style={{
                  color: THEME_TOKENS.typography.titleHighlight,
                  fontSize: 19,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                }}
              >
                실시간 퀘스트 연동
              </span>
              <span style={{ color: '#94A3B8', fontSize: 16 }}>•</span>
              <span style={{ color: '#475569', fontSize: 17, fontWeight: 600 }}>
                Hagwon Quest Engine
              </span>
            </div>
          </KineticStaggerWrapper>

          {/* Stagger 1: Hero Kinetic Headline */}
          <KineticStaggerWrapper staggerIndex={1} inFrame={16} direction="up">
            <div
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: THEME_TOKENS.typography.titlePrimary,
                lineHeight: 1.2,
                letterSpacing: -1.2,
              }}
            >
              학원 미션 완료하면 <br />
              <span
                style={{
                  color: THEME_TOKENS.typography.titleHighlight,
                  background: 'linear-gradient(90deg, #0284C7 0%, #0369A1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                캐럿 장학금
              </span>
              이 바로 쏟아져요
            </div>
          </KineticStaggerWrapper>

          {/* 3. K-FINTECH INTERACTIVE COUPON TICKET CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 8 }}>
            {/* Stagger 2: First Coupon Ticket Card */}
            <KineticStaggerWrapper staggerIndex={2} inFrame={22} direction="up">
              <CouponTicketCard
                category="수능 킬러 문항 & 자습 체크"
                heroValue="100% REWARD"
                heroHighlightColor="#0284C7"
                description="문제 풀고 인증하면 장학금 즉시 지급"
                icon={
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 18,
                      background: '#E0F2FE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconTargetMission size={30} />
                  </div>
                }
              />
            </KineticStaggerWrapper>

            {/* Stagger 3: Second Coupon Ticket Card */}
            <KineticStaggerWrapper staggerIndex={3} inFrame={28} direction="up">
              <CouponTicketCard
                category="학원 캐럿 장학금 적립"
                heroValue="+5,000 CARAT"
                heroHighlightColor="#0284C7"
                description="모은 캐럿은 체크카드로 편의점·서점 바로 결제"
                icon={
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 18,
                      background: '#E0F2FE',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconCaratDiamond size={30} />
                  </div>
                }
              />
            </KineticStaggerWrapper>
          </div>
        </div>

        {/* 4. Bottom Centered Subtitle Glow Line */}
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: 0,
            width: '100%',
            textAlign: 'center',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          <KineticStaggerWrapper staggerIndex={4} inFrame={32} direction="up">
            <span
              style={{
                color: THEME_TOKENS.typography.badgeText,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 2,
                fontFamily: 'monospace',
              }}
            >
              CRABIT KOREA // DUAL-TRACK FINTECH REWARD SYSTEM
            </span>
          </KineticStaggerWrapper>
        </div>
      </div>
    </SpatialCameraDolly>
  );
};

export default Seq4_AppInterface;
