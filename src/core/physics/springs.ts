import { spring, SpringConfig } from 'remotion';

export interface SpringPreset {
  damping: number;
  mass: number;
  stiffness: number;
  overshootClamping?: boolean;
}

/**
 * Pre-tuned spring physics presets tailored for high-energy commercial motion graphics.
 */
export const SPRING_PRESETS = {
  /**
   * Snappy / Pop-up: Ideal for UI cards, device reveals, and character pop-ins.
   * Delivers ~10% overshoot for responsive Korean commercial feel.
   */
  snappy: {
    damping: 12,
    mass: 0.8,
    stiffness: 120,
    overshootClamping: false,
  } as const satisfies SpringConfig,

  /**
   * Smooth Morph: Ideal for layout refits, scene transitions, and subtle camera zooms.
   */
  smooth: {
    damping: 20,
    mass: 1,
    stiffness: 80,
    overshootClamping: false,
  } as const satisfies SpringConfig,

  /**
   * Bouncy: Exaggerated bounce for particle bursts, coins, and playful UI elements.
   */
  bouncy: {
    damping: 8,
    mass: 0.5,
    stiffness: 160,
    overshootClamping: false,
  } as const satisfies SpringConfig,
};

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
  preset?: keyof typeof SPRING_PRESETS;
  delay?: number;
  from?: number;
  to?: number;
}): number => {
  return spring({
    frame: frame - delay,
    fps,
    config: SPRING_PRESETS[preset],
    from,
    to,
  });
};
