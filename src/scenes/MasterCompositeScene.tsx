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
import {
  FxCrabit_SpawnSparkles,
  FxHandover_PhoneBurst,
  FxScholarshipCoinExplosion,
  FxStudy_IdeaPop,
} from '../components/fx';
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

      {/* Floating App Preview Popup Phone at relative frame 60 */}
      <PropAnimatedHeroPhone
        entranceFrame={60}
        top="12%"
        right="8%"
        scale={0.85}
        style={{ zIndex: 10 }}
      />

      {/* Burst FX anchored directly around the popup phone */}
      {frame >= 60 && (
        <div
          style={{
            position: 'absolute',
            top: '38%',
            right: '20%',
            zIndex: 15,
            pointerEvents: 'none',
          }}
        >
          <FxHandover_PhoneBurst startFrame={60} scale={1.5} />
        </div>
      )}
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
      {/* Centered 3D Crabit Card - bold ~60% width */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '38%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}
      >
        <CrabitCard3D width={1280} height={800} />
      </div>

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

      {/* Mascot Crabit SVG on the left */}
      <div
        style={{
          position: 'absolute',
          left: '14%',
          bottom: '8%',
          zIndex: 3,
        }}
      >
        <MascotCrabitSVG />
      </div>

      {/* 1. Mascot Spawning Sparkles around Crabit */}
      <div
        style={{
          position: 'absolute',
          left: '12%',
          bottom: '6%',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      >
        <FxCrabit_SpawnSparkles startFrame={10} />
      </div>

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

      {/* 3. SCENE 3: DEDICATED 3D SMARTPHONE SHOWCASE (119 frames) */}
      <Series.Sequence durationInFrames={119}>
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
          {/* Bound with Safe Schema Configuration */}
          <CrabitSmartphone3D
            config={{
              rotXBase: 0.15,
              rotYMin: -0.50,
              rotYMax: -0.30,
              anchorX: -0.40,
              cameraZ: 4.8,
              cameraFOV: 42,
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '4.5%',
              left: 0,
              width: '100%',
              textAlign: 'center',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                color: '#00E5FF',
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: 2,
                textShadow: '0 0 16px rgba(0, 229, 255, 0.5)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}
            >
              실시간 학습 퀘스트 & 캐럿 리워드 시스템
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
