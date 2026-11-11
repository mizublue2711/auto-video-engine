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
  PhoneScreen3D,
  PropAnalogClock,
  PropChalkboardMath,
  PropScholarshipCounter,
} from '../components/props';
import { KineticText } from '../components/text/KineticText';

/**
 * SEQUENCE 1 (Frames 0 – 119): Academy Struggle & Clock Camera Zoom-Out.
 * Firmly anchors the video without canvas bleed and zooms out from 2.2 down to 1.0,
 * centered precisely on the clock (transformOrigin: '48% 22%').
 * Crossfade / Dissolve exit over the last 12 frames into Sequence 2.
 */
export const Sequence1Struggle: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth camera zoom-out from 2.2 down to 1.0 centered on the clock
  const cameraZoom = interpolate(frame, [0, 48], [2.2, 1.0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });

  // Dissolve exit over the last 12 frames (frames 107 to 119)
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
      {/* Background Video firmly anchored 100% x 100% */}
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

      {/* Wall Clock Prop anchored to the upper middle wall: top 18%, left 46% */}
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
 * Clean, seamless video-to-video handover plate with smooth crossfades.
 * Ends with a gentle dissolve transition into Scene 3.
 */
export const Sequence2Handover: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth 12-frame fade in from Scene 1 (relative frames 0 to 12)
  const fadeIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Dissolve exit over the last 12 frames (relative frames 107 to 119) into Scene 3
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
    </AbsoluteFill>
  );
};

/**
 * SEQUENCE 3 (Frames 238 – 357): Dedicated 3D Phone Interaction Scene.
 * Replaces the old plate entirely: pure dark aesthetic (#0F172A with radial cyan glow).
 * Floating PhoneScreen3D with cinematic tilt, smoothly scrolling through the CSAT quest tasks.
 * Zero green screen keying or matte hand alignment needed.
 */
export const Sequence3DedicatedPhone3D: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle cinematic camera zoom into the 3D phone screen
  const cameraZoom = interpolate(frame, [0, 119], [1.0, 1.12], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateRight: 'clamp',
  });

  // Floating hover physics
  const hoverY = Math.sin(frame / 10) * 10;
  const hoverTilt = Math.sin(frame / 16) * 1.2;

  // Seamless dissolve transitions
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
        backgroundColor: '#0F172A',
        overflow: 'hidden',
        opacity: fadeIn * fadeOut,
      }}
    >
      {/* Dark aesthetic background with radial cyan glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 229, 255, 0.22) 0%, rgba(2, 132, 199, 0.08) 45%, #0F172A 75%, #020617 100%)',
          zIndex: 0,
        }}
      />

      {/* Floating 3D Phone with Unlit Line Art & Procedural Scroll */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraZoom}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
          transformOrigin: 'center center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <PhoneScreen3D width={1920} height={1080} />
      </div>

      {/* Kinetic Typography Feature Pill */}
      <div
        style={{
          position: 'absolute',
          bottom: 70,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '16px 48px',
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
          text="실시간 미션 완수 & Carat 보상 지급!"
          color="#FFFFFF"
          fontSize={44}
          fontWeight={900}
          delay={4}
          staggerDelay={2}
        />
      </div>
    </AbsoluteFill>
  );
};

// Backward-compatible alias
export const Sequence3Interaction = Sequence3DedicatedPhone3D;

/**
 * 4A. CHALKBOARD PROBLEM INSERT (36 frames / 1.5s):
 * Mathematical CSAT 22 impact cut with animated chalk equations.
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
 * Student raises hand and participates enthusiastically in class.
 * Mounts flow_shot04_active_study.mp4 with dynamic motivational kinetic typography.
 */
