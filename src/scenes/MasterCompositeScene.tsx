import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  Series,
  staticFile,
  useCurrentFrame,
  Video,
} from 'remotion';
import {
  CrabitCard3D,
  PropAnalogClock,
  PropAnimatedHeroPhone,
  PropChalkboardMath,
  PropScholarshipCounter,
} from '../components/props';
import { CrabitSmartphone3D } from '../components/props/CrabitSmartphone3D';
import { SpatialTunerFrame } from '../components/dev/SpatialTunerFrame';
import {
  FxCrabit_SpawnSparkles,
  FxHandover_PhoneBurst,
  FxScholarshipCoinExplosion,
  FxStudy_IdeaPop,
} from '../components/fx';
import { FxMascotRunTrail } from '../components/fx/FxMascotRunTrail';
import { KineticText } from '../components/text/KineticText';

/**
 * SEQUENCE 1 (Frames 0 – 119): Academy Struggle & Clock Camera Zoom-Out.
 * Anchored strictly within 1920x1080 canvas without bleed.
 * Smooth camera zoom-out from 2.2 down to 1.0 centered on the clock.
 * Soft crossfade dissolve exit over the last 12 frames (frames 107 to 119).
 */
export const Sequence1Struggle: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraZoom = interpolate(frame, [0, 48], [2.2, 1.0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(frame, [107, 119], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        transform: `scale(${cameraZoom})`,
        transformOrigin: '48% 22%',
        opacity: fadeOut,
      }}
    >
      <Video
        src={staticFile('flow_plates/ready/flow_shot01_struggle.mp4')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '46%',
          transform: 'translate(-50%, -50%)',
          zIndex: 30,
          filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.45))',
        }}
      >
        <PropAnalogClock
          size={210}
          initialHour={10}
          initialMinute={10}
          speedMultiplier={2}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * SEQUENCE 2 (Frames 119 – 238): Handover Solution.
 * Soft crossfade dissolve transition from Scene 1 into Scene 2 (No harsh strobe/flash).
 * Ends with a smooth dissolve exit into Scene 3.
 */
export const Sequence2Handover: React.FC = () => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(frame, [107, 119], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        opacity: fadeIn * fadeOut,
      }}
    >
      <Video
        src={staticFile('flow_plates/ready/flow_shot02_handover.mp4')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      {/* 2. HANDOVER PHONE POPUP (LOCKED COORDINATES) */}
      <SpatialTunerFrame
        storageKey="scene2_phone_popup"
        enabled={false}
        initialValues={{
          leftPercent: 34,
          topPercent: 15,
          boxWidth: 700,
          boxHeight: 900,
          scale: 1.5,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          {/* FX Phone Burst Light Flare */}
          <FxHandover_PhoneBurst startFrame={60} x={350} y={450} scale={1.5} />

          {/* Handover Smartphone / App Screen Component */}
          <PropAnimatedHeroPhone
            entranceFrame={60}
            top={0}
            right={80}
            scale={0.85}
            style={{ zIndex: 10, transformOrigin: 'center center' }}
          />
        </div>
      </SpatialTunerFrame>
    </AbsoluteFill>
  );
};

/**
 * 4A. CHALKBOARD PROBLEM INSERT (36 frames / 1.5s):
 * Standalone Math Problem CSAT 22 impact cut with animated chalk equations.
 */
export const ChalkboardImpactCut: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = interpolate(frame, [0, 36], [1.0, 1.05], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0F172A',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, #1E293B 0%, #0F172A 70%, #020617 100%)',
          zIndex: 0,
        }}
      />

      <div
        style={{
          transform: `scale(${cameraScale})`,
          transformOrigin: 'center center',
          zIndex: 20,
          filter:
            'drop-shadow(0 25px 60px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 40px rgba(0, 229, 255, 0.25))',
        }}
      >
        <PropChalkboardMath
          width={1320}
          height={769}
          revealStartFrame={0}
          revealDuration={32}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * 4B. ACTIVE STUDY VOLUNTEER (83 frames):
 * Student volunteers and participates actively in class (flow_shot04_active_study.mp4).
 */
