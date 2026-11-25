// src/data/projectsConfig.ts

export type SupportedLang = 'vi' | 'kr' | 'en';

export interface SceneCutDetail {
  cutNumber: string;        // "CUT 01"
  frameRange: string;       // "Frames 0 - 120 (5.0s)"
  title: Record<SupportedLang, string>;
  visualPrompt: string;     // Mô tả AI Plate / 3D Space
  koreanDialogue: string;   // Lời thoại tiếng Hàn
  translation: Record<SupportedLang, string>;
  remotionPhysics: string;  // Motion tokens / Spring / Shaders
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
  category: string;
  title: string;
  description: string;
  checkpoints: string[];
}

export interface CharacterCastRig {
  id: string;
  fileName: string;
  fileSize: string;
  name: string;
  roleTag: string;
  ratio: string;
  svgUrl: string;
  viewBox?: string;
  details?: {
    leftSide: string;
    rightSide: string;
    heightMetric: string;
    ratioBreakdown: string;
    groundContact: string;
  };
}

export interface ProjectComprehensive {
  // ─── KHỐI 1: ĐỊNH DANH & HERO IDENTITY ───
  id: string;               // 'crabit-korea' | 'chai-meritz-2611'
  title: string;
  client: string;
  categoryBadge: string;    // 'K-FINTECH 3D' | 'K-DRAMA PERFORMANCE AD'
  themeColor: string;       // '#00E5FF' | '#F97316'
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
    audioSpec: string;     // 'EBU R128 (-19.8 dB)' | 'Stereo AAC 48kHz'
    linesOfCode: number;
  };

  // ─── KHỐI 3: DUAL-TRACK ARCHITECTURE (CƠ CHẾ KÉP) ───
  architecture: {
    visualTrack: {
      tool: string;         // "Google Flow / Three.js" | "Google Studio Genie 4"
      role: Record<SupportedLang, string>;
    };
    codeTrack: {
      tool: string;         // "Remotion Engine"
      role: Record<SupportedLang, string>;
    };
    guardrails: string[];   // ["AGENT.md Rules", "Zod Contract", "Pretendard delayRender"]
  };

  // ─── KHỐI 4: STORYBOARD & SCENE MATRIX (MA TRẬN CẢNH) ───
  sceneMatrix: SceneCutDetail[];

  // ─── KHỐI 5: LEGO COMPONENT REGISTRY (KHO LINH KIỆN) ───
  components: LegoComponentItem[];

  // ─── KHỐI 6: BUSINESS COMPARISON MATRIX (SO SÁNH GIÁ TRỊ) ───
  comparison: ComparisonRow[];

  // ─── KHỐI 7: DELIVERABLES HUB (TÀI NGUYÊN BÀN GIAO) ───
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

  // ─── KHỐI 8: CLI REPRODUCTION SNIPPET (LỆNH REPRODUCE) ───
  cliCommand: string;

  // ─── KHỐI 9 & 10: STRATEGIC PILLARS & CHARACTER CAST RIGS ───
  strategicPillars?: StrategicPillar[];
  characterCastRigs?: CharacterCastRig[];
}

