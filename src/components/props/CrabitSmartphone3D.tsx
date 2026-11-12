import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { Canvas } from '@react-three/fiber';
import {
  CrabitSmartphone3DMotionSchema,
  CrabitSmartphone3DMotionProps,
} from '../../schemas/ComponentSchema';
import { CrabitAppScreenUI } from '../ui/CrabitAppScreenUI';

export { CrabitAppScreenUI };
export const CrabitPhoneScreenDisplay = CrabitAppScreenUI;

export interface CrabitSmartphone3DProps {
  config?: Partial<CrabitSmartphone3DMotionProps>;
  frame?: number;
  motionConfig?: Partial<CrabitSmartphone3DMotionProps>;
  primaryColor?: string;
  accentColor?: string;
  scale?: number;
  rotateXDeg?: number;
  rotateYDeg?: number;
  dispersionAmount?: number;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

// =========================================================================
// PROCEDURAL MASTER UNIFIED CRABIT APP SCREEN TEXTURE (720 x 1560)
// Extracted 1:1 directly from the verified Scene 2 Master Visual
// =========================================================================
function generateCrabitUnifiedTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 1560;
  const ctx = canvas.getContext('2d')!;

  // 1. Root Screen Background: #F8FAFC
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, 720, 1560);

  // =========================================================================
  // 1. TOP STATUS BAR (09:41, Battery, Cellular)
  // =========================================================================
  ctx.fillStyle = '#0F172A';
  ctx.font = '700 32px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('09:41', 48, 62);

  // Battery Outline + Terminal
  ctx.strokeStyle = '#0F172A';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(618, 50, 42, 24, 6);
  ctx.stroke();

  // Battery Level Fill (100%)
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.roundRect(622, 54, 30, 16, 4);
  ctx.fill();

  // Battery Terminal Nib
  ctx.fillRect(661, 57, 3, 10);

  // Cellular Dots ••
  ctx.font = '700 24px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('••', 606, 62);

  // =========================================================================
  // 2. BRAND LOGO HEADER (Cyan Gemstone + Crabit + KOREA Badge + Avatar)
  // =========================================================================
  const headerY = 135;

  // Cyan Gemstone Logo Mark (Scale 32px -> 56px)
  ctx.save();
  ctx.translate(48, headerY - 28);
  const sGem = 56 / 32;
  ctx.scale(sGem, sGem);

  // Outer Gemstone Polygon: points="16,2 30,12 25,29 7,29 2,12"
  ctx.fillStyle = '#00E5FF';
  ctx.beginPath();
  ctx.moveTo(16, 2);
  ctx.lineTo(30, 12);
  ctx.lineTo(25, 29);
  ctx.lineTo(7, 29);
  ctx.lineTo(2, 12);
  ctx.closePath();
  ctx.fill();

  // Facet Highlights: points="16,6 26,14 22,26 10,26 6,14"
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.beginPath();
  ctx.moveTo(16, 6);
  ctx.lineTo(26, 14);
  ctx.lineTo(22, 26);
  ctx.lineTo(10, 26);
  ctx.lineTo(6, 14);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Brand Name: Crabit (#FF5252, 900)
  ctx.fillStyle = '#FF5252';
  ctx.font = '900 46px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('Crabit', 120, headerY);

  // Country Badge: KOREA
  const badgeX = 268;
  const badgeY = headerY - 16;
  const badgeW = 76;
  const badgeH = 30;
  ctx.fillStyle = '#FF5252';
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 6);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 18px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('KOREA', badgeX + badgeW / 2, badgeY + badgeH / 2 + 1);

  // User Avatar Circle
  const avatarX = 646;
  const avatarY = headerY;
  ctx.fillStyle = '#F1F5F9';
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#CBD5E1';
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, 10, 0, Math.PI * 2);
  ctx.fill();

  // =========================================================================
  // 3. HERO SCHOLARSHIP BALANCE CARD (50,000 Carats)
  // Background: linear-gradient(145deg, #1E293B 0%, #0F172A 100%)
  // =========================================================================
  const heroX = 40;
  const heroY = 200;
  const heroW = 640;
  const heroH = 330;
  const heroR = 36;

  ctx.save();
  ctx.shadowColor = 'rgba(15, 23, 42, 0.28)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 18;

  const heroGrad = ctx.createLinearGradient(heroX, heroY, heroX + heroW, heroY + heroH);
  heroGrad.addColorStop(0, '#1E293B');
  heroGrad.addColorStop(1, '#0F172A');
  ctx.fillStyle = heroGrad;
  ctx.beginPath();
  ctx.roundRect(heroX, heroY, heroW, heroH, heroR);
  ctx.fill();
  ctx.restore();

  // Subtitle: MY SCHOLARSHIP BALANCE
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 22px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('MY SCHOLARSHIP BALANCE', heroX + 34, heroY + 48);

  // Diamond 3D Squircle Icon
  const diaBoxX = heroX + 34;
  const diaBoxY = heroY + 95;
  const diaBoxSize = 82;
  const diaBoxR = 24;

  ctx.save();
  ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 6;
  const diaGrad = ctx.createLinearGradient(diaBoxX, diaBoxY, diaBoxX + diaBoxSize, diaBoxY + diaBoxSize);
  diaGrad.addColorStop(0, '#E0F2FE');
  diaGrad.addColorStop(1, '#38BDF8');
  ctx.fillStyle = diaGrad;
  ctx.beginPath();
  ctx.roundRect(diaBoxX, diaBoxY, diaBoxSize, diaBoxSize, diaBoxR);
  ctx.fill();
  ctx.restore();

  // Diamond Emoji 💎
  ctx.font = '40px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('💎', diaBoxX + diaBoxSize / 2, diaBoxY + diaBoxSize / 2 + 2);

  // 50,000 Carats Text
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 60px "Pretendard", -apple-system, sans-serif';
  ctx.fillText('50,000', heroX + 134, heroY + 138);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 42px "Pretendard", -apple-system, sans-serif';
  ctx.fillText('Carats', heroX + 344, heroY + 138);

  // Currency Conversion Pill: 장학금 환산 가치 ₩ 50,000 KRW
  const convX = heroX + 34;
  const convY = heroY + 215;
  const convW = heroW - 68;
  const convH = 75;
  const convR = 20;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(convX, convY, convW, convH, convR);
  ctx.fill();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 24px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('장학금 환산 가치', convX + 24, convY + convH / 2);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 28px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('₩ 50,000 KRW', convX + convW - 24, convY + convH / 2);

  // =========================================================================
  // 4. TODAY'S COMPLETED MISSION CARD (오늘의 미션 완료!)
  // =========================================================================
  const card1X = 40;
  const card1Y = 560;
  const card1W = 640;
  const card1H = 265;
  const card1R = 34;

  ctx.save();
  ctx.shadowColor = 'rgba(0, 229, 255, 0.16)';
  ctx.shadowBlur = 36;
  ctx.shadowOffsetY = 12;
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(card1X, card1Y, card1W, card1H, card1R);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(card1X, card1Y, card1W, card1H, card1R);
  ctx.stroke();

  // Green Checkmark Badge ✓
  const checkX = card1X + 32;
  const checkY = card1Y + 36;
  const checkSize = 54;
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(checkX + checkSize / 2, checkY + checkSize / 2, checkSize / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 30px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('✓', checkX + checkSize / 2, checkY + checkSize / 2 + 1);

  // Mission Title
  ctx.fillStyle = '#0F172A';
  ctx.font = '800 30px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('오늘의 미션 완료!', card1X + 104, card1Y + 48);

  // Mission Subtitle
  ctx.fillStyle = '#64748B';
  ctx.font = '500 22px "Pretendard", -apple-system, sans-serif';
  ctx.fillText('수학 집중 모드 30분 달성', card1X + 104, card1Y + 86);

  // Reward Badge: +500 C
  const rewW = 120;
  const rewH = 48;
  const rewX = card1X + card1W - rewW - 32;
  const rewY = card1Y + 40;
  ctx.fillStyle = '#E0F2FE';
  ctx.beginPath();
  ctx.roundRect(rewX, rewY, rewW, rewH, 14);
  ctx.fill();

  ctx.fillStyle = '#0284C7';
  ctx.font = '800 24px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('+500 C', rewX + rewW / 2, rewY + rewH / 2);

  // Achievement Row: 목표 달성률 100% 완료
  ctx.fillStyle = '#64748B';
  ctx.font = '700 22px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('목표 달성률', card1X + 32, card1Y + 160);

  ctx.fillStyle = '#0284C7';
  ctx.textAlign = 'right';
  ctx.fillText('100% 완료', card1X + card1W - 32, card1Y + 160);

  // 100% Cyan Progress Bar
  const barX = card1X + 32;
  const barY = card1Y + 192;
  const barW = card1W - 64;
  const barH = 14;
  ctx.fillStyle = '#E2E8F0';
  ctx.beginPath();
  ctx.roundRect(barX, barY, barW, barH, 999);
  ctx.fill();

  ctx.fillStyle = '#00E5FF';
  ctx.beginPath();
  ctx.roundRect(barX, barY, barW, barH, 999);
  ctx.fill();

  // =========================================================================
  // 5. TEACHER AUTHENTICATION CARD (원장 선생님 인증 완료)
  // =========================================================================
  const card2X = 40;
  const card2Y = 855;
  const card2W = 640;
  const card2H = 150;
  const card2R = 28;

  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.roundRect(card2X, card2Y, card2W, card2H, card2R);
  ctx.fill();

  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.roundRect(card2X, card2Y, card2W, card2H, card2R);
  ctx.stroke();

  // Teacher Icon Circle 👨‍🏫
  const teachX = card2X + 30;
  const teachY = card2Y + (card2H - 64) / 2;
  const teachSize = 64;
  ctx.fillStyle = '#F1F5F9';
  ctx.beginPath();
  ctx.arc(teachX + teachSize / 2, teachY + teachSize / 2, teachSize / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = '32px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('👨‍🏫', teachX + teachSize / 2, teachY + teachSize / 2 + 2);

  // Teacher Title & Approval
  ctx.fillStyle = '#0F172A';
  ctx.font = '800 26px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('원장 선생님 인증 완료', card2X + 116, card2Y + 54);

  // Live Carat Approval Green Bullet
  ctx.fillStyle = '#10B981';
  ctx.font = '600 21px "Pretendard", -apple-system, sans-serif';
  ctx.fillText('● 실시간 캐럿 보상 지급 승인됨', card2X + 116, card2Y + 98);

  // Home Indicator Bar at Screen Bottom
  ctx.fillStyle = '#CBD5E1';
  ctx.beginPath();
  ctx.roundRect(260, 1520, 200, 8, 4);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

// =========================================================================
// PROCEDURAL PASTEL GLASSMORPHISM TELEMETRY CALLOUT BADGE TEXTURE
// Soft translucent K-Fintech pill badges with clean typography
// =========================================================================
function generateTelemetryCalloutTexture(label: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 140;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 720, 140);

  const padX = 14;
  const padY = 12;
  const w = 720 - padX * 2;
  const h = 140 - padY * 2;
  const r = 48;

  // Soft K-Fintech drop shadow
  ctx.save();
  ctx.shadowColor = 'rgba(2, 132, 199, 0.16)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;

  // Translucent pastel glass fill (rgba(255, 255, 255, 0.85))
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.beginPath();
  ctx.roundRect(padX, padY, w, h, r);
  ctx.fill();
  ctx.restore();

  // Glassmorphic border (rgba(2, 132, 199, 0.35))
  ctx.strokeStyle = 'rgba(2, 132, 199, 0.35)';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.roundRect(padX, padY, w, h, r);
  ctx.stroke();

  // Badge Text
  ctx.fillStyle = '#0F172A';
  ctx.font = '800 34px "Pretendard", -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 720 / 2, 140 / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export const CrabitSmartphone3D: React.FC<CrabitSmartphone3DProps> = ({
  config: rawConfig,
  dispersionAmount: propDispersionAmount,
}) => {
  const frame = useCurrentFrame();
  const groupRef = useRef<THREE.Group>(null);

  // Validate config with Schema Gatekeeper while enforcing mathematical invariants
  useMemo(() => {
    CrabitSmartphone3DMotionSchema.safeParse(rawConfig ?? {});
  }, [rawConfig]);

  // 1. Mathematical Invariants (Strict 28° Isometric Pitch & Safe Bounded Y Oscillation)
  const rotX = 0.488; // Strict 28° isometric pitch (>= 0.35 rad)
  const rotZ = 0.06;
  const rotY = interpolate(
    frame,
    [0, 60, 119],
    [-0.42, -0.25, -0.35],
    {
      easing: Easing.bezier(0.2, 0.8, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Harmonic vertical float locked at X = 0
  const floatY = Math.sin(frame / 16) * 0.035;

  // Dispersion clamped safely (No internal dark diagnostic screen)
  const dispersionAmount = propDispersionAmount !== undefined ? propDispersionAmount : 0;

  // Laser reflection sweep running along the chamfered metallic edges
  const bodyHeight = 4.6;
  const laserStripHeight = 0.6;
  const maxLaserY = bodyHeight / 2 - laserStripHeight / 2 - 0.05;
  const minLaserY = -(bodyHeight / 2) + laserStripHeight / 2 + 0.05;

  const laserY = interpolate(
    frame % 75,
    [0, 74],
    [minLaserY, maxLaserY],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const laserOpacity = interpolate(
    laserY,
    [minLaserY, minLaserY + 0.4, maxLaserY - 0.4, maxLaserY],
    [0, 0.45, 0.45, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Master Unified Screen Texture (Exact Scene 2 Master Visual)
  const screenTex = useMemo(() => generateCrabitUnifiedTexture(), []);

  // 3 Floating Pastel Glassmorphism HUD Callout Textures
  const nodeATex = useMemo(
    () => generateTelemetryCalloutTexture('⚡ 실시간 동기화 // Hagwon Live Sync'),
    []
  );
  const nodeBTex = useMemo(
    () => generateTelemetryCalloutTexture('💎 캐럿 장학금 엔진 // Carat Engine'),
    []
  );
  const nodeCTex = useMemo(
    () => generateTelemetryCalloutTexture('📱 스마트 체크카드 연동 // K-Fintech Card'),
    []
  );

  // Geometries & Materials
  const chassisGeo = useMemo(() => new THREE.BoxGeometry(2.2, 4.6, 0.24), []);
  const chassisEdgesGeo = useMemo(() => new THREE.EdgesGeometry(chassisGeo), [chassisGeo]);

  const oledGlassGeo = useMemo(() => new THREE.BoxGeometry(2.14, 4.54, 0.01), []);
  const oledEdgesGeo = useMemo(() => new THREE.EdgesGeometry(oledGlassGeo), [oledGlassGeo]);

  const cameraBumpGeo = useMemo(() => new THREE.BoxGeometry(0.85, 1.15, 0.05), []);
  const cameraBumpEdgesGeo = useMemo(
    () => new THREE.EdgesGeometry(cameraBumpGeo),
    [cameraBumpGeo]
  );

  const chassisMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#1E293B',
        metalness: 0.85,
        roughness: 0.25,
      }),
    []
  );

  const screenMat = useMemo(
    () => new THREE.MeshBasicMaterial({ map: screenTex }),
    [screenTex]
  );

  const cyanLineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#00E5FF', linewidth: 2 }),
    []
  );

  const leaderLineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#38BDF8', linewidth: 1.5, transparent: true, opacity: 0.8 }),
    []
  );

  // Leader Line Geometries connecting Telemetry Nodes to Chassis
  const leaderLineAGeo = useMemo(() => {
    const pts = [
      new THREE.Vector3(1.1, 1.55, 0.12),
      new THREE.Vector3(1.4, 1.8, 0.2),
    ];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  const leaderLineBGeo = useMemo(() => {
    const pts = [
      new THREE.Vector3(-1.1, 0.0, 0.0),
      new THREE.Vector3(-1.4, 0.0, 0.0),
    ];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  const leaderLineCGeo = useMemo(() => {
    const pts = [
      new THREE.Vector3(1.1, -1.35, 0.12),
      new THREE.Vector3(1.4, -1.6, 0.2),
    ];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  // Lens positions for Triple Camera Island
  const lensPositions: [number, number, number][] = [
    [-0.22, 0.28, -0.03],
    [-0.22, -0.28, -0.03],
    [0.22, 0.0, -0.03],
  ];

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: 1920,
        height: 1080,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 40 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      >
        {/* Upgraded Clean Studio Lighting for K-Fintech Polish */}
        <ambientLight intensity={2.6} color="#F8FAFC" />
        <directionalLight position={[3, 5, 4]} intensity={2.8} color="#FFFFFF" />
        <directionalLight position={[-4, -2, 3]} intensity={1.4} color="#38BDF8" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#E0F2FE" />

        {/* Strictly anchored at X = 0 with scale = 0.62 */}
        <group
          ref={groupRef}
          position={[0, floatY, 0]}
          rotation={[rotX, rotY, rotZ]}
          scale={0.62}
        >
          {/* ============================================================
              LAYER 1: TITANIUM UNIBODY MIDFRAME & CHASSIS
             ============================================================ */}
          <mesh geometry={chassisGeo} material={chassisMat} />
          <lineSegments geometry={chassisEdgesGeo} material={cyanLineMat} />

          {/* Laser Reflection Sweep sliding along the chamfered edge */}
          <mesh position={[-1.11, laserY, 0.125]}>
            <planeGeometry args={[0.03, laserStripHeight]} />
            <meshBasicMaterial
              color="#38BDF8"
              transparent
              opacity={laserOpacity}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[1.11, -laserY, 0.125]}>
            <planeGeometry args={[0.03, laserStripHeight]} />
            <meshBasicMaterial
              color="#38BDF8"
              transparent
              opacity={laserOpacity}
              depthWrite={false}
            />
          </mesh>

          {/* Side Hardware Buttons */}
          <mesh position={[1.12, 0.5, 0]}>
            <boxGeometry args={[0.04, 0.5, 0.08]} />
            <meshStandardMaterial color="#38BDF8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-1.12, 0.8, 0]}>
            <boxGeometry args={[0.04, 0.35, 0.08]} />
            <meshStandardMaterial color="#38BDF8" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[-1.12, 0.3, 0]}>
            <boxGeometry args={[0.04, 0.35, 0.08]} />
            <meshStandardMaterial color="#38BDF8" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* ============================================================
              LAYER 2: MASTER UNIFIED OLED DISPLAY GLASS & FRONT CAMERA
             ============================================================ */}
          <mesh
            position={[0, 0, 0.122 + dispersionAmount * 0.15]}
            geometry={oledGlassGeo}
          >
            <primitive object={chassisMat} attach="material-0" />
            <primitive object={chassisMat} attach="material-1" />
            <primitive object={chassisMat} attach="material-2" />
            <primitive object={chassisMat} attach="material-3" />
            <primitive object={screenMat} attach="material-4" />
            <primitive object={chassisMat} attach="material-5" />
          </mesh>
          <lineSegments
            position={[0, 0, 0.122 + dispersionAmount * 0.15]}
            geometry={oledEdgesGeo}
            material={leaderLineMat}
          />

          {/* Dynamic Island Punch-Hole */}
          <mesh position={[0, 2.12, 0.128 + dispersionAmount * 0.15]}>
            <boxGeometry args={[0.48, 0.08, 0.015]} />
            <meshBasicMaterial color="#0F172A" />
          </mesh>

          {/* ============================================================
              LAYER 3: AEROSPACE TRIPLE CAMERA ISLAND (REAR)
             ============================================================ */}
          <group position={[-0.55, 1.45, -0.125 - dispersionAmount * 0.15]}>
            {/* Camera Base Bump */}
            <mesh geometry={cameraBumpGeo}>
              <meshStandardMaterial color="#0B132B" metalness={0.9} roughness={0.25} />
            </mesh>
            <lineSegments geometry={cameraBumpEdgesGeo} material={leaderLineMat} />

            {/* 3 Precision Lens Rings (Sapphire Glass Meshes) */}
            {lensPositions.map((pos, idx) => (
              <group key={idx} position={pos}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.16, 0.16, 0.04, 32]} />
                  <meshStandardMaterial color="#1E293B" metalness={0.95} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0, -0.022]} rotation={[0, Math.PI, 0]}>
                  <ringGeometry args={[0.11, 0.155, 32]} />
                  <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0, 0, -0.021]} rotation={[0, Math.PI, 0]}>
                  <circleGeometry args={[0.105, 24]} />
                  <meshBasicMaterial color="#020617" side={THREE.DoubleSide} />
                </mesh>
              </group>
            ))}

            {/* Laser LiDAR & Optical Flash */}
            <mesh position={[0.22, 0.35, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.065, 0.065, 0.03, 24]} />
              <meshBasicMaterial color="#38BDF8" />
            </mesh>
          </group>

          {/* ============================================================
              LAYER 4: 3D PASTEL GLASSMORPHISM TELEMETRY CALLOUT BADGES
             ============================================================ */}
          {/* Leader Lines & Chassis Pin Dots */}
          <lineSegments geometry={leaderLineAGeo} material={leaderLineMat} />
          <mesh position={[1.1, 1.55, 0.12]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#0284C7" />
          </mesh>

          <lineSegments geometry={leaderLineBGeo} material={leaderLineMat} />
          <mesh position={[-1.1, 0.0, 0.0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#0284C7" />
          </mesh>

          <lineSegments geometry={leaderLineCGeo} material={leaderLineMat} />
          <mesh position={[1.1, -1.35, 0.12]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#0284C7" />
          </mesh>

          {/* Tag 1 (Top-Right): ⚡ 실시간 동기화 // Hagwon Live Sync */}
          <group position={[1.4, 1.8, 0.2]}>
            <mesh>
              <sphereGeometry args={[0.03, 12, 12]} />
              <meshBasicMaterial color="#0284C7" />
            </mesh>
            <mesh position={[0.92, 0, 0]}>
              <planeGeometry args={[1.84, 0.36]} />
              <meshBasicMaterial
                map={nodeATex}
                transparent
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* Tag 2 (Left-Middle): 💎 캐럿 장학금 엔진 // Carat Engine */}
          <group position={[-1.4, 0.0, 0]}>
            <mesh>
              <sphereGeometry args={[0.03, 12, 12]} />
              <meshBasicMaterial color="#0284C7" />
            </mesh>
            <mesh position={[-0.92, 0, 0]}>
              <planeGeometry args={[1.84, 0.36]} />
              <meshBasicMaterial
                map={nodeBTex}
                transparent
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* Tag 3 (Bottom-Right): 📱 스마트 체크카드 연동 // K-Fintech Card */}
          <group position={[1.4, -1.6, 0.2]}>
            <mesh>
              <sphereGeometry args={[0.03, 12, 12]} />
              <meshBasicMaterial color="#0284C7" />
            </mesh>
            <mesh position={[0.92, 0, 0]}>
              <planeGeometry args={[1.84, 0.36]} />
              <meshBasicMaterial
                map={nodeCTex}
                transparent
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </group>
      </Canvas>
    </div>
  );
};

export default CrabitSmartphone3D;
