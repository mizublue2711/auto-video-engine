/**
 * ============================================================================
 * 📦 MASTER VISUAL PROPS & ASSETS REGISTRY
 * Single Source of Truth for all Reusable Static / Visual Lego Components
 * ============================================================================
 */

// 1. Study Gear Items (Dụng cụ học tập K-Study)
export { GearTextbook3D } from './study-gear/GearTextbook3D';
export { GearTriangleRuler } from './study-gear/GearTriangleRuler';
export { GearExamPaper100 } from './study-gear/GearExamPaper100';
export { GearSmartCalculator } from './study-gear/GearSmartCalculator';
export { GearTimer3D } from './study-gear/GearTimer3D';
export { GearTablet3D } from './study-gear/GearTablet3D';
export { GearPlanner3D } from './study-gear/GearPlanner3D';
export { GearStylusPen } from './study-gear/GearStylusPen';
export { GearMagnifyingGlass } from './study-gear/GearMagnifyingGlass';
export { GearCompassGeometry } from './study-gear/GearCompassGeometry';

// 2. K-Fintech Cards & Vouchers (Thẻ ngân hàng & Vé thưởng)
export { CouponTicketCard } from './ui/CouponTicketCard';
export { CrabitDebitCard } from './props/CrabitDebitCard';
export { CrabitAppScreenUI } from './ui/CrabitAppScreenUI';

// 3. Vector Icons (Hệ thống icon SVG đồng bộ Brand Tokens)
export {
  IconTargetMission,
  IconCaratDiamond,
  IconFlashQuest,
} from './ui/VectorIcons';

// 4. Spatial Dev Tools
export { SpatialTunerFrame } from './dev/SpatialTunerFrame';

// 5. Dynamic Backgrounds & Warp FX
export {
  HyperspeedWarpBackground,
  type HyperspeedProps,
} from './backgrounds/HyperspeedWarpBackground';

// 6. Showcase Landing Page Components
export {
  Navbar,
  RemotionPlayerFrame,
  StrategicPillars,
  DualTrackPipeline,
  TelemetrySection,
  DeliverablesHub,
  StoryboardFrameModal,
  ContactTransmission,
  ShowcaseLandingPage,
} from './showcase';

/**
 * 🏷️ Component Catalog Metadata (Dành cho AI Worker tra cứu mục đích sử dụng)
 */
export const ASSET_CATALOG = {
  gear: {
    textbook: { name: 'GearTextbook3D', tag: 'Study', desc: 'Sách giáo khoa toán CSAT 3D bìa cứng' },
    ruler: { name: 'GearTriangleRuler', tag: 'Study', desc: 'Thước ê-ke kính mờ thạch anh khắc vạch mm' },
    examPaper: { name: 'GearExamPaper100', tag: 'Study', desc: 'Phiếu thi trắc nghiệm điểm 100 mộc xanh' },
    calculator: { name: 'GearSmartCalculator', tag: 'Study/Fintech', desc: 'Máy tính mini hiển thị số dư Carat' },
    timer: { name: 'GearTimer3D', tag: 'Study', desc: 'Đồng hồ đếm ngược Pomodoro 3D' },
    tablet: { name: 'GearTablet3D', tag: 'Study', desc: 'Máy tính bảng học tập màn hình kính' },
    planner: { name: 'GearPlanner3D', tag: 'Study', desc: 'Sổ kế hoạch học tập Study Planner 3D' },
  },
  ui: {
    couponCard: { name: 'CouponTicketCard', tag: 'Voucher', desc: 'Vé thưởng xé nẹp đục lỗ chuẩn K-Fintech' },
    debitCard: { name: 'CrabitDebitCard', tag: 'Fintech', desc: 'Thẻ ngân hàng bo góc 28px squircle' },
    appScreen: { name: 'CrabitAppScreenUI', tag: 'Mobile', desc: 'Màn hình app 50,000 Carats dùng chung Scene 2 & 3' },
  },
  fx: {
    hyperspeedWarp: {
      name: 'HyperspeedWarpBackground',
      tag: 'Background/FX',
      desc: 'Nền tốc độ cao đa tầng gồm vệt tia pill, hạt warp và vệt mờ parallax',
    },
  },
  showcase: {
    landingPage: {
      name: 'ShowcaseLandingPage',
      tag: 'Showcase/Web',
      desc: 'Master Showcase Landing Page for Crabit Korea Video-as-Code Automation',
    },
    playerFrame: {
      name: 'RemotionPlayerFrame',
      tag: 'Showcase/Player',
      desc: 'Embedded Remotion Player with ambient glow, telemetry HUD & composition selector',
    },
  },
} as const;
