import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { Canvas } from '@react-three/fiber';
import {
  CrabitSmartphone3DMotionSchema,
  CrabitSmartphone3DMotionProps,
} from '../../schemas/ComponentSchema';

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

// PROCEDURAL CRABIT APP UI TEXTURE (720 x 1560)
function generateCrabitTexture(scrollY: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 1560;
  const ctx = canvas.getContext('2d')!;

  // App Background: Deep Midnight Navy
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 720, 1560);

  ctx.save();
  ctx.translate(0, -scrollY);

  // --- SCROLL FEED CONTENT ---
  // Hagwon Director Mission Banner
  ctx.fillStyle = '#1E293B';
  ctx.beginPath();
  ctx.roundRect(40, 240, 640, 240, 20);
  ctx.fill();
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#00E5FF';
  ctx.font = 'bold 26px "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('HAGWON DIRECTOR MISSION', 70, 290);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';
  ctx.fillText('수능 수학 킬러 문항 22번 정복', 70, 350);

  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 26px "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';
  ctx.fillText('미션 보상: +5,000 Carat', 70, 415);

  // Task Cards List (Authentic Hagwon Study Quests)
  const taskList = [
    { title: '11월 모의고사 오답노트 제출', tag: '완료', reward: '+1,000 C', bar: '#10B981' },
    { title: '심야 자율학습 출석 체크', tag: '100% 출석', reward: '+500 C', bar: '#00E5FF' },
    { title: '미적분 공식 30제 스피드 퀴즈', tag: '진행 중', reward: '+1,500 C', bar: '#F59E0B' },
    { title: '공간도형 심화 과제 제출', tag: '제출 대기', reward: '+800 C', bar: '#6366F1' },
    { title: '킬러 문항 오답 분석 AI 코칭', tag: 'AI 피드백', reward: '+1,200 C', bar: '#EC4899' },
    { title: '수능 D-7 최종 실전 모의고사', tag: '실전 모의', reward: '+3,000 C', bar: '#00E5FF' },
    { title: '수학 1 등급 완성 집중 클리닉', tag: 'VIP 코칭', reward: '+2,000 C', bar: '#10B981' },
  ];

  let y = 520;
  for (let cycle = 0; cycle < 3; cycle++) {
    for (const item of taskList) {
      ctx.fillStyle = '#1E293B';
      ctx.beginPath();
      ctx.roundRect(40, y, 640, 160, 16);
      ctx.fill();

      // Category color stripe
      ctx.fillStyle = item.bar;
      ctx.fillRect(40, y, 12, 160);

      // Task Title
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 28px "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.title, 75, y + 55);

      // Status Tag
      ctx.fillStyle = item.bar;
      ctx.font = 'bold 22px "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';
      ctx.fillText(item.tag, 75, y + 115);

      // Carat Reward
      ctx.fillStyle = '#00E5FF';
      ctx.font = 'bold 26px "Apple SD Gothic Neo", "Noto Sans KR", monospace, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(item.reward, 640, y + 115);

      y += 185;
    }
  }

  ctx.restore();

  // --- STICKY TOP HEADER ---
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.fillRect(0, 0, 720, 210);
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 210);
  ctx.lineTo(720, 210);
  ctx.stroke();

  // Status Bar
  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText('22:45  •  SKT 5G  •  98%', 50, 60);

  // Student Profile
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';
  ctx.fillText('김민준 (Kim Min-jun)', 50, 125);
  ctx.fillStyle = '#64748B';
  ctx.font = '22px "Apple SD Gothic Neo", "Noto Sans KR", system-ui, sans-serif';
  ctx.fillText('연속 7일 미션 달성 중 🔥', 50, 170);

  // Carat Wallet Pill
  ctx.fillStyle = '#0369A1';
  ctx.beginPath();
  ctx.roundRect(430, 95, 250, 80, 24);
  ctx.fill();
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#00E5FF';
  ctx.font = 'bold 26px "Apple SD Gothic Neo", "Noto Sans KR", monospace, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('◆ 12,500 C', 555, 137);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

