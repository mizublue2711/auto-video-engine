import { spring, SpringConfig } from 'remotion';

export interface SpringPreset {
  damping: number;
  mass: number;
  stiffness: number;
  overshootClamping: boolean;
}

// CÁCH 1 (Khuyên dùng): Bổ sung đầy đủ trường overshootClamping vào từng preset
export const springPresets = {
  snappy: {
    damping: 12,
    mass: 0.8,
    stiffness: 120,
    overshootClamping: false, // cho phép nảy nhẹ (overshoot) chuẩn phong cách Hàn Quốc
  } satisfies SpringConfig,

  smooth: {
    damping: 20,
    mass: 1,
    stiffness: 80,
    overshootClamping: false,
  } satisfies SpringConfig,

  bouncy: {
    damping: 8,
    mass: 0.5,
    stiffness: 160,
    overshootClamping: false,
  } satisfies SpringConfig,
};

export const SPRING_PRESETS = springPresets;

/**
 * Helper to compute standardized spring animation value.
 */
export const createSpring = ({
  frame,
  fps = 30,
  preset = 'snappy',
  delay = 0,
  from = 0,
  to = 1,
}: {
  frame: number;
  fps?: number;
  preset?: keyof typeof springPresets;
  delay?: number;
  from?: number;
  to?: number;
}): number => {
  return spring({
    frame: frame - delay,
    fps,
    config: springPresets[preset],
    from,
    to,
  });
};
