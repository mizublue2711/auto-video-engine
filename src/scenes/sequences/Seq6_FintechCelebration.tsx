import React from 'react';
import {
  Audio,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { CrabitDebitCard, PropScholarshipCounter } from '../../components/props';
import { SpatialTunerFrame } from '../../components/dev/SpatialTunerFrame';
import { FxCrabit_SpawnSparkles, FxScholarshipCoinExplosion } from '../../components/fx';
import { FxMascotRunTrail } from '../../components/fx/FxMascotRunTrail';
import { THEME_TOKENS } from '../MasterCompositeScene';

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
 * SEQUENCE 6: Dedicated FinTech Showcase Outro & Reward Celebration.
 * Features:
 * 1. 3D Flip Card entrance with synchronized metallic card flip audio (Frame 10).
 * 2. Scholarship balance counter reaching 50,000 KRW with Success Chime / Cash Register Ring SFX (Frame 45).
 * 3. Particle Carat & Coin explosion burst.
 * 4. Animated mascot running dynamics with sparkle trail.
 */
export const Seq6_FintechCelebration: React.FC = () => {
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
              anchorXPercent={mascotLeft + 5}
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

export const Sequence6DecoupledShowcase = Seq6_FintechCelebration;
export default Seq6_FintechCelebration;
