import React from 'react';
import { useCurrentFrame, interpolate, spring, Easing, Audio, Sequence, staticFile } from 'remotion';
import { THEME_TOKENS } from './config/themeTokens';

// 1. Assets from Registry
import {
  GearTextbook3D,
  GearSmartCalculator,
  GearTriangleRuler,
  GearExamPaper100,
  GearStylusPen,
  GearCompassGeometry,
  GearMagnifyingGlass,
  HyperspeedWarpBackground,
} from '../components/registry';

// 2. Motion Wrappers from Registry
import {
  OrbitalSwapWrapper,
  ZeroGFloatWrapper,
  BottomSheetDrawerReveal,
  MenuSlotSnapBounce,
} from '../components/motion/registry';

export interface StudyGearConvergenceSceneProps {
  [key: string]: any;
}

export const StudyGearConvergenceScene: React.FC<StudyGearConvergenceSceneProps> = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const CX = 960;
  const CY = 540;

  // =========================================================================
  // 1. TIMING & MOTION CALCULATIONS
  // =========================================================================

  // --- Pha 1: Orb lao THẲNG NGANG từ mép trái vào tâm (Frames 0 - 30) ---
  const launchProgress = interpolate(frame, [0, 30], [0, 1], {
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const orbX = interpolate(launchProgress, [0, 1], [-200, CX]);
  const orbY = CY; // Khóa cứng trục Y cố định ở giữa màn hình

  // --- Pha 2: Orb đứng yên ở tâm, rung lắc & phình to cực đại (Frames 30 - 50) ---
  const expandProgress = interpolate(frame, [30, 50], [0, 1], {
    easing: Easing.bezier(0.5, 0, 0.75, 0),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const orbScale = interpolate(expandProgress, [0, 1], [1, 2.3]);
  const orbShake = frame >= 38 && frame < 50 ? Math.sin(frame * 1.8) * 7 : 0;

  // Orb biến mất ngay khi kích nổ tại frame 50
  const isOrbAlive = frame < 50;

  // --- Pha 3: Kích nổ & Bung icon từ tâm (Frames 50+) ---
  const isBurstTriggered = frame >= 50;
  const burstSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 14, stiffness: 95, mass: 0.8 },
  });

  // Chớp sáng khi nổ (Frames 48 - 56)
  const burstFlash = interpolate(frame, [48, 50, 56], [0, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Chớp sáng kết thúc sequence (Frames 168 - 180)
  const finalExitFlash = interpolate(frame, [168, 174, 180], [0, 0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // =========================================================================
  // 2. 7 SPATIAL ANCHORS (TỌA ĐỘ 7 ĐIỂM NEO KHI BUNG RA)
  // =========================================================================
  const P1_TL = { x: 380, y: 220 };   // Textbook
  const P2_TC = { x: 960, y: 190 };   // Stylus Pen
  const P3_TR = { x: 1540, y: 230 };  // Triangle Ruler
  const P4_ML = { x: 260, y: 520 };   // Compass
  const P5_MR = { x: 1660, y: 520 };  // Magnifying Glass
  const P6_BL = { x: 420, y: 780 };   // Exam Paper 100
  const P7_BR = { x: 1500, y: 780 };  // Smart Calculator

  const calcBurstPos = (target: { x: number; y: number }) => ({
    x: interpolate(burstSpring, [0, 1], [CX, target.x]),
    y: interpolate(burstSpring, [0, 1], [CY, target.y]),
  });

  const pos1 = calcBurstPos(P1_TL);
  const pos2 = calcBurstPos(P2_TC);
  const pos3 = calcBurstPos(P3_TR);
  const pos4 = calcBurstPos(P4_ML);
  const pos5 = calcBurstPos(P5_MR);
  const pos6 = calcBurstPos(P6_BL);
  const pos7 = calcBurstPos(P7_BR);

  const burstScale = interpolate(burstSpring, [0, 1], [0.1, 1]);

  // =========================================================================
  // 3. RADIAL FUNNEL SNAP & CRASH-ZOOM PORTAL CALCULATIONS (Frames 135 - 180)
  // =========================================================================

  // --- Pha 4: 7 Dụng cụ hút xuyên tâm thẳng vào tâm quả cầu kim cương (Frames 135 - 155) ---
  const absorbProgress = interpolate(frame, [135, 155], [0, 1], {
    easing: Easing.bezier(0.6, 0, 0.8, 0.2),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Mỗi vật thể khi đến frame 135 sẽ tịnh tiến thẳng từ vị trí hiện tại về (960, 540)
  // scale = (1 - absorbProgress) * burstScale;
  const getFunnelTransform = (target: { x: number; y: number }) => {
    const absorbX = (CX - target.x) * absorbProgress;
    const absorbY = (CY - target.y) * absorbProgress;
    const currentScale = (1 - absorbProgress) * burstScale;

    return {
      transform: `translate(${absorbX}px, ${absorbY}px) scale(${currentScale})`,
      opacity: currentScale > 0.001 ? 1 : 0,
      transformOrigin: 'center center',
    };
  };

  // --- Pha 5: Quả cầu kim cương tích tụ hào quang & Crash-Zoom xuyên camera (Frames 160 - 180) ---
  // Quả cầu hồi tụ tại tâm khi 7 vật thể bắt đầu bị hút vào (Frames 135 - 150)
  const orbAppearScale = interpolate(frame, [135, 150], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Hào quang năng lượng tích tụ tăng dần (Frames 150 - 162)
  const orbAuraGlow = interpolate(frame, [150, 162], [60, 140], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Crash-zoom xuyên màn hình để nối sang scene kế tiếp (Frames 162 - 180)
  const crashZoomScale = interpolate(frame, [162, 180], [1, 28], {
    easing: Easing.bezier(0.7, 0, 0.95, 0.3),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const crashZoomOpacity = interpolate(frame, [172, 180], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const diamondOrbScale = frame >= 162 ? crashZoomScale : orbAppearScale;
  const diamondOrbOpacity = frame >= 162 ? crashZoomOpacity : orbAppearScale;

  // =========================================================================
  // 4. BOTTOM SHEET FLICKER-FREE EXIT PROGRESS (Frames 142 - 165)
  // =========================================================================
  const drawerExitProgress = interpolate(frame, [142, 165], [0, 1], {
    easing: Easing.bezier(0.65, 0, 0.85, 0.2),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const drawerOpacity = 1 - drawerExitProgress;
  const drawerScale = interpolate(drawerExitProgress, [0, 1], [1, 0.65]);

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
      {/* 1. BACKGROUND AMBIENT GLOW */}
      <div style={{ position: 'absolute', inset: 0, background: THEME_TOKENS.background.ambientGlow }} />

      {/* =====================================================================
          SFX SOUND DESIGN INTEGRATION (5-PHASE AUDIO-VISUAL FLOW)
         ===================================================================== */}
      {/* 1. Whoosh / Hyperspeed Fly-by (Frames 0 - 30) */}
      <Sequence from={0} durationInFrames={35}>
        <Audio src={staticFile('audio/sfx/whoosh_fast.mp3')} volume={0.6} />
      </Sequence>

      {/* 2. Glass / Energy Detonation (Frames 48 - 75) */}
      <Sequence from={48} durationInFrames={40}>
        <Audio src={staticFile('audio/sfx/energy_burst.mp3')} volume={0.7} />
      </Sequence>

      {/* 3. Air Swish / Swapping Chimes (Frames 70 - 110) */}
      <Sequence from={70} durationInFrames={45}>
        <Audio src={staticFile('audio/sfx/swapping_chimes.mp3')} volume={0.55} />
      </Sequence>

      {/* 4A. App Drawer Slide (Frames 105 - 130) */}
      <Sequence from={105} durationInFrames={30}>
        <Audio src={staticFile('audio/sfx/drawer_slide.mp3')} volume={0.55} />
      </Sequence>

      {/* 4B. 3 Pop / Clicks for 3 Menu Blocks (Frames 115, 119, 123) */}
      <Sequence from={115} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop_click.mp3')} volume={0.45} />
      </Sequence>
      <Sequence from={119} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop_click.mp3')} volume={0.5} />
      </Sequence>
      <Sequence from={123} durationInFrames={15}>
        <Audio src={staticFile('audio/sfx/pop_click.mp3')} volume={0.55} />
      </Sequence>

      {/* 5. Crash-Zoom Portal / Bass Drop (Frames 152 - 180) */}
      <Sequence from={152} durationInFrames={28}>
        <Audio src={staticFile('audio/sfx/portal_zoom.mp3')} volume={0.75} />
      </Sequence>

      {/* =====================================================================
          DYNAMIC HYPERSPEED BACKGROUND (Frames 0 - 55)
         ===================================================================== */}
      {frame < 55 && (
        <HyperspeedWarpBackground
          speedMultiplier={interpolate(frame, [0, 30, 50], [1.6, 1.2, 0.4], {
            extrapolateRight: 'clamp',
          })}
          opacity={interpolate(frame, [42, 55], [0.85, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          })}
        />
      )}

      {/* =====================================================================
          PHA 1 & 2: KHỐI TRÒN LAO VÚT + COMET AERODYNAMIC MOTION TRAIL
         ===================================================================== */}
      {isOrbAlive && (
        <div
          style={{
            position: 'absolute',
            left: orbX + orbShake,
            top: orbY,
            transform: 'translate(-50%, -50%)',
            zIndex: 30,
            pointerEvents: 'none',
          }}
        >
          {/* 1. COMET MOTION TRAIL (Chỉ hiện khi đang bay lao tới: Frames 0 - 35) */}
          {frame < 35 && (
            <div
              style={{
                position: 'absolute',
                right: 60, // Kéo dài về phía sau (bên trái quả cầu)
                top: '50%',
                transform: 'translateY(-50%)',
                width: 550, // Chiều dài đuôi khí động học
                height: 120,
                background:
                  'linear-gradient(270deg, rgba(0, 229, 255, 0.85) 0%, rgba(56, 189, 248, 0.5) 30%, rgba(2, 132, 199, 0.2) 65%, transparent 100%)',
                borderRadius: '999px 0 0 999px',
                filter: 'blur(12px)',
                opacity: interpolate(frame, [0, 24, 35], [0.85, 0.85, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
              }}
            />
          )}

          {/* 2. GHOST ECHO ORBS (Bóng ma chuyển động mô phỏng dư ảnh) */}
          {frame < 32 && (
            <>
              <div
                style={{
                  position: 'absolute',
                  left: -80,
                  top: 10,
                  width: 130,
                  height: 130,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, transparent 70%)',
                  filter: 'blur(8px)',
                  opacity: interpolate(frame, [0, 22, 32], [0.8, 0.8, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: -160,
                  top: 25,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(2, 132, 199, 0.25) 0%, transparent 70%)',
                  filter: 'blur(14px)',
                  opacity: interpolate(frame, [0, 18, 30], [0.7, 0.7, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  }),
                }}
              />
            </>
          )}

          {/* 3. THE CORE ENERGY ORB */}
          <div
            style={{
              transform: `scale(${orbScale})`,
              transformOrigin: 'center center',
            }}
          >
            <div
              style={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #A5F3FC 35%, #0284C7 85%, #082F49 100%)',
                boxShadow: '0 0 70px rgba(0, 229, 255, 0.95), inset 0 0 35px rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2.5px solid rgba(255, 255, 255, 0.9)',
              }}
            >
              <span style={{ fontSize: 52, filter: 'drop-shadow(0 0 14px #00E5FF)' }}>💎</span>
            </div>
          </div>
        </div>
      )}

      {/* DETONATION FLASH */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, #FFFFFF 40%, #BAE6FD 85%, transparent 100%)',
          opacity: burstFlash,
          pointerEvents: 'none',
          zIndex: 45,
        }}
      />

      {/* =====================================================================
          PHA 3 & 4: 7 DỤNG CỤ BUNG TỪ TÂM TẠI FRAME 50 & HOÁN ĐỔI VỊ TRÍ,
          SAU ĐÓ HÚT XUYÊN TÂM VÀO QUẢ CẦU KIM CƯƠNG (FRAMES 135 - 155)
         ===================================================================== */}
      {isBurstTriggered && frame < 156 && (
        <div style={{ transform: `scale(${burstScale})`, transformOrigin: '960px 540px' }}>
          {/* 1. TEXTBOOK */}
          <OrbitalSwapWrapper from={pos1} to={P7_BR} arcHeight={80} startFrame={70} durationInFrames={45} tiltAngle={[-12, 14]}>
            <div style={getFunnelTransform(P7_BR)}>
              <ZeroGFloatWrapper amplitude={12 * (1 - absorbProgress)} phaseOffset={0}>
                <GearTextbook3D size={200} />
              </ZeroGFloatWrapper>
            </div>
          </OrbitalSwapWrapper>

          {/* 2. STYLUS PEN */}
          <OrbitalSwapWrapper from={pos2} to={P6_BL} arcHeight={-60} startFrame={70} durationInFrames={45} tiltAngle={[-40, 20]}>
            <div style={getFunnelTransform(P6_BL)}>
              <ZeroGFloatWrapper amplitude={14 * (1 - absorbProgress)} phaseOffset={1.0}>
                <GearStylusPen size={170} />
              </ZeroGFloatWrapper>
            </div>
          </OrbitalSwapWrapper>

          {/* 3. TRIANGLE RULER */}
          <OrbitalSwapWrapper from={pos3} to={P1_TL} arcHeight={70} startFrame={75} durationInFrames={40} tiltAngle={[10, -15]}>
            <div style={getFunnelTransform(P1_TL)}>
              <ZeroGFloatWrapper amplitude={10 * (1 - absorbProgress)} phaseOffset={2.0}>
                <GearTriangleRuler size={180} />
              </ZeroGFloatWrapper>
            </div>
          </OrbitalSwapWrapper>

          {/* 4. COMPASS GEOMETRY */}
          <OrbitalSwapWrapper from={pos4} to={P5_MR} arcHeight={-50} startFrame={75} durationInFrames={40} tiltAngle={[-15, 25]}>
            <div style={getFunnelTransform(P5_MR)}>
              <ZeroGFloatWrapper amplitude={12 * (1 - absorbProgress)} phaseOffset={3.0}>
                <GearCompassGeometry size={165} />
              </ZeroGFloatWrapper>
            </div>
          </OrbitalSwapWrapper>

          {/* 5. MAGNIFYING GLASS */}
          <OrbitalSwapWrapper from={pos5} to={P4_ML} arcHeight={50} startFrame={75} durationInFrames={40} tiltAngle={[15, -20]}>
            <div style={getFunnelTransform(P4_ML)}>
              <ZeroGFloatWrapper amplitude={11 * (1 - absorbProgress)} phaseOffset={4.0}>
                <GearMagnifyingGlass size={170} />
              </ZeroGFloatWrapper>
            </div>
          </OrbitalSwapWrapper>

          {/* 6. EXAM PAPER 100 */}
          <OrbitalSwapWrapper from={pos6} to={P3_TR} arcHeight={-75} startFrame={70} durationInFrames={45} tiltAngle={[-16, 12]}>
            <div style={getFunnelTransform(P3_TR)}>
              <ZeroGFloatWrapper amplitude={13 * (1 - absorbProgress)} phaseOffset={5.0}>
                <GearExamPaper100 size={190} />
              </ZeroGFloatWrapper>
            </div>
          </OrbitalSwapWrapper>

          {/* 7. SMART CALCULATOR */}
          <OrbitalSwapWrapper from={pos7} to={P2_TC} arcHeight={-80} startFrame={70} durationInFrames={45} tiltAngle={[12, -18]}>
            <div style={getFunnelTransform(P2_TC)}>
              <ZeroGFloatWrapper amplitude={14 * (1 - absorbProgress)} phaseOffset={6.0}>
                <GearSmartCalculator size={170} />
              </ZeroGFloatWrapper>
            </div>
          </OrbitalSwapWrapper>
        </div>
      )}

      {/* =====================================================================
          PHA 5: GIAO DIỆN TRỒI LÊN & THU GỌN MƯỢT MÀ KHÔNG BỊ NHÁY
         ===================================================================== */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          opacity: drawerOpacity,
          transform: `scale(${drawerScale})`,
          transformOrigin: '50% 80%',
          transition: 'none',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      >
        <BottomSheetDrawerReveal startFrame={105} targetHeight={520}>
          <div
            style={{
              width: 1140,
              height: '100%',
              margin: '0 auto',
              background: 'rgba(255, 255, 255, 0.94)',
              backdropFilter: 'blur(24px)',
              borderRadius: '40px 40px 0 0',
              border: '2px solid rgba(255, 255, 255, 0.95)',
              boxShadow: '0 -20px 60px rgba(2, 132, 199, 0.22)',
              padding: '24px 44px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ width: 68, height: 6, borderRadius: 3, background: '#CBD5E1', margin: '0 auto' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: 28, fontWeight: 900, color: '#0F172A' }}>오늘의 학원 퀘스트</span>
                <span style={{ fontSize: 16, color: '#0284C7', fontWeight: 700, marginLeft: 12 }}>● LIVE SYNC</span>
              </div>
              <div style={{ background: '#E0F2FE', padding: '6px 18px', borderRadius: 999, color: '#0284C7', fontWeight: 800 }}>
                +50,000 CARAT
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 8 }}>
              <MenuSlotSnapBounce snapFrame={115} staggerIndex={0}>
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 22,
                    padding: '20px 18px',
                    border: '1.5px solid #E0F2FE',
                    boxShadow: '0 8px 20px rgba(2, 132, 199, 0.08)',
                  }}
                >
                  <div style={{ fontSize: 13, color: '#64748B', fontWeight: 700 }}>수학 II 킬러 문항</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>+1,500 CARAT 즉시 적립</div>
                </div>
              </MenuSlotSnapBounce>

              <MenuSlotSnapBounce snapFrame={115} staggerIndex={1}>
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 22,
                    padding: '20px 18px',
                    border: '1.5px solid #E0F2FE',
                    boxShadow: '0 8px 20px rgba(2, 132, 199, 0.08)',
                  }}
                >
                  <div style={{ fontSize: 13, color: '#64748B', fontWeight: 700 }}>학원 자습 2시간</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>출석 체크 완료</div>
                </div>
              </MenuSlotSnapBounce>

              <MenuSlotSnapBounce snapFrame={115} staggerIndex={2}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, #0284C7 0%, #00E5FF 100%)',
                    borderRadius: 22,
                    padding: '20px 18px',
                    color: '#FFFFFF',
                    boxShadow: '0 8px 22px rgba(0, 229, 255, 0.35)',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9 }}>체크카드로 바로 쓰기</div>
                  <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>CU·GS25 1초 결제</div>
                </div>
              </MenuSlotSnapBounce>
            </div>
          </div>
        </BottomSheetDrawerReveal>
      </div>

      {/* =====================================================================
          PHA 5: QUẢ CẦU KIM CƯƠNG TÍCH TỤ HÀO QUANG & CRASH-ZOOM XUYÊN CAMERA
         ===================================================================== */}
      {frame >= 135 && (
        <div
          style={{
            position: 'absolute',
            left: CX,
            top: CY,
            transform: `translate(-50%, -50%) scale(${diamondOrbScale})`,
            opacity: diamondOrbOpacity,
            zIndex: 90,
            pointerEvents: 'none',
          }}
        >
          {/* Quả cầu kim cương phóng cực đại */}
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #A5F3FC 35%, #0284C7 85%, #082F49 100%)',
              boxShadow: `0 0 ${orbAuraGlow}px rgba(0, 229, 255, 0.95), 0 0 ${orbAuraGlow * 1.5}px rgba(2, 132, 199, 0.7), inset 0 0 35px rgba(255, 255, 255, 0.9)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2.5px solid rgba(255, 255, 255, 0.95)',
            }}
          >
            <span style={{ fontSize: 56, filter: 'drop-shadow(0 0 16px #00E5FF)' }}>💎</span>
          </div>
        </div>
      )}

      {/* FINAL EXIT FLASH */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#FFFFFF',
          opacity: finalExitFlash,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </div>
  );
};
