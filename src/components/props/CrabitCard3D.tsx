import React, { useMemo, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  continueRender,
  delayRender,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface CrabitCard3DProps {
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  className?: string;
  cardholderName?: string;
  chargedAmount?: string;
  cardNumber?: string;
  expiryDate?: string;
  flipStartFrame?: number;
}

/**
 * Creates a high-resolution 2D Canvas texture for the ID-1 Crabit Card front face.
 * Flat vector 3D line art blueprint aesthetic with monospace typography.
 */
function createCardFrontCanvas(
  cardholderName: string,
  chargedAmount: string,
  cardNumber: string,
  expiryDate: string
): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  const w = 1712;
  const h = 1080;
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Helper for drawing rounded rectangle paths
  const drawRoundedRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // 1. Clip base to ID-1 card contour (rx: 56px)
  drawRoundedRect(0, 0, w, h, 56);
  ctx.clip();

  // 2. Base Gradient Fill: Deep Midnight Navy to Electric Cyan
  const bgGrad = ctx.createLinearGradient(0, h, w, 0);
  bgGrad.addColorStop(0, '#0B1120');
  bgGrad.addColorStop(0.45, '#0F172A');
  bgGrad.addColorStop(0.75, '#0369A1');
  bgGrad.addColorStop(0.95, '#0284C7');
  bgGrad.addColorStop(1, '#00E5FF');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 3. Cel-Shaded Facets & Blueprint Geometry
  // 3a. Dark lower-left contrast wedge
  ctx.fillStyle = 'rgba(6, 9, 19, 0.82)';
  ctx.beginPath();
  ctx.moveTo(0, 720);
  ctx.lineTo(0, h);
  ctx.lineTo(560, h);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 720);
  ctx.lineTo(560, h);
  ctx.stroke();

  // 3b. Mid-card diagonal angular band
  const bandGrad = ctx.createLinearGradient(0, 0, w, h);
  bandGrad.addColorStop(0, 'rgba(0, 229, 255, 0.32)');
  bandGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.08)');
  bandGrad.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = bandGrad;
  ctx.beginPath();
  ctx.moveTo(680, h);
  ctx.lineTo(w, 460);
  ctx.lineTo(w, 760);
  ctx.lineTo(1140, h);
  ctx.closePath();
  ctx.fill();

  // 3c. Top-right electric cyan energy sector
  const cyanGlow = ctx.createLinearGradient(w, 0, 0, h);
  cyanGlow.addColorStop(0, 'rgba(0, 229, 255, 0.40)');
  cyanGlow.addColorStop(0.5, 'rgba(2, 132, 199, 0.16)');
  cyanGlow.addColorStop(1, 'rgba(15, 23, 42, 0)');
  ctx.fillStyle = cyanGlow;
  ctx.beginPath();
  ctx.moveTo(960, 0);
  ctx.lineTo(w, 0);
  ctx.lineTo(w, 640);
  ctx.lineTo(1280, 320);
  ctx.closePath();
  ctx.fill();

  // 4. Blueprint Technical Grid Guides & Markings
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.14)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(140, 340);
  ctx.lineTo(w, 340);
  ctx.moveTo(140, 720);
  ctx.lineTo(w, 720);
  ctx.moveTo(840, 160);
  ctx.lineTo(840, 960);
  ctx.stroke();

  // Blueprint corner reticles (+)
  const drawReticle = (cx: number, cy: number) => {
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy);
    ctx.lineTo(cx + 16, cy);
    ctx.moveTo(cx, cy - 16);
    ctx.lineTo(cx, cy + 16);
    ctx.stroke();
  };
  drawReticle(80, 80);
  drawReticle(w - 80, 80);
  drawReticle(80, h - 80);
  drawReticle(w - 80, h - 80);

  // Technical blueprint stamps in Monospace
  ctx.font = '700 18px "Courier New", Courier, monospace';
  ctx.fillStyle = 'rgba(0, 229, 255, 0.5)';
  ctx.fillText('SYS://CRABIT-PAY.SCHOLARSHIP-ID1', 120, 185);

  // 5. Header Branding: CRABIT // SCHOLARSHIP (Monospace)
  // Diamond Monogram
  ctx.fillStyle = '#00E5FF';
  ctx.strokeStyle = '#E0F7FA';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(122, 130);
  ctx.lineTo(136, 114);
  ctx.lineTo(150, 130);
  ctx.lineTo(136, 146);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.font = '900 52px "Courier New", Courier, monospace';
  ctx.fillStyle = '#00E5FF';
  ctx.fillText('CRABIT', 170, 144);

  ctx.font = '700 32px "Courier New", Courier, monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('// SCHOLARSHIP', 390, 144);

  // 6. EMV Chip Vector (Strict cel-shaded technical geometry)
  const chipX = 180;
  const chipY = 360;
  const chipW = 250;
  const chipH = 190;
  const chipR = 24;

  const chipGrad = ctx.createLinearGradient(
    chipX,
    chipY,
    chipX + chipW,
    chipY + chipH
  );
  chipGrad.addColorStop(0, '#FEF3C7');
  chipGrad.addColorStop(0.4, '#FDE68A');
  chipGrad.addColorStop(0.7, '#F59E0B');
  chipGrad.addColorStop(1, '#D97706');

  drawRoundedRect(chipX, chipY, chipW, chipH, chipR);
  ctx.fillStyle = chipGrad;
  ctx.fill();
  ctx.strokeStyle = '#B45309';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Chip inner bevel line
  drawRoundedRect(
    chipX + 5,
    chipY + 5,
    chipW - 10,
    chipH - 10,
    chipR - 4
  );
  ctx.strokeStyle = '#FEF3C7';
  ctx.lineWidth = 2.4;
  ctx.stroke();

  // Center contact pad
  const padX = chipX + 80;
  const padY = chipY + 60;
  const padW = 90;
  const padH = 70;
  drawRoundedRect(padX, padY, padW, padH, 12);
  const padGrad = ctx.createLinearGradient(
    padX,
    padY,
    padX + padW,
    padY + padH
  );
  padGrad.addColorStop(0, '#FEF3C7');
  padGrad.addColorStop(0.5, '#F59E0B');
  padGrad.addColorStop(1, '#B45309');
  ctx.fillStyle = padGrad;
  ctx.fill();
  ctx.strokeStyle = '#B45309';
  ctx.lineWidth = 3;
  ctx.stroke();

  // EMV isolation grooves
  const drawGroove = (
    startX: number,
    startY: number,
    midX: number,
    midY: number,
    endX: number,
    endY: number
  ) => {
    ctx.strokeStyle = '#B45309';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(midX, midY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    ctx.strokeStyle = '#FEF3C7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY - 1);
    ctx.lineTo(midX, midY - 1);
    ctx.lineTo(endX, endY - 1);
    ctx.stroke();
  };

  drawGroove(chipX, chipY + 48, chipX + 60, chipY + 48, padX, padY + 10);
  drawGroove(
    chipX,
    chipY + chipH - 48,
    chipX + 60,
    chipY + chipH - 48,
    padX,
    padY + padH - 10
  );
  drawGroove(
    chipX + chipW,
    chipY + 48,
    chipX + chipW - 60,
    chipY + 48,
    padX + padW,
    padY + 10
  );
  drawGroove(
    chipX + chipW,
    chipY + chipH - 48,
    chipX + chipW - 60,
    chipY + chipH - 48,
    padX + padW,
    padY + padH - 10
  );

  // 7. Contactless Payment Arcs (NFC Indicator)
  const nfcX = 490;
  const nfcY = 455;
  const radii = [28, 48, 68, 88];
  const opacities = [0.95, 0.75, 0.55, 0.35];

  radii.forEach((r, idx) => {
    ctx.strokeStyle = `rgba(0, 229, 255, ${opacities[idx]})`;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(nfcX, nfcY, r, -Math.PI * 0.32, Math.PI * 0.32);
    ctx.stroke();
  });

  // 8. 16-Digit Card Number (Blueprint Monospace: ••••  ••••  ••••  5022)
  ctx.font = '700 48px "Courier New", Courier, monospace';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText(cardNumber, 180, 680);

  // Guideline under card number
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 8]);
  ctx.beginPath();
  ctx.moveTo(180, 705);
  ctx.lineTo(820, 705);
  ctx.stroke();
  ctx.setLineDash([]);

  // 9. Cardholder Information: KIM MIN-JUN
  ctx.font = '700 18px "Courier New", Courier, monospace';
  ctx.fillStyle = '#64748B';
  ctx.fillText('CARDHOLDER NAME', 180, 765);

  ctx.font = '900 42px "Courier New", Courier, monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(cardholderName, 180, 818);

  ctx.font = '700 18px "Courier New", Courier, monospace';
  ctx.fillStyle = '#64748B';
  ctx.fillText('VALID THRU', 580, 765);

  ctx.font = '900 36px "Courier New", Courier, monospace';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText(expiryDate, 580, 818);

  // 10. "+50,000 KRW CHARGED" Blueprint Badge (Monospace)
  const badgeX = 860;
  const badgeY = 745;
  const badgeW = 750;
  const badgeH = 96;
  const badgeR = 24;

  drawRoundedRect(badgeX, badgeY, badgeW, badgeH, badgeR);
  ctx.fillStyle = 'rgba(0, 229, 255, 0.12)';
  ctx.fill();
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Glowing status pulse dot
  ctx.fillStyle = '#00E5FF';
  ctx.beginPath();
  ctx.arc(badgeX + 45, badgeY + badgeH / 2, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(badgeX + 45, badgeY + badgeH / 2, 18, 0, Math.PI * 2);
  ctx.stroke();

  // Monospace charged amount text
  ctx.font = '900 38px "Courier New", Courier, monospace';
  ctx.fillStyle = '#00E5FF';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(chargedAmount, badgeX + 80, badgeY + badgeH / 2);

  // 11. Hologram Security Badge (Bottom Right)
  const holoX = 1460;
  const holoY = 460;
  ctx.fillStyle = 'rgba(0, 229, 255, 0.25)';
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(holoX - 25, holoY, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
  ctx.strokeStyle = '#38BDF8';
  ctx.beginPath();
  ctx.arc(holoX + 25, holoY, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Center star sparkle
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(holoX, holoY - 18);
  ctx.lineTo(holoX + 12, holoY);
  ctx.lineTo(holoX, holoY + 18);
  ctx.lineTo(holoX - 12, holoY);
  ctx.closePath();
  ctx.fill();

  // 12. Card Rim Highlight & Double Hairline Border
  drawRoundedRect(4, 4, w - 8, h - 8, 52);
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 4;
  ctx.stroke();

  drawRoundedRect(12, 12, w - 24, h - 24, 44);
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();

  return canvas;
}

/**
 * Creates the back face texture with magnetic stripe and blueprint styling.
 */
function createCardBackCanvas(cardholderName: string): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  const w = 1712;
  const h = 1080;
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const drawRoundedRect = (
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  drawRoundedRect(0, 0, w, h, 56);
  ctx.clip();

  // Base Midnight Fill
  ctx.fillStyle = '#080E1D';
  ctx.fillRect(0, 0, w, h);

  // Magnetic Stripe
  ctx.fillStyle = '#030712';
  ctx.fillRect(0, 140, w, 200);

  // Stripe hairline guides
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 140);
  ctx.lineTo(w, 140);
  ctx.moveTo(0, 340);
  ctx.lineTo(w, 340);
  ctx.stroke();

  // Signature Panel
  const sigX = 160;
  const sigY = 420;
  const sigW = 1050;
  const sigH = 130;
  drawRoundedRect(sigX, sigY, sigW, sigH, 12);
  ctx.fillStyle = '#1E293B';
  ctx.fill();
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Signature Name (Monospace)
  ctx.font = '700 32px "Courier New", Courier, monospace';
  ctx.fillStyle = '#00E5FF';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(cardholderName, sigX + 40, sigY + sigH / 2);

  // CVV Box
  const cvvX = 1240;
  const cvvY = 420;
  const cvvW = 190;
  const cvvH = 130;
  drawRoundedRect(cvvX, cvvY, cvvW, cvvH, 12);
  ctx.fillStyle = '#0B132B';
  ctx.fill();
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.font = '900 34px "Courier New", Courier, monospace';
  ctx.fillStyle = '#00E5FF';
  ctx.textAlign = 'center';
  ctx.fillText('CVV 502', cvvX + cvvW / 2, cvvY + cvvH / 2);

  // Fine print & security guidelines
  ctx.font = '700 18px "Courier New", Courier, monospace';
  ctx.fillStyle = '#64748B';
  ctx.textAlign = 'left';
  ctx.fillText('AUTHORIZED SIGNATURE // CRABIT SCHOLARSHIP CARD', sigX, sigY - 20);

  // Outer border
  drawRoundedRect(4, 4, w - 8, h - 8, 52);
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 4;
  ctx.stroke();

  return canvas;
}

interface CardSceneProps {
  frame: number;
  fps: number;
  cardholderName: string;
  chargedAmount: string;
  cardNumber: string;
  expiryDate: string;
  flipStartFrame: number;
}

/**
 * 3D Card Scene: Full prominent size (3.375 x 2.125 x 0.06)
 * Prominent Hero Center Staging: position [0, 0.35, 0] with idle float
 * Spring flip entry on rotateY from -Math.PI / 2 to 0
 */
const Card3DScene: React.FC<CardSceneProps> = ({
  frame,
  fps,
  cardholderName,
  chargedAmount,
  cardNumber,
  expiryDate,
  flipStartFrame,
}: CardSceneProps) => {
  const { invalidate } = useThree();

  useEffect(() => {
    invalidate();
  }, [frame, invalidate]);

  // Exact ID-1 Dimensions: Width 3.375, Height 2.125, Depth 0.06
  const cardWidth = 3.375;
  const cardHeight = 2.125;
  const cardThickness = 0.06;

  const boxGeometry = useMemo(() => {
    return new THREE.BoxGeometry(cardWidth, cardHeight, cardThickness);
  }, [cardWidth, cardHeight, cardThickness]);

  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(boxGeometry, 15);
  }, [boxGeometry]);

  const frontTexture = useMemo(() => {
    const canvas = createCardFrontCanvas(
      cardholderName,
      chargedAmount,
      cardNumber,
      expiryDate
    );
    if (!canvas) return null;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, [cardholderName, chargedAmount, cardNumber, expiryDate]);

  const backTexture = useMemo(() => {
    const canvas = createCardBackCanvas(cardholderName);
    if (!canvas) return null;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, [cardholderName]);

  useEffect(() => {
    return () => {
      frontTexture?.dispose();
      backTexture?.dispose();
      boxGeometry.dispose();
      edgesGeometry.dispose();
    };
  }, [frontTexture, backTexture, boxGeometry, edgesGeometry]);

  const materials = useMemo(() => {
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0x090d1a,
      roughness: 0.3,
      metalness: 0.8,
    });
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTexture || undefined,
      roughness: 0.25,
      metalness: 0.1,
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: backTexture || undefined,
      roughness: 0.25,
      metalness: 0.1,
    });

    return [
      rimMat,   // +X right edge
      rimMat,   // -X left edge
      rimMat,   // +Y top edge
      rimMat,   // -Y bottom edge
      frontMat, // +Z front face
      backMat,  // -Z back face
    ];
  }, [frontTexture, backTexture]);

  // Spring-driven 3D flip on entry using damping: 14, stiffness: 85
  const flipProgress = spring({
    frame: frame - flipStartFrame,
    fps,
    config: {
      damping: 14,
      stiffness: 85,
    },
  });

  // rotateY interpolates smoothly from -Math.PI / 2 (-90°) to 0
  const rotateY = interpolate(
    flipProgress,
    [0, 1],
    [-Math.PI / 2, 0]
  );

  // Center mesh at position [0, 0.2, 0] with subtle floating
  const posY = 0.2 + Math.sin(frame / 12) * 0.02;

  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#00E5FF' }), []);

  return (
    <group
      position={[0, posY, 0]}
      rotation={[0, rotateY, 0]}
    >
      <mesh geometry={boxGeometry}>
        <primitive object={materials[0]} attach="material-0" />
        <primitive object={materials[1]} attach="material-1" />
        <primitive object={materials[2]} attach="material-2" />
        <primitive object={materials[3]} attach="material-3" />
        <primitive object={materials[4]} attach="material-4" />
        <primitive object={materials[5]} attach="material-5" />
      </mesh>
      <lineSegments geometry={edgesGeometry} material={lineMat} />
    </group>
  );
};

