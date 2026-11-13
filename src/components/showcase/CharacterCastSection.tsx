import React, { useState } from 'react';
import {
  Sparkles,
  Ruler,
  Palette,
  Layers,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldCheck,
  FileCode,
  Compass,
  ArrowDownToLine,
} from 'lucide-react';
import { Language } from '../../i18n/showcaseDict';

interface CharacterCastSectionProps {
  currentLang: Language;
}

export type CharacterId = 'student' | 'mascot' | 'director';

interface ColorToken {
  name: string;
  hex: string;
  role: Record<Language, string>;
}

interface CharacterSpec {
  id: CharacterId;
  assetFile: string;
  fileSize: string;
  name: Record<Language, string>;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  roleBadge: Record<Language, string>;
  ratio: Record<Language, string>;
  viewBox: string;
  dimensions: string;
  groundPivot: Record<Language, string>;
  summary: Record<Language, string>;
  svgPath: string;
  colorPalette: ColorToken[];
  architecture: {
    label: Record<Language, string>;
    value: Record<Language, string>;
  }[];
  anatomyRules: {
    title: Record<Language, string>;
    details: Record<Language, string>[];
  }[];
  poseBreakdown: {
    poseTitle: Record<Language, string>;
    poseDesc: Record<Language, string>;
    points: Record<Language, string>[];
  }[];
  constraints: Record<Language, string>[];
}

