import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  Series,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from 'remotion';
import {
  CrabitCard3D,
  CrabitDebitCard,
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
import {
  IconCaratDiamond,
  IconFlashQuest,
  IconTargetMission,
} from '../components/ui/VectorIcons';
import { CouponTicketCard } from '../components/ui/CouponTicketCard';
import {
  KineticStaggerWrapper,
  SpatialCameraDolly,
} from '../components/motion';
import { StudyGearConvergenceScene } from './StudyGearConvergenceScene';

// ============================================================================
// 🎨 GLOBAL K-FINTECH DESIGN TOKENS (SINGLE SOURCE OF TRUTH)
// Soft Pastel & Squircle Aesthetics for Korean Commercial Style
// ============================================================================
export { THEME_TOKENS } from './config/themeTokens';
import { THEME_TOKENS } from './config/themeTokens';


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
        background: THEME_TOKENS.background.global,
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

      {/* 1. CONTINUITY: CLASSROOM WALL CLOCK (Layering: Background wall layer zIndex: 10) */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '46%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.45))',
          pointerEvents: 'none',
        }}
      >
        <PropAnalogClock
          size={210}
          initialHour={10}
          initialMinute={10}
          speedMultiplier={2}
          frameOffset={119}
        />
      </div>

      {/* 2. HANDOVER PHONE POPUP (Layering: Foreground near-camera popup zIndex: 50) */}
      <SpatialTunerFrame
        storageKey="scene2_phone_popup"
        enabled={false}
        zIndex={50}
        initialValues={{
          leftPercent: 34,
          topPercent: 15,
          boxWidth: 700,
          boxHeight: 900,
          scale: 1.5,
        }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 50 }}>
          {/* FX Phone Burst Light Flare */}
          <FxHandover_PhoneBurst startFrame={60} x={350} y={450} scale={1.5} />

          {/* Handover Smartphone / App Screen Component */}
          <PropAnimatedHeroPhone
            entranceFrame={60}
            top={0}
            right={80}
            scale={0.85}
            style={{ zIndex: 50, transformOrigin: 'center center' }}
          />
        </div>
      </SpatialTunerFrame>
    </AbsoluteFill>
  );
};

/**
 * 4A. CHALKBOARD PROBLEM INSERT (36 frames / 1.5s):
 * Standalone Math Problem CSAT 22 impact cut with animated chalk equations.
 * Integrated Hagwon classroom wall with natural diagonal sunlight beam.
 * Directional Whip Pan & Focus Blur Exit with Chalk Dust / Light Bleed into Scene 4B.
 */
/**
 * 4. SEQUENCE 4: CHALKBOARD TO ACTIVE STUDY (119 frames ~ 5.0s / 24 FPS)
 * Seamless Overlapping Crossfade & Focus Pull:
 * 1. CSAT Math Chalkboard formula reveals dynamically (Frames 0 - 20).
 * 2. 18-frame Overlapping Crossfade (Frames 18 - 36):
 *    - Chalkboard: opacity 1 -> 0, scale 1.0 -> 1.05, blur 0 -> 6px.
 *    - Student Volunteering: opacity 0 -> 1, scale 0.98 -> 1.0, blur 6px -> 0px.
 * 3. Student Active Study & Idea Pop (Frames 36 - 119).
 */
