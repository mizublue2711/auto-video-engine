import { z } from 'zod';

export const ChaiCutSchema = z.object({
  id: z.string(),
  videoPath: z.string(),
  audioPath: z.string(),
  durationInFrames: z.number().int().positive(),
  subtitleText: z.string(),
  speaker: z.string().optional(),
  badgeText: z.string().optional(),
});

export const ChaiStorySchema = z.object({
  fps: z.literal(24).default(24),
  width: z.literal(1080).default(1080),
  height: z.literal(1920).default(1920),
  totalDurationInFrames: z.literal(720).default(720),
  topBannerText: z.string().default('150만원 소문에 장터가 뒤집혔다'),
  cuts: z.array(ChaiCutSchema),
});

export type ChaiCutConfig = z.infer<typeof ChaiCutSchema>;
export type ChaiStoryConfig = z.infer<typeof ChaiStorySchema>;
