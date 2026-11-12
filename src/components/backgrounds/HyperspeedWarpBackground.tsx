import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface HyperspeedProps {
  speedMultiplier?: number;
  opacity?: number;
}

export const HyperspeedWarpBackground: React.FC<HyperspeedProps> = ({
  speedMultiplier = 1,
  opacity = 0.85,
}) => {
  const frame = useCurrentFrame();

  // 3 Parallax Velocity Tiers (Tầng chậm, tầng trung, tầng siêu tốc)
  const slowOffset = (frame * 35 * speedMultiplier) % 2400;
  const midOffset = (frame * 65 * speedMultiplier) % 2400;
  const fastOffset = (frame * 110 * speedMultiplier) % 2400;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity,
        pointerEvents: 'none',
      }}
    >
      {/* TẦNG 1: DẢI KHỐI HÌNH HỌC DÀI (FAST PILL STREAKS) */}
      <div style={{ position: 'absolute', inset: 0, transform: `translateX(-${fastOffset}px)` }}>
        {[
          { top: 120, width: 620, height: 6, bg: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' },
          { top: 280, width: 850, height: 10, bg: 'linear-gradient(90deg, transparent, #38BDF8, #00E5FF, transparent)' },
          { top: 480, width: 1100, height: 14, bg: 'linear-gradient(90deg, transparent, #0284C7, #00E5FF, transparent)' },
          { top: 620, width: 750, height: 8, bg: 'linear-gradient(90deg, transparent, #00E5FF, transparent)' },
          { top: 790, width: 920, height: 12, bg: 'linear-gradient(90deg, transparent, #38BDF8, transparent)' },
          { top: 940, width: 540, height: 6, bg: 'linear-gradient(90deg, transparent, #0284C7, transparent)' },
        ].map((item, idx) => (
          <React.Fragment key={idx}>
            {/* Render 2 bản sao lặp vô tận (Infinite wrap) */}
            <div
              style={{
                position: 'absolute',
                top: item.top,
                left: idx * 300,
                width: item.width,
                height: item.height,
                borderRadius: item.height / 2,
                background: item.bg,
                filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.6))',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: item.top,
                left: idx * 300 + 2400,
                width: item.width,
                height: item.height,
                borderRadius: item.height / 2,
                background: item.bg,
                filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.6))',
              }}
            />
          </React.Fragment>
        ))}
      </div>

      {/* TẦNG 2: CÁC KHỐI VUÔNG & KIM CƯƠNG VĂNG TỐC ĐỘ (MID WARP PARTICLES) */}
      <div style={{ position: 'absolute', inset: 0, transform: `translateX(-${midOffset}px)` }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                position: 'absolute',
                top: (i * 75 + 40) % 1080,
                left: i * 180,
                width: i % 2 === 0 ? 16 : 24,
                height: i % 2 === 0 ? 6 : 8,
                borderRadius: 4,
                background: i % 3 === 0 ? '#00E5FF' : '#E0F2FE',
                opacity: 0.7,
                boxShadow: '0 0 8px #00E5FF',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: (i * 75 + 40) % 1080,
                left: i * 180 + 2400,
                width: i % 2 === 0 ? 16 : 24,
                height: i % 2 === 0 ? 6 : 8,
                borderRadius: 4,
                background: i % 3 === 0 ? '#00E5FF' : '#E0F2FE',
                opacity: 0.7,
                boxShadow: '0 0 8px #00E5FF',
              }}
            />
          </React.Fragment>
        ))}
      </div>

      {/* TẦNG 3: VỆT TIA MỜ NỀN PHÍA XA (SLOW AMBIENT STREAKS) */}
      <div style={{ position: 'absolute', inset: 0, transform: `translateX(-${slowOffset}px)` }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: i * 140 + 50,
              left: 0,
              width: 3600,
              height: 1.5,
              background: 'linear-gradient(90deg, transparent, rgba(2, 132, 199, 0.25), rgba(0, 229, 255, 0.4), transparent)',
            }}
          />
        ))}
      </div>
    </div>
  );
};