export const Sequence4BlackboardToActiveStudy: React.FC = () => {
  const frame = useCurrentFrame();

  const endFrame = 36;
  const startTransition = endFrame - 18; // Frame 18 (18 frames of overlap: frames 18 to 36)

  const transitionProgress = interpolate(frame, [startTransition, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Blackboard motion properties during crossfade (Clip Bảng đen: opacity 1 -> 0, scale 1.0 -> 1.05)
  const boardOpacity = interpolate(transitionProgress, [0, 1], [1, 0]);
  const boardScale = interpolate(transitionProgress, [0, 1], [1.0, 1.05]);
  const boardBlur = interpolate(transitionProgress, [0, 1], [0, 6]);

  // Student video motion properties during crossfade (Clip Học sinh: opacity 0 -> 1, scale 0.98 -> 1.0)
  const studentOpacity = interpolate(transitionProgress, [0, 1], [0, 1]);
  const studentScale = interpolate(transitionProgress, [0, 1], [0.98, 1.0]);
  const studentBlur = interpolate(transitionProgress, [0, 1], [6, 0]);

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        backgroundColor: THEME_TOKENS.background.classroomWall,
      }}
    >
      {/* LAYER 1: ACTIVE STUDY VOLUNTEER (Pre-mounted and rolling from startTransition = frame 18) */}
      {frame >= startTransition && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: studentOpacity,
            transform: `scale(${studentScale})`,
            filter: studentBlur > 0.05 ? `blur(${studentBlur}px)` : undefined,
            zIndex: 10,
          }}
        >
          <Video
            src={staticFile('flow_plates/ready/flow_shot04_active_study.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Idea Pop FX */}
          {frame >= 45 && (
            <div
              style={{
                position: 'absolute',
                left: '46%',
                top: '22%',
                zIndex: 4,
                pointerEvents: 'none',
              }}
            >
              <FxStudy_IdeaPop startFrame={45} />
            </div>
          )}

          {/* Kinetic Headline Banner */}
          {frame >= 32 && (
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
          )}
        </div>
      )}

      {/* LAYER 2: CHALKBOARD MATH IMPACT CUT (Frames 0 to 36) */}
      {frame < endFrame && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: boardOpacity,
            transform: `scale(${boardScale})`,
            filter: boardBlur > 0.05 ? `blur(${boardBlur}px)` : undefined,
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          {/* Natural Diagonal Window Sunlight Beam */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(125deg, transparent 40%, rgba(255, 253, 245, 0.55) 60%, transparent 75%)',
              zIndex: 1,
            }}
          />

          {/* Soft Ambient Vignette / Wall Trim Shadow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 50% 50%, transparent 60%, rgba(180, 160, 140, 0.22) 100%)',
              zIndex: 1,
            }}
          />

          {/* Chalkboard Drop Shadow onto Classroom Wall */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '82%',
              height: '78%',
              boxShadow:
                '0 24px 60px -10px rgba(78, 64, 48, 0.28), 0 12px 24px -5px rgba(0, 0, 0, 0.08)',
              borderRadius: 16,
              zIndex: 1,
            }}
          />

          {/* BLACKBOARD COMPONENT CONTAINER */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PropChalkboardMath
              width={1320}
              height={769}
              revealStartFrame={0}
              revealDuration={24}
            />
          </div>

          {/* SFX: Chalk Writing Audio Loop (Frames 0 to 24) */}
          <Audio
            src={staticFile('audio/sfx/chalk_writing_loop.mp3')}
            startFrom={0}
            volume={0.55}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};

export const ChalkboardImpactCut: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraScale = interpolate(frame, [0, 36], [1.0, 1.05], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  // Focus Blur & Directional Whip Pan exit (Frames 24 to 36)
  const exitProgress = interpolate(frame, [24, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const panX = interpolate(exitProgress, [0, 1], [0, -60]);
  const blurAmount = interpolate(exitProgress, [0, 1], [0, 8]);
  const chalkDustBleed = interpolate(frame, [24, 36], [0, 0.65], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: THEME_TOKENS.background.classroomWall,
        overflow: 'hidden',
        transform: `translateX(${panX}px)`,
        filter: blurAmount > 0.05 ? `blur(${blurAmount}px)` : undefined,
      }}
    >
      {/* 1. Natural Diagonal Window Sunlight Beam (Chiếu xiên từ góc trên phải) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(125deg, transparent 40%, rgba(255, 253, 245, 0.55) 60%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 2. Soft Ambient Vignette / Wall Trim Shadow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, transparent 60%, rgba(180, 160, 140, 0.22) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Chalk Dust / Light Bleed Exit (Frames 24 to 36 - Softens the cut into Scene 4B) */}
      {chalkDustBleed > 0.01 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 60% 45%, rgba(255, 255, 255, 0.85) 0%, rgba(254, 243, 199, 0.5) 45%, rgba(224, 242, 254, 0.2) 75%, transparent 100%)',
            opacity: chalkDustBleed,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            zIndex: 50,
          }}
        />
      )}

      {/* 3. Chalkboard Drop Shadow onto the Classroom Wall (Bóng đổ sau lưng bảng) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '82%',
          height: '78%',
          boxShadow:
            '0 24px 60px -10px rgba(78, 64, 48, 0.28), 0 12px 24px -5px rgba(0, 0, 0, 0.08)',
          borderRadius: 16,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 4. BLACKBOARD COMPONENT CONTAINER (Mounted as normal) */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `scale(${cameraScale})`,
            transformOrigin: 'center center',
          }}
        >
          <PropChalkboardMath
            width={1320}
            height={769}
            revealStartFrame={0}
            revealDuration={32}
          />
        </div>
      </div>

      {/* 5. SFX: CHALKBOARD WRITING LOOP (Equations & graph drawing audio) */}
      <Audio
        src={staticFile('audio/sfx/chalk_writing_loop.mp3')}
        startFrom={0}
        volume={0.55}
      />
    </div>
  );
};

/**
 * 4B. ACTIVE STUDY VOLUNTEER (83 frames):
 * Student volunteers and participates actively in class (flow_shot04_active_study.mp4).
 * Directional Whip Pan & Focus Blur Entrance matching Scene 4A exit.
 */
