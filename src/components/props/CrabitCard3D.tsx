import React, { useMemo, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

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
 * Cel-shaded anime blueprint aesthetic with flat unlit vector line art.
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

  // 1. Clip base to ID-1 card contour (rx: 56px in 1712x1080 canvas)
  drawRoundedRect(0, 0, w, h, 56);
  ctx.clip();

  // 2. Base Gradient Fill: Deep Midnight Navy to Electric Cyan
  const bgGrad = ctx.createLinearGradient(0, h, w, 0);
  bgGrad.addColorStop(0, '#0B1120');
  bgGrad.addColorStop(0.42, '#0F172A');
  bgGrad.addColorStop(0.72, '#0369A1');
  bgGrad.addColorStop(0.92, '#0284C7');
  bgGrad.addColorStop(1, '#00E5FF');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // 3. Cel-Shaded Facets (Flat anime vector geometry)
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

  // 3d. Cel Blades
  ctx.fillStyle = 'rgba(0, 229, 255, 0.18)';
  ctx.beginPath();
  ctx.moveTo(580, h);
  ctx.lineTo(690, h);
  ctx.lineTo(w, 330);
  ctx.lineTo(w, 250);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(0, 229, 255, 0.65)';
  ctx.beginPath();
  ctx.moveTo(720, h);
  ctx.lineTo(748, h);
  ctx.lineTo(w, 384);
  ctx.lineTo(w, 364);
  ctx.closePath();
  ctx.fill();

  // 4. Blueprint Technical Grid Guides & Markings
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.14)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(160, 340);
  ctx.lineTo(w, 340);
  ctx.moveTo(160, 720);
  ctx.lineTo(w, 720);
  ctx.moveTo(840, 160);
  ctx.lineTo(840, 960);
  ctx.moveTo(1220, 160);
  ctx.lineTo(1220, 960);
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
  drawReticle(90, 90);
  drawReticle(w - 90, 90);
  drawReticle(90, h - 90);
  drawReticle(w - 90, h - 90);

  // Technical blueprint stamps in Monospace
  ctx.font = '700 18px "Courier New", Courier, monospace';
  ctx.fillStyle = 'rgba(0, 229, 255, 0.45)';
  ctx.fillText('SYS://CRABIT-PAY.ID-1.SEC', 120, 180);
  ctx.fillText('SPEC: 85.60 x 53.98mm // NFC 13.56MHz', 120, 210);

  // 5. Header Branding: CRABIT & Diamond Monogram
  // Mini Diamond
  ctx.fillStyle = '#00E5FF';
  ctx.strokeStyle = '#E0F7FA';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(112, 130);
  ctx.lineTo(126, 114);
  ctx.lineTo(140, 130);
  ctx.lineTo(126, 146);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.font = '900 56px "Courier New", Courier, monospace';
  ctx.fillStyle = '#00E5FF';
  ctx.fillText('CRABIT', 160, 144);

  ctx.font = '700 24px "Courier New", Courier, monospace';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('FINTECH REWARD PLATINUM', 420, 140);

  // 6. Watermark Carat Diamond Geometry (Top Right)
  const tx = 1380;
  const ty = 140;
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
  ctx.lineWidth = 1.6;
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.arc(tx + 110, ty + 60, 110, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Faceted diamond shape
  ctx.fillStyle = 'rgba(0, 229, 255, 0.12)';
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(tx + 64, ty + 24);
  ctx.lineTo(tx + 156, ty + 24);
  ctx.lineTo(tx + 192, ty + 64);
  ctx.lineTo(tx + 110, ty + 150);
  ctx.lineTo(tx + 28, ty + 64);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Pavilion convergence lines
  ctx.beginPath();
  ctx.moveTo(tx + 64, ty + 24);
  ctx.lineTo(tx + 88, ty + 64);
  ctx.lineTo(tx + 110, ty + 150);
  ctx.moveTo(tx + 156, ty + 24);
  ctx.lineTo(tx + 132, ty + 64);
  ctx.lineTo(tx + 110, ty + 150);
  ctx.moveTo(tx + 28, ty + 64);
  ctx.lineTo(tx + 192, ty + 64);
  ctx.stroke();

  ctx.font = '800 20px "Courier New", Courier, monospace';
  ctx.fillStyle = 'rgba(0, 229, 255, 0.55)';
  ctx.fillText('CARAT // REWARD', tx + 35, ty + 185);

  // 7. EMV Chip (Strict ID-1 Geometry: metallic gold unlit flat cel-shading)
  const chipX = 220;
  const chipY = 360;
  const chipW = 260;
  const chipH = 200;
  const chipR = 24;

  const chipGrad = ctx.createLinearGradient(
    chipX,
    chipY,
    chipX + chipW,
    chipY + chipH
  );
  chipGrad.addColorStop(0, '#FEF3C7');
  chipGrad.addColorStop(0.35, '#FDE68A');
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

  // Cel sheen polygon across chip
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.beginPath();
  ctx.moveTo(chipX, chipY + 50);
  ctx.lineTo(chipX + 80, chipY);
  ctx.lineTo(chipX + 140, chipY);
  ctx.lineTo(chipX, chipY + 140);
  ctx.closePath();
  ctx.fill();

  // Center contact pad
  const padX = chipX + 85;
  const padY = chipY + 65;
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

  drawRoundedRect(padX + 4, padY + 4, padW - 8, padH - 8, 8);
  ctx.strokeStyle = '#FEF3C7';
  ctx.lineWidth = 2;
  ctx.stroke();

  // EMV isolation channels / grooves
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

  drawGroove(chipX, chipY + 52, chipX + 62, chipY + 52, padX, padY + 10);
  drawGroove(
    chipX,
    chipY + chipH - 52,
    chipX + 62,
    chipY + chipH - 52,
    padX,
    padY + padH - 10
  );
  drawGroove(
    chipX + chipW,
    chipY + 52,
    chipX + chipW - 62,
    chipY + 52,
    padX + padW,
    padY + 10
  );
  drawGroove(
    chipX + chipW,
    chipY + chipH - 52,
    chipX + chipW - 62,
    chipY + chipH - 52,
    padX + padW,
    padY + padH - 10
  );

  // Top/bottom vertical dividers
  ctx.strokeStyle = '#B45309';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(chipX + chipW / 2, chipY);
  ctx.lineTo(chipX + chipW / 2, padY);
  ctx.moveTo(chipX + chipW / 2, padY + padH);
  ctx.lineTo(chipX + chipW / 2, chipY + chipH);
  ctx.stroke();

  ctx.strokeStyle = '#FEF3C7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(chipX + chipW / 2 - 1, chipY);
  ctx.lineTo(chipX + chipW / 2 - 1, padY);
  ctx.moveTo(chipX + chipW / 2 - 1, padY + padH);
  ctx.lineTo(chipX + chipW / 2 - 1, chipY + chipH);
  ctx.stroke();

  // Horizontal slot in center pad
  ctx.strokeStyle = '#B45309';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(padX + 14, padY + padH / 2);
  ctx.lineTo(padX + padW - 14, padY + padH / 2);
  ctx.stroke();
  ctx.strokeStyle = '#FEF3C7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padX + 14, padY + padH / 2 + 1);
  ctx.lineTo(padX + padW - 14, padY + padH / 2 + 1);
  ctx.stroke();

  // Micro gold dots
  ctx.fillStyle = '#FEF3C7';
  ctx.beginPath();
  ctx.arc(chipX + 35, chipY + 28, 4.5, 0, Math.PI * 2);
  ctx.arc(chipX + chipW - 35, chipY + 28, 4.5, 0, Math.PI * 2);
  ctx.arc(chipX + 35, chipY + chipH - 28, 4.5, 0, Math.PI * 2);
  ctx.arc(chipX + chipW - 35, chipY + chipH - 28, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // 8. Contactless Payment Arcs (NFC Indicator)
  const nfcX = 540;
  const nfcY = 460;
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

  // 9. 16-Digit Card Number (Blueprint Monospace)
  ctx.font = '700 44px "Courier New", Courier, monospace';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText(cardNumber, 220, 680);

  // Fine guideline under card number
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 6]);
  ctx.beginPath();
  ctx.moveTo(220, 705);
  ctx.lineTo(840, 705);
  ctx.stroke();
  ctx.setLineDash([]);

  // 10. Cardholder Information
  ctx.font = '700 18px "Courier New", Courier, monospace';
  ctx.fillStyle = '#64748B';
  ctx.fillText('CARDHOLDER NAME', 220, 765);

  ctx.font = '900 40px "Courier New", Courier, monospace';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(cardholderName, 220, 818);

  ctx.font = '700 18px "Courier New", Courier, monospace';
  ctx.fillStyle = '#64748B';
  ctx.fillText('VALID THRU', 620, 765);

  ctx.font = '900 36px "Courier New", Courier, monospace';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText(expiryDate, 620, 818);

  // 11. "+50,000 KRW CHARGED" Blueprint Badge (Crucial Directive Requirement!)
  const badgeX = 860;
  const badgeY = 745;
  const badgeW = 730;
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

  // Secondary outer ring on dot
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(badgeX + 45, badgeY + badgeH / 2, 18, 0, Math.PI * 2);
  ctx.stroke();

  // Monospace charged amount text
  ctx.font = '900 36px "Courier New", Courier, monospace';
  ctx.fillStyle = '#00E5FF';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(chargedAmount, badgeX + 80, badgeY + badgeH / 2);

  // 12. Hologram Security Badge (Bottom Right)
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

  // 13. Card Rim Highlight & Double Hairline Border
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

  // Diagonal micro-pattern in signature panel
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < sigW; i += 30) {
    ctx.beginPath();
    ctx.moveTo(sigX + i, sigY);
    ctx.lineTo(sigX + i + 20, sigY + sigH);
    ctx.stroke();
  }

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
  ctx.fillText('CVV 729', cvvX + cvvW / 2, cvvY + cvvH / 2);

  // Fine print & security guidelines
  ctx.font = '700 18px "Courier New", Courier, monospace';
  ctx.fillStyle = '#64748B';
  ctx.textAlign = 'left';
  ctx.fillText('AUTHORIZED SIGNATURE // NOT VALID UNLESS SIGNED', sigX, sigY - 20);
  ctx.fillText(
    'ISSUED BY CRABIT FINTECH // ENCRYPTED 256-BIT PROTOCOL // 24/7 SUPPORT',
    160,
    700
  );

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
 * 3D Card Scene using Three.js / R3F with strict EdgesGeometry and unlit MeshBasicMaterial.
 */
