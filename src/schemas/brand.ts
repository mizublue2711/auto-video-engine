import { z } from 'zod';

export const hexColorSchema = z
  .string()
  .regex(/^(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|)$/, 'Must be a valid hex color string (e.g. #FFFFFF or #FFF) or empty');

export const brandSchema = z.object({
  name: z.string().default(''),
  primaryColor: hexColorSchema,
  secondaryColor: hexColorSchema.default(''),
  backgroundColor: hexColorSchema,
  textColor: hexColorSchema.default('#FFFFFF'),
  fontFamily: z.string().default('system-ui, sans-serif'),
  logoUrl: z
    .string()
    .default('https://remotion.dev/img/logo-small.png')
    .refine(
      (val) =>
        typeof val === 'string' &&
        (val === '' ||
          val.startsWith('http://') ||
          val.startsWith('https://') ||
          val.startsWith('data:') ||
          val.startsWith('/') ||
          val.startsWith('./')),
      'logoUrl must be a valid URL string or base64/SVG Data URI'
    ),
});

export type BrandConfig = z.infer<typeof brandSchema>;