export const Sequence4ActiveStudy: React.FC = () => {
  const frame = useCurrentFrame();

  // Focus Blur & Directional Whip Pan enter (Frames 0 to 14)
  const enterProgress = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const enterPanX = interpolate(enterProgress, [0, 1], [60, 0]);
  const enterBlur = interpolate(enterProgress, [0, 1], [8, 0]);
  const lightBleedFade = interpolate(frame, [0, 14], [0.65, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        transform: `translateX(${enterPanX}px)`,
        filter: enterBlur > 0.05 ? `blur(${enterBlur}px)` : undefined,
      }}
    >
      <Video
        src={staticFile('flow_plates/ready/flow_shot04_active_study.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Chalk Dust / Light Bleed Entrance Dissolve */}
      {lightBleedFade > 0.01 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 40% 45%, rgba(255, 255, 255, 0.85) 0%, rgba(254, 243, 199, 0.5) 45%, rgba(224, 242, 254, 0.2) 75%, transparent 100%)',
            opacity: lightBleedFade,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            zIndex: 50,
          }}
        />
      )}

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
  const { fps } = useVideoConfig();

  // 2. Card Spring 3D Flip Entrance (Bắt đầu nảy từ frame 10 của Scene 6)
  const cardEntrance = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 13, stiffness: 85, mass: 0.9 },
  });

  // Xoay lật 3D từ 90 độ (úp cạnh bên) vung ra chính diện 0 độ
  const cardRotateY = interpolate(cardEntrance, [0, 1], [-75, 0]);
  const cardRotateX = interpolate(cardEntrance, [0, 1], [24, 6]);
  const cardTranslateY = interpolate(cardEntrance, [0, 1], [80, 0]);
  const cardScale = interpolate(cardEntrance, [0, 1], [0.65, 1]);
  const cardOpacity = interpolate(cardEntrance, [0, 0.3], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: THEME_TOKENS.background.global,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: THEME_TOKENS.background.ambientGlow,
          pointerEvents: 'none',
        }}
      />

      {/* =====================================================================
          SFX SOUND DESIGN: TRIUMPHANT ASCENDING MAGIC CHIME & REWARD CELEBRATION
         ===================================================================== */}
      {/* Âm thanh chiến thắng tươi sáng khi thẻ hoàn tất cú xoay lật 3D đáp xuống chính diện (Frame 22) */}
      <Sequence from={22} durationInFrames={60}>
        <Audio
          src={staticFile('audio/sfx/magic_ascending_chime.mp3')}
          startFrom={0}
          volume={0.65}
        />
      </Sequence>

      {/* Reward Climax Coin Explosion (Frame 45) */}
      <Sequence from={45} durationInFrames={50}>
        <Audio src={staticFile('audio/sfx/success_chime.mp3')} volume={0.7} />
      </Sequence>

    {/* 2. SPATIAL TUNER WRAPPER FOR REFACTORED DEBIT CARD WITH 3D FLIP */}
    <SpatialTunerFrame
      storageKey="scene6_card"
      enabled={false}
      initialValues={{
        leftPercent: 12,
        topPercent: -4,
        boxWidth: 1400,
        boxHeight: 900,
        scale: 1.34,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          perspective: 1400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            transform: `translateY(${cardTranslateY}px) scale(${cardScale}) rotateY(${cardRotateY}deg) rotateX(${cardRotateX}deg)`,
            opacity: cardOpacity,
            transformStyle: 'preserve-3d',
          }}
        >
          <CrabitDebitCard />
        </div>
      </div>
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
export const Seq2_ClassroomHandover = Sequence2Handover;
export const Seq6_FintechCelebration = Sequence6DecoupledShowcase;
export const Seq4_BlackboardToActiveStudy = Sequence4BlackboardToActiveStudy;
export { Seq4_AppInterface } from './sequences/Seq4_AppInterface';
export { Seq5_BlackboardMath } from './sequences/Seq5_BlackboardMath';

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
          SEQUENCE 2.5: STUDY GEAR CONVERGENCE BRIDGE (180 FRAMES ~ 6.0 SECONDS)
          Kinetic Orbital Swap & Portal Convergence into Crabit App
         ========================================================================= */}
      <Series.Sequence durationInFrames={180}>
        <StudyGearConvergenceScene />
      </Series.Sequence>

      {/* =========================================================================
          SEQUENCE 3: DEDICATED 3D SMARTPHONE SHOWCASE (119 frames / ~5s / 24 FPS)
          Layout: Split-screen composition (Left: 3D Phone / Right: Feature Typography)
         ========================================================================= */}
      <Series.Sequence durationInFrames={119}>
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
      </Series.Sequence>

      {/* 4. SCENE 4: CHALKBOARD TO ACTIVE STUDY (119 frames ~ 5.0s / 24 FPS) - Seamless Overlapping Crossfade */}
      <Series.Sequence durationInFrames={119}>
        <Sequence4BlackboardToActiveStudy />
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