export const Sequence4ActiveStudy: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <Video
        src={staticFile('flow_plates/ready/flow_shot04_active_study.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {frame >= 15 && (
        <div
          style={{
            position: 'absolute',
            left: '46%',
            top: '22%',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          <FxStudy_IdeaPop startFrame={15} />
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 85,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '16px 44px',
          borderRadius: 32,
          border: '2px solid rgba(0, 229, 255, 0.45)',
          boxShadow:
            '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.25)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        <KineticText
          text="자신감 넘치는 참여와 질문으로 성적 수직 상승!"
          color="#FFFFFF"
          fontSize={46}
          fontWeight={900}
          delay={4}
          staggerDelay={2}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * Cyan #00E5FF radial flash transition overlay over 8 frames.
 */
export const QuickCyanRadialFlash: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame >= 8) return null;

  const flashOpacity = interpolate(frame, [0, 2, 8], [0.95, 0.7, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const flashScale = interpolate(frame, [0, 8], [0.85, 1.4], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 90,
        opacity: flashOpacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '140%',
          height: '140%',
          transform: `scale(${flashScale})`,
          background:
            'radial-gradient(circle at 50% 50%, #00E5FF 0%, rgba(0, 229, 255, 0.7) 35%, rgba(2, 132, 199, 0.25) 60%, transparent 75%)',
          mixBlendMode: 'screen',
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * SEQUENCE 5 (Frames 476 – 595): Gate Takeoff & 3D Spatial Flip Exit.
 * Mounts flow_shot05_gate_takeoff.mp4 with 3D flip exit into Scene 6.
 */
export const Sequence5GateTakeoff: React.FC = () => {
  const frame = useCurrentFrame();

  const flipProgress = interpolate(frame, [101, 119], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const rotateY = interpolate(flipProgress, [0, 1], [0, 90], {
    extrapolateRight: 'clamp',
  });
  const exitOpacity = interpolate(flipProgress, [0, 0.85, 1], [1, 0.8, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        perspective: 1200,
        transform: `perspective(1200px) rotateY(${rotateY}deg)`,
        transformOrigin: 'center center',
        opacity: exitOpacity,
      }}
    >
      <Video
        src={staticFile('flow_plates/ready/flow_shot05_gate_takeoff.mp4')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      <QuickCyanRadialFlash />

      <div
        style={{
          position: 'absolute',
          bottom: 90,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 85,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '18px 48px',
          borderRadius: 36,
          border: '2px solid rgba(0, 229, 255, 0.5)',
          boxShadow:
            '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 229, 255, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        <KineticText
          text="주도적인 학습 선순환! 동기부여의 새로운 기준 크래빗!"
          color="#FFFFFF"
          fontSize={50}
          fontWeight={900}
          delay={4}
          staggerDelay={3}
        />
      </div>
    </AbsoluteFill>
  );
};

/**
 * Mascot Crabit SVG Presenter Component
 */
export const MascotCrabitSVG: React.FC = () => {
  const frame = useCurrentFrame();
  const mascotDanceY = Math.sin(frame / 4) * 10;
  const mascotClawWave = Math.sin(frame / 3) * 4;
  const mascotSway = Math.cos(frame / 4) * 2.5;

  return (
    <div
      style={{
        transform: `translateY(${mascotDanceY}px) rotate(${mascotSway + mascotClawWave}deg)`,
        transformOrigin: 'bottom center',
        filter:
          'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 25px rgba(0, 229, 255, 0.4))',
        pointerEvents: 'none',
      }}
    >
      <Img
        src={staticFile('props/mascot_crabit_carat_crystal.svg')}
        style={{
          width: 380,
          height: 332,
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export const CrabitMascot: React.FC = () => (
  <>
    <MascotCrabitSVG />
    <FxCrabit_SpawnSparkles startFrame={10} x={190} y={260} />
  </>
);

/**
 * SEQUENCE 6 (Frames 595 – 714): Dedicated FinTech Showcase Outro.
 * 3D Flip Card + Scholarship Balance Counter + Mascot Crabit + Micro FX Bursts.
 */
export const Sequence6DecoupledShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background:
          'radial-gradient(circle at 50% 45%, #1E3A8A 0%, #0F172A 65%, #090D16 100%)',
        overflow: 'hidden',
      }}
    >
      {/* 3D HERO CARD WITH SPATIAL TUNER */}
      <SpatialTunerFrame
        storageKey="scene6_card"
        enabled={false}
        initialValues={{
          leftPercent: 28,
          topPercent: 13,
          boxWidth: 1400,
          boxHeight: 900,
          scale: 1.16,
        }}
      >
        <CrabitCard3D />
      </SpatialTunerFrame>

      {/* Scholarship Balance Counter below Card */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '74%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        <PropScholarshipCounter targetAmount={50000} startFrame={15} />
      </div>

      {(() => {
        const isRunning = frame >= 20 && frame <= 85;
        const mascotLeft = interpolate(frame, [20, 85], [6, 68], {
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const stepBounce = isRunning ? Math.abs(Math.sin(frame * 0.45)) * 14 : 0;
        const runTilt = isRunning ? Math.sin(frame * 0.45) * 5 : 0;

        return (
          <>
            {/* 1. FX RUNNING TRAIL (DUST & SPARKLES EMITTED FROM FEET) */}
            <FxMascotRunTrail
              isRunning={isRunning}
              anchorXPercent={mascotLeft + 5} // Canh ngay gót chân chú cua
              anchorYPercent={66}
            />

            {/* 2. CRABIT MASCOT WITH RUNNING DYNAMICS */}
            <div
              style={{
                position: 'absolute',
                left: `${mascotLeft}%`,
                top: `calc(52% - ${stepBounce}px)`,
                width: 600,
                height: 600,
                transform: `scale(1.12) rotate(${runTilt}deg)`,
                transformOrigin: 'center bottom',
                zIndex: 4,
                pointerEvents: 'none',
              }}
            >
              <CrabitMascot />
            </div>
          </>
        );
      })()}

      {/* 2. Coin & Carat Explosion around CrabitCard3D when Counter hits 50,000 KRW */}
      {frame >= 45 && (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '42%',
            transform: 'translate(-50%, -50%)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        >
          <FxScholarshipCoinExplosion startFrame={45} />
        </div>
      )}
    </div>
  );
};

// Backward-compatible aliases
export const Sequence3Interaction = CrabitSmartphone3D;
export const Sequence4GateTakeoff = Sequence5GateTakeoff;
export const Sequence6Outro = Sequence6DecoupledShowcase;

/**
 * MASTER COMPOSITE SCENE ARCHITECTURE (714 frames / ~30s / 24 FPS)
 * Strict sequential staging with all 6 scenes restored.
 */
export const MasterCompositeScene: React.FC = () => {
  return (
    <Series>
      {/* 1. SCENE 1: ACADEMY STRUGGLE (119 frames) */}
      <Series.Sequence durationInFrames={119}>
        <Sequence1Struggle />
      </Series.Sequence>

      {/* 2. SCENE 2: HANDOVER SOLUTION (119 frames) */}
      <Series.Sequence durationInFrames={119}>
        <Sequence2Handover />
      </Series.Sequence>

      {/* =========================================================================
          SEQUENCE 3: DEDICATED 3D SMARTPHONE SHOWCASE (119 frames / ~5s / 24 FPS)
          Layout: Split-screen composition (Left: 3D Phone / Right: Feature Typography)
         ========================================================================= */}
      <Series.Sequence durationInFrames={119}>
        <div
          style={{
            position: 'relative',
            width: 1920,
            height: 1080,
            // Dynamic vibrant cyber-blue background blending into navy
            background:
              'radial-gradient(circle at 35% 50%, #1E3A8A 0%, #0F172A 60%, #070B14 100%)',
            overflow: 'hidden',
          }}
        >
          {/* 1. Subtle Background Grid Texture & Ambient Light Sweep */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 25% 45%, rgba(0, 229, 255, 0.15) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />

          {/* REUSABLE LEGO WRAPPER: Handles positioning and real-time visual tuning */}
          <SpatialTunerFrame
            storageKey="scene3_phone"
            enabled={false}
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

          {/* 3. RIGHT 50% FEATURE TYPOGRAPHY & TELEMETRY PANEL */}
          <div
            style={{
              position: 'absolute',
              right: '6%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 740,
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            {/* Category Pill Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                backgroundColor: 'rgba(0, 229, 255, 0.12)',
                border: '1.5px solid #00E5FF',
                borderRadius: 24,
                padding: '8px 22px',
                width: 'fit-content',
              }}
            >
              <span style={{ color: '#00E5FF', fontSize: 18, fontWeight: 700 }}>◆ QUEST ENGINE</span>
              <span style={{ color: '#94A3B8', fontSize: 16 }}>|</span>
              <span style={{ color: '#38BDF8', fontSize: 18, fontWeight: 600 }}>실시간 동기화</span>
            </div>

            {/* Main Feature Title */}
            <div
              style={{
                fontSize: 54,
                fontWeight: 900,
                color: '#FFFFFF',
                lineHeight: 1.15,
                letterSpacing: -1,
              }}
            >
              학원 미션 수행하고 <br />
              <span
                style={{
                  color: '#00E5FF',
                  textShadow: '0 0 24px rgba(0, 229, 255, 0.6)',
                }}
              >
                캐럿 장학금
              </span>
              을 즉시 획득
            </div>

            {/* Feature Bullet Points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00E5FF', boxShadow: '0 0 10px #00E5FF' }} />
                <span style={{ fontSize: 24, color: '#CBD5E1', fontWeight: 500 }}>
                  수능 킬러 문항 및 심야 자습 출석 자동 인증
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#38BDF8', boxShadow: '0 0 10px #38BDF8' }} />
                <span style={{ fontSize: 24, color: '#CBD5E1', fontWeight: 500 }}>
                  적립된 캐럿은 Crabit 체크카드로 즉시 전환
                </span>
              </div>
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
            <span
              style={{
                color: '#94A3B8',
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 2,
                fontFamily: 'monospace',
              }}
            >
              CRABIT KOREA // DUAL-TRACK FINTECH REWARD SYSTEM
            </span>
          </div>
        </div>
      </Series.Sequence>

      {/* 4A. SCENE 4A: CHALKBOARD IMPACT INSERT (36 frames / 1.5s) */}
      <Series.Sequence durationInFrames={36}>
        <ChalkboardImpactCut />
      </Series.Sequence>

      {/* 4B. SCENE 4B: ACTIVE STUDY VOLUNTEER (83 frames) */}
      <Series.Sequence durationInFrames={83}>
        <Sequence4ActiveStudy />
      </Series.Sequence>

      {/* 5. SCENE 5: GATE TAKEOFF & 3D SPATIAL FLIP (119 frames) */}
      <Series.Sequence durationInFrames={119}>
        <Sequence5GateTakeoff />
      </Series.Sequence>

      {/* 6. SCENE 6: DEDICATED FINTECH SHOWCASE OUTRO (119 frames) */}
      <Series.Sequence durationInFrames={119}>
        <Sequence6DecoupledShowcase />
      </Series.Sequence>
    </Series>
  );
};
