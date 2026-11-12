import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';

interface Particle {
  id: number;
  spawnFrame: number;
  relX: number; // Tọa độ lệch X
  relY: number; // Tọa độ lệch Y
  size: number;
  type: 'dust' | 'sparkle';
  color: string;
}

export const FxMascotRunTrail: React.FC<{
  isRunning: boolean;
  anchorXPercent: number;
  anchorYPercent: number;
}> = ({ isRunning, anchorXPercent, anchorYPercent }) => {
  const frame = useCurrentFrame();

  // Tạo sẵn 24 hạt phát sinh tuần hoàn theo bước chạy
  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    for (let i = 0; i < 28; i++) {
      const isSparkle = i % 2 === 0;
      list.push({
        id: i,
        spawnFrame: 20 + i * 2.3, // Rải rác từ frame 20 đến 85
        relX: (Math.sin(i * 99) * 20) - 25, // Phụt lùi về phía sau lưng (bên trái)
        relY: 10 + (Math.cos(i * 33) * 12), // Nằm sát chân
        size: isSparkle ? 12 + (i % 8) * 2 : 18 + (i % 10) * 3,
        type: isSparkle ? 'sparkle' : 'dust',
        color: isSparkle ? (i % 4 === 0 ? '#F59E0B' : '#00E5FF') : 'rgba(148, 163, 184, 0.4)',
      });
    }
    return list;
  }, []);

  if (!isRunning && (frame < 20 || frame > 95)) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3,
      }}
    >
      {particles.map((p) => {
        const age = frame - p.spawnFrame;
        if (age < 0 || age > 18) return null; // Vòng đời mỗi hạt là 18 frames

        // Độ mờ tan biến
        const opacity = interpolate(age, [0, 4, 18], [0, 0.9, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        // Độ giãn nở (Bụi nở to ra, Sparkle teo nhỏ lại)
        const scale = p.type === 'dust'
          ? interpolate(age, [0, 18], [0.4, 1.8], {
              easing: Easing.out(Easing.ease),
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          : interpolate(age, [0, 6, 18], [0.2, 1.4, 0.1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

        // Trôi lùi nhẹ về sau khi chú cua lao tới
        const driftX = -age * 3.5;
        const driftY = p.type === 'dust' ? -age * 0.8 : -age * 1.8;

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${anchorXPercent}%`,
              top: `${anchorYPercent}%`,
              transform: `translate(${p.relX + driftX}px, ${p.relY + driftY}px) scale(${scale})`,
              width: p.size,
              height: p.size,
              borderRadius: p.type === 'dust' ? '50%' : '2px',
              backgroundColor: p.color,
              filter: p.type === 'sparkle' ? 'drop-shadow(0 0 8px currentColor)' : 'blur(2px)',
              opacity,
              transformOrigin: 'center center',
            }}
          >
            {/* Tạo hình sao 4 cánh cho Sparkle */}
            {p.type === 'sparkle' && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transform: 'rotate(45deg)',
                  backgroundColor: p.color,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