// PROCEDURAL BIONIC PCB CIRCUIT TEXTURE (512 x 1024)
function generateBionicPCBTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#050B16';
  ctx.fillRect(0, 0, 512, 1024);

  // Circuit traces
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
  ctx.lineWidth = 2;
  for (let i = 40; i < 480; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 60);
    ctx.lineTo(i, 960);
    ctx.stroke();
  }
  for (let j = 80; j < 960; j += 48) {
    ctx.beginPath();
    ctx.moveTo(40, j);
    ctx.lineTo(472, j);
    ctx.stroke();
  }

  // Neural Co-Engine Core Die
  ctx.fillStyle = '#0F172A';
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(136, 360, 240, 240, 16);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#00E5FF';
  ctx.font = 'bold 26px monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CRABIT 4nm', 256, 460);
  ctx.fillStyle = '#38BDF8';
  ctx.font = 'bold 20px monospace';
  ctx.fillText('NEURAL CO-ENGINE', 256, 500);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

// PROCEDURAL 3D LASER TELEMETRY CALLOUT HUD TEXTURE
function generateTelemetryCalloutTexture(label: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 120;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, 640, 120);

  // Sleek dark glass HUD pill
  ctx.fillStyle = 'rgba(11, 19, 43, 0.9)';
  ctx.beginPath();
  ctx.roundRect(8, 12, 624, 96, 14);
  ctx.fill();

  // Neon Cyan border
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Left accent bar
  ctx.fillStyle = '#00E5FF';
  ctx.fillRect(22, 30, 8, 60);

  // Telemetry text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 25px "SF Mono", "JetBrains Mono", Menlo, monospace';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 46, 62);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
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

  // Dynamic dispersion amount (interpolated over frames 20-50 when not explicitly overridden)
  const timelineDispersion = interpolate(
    frame,
    [20, 35, 50],
    [0, 0.35, 0],
    {
      easing: Easing.bezier(0.2, 0.8, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );
  const dispersionAmount =
    propDispersionAmount !== undefined ? propDispersionAmount : timelineDispersion;

  // Calculate safe travel range (accounting for half the laser strip's height)
  const bodyHeight = 4.6;
  const laserStripHeight = 0.6;
  const maxLaserY = bodyHeight / 2 - laserStripHeight / 2 - 0.05; // ~1.95
  const minLaserY = -(bodyHeight / 2) + laserStripHeight / 2 + 0.05; // ~ -1.95

  const laserY = interpolate(
    frame % 75,
    [0, 74],
    [minLaserY, maxLaserY],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Fade out smoothly near the top and bottom edges so it never abruptly clips
  const laserOpacity = interpolate(
    laserY,
    [minLaserY, minLaserY + 0.4, maxLaserY - 0.4, maxLaserY],
    [0, 0.45, 0.45, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Smooth App UI Scroll
  const scrollY = interpolate(frame, [0, 119], [0, 1200], {
    easing: Easing.bezier(0.2, 0.8, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const screenTex = useMemo(() => generateCrabitTexture(scrollY), [scrollY]);
  const pcbTex = useMemo(() => generateBionicPCBTexture(), []);

  // Telemetry HUD Callout Textures
  const nodeATex = useMemo(
    () => generateTelemetryCalloutTexture('DISPLAY // 9:19.5 OLED 120Hz'),
    []
  );
  const nodeBTex = useMemo(
    () => generateTelemetryCalloutTexture('PROCESSOR // 4nm NEURAL CO-ENGINE'),
    []
  );
  const nodeCTex = useMemo(
    () => generateTelemetryCalloutTexture('STATUS // REAL-TIME CSAT SYNC'),
    []
  );

  // Geometries & Materials
  const chassisGeo = useMemo(() => new THREE.BoxGeometry(2.2, 4.6, 0.24), []);
  const chassisEdgesGeo = useMemo(() => new THREE.EdgesGeometry(chassisGeo), [chassisGeo]);

  const oledGlassGeo = useMemo(() => new THREE.BoxGeometry(2.14, 4.54, 0.01), []);
  const oledEdgesGeo = useMemo(() => new THREE.EdgesGeometry(oledGlassGeo), [oledGlassGeo]);

  const pcbGeo = useMemo(() => new THREE.BoxGeometry(1.9, 4.2, 0.02), []);
  const pcbEdgesGeo = useMemo(() => new THREE.EdgesGeometry(pcbGeo), [pcbGeo]);

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

  const pcbMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: pcbTex,
        metalness: 0.7,
        roughness: 0.3,
      }),
    [pcbTex]
  );

  const cyanLineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#00E5FF', linewidth: 2 }),
    []
  );

  const leaderLineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#00E5FF', linewidth: 1 }),
    []
  );

  // 1px #00E5FF Leader Line Geometries connecting Telemetry Nodes to Chassis
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

  // Lens positions for Layer 3 Triple Camera Island
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
        gl={{ alpha: true, antialias: true }}
      >
        {/* Upgraded Clean Studio Lighting for K-Fintech Polish */}
        <ambientLight intensity={2.4} color="#F8FAFC" />
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
          {/* Right: Power Button */}
          <mesh position={[1.12, 0.5, 0]}>
            <boxGeometry args={[0.04, 0.5, 0.08]} />
            <meshStandardMaterial color="#38BDF8" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Left: Volume Up */}
          <mesh position={[-1.12, 0.8, 0]}>
            <boxGeometry args={[0.04, 0.35, 0.08]} />
            <meshStandardMaterial color="#38BDF8" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Left: Volume Down */}
          <mesh position={[-1.12, 0.3, 0]}>
            <boxGeometry args={[0.04, 0.35, 0.08]} />
            <meshStandardMaterial color="#38BDF8" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* ============================================================
              LAYER 2: OLED DISPLAY GLASS & FRONT CAMERA
             ============================================================ */}
          <mesh
            position={[0, 0, 0.122 + dispersionAmount * 0.4]}
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
            position={[0, 0, 0.122 + dispersionAmount * 0.4]}
            geometry={oledEdgesGeo}
            material={leaderLineMat}
          />

          {/* Dynamic Island Punch-Hole */}
          <mesh position={[0, 2.12, 0.128 + dispersionAmount * 0.4]}>
            <boxGeometry args={[0.48, 0.08, 0.015]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>

          {/* ============================================================
              LAYER 3: AEROSPACE TRIPLE CAMERA ISLAND (REAR)
             ============================================================ */}
          <group position={[-0.55, 1.45, -0.125 - dispersionAmount * 0.35]}>
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
                {/* Inner Glowing Cyan Ring */}
                <mesh position={[0, 0, -0.022]} rotation={[0, Math.PI, 0]}>
                  <ringGeometry args={[0.11, 0.155, 32]} />
                  <meshBasicMaterial color="#00E5FF" side={THREE.DoubleSide} />
                </mesh>
                {/* Sapphire Optical Core */}
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
              LAYER 4: INTERNAL BIONIC CIRCUIT & DISPERSION
             ============================================================ */}
          {dispersionAmount > 0 && (
            <group position={[0, 0, 0.121 + dispersionAmount * 0.2]}>
              <mesh geometry={pcbGeo} material={pcbMat} />
              <lineSegments geometry={pcbEdgesGeo} material={cyanLineMat} />
            </group>
          )}

          {/* ============================================================
              LAYER 5: 3D LASER TELEMETRY NODES (CALLOUTS)
             ============================================================ */}
          {/* Leader Lines & Chassis Pin Dots */}
          <lineSegments geometry={leaderLineAGeo} material={leaderLineMat} />
          <mesh position={[1.1, 1.55, 0.12]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>

          <lineSegments geometry={leaderLineBGeo} material={leaderLineMat} />
          <mesh position={[-1.1, 0.0, 0.0]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>

          <lineSegments geometry={leaderLineCGeo} material={leaderLineMat} />
          <mesh position={[1.1, -1.35, 0.12]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>

          {/* Node A (Top-Right): DISPLAY // 9:19.5 OLED 120Hz */}
          <group position={[1.4, 1.8, 0.2]}>
            <mesh>
              <sphereGeometry args={[0.03, 12, 12]} />
              <meshBasicMaterial color="#00E5FF" />
            </mesh>
            <mesh position={[0.78, 0, 0]}>
              <planeGeometry args={[1.55, 0.29]} />
              <meshBasicMaterial
                map={nodeATex}
                transparent
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* Node B (Left-Middle): PROCESSOR // 4nm NEURAL CO-ENGINE */}
          <group position={[-1.4, 0.0, 0]}>
            <mesh>
              <sphereGeometry args={[0.03, 12, 12]} />
              <meshBasicMaterial color="#00E5FF" />
            </mesh>
            <mesh position={[-0.78, 0, 0]}>
              <planeGeometry args={[1.55, 0.29]} />
              <meshBasicMaterial
                map={nodeBTex}
                transparent
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          {/* Node C (Bottom-Right): STATUS // REAL-TIME CSAT SYNC */}
          <group position={[1.4, -1.6, 0.2]}>
            <mesh>
              <sphereGeometry args={[0.03, 12, 12]} />
              <meshBasicMaterial color="#00E5FF" />
            </mesh>
            <mesh position={[0.78, 0, 0]}>
              <planeGeometry args={[1.55, 0.29]} />
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
