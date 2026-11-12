import React, { useState, useEffect } from 'react';

export interface TunerTransform {
  leftPercent: number;   // Dịch chuyển X (% khung hình 1920)
  topPercent: number;    // Dịch chuyển Y (% khung hình 1080)
  boxWidth: number;      // Chiều rộng khung Canvas (px)
  boxHeight: number;     // Chiều cao khung Canvas (px)
  scale: number;         // Tỷ lệ co giãn
}

export const DEFAULT_TRANSFORM: TunerTransform = {
  leftPercent: 2,
  topPercent: 0,
  boxWidth: 1080,
  boxHeight: 1080,
  scale: 1.0,
};

interface SpatialTunerFrameProps {
  children: React.ReactNode;
  storageKey?: string;                     // Key lưu vào localStorage (ví dụ: 'phone_seq3')
  initialValues?: Partial<TunerTransform>; // Tọa độ mặc định khi khóa code
  enabled?: boolean;                       // Bật/tắt thanh điều khiển UI
}

export const SpatialTunerFrame: React.FC<SpatialTunerFrameProps> = ({
  children,
  storageKey = 'crabit_spatial_tuner',
  initialValues,
  enabled = true,
}) => {
  const [transform, setTransform] = useState<TunerTransform>(() => {
    // 1. Khôi phục từ LocalStorage nếu có (khi đang bật tuner)
    if (enabled && typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          return { ...DEFAULT_TRANSFORM, ...initialValues, ...JSON.parse(saved) };
        } catch (e) {
          // fallback
        }
      }
    }
    return { ...DEFAULT_TRANSFORM, ...initialValues };
  });

  const [copied, setCopied] = useState(false);

  // Tự động lưu mỗi khi kéo slider
  const update = (key: keyof TunerTransform, val: number) => {
    const next = { ...transform, [key]: val };
    setTransform(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(next));
    }
  };

  const copyCode = () => {
    const snippet = `initialValues={${JSON.stringify(transform, null, 2)}}`;
    navigator.clipboard?.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 1. KHUNG CHỨA VẬT THỂ 3D ĐƯỢC ĐIỀU PHỐI TỌA ĐỘ */}
      <div
        style={{
          position: 'absolute',
          left: `${transform.leftPercent}%`,
          top: `${transform.topPercent}%`,
          width: transform.boxWidth,
          height: transform.boxHeight,
          transform: `scale(${transform.scale})`,
          transformOrigin: 'center center',
          zIndex: 2,
          pointerEvents: 'none',
          overflow: 'visible',
        }}
      >
        {children}
      </div>

      {/* 2. BẢNG ĐIỀU KHIỂN NỔI (CHỈ HIỆN KHI PREVIEW DEV) */}
      {enabled && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 320,
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            border: '1.5px solid #00E5FF',
            borderRadius: 14,
            padding: '14px 18px',
            color: '#FFFFFF',
            fontFamily: 'monospace',
            fontSize: 12,
            zIndex: 9999,
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.7)',
            pointerEvents: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ color: '#00E5FF', fontWeight: 700 }}>🎯 {storageKey.toUpperCase()}</span>
            <button
              onClick={copyCode}
              style={{
                backgroundColor: copied ? '#10B981' : '#00E5FF',
                color: '#0F172A',
                border: 'none',
                borderRadius: 6,
                padding: '4px 10px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {copied ? '✓ COPIED!' : 'COPY PROPS'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label>
              Left (%): {transform.leftPercent}%
              <input
                type="range"
                min="-30"
                max="90"
                step="1"
                value={transform.leftPercent}
                onChange={(e) => update('leftPercent', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </label>

            <label>
              Top (%): {transform.topPercent}%
              <input
                type="range"
                min="-30"
                max="80"
                step="1"
                value={transform.topPercent}
                onChange={(e) => update('topPercent', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </label>

            <label>
              Scale: {transform.scale.toFixed(2)}x
              <input
                type="range"
                min="0.5"
                max="1.5"
                step="0.02"
                value={transform.scale}
                onChange={(e) => update('scale', parseFloat(e.target.value))}
                style={{ width: '100%' }}
              />
            </label>
          </div>
        </div>
      )}
    </>
  );
};
