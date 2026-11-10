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
  immutable_inputs: ImmutableInputsSchema,
  dependencies: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  version: z.string().default('1.0.0'),
});

export type ComponentCategory = z.infer<typeof ComponentCategoryEnum>;
export type Dimensions = z.infer<typeof DimensionsSchema>;
export type PivotPoint = z.infer<typeof PivotPointSchema>;
export type Pivots = z.infer<typeof PivotsSchema>;
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
