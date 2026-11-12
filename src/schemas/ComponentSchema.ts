import { z } from 'zod';

export const ComponentCategoryEnum = z.enum([
  'head',
  'torso',
  'limb',
  'prop',
  'fx',
  'scene_rig',
]);

export const DimensionsSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
});

export const PivotPointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const PivotsSchema = z.record(z.string(), PivotPointSchema);

export const SocketPointSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const SocketsSchema = z.record(z.string(), SocketPointSchema);

export const ImmutableInputsSchema = z.object({
  props_allowed: z.array(z.string()).optional(),
  color_tokens_used: z.array(z.string()).optional(),
});

export const AtomicComponentMetaSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9_]+$/, 'ID must match pattern ^[a-z0-9_]+$'),
  name: z.string().min(1),
  category: ComponentCategoryEnum,
  viewBox: z
    .string()
    .regex(/^0 0 \d+ \d+$/, 'viewBox must match pattern ^0 0 \\d+ \\d+$'),
  dimensions: DimensionsSchema,
  pivots: PivotsSchema.optional(),
  sockets: SocketsSchema.optional(),
  immutable_inputs: ImmutableInputsSchema,
  dependencies: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  version: z.string().default('1.0.0'),
});

export type ComponentCategory = z.infer<typeof ComponentCategoryEnum>;
export type Dimensions = z.infer<typeof DimensionsSchema>;
export type PivotPoint = z.infer<typeof PivotPointSchema>;
export type Pivots = z.infer<typeof PivotsSchema>;
export type SocketPoint = z.infer<typeof SocketPointSchema>;
export type Sockets = z.infer<typeof SocketsSchema>;
export type ImmutableInputs = z.infer<typeof ImmutableInputsSchema>;
export type AtomicComponentMeta = z.infer<typeof AtomicComponentMetaSchema>;

export interface ComponentManifestEntry extends AtomicComponentMeta {
  filePath: string;
  metaPath: string;
}

export const LibraryManifestSchema = z.object({
  generated_at: z.string(),
  total_components: z.number().int().nonnegative(),
  categories: z.record(z.string(), z.number().int().nonnegative()),
  components: z.record(z.string(), z.any()),
});

export type LibraryManifest = z.infer<typeof LibraryManifestSchema>;

/**
 * Hợp đồng dữ liệu chuyển động 3D an toàn cho Crabit Smartphone.
 * Ngăn chặn hoàn toàn hiện tượng sập chiều sâu (2D collapse) và trôi dạt khung hình.
 */
export const CrabitSmartphone3DMotionSchema = z.object({
  // 1. Góc nghiêng Isometric Pitch cơ sở (Bắt buộc >= 0.30 rad để luôn thấy cạnh kim loại)
  rotXBase: z.number().min(0.30).max(0.45).default(0.36),

  // 2. Biên độ xoay trục Y an toàn (Luôn giữ góc nhìn 3/4 để lộ cụm camera & phím bấm)
  rotYMin: z.number().min(-0.65).max(-0.40).default(-0.48),
  rotYMax: z.number().min(-0.35).max(-0.15).default(-0.28),

  // 3. Góc nghiêng Roll trục Z
  rotZBase: z.number().min(0.0).max(0.08).default(0.04),

  // 4. Khóa tâm điểm không gian X (Mặc định tại gốc 0 để không bị văng góc)
  anchorX: z.number().min(-0.1).max(0.1).default(0.0),

  // 5. Tỷ lệ co giãn an toàn (Tránh vượt quá Frustum gây cụt đỉnh/đáy máy)
  scale: z.number().min(0.50).max(0.70).default(0.62),

  // 6. Biên độ nhịp thở tối đa trục Y
  floatAmplitudeY: z.number().min(0.01).max(0.05).default(0.035),

  // 7. Cấu hình Camera an toàn
  cameraFOV: z.number().min(38).max(45).default(40),
  cameraZ: z.number().min(4.5).max(5.5).default(5.0),
});

export type CrabitSmartphone3DMotionProps = z.infer<typeof CrabitSmartphone3DMotionSchema>;

