import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  Video,
} from 'remotion';
import { PropAnalogClock, PropAnimatedHeroPhone } from '../../components/props';
import { FxHandover_PhoneBurst } from '../../components/fx';
import { SpatialTunerFrame } from '../../components/dev/SpatialTunerFrame';
import { THEME_TOKENS } from '../MasterCompositeScene';

/**
 * SEQUENCE 2: Handover Solution (Classroom Continuity Edition).
 * Features:
 * 1. Synchronized analog wall clock preserved from Scene 1 (continuous time flow).
 * 2. Hagwon classroom plate video with smooth crossfade dissolve entry/exit.
 * 3. Spatial phone popup reveal with lens flare burst.
 */
export const Seq2_ClassroomHandover: React.FC = () => {
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

export const Sequence2Handover = Seq2_ClassroomHandover;
export default Seq2_ClassroomHandover;
