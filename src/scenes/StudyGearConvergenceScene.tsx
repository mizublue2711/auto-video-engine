import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { THEME_TOKENS } from './MasterCompositeScene';

// 4 Motion Lego Wrappers
import { OrbitalSwapWrapper, VortexSuckWrapper, ZeroGFloatWrapper } from '../components/motion/registry';

// 4 Study Gear Props (Assets from Window 1)
import {
  GearTextbook3D,
  GearSmartCalculator,
  GearTriangleRuler,
  GearExamPaper100,
} from '../components/registry';

export interface StudyGearConvergenceSceneProps {
  [key: string]: any;
}

export const StudyGearConvergenceScene: React.FC<StudyGearConvergenceSceneProps> = () => {
  const frame = useCurrentFrame();

  // Anchors: TL (Top-Left), TR (Top-Right), BL (Bottom-Left), BR (Bottom-Right)
  const P_TL = { x: 460, y: 260 };
  const P_TR = { x: 1460, y: 270 };
  const P_BL = { x: 480, y: 800 };
  const P_BR = { x: 1440, y: 790 };

  // Exit Flash to Scene 3
  const portalFlash = interpolate(frame, [138, 144, 150], [0, 0.95, 0], {
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
      {/* 1. Ambient Background Glow & Central Core */}
      <div style={{ position: 'absolute', inset: 0, background: THEME_TOKENS.background.ambientGlow }} />
      <div
        style={{
          position: 'absolute',
          left: 960,
          top: 540,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.7) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(28px)',
        }}
      />

      {/* ITEM 1: TEXTBOOK (Swaps TL -> BR) */}
      <OrbitalSwapWrapper from={P_TL} to={P_BR} arcHeight={70} startFrame={30} durationInFrames={75} tiltAngle={[-12, 14]}>
        <VortexSuckWrapper startFrame={105} durationInFrames={38} spins={1.2}>
          <ZeroGFloatWrapper amplitude={12} phaseOffset={0}>
            <GearTextbook3D size={220} />
          </ZeroGFloatWrapper>
        </VortexSuckWrapper>
      </OrbitalSwapWrapper>

      {/* ITEM 2: CALCULATOR (Swaps BR -> TL) */}
      <OrbitalSwapWrapper from={P_BR} to={P_TL} arcHeight={-70} startFrame={30} durationInFrames={75} tiltAngle={[14, -10]}>
        <VortexSuckWrapper startFrame={105} durationInFrames={38} spins={-1.2}>
          <ZeroGFloatWrapper amplitude={14} phaseOffset={1.5}>
            <GearSmartCalculator size={180} />
          </ZeroGFloatWrapper>
        </VortexSuckWrapper>
      </OrbitalSwapWrapper>

      {/* ITEM 3: TRIANGLE RULER (Swaps TR -> BL) */}
      <OrbitalSwapWrapper from={P_TR} to={P_BL} arcHeight={60} startFrame={35} durationInFrames={70} tiltAngle={[10, -14]}>
        <VortexSuckWrapper startFrame={105} durationInFrames={38} spins={1}>
          <ZeroGFloatWrapper amplitude={10} phaseOffset={3}>
            <GearTriangleRuler size={190} />
          </ZeroGFloatWrapper>
        </VortexSuckWrapper>
      </OrbitalSwapWrapper>

      {/* ITEM 4: EXAM PAPER 100 (Swaps BL -> TR) */}
      <OrbitalSwapWrapper from={P_BL} to={P_TR} arcHeight={-60} startFrame={35} durationInFrames={70} tiltAngle={[-16, 12]}>
        <VortexSuckWrapper startFrame={105} durationInFrames={38} spins={-1}>
          <ZeroGFloatWrapper amplitude={12} phaseOffset={4.5}>
            <GearExamPaper100 size={210} />
          </ZeroGFloatWrapper>
        </VortexSuckWrapper>
      </OrbitalSwapWrapper>

      {/* Exit Flash */}
      <div style={{ position: 'absolute', inset: 0, background: '#FFFFFF', opacity: portalFlash, pointerEvents: 'none' }} />
    </div>
  );
};
