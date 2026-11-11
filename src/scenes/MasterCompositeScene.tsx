import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  Series,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from 'remotion';
import {
  PropAnalogClock,
  PropChalkboardMath,
  PropPhoneScreenUI,
  PropScholarshipCounter,
} from '../components/props';
import { KineticText } from '../components/text/KineticText';

/**
 * Shot 4: Cyan #00E5FF upward flash transition overlay.
 */
const Shot4CyanUpwardFlash: React.FC = () => {
  const frame = useCurrentFrame();

  // Upward flash transition active over first 24 frames
  const flashProgress = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Upward sweep from +100% to -100%
  const translateY = interpolate(flashProgress, [0, 1], [100, -100]);

  // Flash opacity punch
  const flashOpacity = interpolate(
    frame,
    [0, 2, 8, 24],
    [0.95, 1, 0.65, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  if (frame >= 24) return null;

  return (
    <AbsoluteFill
      style={{
        pointerEvents: 'none',
        zIndex: 80,
        opacity: flashOpacity,
        overflow: 'hidden',
      }}
    >
      {/* High-intensity upward sweeping electric cyan gradient streak */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          transform: `translateY(${translateY}%)`,
          background:
            'linear-gradient(to top, rgba(0, 229, 255, 0) 0%, rgba(0, 229, 255, 0.85) 45%, #FFFFFF 50%, rgba(0, 229, 255, 0.85) 55%, rgba(0, 229, 255, 0) 100%)',
          filter: 'drop-shadow(0 0 45px #00E5FF)',
        }}
      />
      {/* Additive fullscreen cyan bloom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#00E5FF',
          opacity: interpolate(frame, [0, 2, 9], [0.65, 0.85, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
          mixBlendMode: 'screen',
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * Shot 5: Financial Climax Sequence
 * Mounts ISO ID-1 Crabit Card Base SVG and PropScholarshipCounter
 * with Carat diamond particle burst and 50,000 KRW rolling counter.
 */
const Shot5Climax: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for Crabit Card base (frames 0-25)
  const cardEntrance = spring({
    frame,
    fps,
    config: {
      damping: 14,
      mass: 0.9,
      stiffness: 110,
      overshootClamping: false,
    },
  });

  const cardScale = interpolate(cardEntrance, [0, 1], [0.72, 1]);
  const cardOpacity = interpolate(cardEntrance, [0, 1], [0, 1]);

  // Gentle levitation physics for card
  const hoverY = Math.sin((frame / fps) * 2.8) * 6;
  const hoverRotate = Math.cos((frame / fps) * 2.2) * 1.5;

  return (
    <>
      {/* Hero Crabit Card Base SVG (Z-Index: 65) */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '36%',
          transform: `translate(-50%, -50%) translateY(${hoverY}px) rotate(${hoverRotate}deg) scale(${cardScale})`,
          opacity: cardOpacity,
          zIndex: 65,
          width: 720,
          height: 454,
          filter:
            'drop-shadow(0 30px 65px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 35px rgba(0, 229, 255, 0.45))',
          pointerEvents: 'none',
        }}
      >
        <Img
          src={staticFile('props/ui_crabit_card_base_master.svg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* PropScholarshipCounter: rolling from 0 to 50,000 KRW + particle burst (Z-Index: 90) */}
      <PropScholarshipCounter
        targetAmount={50000}
        currencySymbol="KRW"
        durationInFrames={45}
        delay={0}
        style={{
          top: 180,
        }}
      />
    </>
  );
};

/**
 * MasterCompositeScene: Master Timeline Scene Assembly (24 FPS Cadence Lock).
 * Sequentially orchestrates the 5 Google Flow video plates (119 frames each, 595 frames total)
 * and overlays deterministic mechanical props, kinetic typography, and financial rewards.
 */
export const MasterCompositeScene: React.FC = () => {
  return (
    <Series>
      {/* =================================================================== */}
      {/* SHOT 1 (Frames 0 - 119): Classroom Struggle & Procedural Props       */}
      {/* =================================================================== */}
      <Series.Sequence durationInFrames={119}>
        <AbsoluteFill>
          <Video
            src={staticFile('flow_plates/ready/flow_shot01_struggle.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Wall Clock Prop (Z-Index 30) */}
          <div
            style={{
              position: 'absolute',
              top: 50,
              right: 120,
              zIndex: 30,
              filter: 'drop-shadow(0 12px 24px rgba(0, 0, 0, 0.4))',
            }}
          >
            <PropAnalogClock
              size={210}
              initialHour={10}
              initialMinute={10}
              speedMultiplier={2}
            />
          </div>

          {/* Procedural CSAT Chalkboard Math Solver (Z-Index 25) */}
          <div
            style={{
              position: 'absolute',
              top: 80,
              left: 70,
              zIndex: 25,
              filter: 'drop-shadow(0 18px 36px rgba(0, 0, 0, 0.5))',
            }}
          >
            <PropChalkboardMath
              width={620}
              height={361}
              revealStartFrame={10}
              revealDuration={48}
            />
          </div>
        </AbsoluteFill>
      </Series.Sequence>

      {/* =================================================================== */}
      {/* SHOT 2 (Frames 119 - 238): Mobile Handover & Floating App Card UI    */}
      {/* =================================================================== */}
      <Series.Sequence durationInFrames={119}>
        <AbsoluteFill>
          <Video
            src={staticFile('flow_plates/ready/flow_shot02_handover.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Floating Card Popup with @remotion/spring */}
          <PropPhoneScreenUI
            scale={1.05}
            style={{
              left: '52%',
              top: '50%',
            }}
          />
        </AbsoluteFill>
      </Series.Sequence>

      {/* =================================================================== */}
      {/* SHOT 3 (Frames 238 - 357): Student Interaction (Chroma Matte Sandwich) */}
      {/* =================================================================== */}
      <Series.Sequence durationInFrames={119}>
        <AbsoluteFill>
          {/* 1. Bottom Layer: Interaction Plate Video */}
          <Video
            src={staticFile('flow_plates/ready/flow_shot03_interaction.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* 2. Middle Screen Layer: Extended Procedural Scrollable Crabit App UI */}
          <div
            style={{
              position: 'absolute',
              left: 898,
              top: 490,
              transform: 'translate(-50%, -50%) rotate(18deg) scale(0.77)',
              transformOrigin: 'center center',
              zIndex: 50,
            }}
          >
            <PropPhoneScreenUI />
          </div>

          {/* 3. Top Matte Layer: Student Hand Cutout Matte Video */}
          <Video
            src={staticFile('flow_plates/ready/flow_shot03_matte_hand.webm')}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              zIndex: 60,
            }}
          />

          {/* Kinetic Typography Caption Banner */}
          <div
            style={{
              position: 'absolute',
              bottom: 90,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 85,
              backgroundColor: 'rgba(15, 23, 42, 0.82)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '18px 48px',
              borderRadius: 36,
              border: '2px solid rgba(0, 229, 255, 0.45)',
              boxShadow:
                '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 229, 255, 0.3)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            <KineticText
              text="주도적인 학습 선순환! 크래빗!"
              color="#FFFFFF"
              fontSize={54}
              fontWeight={900}
              delay={4}
              staggerDelay={4}
            />
          </div>
        </AbsoluteFill>
      </Series.Sequence>

      {/* =================================================================== */}
      {/* SHOT 4 (Frames 357 - 476): Active Study & Cyan Upward Flash          */}
      {/* =================================================================== */}
      <Series.Sequence durationInFrames={119}>
        <AbsoluteFill>
          <Video
            src={staticFile('flow_plates/ready/flow_shot04_active_study.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Cyan #00E5FF Upward Flash Transition */}
          <Shot4CyanUpwardFlash />
        </AbsoluteFill>
      </Series.Sequence>

      {/* =================================================================== */}
      {/* SHOT 5 (Frames 476 - 595): Financial Climax & Gate Takeoff           */}
      {/* =================================================================== */}
      <Series.Sequence durationInFrames={119}>
        <AbsoluteFill>
          <Video
            src={staticFile('flow_plates/ready/flow_shot05_gate_takeoff.mp4')}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Mount ui_crabit_card_base_master.svg & PropScholarshipCounter */}
          <Shot5Climax />
        </AbsoluteFill>
      </Series.Sequence>
    </Series>
  );
};