/**
 * CrabitCard3D: Flat 3D ID-1 Debit Card with Cyan Wireframe Edges
 * Full prominent size staged at [0, 0.2, 0] with camera at [0, 0.15, 2.9], fov: 38.
 * Zero-offset fullscreen canvas adhering strictly to layout principles.
 */
const RemotionSync: React.FC<{ handle: number }> = ({ handle }) => {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    gl.render(scene, camera);
    continueRender(handle);
  }, [gl, scene, camera, handle]);
  return null;
};

export const CrabitCard3D: React.FC<CrabitCard3DProps> = ({
  width = '100%',
  height = '100%',
  style,
  className,
  cardholderName = 'KIM MIN-JUN',
  chargedAmount = '+50,000 KRW CHARGED',
  cardNumber = '••••  ••••  ••••  5022',
  expiryDate = '12/29',
  flipStartFrame = 0,
}: CrabitCard3DProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [handle] = useState(() => delayRender('CrabitCard3D_Wait'));

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width,
        height,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <Canvas
        camera={{
          position: [0, 0.05, 3.25],
          fov: 40,
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[2, 4, 3]} intensity={2.2} color="#FFFFFF" />
        <pointLight position={[-4, -2, 2]} intensity={1.5} color="#00E5FF" />
        <RemotionSync handle={handle} />
        <Card3DScene
          frame={frame}
          fps={fps}
          cardholderName={cardholderName}
          chargedAmount={chargedAmount}
          cardNumber={cardNumber}
          expiryDate={expiryDate}
          flipStartFrame={flipStartFrame}
        />
      </Canvas>
    </div>
  );
};