export const CRABIT_PROJECT: ProjectComprehensive = {
  // KHỐI 1: IDENTITY
  id: 'crabit-korea',
  title: 'Crabit Korea Commercial',
  client: 'Crabit Korea',
  categoryBadge: 'K-FINTECH 3D',
  themeColor: '#00E5FF',
  aspectRatio: '16:9',
  tagline: {
    vi: 'Hệ thống Video-as-Code thương mại K-Fintech chuẩn 60FPS tất định.',
    kr: '완벽한 60FPS 결정론적 K-핀테크 비디오-as-코드 상용 엔진.',
    en: 'Deterministic 60FPS K-Fintech commercial Video-as-Code engine.',
  },
  heroSummary: {
    vi: 'Từ 4 dòng kịch bản sơ sài đến quy trình hoàn chỉnh: Khóa tỷ lệ nhân vật học sinh, Mascot Cua Kim Cương và giao diện Toss style.',
    kr: '단 4줄의 러프 기획안에서 완벽한 자동화 영상으로: 대치동 수능 맥락, 다이아몬드 캐럿 크랩 마스코트 및 토스 스타일 UI.',
    en: 'From 4 rough script lines to a complete pipeline: Daechi-dong student context, Diamond Carat Crab mascot, and Toss-style UI.',
  },

  // KHỐI 2: TELEMETRY
  video: {
    type: 'remotion-comp',
    compName: 'MasterCompositeScene',
    mp4Url: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Crabit/Crabit_Korea_Commercial_1080p.mp4',
    durationInFrames: 5400,
    fps: 30,
  },
  telemetry: {
    fps: 60,
    totalFrames: 1800,
    renderTime: '4m 12s',
    resolution: '1920x1080 (16:9)',
    audioSpec: 'Stereo AAC 48kHz',
    linesOfCode: 2480,
  },

  // KHỐI 3: DUAL-TRACK ARCHITECTURE
  architecture: {
    visualTrack: {
      tool: 'Google Flow / Three.js PBR',
      role: {
        vi: 'Dựng không gian 3D smartphone, vật liệu kim cương và bối cảnh học sinh Daechi-dong.',
        kr: '3D 스마트폰 공간, 다이아몬드 재질 및 대치동 학생 배경 렌더링.',
        en: '3D smartphone space, diamond PBR materials, and Daechi-dong student context plates.',
      },
    },
    codeTrack: {
      tool: 'Remotion Engine + React',
      role: {
        vi: 'Điều phối chuyển động 60FPS tất định, HUD Toss-style và đồng bộ Zod schema.',
        kr: '결정론적 60FPS 모션 제어, 토스 스타일 HUD 및 Zod 스키마 동기화.',
        en: 'Deterministic 60FPS motion orchestration, Toss-style HUD, and Zod schema binding.',
      },
    },
    guardrails: [
      'AGENT.md Strict Type & Layout Rules',
      'Zod Contract Validation',
      'Pretendard Font delayRender() Lock',
    ],
  },

  // KHỐI 4: SCENE MATRIX
  sceneMatrix: [
    {
      cutNumber: 'CUT 01',
      frameRange: 'Frame 0 - 300 (5.0s)',
      title: {
        vi: 'Bối Cảnh Áp Lực Daechi-dong',
        kr: '대치동 수험생의 압박감',
        en: 'Daechi-dong Study Pressure',
      },
      visualPrompt: 'Học sinh Hàn Quốc ngồi bàn học ban đêm với đèn bàn và sách vở ôn thi Suneung.',
      koreanDialogue: '수능까지 D-100, 집중력이 무너지는 순간...',
      translation: {
        vi: 'Còn 100 ngày nữa là thi Suneung, khoảnh khắc sự tập trung sụp đổ...',
        kr: '수능까지 D-100, 집중력이 무너지는 순간...',
        en: 'D-100 to Suneung, the moment focus breaks down...',
      },
      remotionPhysics: 'Camera push-in mượt với interpolate() + HUD đếm ngược D-100.',
    },
    {
      cutNumber: 'CUT 02',
      frameRange: 'Frame 300 - 900 (10.0s)',
      title: {
        vi: 'Xuất Hiện Mascot Cua Kim Cương',
        kr: '다이아몬드 캐럿 크랩 등장',
        en: 'Diamond Carat Crab Reveal',
      },
      visualPrompt: 'Smartphone 3D xoay góc nghiêng, Mascot Cua Kim Cương bước ra trên nền lưới cyan.',
      koreanDialogue: '크래빗과 함께라면 공부도 게임처럼!',
      translation: {
        vi: 'Cùng Crabit, việc học cũng thú vị như chơi game!',
        kr: '크래빗과 함께라면 공부도 게임처럼!',
        en: 'With Crabit, studying feels like a game!',
      },
      remotionPhysics: 'Three.js PBR rotation + Remotion spring({ damping: 12, stiffness: 140 }).',
    },
    {
      cutNumber: 'CUT 03',
      frameRange: 'Frame 900 - 1800 (15.0s)',
      title: {
        vi: 'Hội Tụ Dữ Liệu & Thẻ Kết CTA',
        kr: '데이터 수렴 및 엔딩 CTA',
        en: 'Data Convergence & Outro CTA',
      },
      visualPrompt: 'Các thẻ thành tích Toss-style hội tụ về logo Crabit Korea phát sáng.',
      koreanDialogue: '지금 바로 크래빗을 시작하세요.',
      translation: {
        vi: 'Bắt đầu cùng Crabit ngay hôm nay.',
        kr: '지금 바로 크래빗을 시작하세요.',
        en: 'Start with Crabit today.',
      },
      remotionPhysics: 'Multi-layer parallax convergence + CTA pulse glow.',
    },
  ],

  // KHỐI 5: COMPONENT REGISTRY
  components: [
    {
      name: 'CrabitSmartphone3D.tsx',
      category: '3D Mesh',
      role: {
        vi: 'Mô hình điện thoại 3D xoay theo góc máy tất định với ánh sáng PBR.',
        kr: '결정론적 카메라 각도와 PBR 조명이 적용된 3D 스마트폰 모델.',
        en: 'Deterministic 3D smartphone mesh with PBR studio lighting.',
      },
      techStack: 'Three.js + React Three Fiber',
    },
    {
      name: 'TossStyleHUD.tsx',
      category: 'HUD',
      role: {
        vi: 'Hệ thống thẻ thông báo và biểu đồ tiến độ học tập phong cách Fintech Hàn Quốc.',
        kr: '한국 핀테크 스타일의 학습 진도 및 알림 HUD 카드.',
        en: 'Korean Fintech-style progress cards and notification HUD.',
      },
      techStack: 'Tailwind + Remotion Spring',
    },
    {
      name: 'MasterCompositeScene.tsx',
      category: 'Kinetic UI',
      role: {
        vi: 'Trình điều phối tổng thể nối các phân cảnh 3D và UI theo trục thời gian.',
        kr: '3D 씬과 UI 레이어를 타임라인에 맞춰 통합 제어하는 마스터 컴포지션.',
        en: 'Master timeline orchestrator combining 3D scenes and UI layers.',
      },
      techStack: 'Remotion Sequence & Transition',
    },
  ],

  // KHỐI 6: COMPARISON MATRIX
  comparison: [
    {
      criteria: {
        vi: 'Cập nhật số liệu & nội dung',
        kr: '데이터 및 텍스트 수정',
        en: 'Data & Copy Updates',
      },
      traditionalAe: 'Mở file .AEP, tìm từng pre-comp và sửa tay (1-2 tiếng)',
      videoAsCode: 'Cập nhật Zod JSON config, tự động render lại (5 giây)',
    },
    {
      criteria: {
        vi: 'Đồ họa 3D & UI đồng bộ',
        kr: '3D 그래픽 및 UI 동기화',
        en: '3D & UI Synchronization',
      },
      traditionalAe: 'Render 3D riêng từ Blender/C4D rồi compositing thủ công',
      videoAsCode: 'Three.js chạy trực tiếp trong React frame-by-frame',
    },
    {
      criteria: {
        vi: 'Kiểm soát phiên bản (Git)',
        kr: '버전 관리 (Git)',
        en: 'Version Control (Git)',
      },
      traditionalAe: 'File nhị phân nặng, khó diff và merge giữa nhiều người',
      videoAsCode: '100% TypeScript code, diff/review qua Pull Request',
    },
  ],

  // KHỐI 7: DOWNLOADS & POPUP
  downloads: {
    storyboardPdf: '/downloads/crabit/Crabit_Storyboard_Master.pdf',
    assetsZip: '/downloads/crabit/Crabit_Lego_Assets_SVG.zip',
    mp4Master: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Crabit/Crabit_Korea_Commercial_1080p.mp4',
    aeTrapConfig: {
      title: {
        vi: 'BẠN MUỐN DỰNG THỦ CÔNG VIDEO 3D FINTECH NÀY BẰNG AFTER EFFECTS?',
        kr: '이 3D 핀테크 영상을 애프터 이펙트로 직접 수작업 하시겠습니까?',
        en: 'WANT TO HAND-BUILD THIS 3D FINTECH VIDEO IN AFTER EFFECTS?',
      },
      bodyText: {
        vi: 'Hệ thống Crabit kết hợp Three.js và Remotion giúp tái sử dụng component và đổi dữ liệu trong vài giây. Làm thủ công sẽ mất nhiều ngày!',
        kr: '크래빗 시스템은 Three.js와 Remotion을 결합하여 컴포넌트 재사용 및 데이터 교체를 몇 초 만에 처리합니다.',
        en: 'Crabit combines Three.js and Remotion for instant component reuse and data updates in seconds. Manual work takes days!',
      },
      hireUrl: 'mailto:mizu2711@gmail.com?subject=[CRABIT OFFER] Yêu cầu dựng thủ công bằng After Effects (.AEP)',
    },
  },

  // KHỐI 8: CLI REPRODUCTION
  cliCommand: 'npx remotion render src/index.ts MasterCompositeScene out/Crabit_1080p.mp4 --gl=angle',

  // 1. Khối 3 Trụ Cột Chiến Lược (Strategic Pillars)
  strategicPillars: [
    {
      id: '01',
      category: 'HỆ THỐNG THIẾT KẾ',
      title: 'Brand Identity Foundry',
      description: 'Chuẩn hóa bảng màu K-Fintech pastel & dark squircle, thiết kế UI/UX ứng dụng Crabit mô phỏng chuẩn xác Toss & KakaoBank.',
      checkpoints: [
        'Hệ phông Pretendard Hàn Quốc chuẩn mực (Tracking -0.02em)',
        'Bảng màu Toss Blue (#3182F6) & Ngọc Lục Bảo Carat (#10B981)',
        'Vết cắt cơ học 45° CAD Chisel & Phản hồi xúc giác UI'
      ],
    },
    {
      id: '02',
      category: 'RIGGING & TÍNH LIỀN MẠCH',
      title: 'Character & Context Locking',
      description: 'Khóa cứng tỷ lệ cơ thể nhân vật học sinh Hàn Quốc, loại bỏ triệt để asset rác và duy trì tính liền mạch trong bối cảnh lớp học Hagwon.',
      checkpoints: [
        'Bộ Rigging Vector 2D tháo rời chuẩn mực (Đầu/Thân/Tứ chi)',
        'Hình chiếu phối cảnh không trôi lệch tọa độ theo thời gian',
        'Vùng biên an toàn 80px Safe Margin không bao giờ bị cắt mép'
      ],
    },
    {
      id: '03',
      category: 'LINH VẬT & BIỂU TƯỢNG',
      title: 'Mascot Engineering (Chú Cua Crabit)',
      description: 'Chơi chữ Crabit -> Cua với hai càng giơ cao biểu trưng cho học sinh tích cực phát biểu; thân hình ma trận code & kim cương biểu trưng Carat học bổng.',
      checkpoints: [
        'Hai càng giơ cao = Sự tự tin chủ động phát biểu trong lớp',
        'Mặt cắt kim cương = Carat học bổng tích lũy sau mỗi bài học',
        'Truyền mã SVG trực tiếp vào Three.js với vật lý phản xạ sáng'
      ],
    }
  ],

  // 2. Khối Bộ Ba Nhân Vật (Canonical Character Cast Rigs)
  characterCastRigs: [
    {
      id: 'student',
      fileName: 'char_student.svg',
      fileSize: '23.8 KB',
      name: 'Nhân Vật Học Sinh',
      roleTag: 'NHÂN VẬT TRUNG TÂM (PROTAGONIST)',
      ratio: '1 : 6',
      svgUrl: '/assets/crabit/char_student.svg',
      viewBox: '0 0 1000 900',
      details: {
        leftSide: 'Nửa trái (Front View): <g id="view-student-front"> [x: 0-500, Tâm: 250, Chân tiếp đất: 850]',
        rightSide: 'Nửa phải (Walk Stride): <g id="view-student-walk"> [x: 500-1000, Tâm: 750, Chân tiếp đất: 850]',
        heightMetric: 'Chiều cao chuẩn: 700px (Đỉnh y: 150 -> Tiếp đất y: 850 đồng bộ 100%)',
        ratioBreakdown: 'Tỷ lệ đầu:thân (1:6) [Đầu: 115px | Thân áo: 255px | Chân quần: 280px | Giày: 50px]',
        groundContact: 'Tiếp đất toàn cục: y: 850 (Ellipse bóng sàn #0F172A opacity 0.45)'
      }
    },
    {
      id: 'mascot',
      fileName: 'mascot_crabit_carat_crystal.svg',
      fileSize: '16.3 KB',
      name: 'Chú Cua Linh Vật Carat',
      roleTag: 'LINH VẬT THƯƠNG HIỆU (BRAND MASCOT)',
      ratio: 'Khối kim cương',
      svgUrl: '/assets/crabit/mascot_crabit_carat_crystal.svg',
    },
    {
      id: 'director',
      fileName: 'char_director_master.svg',
      fileSize: '29.2 KB',
      name: 'Thầy Giáo Viện Trưởng',
      roleTag: 'NGƯỜI HƯỚNG DẪN UY TÍN (CHIEF MENTOR)',
      ratio: '1 : 7.2',
      svgUrl: '/assets/crabit/char_director_master.svg',
    }
  ],
};

