import { z } from 'zod';
import { brandSchema } from './brand';

export const StudyGearConvergenceSchema = z.object({
  brand: brandSchema.default({
    name: 'CRABIT KOREA',
    primaryColor: '#00E5FF',
    backgroundColor: '#070D1E',
  }),
  title: z.string().default('K-STUDY GEARS CONVERGENCE'),
  subtitle: z.string().default('AUTONOMOUS HARMONIC ORBIT & VORTEX'),
  backgroundColor: z.string().default('#070D1E'),
  
  // Phase 1 Motion: Spring Burst Tuning
  springStiffness: z.number().min(30).max(200).step(5).default(85),
  springDamping: z.number().min(5).max(30).step(1).default(13),
  burstStartFrame: z.number().min(0).max(60).step(1).default(10),

  // Phase 2 Motion: Orbital Arc Swap Tuning
  swapStartFrame: z.number().min(30).max(120).step(1).default(55),
  swapDuration: z.number().min(20).max(90).step(1).default(45),
  arcHeight: z.number().min(-200).max(200).step(5).default(60),
  arcCurvature: z.number().min(20).max(200).step(5).default(85).optional(),

  // Phase 3 Motion: Vortex Convergence Tuning
  vortexStartFrame: z.number().min(80).max(200).step(1).default(120),
  vortexDuration: z.number().min(20).max(80).step(1).default(45),
  spiralRevolutions: z.number().min(0.5).max(4.0).step(0.5).default(1.5),

  // Continuous Floating Tuning
  zeroGAmplitudeX: z.number().min(0).max(25).step(1).default(8),
  zeroGAmplitudeY: z.number().min(0).max(30).step(1).default(14),
  zeroGAmplitudeRotate: z.number().min(0).max(15).step(0.5).default(3.5),

  // Visual Overlays
  showHUD: z.boolean().default(true),
  showCenterVortexGlow: z.boolean().default(true),
});

export type StudyGearConvergenceProps = z.infer<typeof StudyGearConvergenceSchema>;