const CHARACTERS: CharacterSpec[] = [
  {
    id: 'student',
    assetFile: 'char_student.svg',
    fileSize: '23.8 KB',
    svgPath: '/characters/char_student.svg',
    name: {
      vi: 'Nhân Vật Học Sinh',
      en: 'The Hero Student',
      kr: '주인공 남학생 (The Hero Student)',
    },
    title: {
      vi: 'Nhân Vật Học Sinh (The Hero Student)',
      en: 'The Hero Student // Canonical Rig',
      kr: '영웅 학생 (The Hero Student)',
    },
    subtitle: {
      vi: 'Học sinh trung học phổ thông Hàn Quốc nhiệt huyết, tự tin, trang phục năng động',
      en: 'Korean High School Student — Enthusiastic, Confident, Dynamic Flat Anime Rig',
      kr: '열정적이고 자신감 넘치는 한국 고등학생 2D 플랫 애니메이션 리그',
    },
    roleBadge: {
      vi: 'NHÂN VẬT TRUNG TÂM (PROTAGONIST)',
      en: 'CORE PROTAGONIST RIG',
      kr: '핵심 주인공 캐릭터',
    },
    ratio: {
      vi: '1 : 6 (Tỷ lệ học sinh thanh thiếu niên)',
      en: '1 : 6 (Teenage High School Proportion)',
      kr: '1 : 6 (청소년 고등학생 표준 비율)',
    },
    viewBox: '0 0 1000 900',
    dimensions: '1000 × 900 px (Dual-Viewport)',
    groundPivot: {
      vi: 'x: 250 (Đứng thẳng) / x: 750 (Bước đi), y: 850',
      en: 'x: 250 (Front) / x: 750 (Walk), y: 850',
      kr: 'x: 250 (정면) / x: 750 (보행), y: 850',
    },
    summary: {
      vi: 'Rig nhân vật học sinh 2D phẳng phong cách Anime Hàn Quốc hiện đại. Thiết kế trên hệ tọa độ kép đối xứng (Dual-Viewport), chiều cao chuẩn 700px từ đỉnh đầu (y: 150) đến mặt đất (y: 850). Tỷ lệ đầu:thân 1:6 hoàn hảo cho hoạt họa 60FPS.',
      en: '2D Flat Korean Anime character rig built on a dual-viewport coordinate system. Canonical height metric locked at 700px from crown (y: 150) to ground contact (y: 850). Head-to-body ratio 1:6 optimized for 60FPS programmatic motion.',
      kr: '듀얼 뷰포트 좌표계로 설계된 2D 플랫 한국 애니메이션 남학생 캐릭터 리그. 정수리(y: 150)부터 지면(y: 850)까지 700px 표준 신장 유지, 1:6 황금비율 적용.',
    },
    architecture: [
      {
        label: { vi: 'Hệ Khung Canvas (viewBox)', en: 'Canvas Architecture', kr: '캔버스 구조' },
        value: {
          vi: '0 0 1000 900 (Hệ khung hình kép Dual-Viewport)',
          en: '0 0 1000 900 (Dual-Viewport Rig System)',
          kr: '0 0 1000 900 (듀얼 뷰포트 캔버스)',
        },
      },
      {
        label: { vi: 'Nửa Trái (Front View)', en: 'Left Viewport (Front)', kr: '좌측 (정면 스탠딩)' },
        value: {
          vi: '<g id="view-student-front"> [x: 0–500, Tâm: 250, Chân tiếp đất: 850]',
          en: '<g id="view-student-front"> [x: 0–500, Center: 250, Ground: 850]',
          kr: '<g id="view-student-front"> [x: 0–500, 중심축: 250, 접지선: 850]',
        },
      },
      {
        label: { vi: 'Nửa Phải (Walk Stride)', en: 'Right Viewport (Walk)', kr: '우측 (3/4 보행)' },
        value: {
          vi: '<g id="view-student-walk"> [x: 500–1000, Tâm: 750, Chân tiếp đất: 850]',
          en: '<g id="view-student-walk"> [x: 500–1000, Center: 750, Ground: 850]',
          kr: '<g id="view-student-walk"> [x: 500–1000, 중심축: 750, 접지선: 850]',
        },
      },
      {
        label: { vi: 'Chiều Cao Chuẩn (Height Metric)', en: 'Canonical Height', kr: '표준 캐릭터 전신고' },
        value: {
          vi: '700px (Đỉnh y: 150 -> Tiếp đất y: 850 đồng bộ 100%)',
          en: '700px (Crown y: 150 -> Ground y: 850 synchronized 100%)',
          kr: '700px (정수리 y: 150 -> 지면 접지 y: 850 100% 동기화)',
        },
      },
      {
        label: { vi: 'Tỷ Lệ Đầu:Thân (Ratio)', en: 'Head-to-Body Ratio', kr: '신체 비율' },
        value: {
          vi: '1:6 (Đầu: 115px | Thân áo: 255px | Chân quần: 280px | Giày: 50px)',
          en: '1:6 (Head: 115px | Torso: 255px | Legs: 280px | Shoes: 50px)',
          kr: '1:6 (두상: 115px | 상체: 255px | 하체: 280px | 신발: 50px)',
        },
      },
      {
        label: { vi: 'Tiếp Đất Toàn Cục (Ground Contact)', en: 'Ground Contact Pivot', kr: '접지 기준점' },
        value: {
          vi: 'y: 850 (Ellipse bóng sàn #0F172A opacity 0.45)',
          en: 'y: 850 (Ground shadow ellipse #0F172A opacity 0.45)',
          kr: 'y: 850 (지면 섀도우 타원 #0F172A opacity 0.45)',
        },
      },
    ],
    colorPalette: [
      {
        name: 'Base Skin',
        hex: '#FDE8D7',
        role: {
          vi: 'Màu da ấm ngà khỏe mạnh (Asian Ivory Tone)',
          en: 'Healthy warm Asian ivory skin tone',
          kr: '건강하고 따뜻한 아시안 아이보리 피부톤',
        },
      },
      {
        name: 'Blush Cheeks',
        hex: '#FDA4AF',
        role: {
          vi: 'Má hồng tròn gò má (Blush circular accents)',
          en: 'Soft circular blush cheek accents',
          kr: '양 볼 부드러운 원형 블러셔 포인트',
        },
      },
      {
        name: 'Hair & Eyes',
        hex: '#1E2430',
        role: {
          vi: 'Tóc & tròng mắt than đá (Charcoal Obsidian)',
          en: 'Solid black-brown charcoal obsidian hair & iris',
          kr: '흑요석 차콜 블랙 헤어 및 눈동자',
        },
      },
      {
        name: 'Hoodie Body',
        hex: '#2563EB',
        role: {
          vi: 'Thân áo hoodie Royal Cobalt Blue',
          en: 'Royal Cobalt Blue signature hoodie body',
          kr: '시그니처 로열 코발트 블루 후드티 바디',
        },
      },
      {
        name: 'Hoodie Cuffs & Hem',
        hex: '#1D4ED8',
        role: {
          vi: 'Gấu & cổ tay áo Deep Cobalt Blue',
          en: 'Deep Cobalt ribbed hem & sleeve cuffs',
          kr: '딥 코발트 밴딩 시보리 및 소매 커프스',
        },
      },
      {
        name: 'Drawstrings & Shoes',
        hex: '#FFFFFF',
        role: {
          vi: 'Dây rút hoodie & thân giày Sneaker Chalk White',
          en: 'Pure Chalk White hood drawstrings & sneaker leather',
          kr: '순백색 후드 스트링 및 스니커즈 가죽',
        },
      },
      {
        name: 'Chest Emblem',
        hex: '#00E5FF',
        role: {
          vi: 'Ngũ giác Cyan phát quang trên ngực áo',
          en: 'Electric Cyan glowing pentagon chest emblem',
          kr: '가슴 중앙 일렉트릭 시안 오각형 엠블럼',
        },
      },
      {
        name: 'Backpack',
        hex: '#F59E0B',
        role: {
          vi: 'Balo học sinh vàng hướng dương (Sunflower Gold)',
          en: 'Warm Sunflower Gold student backpack body & straps',
          kr: '선바라기 옐로우 스쿨 백팩 본체 및 스트랩',
        },
      },
      {
        name: 'Backpack Shadow',
        hex: '#D97706',
        role: {
          vi: 'Khối đổ bóng quai & thân balo',
          en: 'Deep amber accent shadow on backpack folds',
          kr: '백팩 접힘 및 스트랩 그림자 액센트',
        },
      },
      {
        name: 'Trousers',
        hex: '#334155',
        role: {
          vi: 'Quần tây ống đứng Charcoal Slate',
          en: 'Charcoal Slate tailored slim trousers',
          kr: '차콜 슬레이트 슬림핏 슬랙스',
        },
      },
      {
        name: 'Sneaker Sole',
        hex: '#1E293B',
        role: {
          vi: 'Đế ngoài giày thể thao Navy Grip Sole',
          en: 'Navy sole accent & grip outsole line',
          kr: '네이비 미끄럼방지 고무 아웃솔',
        },
      },
      {
        name: 'Ground Shadow',
        hex: '#0F172A',
        role: {
          vi: 'Bóng tiếp xúc sàn (Neutral Slate 45%)',
          en: 'Neutral slate grounded contact ellipse',
          kr: '자연스러운 뉴트럴 슬레이트 지면 그림자',
        },
      },
    ],
    anatomyRules: [
      {
        title: {
          vi: '1. Cấu Trúc Khuôn Mặt & Mái Tóc',
          en: '1. Facial Anatomy & Hair',
          kr: '1. 얼굴 구조 및 헤어 스타일',
        },
        details: [
          {
            vi: 'Khuôn mặt tròn trẻ trung, đường cằm mềm mại tự nhiên, hai chấm má hồng tròn (#FDA4AF) dưới khóe mi.',
            en: 'Youthful rounded face with soft jawline and rosy circular blush patches (#FDA4AF) beneath lower eyelids.',
            kr: '부드러운 턱선의 소년형 얼굴, 눈 아래 선명한 원형 블러셔 포인트(#FDA4AF).',
          },
          {
            vi: 'Nụ cười tươi rạng rỡ mở miệng (#BE123C), để lộ hàng răng trắng phía trên (#FFFFFF) thể hiện tinh thần tích cực.',
            en: 'Enthusiastic open-mouth smile (#BE123C) showing upper white teeth line (#FFFFFF) conveying confidence.',
            kr: '상단 치아가 드러나는 밝고 활기찬 개방형 미소(#BE123C, 치아 #FFFFFF).',
          },
          {
            vi: 'Tóc đen Charcoal Obsidian (#1E2430) rẽ mái boyish gọn gàng, có điểm sáng specular phản chiếu (#FFFFFF).',
            en: 'Side-swept boyish black hair with clean bangs curved across forehead and white specular glint.',
            kr: '이마를 부드럽게 감싸는 단정한 흑발 뱅 헤어(#1E2430)와 하이라이트 글린트(#FFFFFF).',
          },
        ],
      },
      {
        title: {
          vi: '2. Áo Hoodie Đặc Trưng (The Signature Hoodie)',
          en: '2. The Signature Hoodie Rig',
          kr: '2. 시그니처 코발트 후드티 규격',
        },
        details: [
          {
            vi: 'Màu xanh Royal Blue (#2563EB) đồng nhất trên cả 2 khung nhìn (Front & Walk), bo viền cổ tròn ôm chân cổ.',
            en: 'Solid Royal Blue (#2563EB) body strictly identical in both views with round collar framing neck base.',
            kr: '정면 및 측면 보행 뷰 모두 일관된 로열 코발트 블루(#2563EB) 컬러 바디.',
          },
          {
            vi: 'Hai dây rút mui thả tự nhiên (#FFFFFF, width: 3px, length: 70px) có nút bọc kim loại aglet ở đầu dây.',
            en: 'Two pure white dangling drawstrings (#FFFFFF, width: 3px, length: 70px) with metallic aglets.',
            kr: '두 개의 흰색 후드 스트링(#FFFFFF, 폭 3px, 길이 70px) 및 마감 팁.',
          },
          {
            vi: 'Túi Kangaroo bản rộng phía bụng dưới (y: 440 đến 500) và huy hiệu ngũ giác Cyan (#00E5FF) viền trắng giữa ngực.',
            en: 'Large prominent Kangaroo pocket (y: 440-500) and electric cyan pentagon chest emblem (#00E5FF).',
            kr: '하복부 대형 캥거루 포켓(y: 440~500) 및 가슴 중앙 일렉트릭 시안 오각형 엠블럼(#00E5FF).',
          },
        ],
      },
      {
        title: {
          vi: '3. Balo, Quần Slim-Fit & Giày Sneakers',
          en: '3. School Backpack, Trousers & Sneakers',
          kr: '3. 책가방, 슬림 슬랙스 & 스니커즈',
        },
        details: [
          {
            vi: 'Balo học sinh thể tích lớn màu Sunflower Gold (#F59E0B), quai đệm dày vòng qua vai vững chãi.',
            en: 'High-volume rounded backpack worn on back in vibrant Sunflower Gold (#F59E0B) with thick padded straps.',
            kr: '선바라기 옐로우(#F59E0B) 대용량 스쿨 백팩과 도톰한 어깨 스트랩 패드.',
          },
          {
            vi: 'Quần tây ống ôm Charcoal Slate (#334155) với nếp gấp định hình khớp gối linh hoạt cho hoạt họa bước đi.',
            en: 'Clean dark slate slim-cut pants (#334155) with articulated knee crease markers for dynamic walk cycles.',
            kr: '자연스러운 무릎 주름 관절선을 갖춘 차콜 슬레이트 슬림핏 팬츠(#334155).',
          },
          {
            vi: 'Giày thể thao cổ cao trắng (#FFFFFF) điểm nét nhấn đế Navy (#1E293B) và đường line Cyan (#00E5FF).',
            en: 'Modern white canvas high-top sneakers with horizontal laces, navy outsoles, and cyan accent pinstripes.',
            kr: '수평 레이스 라인과 네이비 밑창(#1E293B), 시안 액센트가 들어간 화이트 하이탑 스니커즈.',
          },
        ],
      },
    ],
    poseBreakdown: [
      {
        poseTitle: {
          vi: 'Khung Nhìn 1: Tư Thế Đứng Thẳng Chính Diện (Front Standing)',
          en: 'Viewport 1: Front Standing Pose',
          kr: '뷰포트 1: 정면 직립 스탠딩 자세',
        },
        poseDesc: {
          vi: '<g id="view-student-front"> tại trục x: 250, tiếp đất chuẩn y: 850',
          en: '<g id="view-student-front"> centered at x: 250, ground contact y: 850',
          kr: '<g id="view-student-front"> 중심축 x: 250, 접지선 y: 850',
        },
        points: [
          {
            vi: 'Đứng thẳng đối xứng, hai mũi chân hơi hướng ra ngoài (khoảng cách ~50px).',
            en: 'Symmetrical upright posture, feet slightly angled outward (~50px spacing).',
            kr: '대칭 직립 자세, 양 발 끝 약 50px 간격으로 바깥쪽을 살짝 향함.',
          },
          {
            vi: 'Hai tay thả lỏng tự nhiên dọc hông, cẳng tay hướng nhẹ về trước, bàn tay 5 ngón thư giãn.',
            en: 'Arms hanging comfortably at sides, forearms angled slightly forward with relaxed 5-finger hands.',
            kr: '양팔은 몸통 옆으로 자연스럽게 늘어뜨리고 편안한 손가락 형태 유지.',
          },
          {
            vi: 'Hai quai balo vàng đối xứng trên vai; hai mũi giày sneaker tiếp đất phẳng tại y: 850.',
            en: 'Two symmetrical gold straps curving over both shoulders; shoes grounded flat at y: 850.',
            kr: '양 어깨에 균형 있게 걸쳐진 백팩 스트랩; y: 850 지면에 완전 밀착.',
          },
        ],
      },
      {
        poseTitle: {
          vi: 'Khung Nhìn 2: Tư Thế Sải Bước Đi 3/4 (3/4 Walking Stride)',
          en: 'Viewport 2: 3/4 Walking Stride Pose',
          kr: '뷰포트 2: 3/4 측면 다이내믹 워킹 자세',
        },
        poseDesc: {
          vi: '<g id="view-student-walk"> tại trục x: 750, chuẩn pha tiếp đất học sinh 2.webp',
          en: '<g id="view-student-walk"> centered at x: 750, contact phase matching reference stride',
          kr: '<g id="view-student-walk"> 중심축 x: 750, 레퍼런스 기준 워킹 스트라이드',
        },
        points: [
          {
            vi: 'Chân trước (phải) sải bước về phía trước, tiếp đất tại (x: 690, y: 845); chân sau (trái) gập nhẹ đầu gối đẩy lực tại (x: 820, y: 845).',
            en: 'Front leg (Right) striding forward to contact point (x: 690, y: 845); back leg (Left) pushing off at (x: 820, y: 845).',
            kr: '앞다리(우측) (690, 845)에 안정적 착지; 뒷다리(좌측) 무릎을 굽혀 (820, 845)에서 추진력 발휘.',
          },
          {
            vi: 'Tay trước gập góc 90 độ, bàn tay nắm hờ vui tươi ngang ngực; tay sau vung tự nhiên về sau.',
            en: 'Front arm bent forward at 90° with a loose happy fist near chest level; back arm swinging naturally backward.',
            kr: '앞팔은 90도 각도로 가슴 높이에서 가볍게 주먹을 쥐고, 뒷팔은 자연스럽게 후방 스윙.',
          },
          {
            vi: 'Toàn bộ khối balo vàng thể hiện rõ nét sau lưng; đầu quay góc 3/4 mỉm cười tự tin hướng về phía trước.',
            en: 'Full volume of gold backpack visibly resting against the back; head angled 3/4 smiling with lively momentum.',
            kr: '등 뒤로 풍성한 백팩 볼륨감 노출; 3/4 각도로 정면을 향해 활기차게 미소 짓는 두상.',
          },
        ],
      },
    ],
    constraints: [
      {
        vi: '100% SVG Vector thuần khiết, không dùng thẻ <filter>, không dùng đổ bóng mờ làm chậm render.',
        en: '100% pure SVG XML. No <filter>, no blurry raster drop-shadows that degrade 60FPS render.',
        kr: '100% 순수 SVG 벡터. 렌더링을 저하시키는 <filter> 및 래스터 드롭섀도우 배제.',
      },
      {
        vi: 'Thuộc tính màu sắc khai báo tường minh (fill, stroke, stroke-width, opacity), tuyệt đối không dùng inline CSS style="..."',
        en: 'Explicit presentation attributes used throughout; zero inline CSS style strings.',
        kr: '인라인 style 속성 대신 fill, stroke, opacity 등 표준 프레젠테이션 어트리뷰트 직접 선언.',
      },
      {
        vi: 'Cấu trúc phân lớp phân cấp nghiêm ngặt: <defs>, <g id="view-student-front">, <g id="view-student-walk">.',
        en: 'Strict hierarchical scene-graph organization for programmatic timeline animations.',
        kr: '계층적 그룹 구조(<defs>, 정면 리그, 워킹 리그)로 타임라인 제어 최적화.',
      },
    ],
  },
  {
    id: 'mascot',
    assetFile: 'mascot_crabit_carat_crystal.svg',
    fileSize: '16.3 KB',
    svgPath: '/characters/mascot_crabit_carat_crystal.svg',
    name: {
      vi: 'Chú Cua Linh Vật Carat',
      en: 'Crabit The Diamond Gem Mascot',
      kr: '크래빗 다이아몬드 보석 마스코트',
    },
    title: {
      vi: 'Linh Vật Carat (Mascot Crabit The Diamond Gem)',
      en: 'Mascot Crabit: The Carat Diamond Gem',
      kr: '크래빗 카라트 다이아몬드 젬 (Crabit Mascot)',
    },
    subtitle: {
      vi: 'Linh vật tinh thể kim cương cắt vát hình học, thông thái, đại diện K-Fintech Carat',
      en: 'Geometric Faceted Diamond Crystal Mascot — Wise, Energetic, Iconic K-Fintech Gem',
      kr: '기하학적 각면 다이아몬드 크리스털 마스코트 — 지혜롭고 활기찬 핀테크 상징',
    },
    roleBadge: {
      vi: 'LINH VẬT THƯƠNG HIỆU (BRAND MASCOT)',
      en: 'OFFICIAL BRAND MASCOT',
      kr: '공식 브랜드 마스코트',
    },
    ratio: {
      vi: 'Kích thước linh vật kim cương (~Quả táo lớn)',
      en: 'Compact Gem Scale (~Large Apple Size)',
      kr: '컴팩트 보석 스케일 (~큰 사과 크기)',
    },
    viewBox: '0 0 400 350',
    dimensions: '400 × 350 px',
    groundPivot: {
      vi: 'x: 200, y: 280 (data-pivot: 200, 280)',
      en: 'x: 200, y: 280 (data-pivot: 200, 280)',
      kr: 'x: 200, y: 280 (피벗 중심 200, 280)',
    },
    summary: {
      vi: 'Linh vật tinh thể kim cương 2D cắt vát hình học sắc sảo, kích thước nhỏ gọn tương đương một quả táo lớn, mang phong thái thông thái và giàu năng lượng tích cực. Sử dụng dải gradient khúc xạ Carat ngọc bích độc quyền, đại diện cho hệ thống điểm thưởng Carat trong K-Fintech.',
      en: 'A 2D geometric faceted diamond crystal mascot with the compact stature of a large apple, radiating intelligence and positive energy. Built with proprietary cyan-to-ice refractive gradients representing the K-Fintech Carat rewards economy.',
      kr: '사과 크기의 컴팩트하고 지혜로운 기하학적 각면 다이아몬드 크리스털 마스코트. 독자적인 시안-아이스 굴절 그라데이션으로 핀테크 카라트 보상 시스템을 상징.',
    },
    architecture: [
      {
        label: { vi: 'Hệ Khung Canvas (viewBox)', en: 'Canvas Architecture', kr: '캔버스 구조' },
        value: {
          vi: '0 0 400 350 (Hệ khung hình học Gem Rig)',
          en: '0 0 400 350 (Compact Gem Rig System)',
          kr: '0 0 400 350 (컴팩트 보석 리그)',
        },
      },
      {
        label: { vi: 'Trọng Tâm Xoay (Pivot Point)', en: 'Motion Anchor Pivot', kr: '회전 피벗 중심' },
        value: {
          vi: 'data-pivot="200, 280" (Cân bằng động lực học)',
          en: 'data-pivot="200, 280" (Kinematic balance point)',
          kr: 'data-pivot="200, 280" (동역학적 회전 균형점)',
        },
      },
      {
        label: { vi: 'Bản Chất Hình Thái', en: 'Morphology', kr: '형태학적 본질' },
        value: {
          vi: 'Tinh thể kim cương cắt giác 2D (Faceted Diamond Crystal)',
          en: '2D Faceted Diamond Crystal Geometry',
          kr: '2D 각면 다이아몬드 크리스털 기하학',
        },
      },
      {
        label: { vi: 'Hệ Càng & Chi', en: 'Pincers & Legs Rig', kr: '집게발 및 다리 구조' },
        value: {
          vi: '2 Càng pha lê vươn cong thanh thoát + 6 chân đốt tinh thể góc cạnh',
          en: '2 Sweeping crystal pincers + 6 angular faceted crystalline legs',
          kr: '2개 크리스털 유선형 집게발 + 6개 각면 관절 다리',
        },
      },
      {
        label: { vi: 'Khúc Xạ Ánh Sáng', en: 'Light Refraction Engine', kr: '광원 굴절 엔진' },
        value: {
          vi: '5 Dải LinearGradient đa hướng (Đỉnh #E0F7FA -> Đáy #0077B6)',
          en: '5 Directional LinearGradients (Apex #E0F7FA -> Base #0077B6)',
          kr: '5방향 리니어 그라데이션 (정점 #E0F7FA -> 하단 #0077B6)',
        },
      },
      {
        label: { vi: 'Quy Chuẩn Cấm', en: 'Strict Anti-Pattern', kr: '금지 사항' },
        value: {
          vi: 'Tuyệt đối cấm màu vàng cam luộc và cấm vẽ chân rết côn trùng.',
          en: 'Strictly prohibited: boiled crab hues and insect-like centipede legs.',
          kr: '삶은 꽃게 오렌지/레드 색상 및 곤충형 지네 다리 표현 엄격 금지.',
        },
      },
    ],
    colorPalette: [
      {
        name: 'Apex Ice Highlight',
        hex: '#E0F7FA',
        role: {
          vi: 'Mặt phẳng đỉnh đón sáng trắng ngọc băng',
          en: 'Apex lighting facet in arctic ice white',
          kr: '상단 빛을 받는 평면 아이스 화이트',
        },
      },
      {
        name: 'Brand Hyper Cyan',
        hex: '#00E5FF',
        role: {
          vi: 'Thân chính xanh ngọc Cyan thương hiệu Crabit',
          en: 'Primary torso in signature brand hyper cyan',
          kr: '크래빗 시그니처 하이퍼 시안 몸체',
        },
      },
      {
        name: 'Deep Refraction',
        hex: '#00B4D8',
        role: {
          vi: 'Các mặt nghiêng khúc xạ chiều sâu không gian',
          en: 'Faceted angled side planes for spatial depth',
          kr: '공간적 입체감을 위한 측면 굴절각',
        },
      },
      {
        name: 'Shadow Base',
        hex: '#0077B6',
        role: {
          vi: 'Đáy tinh thể đổ bóng trọng tâm',
          en: 'Deep grounded base shadow of the gem',
          kr: '무게중심을 잡아주는 하단 딥 블루 섀도우',
        },
      },
      {
        name: 'Facet Ridge Lines',
        hex: '#FFFFFF',
        role: {
          vi: 'Viền nét mảnh gờ cắt giác kim cương (Stroke 1.2px)',
          en: 'Micro ridge lines defining diamond facets',
          kr: '다이아몬드 커팅 각면을 정의하는 마이크로 라인',
        },
      },
      {
        name: 'Obsidian Eyes',
        hex: '#0F172A',
        role: {
          vi: 'Đôi mắt đen than đá với điểm sáng ngôi sao 4 cánh',
          en: 'Deep obsidian eyes with 4-point star glints',
          kr: '4각 별빛 하이라이트가 빛나는 흑요석 눈동자',
        },
      },
      {
        name: 'Wisdom Glasses',
        hex: '#FFFFFF',
        role: {
          vi: 'Cặp kính tròn trí tuệ gọng trắng tinh khiết',
          en: 'Pure white round intellectual glasses frames',
          kr: '순백색 프레임의 원형 지혜 안경',
        },
      },
      {
        name: 'Reflective Floor',
        hex: '#00E5FF',
        role: {
          vi: 'Bóng phản chiếu sàn đa tầng (opacity 0.15)',
          en: 'Ambient cyan multi-tier floor glow',
          kr: '바닥면을 비추는 앰비언트 시안 반사광',
        },
      },
    ],
    anatomyRules: [
      {
        title: {
          vi: '1. Diện Mạo Thông Thái & Cặp Kính Trí Tuệ',
          en: '1. Intellectual Expression & Glass Frames',
          kr: '1. 지적인 표정과 안경 프레임',
        },
        details: [
          {
            vi: 'Đeo cặp kính tròn trí tuệ viền trắng sáng tinh khiết (#FFFFFF), phản ánh phong thái của một trợ lý giáo dục & tài chính thông minh.',
            en: 'Sporting circular wisdom eyeglasses with crisp white frames (#FFFFFF), reflecting a smart mentor aesthetic.',
            kr: '순백색 프레임(#FFFFFF)의 원형 지혜 안경을 착용하여 스마트한 멘토 분위기 연출.',
          },
          {
            vi: 'Đôi mắt đen than đá sâu thẳm (#0F172A) với điểm sáng ngôi sao 4 cánh phát quang, thể hiện ánh nhìn tinh anh, nhanh nhạy.',
            en: 'Deep charcoal obsidian eyes (#0F172A) illuminated by four-point celestial star specular glints.',
            kr: '4각 별 모양의 하이라이트 글린트가 박힌 깊은 흑요석 블랙 눈동자(#0F172A).',
          },
        ],
      },
      {
        title: {
          vi: '2. Càng Pha Lê Thanh Thoát & Chân Đốt Tinh Thể',
          en: '2. Refined Crystal Pincers & Angular Legs',
          kr: '2. 정제된 크리스털 집게발 & 각면 다리',
        },
        details: [
          {
            vi: 'Hai càng pha lê vươn cong thanh thoát theo tỷ lệ vàng, chuyển màu mượt mà từ xanh đậm lên đỉnh trắng ngọc băng #E0F7FA.',
            en: 'Dual crystal pincers sweeping upward with fluid golden-ratio curves, gradient-mapped from deep cyan to ice apex.',
            kr: '깊은 시안에서 아이스 하이라이트로 매끄럽게 전환되는 우아한 크리스털 집게발.',
          },
          {
            vi: 'Sáu chân bước tự nhiên dạng đốt tinh thể góc cạnh, vững chãi, thanh lịch; tuyệt đối không tạo cảm giác chân rết côn trùng.',
            en: 'Six naturally stepped crystalline faceted legs with sharp geometric joints, completely avoiding centipede-like insect legs.',
            kr: '지네 같은 곤충형 느낌을 완전히 배제한 6개의 깔끔한 기하학적 각면 크리스털 보행 다리.',
          },
        ],
      },
      {
        title: {
          vi: '3. Bảng Màu Tinh Thể Kim Cương Khúc Xạ',
          en: '3. Carat Diamond Crystal Refraction',
          kr: '3. 카라트 다이아몬드 굴절 컬러 팔레트',
        },
        details: [
          {
            vi: 'Mặt phẳng đỉnh đón sáng mang màu trắng ngọc băng (#E0F7FA); thân chính mang màu xanh ngọc Cyan thương hiệu (#00E5FF).',
            en: 'Apex lighting plane in arctic ice white (#E0F7FA); primary torso rendered in signature brand cyan (#00E5FF).',
            kr: '상단 빛을 받는 평면은 아이스 화이트(#E0F7FA), 몸체는 브랜드 시그니처 시안(#00E5FF).',
          },
          {
            vi: 'Các mặt nghiêng khúc xạ chiều sâu mang màu #00B4D8 và đáy đổ bóng #0077B6; đường gờ cắt giác viền nét mảnh màu trắng #FFFFFF.',
            en: 'Depth refraction facets in #00B4D8 with grounded base shadow in #0077B6; all facet ridges framed with crisp white strokes.',
            kr: '측면 굴절면 #00B4D8, 하단 섀도우 #0077B6 및 순백색(#FFFFFF) 마이크로 릿지 라인.',
          },
        ],
      },
    ],
    poseBreakdown: [
      {
        poseTitle: {
          vi: 'Tư Thế Mặc Định: Nâng Càng Đón Năng Lượng Carat',
          en: 'Default Stance: Raised Claws Carat Surge',
          kr: '기본 스탠스: 집게발을 든 에너지 서지 자세',
        },
        poseDesc: {
          vi: 'Tọa độ pivot cân bằng tại (200, 280), sẵn sàng cho hoạt họa nhún nhảy 60FPS',
          en: 'Dynamic pivot at (200, 280) optimized for spring bounce and claw raising physics',
          kr: '(200, 280) 중심축 기반의 60FPS 바운스 및 집게발 인터랙션 최적화',
        },
        points: [
          {
            vi: 'Hai càng giương cao tạo hình chữ V đắc thắng, thể hiện phần thưởng thành tích học tập.',
            en: 'Both pincers raised in a victorious V-gesture celebrating academic milestones.',
            kr: '학업 성취를 축하하는 승리의 V자 형태로 높이 치켜든 양 집게발.',
          },
          {
            vi: 'Bóng đổ sàn kép phản chiếu quầng sáng Cyan tạo cảm giác viên kim cương lơ lửng nhẹ.',
            en: 'Dual-layered floor shadow casting an ethereal cyan ambient reflection.',
            kr: '바닥에 은은한 시안빛 앰비언트를 형성하는 2중 레이어 접지 그림자.',
          },
        ],
      },
    ],
    constraints: [
      {
        vi: 'Tuyệt đối cấm sử dụng tone màu vàng cam luộc gây mất phẩm chất công nghệ K-Fintech.',
        en: 'Strictly prohibited: boiled orange/red crab hues that ruin high-tech K-Fintech aesthetics.',
        kr: '조리된 꽃게 연상 오렌지/레드 계열 사용 엄격 금지 — 핀테크 감성 준수.',
      },
      {
        vi: 'Tất cả các mặt đa giác đều dùng tọa độ điểm nguyên vẹn, các đường viền liên kết khép kín 100%.',
        en: 'All polygonal facets use clean vertex coordinates with 100% closed vector topologies.',
        kr: '모든 다각형 페이스는 정수 좌표 버텍스로 구성되어 100% 폐곡선 벡터 구조 유지.',
      },
    ],
  },
  {
    id: 'director',
    assetFile: 'char_director_master.svg',
    fileSize: '29.2 KB',
    svgPath: '/characters/char_director_master.svg',
    name: {
      vi: 'Thầy Giáo Viện Trưởng',
      en: 'The Hagwon Director',
      kr: '학원 원장님 (The Hagwon Director)',
    },
    title: {
      vi: 'Thầy Giáo Viện Trưởng (The Hagwon Director)',
      en: 'The Hagwon Director // Executive Mentor Rig',
      kr: '학원 원장 선생님 (The Hagwon Director)',
    },
    subtitle: {
      vi: 'Viện trưởng học viện Hàn Quốc 40-45 tuổi, đĩnh đạc, âu phục sang trọng, nụ cười uy tín',
      en: 'Korean Hagwon Executive Director (40-45 yo) — Dignified, Prestigious Navy Suit, Kind Authority',
      kr: '품격 있는 네이비 수트를 착용한 40-45세 한국 명문 학원 원장님',
    },
    roleBadge: {
      vi: 'NGƯỜI HƯỚNG DẪN UY TÍN (CHIEF MENTOR)',
      en: 'EXECUTIVE AUTHORITY RIG',
      kr: '신뢰의 최고 멘토 리더',
    },
    ratio: {
      vi: '1 : 7.2 (Tỷ lệ nam giới trưởng thành 40-45 tuổi)',
      en: '1 : 7.2 (Mature Executive Proportion 40-45 yo)',
      kr: '1 : 7.2 (성인 남성 원장님 표준 체형 비율)',
    },
    viewBox: '0 0 500 900',
    dimensions: '500 × 900 px (Strict Vertical)',
    groundPivot: {
      vi: 'x: 250, y: 860 (Tâm tiếp xúc giữa hai gót giày)',
      en: 'x: 250, y: 860 (Ground contact between heels)',
      kr: 'x: 250, y: 860 (양 발뒤꿈치 사이 접지점)',
    },
    summary: {
      vi: 'Rig nhân vật Thầy Giáo Viện Trưởng đứng đĩnh đạc, phong thái lãnh đạo học viện uy tín Hàn Quốc (40-45 tuổi). Tỷ lệ chuẩn 1:7.2, âu phục Charcoal Navy may đo cao cấp với cà vạt và giày da Oxford tiếp đất vững chắc tại y: 855. Tuyệt đối không cầm đạo cụ thừa, hai tay buông tự nhiên thể hiện sự tự tin và cởi mở.',
      en: 'The Hagwon Director executive mentor rig in a dignified upright front-facing stance. Mature adult male proportion 1:7.2 with tailored two-piece Charcoal Navy suit, pointed collar shirt, slim necktie, and classic Oxford leather shoes grounded firmly at y: 855. Zero handheld clutter.',
      kr: '기품 있는 직립 A-스탠스 자세의 명문 학원 원장님 캐릭터 리그. 1:7.2 성인 남성 비율, 다크 네이비 테일러드 수트, 화이트 드레스 셔츠와 슬림 타이, 옥스포드화 착용.',
    },
    architecture: [
      {
        label: { vi: 'Hệ Khung Canvas (viewBox)', en: 'Canvas Architecture', kr: '캔버스 구조' },
        value: {
          vi: '0 0 500 900 (Tỷ lệ đứng thẳng nghiêm ngặt)',
          en: '0 0 500 900 (Strict Vertical Proportion)',
          kr: '0 0 500 900 (수직 직립 표준 규격)',
        },
      },
      {
        label: { vi: 'Tiếp Đất Toàn Cục (Global Pivot)', en: 'Global Ground Pivot', kr: '지면 접지 중심축' },
        value: {
          vi: '(250, 860) - Tâm điểm tiếp xúc giữa hai gót giày',
          en: '(250, 860) - Center point between heels',
          kr: '(250, 860) - 양 발뒤꿈치 사이 접지점',
        },
      },
      {
        label: { vi: 'Tư Thế Đứng (Stance)', en: 'Stance Dynamic', kr: '스탠스 형태' },
        value: {
          vi: 'Dignified gentle A-stance (hai bàn chân cách nhau ~60px)',
          en: 'Dignified gentle A-stance (~60px base heel spacing)',
          kr: '기품 있는 A-스탠스 (양발 간격 약 60px)',
        },
      },
      {
        label: { vi: 'Tỷ Lệ Cơ Thể (Body Ratio)', en: 'Head-to-Body Ratio', kr: '신체 비율' },
        value: {
          vi: '1:7.2 (Nam giới trưởng thành 40-45 tuổi đĩnh đạc)',
          en: '1:7.2 (Mature adult male 40-45 years old)',
          kr: '1:7.2 (40-45세 성인 남성 리더 비율)',
        },
      },
      {
        label: { vi: 'Bố Cục Cánh Tay', en: 'Arms & Hands Layout', kr: '팔 및 손가락 배치' },
        value: {
          vi: 'Hai tay buông thẳng tự nhiên dọc đùi, các ngón tay thư giãn',
          en: 'Both arms hang naturally along thighs with relaxed fingers',
          kr: '양팔은 허벅지 옆으로 자연스럽게 늘어뜨린 릴랙스 핸드',
        },
      },
      {
        label: { vi: 'Quy Chuẩn Đạo Cụ', en: 'Prop Constraints', kr: '소품 배제 규칙' },
        value: {
          vi: 'ZERO handheld props (Tuyệt đối KHÔNG cầm kẹp tài liệu hay sổ sách)',
          en: 'ZERO handheld props (NO folders, NO clipboards)',
          kr: '불필요한 서류나 소품 완전 배제 (순수 포스처 집중)',
        },
      },
    ],
    colorPalette: [
      {
        name: 'Base Skin',
        hex: '#F6D6BA',
        role: {
          vi: 'Màu da ấm ngà trưởng thành (Mature Asian Skin)',
          en: 'Mature warm Asian ivory skin tone',
          kr: '성숙하고 따뜻한 아시안 피부톤',
        },
      },
      {
        name: 'Skin Shading',
        hex: '#E5B995',
        role: {
          vi: 'Đổ bóng góc hàm, cổ và vành tai (Cel-shading)',
          en: 'Cel-shading under jawline, neck, and ears',
          kr: '턱선, 목 및 귀 밑 셀 섀딩 음영',
        },
      },
      {
        name: 'Suit & Trousers',
        hex: '#252E3E',
        role: {
          vi: 'Vải âu phục & quần tây Charcoal Navy lịch lãm',
          en: 'Charcoal Navy tailored suit jacket & dress trousers',
          kr: '품격 있는 차콜 네이비 테일러드 수트 및 슬랙스',
        },
      },
      {
        name: 'Suit Shading',
        hex: '#1B222E',
        role: {
          vi: 'Khối đổ bóng nẹp áo, ve áo & nếp ly quần',
          en: 'Deep shadow panels on lapels, seams, and trouser creases',
          kr: '라펠, 솔기선 및 바지 주름 섀도우',
        },
      },
      {
        name: 'Suit Highlights',
        hex: '#354257',
        role: {
          vi: 'Ánh sáng phản chiếu đường chỉ may và bờ vai',
          en: 'Subtle specular highlights along shoulder and seam lines',
          kr: '어깨 라인과 스티치 반사 하이라이트',
        },
      },
      {
        name: 'Dress Shirt',
        hex: '#FFFFFF',
        role: {
          vi: 'Sơ mi trắng Oxford & cổ tay áo (Shading: #E2E8F0)',
          en: 'Crisp Oxford white dress shirt & cuffs',
          kr: '반듯한 옥스포드 화이트 셔츠 및 소매 커프스',
        },
      },
      {
        name: 'Slim Necktie',
        hex: '#1E2633',
        role: {
          vi: 'Cà vạt bản hẹp màu Dark Obsidian Slate',
          en: 'Dark Obsidian Slate formal narrow necktie',
          kr: '다크 옵시디언 슬레이트 정장 슬림 넥타이',
        },
      },
      {
        name: 'Oxford Shoes',
        hex: '#181E29',
        role: {
          vi: 'Giày da Oxford cổ điển (Đế ngoài: #0F131A)',
          en: 'Classic Oxford leather dress shoes with dark sole',
          kr: '클래식 옥스포드 가죽 구두 및 다크 아웃솔',
        },
      },
      {
        name: 'Titanium Glasses',
        hex: '#94A3B8',
        role: {
          vi: 'Gọng kính titan mảnh hiện đại (stroke: 1.4px)',
          en: 'Modern rectangular titanium wire frames with glare line',
          kr: '초슬림 티타늄 와이어 프레임 안경 및 렌즈 반사광',
        },
      },
      {
        name: 'Hair Obsidian',
        hex: '#1E2430',
        role: {
          vi: 'Tóc đen rẽ ngôi 7/3 phong thái Hàn Quốc',
          en: 'Korean 7/3 side-part hair in Charcoal Black',
          kr: '단정한 한국형 7:3 가르마 흑발 헤어',
        },
      },
      {
        name: 'Silver Strands',
        hex: '#64748B',
        role: {
          vi: 'Vài sợi tóc muối tiêu lịch lãm nơi thái dương',
          en: 'Distinguished silver-gray temple hair strands',
          kr: '관자놀이의 품격 있는 실버 그레이 새치 포인트',
        },
      },
      {
        name: 'Ground Shadow',
        hex: '#0F131A',
        role: {
          vi: 'Bóng đổ tiếp đất (Ellipse rx: 140, ry: 16, opacity 0.22)',
          en: 'Ground contact shadow ellipse (opacity 0.22)',
          kr: '안정적인 접지 타원 섀도우 (opacity 0.22)',
        },
      },
    ],
    anatomyRules: [
      {
        title: {
          vi: '1. Âu Phục May Đo & Cà Vạt Bản Hẹp',
          en: '1. Executive Suit & Tailored Detailing',
          kr: '1. 테일러드 네이비 수트 및 슬림 타이',
        },
        details: [
          {
            vi: 'Bộ vest 2 mảnh màu Charcoal Navy (#252E3E) với cầu vai độn sắc nét trải rộng từ x: 150 đến x: 350 tại y: 255.',
            en: 'Two-piece tailored suit jacket in Charcoal Navy (#252E3E) with crisp padded shoulders spanning x: 150-350 at y: 255.',
            kr: 'y: 255에서 150~350에 걸친 샤프한 패디드 숄더 라인의 차콜 네이비 투피스 수트(#252E3E).',
          },
          {
            vi: 'Ve áo chữ V sắc cạnh với mảng đổ bóng cel-shading (#1B222E) chạy dài xuống nút cài eo tại y: 430; túi ngực trái (x: 290, y: 320).',
            en: 'Sharp notched suit lapels with cel-shading shadow panels (#1B222E) framing V-chest down to waist button (y: 430).',
            kr: 'y: 430 버튼까지 이어지는 날렵한 V자 라펠과 셀 섀딩(#1B222E), 좌측 가슴 포켓(290, 320).',
          },
          {
            vi: 'Áo sơ mi trắng Oxford (#FFFFFF) cổ bẻ đứng ôm gọn cổ, kết hợp cà vạt hẹp màu Dark Obsidian (#1E2633) thắt nút cân đối.',
            en: 'Crisp Oxford white dress shirt (#FFFFFF) with stiff pointed collar and formal dark obsidian necktie (#1E2633).',
            kr: '반듯한 칼라의 옥스포드 화이트 셔츠(#FFFFFF)와 대칭으로 정돈된 다크 옵시디언 넥타이(#1E2633).',
          },
        ],
      },
      {
        title: {
          vi: '2. Cánh Tay, Cổ Tay Áo & Giày Da Oxford',
          en: '2. Symmetrical Sleeves, Cuffs & Oxford Shoes',
          kr: '2. 소매 커프스 마감 및 옥스포드 슈즈',
        },
        details: [
          {
            vi: 'Ống tay áo vest kết thúc chuẩn mực tại y: 515; cổ tay áo sơ mi trắng (#FFFFFF) lộ đều đúng 6px trước cổ tay.',
            en: 'Suit sleeves terminate cleanly at y: 515; crisp white shirt cuffs peek out exactly 6px past jacket sleeves.',
            kr: 'y: 515에서 끝나는 자켓 소매 밖으로 정확히 6px 돌출되는 단정한 화이트 커프스(#FFFFFF).',
          },
          {
            vi: 'Bàn tay màu da ấm (#F6D6BA) với các ngón tay tự nhiên, buông thư giãn dọc theo hai bên ống quần.',
            en: 'Natural hands in warm Asian tone (#F6D6BA) with relaxed fingers resting along the thighs.',
            kr: '허벅지 옆으로 편안하게 뻗은 자연스러운 손가락 관절 표현(#F6D6BA).',
          },
          {
            vi: 'Quần tây ống đứng Charcoal Navy xếp ly giữa (#1B222E), kết hợp giày da Oxford (#181E29) tiếp đất vững chãi tại y: 855.',
            en: 'Straight-leg trousers with crisp center creases, paired with classic Oxford leather shoes grounded at y: 855.',
            kr: '선명한 앞주름 슬랙스와 y: 855 지면에 견고하게 접지된 클래식 옥스포드 구두(#181E29).',
          },
        ],
      },
      {
        title: {
          vi: '3. Diện Mạo Khuôn Mặt, Mắt Kính Titan & Tóc 7/3',
          en: '3. Facial Anatomy, Titanium Frames & 7/3 Hair',
          kr: '3. 지적인 마스크, 티타늄 안경 & 7:3 가르마',
        },
        details: [
          {
            vi: 'Cổ giải phẫu (~38px) có mảng đổ bóng dưới cằm (#E5B995); khung cằm vuông nam tính với đáy cằm phẳng (~34px), không nhọn hình yêu tinh.',
            en: 'Anatomical neck with under-jaw cel-shading; handsome masculine square jawline with flat-bottomed chin (~34px).',
            kr: '턱밑 음영(#E5B995)과 약 34px 너비의 평평하고 듬직한 스퀘어 턱선(뾰족한 고블린 턱 완전 배제).',
          },
          {
            vi: 'Mắt mí đôi điềm đạm, tròng mắt đen (#111827) điểm ánh sáng trắng nhỏ; khóe miệng khép mỉm cười kín đáo thể hiện uy quyền nhân từ.',
            en: 'Composed double-eyelid eyes with dark irises (#111827) and a subtle, closed-mouth mentor smile.',
            kr: '차분한 쌍꺼풀 눈매와 다크 아이리스(#111827), 든든한 신뢰감을 주는 온화한 다문 입술 미소.',
          },
          {
            vi: 'Mắt kính titan siêu mỏng màu bạc (#94A3B8, stroke: 1.4px) và mái tóc rẽ ngôi 7/3 đen tuyền điểm vài sợi muối tiêu (#64748B) thái dương.',
            en: 'Modern rectangular titanium wire frames (#94A3B8) and distinguished Korean 7/3 side-part hair with silver streaks.',
            kr: '초슬림 실버 티타늄 프레임 안경(#94A3B8) 및 관자놀이에 은은한 은발이 섞인 품격 있는 7:3 흑발 헤어.',
          },
        ],
      },
    ],
    poseBreakdown: [
      {
        poseTitle: {
          vi: 'Tư Thế Đứng Đĩnh Đạc Chính Diện (Dignified A-Stance)',
          en: 'Dignified Front A-Stance',
          kr: '기품 있는 정면 직립 A-스탠스',
        },
        poseDesc: {
          vi: 'Tọa độ trục x: 250, tiếp đất chuẩn y: 855-860',
          en: 'Centered along global pivot x: 250, grounded between heels at y: 860',
          kr: '중심축 x: 250, 양 발뒤꿈치 접지선 y: 860',
        },
        points: [
          {
            vi: 'Đứng thẳng đĩnh đạc, hai chân tạo góc mở nhẹ (A-stance) với khoảng cách gót ~60px, toát lên phong thái viện trưởng giàu kinh nghiệm.',
            en: 'Upright posture with feet spaced ~60px apart, projecting seasoned leadership and trust.',
            kr: '양발 약 60px 간격의 안정적인 A-스탠스로 원장으로서의 오랜 경륜과 권위를 표현.',
          },
          {
            vi: 'Bóng tiếp xúc sàn dạng hình elip tại (250, 858), rx="140", ry="16", opacity 0.22 giúp nhân vật bám chắc mặt đất thực tế.',
            en: 'Realistic ground shadow ellipse centered at (250, 858), rx="140", ry="16", opacity 0.22.',
            kr: '(250, 858) 중심의 타원형 지면 섀도우(rx: 140, ry: 16, opacity 0.22)로 현실감 넘치는 접지감 구현.',
          },
        ],
      },
    ],
    constraints: [
      {
        vi: 'Tỷ lệ đầu:thân nghiêm ngặt 1:7.2, giữ vững vóc dáng trưởng thành, không biến dạng khi scale trên Remotion Canvas.',
        en: 'Strict 1:7.2 head-to-body proportion maintained across all camera zoom levels.',
        kr: '카메라 줌 변동에도 성인 남성의 1:7.2 비율을 완벽하게 고정 유지.',
      },
      {
        vi: 'Không có đạo cụ rời trên tay (sổ sách, tài liệu), giữ bố cục hình thể thuần khiết cho các chuyển cảnh đối thoại.',
        en: 'Zero extraneous handheld props to guarantee pristine posture during narrative dialogue transitions.',
        kr: '불필요한 서류나 소품을 배제하여 내러티브 대화 및 인포그래픽 장면에 최적화.',
      },
    ],
  },
];