const Card3DScene: React.FC<CardSceneProps> = ({
  frame,
  fps,
  cardholderName,
  chargedAmount,
  cardNumber,
  expiryDate,
  flipStartFrame,
}) => {
  const { invalidate } = useThree();

  // Invalidate R3F render loop whenever frame updates
  useEffect(() => {
    invalidate();
  }, [frame, invalidate]);

  // ID-1 Standard Dimensions (85.60mm x 53.98mm x 0.8mm)
  const cardWidth = 8.56;
  const cardHeight = 5.398;
  const cardThickness = 0.08;

  // Box geometry
  const boxGeometry = useMemo(() => {
    return new THREE.BoxGeometry(cardWidth, cardHeight, cardThickness);
  }, [cardWidth, cardHeight, cardThickness]);

  // Strict EdgesGeometry line art outline
  const edgesGeometry = useMemo(() => {
    return new THREE.EdgesGeometry(boxGeometry, 15);
  }, [boxGeometry]);

  // Canvas textures for front and back
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

  // Clean up textures on unmount or change
  useEffect(() => {
    return () => {
      frontTexture?.dispose();
      backTexture?.dispose();
      boxGeometry.dispose();
      edgesGeometry.dispose();
    };
  }, [frontTexture, backTexture, boxGeometry, edgesGeometry]);

  // Strict Unlit Flat MeshBasicMaterial (no metallic reflections / PBR)
  const materials = useMemo(() => {
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0x090d1a,
    });
    const frontMat = new THREE.MeshBasicMaterial({
      map: frontTexture || undefined,
      color: 0xffffff,
    });
    const backMat = new THREE.MeshBasicMaterial({
      map: backTexture || undefined,
      color: 0xffffff,
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

  // =========================================================================
  // ANIMATION: Flip Rotation from -90deg to 0deg, followed by gentle floating idle wave
  // =========================================================================
  const flipProgress = spring({
    frame: frame - flipStartFrame,
    fps,
    config: {
      damping: 14,
      mass: 0.9,
      stiffness: 100,
      overshootClamping: false,
    },
  });

  // Flip rotation from -90deg (-Math.PI / 2) to 0deg (0)
  const baseRotateY = interpolate(
    flipProgress,
    [0, 1],
    [-Math.PI / 2, 0]
  );

  // Floating idle wave
  const time = frame / fps;
  const idleFloatY = Math.sin(time * 2.6) * 0.16;
  const idleFloatX = Math.cos(time * 1.8) * 0.08;
  const idleRotX = Math.sin(time * 2.0) * 0.045; // ~2.6 deg
  const idleRotY = Math.sin(time * 2.3) * 0.04;  // gentle yaw wobble
  const idleRotZ = Math.cos(time * 1.6) * 0.03;  // gentle roll

  // Settle scaling
  const entranceScale = interpolate(flipProgress, [0, 1], [0.85, 1.0]);

  // Combined transforms
  const posX = idleFloatX * flipProgress;
  const posY = idleFloatY * flipProgress;
  const rotX = idleRotX * flipProgress;
  const rotY = baseRotateY + idleRotY * flipProgress;
  const rotZ = idleRotZ * flipProgress;

  return (
    <group
      position={[posX, posY, 0]}
      rotation={[rotX, rotY, rotZ]}
      scale={[entranceScale, entranceScale, entranceScale]}
    >
      {/* ID-1 Card Body with unlit MeshBasicMaterial faces */}
      <mesh geometry={boxGeometry} material={materials} />

      {/* Strict #00E5FF EdgesGeometry Line Art Outlines */}
      <lineSegments geometry={edgesGeometry}>
        <lineBasicMaterial color="#00E5FF" linewidth={2} />
      </lineSegments>
    </group>
  );
};

export const CrabitCard3D: React.FC<CrabitCard3DProps> = ({
  width = 760,
  height = 480,
  style,
  className,
  cardholderName = 'KIM MIN-JUN',
  chargedAmount = '+50,000 KRW CHARGED',
  cardNumber = '5428  8901  2345  8829',
  expiryDate = '12/29',
  flipStartFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      className={className}
      style={{
        width,
        height,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        camera={{
          position: [0, 0, 11],
          fov: 38,
        }}
        style={{
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
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
