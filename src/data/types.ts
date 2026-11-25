// src/data/types.ts

export type SupportedLang = 'vi' | 'kr' | 'en';

export interface SceneCutDetail {
  cutNumber: string;        // "CUT 01"
  frameRange: string;       // "Frame 0 - 120 (0.0s – 5.0s)"
  title: Record<SupportedLang, string>;
  visualPrompt: string;     // Mô tả AI Plate / 3D Space
  koreanDialogue: string;   // Lời thoại tiếng Hàn
  translation: Record<SupportedLang, string>;
  remotionPhysics: string;  // Motion tokens / Spring / Shaders
}

export interface ProductionBlueprintScene {
  id: string;               // '01', '02', ...
  tabLabel: string;         // 'SCENE 1', 'PHA 1', 'CUT 01'
  phaseTag: Record<SupportedLang, string>;
  title: Record<SupportedLang, string>;
  timecode: string;         // '000 – 120 (5.0s @ 24fps)'
  plateImageUrl: string;    // '/storyboard/Crabit/1.svg' or '/assets/chai/storyboard/plate_01.png'
  ratioTag?: string;        // 'RATIO: 16:9 WIDESCREEN' or 'RATIO: 9:16 VERTICAL'
  sourceTag?: string;       // 'AUTO-VIDEO-ENGINE / ANIMATIC' or 'GENIE 4 / CLEAN PLATE'

  // Specification Cards (Right Column)
  voiceover: {
    vn?: string;
    kr?: string;
    en?: string;
  };
  visualActing: Record<SupportedLang, string>;
  motionSpecs: Record<SupportedLang, string>;
  audioSfxCue: Record<SupportedLang, string>;
  depthPerspective?: Record<SupportedLang, string>;
}

export interface LegoComponentItem {
  name: string;             // "ChaiTopBanner.tsx" hoặc "CrabitSmartphone3D.tsx"
  category: '3D Mesh' | 'Kinetic UI' | 'HUD' | 'Audio/Adapter';
  role: Record<SupportedLang, string>;
  techStack: string;        // "Three.js PBR" / "Remotion Spring"
}

export interface ComparisonRow {
  criteria: Record<SupportedLang, string>;
  traditionalAe: string;    // Phương pháp After Effects truyền thống
  videoAsCode: string;      // Phương pháp Video-as-Code
}

export interface StrategicPillar {
  id: string;
  category: Record<SupportedLang, string>;
  title: Record<SupportedLang, string>;
  description: Record<SupportedLang, string>;
  checkpoints: Record<SupportedLang, string[]>;
}

export interface CharacterCastRigSpec {
  structure: string;
  metrics: string;
  ratioBreakdown: string;
  groundContact: string;
}

export interface CharacterCastRig {
  id: string;
  name: Record<SupportedLang, string>;
  roleTag: Record<SupportedLang, string>;
  fileName: string;
  fileSize: string;
  ratio: string;
  svgUrl: string;
  viewBox?: string;
  specs: Record<SupportedLang, CharacterCastRigSpec>;
}

export interface ProjectComprehensive {
  // ─── KHỐI 1: ĐỊNH DANH & HERO IDENTITY ───
  id: string;               // 'chai-meritz-2611' | 'crabit-korea'
  title: string;
  client: string;
  categoryBadge: string;    // 'K-DRAMA PERFORMANCE AD (AI VIDEO-AS-CODE)' | 'K-FINTECH 3D'
  themeColor: string;       // '#FF6B00' | '#00E5FF'
  aspectRatio: '16:9' | '9:16' | '1:1';
  tagline: Record<SupportedLang, string>;
  heroSummary: Record<SupportedLang, string>;

  // ─── KHỐI 2: VIDEO ENGINE & TELEMETRY ───
  video: {
    type: 'remotion-comp' | 'mp4-direct';
    compName?: string;
    mp4Url: string;
    mp4SquareUrl?: string;
    durationInFrames: number;
    fps: number;
  };
  telemetry: {
    fps: number;
    totalFrames: number;
    renderTime: string;
    resolution: string;
    audioSpec: string;
    linesOfCode: number;
  };

  // ─── KHỐI 3: BA TRỤ CỘT CHIẾN LƯỢC (STRATEGIC PILLARS) ───
  strategicPillars?: StrategicPillar[];

  // ─── KHỐI 4: BỘ NHÂN VẬT CHÍNH & THÔNG SỐ RIGGING (CHARACTER CAST RIGS) ───
  characterCastRigs?: CharacterCastRig[];

  // ─── KHỐI 5: DUAL-TRACK ARCHITECTURE (CƠ CHẾ KÉP) ───
  architecture: {
    visualTrack: {
      tool: string;
      role: Record<SupportedLang, string>;
    };
    codeTrack: {
      tool: string;
      role: Record<SupportedLang, string>;
    };
    guardrails: string[];
  };

  // ─── KHỐI 6: STORYBOARD & SCENE MATRIX (MA TRẬN CẢNH) ───
  sceneMatrix: SceneCutDetail[];
  productionBlueprint?: {
    sectionTitle: Record<SupportedLang, string>;
    subtitle: Record<SupportedLang, string>;
    pdfLabel: Record<SupportedLang, string>;
    scenes: ProductionBlueprintScene[];
  };

  // ─── KHỐI 7: LEGO COMPONENT REGISTRY (KHO LINH KIỆN) ───
  components: LegoComponentItem[];

  // ─── KHỐI 8: BUSINESS COMPARISON MATRIX (SO SÁNH GIÁ TRỊ) ───
  comparison: ComparisonRow[];

  // ─── KHỐI 9: DELIVERABLES HUB (TÀI NGUYÊN BÀN GIAO) ───
  downloads: {
    storyboardPdf?: string;
    assetsZip?: string;
    mp4Master: string;
    mp4Square?: string;
    aeTrapConfig: {
      title: Record<SupportedLang, string>;
      bodyText: Record<SupportedLang, string>;
      hireUrl: string;
    };
  };

  // ─── KHỐI 10: CLI REPRODUCTION SNIPPET (LỆNH REPRODUCE) ───
  cliCommand: string;
}
