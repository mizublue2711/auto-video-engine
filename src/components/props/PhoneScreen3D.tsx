import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { Canvas, useThree } from '@react-three/fiber';

export interface PhoneScreen3DProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}

// Helper drawing rounded rectangle safely across Canvas implementations
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number = 16
) {
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, r);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }
}

// 1. TẠO GIAO DIỆN CRABIT CUỘN VÔ TẬN TRÊN BỀ MẶT CANVAS NATIVE (720 x 1600)
function renderAppScreen(scrollY: number): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 1600; // Tỉ lệ 20:9 chuẩn màn hình điện thoại
  const ctx = canvas.getContext('2d')!;

  // Nền ứng dụng phẳng chuẩn nhận diện Crabit (Midnight Navy)
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 720, 1600);

  // Lưu trạng thái trước khi cuộn
  ctx.save();
  ctx.translate(0, -scrollY);

  // --- NỘI DUNG CUỘN (SCROLLABLE FEED - CHIỀU DÀI ~3600px) ---

  // Khối 1: Banner Thử thách Viện trưởng
  ctx.fillStyle = '#1E293B';
  drawRoundRect(ctx, 40, 220, 640, 260, 16);
  ctx.fill();
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#00E5FF';
  ctx.font = 'bold 26px sans-serif';
  ctx.fillText('HAGWON DIRECTOR QUEST', 70, 280);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 36px sans-serif';
  ctx.fillText('Chinh phục Vi tích phân CSAT 22', 70, 340);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '24px sans-serif';
  ctx.fillText('Phần thưởng hoàn thành: +5,000 Carat', 70, 400);

  // Khối 2: Danh sách nhiệm vụ (Task Cards) lặp lại liên tục để không bao giờ bị trắng
  const tasks = [
    { title: 'Giải đề thi thử Toán CSAT câu 22', status: 'HOÀN THÀNH', reward: '+1,000 Carat', color: '#10B981' },
    { title: 'Điểm danh tự học tối đúng giờ', status: '100% TIẾN ĐỘ', reward: '+500 Carat', color: '#00E5FF' },
    { title: 'Thử thách 30 câu trắc nghiệm nhanh', status: 'ĐANG MỞ', reward: '+1,500 Carat', color: '#F59E0B' },
    { title: 'Nộp bài tập chuyên đề Hình học không gian', status: 'CHỜ DUYỆT', reward: '+800 Carat', color: '#6366F1' },
    { title: 'Luyện tập phương pháp khử Gauss', status: 'MỚI MỞ', reward: '+1,200 Carat', color: '#EC4899' },
    { title: 'Hoàn thành bài kiểm tra 15 phút', status: 'SẴN SÀNG', reward: '+600 Carat', color: '#00E5FF' },
    { title: 'Ôn tập công thức đạo hàm hàm hợp', status: 'GỢI Ý HỌC TẬP', reward: '+400 Carat', color: '#10B981' },
  ];

  let currentY = 520;
  // Vẽ lặp lại để tạo dải cuộn vô tận dài hơn 3600px
  for (let cycle = 0; cycle < 2; cycle++) {
    for (const t of tasks) {
      ctx.fillStyle = '#1E293B';
      drawRoundRect(ctx, 40, currentY, 640, 160, 16);
      ctx.fill();

      // Vạch màu trạng thái bên trái
      ctx.fillStyle = t.color;
      ctx.fillRect(40, currentY, 8, 160);

      // Tên nhiệm vụ
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(t.title, 70, currentY + 60);

      // Trạng thái & Phần thưởng
      ctx.fillStyle = t.color;
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(t.status, 70, currentY + 115);

      ctx.fillStyle = '#00E5FF';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(t.reward, 460, currentY + 115);

      currentY += 190;
    }
  }

  ctx.restore();

  // --- STICKY HEADER CỐ ĐỊNH (Không bị cuộn) ---
  ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
  ctx.fillRect(0, 0, 720, 190);
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 190);
  ctx.lineTo(720, 190);
  ctx.stroke();

  // Thanh trạng thái pin, sóng, giờ
  ctx.fillStyle = '#94A3B8';
  ctx.font = '22px monospace';
  ctx.fillText('22:45  •  SKT 5G  •  98%', 50, 50);

  // Profile học sinh
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('Kim Min-jun', 50, 115);
  ctx.fillStyle = '#64748B';
  ctx.font = '22px sans-serif';
  ctx.fillText('Chuỗi học tập 7 ngày 🔥', 50, 150);

  // Huy hiệu Ví Carat
  ctx.fillStyle = '#0284C7';
  drawRoundRect(ctx, 430, 80, 250, 75, 16);
  ctx.fill();
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText('◆ 12,500 C', 475, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

// 2. KHỐI ĐIỆN THOẠI 3D LINE ART (UNLIT FLAT TOON SHADING)
const PhoneModel: React.FC = () => {
  const frame = useCurrentFrame();
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  useEffect(() => {
    invalidate();
  }, [frame, invalidate]);

  // Kích thước chuẩn tỉ lệ điện thoại trong Three.js
  const phoneWidth = 2.0;
  const phoneHeight = 4.3;
  const phoneDepth = 0.12;

  // Tính toán độ cuộn mượt mà liên tục xuyên suốt 119 frames
  const scrollOffset = interpolate(
    frame,
    [0, 119],
    [0, 1800], // Cuộn trượt 1800px liên tục, không bao giờ bị dừng trắng
    {
      easing: Easing.bezier(0.2, 0.8, 0.3, 1),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const screenTexture = useMemo(() => renderAppScreen(scrollOffset), [scrollOffset]);

  useEffect(() => {
    return () => {
      screenTexture?.dispose();
    };
  }, [screenTexture]);

  // Vật liệu phẳng (Unlit Flat Shading - không bị bóng gắt PBR)
  const screenMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ map: screenTexture || undefined }),
    [screenTexture]
  );
  const bodyMaterial = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#090D16' }),
    []
  );

  const materials = useMemo(
    () => [
      bodyMaterial,   // +X
      bodyMaterial,   // -X
      bodyMaterial,   // +Y
      bodyMaterial,   // -Y
      screenMaterial, // +Z (Mặt kính cảm ứng)
      bodyMaterial,   // -Z
    ],
    [bodyMaterial, screenMaterial]
  );

  // Khối điện thoại
  const phoneBox = useMemo(
    () => new THREE.BoxGeometry(phoneWidth, phoneHeight, phoneDepth),
    [phoneWidth, phoneHeight, phoneDepth]
  );
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(phoneBox), [phoneBox]);
  const lineMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#00E5FF', linewidth: 1.5 }),
    []
  );

  // Tọa độ góc nghiêng khóa chết theo bàn tay học sinh trong Flow
  // Nghiêng trục Z, chúc đầu xuống trục X và vặn trục Y theo phối cảnh 3D
  const rotX = -0.26; // Chúc đầu xuống
  const rotY = 0.14;  // Xoay nhẹ góc nhìn
  const rotZ = -0.28; // Nghiêng sang trái khớp với góc cầm tay

  return (
    <group ref={groupRef} rotation={[rotX, rotY, rotZ]} position={[0, 0, 0]}>
      {/* Thân điện thoại */}
      <mesh geometry={phoneBox} material={materials} />

      {/* Viền Line Art Blueprint phát sáng xung quanh thân máy */}
      <lineSegments geometry={edgesGeo} material={lineMaterial} />
    </group>
  );
};

// 3. COMPONENT XUẤT CHO REMOTION SCENE
export const PhoneScreen3D: React.FC<PhoneScreen3DProps> = ({
  width = 1920,
  height = 1080,
  style,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      >
        <PhoneModel />
      </Canvas>
    </div>
  );
};
