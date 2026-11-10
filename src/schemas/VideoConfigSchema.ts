import { z } from 'zod';

export const PaletteSchema = z.object({
  primary: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
  secondary: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
  accent: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
  background: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
  text: z.string().regex(/^#([0-9a-fA-F]{3}){1,2}$/),
});

export const Scene1ConfigSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  directorDialogue: z.string().optional(),
  studentEmotion: z.enum(['bored', 'frustrated', 'neutral']).default('bored'),
  durationInFrames: z.number().int().positive().default(90),
});

export const Scene2ConfigSchema = z.object({
  headline: z.string(),
  subheadline: z.string(),
  appScreenTitle: z.string(),
  durationInFrames: z.number().int().positive().default(90),
});

export const Scene3ConfigSchema = z.object({
  headline: z.string(),
  studyMetricLabel: z.string(),
  studyMetricValue: z.string(),
  durationInFrames: z.number().int().positive().default(90),
});

export const Scene4ConfigSchema = z.object({
  headline: z.string(),
  cardHolderName: z.string(),
  rewardAmount: z.number().nonnegative(),
  rewardCurrency: z.string().default('CARROT'),
  durationInFrames: z.number().int().positive().default(90),
});

export const VideoConfigSchema = z.object({
  tenantId: z.string(),
  tenantName: z.string(),
  palette: PaletteSchema,
  runtime: z.object({
    fps: z.number().int().positive().default(30),
    width: z.number().int().positive().default(1920),
    height: z.number().int().positive().default(1080),
  }),
  scenes: z.object({
    scene1: Scene1ConfigSchema,
    scene2: Scene2ConfigSchema,
    scene3: Scene3ConfigSchema,
    scene4: Scene4ConfigSchema,
  }),
});

export type VideoConfig = z.infer<typeof VideoConfigSchema>;
export type Palette = z.infer<typeof PaletteSchema>;