export const CharacterCastSection: React.FC<CharacterCastSectionProps> = ({ currentLang }) => {
  const [selectedId, setSelectedId] = useState<CharacterId>('student');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'architecture' | 'palette' | 'anatomy' | 'poses'>(
    'architecture'
  );
  const [studentViewportMode, setStudentViewportMode] = useState<'dual' | 'front' | 'walk'>('dual');

  const activeChar = CHARACTERS.find((c) => c.id === selectedId) || CHARACTERS[0];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const getStudentClipStyle = () => {
    if (activeChar.id !== 'student') return {};
    if (studentViewportMode === 'front') {
      return {
        clipPath: 'inset(0 50% 0 0)',
        transform: 'scale(1.9) translateX(25%)',
        transformOrigin: 'center center',
      };
    }
    if (studentViewportMode === 'walk') {
      return {
        clipPath: 'inset(0 0 0 50%)',
        transform: 'scale(1.9) translateX(-25%)',
        transformOrigin: 'center center',
      };
    }
    return {};
  };

  const dictLabels = {
    sectionTag: '02 // CANONICAL CHARACTER CAST RIGS',
    sectionTitle: {
      vi: 'BỘ BA NHÂN VẬT CHÍNH',
      en: 'CANONICAL CHARACTER CAST',
      kr: '3대 핵심 캐릭터 리그 규격',
    },
    sectionDesc: {
      vi: 'Đặc tả kỹ thuật hình học, tỷ lệ nhân trắc học và bảng màu chuẩn hóa cho 3 nhân vật cốt lõi trong hệ thống Video-as-Code. File vector .svg nguyên bản, không biến dạng, sẵn sàng cho timeline 60FPS.',
      en: 'Geometric architecture, canonical proportions, and locked color palettes for the 3 core cast rigs in the programmatic Video-as-Code pipeline. Zero rasterization, 100% vector fidelity.',
      kr: '비디오-애즈-코드 시스템을 위한 3대 핵심 캐릭터의 벡터 리그 지오메트리, 신체 비율 및 표준 컬러 팔레트 규격서. 래스터 왜곡 없는 100% 순수 벡터 에셋.',
    },
    statusLocked: {
      vi: 'STATUS: ĐÃ KHÓA THÔNG SỐ',
      en: 'STATUS: PRODUCTION LOCKED',
      kr: '상태: 프로덕션 규격 락',
    },
    downloadSvg: {
      vi: 'TẢI FILE .SVG',
      en: 'DOWNLOAD .SVG',
      kr: '.SVG 다운로드',
    },
    openSvg: {
      vi: 'XEM BẢN GỐC',
      en: 'OPEN RAW SVG',
      kr: '원본 SVG 열기',
    },
    downloadZipBundle: {
      vi: 'TẢI GÓI ZIP (.ZIP)',
      en: 'DOWNLOAD ZIP BUNDLE',
      kr: '전체 ZIP 패키지 다운로드',
    },
    viewBoxLabel: {
      vi: 'KHUNG HÌNH (VIEWBOX):',
      en: 'VIEWBOX:',
      kr: '뷰박스 규격:',
    },
    viewportModeLabel: {
      vi: 'KHUNG NHÌN:',
      en: 'VIEWPORT:',
      kr: '뷰포트 모드:',
    },
    viewportDual: {
      vi: 'DUAL RIG (TOÀN BỘ)',
      en: 'DUAL RIG',
      kr: '듀얼 뷰포트',
    },
    viewportFront: {
      vi: 'FRONT (CHÍNH DIỆN)',
      en: 'FRONT VIEW',
      kr: '정면 스탠딩',
    },
    viewportWalk: {
      vi: 'WALK 3/4 (SẢI BƯỚC)',
      en: 'WALK 3/4',
      kr: '3/4 보행 자세',
    },
    tabArch: {
      vi: 'HỆ TỌA ĐỘ & TỶ LỆ',
      en: 'ARCHITECTURE & METRICS',
      kr: '좌표계 및 비율',
    },
    tabPalette: {
      vi: 'BẢNG MÀU CHUẨN',
      en: 'CANONICAL PALETTE',
      kr: '표준 컬러 팔레트',
    },
    tabAnatomy: {
      vi: 'DIỆN MẠO & TRANG PHỤC',
      en: 'ANATOMY & APPAREL',
      kr: '디자인 규격 & 복장',
    },
    tabPoses: {
      vi: 'TƯ THẾ & DYNAMICS',
      en: 'POSES & DYNAMICS',
      kr: '자세 및 동작 규격',
    },
    copyHint: {
      vi: 'NHẤP VÀO Ô MÀU ĐỂ COPY MÃ HEX TOKENS',
      en: 'CLICK ANY SWATCH TO COPY HEX TOKEN',
      kr: '컬러를 클릭하여 HEX 코드를 복사하세요',
    },
    copiedToast: {
      vi: 'ĐÃ COPY MÃ',
      en: 'COPIED',
      kr: '복사 완료',
    },
    constraintsHeader: {
      vi: 'Ràng Buộc Kỹ Thuật SVG XML Pipeline',
      en: 'SVG XML Pipeline Constraints',
      kr: 'SVG XML 파이프라인 기술 제약 조건',
    },
    ratioLabel: {
      vi: 'TỶ LỆ:',
      en: 'RATIO:',
      kr: '비율:',
    },
    vaultBadge: {
      vi: 'KHO ASSET VECTOR CRABIT',
      en: 'CRABIT BRAND VAULT',
      kr: '크래빗 브랜드 벡터 볼트',
    },
    zeroAE: {
      vi: '100% CODE RIG • ZERO AFTER EFFECTS KEYFRAMES',
      en: '100% CODE RIG • ZERO AFTER EFFECTS KEYFRAMES',
      kr: '100% 코드 기반 리그 • AE 키프레임 지옥 탈피',
    },
  };

  return (
    <section id="character-cast" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto brutalist-strict relative">
      {/* BACKGROUND DECORATIVE ACCENTS */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00E5FF]/5 blur-3xl pointer-events-none -translate-y-1/2 rounded-full" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-[#2563EB]/5 blur-3xl pointer-events-none rounded-full" />

      {/* SECTION HEADER */}
      <div className="mb-12 border-b border-[#1F1F2E] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF] px-2.5 py-1 bg-[#031E2B] border border-[#00E5FF]/40 mb-3 shadow-cyan-border">
            <span className="w-1.5 h-1.5 bg-[#00E5FF] animate-pulse" />
            <span>{dictLabels.sectionTag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-white tracking-tight uppercase">
            {dictLabels.sectionTitle[currentLang]}
          </h2>
          <p className="text-sm md:text-base text-[#8A8FA3] mt-2 max-w-3xl font-sans">
            {dictLabels.sectionDesc[currentLang]}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#8A8FA3]">
          <div className="px-3 py-1.5 bg-[#0A0C14] border border-[#10B981]/50 text-[#10B981] flex items-center gap-2">
            <ShieldCheck size={14} />
            <span>[ 3 RIGS VERIFIED & LOCKED ]</span>
          </div>

          <a
            href="/downloads/Crabit_Lego_Assets_SVG.zip"
            download="Crabit_Lego_Assets_SVG.zip"
            className="px-3 py-1.5 bg-[#031E2B] border border-[#00E5FF]/60 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] font-bold flex items-center gap-1.5 transition-all shadow-cyan-glow"
            title="Download all characters and props in one ZIP"
          >
            <Download size={13} />
            <span>{dictLabels.downloadZipBundle[currentLang]}</span>
          </a>
        </div>
      </div>

      {/* 1. CHARACTER SELECTOR CARDS WITH DIRECT DOWNLOAD BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {CHARACTERS.map((char) => {
          const isSelected = char.id === selectedId;
          return (
            <div
              key={char.id}
              onClick={() => {
                setSelectedId(char.id);
                setStudentViewportMode('dual');
              }}
              className={`p-4 cursor-pointer text-left transition-all border flex flex-col justify-between relative group ${
                isSelected
                  ? 'bg-[#0E1524] border-[#00E5FF] shadow-cyan-border'
                  : 'bg-[#0A0C14] border-[#1F1F2E] hover:border-[#00E5FF]/40 text-[#8A8FA3]'
              }`}
            >
              {/* Highlight top bar */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E5FF] via-[#2563EB] to-[#10B981]" />
              )}

              <div className="flex items-center gap-4 mb-3">
                {/* Mini Thumbnail Preview */}
                <div
                  className={`w-14 h-14 shrink-0 border flex items-center justify-center p-1 overflow-hidden transition-transform duration-300 ${
                    isSelected
                      ? 'border-[#00E5FF] bg-[#05050A] scale-105 shadow-cyan-glow'
                      : 'border-[#1F1F2E] bg-[#05050A] group-hover:border-slate-500'
                  }`}
                >
                  <img
                    src={char.svgPath}
                    alt={char.name[currentLang]}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 border ${
                        char.id === 'student'
                          ? 'border-[#2563EB]/60 text-[#38BDF8] bg-[#1E293B]/50'
                          : char.id === 'mascot'
                          ? 'border-[#00E5FF]/60 text-[#00E5FF] bg-[#031E2B]'
                          : 'border-[#F59E0B]/60 text-[#F59E0B] bg-[#291E0B]/50'
                      }`}
                    >
                      {char.assetFile}
                    </span>
                    <span className="text-[10px] font-mono text-[#8A8FA3]">{char.fileSize}</span>
                  </div>
                  <div
                    className={`font-sans font-bold text-sm truncate ${
                      isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}
                  >
                    {char.name[currentLang]}
                  </div>
                  <div className="text-[11px] font-mono text-[#8A8FA3] truncate mt-0.5">
                    {char.roleBadge[currentLang]}
                  </div>
                </div>
              </div>

              {/* CARD FOOTER: Direct Download Button for this Character */}
              <div className="pt-2 border-t border-[#1F1F2E] flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-[#8A8FA3]">
                  {char.ratio[currentLang].split('(')[0].trim()}
                </span>
                <a
                  href={char.svgPath}
                  download={char.assetFile}
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1 bg-[#05050A] hover:bg-[#00E5FF] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] font-bold text-[10px] flex items-center gap-1.5 transition-all"
                  title={`Download ${char.assetFile}`}
                >
                  <ArrowDownToLine size={11} />
                  <span>{dictLabels.downloadSvg[currentLang]}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. MAIN CHARACTER DOSSIER WORKSTATION */}
      <div className="bg-[#0A0C14] border border-[#1F1F2E] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl relative">
        {/* LEFT COLUMN: HIGH-PRECISION SVG RIG VIEWER (5 cols) */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#1F1F2E] bg-[#05050A] flex flex-col justify-between relative p-6">
          {/* Top Inspector Header */}
          <div className="flex items-center justify-between mb-4 border-b border-[#1F1F2E] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-white tracking-wider">
                {activeChar.assetFile}
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#00E5FF] bg-[#031E2B] px-2 py-0.5 border border-[#00E5FF]/40">
              {dictLabels.viewBoxLabel[currentLang]} {activeChar.viewBox}
            </div>
          </div>

          {/* Student Viewport Mode Switcher (If Student is active) */}
          {activeChar.id === 'student' && (
            <div className="mb-4 bg-[#0A0C14] border border-[#1F1F2E] p-1.5 flex items-center justify-between gap-1">
              <span className="text-[10px] font-mono text-[#8A8FA3] px-2 uppercase flex items-center gap-1">
                <Compass size={11} className="text-[#00E5FF]" />
                <span>{dictLabels.viewportModeLabel[currentLang]}</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setStudentViewportMode('dual')}
                  className={`px-2 py-1 text-[10px] font-mono font-bold transition-all ${
                    studentViewportMode === 'dual'
                      ? 'bg-[#00E5FF] text-[#05050A]'
                      : 'text-slate-400 hover:text-white hover:bg-[#1F1F2E]'
                  }`}
                >
                  {dictLabels.viewportDual[currentLang]}
                </button>
                <button
                  onClick={() => setStudentViewportMode('front')}
                  className={`px-2 py-1 text-[10px] font-mono font-bold transition-all ${
                    studentViewportMode === 'front'
                      ? 'bg-[#00E5FF] text-[#05050A]'
                      : 'text-slate-400 hover:text-white hover:bg-[#1F1F2E]'
                  }`}
                >
                  {dictLabels.viewportFront[currentLang]}
                </button>
                <button
                  onClick={() => setStudentViewportMode('walk')}
                  className={`px-2 py-1 text-[10px] font-mono font-bold transition-all ${
                    studentViewportMode === 'walk'
                      ? 'bg-[#00E5FF] text-[#05050A]'
                      : 'text-slate-400 hover:text-white hover:bg-[#1F1F2E]'
                  }`}
                >
                  {dictLabels.viewportWalk[currentLang]}
                </button>
              </div>
            </div>
          )}

          {/* Character SVG Display Stage */}
          <div className="relative w-full aspect-square max-h-[520px] bg-[#0A0C14] border border-[#1F1F2E] flex items-center justify-center p-4 overflow-hidden cad-grid-bg group">
            {/* Tech Crosshairs & Blueprint Markers */}
            <div className="absolute top-2 left-2 text-[9px] font-mono text-[#00E5FF]/60 select-none">
              + [0,0]
            </div>
            <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#00E5FF]/60 select-none">
              PIVOT: {activeChar.groundPivot[currentLang].split(' ')[0]}
            </div>
            <div className="absolute top-2 right-2 text-[9px] font-mono text-slate-500 select-none">
              100% SVG NATIVE
            </div>

            {/* The SVG Image Container */}
            <div
              className="w-full h-full flex items-center justify-center transition-all duration-300"
              style={getStudentClipStyle()}
            >
              <img
                src={activeChar.svgPath}
                alt={activeChar.name[currentLang]}
                className="max-w-full max-h-full object-contain filter drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Action Bar Beneath Canvas with Large Download Button */}
          <div className="mt-4 pt-3 border-t border-[#1F1F2E] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="text-[11px] text-[#8A8FA3]">
              {dictLabels.ratioLabel[currentLang]}{' '}
              <span className="text-white font-bold">{activeChar.ratio[currentLang]}</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activeChar.svgPath}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1.5 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] text-slate-300 hover:text-[#00E5FF] text-[10px] font-bold flex items-center gap-1.5 transition-all"
                title="Open RAW SVG in new tab"
              >
                <ExternalLink size={12} />
                <span>{dictLabels.openSvg[currentLang]}</span>
              </a>

              <a
                href={activeChar.svgPath}
                download={activeChar.assetFile}
                className="px-3 py-1.5 bg-[#031E2B] border border-[#00E5FF]/60 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] text-[10px] font-bold flex items-center gap-1.5 transition-all shadow-cyan-glow"
                title={`Download ${activeChar.assetFile}`}
              >
                <Download size={12} />
                <span>
                  {dictLabels.downloadSvg[currentLang]} ({activeChar.fileSize})
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RIG SPECIFICATIONS & DOSSIER (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Header / Title */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono font-bold text-[#00E5FF] tracking-wider uppercase">
                {activeChar.roleBadge[currentLang]}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#10B981] bg-[#0A1A14] border border-[#10B981]/40 px-2 py-0.5">
                  {dictLabels.statusLocked[currentLang]}
                </span>
                <a
                  href={activeChar.svgPath}
                  download={activeChar.assetFile}
                  className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 bg-[#031E2B] border border-[#00E5FF]/40 text-[#00E5FF] text-[10px] font-mono font-bold hover:bg-[#00E5FF] hover:text-[#05050A] transition-all"
                >
                  <Download size={10} />
                  <span>{activeChar.assetFile}</span>
                </a>
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl font-sans font-black text-white tracking-tight uppercase mb-2">
              {activeChar.title[currentLang]}
            </h3>
            <p className="text-sm text-[#8A8FA3] leading-relaxed mb-6 font-sans">
              {activeChar.summary[currentLang]}
            </p>

            {/* TAB NAVIGATION: Architecture / Palette / Anatomy / Poses */}
            <div className="border-b border-[#1F1F2E] mb-6 flex items-center gap-2 overflow-x-auto pb-1 font-mono text-xs">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`py-2 px-3 border-b-2 font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'architecture'
                    ? 'border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/5'
                    : 'border-transparent text-[#8A8FA3] hover:text-white'
                }`}
              >
                <Ruler size={14} />
                <span>{dictLabels.tabArch[currentLang]}</span>
              </button>

              <button
                onClick={() => setActiveTab('palette')}
                className={`py-2 px-3 border-b-2 font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'palette'
                    ? 'border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/5'
                    : 'border-transparent text-[#8A8FA3] hover:text-white'
                }`}
              >
                <Palette size={14} />
                <span>{dictLabels.tabPalette[currentLang]}</span>
              </button>

              <button
                onClick={() => setActiveTab('anatomy')}
                className={`py-2 px-3 border-b-2 font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'anatomy'
                    ? 'border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/5'
                    : 'border-transparent text-[#8A8FA3] hover:text-white'
                }`}
              >
                <Layers size={14} />
                <span>{dictLabels.tabAnatomy[currentLang]}</span>
              </button>

              <button
                onClick={() => setActiveTab('poses')}
                className={`py-2 px-3 border-b-2 font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'poses'
                    ? 'border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/5'
                    : 'border-transparent text-[#8A8FA3] hover:text-white'
                }`}
              >
                <Sparkles size={14} />
                <span>{dictLabels.tabPoses[currentLang]}</span>
              </button>
            </div>

            {/* TAB CONTENT 1: ARCHITECTURE & METRICS */}
            {activeTab === 'architecture' && (
              <div className="space-y-4 font-mono text-xs animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeChar.architecture.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#05050A] border border-[#1F1F2E] p-3 hover:border-[#00E5FF]/40 transition-all"
                    >
                      <div className="text-[10px] text-[#8A8FA3] uppercase mb-1">
                        {item.label[currentLang]}
                      </div>
                      <div className="text-white font-bold text-xs break-all">
                        {item.value[currentLang]}
                      </div>
                    </div>
                  ))}
                </div>

                {/* XML & Code Constraints Box */}
                <div className="bg-[#05050A] border border-[#1F1F2E] p-4 mt-4">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#00E5FF] mb-2 uppercase">
                    <FileCode size={14} />
                    <span>{dictLabels.constraintsHeader[currentLang]}</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300 font-sans">
                    {activeChar.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                        <span>{c[currentLang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: CANONICAL PALETTE TOKENS */}
            {activeTab === 'palette' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="text-xs font-mono text-[#8A8FA3] mb-2 flex items-center justify-between">
                  <span>{dictLabels.copyHint[currentLang]}</span>
                  {copiedHex && (
                    <span className="text-[#10B981] font-bold flex items-center gap-1">
                      <Check size={12} /> {dictLabels.copiedToast[currentLang]} {copiedHex}!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {activeChar.colorPalette.map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => handleCopyColor(col.hex)}
                      className="bg-[#05050A] border border-[#1F1F2E] hover:border-[#00E5FF] p-2.5 flex items-center gap-3 text-left transition-all group"
                    >
                      <div
                        className="w-8 h-8 shrink-0 border border-[#2D2D44] shadow-sm relative"
                        style={{ backgroundColor: col.hex }}
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-white group-hover:text-[#00E5FF]">
                            {col.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#8A8FA3] group-hover:text-white flex items-center gap-1">
                            {col.hex}
                            <Copy size={10} />
                          </span>
                        </div>
                        <div className="text-[10px] text-[#8A8FA3] truncate font-sans">
                          {col.role[currentLang]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: ANATOMICAL & APPAREL DESIGN RULES */}
            {activeTab === 'anatomy' && (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 animate-fadeIn">
                {activeChar.anatomyRules.map((sec, idx) => (
                  <div key={idx} className="bg-[#05050A] border border-[#1F1F2E] p-4">
                    <h4 className="text-xs font-mono font-bold text-[#00E5FF] uppercase mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#00E5FF]" />
                      <span>{sec.title[currentLang]}</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans">
                      {sec.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check size={13} className="text-[#10B981] mt-0.5 shrink-0" strokeWidth={2.5} />
                          <span className="leading-relaxed">{d[currentLang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* TAB CONTENT 4: POSES & RIG DYNAMICS */}
            {activeTab === 'poses' && (
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1 animate-fadeIn">
                {activeChar.poseBreakdown.map((pose, idx) => (
                  <div key={idx} className="bg-[#05050A] border border-[#1F1F2E] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-mono font-bold text-white uppercase">
                        {pose.poseTitle[currentLang]}
                      </h4>
                      <span className="text-[10px] font-mono text-[#10B981] bg-[#0A1A14] border border-[#10B981]/40 px-2 py-0.5">
                        RIGGED
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-[#00E5FF] mb-3">
                      {pose.poseDesc[currentLang]}
                    </p>
                    <ul className="space-y-2 text-xs text-slate-300 font-sans">
                      {pose.points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full mt-1.5 shrink-0" />
                          <span className="leading-relaxed">{pt[currentLang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dossier Footer Info */}
          <div className="mt-8 pt-4 border-t border-[#1F1F2E] flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8A8FA3]">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">{dictLabels.vaultBadge[currentLang]}</span>
              <span>//</span>
              <span>SITE-CONFIGS/CRABIT-KOREA/ASSETS</span>
            </div>
            <div className="text-[11px] text-[#00E5FF]">
              {dictLabels.zeroAE[currentLang]}
            </div>
          </div>
        </div>
      </div>

      {/* 3. THREE-WAY COMPARATIVE MATRIX SUMMARY STRIP WITH DOWNLOAD BUTTONS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        {CHARACTERS.map((char) => (
          <div
            key={char.id}
            className="bg-[#0A0C14] border border-[#1F1F2E] p-4 flex items-center justify-between gap-3 group hover:border-[#00E5FF]/40 transition-all"
          >
            <div className="min-w-0 flex-1">
              <div className="text-[10px] text-[#8A8FA3] uppercase truncate">
                {char.name[currentLang]}
              </div>
              <div className="text-white font-bold text-sm truncate">{char.assetFile}</div>
              <div
                className={`text-[11px] truncate ${
                  char.id === 'student'
                    ? 'text-[#38BDF8]'
                    : char.id === 'mascot'
                    ? 'text-[#00E5FF]'
                    : 'text-[#F59E0B]'
                }`}
              >
                {char.ratio[currentLang].split('(')[0].trim()} • {char.dimensions.split(' ')[0]}
              </div>
            </div>

            <a
              href={char.svgPath}
              download={char.assetFile}
              className="p-2.5 bg-[#05050A] hover:bg-[#00E5FF] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] transition-all shrink-0"
              title={`Download ${char.assetFile}`}
            >
              <Download size={15} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
