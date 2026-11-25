// src/data/projects/crabit-korea.ts
import { ProjectComprehensive } from '../types';

export const CRABIT_PROJECT_DATA: ProjectComprehensive = {
  // ─── 01. ĐỊNH DANH HERO (IDENTITY) ───
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
    vi: 'Từ 4 dòng kịch bản sơ sài đến quy trình hoàn chỉnh: Khóa tỷ lệ nhân vật học sinh Daechi-dong, Mascot Cua Kim Cương Carat và giao diện Fintech chuẩn Toss style.',
    kr: '단 4줄의 러프 기획안에서 완벽한 자동화 영상으로: 대치동 수능 맥락, 다이아몬드 캐럿 크랩 마스코트 및 토스 스타일 K-핀테크 UI.',
    en: 'From 4 rough script lines to a complete pipeline: Daechi-dong student context, Diamond Carat Crab mascot, and Toss-style K-Fintech UI.',
  },

  // ─── 02. THÔNG SỐ VIDEO & TELEMETRY HUD ───
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
    audioSpec: 'Stereo AAC 48kHz • Remotion + React + Three.js',
    linesOfCode: 2480,
  },

  // ─── 03. BA TRỤ CỘT CHIẾN LƯỢC (STRATEGIC PILLARS) ───
  strategicPillars: [
    {
      id: '01',
      category: {
        vi: 'HỆ THỐNG THIẾT KẾ',
        kr: '디자인 시스템 파운드리',
        en: 'DESIGN SYSTEM FOUNDRY',
      },
      title: {
        vi: 'Brand Identity Foundry',
        kr: '브랜드 아이덴티티 파운드리',
        en: 'Brand Identity Foundry',
      },
      description: {
        vi: 'Chuẩn hóa bảng màu K-Fintech pastel & dark squircle, thiết kế UI/UX ứng dụng Crabit mô phỏng chuẩn xác Toss & KakaoBank.',
        kr: 'K-핀테크 파스텔 및 다크 스퀘클 컬러 시스템을 표준화하고, 토스(Toss) 및 카카오뱅크 수준의 UI/UX를 구현.',
        en: 'Standardized K-Fintech pastel & dark squircle color tokens, crafting Crabit UI/UX with Toss & KakaoBank precision.',
      },
      checkpoints: {
        vi: [
          'Hệ phông Pretendard Hàn Quốc chuẩn mực (Tracking -0.02em)',
          'Bảng màu Toss Blue (#3182F6) & Ngọc Lục Bảo Carat (#10B981)',
          'Vết cắt cơ học 45° CAD Chisel & Phản hồi xúc giác UI',
        ],
        kr: [
          '한국어 표준 Pretendard 폰트 시스템 (자간 -0.02em)',
          '토스 블루(#3182F6) & 에메랄드 캐럿(#10B981) 컬러 토큰',
          '45° CAD 치즐 메커니컬 컷 및 촉각적 UI 피드백',
        ],
        en: [
          'Pretendard Korean typography system (Tracking -0.02em)',
          'Toss Blue (#3182F6) & Emerald Carat (#10B981) tokens',
          '45° CAD mechanical chisel cuts & tactile UI feedback',
        ],
      },
    },
    {
      id: '02',
      category: {
        vi: 'RIGGING & TÍNH LIỀN MẠCH',
        kr: '캐릭터 리깅 및 맥락 고정',
        en: 'RIGGING & CONTEXT LOCKING',
      },
      title: {
        vi: 'Character & Context Locking',
        kr: '캐릭터 및 대치동 맥락 잠금',
        en: 'Character & Context Locking',
      },
      description: {
        vi: 'Khóa cứng tỷ lệ cơ thể nhân vật học sinh Hàn Quốc, loại bỏ triệt để asset rác và duy trì tính liền mạch trong bối cảnh lớp học Hagwon.',
        kr: '한국 수험생 캐릭터의 신체 비율을 엄격히 고정하고, 불필요한 에셋을 배제하여 대치동 학원 맥락의 일관성 유지.',
        en: 'Locking Korean student character proportions, eliminating asset clutter, and maintaining continuity across Hagwon classroom scenes.',
      },
      checkpoints: {
        vi: [
          'Bộ Rigging Vector 2D tháo rời chuẩn mực (Đầu/Thân/Tứ chi)',
          'Hình chiếu phối cảnh không trôi lệch tọa độ theo thời gian',
          'Vùng biên an toàn 80px Safe Margin không bao giờ bị cắt mép',
        ],
        kr: [
          '모듈형 2D 벡터 리깅 아키텍처 (두상/상체/사지 분리)',
          '타임라인 전반에 걸쳐 좌표 이탈 없는 원근 잠금',
          '화면 잘림을 원천 차단하는 80px 세이프 마진 준수',
        ],
        en: [
          'Modular 2D vector rigging architecture (Head/Torso/Limbs)',
          'Zero-drift perspective coordinate locking across timeline',
          'Strict 80px frustum safe margin preventing edge clipping',
        ],
      },
    },
    {
      id: '03',
      category: {
        vi: 'LINH VẬT & BIỂU TƯỢNG',
        kr: '마스코트 엔지니어링',
        en: 'MASCOT ENGINEERING',
      },
      title: {
        vi: 'Mascot Engineering (Chú Cua Crabit)',
        kr: '마스코트 엔지니어링 (크래빗 다이아몬드 크랩)',
        en: 'Mascot Engineering (Diamond Carat Crab)',
      },
      description: {
        vi: 'Chơi chữ Crabit → Cua với hai càng giơ cao biểu trưng cho học sinh tích cực phát biểu; thân hình ma trận code & kim cương biểu trưng Carat học bổng.',
        kr: '크래빗(Crabit)의 두 집게발은 적극적인 발표를, 각면 다이아몬드 크리스털 몸체는 장학금 캐럿 보상을 상징.',
        en: 'Raised diamond claws symbolize active classroom participation; faceted crystal geometry represents Carat scholarship rewards.',
      },
      checkpoints: {
        vi: [
          'Hai càng giơ cao = Sự tự tin chủ động phát biểu trong lớp',
          'Mặt cắt kim cương = Carat học bổng tích lũy sau mỗi bài học',
          'Ánh xạ SVG sang Three.js PBR với vật lý phản xạ ánh sáng',
        ],
        kr: [
          '치켜든 두 집게발 = 수업 중 자신감 있는 발표 태도',
          '다이아몬드 각면 반사 = 학습 성취에 따른 캐럿 장학금',
          'SVG-to-Three.js PBR 광원 굴절 및 반사 매핑',
        ],
        en: [
          'Raised diamond claw posture = active classroom confidence',
          'Faceted crystal reflections = accumulated Carat rewards',
          'Direct SVG-to-Three.js PBR lighting & reflection mapping',
        ],
      },
    },
  ],

  // ─── 04. BỘ NHÂN VẬT CHÍNH & THÔNG SỐ RIGGING (CHARACTER CAST RIGS) ───
  characterCastRigs: [
    {
      id: 'student',
      name: {
        vi: 'Nhân Vật Học Sinh (The Hero Student)',
        kr: '주인공 남학생 (The Hero Student)',
        en: 'The Hero Student (Canonical Rig)',
      },
      roleTag: {
        vi: 'NHÂN VẬT TRUNG TÂM (PROTAGONIST)',
        kr: '핵심 주인공 캐릭터',
        en: 'CORE PROTAGONIST RIG',
      },
      fileName: 'char_student.svg',
      fileSize: '23.8 KB',
      ratio: '1 : 6 (Teenage High School)',
      svgUrl: '/characters/Crabit/char_student.svg',
      viewBox: '0 0 1000 900',
      specs: {
        vi: {
          structure: 'Rig 2D phẳng Anime Hàn Quốc: Áo hoodie Royal Cobalt Blue (#2563EB), huy hiệu ngũ giác Cyan, balo vàng Sunflower Gold (#F59E0B), quần Charcoal Slate.',
          metrics: 'Hệ khung kép Dual-Viewport (1000 × 900 px). Chiều cao chuẩn 700px từ đỉnh đầu (y: 150) đến mặt đất (y: 850).',
          ratioBreakdown: 'Tỷ lệ đầu:thân (1:6) [Đầu: 115px | Thân áo: 255px | Chân quần: 280px | Giày Sneaker: 50px]',
          groundContact: 'Tiếp đất toàn cục: x: 250 (Front) / x: 750 (Walk), y: 850 (Bóng sàn #0F172A opacity 0.45)',
        },
        kr: {
          structure: '2D 플랫 한국 애니메이션 리그: 로열 코발트 블루 후드티(#2563EB), 시안 엠블럼, 옐로우 백팩(#F59E0B), 차콜 슬레이트 슬랙스.',
          metrics: '듀얼 뷰포트(1000 × 900 px). 정수리(y: 150)부터 지면(y: 850)까지 표준 신장 700px 100% 동기화.',
          ratioBreakdown: '신체 비율 (1:6) [두상: 115px | 상체: 255px | 하체: 280px | 스니커즈: 50px]',
          groundContact: '지면 접지선: x: 250 (정면) / x: 750 (보행), y: 850 (섀도우 #0F172A opacity 0.45)',
        },
        en: {
          structure: '2D Flat Korean Anime rig: Royal Cobalt Blue hoodie (#2563EB), glowing cyan chest emblem, Sunflower Gold backpack (#F59E0B), and Charcoal Slate trousers.',
          metrics: 'Dual-Viewport canvas (1000 × 900 px). Canonical height locked at 700px from crown (y: 150) to ground (y: 850).',
          ratioBreakdown: 'Head-to-body ratio (1:6) [Head: 115px | Torso: 255px | Legs: 280px | Sneakers: 50px]',
          groundContact: 'Global ground pivot: x: 250 (Front) / x: 750 (Walk), y: 850 (Shadow #0F172A opacity 0.45)',
        },
      },
    },
    {
      id: 'mascot',
      name: {
        vi: 'Chú Cua Linh Vật Carat (Crabit Gem)',
        kr: '크래빗 다이아몬드 보석 마스코트',
        en: 'Crabit The Diamond Gem Mascot',
      },
      roleTag: {
        vi: 'LINH VẬT THƯƠNG HIỆU (BRAND MASCOT)',
        kr: '공식 브랜드 마스코트',
        en: 'OFFICIAL BRAND MASCOT',
      },
      fileName: 'mascot_crabit_carat_crystal.svg',
      fileSize: '16.3 KB',
      ratio: 'Compact Gem Scale (~Apple Size)',
      svgUrl: '/characters/Crabit/mascot_crabit_carat_crystal.svg',
      viewBox: '0 0 400 350',
      specs: {
        vi: {
          structure: 'Tinh thể kim cương cắt giác 2D: 5 dải LinearGradient khúc xạ (#E0F7FA → #00E5FF → #0077B6), cặp kính tròn trí tuệ gọng trắng, 2 càng pha lê + 6 chân đốt tinh thể.',
          metrics: 'Hệ khung hình học Gem Rig (400 × 350 px). Trọng tâm xoay động lực học data-pivot="200, 280" tối ưu cho spring bounce 60FPS.',
          ratioBreakdown: 'Cấu trúc tinh thể [Đỉnh đón sáng: #E0F7FA | Thân chính: #00E5FF | Mặt nghiêng: #00B4D8 | Đáy: #0077B6]',
          groundContact: 'Trọng tâm tiếp đất: x: 200, y: 280 (Quầng sáng phản chiếu Cyan opacity 0.15)',
        },
        kr: {
          structure: '2D 각면 다이아몬드 크리스털: 5방향 굴절 그라데이션(#E0F7FA → #00E5FF → #0077B6), 순백 원형 지혜 안경, 크리스털 집게발 2개 + 각면 다리 6개.',
          metrics: '컴팩트 보석 리그(400 × 350 px). 60FPS 스프링 바운스에 최적화된 회전 피벗 data-pivot="200, 280".',
          ratioBreakdown: '크리스털 구조 [상단: #E0F7FA | 몸체: #00E5FF | 측면 굴절: #00B4D8 | 하단: #0077B6]',
          groundContact: '접지 중심점: x: 200, y: 280 (앰비언트 시안 반사광 opacity 0.15)',
        },
        en: {
          structure: '2D faceted diamond crystal: 5 directional refraction gradients (#E0F7FA → #00E5FF → #0077B6), round white wisdom glasses, 2 crystal pincers + 6 faceted legs.',
          metrics: 'Compact Gem Rig (400 × 350 px). Kinematic motion anchor at data-pivot="200, 280" tuned for 60FPS spring bounce.',
          ratioBreakdown: 'Crystal facets [Apex: #E0F7FA | Primary: #00E5FF | Refraction: #00B4D8 | Shadow Base: #0077B6]',
          groundContact: 'Ground anchor: x: 200, y: 280 (Ambient cyan floor reflection opacity 0.15)',
        },
      },
    },
    {
      id: 'director',
      name: {
        vi: 'Thầy Giáo Viện Trưởng (The Hagwon Director)',
        kr: '학원 원장님 (The Hagwon Director)',
        en: 'The Hagwon Director (Executive Mentor)',
      },
      roleTag: {
        vi: 'NGƯỜI HƯỚNG DẪN UY TÍN (CHIEF MENTOR)',
        kr: '신뢰의 최고 멘토 리더',
        en: 'EXECUTIVE AUTHORITY RIG',
      },
      fileName: 'char_director_master.svg',
      fileSize: '29.2 KB',
      ratio: '1 : 7.2 (Mature Executive 40-45 yo)',
      svgUrl: '/characters/Crabit/char_director_master.svg',
      viewBox: '0 0 500 900',
      specs: {
        vi: {
          structure: 'Âu phục 2 mảnh Charcoal Navy (#252E3E), sơ mi trắng Oxford lộ cổ tay 6px, cà vạt Dark Obsidian, mắt kính titan siêu mỏng và tóc 7/3 điểm muối tiêu.',
          metrics: 'Khung đứng thẳng nghiêm ngặt (500 × 900 px). Tư thế A-stance đĩnh đạc, ZERO đạo cụ thừa trên tay.',
          ratioBreakdown: 'Tỷ lệ nam giới trưởng thành (1:7.2) [Đầu & Kính Titan: 115px | Vest Charcoal Navy: 345px | Quần tây & Giày Oxford: 400px]',
          groundContact: 'Tâm tiếp xúc giữa hai gót giày: x: 250, y: 860 (Giày da Oxford tiếp đất phẳng tại y: 855)',
        },
        kr: {
          structure: '차콜 네이비 투피스 수트(#252E3E), 6px 돌출 화이트 커프스, 다크 옵시디언 타이, 실버 티타늄 안경 및 7:3 헤어.',
          metrics: '수직 직립 표준 규격(500 × 900 px). 품격 있는 A-스탠스 자세, 불필요한 소품 완전 배제.',
          ratioBreakdown: '성인 남성 비율 (1:7.2) [두상 및 안경: 115px | 수트 상의: 345px | 슬랙스 및 옥스포드화: 400px]',
          groundContact: '지면 접지 중심축: x: 250, y: 860 (옥스포드 구두 y: 855 완전 접지)',
        },
        en: {
          structure: 'Tailored two-piece Charcoal Navy suit (#252E3E), crisp Oxford white shirt with 6px cuff reveal, Dark Obsidian tie, titanium wire frames, and 7/3 parted hair.',
          metrics: 'Strict vertical canvas (500 × 900 px). Dignified front A-stance with zero handheld clutter.',
          ratioBreakdown: 'Mature executive proportion (1:7.2) [Head & Frames: 115px | Navy Suit: 345px | Trousers & Oxfords: 400px]',
          groundContact: 'Global ground pivot between heels: x: 250, y: 860 (Oxford shoes grounded at y: 855)',
        },
      },
    },
  ],

  // ─── 05. KIẾN TRÚC KÉP (DUAL-TRACK ARCHITECTURE) ───
  architecture: {
    visualTrack: {
      tool: 'Google Flow / Three.js PBR',
      role: {
        vi: 'Dựng không gian 3D smartphone, vật liệu kim cương PBR và bối cảnh học sinh Daechi-dong.',
        kr: '3D 스마트폰 공간, 다이아몬드 PBR 재질 및 대치동 학생 배경 렌더링.',
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
      '80px Frustum Safe Margin Clamping',
    ],
  },

  // ─── 06. MA TRẬN PHÂN CẢNH (5-CUT SCENE MATRIX) ───
  sceneMatrix: [
    {
      cutNumber: 'CUT 01',
      frameRange: 'Frame 0 - 120 (0.0s – 5.0s)',
      title: {
        vi: 'Áp Lực Lớp Học Daechi-dong',
        kr: '대치동 학원가의 압박감',
        en: 'Classroom Tension (Daechi-dong)',
      },
      visualPrompt: 'Korean high school student sits at a late-night Hagwon desk surrounded by Suneung prep books and ticking clock.',
      koreanDialogue: '수능까지 D-100, 집중력이 무너지는 순간...',
      translation: {
        vi: 'Còn 100 ngày nữa là thi Suneung, khoảnh khắc sự tập trung sụp đổ...',
        kr: '수능까지 D-100, 집중력이 무너지는 순간...',
        en: 'D-100 to Suneung, the moment focus breaks down...',
      },
      remotionPhysics: 'Smooth camera push-in via interpolate() + D-100 countdown HUD ticker.',
    },
    {
      cutNumber: 'CUT 02',
      frameRange: 'Frame 120 - 240 (5.0s – 10.0s)',
      title: {
        vi: 'Xuất Hiện Linh Vật Cua Kim Cương',
        kr: '다이아몬드 캐럿 크랩 등장',
        en: 'Mascot Arrival & Handover',
      },
      visualPrompt: '3D smartphone tilts into frame as the Diamond Carat Crab mascot bursts out with cyan refraction sparkles.',
      koreanDialogue: '크래빗과 함께라면 공부도 게임처럼!',
      translation: {
        vi: 'Cùng Crabit, việc học cũng thú vị như chơi game!',
        kr: '크래빗과 함께라면 공부도 게임처럼!',
        en: 'With Crabit, studying feels like a game!',
      },
      remotionPhysics: 'Three.js PBR smartphone rotation + FxCrabit_SpawnSparkles with spring({ damping: 12, stiffness: 140 }).',
    },
    {
      cutNumber: 'CUT 03',
      frameRange: 'Frame 240 - 540 (10.0s – 22.5s)',
      title: {
        vi: 'Hội Tụ Dụng Cụ Học Tập 3D',
        kr: '3D 학습 기어 컨버전스',
        en: 'Study Gear Convergence',
      },
      visualPrompt: 'Floating 3D textbooks, timer, tablet, smart calculator, and 100-score exam paper orbit and snap into the Crabit app.',
      koreanDialogue: '모든 학습 도구가 하나의 앱으로 수렴됩니다.',
      translation: {
        vi: 'Mọi dụng cụ học tập hội tụ vào một ứng dụng duy nhất.',
        kr: '모든 학습 도구가 하나의 앱으로 수렴됩니다.',
        en: 'Every study tool converges into a single unified app.',
      },
      remotionPhysics: 'StudyGearConvergenceScene orbital vortex suck + ZeroGFloatWrapper parallax.',
    },
    {
      cutNumber: 'CUT 04',
      frameRange: 'Frame 540 - 780 (22.5s – 32.5s)',
      title: {
        vi: 'Trao Đổi Điểm Thưởng Carat',
        kr: '캐럿 장학 리워드 교환',
        en: 'Carat Reward Exchange',
      },
      visualPrompt: 'Blackboard math problem solved; +25,000 Carat scholarship coins explode into the Toss-style Crabit debit card.',
      koreanDialogue: '공부할수록 쌓이는 +25,000 캐럿 장학금!',
      translation: {
        vi: 'Càng học càng tích lũy +25,000 Carat học bổng!',
        kr: '공부할수록 쌓이는 +25,000 캐럿 장학금!',
        en: 'Earn +25,000 Carat scholarship rewards as you study!',
      },
      remotionPhysics: 'FxScholarship_CoinExplosion + NumberTicker odometer + 3D CrabitCard3D flip.',
    },
    {
      cutNumber: 'CUT 05',
      frameRange: 'Frame 780 - 894 (32.5s – 37.25s)',
      title: {
        vi: 'Thẻ Kết K-Fintech & CTA',
        kr: 'K-핀테크 엔딩 카드 및 CTA',
        en: 'Decoupled K-Fintech Outro CTA',
      },
      visualPrompt: 'Clean obsidian canvas with glowing Crabit Korea logo, Carat balance badge, and conversion CTA button.',
      koreanDialogue: '지금 바로 크래빗을 시작하세요.',
      translation: {
        vi: 'Bắt đầu cùng Crabit ngay hôm nay.',
        kr: '지금 바로 크래빗을 시작하세요.',
        en: 'Start with Crabit today.',
      },
      remotionPhysics: 'Multi-layer parallax convergence + CTA pulse glow with extrapolate: "clamp".',
    },
  ],

  productionBlueprint: {
    sectionTitle: {
      vi: 'CRABIT KOREA // BẢN THIẾT KẾ PHÂN CẢNH CHI TIẾT (10 PHÂN CẢNH)',
      kr: '크래빗 코리아 // 프로덕션 블루프린트 및 10단계 스토리보드',
      en: 'CRABIT KOREA // PRODUCTION BLUEPRINT & STORYBOARD (10 PLATES)',
    },
    subtitle: {
      vi: 'BẢN THIẾT KẾ ĐỊNH LƯỢNG CHUẨN IN ẤN & KỸ THUẬT RENDER',
      kr: '인쇄 가능한 고해상도 시네마틱 & 키네틱 기획서',
      en: 'PRINT-READY ARCHITECTURAL & CINEMATIC SPECIFICATION',
    },
    pdfLabel: {
      vi: 'TẢI BẢN VẼ BLUEPRINT PDF (3.5MB)',
      kr: '블루프린트 PDF 다운로드 (3.5MB)',
      en: 'DOWNLOAD BLUEPRINT PDF (3.5MB)',
    },
    scenes: [
      {
        id: '01',
        tabLabel: 'SCENE 1',
        phaseTag: {
          vi: 'SCENE 01 // KHUNG HÌNH 000 – 120',
          kr: '씬 01 // 프레임 000 – 120',
          en: 'SCENE 01 // FRAMES 000 – 120',
        },
        title: {
          vi: 'Xung Đột Ban Đầu & Thực Trạng Thiếu Động Lực',
          kr: '초기 갈등 & 동기부여 부재의 현실',
          en: 'Initial Conflict & Motivation Deficit',
        },
        timecode: '000 – 120 (5.0s @ 24fps)',
        plateImageUrl: '/storyboard/Crabit/1.svg',
        ratioTag: 'RATIO: 16:9 WIDESCREEN',
        sourceTag: 'AUTO-VIDEO-ENGINE / ANIMATIC',
        voiceover: {
          vn: 'Động lực, nói thì dễ hơn làm.',
          kr: '동기부여, 말처럼 쉽지 않죠.',
        },
        visualActing: {
          vi: 'Không gian lớp học viện đào tạo (Hagwon). Viện trưởng đứng quan sát với ánh mắt trăn trở. Học sinh ngồi gục đầu bên bàn học, xung quanh là sách vở dày đặc, biểu cảm mệt mỏi và mất phương hướng. Chiếc đồng hồ treo tường hiển thị thời gian trôi chậm chạp, nhấn mạnh sự ngột ngạt của lối học truyền thống thiếu phần thưởng.',
          kr: '학원(Hagwon) 교실 공간. 원장님은 깊은 고민과 안타까운 눈빛으로 학생을 지켜본다. 학생은 책이 수북이 쌓인 책상에 지쳐 엎드려 무기력한 표정을 짓고 있다. 벽걸이 시계는 느릿느릿 흘러가며 보상이 결여된 전통 학습의 답답함을 극대화한다.',
          en: 'Academy (Hagwon) classroom space. Director observes with a burdened, concerned gaze. Student slumps over desk amidst heavy textbooks, exhausted and disoriented. Wall clock ticks sluggishly, accentuating the suffocation of traditional study devoid of rewards.',
        },
        motionSpecs: {
          vi: 'Camera slow push-in scale 1.0 -> 1.15 bằng Easing.bezier(0.42, 0, 0.58, 1). Đồng hồ kim giây giật chậm rãi.',
          kr: '카메라 완만한 줌인 스케일 1.0 -> 1.15 (Easing.bezier(0.42, 0, 0.58, 1)). 시계 초침 딜레이 모션.',
          en: 'Camera slow push-in scale 1.0 -> 1.15 via Easing.bezier(0.42, 0, 0.58, 1). Clock second-hand clamped dilation.',
        },
        audioSfxCue: {
          vi: 'Tiếng tích tắc đồng hồ cơ học với bộ lọc low-pass, tiếng thở dài trĩu nặng của viện trưởng.',
          kr: '적막한 교실 앰비언스, 원장님의 깊은 한숨 소리, 로우패스 필터가 적용된 둔탁한 시계 초침 소리.',
          en: 'Muffled classroom silence, heavy sigh, dull mechanical clock ticking with low-pass dampening filter.',
        },
        depthPerspective: {
          vi: 'PHỐI CẢNH: LỚP HỌC HAGWON (Z: 10 - 20)',
          kr: '공간 깊이: 학원 교실 환경 (Z: 10 - 20)',
          en: 'DEPTH: CLASSROOM ENVIRONMENT (Z: 10 - 20)',
        },
      },
      {
        id: '02',
        tabLabel: 'SCENE 2',
        phaseTag: {
          vi: 'SCENE 02 // KHUNG HÌNH 121 – 230',
          kr: '씬 02 // 프레임 121 – 230',
          en: 'SCENE 02 // FRAMES 121 – 230',
        },
        title: {
          vi: 'Khám Phá Giải Pháp & Bước Ngoặt Công Nghệ',
          kr: '해결책 발견 & 테크놀로지 전환점',
          en: 'Solution Discovery & Technological Turning Point',
        },
        timecode: '121 – 230 (4.6s @ 24fps)',
        plateImageUrl: '/storyboard/Crabit/2.svg',
        ratioTag: 'RATIO: 16:9 WIDESCREEN',
        sourceTag: 'AUTO-VIDEO-ENGINE / ANIMATIC',
        voiceover: {
          vn: 'Nhất là khi nỗ lực thích đáng không đi kèm phần thưởng xứng đáng!',
          kr: '적절한 노력에 보상이 없다면 말이죠!',
        },
        visualActing: {
          vi: 'Viện trưởng bước đến và giơ cao chiếc điện thoại thông minh đang chạy ứng dụng Crabit. Giao diện ứng dụng tỏa ra luồng sáng thấu kính màu xanh ngọc bích. Khuôn mặt học sinh bừng sáng, mắt mở to, biểu cảm chuyển đổi dứt khoát từ chán chường sang kinh ngạc và tò mò.',
          kr: '원장님이 다가와 크래빗 앱이 실행 중인 스마트폰을 높이 들어 올린다. 앱 인터페이스에서 에메랄드 시안 렌즈 플레어가 뿜어져 나온다. 학생의 얼굴이 환하게 밝아지며, 지루함에서 놀라움과 호기심으로 표정이 단숨에 전환된다.',
          en: 'Director steps forward holding aloft the smartphone running the Crabit app. The app interface radiates an emerald-cyan lens flare. Student face lights up, eyes widening as expression snaps from apathy to wonder and curiosity.',
        },
        motionSpecs: {
          vi: 'Quy chuẩn phối cảnh: Đồng hồ lùi về lớp hậu cảnh sâu nhất (zIndex: 10), nhường toàn bộ tiền cảnh nổi bật cho chiếc điện thoại (zIndex: 50). Volumetric cyan lens flare.',
          kr: '원근 표준 규격: 벽시계는 최심부 배경(zIndex: 10)으로 후퇴, 스마트폰이 최전경(zIndex: 50)을 장악. 볼류메트릭 렌즈 플레어.',
          en: 'Perspective standard: Clock dial recedes to deepest background (zIndex: 10), Smartphone claims dominant foreground (zIndex: 50). Volumetric cyan flare bloom.',
        },
        audioSfxCue: {
          vi: 'Âm thanh kích hoạt màn hình ngọc bích bùng nổ, tiếng chuông pha lê ngân vang sắc sảo.',
          kr: '화면 켜짐 에너지 버스트, 고주파 크리스탈 차임 징글, 짧은 감탄의 호흡.',
          en: 'Dramatic transition chime, high-frequency crystal resonance shimmer, sudden intake of breath.',
        },
        depthPerspective: {
          vi: 'QUY CHUẨN: ĐIỆN THOẠI zIndex: 50 | ĐỒNG HỒ zIndex: 10',
          kr: '원근 계층: 스마트폰 zIndex: 50 | 시계 zIndex: 10',
          en: 'PERSPECTIVE: SMARTPHONE zIndex: 50 | CLOCK zIndex: 10',
        },
      },
      {
        id: '03',
        tabLabel: 'PHA 1',
        phaseTag: {
          vi: 'SCENE 2.5 (PHA 1) // KHUNG HÌNH 231 – 265',
          kr: '씬 2.5 (1단계) // 프레임 231 – 265',
          en: 'SCENE 2.5 (PHA 1) // FRAMES 231 – 265',
        },
        title: {
          vi: 'Lao Vút Ngang Siêu Tốc (Horizontal Energy Dash)',
          kr: '초고속 횡단 궤적 (Horizontal Energy Dash)',
          en: 'Horizontal Kinetic Dash (Supersonic Speed)',
        },
        timecode: '231 – 265 (1.5s @ 24fps)',
        plateImageUrl: '/storyboard/Crabit/3.svg',
        ratioTag: 'RATIO: 16:9 WIDESCREEN',
        sourceTag: 'AUTO-VIDEO-ENGINE / ANIMATIC',
        voiceover: {
          vn: 'Vòng tuần hoàn học tập chủ động! Chuẩn mực động lực mới - Crabit!',
          kr: '주도적인 학습 선순환! 동기부여의 새로운 기준 크래빗!',
        },
        visualActing: {
          vi: 'Quả cầu năng lượng chứa kim cương thạch anh lao thẳng tắp từ mép trái vào tâm màn hình với đuôi khí động học mờ ảo, nền tốc độ trôi ngược chiều xé gió.',
          kr: '석영 다이아몬드가 담긴 에너지 구체가 화면 왼쪽 끝에서 중심점으로 공기역학적 모션 블러 꼬리를 남기며 직진 돌진한다. 반대 방향으로 흐르는 속도선이 시원한 바람을 가르는 느낌을 연출한다.',
          en: 'Energy sphere harboring a quartz diamond launches horizontally from screen-left straight into the center with an aerodynamic blurred tail. Reverse speed lines streak by in high-velocity wind-shear.',
        },
        motionSpecs: {
          vi: 'Tọa độ X: -100vw -> 0 (Tâm) áp dụng Easing.bezier(0.16, 1, 0.3, 1), vệt blur 14px giảm dần về 0px khi chạm tâm.',
          kr: '수평 위치 X: -100vw -> 0 (중심) Easing.bezier(0.16, 1, 0.3, 1) 적용. 속도 블러(14px)가 중심 정지 시 0px로 감쇠.',
          en: 'Horizontal position X: -100vw -> 0 (Center) using Easing.bezier(0.16, 1, 0.3, 1). Velocity blur(14px) decays to 0px at center lock.',
        },
        audioSfxCue: {
          vi: 'Tiếng rít xé gió siêu thanh (sonic whoosh) quét tần số Doppler từ 350Hz lên 1.8kHz.',
          kr: '초음속 풍절음 스우시(Sonic Whoosh), 350Hz에서 1.8kHz로 상승하는 도플러 효과음.',
          en: 'Hyper-speed sonic boom whoosh, Doppler pitch sweep from 350Hz up to 1.8kHz.',
        },
        depthPerspective: {
          vi: 'LỚP ĐỘNG HỌC: QUẢ CẦU NĂNG LƯỢNG KHÍ ĐỘNG',
          kr: '모션 레이어: 공기역학 에너지 구체',
          en: 'LAYER: AERODYNAMIC ENERGY SPHERE',
        },
      },
      {
        id: '04',
        tabLabel: 'PHA 2',
        phaseTag: {
          vi: 'SCENE 2.5 (PHA 2) // KHUNG HÌNH 266 – 300',
          kr: '씬 2.5 (2단계) // 프레임 266 – 300',
          en: 'SCENE 2.5 (PHA 2) // FRAMES 266 – 300',
        },
        title: {
          vi: 'Tụ Năng Lượng Tại Tâm & Rung Chấn Phình Đại',
          kr: '중심 에너지 압축 & 진동 팽창',
          en: 'Center Energy Implosion & Swell Oscillation',
        },
        timecode: '266 – 300 (1.4s @ 24fps)',
        plateImageUrl: '/storyboard/Crabit/4.svg',
        ratioTag: 'RATIO: 16:9 WIDESCREEN',
        sourceTag: 'AUTO-VIDEO-ENGINE / ANIMATIC',
        voiceover: {
          vn: '(Tiếp tục mạch âm nhạc cao trào tích tụ áp suất trước điểm nổ)',
          kr: '(에너지 극대화 및 폭발 직전 고주파 긴장감 형성)',
        },
        visualActing: {
          vi: 'Quả cầu dừng ở tâm, rung lắc tần số cao và phình đại cực điểm, tích tụ áp suất trước pha giải phóng.',
          kr: '에너지 구체가 화면 중심 좌표에 즉시 제동하며 고주파수로 진동한다. 반지름이 원래 크기의 185%까지 급격히 팽창하며 방출 직전의 극대화된 압력을 축적한다.',
          en: 'The sphere brakes instantly at coordinate center, shuddering in high-frequency oscillation and swelling to near 200% radius, accumulating immense kinetic pre-detonation pressure.',
        },
        motionSpecs: {
          vi: 'Dao động tâm dX, dY tần số 24Hz, bán kính quả cầu phình đại 1.0 -> 1.85 lần tích tụ năng lượng trước kích nổ.',
          kr: '중심 흔들림 dX, dY: sin(frame * 1.5) * 6px (24Hz 진동). 반경 스케일 1.0 -> 1.85 팽창.',
          en: 'Center jitter dX, dY: sin(frame * 1.5) * 6px (24Hz oscillation). Radial scale expands 1.0 -> 1.85 with quadratic ease-in.',
        },
        audioSfxCue: {
          vi: 'Tiếng nạp tụ điện cao thế whine tăng dần cùng dải sub-bass 40Hz nén chặt.',
          kr: '서브 베이스 럼블(40Hz) 빌드업과 고압 캐패시터 충전 와인 사운드.',
          en: 'Sub-bass rumble build-up (40Hz) rising to high-tension capacitor charging whine.',
        },
        depthPerspective: {
          vi: 'LỚP ĐỘNG HỌC: RUNG CHẤN DAO ĐỘNG ĐIỀU HÒA TÂM',
          kr: '모션 레이어: 중심 충격파 진동 엔진',
          en: 'LAYER: CENTER SHOCKWAVE OSCILLATION',
        },
      },
      {
        id: '05',
        tabLabel: 'PHA 3',
        phaseTag: {
          vi: 'SCENE 2.5 (PHA 3) // KHUNG HÌNH 301 – 340',
          kr: '씬 2.5 (3단계) // 프레임 301 – 340',
          en: 'SCENE 2.5 (PHA 3) // FRAMES 301 – 340',
        },
        title: {
          vi: 'Kích Nổ Phát Quang: Bung 7 Dụng Cụ Học Tập',
          kr: '발광 폭발 & 7대 학습도구 방사 스프링',
          en: 'Photoluminescent Detonation: 7 Study Gears Eruption',
        },
        timecode: '301 – 340 (1.6s @ 24fps)',
        plateImageUrl: '/storyboard/Crabit/5.svg',
        ratioTag: 'RATIO: 16:9 WIDESCREEN',
        sourceTag: 'AUTO-VIDEO-ENGINE / ANIMATIC',
        voiceover: {
          vn: '(Điểm rơi cao trào bung nổ âm thanh - Climax Drop Beat)',
          kr: '(클라이맥스 드롭 비트와 전방위 방사 폭발)',
        },
        visualActing: {
          vi: 'Quả cầu phát nổ; 7 dụng cụ học tập (Sách giáo khoa 3D, Bút cảm ứng, Thước kẻ tam giác, Thước compa, Kính lúp, Bài thi 100 điểm, Máy tính thông minh) bung nổ lò xo từ tâm tỏa ra 7 góc.',
          kr: '구체가 눈부신 백색광과 함께 폭발한다. 3D 교과서, 스타일러스 펜, 삼각자, 컴퍼스, 돋보기, 100점 시험지, 스마트 계산기 7종의 학습 도구가 중심에서 7방향으로 스프링처럼 터져 나온다.',
          en: 'Energy sphere detonates in a blinding white flash. 7 Study Gear tools (3D Textbook, Stylus Pen, Triangle Ruler, Compass, Magnifying Glass, 100-Score Exam Sheet, Smart Calculator) erupt from the center in spring geometry to 7 corners.',
        },
        motionSpecs: {
          vi: 'Radial Spring(mass: 1, damping: 8, stiffness: 120), góc phân bố 7 nan hoa Theta = i * (360°/7). Clamped dispersion <= 0.12.',
          kr: '방사형 스프링(질량: 1, 감쇠: 8, 강성: 120). 7방향 각도 분배 Theta = i * (360°/7). 최대 분산 제약 <= 0.12.',
          en: 'Radial Spring(mass: 1.0, damping: 8, stiffness: 120). 7-Star angular dispersion Theta_i = i * (360° / 7). Clamped dispersion <= 0.12.',
        },
        audioSfxCue: {
          vi: 'Tiếng nổ pha lê tinh khiết rền vang, âm thanh thủy tinh tán sắc lấp lánh (sparkling reverb).',
          kr: '웅장한 크리스탈 파열음 폭발, 반짝이는 고음역 리버브.',
          en: 'Massive acoustic crystalline explosion, crystal chime burst, sparkling high-end reverb.',
        },
        depthPerspective: {
          vi: 'LEGO ASSETS: 7 DỤNG CỤ HỌC TẬP (zIndex: 40)',
          kr: '소품 레고: 7대 학습도구 방사 스프링 (zIndex: 40)',
          en: 'PROP LEGO: 7-GEAR RADIAL SPRINGS (zIndex: 40)',
        },
      },
      {
        id: '06',
        tabLabel: 'PHA 4',
        phaseTag: {
          vi: 'SCENE 2.5 (PHA 4) // KHUNG HÌNH 341 – 380',
          kr: '씬 2.5 (4단계) // 프레임 341 – 380',
          en: 'SCENE 2.5 (PHA 4) // FRAMES 341 – 380',
        },
        title: {
          vi: 'Vũ Đạo Quỹ Đạo Không Trọng Lực (Orbital Swap)',
          kr: '무중력 궤도 스왑 댄스 (Orbital Swap Dance)',
          en: 'Zero-G Orbital Swap Choreography',
        },
        timecode: '341 – 380 (1.6s @ 24fps)',
        plateImageUrl: '/storyboard/Crabit/6.svg',
        ratioTag: 'RATIO: 16:9 WIDESCREEN',
        sourceTag: 'AUTO-VIDEO-ENGINE / ANIMATIC',
        voiceover: {
          vn: '(Giai điệu điều hòa hoán đổi quỹ đạo bay)',
          kr: '(유연하고 경쾌한 수학적 궤도 교환 리듬)',
        },
        visualActing: {
          vi: '7 dụng cụ dập dềnh không trọng lực và bay theo quỹ đạo cánh cung hoán đổi vị trí cho nhau tạo cảm giác nhịp điệu toán học hoàn mỹ.',
          kr: '7종의 도구가 무중력 상태에서 둥실거리며 떠다니다가, 포물선 호를 그리며 유려하게 서로의 궤도 위치를 맞바꾸는 조화로운 수학적 댄스를 펼친다.',
          en: '7 Study Gear props float weightlessly in zero-G, bobbing up and down, soaring along parabolic arcs to smoothly swap orbital coordinates with each other in mathematical rhythm.',
        },
        motionSpecs: {
          vi: 'Parabolic orbital swap cánh cung, dao động sóng sin Y-Amp: 12px, xoay tự do quanh trục Y từ -15° đến +15°.',
          kr: '포물선 궤도 교환 순열. 사인파 상하 부유 Y-진폭: 12px. Y축 기준 -15° ~ +15° 3D 회전.',
          en: 'Parabolic orbital swap permutation. Zero-G sine float Y-Amp: 12px. 3D self-rotation around Y axis from -15° to +15°.',
        },
        audioSfxCue: {
          vi: 'Giai điệu arpeggio marimba trong trẻo, tiếng vút nhẹ khi từng dụng cụ cắt chéo quỹ đạo.',
          kr: '맑은 마림바 아르페지오 멜로디, 궤도 정점을 지날 때의 부드러운 스우시.',
          en: 'Harmonic marimba arpeggio notes, soft bubbly whooshes as tools cross orbital apex.',
        },
        depthPerspective: {
          vi: 'ENGINE: VŨ ĐẠO KHÔNG TRỌNG LỰC & HOÁN ĐỔI QUỸ ĐẠO',
          kr: '모션 엔진: 무중력 부유 및 궤도 스왑',
          en: 'MOTION ENGINE: ZERO-G FLOAT & ORBITAL SWAP',
        },
      },
      {
        id: '07',
        tabLabel: 'PHA 5',
        phaseTag: {
          vi: 'SCENE 2.5 (PHA 5) // KHUNG HÌNH 381 – 410',
          kr: '씬 2.5 (5단계) // 프레임 381 – 410',
          en: 'SCENE 2.5 (PHA 5) // FRAMES 381 – 410',
        },
        title: {
          vi: 'Hút Xuyên Tâm & Chuyển Cảnh Crash-Zoom',
          kr: '구심력 수렴 흡입 & 광속 크래시 줌',
          en: 'Centripetal Suction & Hyper Crash-Zoom',
        },
        timecode: '381 – 410 (1.2s @ 24fps)',
        plateImageUrl: '/storyboard/Crabit/7.svg',
        ratioTag: 'RATIO: 16:9 WIDESCREEN',
        sourceTag: 'AUTO-VIDEO-ENGINE / ANIMATIC',
        voiceover: {
          vn: '(Hiệu ứng bẻ cong không gian mở cổng portal)',
          kr: '(다음 앱 인터페이스 화면으로 진입하는 광속 크래시 줌)',
        },
        visualActing: {
          vi: 'Toàn bộ 7 dụng cụ bị hút thẳng tắp về quả cầu kim cương trung tâm. Quả cầu phóng cực đại xuyên qua camera tạo cú chuyển cảnh Crash-Zoom mở ra màn hình ứng dụng của phân cảnh tiếp theo.',
          kr: '7종의 도구가 중심의 다이아몬드 구체를 향해 최대 가속도로 빨려 들어간다. 구체는 카메라 렌즈를 향해 폭발적으로 확장되며 다음 씬의 앱 화면으로 진입하는 크래시 줌 포털을 생성한다.',
          en: 'All 7 tools are suctioned directly back toward the central diamond sphere at maximum acceleration. The sphere expands violently into the camera lens, executing a high-speed Crash-Zoom portal into the mobile app.',
        },
        motionSpecs: {
          vi: 'Gia tốc hút xuyên tâm Easing.in(Easing.exp), camera Crash-Zoom phóng cực đại scale 1.0 -> 50.0, Flash wipe.',
          kr: '구심 가속도 r(t) -> 0 (Easing.in(Easing.exp)). 카메라 스케일 1.0 -> 50.0 돌파. 화이트아웃 플래시 전환.',
          en: 'Centripetal implosion r(t) -> 0 with Easing.in(Easing.exp). Camera scale explodes from 1.0 to 50.0. White-out flash transition.',
        },
        audioSfxCue: {
          vi: 'Âm thanh hố đen hút chân không xoáy mạnh, tiếng sập máy ảnh cơ học và cú nổ âm trầm.',
          kr: '소용돌이 진공 흡입음 후 강렬한 서브 베이스 드롭 및 셔터 와이프음.',
          en: 'Vortex vacuum suction sound, followed by high-impact sub-bass drop and crisp camera shutter wipe.',
        },
        depthPerspective: {
          vi: 'CHUYỂN CẢNH: CAMERA CRASH-ZOOM (SCALE 1.0 -> 50.0)',
          kr: '화면 전환: 카메라 크래시 줌 (스케일 1.0 -> 50.0)',
          en: 'TRANSITION: CAMERA CRASH-ZOOM (SCALE 1.0 -> 50.0)',
        },
      },
      {
        id: '08',
        tabLabel: 'SCENE 3',
        phaseTag: {
          vi: 'SCENE 03 // KHUNG HÌNH 411 – 500',
          kr: '씬 03 // 프레임 411 – 500',
          en: 'SCENE 03 // FRAMES 411 – 500',
        },
        title: {
          vi: 'Sự Giải Phóng Nỗ Lực & Càng Cua Crabit',
          kr: '노력의 해방 & 크래빗 집게 시그니처',
          en: 'Effort Unleashed & The Crabit Claw Signature',
        },
        timecode: '411 – 500 (3.7s @ 24fps)',
        plateImageUrl: '/storyboard/Crabit/8.svg',
        ratioTag: 'RATIO: 16:9 WIDESCREEN',
        sourceTag: 'AUTO-VIDEO-ENGINE / ANIMATIC',
        voiceover: {
          vn: 'Crabit tích lũy "Carat" mỗi khi học sinh hoàn thành nhiệm vụ...',
          kr: '크래빗은 학생이 미션을 완료할 때마다 ‘캐럿’을 적립하고...',
        },
        visualActing: {
          vi: 'Học sinh hăng hái giơ cao hai tay phát biểu (đồng điệu với hình tượng càng cua Crabit). Màn hình ứng dụng trồi lên từ đáy, các huy hiệu nhiệm vụ nảy pop-in kèm âm thanh bọt khí trong trẻo. Số dư Carat nhảy số liên tục.',
          kr: '학생이 크래빗 집게 모양에 맞춰 두 손을 번쩍 들고 자신감 넘치게 발표한다. 화면 하단에서 스마트폰 앱이 솟아오르고, 미션 완료 배지들이 통통 튀며 캐럿 잔액이 0에서 12,500까지 카운트업된다.',
          en: 'Student enthusiastically raises both arms to volunteer in class, synchronizing with the iconic Crabit claw pose. Phone app slides up from screen-bottom, mission badges pop-in with bubbly acoustics, and Carat balance counts up rapidly.',
        },
        motionSpecs: {
          vi: 'Giao diện điện thoại trượt từ đáy Y: 100% -> 0% bằng Spring(damping: 14), số dư Carat nhảy 0 -> 12,500.',
          kr: '앱 UI 하단 슬라이드업 Y: 100vh -> 0vh 스프링(감쇠: 14). 캐럿 숫자 선형 보간 0 -> 12,500. 배지 팝인 스케일 0 -> 1.15 -> 1.0.',
          en: 'App slide-up Y: 100vh -> 0vh via Spring(damping: 14, stiffness: 110). Carat counter linearly interpolates 0 -> 12,500. Mission badges stagger pop-in scale 0 -> 1.15 -> 1.0.',
        },
        audioSfxCue: {
          vi: 'Tiếng bọt khí pop-in trong trẻo của các huy hiệu, tiếng xu leng keng dồn dập.',
          kr: '배지별 경쾌한 버블 팝 효과음, 빠른 코인 카운트 차임, 활기찬 퍼커션 비트.',
          en: 'Playful bubbling pop SFX for each badge, rapid coin count chime, upbeat energetic percussion track.',
        },
        depthPerspective: {
          vi: 'LỚP UI: CRABIT APP ENGINE & BỘ ĐẾM CARAT',
          kr: 'UI 레이어: 크래빗 앱 엔진 & 캐럿 카운터',
          en: 'UI LAYER: CRABIT APP ENGINE & CARAT COUNTER',
        },
      },
      {
        id: '09',
        tabLabel: 'SCENE 4',
        phaseTag: {
          vi: 'SCENE 04 // KHUNG HÌNH 501 – 550',
          kr: '씬 04 // 프레임 501 – 550',
          en: 'SCENE 04 // FRAMES 501 – 550',
        },
        title: {
          vi: 'Chuyển Hóa Học Bổng: Thẻ Crabit Debit Card Kim Loại 3D',
          kr: '장학금 전환 & 3D 메탈 크래빗 데빗 카드',
          en: 'Scholarship Transformation & 3D Metallic Debit Card',
        },
        timecode: '501 – 550 (2.1s @ 24fps)',
        plateImageUrl: '/storyboard/Crabit/card_3d.svg',
        ratioTag: 'RATIO: 16:9 WIDESCREEN',
        sourceTag: 'THREE.JS PBR / 3D MESH',
        voiceover: {
          vn: '...và nạp thẳng vào thẻ Crabit như một suất học bổng thực thụ.',
          kr: '...이를 실제 장학금처럼 크래빗 카드에 충전해 줍니다.',
        },
        visualActing: {
          vi: 'Điểm Carat số hóa được quy đổi trực tiếp thành số dư học bổng nạp vào thẻ vật lý. Cú xoay lật 3D ngoạn mục của chiếc thẻ ghi nợ Crabit Debit Card bằng kim loại cao cấp giữa cơn mưa tinh thể lấp lánh.',
          kr: '적립된 디지털 캐럿이 실물 데빗 카드의 장학금 잔액으로 실시간 충전된다. 최고급 메탈 소재의 크래빗 카드가 쏟아지는 크리스털 다이아몬드 비 속에서 720도 화려하게 3D 회전한다.',
          en: 'Digital Carats transform into tangible scholarship funds on the physical card. The premium metallic Crabit Debit Card executes a breathtaking 720° 3D flip amid a shimmering rainfall of crystalline gems.',
        },
        motionSpecs: {
          vi: 'Three.js 3D Mesh xoay 720 độ quanh trục nghiêng -15°, mưa 120 hạt tinh thể kim cương rơi tự do phản chiếu ánh sáng kim loại.',
          kr: 'Three.js 3D 메시 회전(RotationY: 0 -> 720°, RotationX: -15°, Scale: 1.0 -> 1.25 -> 1.0). 120개 다이아몬드 파티클 자유낙하.',
          en: 'Three.js mesh transform: RotationY: 0 -> 720°, RotationX: -15°, Scale: 1.0 -> 1.25 -> 1.0. 120 diamond particles emit with gravity 0.4px/f^2. Specular reflection scan.',
        },
        audioSfxCue: {
          vi: 'Âm thanh xoay thẻ kim loại sang trọng, hiệu ứng kim hoàn leng keng, hợp âm vang.',
          kr: '묵직한 메탈 회전음, 고급스러운 카드 마찰 효과음, 영롱한 다이아몬드 사운드.',
          en: 'Deep metallic whoosh, luxury card flip friction SFX, resonant harmonic chord resolve.',
        },
        depthPerspective: {
          vi: 'ĐỘNG CƠ 3D: THREE.JS METALLIC DEBIT CARD (zIndex: 60)',
          kr: '3D 메시 엔진: Three.js 메탈 데빗 카드 (zIndex: 60)',
          en: '3D MESH ENGINE: THREE.JS METALLIC DEBIT CARD (zIndex: 60)',
        },
      },
      {
        id: '10',
        tabLabel: 'OUTRO',
        phaseTag: {
          vi: 'SCENE 04 (OUTRO) // KHUNG HÌNH 551 – 590',
          kr: '씬 04 (피날레) // 프레임 551 – 590',
          en: 'SCENE 04 (OUTRO) // FRAMES 551 – 590',
        },
        title: {
          vi: 'Cất Cánh Khải Hoàn: Cậu Bé Học Sinh & Chú Cua Crabit Bay Lên',
          kr: '승리의 비상: 학생과 크래빗 마스코트의 동반 상승',
          en: 'Triumphant Ascension: Student & Mascot Soaring Up',
        },
        timecode: '551 – 590 (1.6s @ 24fps)',
        plateImageUrl: '/storyboard/Crabit/9.svg',
        ratioTag: 'RATIO: 16:9 WIDESCREEN',
        sourceTag: 'AUTO-VIDEO-ENGINE / ANIMATIC',
        voiceover: {
          vn: 'Học tập chủ động – Tương lai rộng mở cùng Crabit!',
          kr: '주도적인 학습 선순환! 크래빗과 함께 미래로 비상하세요!',
        },
        visualActing: {
          vi: 'Cậu bé học sinh và chú cua Crabit (mascot) cùng nhau tung cánh cất cánh bay lên không trung rực rỡ. Nét mặt học sinh bừng sáng niềm tin và niềm vui chiến thắng, chấm dứt hoàn toàn sự bế tắc ban đầu.',
          kr: '자신감을 되찾은 학생과 크래빗 마스코트가 함께 힘차게 날아오르며 하늘 높이 솟구친다. 학생의 얼굴은 승리와 성취감으로 가득 차며 주도적 학습 선순환의 완성을 알린다.',
          en: 'The empowered student and crab mascot Crabit take off together, soaring triumphantly into the radiant sky. The student’s expression radiates pride, optimism, and unyielding confidence.',
        },
        motionSpecs: {
          vi: 'Cất cánh parabol: Tọa độ Y dịch chuyển -1200px xuyên qua cạnh trên màn hình với Easing.out(Easing.cubic). Mascot Crabit vung vẩy càng cua hân hoan. 80 vệt sáng tốc độ.',
          kr: '포물선 비상 모션: Y축 -1200px 상단 이탈 (Easing.out(Easing.cubic)). 마스코트 집게발 세리머니, 역방향 스피드라인 80개 분사.',
          en: 'Parabolic ascension: Y trajectory shifts -1200px past top screen edge with Easing.out(Easing.cubic). Mascot crab claw celebration. 80 downward speed line particles.',
        },
        audioSfxCue: {
          vi: 'Tiếng động cơ phản lực khí nén vút cao, hợp âm piano + synth khải hoàn vang dội, kết thúc trọn vẹn mạch phim.',
          kr: '고속 에어 제트 사운드, 승리의 피아노 & 신디사이저 피날레 화음, 웅장한 아웃트로.',
          en: 'High-velocity jet whoosh, triumphant piano + synth resolve chords, grand finale outro.',
        },
        depthPerspective: {
          vi: 'VECTOR RIG LINH HOẠT: HỌC SINH & MASCOT CẤT CÁNH (zIndex: 50)',
          kr: '다이내믹 벡터 리그: 비상하는 학생 & 마스코트 (zIndex: 50)',
          en: 'DYNAMIC VECTOR RIG: STUDENT & MASCOT IN FLIGHT (zIndex: 50)',
        },
      },
    ],
  },

  // ─── 07. DANH MỤC LINH KIỆN LEGO (COMPONENT REGISTRY) ───
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
      name: 'StudyGearConvergenceScene.tsx',
      category: '3D Mesh',
      role: {
        vi: 'Cảnh hội tụ 10 vật thể dụng cụ học tập 3D bay theo quỹ đạo xoắn ốc vào ứng dụng.',
        kr: '10종의 3D 학습 도구가 궤도를 그리며 앱으로 수렴하는 시네마틱 씬.',
        en: 'Orbital convergence scene pulling 10 3D study-gear meshes into the app viewport.',
      },
      techStack: 'Remotion Spring + 3D Spatial Camera',
    },
    {
      name: 'CaratCrabMascot.tsx',
      category: 'Kinetic UI',
      role: {
        vi: 'Linh vật Cua Kim Cương Crabit với hoạt họa giơ càng và khúc xạ ánh sáng Carat.',
        kr: '집게발 모션과 다이아몬드 굴절 효과를 갖춘 크래빗 마스코트 컴포넌트.',
        en: 'Animated Diamond Carat Crab mascot with claw-raise kinematics and facet glow.',
      },
      techStack: 'Pure SVG Rig + Remotion Spring',
    },
    {
      name: 'MasterCompositeScene.tsx',
      category: 'HUD',
      role: {
        vi: 'Trình điều phối tổng thể nối 6 phân đoạn 3D, HUD Toss-style và 15 kênh SFX.',
        kr: '6개 3D 시퀀스, 토스 스타일 HUD 및 15채널 SFX를 통합 제어하는 마스터 컴포지션.',
        en: 'Master timeline orchestrator combining 6 3D sequences, Toss-style HUD, and 15 SFX channels.',
      },
      techStack: 'Remotion Sequence & Transition',
    },
  ],

  // ─── 08. SO SÁNH GIÁ TRỊ VỚI AFTER EFFECTS THỦ CÔNG ───
  comparison: [
    {
      criteria: {
        vi: 'Cập nhật số liệu & nội dung',
        kr: '데이터 및 텍스트 수정',
        en: 'Data & Copy Updates',
      },
      traditionalAe: 'Mở file .AEP, tìm từng pre-comp và sửa tay mất 1 - 2 tiếng.',
      videoAsCode: 'Cập nhật Zod JSON config, tự động render lại trong 5 giây.',
    },
    {
      criteria: {
        vi: 'Đồ họa 3D & UI đồng bộ',
        kr: '3D 그래픽 및 UI 동기화',
        en: '3D & UI Synchronization',
      },
      traditionalAe: 'Render 3D riêng từ Blender/C4D rồi compositing thủ công từng pass.',
      videoAsCode: 'Three.js chạy trực tiếp trong React đồng bộ từng frame 60FPS.',
    },
    {
      criteria: {
        vi: 'Kiểm soát phiên bản (Git)',
        kr: '버전 관리 (Git)',
        en: 'Version Control (Git)',
      },
      traditionalAe: 'File nhị phân nặng hàng trăm MB, không thể diff hay merge nhóm.',
      videoAsCode: '100% TypeScript code, diff/review minh bạch qua Pull Request.',
    },
    {
      criteria: {
        vi: 'Bản địa hóa đa ngôn ngữ (VI/KR/EN)',
        kr: '다국어 로컬라이제이션 (VI/KR/EN)',
        en: 'Multi-Language Localization',
      },
      traditionalAe: 'Nhân bản dự án cho từng ngôn ngữ và căn chỉnh lại toàn bộ text layer.',
      videoAsCode: 'Chuyển đổi từ điển i18n bằng 1 tham số CLI với font Pretendard khóa cứng.',
    },
  ],

  // ─── 09. TRUNG TÂM BÀN GIAO TÀI NGUYÊN (DELIVERABLES HUB) ───
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
        vi: 'Hệ thống Crabit kết hợp Three.js và Remotion giúp tái sử dụng component và đổi dữ liệu trong vài giây. Dựng thủ công bằng After Effects sẽ tiêu tốn nhiều ngày kéo keyframe!',
        kr: '크래빗 시스템은 Three.js와 Remotion을 결합하여 컴포넌트 재사용 및 데이터 교체를 몇 초 만에 처리합니다. 수작업 키프레임은 수일이 소요됩니다!',
        en: 'Crabit combines Three.js and Remotion for instant component reuse and data updates in seconds. Manual After Effects keyframing takes days!',
      },
      hireUrl: 'mailto:mizu2711@gmail.com?subject=[CRABIT OFFER] Yêu cầu dựng thủ công bằng After Effects (.AEP)',
    },
  },

  // ─── 10. LỆNH TERMINAL CLI TÁI TẠO VIDEO ───
  cliCommand: 'npx remotion render src/index.ts MasterCompositeScene out/Crabit_60fps.mp4 --gl=angle',
};