export const CHAI_MERITZ_PROJECT: ProjectComprehensive = {
  // KHỐI 1: IDENTITY
  id: 'chai-meritz-2611',
  title: 'Chai Communication × Meritz Partners',
  client: 'Chai Communication (KOSDAQ)',
  categoryBadge: 'K-DRAMA PERFORMANCE AD',
  themeColor: '#F97316',
  aspectRatio: '9:16',
  tagline: {
    vi: '150만원 소문에 장터가 뒤집혔다 — Tự động hóa video kịch ngắn cổ trang với Genie 4 + Remotion.',
    kr: '150만원 소문에 장터가 뒤집혔다 — 지니4와 리모션 결합형 숏드라마 퍼포먼스 광고.',
    en: '150M KRW rumor shakes Joseon marketplace — Short drama ad powered by Genie 4 & Remotion.',
  },
  heroSummary: {
    vi: 'Quy trình sản xuất kép: Genie 4 xử lý 5 phân cảnh điện ảnh Joseon sạch chữ tuyệt đối; Remotion đảm trách phụ đề Kinetic nảy chữ, Top Sticky Banner và cân bằng âm thanh EBU R128.',
    kr: '이중 트랙 파이프라인: 지니4 기반 무자막 클린 시네마 5컷 및 리모션 결정론적 키네틱 자막, 상단 스티키 배너, EBU R128 오디오 믹싱.',
    en: 'Dual-track pipeline: Genie 4 generates 5 text-free cinema plates; Remotion powers deterministic kinetic subtitles, sticky top news banner, and EBU R128 sound.',
  },

  // KHỐI 2: TELEMETRY
  video: {
    type: 'mp4-direct',
    mp4Url: '/downloads/chai/Chai_Communication_Meritz_Partners_24fps_v2.mp4',
    mp4SquareUrl: '/downloads/chai/Chai_Communication_Meritz_Partners_1x1_24fps.mp4',
    durationInFrames: 720,
    fps: 24,
  },
  telemetry: {
    fps: 24,
    totalFrames: 720,
    renderTime: '3m 15s',
    resolution: '1080x1920 (9:16) & 1080x1080 (1:1)',
    audioSpec: 'EBU R128 (-19.8 dB Integrated)',
    linesOfCode: 1240,
  },

  // KHỐI 3: DUAL-TRACK ARCHITECTURE
  architecture: {
    visualTrack: {
      tool: 'Google Studio (Genie 4)',
      role: {
        vi: 'Tạo 5 phân cảnh diễn xuất kịch ngắn điện ảnh cổ trang sạch 100% chữ và watermark.',
        kr: '자막 및 워터마크가 완전히 배제된 5개 조선시대 숏드라마 클린 비주얼 플레이트 생성.',
        en: 'Generating 5 text-free cinematic Joseon period short drama action plates.',
      },
    },
    codeTrack: {
      tool: 'Remotion Engine (TypeScript)',
      role: {
        vi: 'Điều phối phụ đề nảy chữ Kinetic Pop-up, Top Sticky News Banner, và điều hòa âm thanh.',
        kr: '스프링 물리 기반 키네틱 자막, 상단 스티키 뉴스 배너, EBU R128 오디오 마스터링.',
        en: 'Coordinating spring-physics kinetic subtitles, top sticky news banner, and EBU R128 audio.',
      },
    },
    guardrails: [
      'Lock 60% Vertical Safe-Zone (chừa 20% banner đỉnh, 25% phụ đề chân)',
      'Deterministic 24.00 FPS Cinema Timebase',
      'EBU R128 Audio Normalization (-19.8 dB)',
    ],
  },

  // KHỐI 4: SCENE MATRIX
  sceneMatrix: [
    {
      cutNumber: 'CUT 01',
      frameRange: 'Frame 0 - 120 (5.0s)',
      title: { vi: 'Meri Loan Báo Tin Đồn', kr: '메리의 방령 선포', en: 'The Royal Proclamation' },
      visualPrompt: 'Meri đứng bên bảng cáo thị hoàng gia ở đầu chợ Joseon, tay chỉ dõng dạc loan báo.',
      koreanDialogue: '듣거라! 보험설계사 위촉응시자 모집, 첫 달 평균 백오십냥!',
      translation: {
        vi: 'Lắng nghe đây! Tuyển ứng viên tư vấn bảo hiểm, tháng đầu trung bình 150 lượng!',
        kr: '듣거라! 보험설계사 위촉응시자 모집, 첫 달 평균 백오십냥!',
        en: 'Hear ye! Hiring insurance advisors, first-month average 150 silver liang!',
      },
      remotionPhysics: 'Top Sticky Banner trượt xuống bằng spring({ damping: 14 }), Subtitle pop-in từ frame 24.',
    },
    {
      cutNumber: 'CUT 02',
      frameRange: 'Frame 120 - 192 (3.0s)',
      title: { vi: 'Dân Làng Bàn Tán Kinh Ngạc', kr: '장터 사람들의 웅성거림', en: 'Marketplace Commotion' },
      visualPrompt: 'Thanh niên áo trắng và ông lão bên sạp hàng chỉ tay xôn xao kinh ngạc.',
      koreanDialogue: '백오십냥?! 진짜 그 정도 준대?',
      translation: {
        vi: '150 lượng sao?! Thật sự cho nhiều thế ư?',
        kr: '백오십냥?! 진짜 그 정도 준대?',
        en: '150 liang?! Do they really pay that much?',
      },
      remotionPhysics: 'Badge "150냥" bung nổ đàn hồi giữa khung hình, SFX tiếng chợ xôn xao.',
    },
    {
      cutNumber: 'CUT 03',
      frameRange: 'Frame 192 - 384 (8.0s)',
      title: { vi: 'Cô Gái Gánh Hàng & Meri Khích Lệ', kr: '행상 소녀와의 대화', en: 'Inquiry & Encouragement' },
      visualPrompt: 'Cô gái gánh hàng rơm e dè bước tới hỏi Meri; Meri tươi cười gật đầu tự tin.',
      koreanDialogue: '첫 달에 백오십냥을 벌 수 있단 말이오? / 그렇소! 누구나 도전할 수 있소!',
      translation: {
        vi: 'Tháng đầu có thể kiếm được 150 lượng thật sao? / Đúng vậy! Ai cũng có thể thử sức!',
        kr: '첫 달에 백오십냥을 벌 수 있단 말이오? / 그렇소! 누구나 도전할 수 있소!',
        en: 'Can I earn 150 liang in the first month? / Yes! Anyone can take the challenge!',
      },
      remotionPhysics: 'Phụ đề đổi màu theo nhân vật: Cô gái (Trắng) ➔ Meri (Vàng cam #F97316).',
    },
    {
      cutNumber: 'CUT 04',
      frameRange: 'Frame 384 - 528 (6.0s)',
      title: { vi: 'Giải Tỏa Thắc Mắc: Sư Phụ Kèm Cặp', kr: '멘토 스승의 든든한 지원', en: 'Mentor Reassurance' },
      visualPrompt: 'Thương nhân trung niên lo lắng thi cử; Meri chỉ tay giải thích đĩnh đạc.',
      koreanDialogue: '과거시험 같은 것이오? / 멘토 스승이 붙어 길잡이부터 다 알려주오!',
      translation: {
        vi: 'Có khó như thi khoa cử không? / Có Sư phụ Mentor kèm cặp hướng dẫn tận tình!',
        kr: '과거시험 같은 것이오? / 멘토 스승이 붙어 길잡이부터 다 알려주오!',
        en: 'Is it hard like the state exam? / A Mentor guide is assigned to lead every step!',
      },
      remotionPhysics: 'Huy hiệu phát sáng "멘토 스승" ghim trên ngực áo Meri.',
    },
    {
      cutNumber: 'CUT 05',
      frameRange: 'Frame 528 - 720 (8.0s)',
      title: { vi: 'Đám Đông Hưởng Ứng & Thẻ Kết CTA', kr: '군중의 환호와 엔딩 카드', en: 'Outro Brand CTA' },
      visualPrompt: 'Đám đông hào hứng giơ đơn; Meri bước tới trước camera dang rộng hai tay.',
      koreanDialogue: '나도 신청하겠소! / 먼저 준비하는 사람이 임자, 메리츠파트너스!',
      translation: {
        vi: 'Tôi cũng đăng ký! / Người chuẩn bị trước là người nắm chắc phần thắng, Meritz Partners!',
        kr: '나도 신청하겠소! / 먼저 준비하는 사람이 임자, 메리츠파트너스!',
        en: 'Sign me up! / Early birds win the prize, Meritz Partners!',
      },
      remotionPhysics: 'ChaiEndingCard mờ nền 40%, Logo Meritz Partners phát sáng, Nút CTA nảy nhẹ.',
    },
  ],

  // KHỐI 5: COMPONENT REGISTRY
  components: [
    {
      name: 'ChaiTopBanner.tsx',
      category: 'HUD',
      role: {
        vi: 'Banner tin tức cố định đỉnh màn hình "150만원 소문에 장터가 뒤집혔다"',
        kr: '상단 고정 뉴스 속보 헤드라인 배너',
        en: 'Sticky top breaking news headline banner',
      },
      techStack: 'Tailwind + Remotion Spring',
    },
    {
      name: 'ChaiDynamicSubtitle.tsx',
      category: 'Kinetic UI',
      role: {
        vi: 'Hệ thống phụ đề nảy chữ Kinetic Pop-up đồng bộ chính xác từng mili-giây thoại',
        kr: '음성 타이밍과 프레임 단위로 완벽 동기화되는 스프링 키네틱 자막',
        en: 'Deterministic frame-synchronized kinetic spring subtitles',
      },
      techStack: 'Remotion interpolate & spring',
    },
    {
      name: 'ChaiEndingCard.tsx',
      category: 'Kinetic UI',
      role: {
        vi: 'Màn kết CTA tuyển dụng với logo Meritz Partners chính hãng và số liệu 150만원',
        kr: '공식 메리츠 파트너스 로고 및 첫달 150만원 실적 소구 엔딩 카드',
        en: 'Outro brand conversion card with official Meritz Partners logo',
      },
      techStack: 'React + SVG Glow',
    },
    {
      name: 'ChaiSquareAdapter.tsx',
      category: 'Audio/Adapter',
      role: {
        vi: 'Tự động crop khung hình 9:16 sang 1:1 có nền mờ Gaussian blur cho KakaoTalk feed',
        kr: '카카오톡 피드용 1:1 정방형 자동 블러 배경 어댑터',
        en: 'Automated 9:16 to 1:1 square adapter with Gaussian background',
      },
      techStack: 'Remotion Video FX',
    },
  ],

  // KHỐI 6: COMPARISON MATRIX
  comparison: [
    {
      criteria: { vi: 'Chỉnh sửa phụ đề Hangul', kr: '한국어 자막 수정', en: 'Subtitle Modification' },
      traditionalAe: 'Sửa tay từng Text Layer, căn lại keyframe từng từ (2-3 tiếng)',
      videoAsCode: 'Đổi file JSON thoại, tự động tính lại khung nảy chữ (10 giây)',
    },
    {
      criteria: { vi: 'Xuất đa định dạng (9:16 & 1:1)', kr: '다양한 화면비 동시 렌더링', en: 'Multi-aspect Ratio Export' },
      traditionalAe: 'Tạo 2 Composition riêng, kéo chỉnh lại layout thủ công',
      videoAsCode: '1 lệnh CLI xuất đồng thời 2 file qua Adapter tự động',
    },
    {
      criteria: { vi: 'Chuẩn hóa âm thanh TVC', kr: '방송 규격 오디오 마스터링', en: 'Audio Normalization' },
      traditionalAe: 'Cần plugin ngoài (iZotope) đo loudness thủ công',
      videoAsCode: 'Tích hợp chuẩn EBU R128 (-19.8 dB) tất định trong code',
    },
  ],

  // KHỐI 7: DOWNLOADS & POPUP
  downloads: {
    storyboardPdf: '/downloads/chai/Meritz_Partners_5Cut_Timeline_Spec.pdf',
    assetsZip: '/downloads/chai/Meritz_Keyframe_Stills_Cuts1_5.zip',
    mp4Master: '/downloads/chai/Chai_Communication_Meritz_Partners_24fps_v2.mp4',
    mp4Square: '/downloads/chai/Chai_Communication_Meritz_Partners_1x1_24fps.mp4',
    aeTrapConfig: {
      title: {
        vi: 'BẠN MUỐN DỰNG THỦ CÔNG MỘT BẢN K-DRAMA 5 CUTS BẰNG AFTER EFFECTS?',
        kr: '5컷 숏드라마를 애프터 이펙트로 직접 키프레임 노가다 하시겠습니까?',
        en: 'WANT TO MANUALLY KEYFRAME THIS 5-CUT K-DRAMA IN AFTER EFFECTS?',
      },
      bodyText: {
        vi: 'Dự án Meritz Partners kết hợp Genie 4 và Remotion giúp đổi thoại và xuất đa kích thước trong vài chục giây. Làm thủ công sẽ mất 3 ngày!',
        kr: '지니4와 리모션의 결합은 대사 수정 및 다중 해상도 출력을 수십 초 만에 완료합니다. 수작업은 3일이 소요됩니다!',
        en: 'Genie 4 + Remotion allows instant dialogue edits and multi-ratio exports in seconds. Manual work takes 3 days!',
      },
      hireUrl: 'mailto:contact@artificialcraft.space?subject=Offer: Yêu cầu dựng After Effects thủ công',
    },
  },

  // KHỐI 8: CLI REPRODUCTION
  cliCommand: 'npx remotion render src/index.ts ChaiMeritzVertical out/Meritz_24fps.mp4 --gl=angle',
};

export const SHOWCASE_PROJECTS: ProjectComprehensive[] = [
  CRABIT_PROJECT,
  CHAI_MERITZ_PROJECT,
];
