import React from 'react';

export interface GearTriangleRulerProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GearTriangleRuler: React.FC<GearTriangleRulerProps> = ({
  size = 200,
  className,
  style,
}) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      filter: 'drop-shadow(0 18px 30px rgba(0, 229, 255, 0.32))',
      ...style,
    }}
  >
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Thân ê-ke kính mờ */}
      <polygon
        points="10,90 90,90 90,10"
        fill="rgba(255, 255, 255, 0.82)"
        stroke="#00E5FF"
        strokeWidth="2.5"
      />
      {/* Khoét lỗ tam giác rỗng bên trong */}
      <polygon
        points="28,82 82,82 82,28"
        fill="rgba(224, 242, 254, 0.6)"
        stroke="#0284C7"
        strokeWidth="1.5"
        strokeDasharray="4 2"
      />
      {/* Vạch chia cm & mm cạnh đáy */}
      <line x1="18" y1="90" x2="18" y2="80" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="90" x2="28" y2="84" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="38" y1="90" x2="38" y2="80" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <line x1="48" y1="90" x2="48" y2="84" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="58" y1="90" x2="58" y2="80" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <line x1="68" y1="90" x2="68" y2="84" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="78" y1="90" x2="78" y2="80" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      {/* Vạch chia cạnh đứng */}
      <line x1="90" y1="20" x2="80" y2="20" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <line x1="90" y1="35" x2="84" y2="35" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="90" y1="50" x2="80" y2="50" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <line x1="90" y1="65" x2="84" y2="65" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);
