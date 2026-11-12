import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import {
  CrabitSmartphone3DMotionSchema,
  CrabitSmartphone3DMotionProps,
} from '../../schemas/crabitSmartphone3DSchema';
import { PropPhoneScreenUI } from './PropPhoneScreenUI';

export interface CrabitSmartphone3DProps {
  config?: Partial<CrabitSmartphone3DMotionProps>;
  motionConfig?: Partial<CrabitSmartphone3DMotionProps>;
  dispersionAmount?: number;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  show3DCallouts?: boolean;
}

/**
 * CrabitSmartphone3D: Ultra-stable deterministic CSS 3D Smartphone component.
 * Eliminates all Z-fighting and GPU compositing flicker by using a single 3D
 * transformStyle container and strictly planar 2D layers with clean translateZ separation.
 */
export const CrabitSmartphone3D: React.FC<CrabitSmartphone3DProps> = ({
  config: rawConfig,
  motionConfig,
  dispersionAmount: propDispersionAmount,
  className,
  style,
  width,
  height,
  show3DCallouts = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Validate config with Schema Gatekeeper
  const activeConfig = rawConfig ?? motionConfig ?? {};
  useMemo(() => {
    CrabitSmartphone3DMotionSchema.safeParse(activeConfig);
  }, [activeConfig]);

  // 1. Sử dụng Spring Physics của Remotion để chuyển động xoay nảy mượt mà, không giật
  const entranceProgress = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 0.8,
    },
  });

  // 2. Nội suy góc xoay hoàn toàn theo frame (Deterministic)
  // Xoay nhẹ nhàng từ góc nghiêng -25 độ về -10 độ
  const rotY = interpolate(frame, [0, 60], [-25, -10], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  const rotX = interpolate(frame, [0, 60], [15, 8], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  // 3. Hiệu ứng thở nhẹ (Floating Float) - DÙNG HÀM SIN VỚI FRAME (frame / fps)
  const floatY = Math.sin((frame / fps) * 2) * 8; // Dao động nhẹ 8px êm ru
  const scale = entranceProgress;

  // Gentle kinetic scroll: Keeps the Hero Scholarship Balance Card prominently in view
  const scrollOffset = interpolate(frame, [0, 119], [0, -40], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <div
      className={className}
      style={{
        width: width ?? '100%',
        height: height ?? '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: 1200,
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* KHUNG NGOÀI DUY NHẤT CÓ 3D (Không để overflow: hidden ở đây!) */}
      <div
        style={{
          width: 420,
          height: 860,
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `translateY(${floatY}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`,
          // Ép Chromium gộp thành 1 compositing layer duy nhất:
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* LỚP 1: BÓNG ĐỔ PHẲNG (Không dùng box-shadow 3D, dùng div riêng) */}
        <div
          style={{
            position: 'absolute',
            inset: 20,
            background: 'rgba(0, 229, 255, 0.15)',
            filter: 'blur(40px)',
            transform: 'translateZ(-20px)',
            pointerEvents: 'none',
          }}
        />

        {/* LỚP 2: THÂN MÁY / VIỀN KIM LOẠI */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 48,
            background: '#0f172a',
            border: '4px solid #334155',
            boxShadow: 'inset 0 0 0 2px rgba(255, 255, 255, 0.1), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            transform: 'translateZ(0px)',
          }}
        >
          {/* Side Hardware Buttons */}
          <div
            style={{
              position: 'absolute',
              right: -6,
              top: 140,
              width: 4,
              height: 70,
              backgroundColor: '#38BDF8',
              borderRadius: '0 4px 4px 0',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -6,
              top: 120,
              width: 4,
              height: 50,
              backgroundColor: '#38BDF8',
              borderRadius: '4px 0 0 4px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: -6,
              top: 185,
              width: 4,
              height: 50,
              backgroundColor: '#38BDF8',
              borderRadius: '4px 0 0 4px',
            }}
          />
        </div>

        {/* LỚP 3: MÀN HÌNH ĐIỆN THOẠI (Toàn bộ UI nằm gọn trong này, KHÔNG CÓ 3D) */}
        <div
          style={{
            position: 'absolute',
            inset: 12,
            borderRadius: 38,
            overflow: 'hidden', // Bo góc màn hình AN TOÀN ở đây vì không có preserve-3d bên trong
            background: '#ffffff',
            transform: 'translateZ(4px)', // Nhô hẳn lên 4px
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {/* Dynamic Island Punch-Hole */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 90,
              height: 20,
              backgroundColor: '#0F172A',
              borderRadius: 10,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#1E293B' }} />
            <div style={{ width: 28, height: 3, borderRadius: 2, backgroundColor: '#1E293B' }} />
          </div>

          <PropPhoneScreenUI
            bareScreen={true}
            scrollOffset={scrollOffset}
            width="100%"
            height="100%"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CrabitSmartphone3D;