export const Sequence4ActiveStudy: React.FC = () => {
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

      {/* Dynamic Motivation Caption Banner */}
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
 * Mounts cinematic gate takeoff plate and kinetic typography.
 * At start (first 8 frames): Quick Cyan #00E5FF radial flash.
 * At end (last 18 frames, frames 101 – 119): 3D spatial rotateY flip exit (0 -> 90deg) into Scene 6.
 */
export const Sequence5GateTakeoff: React.FC = () => {
  const frame = useCurrentFrame();

  // 3D Perspective Flip Exit on the last 18 frames (frames 101 – 119)
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

      {/* Quick Cyan #00E5FF Radial Flash Transition over first 8 frames */}
      <QuickCyanRadialFlash />

      {/* Kinetic Typography Caption Banner */}
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

// Backward-compatible alias
export const Sequence4GateTakeoff = Sequence5GateTakeoff;

/**
 * Mascot Crabit Dancing in Corner SVG Component
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
 * Integrates CrabitCard3D (-90deg -> 0deg flip), Scholarship Balance Counter (+50,000 KRW),
 * and Mascot Crabit in the corner.
 */
export const Sequence6DecoupledShowcase: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        backgroundColor: '#0F172A',
        overflow: 'hidden',
      }}
    >
      {/* Radial background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 45%, rgba(0, 229, 255, 0.16) 0%, rgba(15, 23, 42, 0.8) 60%, #0F172A 100%)',
          zIndex: 1,
        }}
      />

      {/* 1. 3D Flip Card */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '46%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
        }}
      >
        <CrabitCard3D width={900} height={650} />
      </div>

      {/* 2. Scholarship Balance Counter */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '78%',
          transform: 'translateX(-50%)',
          zIndex: 3,
        }}
      >
        <PropScholarshipCounter targetAmount={50000} startFrame={20} />
      </div>

      {/* 3. Mascot Crabit Dancing in Corner */}
      <div
        style={{
          position: 'absolute',
          left: '8%',
          bottom: '8%',
          zIndex: 3,
        }}
      >
        <MascotCrabitSVG />
      </div>
    </div>
  );
};

// Backward-compatible alias
export const Sequence5DecoupledShowcase = Sequence6DecoupledShowcase;

/**
 * MasterCompositeScene: Master Staging & Timeline Assembly (714 frames / 24 FPS / 29.75s).
 * 1. Sequence 1 (119 frames): Academy Struggle + Camera Zoom-out on Clock + Dissolve Exit.
 * 2. Sequence 2 (119 frames): Handover Solution + Seamless Dissolve Exit.
 * 3. Sequence 3 (119 frames): Dedicated 3D Phone Interaction Scene (Procedural Task Scroll).
 * 4A. Chalkboard Problem Insert (36 frames): Mathematical CSAT 22 Chalkboard Cut.
 * 4B. Active Study Volunteer (83 frames): Student Participates Actively (flow_shot04_active_study.mp4).
 * 5. Sequence 5 (119 frames): Gate Takeoff + Quick Cyan Radial Flash + 3D Spatial Flip Exit.
 * 6. Sequence 6 (119 frames): Dedicated FinTech Showcase Outro (3D Flip Card + Scholarship Counter + Mascot).
 */
export const MasterCompositeScene: React.FC = () => {
  return (
    <Series>
      {/* 1. ACADEMY STRUGGLE (119 frames) */}
      <Series.Sequence durationInFrames={119}>
        <Sequence1Struggle />
      </Series.Sequence>

      {/* 2. HANDOVER SOLUTION (119 frames) */}
      <Series.Sequence durationInFrames={119}>
        <Sequence2Handover />
      </Series.Sequence>

      {/* 3. DEDICATED 3D PHONE INTERACTION SCENE (119 frames) - REPLACES OLD PLATE */}
      <Series.Sequence durationInFrames={119}>
        <Sequence3DedicatedPhone3D />
      </Series.Sequence>

      {/* 4A. CHALKBOARD PROBLEM INSERT (36 frames) */}
      <Series.Sequence durationInFrames={36}>
        <ChalkboardImpactCut />
      </Series.Sequence>

      {/* 4B. ACTIVE STUDY VOLUNTEER (83 frames) */}
      <Series.Sequence durationInFrames={83}>
        <Sequence4ActiveStudy />
      </Series.Sequence>

      {/* 5. GATE TAKEOFF & 3D FLIP EXIT (119 frames) */}
      <Series.Sequence durationInFrames={119}>
        <Sequence5GateTakeoff />
      </Series.Sequence>

      {/* 6. DEDICATED FINTECH SHOWCASE OUTRO (119 frames) */}
      <Series.Sequence durationInFrames={119}>
        <Sequence6DecoupledShowcase />
      </Series.Sequence>
    </Series>
  );
};
