import { z } from 'zod';

export const CrabitSmartphone3DMotionSchema = z.object({
  // Isometric base pitch (Prevents 2D flattening - NEVER 0)
  rotXBase: z.number().min(0.12).max(0.28).default(0.15),
  // Bounded safe Y-axis rotation interval
  rotYMin: z.number().min(-0.65).max(-0.40).default(-0.50),
  rotYMax: z.number().min(-0.35).max(-0.15).default(-0.30),
  // Base roll angle
  rotZBase: z.number().min(0.0).max(0.10).default(0.05),
  // Center-left spatial anchor
  anchorX: z.number().min(-0.55).max(-0.25).default(-0.40),
  // Harmonic breathing float limit
  floatAmplitudeY: z.number().min(0.01).max(0.05).default(0.035),
  // Safe Camera frustum
  cameraFOV: z.number().min(38).max(45).default(42),
  cameraZ: z.number().min(4.2).max(5.0).default(4.8),
});

export type CrabitSmartphone3DMotionProps = z.infer<typeof CrabitSmartphone3DMotionSchema>;

export const CrabitSmartphone3DMotionJsonSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'CrabitSmartphone3DMotionSchema',
  description:
    'Rào chắn thông số chuyển động 3D cho Crabit Smartphone. Đảm bảo vật thể luôn giữ khối 3D bề thế và không bao giờ trôi khỏi viewport.',
  type: 'object',
  properties: {
    rotXBase: {
      type: 'number',
      minimum: 0.12,
      maximum: 0.3,
      default: 0.15,
      description: 'Góc nghiêng cơ sở Isometric Pitch X (Chống sập 2D - Tuyệt đối không để về 0)',
    },
    rotYMin: {
      type: 'number',
      minimum: -0.7,
      maximum: -0.4,
      default: -0.5,
      description: 'Biên độ xoay trục Y an toàn tối thiểu (~ -28 độ)',
    },
    rotYMax: {
      type: 'number',
      minimum: -0.35,
      maximum: -0.15,
      default: -0.3,
      description: 'Biên độ xoay trục Y an toàn tối đa (~ -17 độ)',
    },
    rotZBase: {
      type: 'number',
      minimum: 0.0,
      maximum: 0.1,
      default: 0.05,
      description: 'Góc nghiêng viền Roll Z',
    },
    anchorX: {
      type: 'number',
      minimum: -0.55,
      maximum: -0.25,
      default: -0.4,
      description: 'Ghim vị trí Anchor X cố định (1/3 khung hình bên trái)',
    },
    floatAmplitudeY: {
      type: 'number',
      minimum: 0.01,
      maximum: 0.05,
      default: 0.035,
      description: 'Biên độ nhịp thở tối đa trục Y (Micro-float cap)',
    },
    cameraFOV: {
      type: 'number',
      minimum: 38,
      maximum: 45,
      default: 42,
      description: 'Thông số Camera FOV',
    },
    cameraZ: {
      type: 'number',
      minimum: 4.2,
      maximum: 5.0,
      default: 4.8,
      description: 'Thông số Camera Z',
    },
  },
  additionalProperties: false,
} as const;
