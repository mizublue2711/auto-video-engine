/**
 * ============================================================================
 * 🎬 MASTER MOTION LEGO CONTROLLER REGISTRY
 * Pure Motion Wrappers (Zero visual styles, 100% Math & Physics Interpolation)
 * ============================================================================
 */

// 1. Entrance & Exit Springs
export { SpringBurstWrapper } from './SpringBurstWrapper';
export { KineticStaggerWrapper } from './KineticStaggerWrapper';

// 2. Trajectory & Positional Choreography
export { OrbitalSwapWrapper } from './OrbitalSwapWrapper';
export { VortexSuckWrapper } from './VortexSuckWrapper';

// 3. Ambient & Spatial Breathing
export { ZeroGFloatWrapper } from './ZeroGFloatWrapper';
export { SpatialCameraDolly } from './SpatialCameraDolly';

/**
 * 📐 Motion Signature Metadata (Hướng dẫn AI phối ghép các lớp bọc Wrapper)
 */
export const MOTION_CATALOG = {
  SpringBurstWrapper: 'Đẩy vật thể bung lò xo từ tâm (origin) ra tọa độ đích (target)',
  OrbitalSwapWrapper: 'Hoán đổi vị trí từ A -> B theo đường cong Bezier Arc kèm góc nghiêng 3D',
  VortexSuckWrapper: 'Xoáy ốc và gia tốc thu nhỏ vật thể về 0 hút vào tâm portal',
  ZeroGFloatWrapper: 'Lắc lư dập dềnh không trọng lực tự nhiên bằng sóng Sin/Cos',
  KineticStaggerWrapper: 'Hiệu ứng xuất hiện tầng bậc (Cascade delay) cho thẻ và tiêu đề',
  SpatialCameraDolly: 'Cú máy đẩy tới (Cinematic push-in) và trôi nhẹ (parallax pan)',
} as const;
