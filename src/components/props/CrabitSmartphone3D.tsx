import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { Canvas } from '@react-three/fiber';

export interface CrabitSmartphone3DProps {
  config?: Record<string, unknown>;
  frame?: number;
  motionConfig?: Record<string, unknown>;
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

export const CrabitSmartphone3D: React.FC<CrabitSmartphone3DProps> = () => {
  const frame = useCurrentFrame();
  const groupRef = useRef<THREE.Group>(null);

  // Kích thước chuẩn có độ dày thực tế
  const bodyWidth = 2.2;
  const bodyHeight = 4.6;
  const bodyThickness = 0.24;

  // 1. Safe Bounded Rotations (Chống sập 2D)
  const rotXBase = 0.36; // Góc nghiêng Isometric chuẩn 20.5 độ
  const rotZBase = 0.04;
  const rotY = interpolate(
    frame,
    [0, 60, 119],
    [-0.48, -0.28, -0.42],
    {
      easing: Easing.bezier(0.2, 0.8, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // 2. Nhịp thở không gian điều hòa tại tâm X = 0
  const floatY = Math.sin(frame / 16) * 0.035;

  // Cuộn dữ liệu màn hình mượt mà
  const scrollY = interpolate(frame, [0, 119], [0, 1200], {
    easing: Easing.bezier(0.2, 0.8, 0.3, 1),
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const screenTex = useMemo(() => generateCrabitTexture(scrollY), [scrollY]);

  const chassisMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#1E293B', roughness: 0.25, metalness: 0.85 }),
    []
  );
  const screenMat = useMemo(
    () => new THREE.MeshBasicMaterial({ map: screenTex }),
    [screenTex]
  );

  const boxGeo = useMemo(() => new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyThickness), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), []);
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#00E5FF', linewidth: 2 }), []);

  return (
    <div style={{ position: 'absolute', inset: 0, width: 1920, height: 1080, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5.0], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.6} />
        <directionalLight position={[3, 5, 4]} intensity={2.2} color="#FFFFFF" />
        <directionalLight position={[-4, -3, 2]} intensity={0.9} color="#00E5FF" />

        {/* Khóa chặt vị trí X = 0 tại gốc tọa độ */}
        <group
          ref={groupRef}
          position={[0, floatY, 0]}
          rotation={[rotXBase, rotY, rotZBase]}
          scale={0.62}
        >
          <mesh geometry={boxGeo}>
            <primitive object={chassisMat} attach="material-0" />
            <primitive object={chassisMat} attach="material-1" />
            <primitive object={chassisMat} attach="material-2" />
            <primitive object={chassisMat} attach="material-3" />
            <primitive object={screenMat} attach="material-4" />
            <primitive object={chassisMat} attach="material-5" />
          </mesh>
          <lineSegments geometry={edgesGeo} material={lineMat} />
          {/* Dynamic Island Notch */}
          <mesh position={[0, 2.15, bodyThickness / 2 + 0.005]}>
            <boxGeometry args={[0.5, 0.08, 0.01]} />
            <meshBasicMaterial color="#00E5FF" />
          </mesh>
        </group>
      </Canvas>
    </div>
  );
};

export default CrabitSmartphone3D;
