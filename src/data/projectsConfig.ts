// src/data/projectsConfig.ts

export type SupportedLang = 'vi' | 'kr' | 'en';

export interface ProjectMetadata {
  id: string;
  title: string;
  client: string;
  badge: string;
  genre: string;
  themeColor: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  tagline: Record<SupportedLang, string>;
  description: Record<SupportedLang, string>;

  video: {
    type: 'remotion-comp' | 'mp4-direct';
    compName?: string;
    mp4Url: string;
    mp4SquareUrl?: string; // Bản 1:1 In-Feed / Kakao
    durationInFrames: number;
    fps: number;
  };

  downloads: {
    storyboardPdf?: string;
    keyframeStillsZip?: string;
    mp4Vertical: string;
    mp4Square?: string;
    hasAeTrapModal: boolean;
  };

  telemetry: {
    fps: number;
    totalFrames: number;
    durationSeconds: number;
    resolution: string;
    audioStandard: string;
    engine: string;
  };
}

export const SHOWCASE_PROJECTS: ProjectMetadata[] = [
  // ─── DỰ ÁN 1: CRABIT KOREA ───────────────────────────────────────────
  {
    id: 'crabit-korea',
    title: 'Crabit Korea Commercial',
    client: 'Crabit Korea',
    badge: 'K-FINTECH 3D',
    genre: 'Commercial Motion Graphics',
    themeColor: '#00E5FF',
    aspectRatio: '16:9',
    tagline: {
      vi: 'Hệ thống Video-as-Code thương mại K-Fintech chuẩn 60FPS tất định.',
      kr: '완벽한 60FPS 결정론적 K-핀테크 비디오-as-코드 상용 엔진.',
      en: 'Deterministic 60FPS K-Fintech commercial Video-as-Code engine.',
    },
    description: {
      vi: 'Từ 4 dòng kịch bản sơ sài đến quy trình hoàn chỉnh: Khóa tỷ lệ nhân vật học sinh, Mascot Cua Kim Cương và giao diện Toss style.',
      kr: '단 4줄의 러프 기획안에서 완벽한 자동화 영상으로: 대치동 수능 맥락, 다이아몬드 캐럿 크랩 마스코트 및 토스 스타일 UI.',
      en: 'From 4 rough script lines to a complete pipeline: Daechi-dong student context, Diamond Carat Crab mascot, and Toss-style UI.',
    },
    video: {
      type: 'remotion-comp',
      compName: 'MasterCompositeScene',
      mp4Url: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Crabit/Crabit_Korea_Commercial_1080p.mp4',
      durationInFrames: 5400,
      fps: 30,
    },
    downloads: {
      storyboardPdf: '/downloads/crabit/Crabit_Storyboard_Master.pdf',
      keyframeStillsZip: '/downloads/crabit/Crabit_Lego_Assets_SVG.zip',
      mp4Vertical: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Crabit/Crabit_Korea_Commercial_1080p.mp4',
      hasAeTrapModal: true,
    },
    telemetry: {
      fps: 60,
      totalFrames: 1800,
      durationSeconds: 30,
      resolution: '1920x1080 (16:9)',
      audioStandard: 'Stereo AAC 48kHz',
      engine: 'Remotion + React + Three.js',
    },
  },

  // ─── DỰ ÁN 2: CHAI COMMUNICATION × MERITZ PARTNERS (PROJECT 2611) ────
  {
    id: 'chai-meritz-2611',
    title: 'Chai Communication × Meritz Partners',
    client: 'Chai Communication (KOSDAQ)',
    badge: 'K-DRAMA PERFORMANCE AD',
    genre: 'AI Short Drama Performance Ad',
    themeColor: '#F97316', // Cam Hổ Phách nhận diện linh thú Meri
    aspectRatio: '9:16',
    tagline: {
      vi: '150만원 소문에 장터가 뒤집혔다 — Tự động hóa video kịch ngắn cổ trang với Genie 4 + Remotion.',
      kr: '150만원 소문에 장터가 뒤집혔다 — 지니4와 리모션 결합형 숏드라마 퍼포먼스 광고.',
      en: 'Joseon marketplace shaken by 1.5M KRW rumor — K-Drama Performance Ad with Genie 4 + Remotion.',
    },
    description: {
      vi: 'Kiến trúc kép phân tách tuyệt đối: Genie 4 xử lý 5 phân cảnh điện ảnh cổ trang sạch chữ, Remotion điều phối phụ đề nảy chữ Kinetic, Top Sticky News Banner và chuẩn âm thanh EBU R128.',
      kr: '이중 트랙 아키텍처: 지니4 기반 5개 클린 시네마 플레이트 생성 및 리모션 결정론적 키네틱 자막, 상단 스티키 뉴스 배너, EBU R128 오디오 마스터링.',
      en: 'Dual-track architecture: Genie 4 clean cinema plates combined with Remotion deterministic kinetic subtitles, top sticky news banner, and EBU R128 audio mastering.',
    },
    video: {
      type: 'mp4-direct',
      mp4Url: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Chai%20Korea/Chai_Communication_Meritz_Partners_24fps_v2.mp4',
      mp4SquareUrl: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Chai%20Korea/Chai_Communication_Meritz_Partners_1x1_24fps.mp4',
      durationInFrames: 720,
      fps: 24,
    },
    downloads: {
      storyboardPdf: '/downloads/chai/Meritz_Partners_5Cut_Timeline_Spec.pdf',
      keyframeStillsZip: '/downloads/chai/Meritz_Keyframe_Stills_Cuts1_5.zip',
      mp4Vertical: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Chai%20Korea/Chai_Communication_Meritz_Partners_24fps_v2.mp4',
      mp4Square: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Chai%20Korea/Chai_Communication_Meritz_Partners_1x1_24fps.mp4',
      hasAeTrapModal: true,
    },
    telemetry: {
      fps: 24,
      totalFrames: 720,
      durationSeconds: 30.0,
      resolution: '1080x1920 (9:16) & 1080x1080 (1:1)',
      audioStandard: 'EBU R128 (-19.8 dB Integrated)',
      engine: 'Google Studio (Genie 4) + Remotion Engine',
    },
  },
];
