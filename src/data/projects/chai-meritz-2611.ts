// src/data/projects/chai-meritz-2611.ts
import { ProjectComprehensive } from '../types';

export const CHAI_PROJECT_DATA: ProjectComprehensive = {
  // ─── 01. ĐỊNH DANH HERO (IDENTITY) ───
  id: 'chai-meritz-2611',
  title: 'Chai Communication × Meritz Partners: Joseon Short Drama Ad',
  client: 'Chai Communication (Agency of the Year 2026) / Meritz Partners',
  categoryBadge: 'K-DRAMA PERFORMANCE AD (AI VIDEO-AS-CODE)',
  themeColor: '#FF6B00', // Sắc cam đặc trưng của Meritz Mascot Meri & thương hiệu
  aspectRatio: '9:16',

  tagline: {
    vi: 'Xôn xao tin đồn tháng đầu kiếm 150 lượng làm chấn động phiên chợ Joseon',
    kr: '150만원 소문에 장터가 뒤집혔다 - 메리츠 파트너스 숏폼 퍼포먼스 광고',
    en: '1.5 Million KRW Rumor Shakes the Joseon Marketplace - Meritz Partners AI Ad',
  },
  heroSummary: {
    vi: 'Quy trình sản xuất video quảng cáo ngắn hài hước phong cách Joseon bằng kiến trúc kép: Tạo sinh bối cảnh điện ảnh sạch với Genie 4 kết hợp Remotion Engine điều phối phụ đề Kinetic nảy chữ, Top Sticky Banner và hòa âm chuẩn EBU R128.',
    kr: 'Genie 4의 고화질 시네마틱 클린 플레이트와 Remotion 엔진의 정밀 키네틱 타이포그래피, 상단 고정 배너, EBU R128 오디오 마스터링을 결합한 차세대 숏드라마 비디오-as-코드 파이프라인.',
    en: 'Next-gen short-drama Video-as-Code pipeline combining Genie 4 clean cinematic visual plates with Remotion-driven kinetic typography, sticky news banners, and EBU R128 audio mastering.',
  },

  // ─── 02. THÔNG SỐ VIDEO & TELEMETRY HUD ───
  video: {
    type: 'mp4-direct',
    compName: 'ChaiAdShortDramaVertical',
    mp4Url: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Chai%20Korea/Chai_Communication_Meritz_Partners_24fps_v2.mp4',
    mp4SquareUrl: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Chai%20Korea/Chai_Communication_Meritz_Partners_1x1_24fps.mp4',
    durationInFrames: 720,
    fps: 24,
  },
  telemetry: {
    fps: 24,
    totalFrames: 720,
    renderTime: '50.1s',
    resolution: '1080x1920 (9:16) / 1080x1080 (1:1)',
    audioSpec: 'EBU R128 (-19.8 dB) / AAC 48kHz Stereo (Zero Video Bleed)',
    linesOfCode: 840,
  },

  // ─── 03. BA TRỤ CỘT CHIẾN LƯỢC (STRATEGIC PILLARS) ───
  strategicPillars: [
    {
      id: '01',
      category: {
        vi: 'HỆ THỐNG THIẾT KẾ & BỐ CỤC KHUNG HÌNH',
        kr: '디자인 시스템 및 반응형 레이아웃',
        en: 'DESIGN SYSTEM & MULTI-RATIO ADAPTER',
      },
      title: {
        vi: 'Top Sticky Banner & Multi-Ratio Adapter',
        kr: '상단 고정 뉴스 배너 및 다중 화면비 어댑터',
        en: 'Top Sticky Banner & Multi-Ratio Adapter',
      },
      description: {
        vi: 'Neo cứng Top Banner đen thông báo tin chấn động ở 18% đỉnh màn hình, tự động thích ứng giữa khung dọc 9:16 và khung vuông 1:1 với nền mờ Gaussian blur 30px.',
        kr: '상단 18% 영역에 헤드라인 블랙 배너를 엄격히 고정하고, 9:16 세로 및 1:1 정방형 뷰에 맞춰 30px 가우시안 블러 배경으로 자동 적응.',
        en: 'Rigidly anchoring the headline news banner at top 18% viewport, with adaptive 9:16 vertical and 1:1 square blurred Gaussian backdrop.',
      },
      checkpoints: {
        vi: ['Vùng an toàn Safe-Zone di động tuyệt đối', 'Adapter 1:1 Gaussian Blur không làm méo hình', 'Độ tương phản kính mờ 12px Frosted Glass'],
        kr: ['모바일 최적화 세이프존 완벽 준수', '1:1 정방형 가우시안 블러 왜곡 방지 어댑터', '12px 반투명 프로스테드 글래스 고대비'],
        en: ['Mobile-first strict safe-zone compliance', 'Non-distorting 1:1 Gaussian blur layout adapter', '12px frosted glass high-contrast backdrop'],
      },
    },
    {
      id: '02',
      category: {
        vi: 'CỐ ĐỊNH NHÂN VẬT & NHỊP ĐIỆU CỔ TRANG',
        kr: '캐릭터 일관성 및 사극 코믹 호흡',
        en: 'CHARACTER CONSISTENCY & COMIC PACING',
      },
      title: {
        vi: 'Character DNA Locking & Visual Clean Plates',
        kr: '캐릭터 DNA 고정 및 100% 클린 플레이트',
        en: 'Character DNA Locking & Visual Clean Plates',
      },
      description: {
        vi: 'Khóa diện mạo linh thú Meri đội nón gat và trang phục Joseon xuyên suốt 5 phân cảnh, triệt tiêu 100% chữ in chết trên video để Remotion phủ đồ họa sắc nét.',
        kr: '조선 갓을 쓴 메리츠 사자 인형 마스코트와 한복 복식을 5개 컷에 완벽 고정하고 자막/워터마크를 100% 배제한 클린 영상 생성.',
        en: 'Anchoring Meri mascot identity in Joseon gat and hanbok across all 5 cuts with 100% text-free clean cinematic video plates.',
      },
      checkpoints: {
        vi: ['Khóa Prompt nhân vật chính (Chibi Lion Cub)', 'Diễn hoạt biểu cảm hài hước chuẩn K-Drama', 'Bố cục trung tâm chừa khoảng trống cho Subtitle'],
        kr: ['메인 캐릭터 프롬프트 불변 잠금', 'K-드라마 특유의 코믹 표정 연출', '자막 배치를 위한 중앙 중심 60% 구도'],
        en: ['Locked character prompt DNA', 'Exaggerated comic timing and reactions', 'Center 60% safe composition for subtitle headroom'],
      },
    },
    {
      id: '03',
      category: {
        vi: 'ĐỘNG HỌC PHỤ ĐỀ & HÒA ÂM CHUẨN MỰC',
        kr: '키네틱 자막 물리학 및 오디오 마스터링',
        en: 'KINETIC SUBTITLE DYNAMICS & AUDIO MASTERING',
      },
      title: {
        vi: 'Deterministic Kinetics & EBU R128 Loudness',
        kr: '수학적 스프링 자막 및 음성 제로 리크 마스터링',
        en: 'Deterministic Kinetics & Zero-Bleed Audio Mastering',
      },
      description: {
        vi: 'Triệt tiêu hoàn toàn tạp âm từ video gốc Genie 4, lồng ghép 5 file voice tiếng Hàn khớp frame, kết hợp phụ đề lò xo spring() nảy chữ và outro thương hiệu.',
        kr: '생성 비디오 원본 음성을 100% 뮤트(Mute) 처리하고, 5개 한국어 AI 보이스에 프레임 단위로 싱크된 스프링 키네틱 자막 및 엔딩 카드 구현.',
        en: '100% silencing of raw video plate audio, precision frame-syncing of 5 Korean voice cuts with spring() kinetic subtitles and brand outro.',
      },
      checkpoints: {
        vi: ['Mute tuyệt đối video gốc (volume={0})', 'Phụ đề phân biệt màu sắc theo người nói', 'Âm lượng EBU R128 mean -19.8 dB / peak 0.0 dB'],
        kr: ['원본 영상 완벽 음소거 (volume={0})', '화자별 색상 구분 다이내믹 자막', 'EBU R128 오디오 표준 (-19.8 dB / 0.0 dB)'],
        en: ['Zero video audio bleed (volume={0})', 'Speaker-differentiated dynamic subtitle colors', 'EBU R128 loudness mastering (-19.8 dB / 0.0 dB)'],
      },
    },
  ],

  // ─── 04. BỘ NHÂN VẬT CHÍNH & THÔNG SỐ RIGGING (CHARACTER CAST RIGS) ───
  characterCastRigs: [
    {
      id: 'char-meri',
      name: {
        vi: 'Meri (Linh thú Sư tử Meritz)',
        kr: '메리 (메리츠 사자 인형 마스코트)',
        en: 'Meri (Meritz Lion Mascot)',
      },
      roleTag: {
        vi: 'ĐẠI SỨ THƯƠNG HIỆU (NHÂN VẬT CHÍNH)',
        kr: '브랜드 앰버서더 (메인 캐릭터)',
        en: 'BRAND AMBASSADOR (PROTAGONIST)',
      },
      fileName: 'Meritz lion mascot (Meri) in-full-body Joseon.svg',
      fileSize: '550.7 KB',
      ratio: '1 : 2.5 (Chibi Plush)',
      svgUrl: '/characters/Chai/Meritz lion mascot (Meri) in-full-body Joseon.svg',
      viewBox: '0 0 1000 1000',
      specs: {
        vi: {
          structure: 'Linh vật bông 3D Chibi: Lông mặt kem đào, bờm cam caramel phồng xù, đội mũ Gat nan ngựa đen mờ, áo choàng Durumagi trắng ngà.',
          metrics: 'Chiều cao chuẩn ~80cm. Đứng trên bục gỗ mộc ở Cut 3 & 4 để nâng tầm mắt ngang hàng đối thoại bình đẳng với người dân.',
          ratioBreakdown: 'Tỷ lệ đầu:thân (1:2.5) [Mũ Gat & Đầu bờm: 520px | Thân áo Durumagi: 360px | Chân ngắn tiếp đất: 120px]',
          groundContact: 'Tiếp đất bục gỗ / mặt đường sỏi: y: 880 (Bóng đổ mềm #1E1B4B opacity 0.35)',
        },
        kr: {
          structure: '3D 봉제인형 스타일 치비 사자: 피치크림 얼굴, 카라멜 오렌지 갈기, 반투명 말총 갓, 아이보리 화이트 두루마기 및 노리개 장식.',
          metrics: '표준 신장 약 80cm. 컷 3과 4에서 나무 상자 위에 올라서서 인간 등장인물과 자연스러운 눈높이 수평 대화 구도 형성.',
          ratioBreakdown: '머리:몸통 비율 (1:2.5) [갓 및 머리 갈기: 520px | 두루마기 상의: 360px | 발 접지부: 120px]',
          groundContact: '나무 상자 및 자갈길 접지 좌표: y: 880 (부드러운 그림자 #1E1B4B 불투명도 0.35)',
        },
        en: {
          structure: '3D plush chibi lion mascot: peach-cream face, fluffy caramel mane, semi-translucent horsehair Gat, ivory-white Durumagi robe with Norigae.',
          metrics: 'Standard height ~80cm. Stands atop a wooden crate in Cuts 3 & 4 to align eye-level for natural peer-to-peer dialogue with villagers.',
          ratioBreakdown: 'Head-to-body ratio (1:2.5) [Gat hat & head: 520px | Durumagi torso: 360px | Lower paws: 120px]',
          groundContact: 'Crate and gravel contact: y: 880 (Soft ambient shadow #1E1B4B opacity 0.35)',
        },
      },
    },
    {
      id: 'char-townswoman',
      name: {
        vi: 'Nữ Hành Nhân (Nội trợ / Tìm việc làm thêm)',
        kr: '조선 여인 (행인 1 / 주부 및 부업 희망자)',
        en: 'Joseon Townswoman (Passenger 1 / Freelancer)',
      },
      roleTag: {
        vi: 'ĐẠI DIỆN KHÁCH HÀNG MỤC TIÊU',
        kr: '타깃 고객 페르소나',
        en: 'TARGET AUDIENCE PERSONA',
      },
      fileName: 'JOSEON TOWNSWOMAN-in-full-body Joseon.svg',
      fileSize: '318.3 KB',
      ratio: '1 : 6.5 (Standard Joseon)',
      svgUrl: '/characters/Chai/JOSEON TOWNSWOMAN-in-full-body Joseon.svg',
      viewBox: '0 0 1000 1000',
      specs: {
        vi: {
          structure: 'Gương mặt trái xoan thanh tú, mắt nâu to tròn, tóc tết bím Daenggi-meori lệch vai. Áo Jeogori màu be gai thô, váy Chima xòe xám than mộc mạc.',
          metrics: 'Chiều cao chuẩn 680px (y: 200 -> y: 880). Cúi nhẹ người về phía trước, hai tay mở cử chỉ tò mò hỏi về 150 lượng.',
          ratioBreakdown: 'Tỷ lệ người thật (1:6.5) [Đầu & Tóc bím: 110px | Áo Jeogori: 180px | Váy Chima xếp ly: 540px | Mũi hài: 50px]',
          groundContact: 'Tiếp đất hiên nhà Hanok: y: 880 (Bóng đổ tự nhiên)',
        },
        kr: {
          structure: '단아한 계란형 얼굴, 댕기머리, 연베이지 삼베 저고리와 차콜브라운 린넨 치마를 착용한 젊은 조선 여인.',
          metrics: '표준 전신 680px (y: 200 -> y: 880). 상체를 살짝 숙이며 양손을 펼쳐 150냥에 대해 호기심과 의구심을 나타내는 자세.',
          ratioBreakdown: '실제 인체 비율 (1:6.5) [머리 및 댕기: 110px | 저고리: 180px | 주름치마: 540px | 꽃신: 50px]',
          groundContact: '한옥 처마 마당 접지: y: 880',
        },
        en: {
          structure: 'Graceful oval face, Daenggi-meori braided hair, pale oatmeal linen Jeogori, and earthy charcoal-brown pleated Chima skirt.',
          metrics: 'Standard height 680px (y: 200 -> y: 880). Slightly leaning forward with open palms, inquiring about the 150냥 income opportunity.',
          ratioBreakdown: 'Realistic anatomy (1:6.5) [Head & hair: 110px | Jeogori torso: 180px | Pleated skirt: 540px | Shoes: 50px]',
          groundContact: 'Courtyard ground contact: y: 880',
        },
      },
    },
    {
      id: 'char-tradesman',
      name: {
        vi: 'Nam Hành Nhân (Thương nhân / Trụ cột gia đình)',
        kr: '조선 상인 (행인 2 / 프리랜서 및 이직 희망자)',
        en: 'Joseon Tradesman (Passenger 2 / Career Switcher)',
      },
      roleTag: {
        vi: 'ĐẠI DIỆN TỰ DO & CHUYỂN NGHỀ',
        kr: '전직 및 자유직 페르소나',
        en: 'CAREER CHANGER PERSONA',
      },
      fileName: 'JOSEON TRADESMAN-in-full-body Joseon.svg',
      fileSize: '300.5 KB',
      ratio: '1 : 6.8 (Athletic Tradesman)',
      svgUrl: '/characters/Chai/JOSEON TRADESMAN-in-full-body Joseon.svg',
      viewBox: '0 0 1000 1000',
      specs: {
        vi: {
          structure: 'Gương mặt góc cạnh nam tính, râu quai nón nhẹ phong trần, băng vải thô Manggeon quấn trán. Áo Jeogori màu cát xắn tay, quần Baji túm xà cạp Daenim.',
          metrics: 'Chiều cao chuẩn 710px (y: 170 -> y: 880). Chồm người về trước thắc mắc về độ khó của kỳ thi và sư phụ kèm cặp.',
          ratioBreakdown: 'Tỷ lệ nam thanh niên (1:6.8) [Búi tóc & Khăn trán: 120px | Áo Jeogori: 220px | Quần Baji: 490px | Dép cỏ Jipsin: 50px]',
          groundContact: 'Mặt đường sỏi chợ phiên: y: 880',
        },
        kr: {
          structure: '남성적인 각진 턱선, 옅은 수염, 망건을 두른 상투 머리. 소매를 걷어올린 샌디브라운 저고리와 대님을 맨 바지, 짚신 착용.',
          metrics: '표준 전신 710px (y: 170 -> y: 880). 과거시험과 같은 난이도인지 의구심을 표하며 멘토 스승의 존재에 주목하는 포즈.',
          ratioBreakdown: '남성 표준 비율 (1:6.8) [상투 및 두상: 120px | 상의 저고리: 220px | 대님 바지: 490px | 짚신: 50px]',
          groundContact: '장터 자갈 바닥 접지: y: 880',
        },
        en: {
          structure: 'Rugged masculine jawline with light beard, topknot with hemp headband, rolled-up sandy Jeogori, strapped Baji pants, and Jipsin straw shoes.',
          metrics: 'Standard height 710px (y: 170 -> y: 880). Leaning toward Meri with raised hand, questioning the difficulty of exam qualification.',
          ratioBreakdown: 'Proportion breakdown (1:6.8) [Head & headband: 120px | Torso: 220px | Strapped trousers: 490px | Straw shoes: 50px]',
          groundContact: 'Market gravel ground: y: 880',
        },
      },
    },
  ],

  // ─── 05. KIẾN TRÚC KÉP (DUAL-TRACK ARCHITECTURE) ───
  architecture: {
    visualTrack: {
      tool: 'Google Studio / Genie 4 (AI Video Generation)',
      role: {
        vi: 'Sản xuất 5 phân cảnh điện ảnh cổ trang sạch chữ tuyệt đối, biểu cảm hài hước sinh động, khóa tỷ lệ nhân vật trong vùng an toàn 60% trung tâm.',
        kr: '자막/워터마크가 완전히 배제된 5개 조선 사극 클린 비주얼 플레이트 생성, 코믹 연출 및 중앙 60% 안전 영역 구도 엄격 잠금.',
        en: 'Generating 5 text-free Joseon period cinematic plates with comic acting locked inside the center 60% mobile safe zone.',
      },
    },
    codeTrack: {
      tool: 'Remotion Engine (TypeScript / Video-as-Code)',
      role: {
        vi: 'Mute triệt để video gốc, đồng bộ 5 voiceover tiếng Hàn, điều phối Top Banner cố định, phụ đề nảy chữ Kinetic và thẻ kết thúc Outro Meritz Partners.',
        kr: '원본 영상 100% 음소거, 5개 한국어 보이스 정밀 싱크, 상단 고정 헤드라인 배너, 스프링 키네틱 자막 및 메리츠 파트너스 엔딩 카드 조율.',
        en: '100% video muting, frame-accurate syncing of 5 Korean voice cuts, persistent top banner, kinetic spring subtitles, and Meritz Partners ending card.',
      },
    },
    guardrails: [
      'Lock 60% Center Mobile Safe-Zone (chừa 18% đỉnh cho Top Banner và 22% đáy cho phụ đề / TikTok UI)',
      'Deterministic 24.00 FPS Standard (Khớp chuẩn xác 720 frames cho 30.00s)',
      'Zero Audio Leakage Policy (Tắt hoàn toàn tiếng gốc của video AI)',
      'EBU R128 Audio Loudness Normalization (-19.8 dB mean / 0.0 dB max peak)',
      '100% Pure Remotion Physics (Bắt buộc dùng extrapolate: "clamp" trên mọi hàm interpolate)',
    ],
  },

  // ─── 06. MA TRẬN PHÂN CẢNH (SCENE MATRIX) ───
  sceneMatrix: [
    {
      cutNumber: 'CUT 01',
      frameRange: 'Frame 0 - 120 (0.0s – 5.0s)',
      title: {
        vi: 'Meri Loan Báo Bên Bảng Cáo Thị',
        kr: '메리의 방 배포 및 포고',
        en: 'Meri Proclamation at Royal Bulletin',
      },
      visualPrompt: 'Meri stands alone beside the royal Joseon bulletin board, gesturing authoritatively to the crowd.',
      koreanDialogue: '듣거라! 보험설계사 위촉응시자 모집, 첫 달 평균 백오십냥!',
      translation: {
        vi: 'Lắng nghe đây! Tuyển ứng viên tư vấn bảo hiểm, tháng đầu trung bình 150 lượng!',
        kr: '듣거라! 보험설계사 위촉응시자 모집, 첫 달 평균 백오십냥!',
        en: 'Hear ye! Recruiting insurance planner applicants, first month average 150 Nyang!',
      },
      remotionPhysics: 'Mounts ChaiTopBanner at frame 0. Kinetic subtitle fades in at frame 24 with spring({ damping: 14 }). Muted video plate.',
    },
    {
      cutNumber: 'CUT 02',
      frameRange: 'Frame 120 - 192 (5.0s – 8.0s)',
      title: {
        vi: 'Dân Làng Bàn Tán Kinh Ngạc',
        kr: '백성들의 웅성거림과 의구심',
        en: 'Villagers Whispering in Disbelief',
      },
      visualPrompt: 'Close-up of village crowd; young tradesman points in shock while elder strokes beard curiously.',
      koreanDialogue: '백오십냥?! 진짜 그 정도 준대?',
      translation: {
        vi: '150 lượng sao?! Thật sự cho nhiều thế ư?',
        kr: '백오십냥?! 진짜 그 정도 준대?',
        en: '150 Nyang?! Do they really give that much?',
      },
      remotionPhysics: 'Kinetic bouncy badge pop-up on "150냥". Fast conversational subtitle switch between the two speakers.',
    },
    {
      cutNumber: 'CUT 03',
      frameRange: 'Frame 192 - 384 (8.0s – 16.0s)',
      title: {
        vi: 'Cô Gái Đối Thoại Với Meri',
        kr: '장터 여인과 메리의 대화',
        en: 'Townswoman Dialogue with Meri',
      },
      visualPrompt: 'Townswoman carrying woven basket approaches Meri on wooden crate; Meri smiles warmly and nods.',
      koreanDialogue: '여인: "첫 달에 백오십냥을 벌 수 있단 말이오?" / 메리: "그렇소! 마음만 먹으면 누구나 도전할 수 있소!"',
      translation: {
        vi: 'Cô gái: "Tháng đầu tiên mà kiếm được 150 lượng thật sao?" / Meri: "Đúng vậy! Chỉ cần quyết tâm thì ai ai cũng có thể thử sức!"',
        kr: '여인: "첫 달에 백오십냥을 벌 수 있단 말이오?" / 메리: "그렇소! 마음만 먹으면 누구나 도전할 수 있소!"',
        en: 'Woman: "Can you really make 150 Nyang in the first month?" / Meri: "Indeed! Anyone can take on the challenge if determined!"',
      },
      remotionPhysics: 'Dual-speaker color switching subtitle: Pale White (Townswoman) -> Amber Gold (Meri). Seamless audio boundary.',
    },
    {
      cutNumber: 'CUT 04',
      frameRange: 'Frame 384 - 528 (16.0s – 22.0s)',
      title: {
        vi: 'Thương Nhân Thắc Mắc & Meri Giải Đáp Sư Phụ',
        kr: '과거시험 의문 및 멘토 스승 해법',
        en: 'Exam Query & Mentor Solution',
      },
      visualPrompt: 'Male tradesman questions qualification difficulty; Meri gestures enthusiastically explaining mentorship.',
      koreanDialogue: '남성: "과거시험 같은 것이오?" / 메리: "그렇소. 대신 멘토 스승이 붙어 길잡이부터 다 알려주오!"',
      translation: {
        vi: 'Nam thương nhân: "Có khó như thi tuyển quan không?" / Meri: "Đúng thế, nhưng có sư phụ cố vấn kèm cặp hướng dẫn từ đường đi nước bước!"',
        kr: '남성: "과거시험 같은 것이오?" / 메리: "그렇소. 대신 멘토 스승이 붙어 길잡이부터 다 알려주오!"',
        en: 'Tradesman: "Is it like the state civil exam?" / Meri: "Yes, but dedicated mentor guides teach you every step of the way!"',
      },
      remotionPhysics: 'Highlight pill badge on "멘토 스승" with subtle glowing border. Zero plate bleed.',
    },
    {
      cutNumber: 'CUT 05',
      frameRange: 'Frame 528 - 720 (22.0s – 30.0s)',
      title: {
        vi: 'Đám Đông Hò Reo & Meritz Outro Card',
        kr: '군중의 지원 열기와 메리츠 파트너스 엔딩',
        en: 'Crowd Cheering & Meritz Brand Outro',
      },
      visualPrompt: 'Excited crowd holds application scrolls; Meri walks forward with open arms, ending with a cheeky wink.',
      koreanDialogue: '군중: "나도 신청하겠소! 내가 먼저 도전하겠소!" / 메리: "먼저 준비하는 사람이 임자, 메리츠파트너스!"',
      translation: {
        vi: 'Đám đông: "Tôi cũng nộp đơn! Cho tôi thử sức trước!" / Meri: "Người chuẩn bị trước là người làm chủ, Meritz Partners!"',
        kr: '군중: "나도 신청하겠소! 내가 먼저 도전하겠소!" / 메리: "먼저 준비하는 사람이 임자, 메리츠파트너스!"',
        en: 'Crowd: "I will apply too! Let me try first!" / Meri: "The early bird owns the future, Meritz Partners!"',
      },
      remotionPhysics: 'ChaiEndingCard mounts at frame 600–720: Meritz vector logo, outcome badge "첫달 평균 150만원 부수익", and conversion CTA button.',
    },
  ],

  productionBlueprint: {
    sectionTitle: {
      vi: 'CHAI MERITZ // BẢN THIẾT KẾ PHÂN CẢNH CHI TIẾT (5 CUTS)',
      kr: '차이 메리츠 // 프로덕션 블루프린트 및 5컷 스토리보드',
      en: 'CHAI MERITZ // PRODUCTION BLUEPRINT & STORYBOARD (5 CUTS)',
    },
    subtitle: {
      vi: 'CHUẨN KHUNG DỌC 9:16 & VUÔNG 1:1 • 720 FRAMES @ 24FPS (30.0s)',
      kr: '9:16 세로형 & 1:1 정방형 멀티 어댑터 • 720 프레임 @ 24FPS (30.0초)',
      en: '9:16 VERTICAL & 1:1 MULTI-RATIO ADAPTER • 720 FRAMES @ 24FPS (30.0s)',
    },
    pdfLabel: {
      vi: 'TẢI BẢN VẼ BLUEPRINT PDF (1.4MB)',
      kr: '블루프린트 PDF 다운로드 (1.4MB)',
      en: 'DOWNLOAD BLUEPRINT PDF (1.4MB)',
    },
    scenes: [
      {
        id: '01',
        tabLabel: 'CUT 01',
        phaseTag: {
          vi: 'CUT 01 // KHUNG HÌNH 000 – 120',
          kr: '컷 01 // 프레임 000 – 120',
          en: 'CUT 01 // FRAMES 000 – 120',
        },
        title: {
          vi: 'Meri Loan Báo Bên Bảng Cáo Thị',
          kr: '메리의 방 배포 및 포고',
          en: 'Meri Proclamation at Royal Bulletin',
        },
        timecode: '000 – 120 (5.0s @ 24fps)',
        plateImageUrl: '/assets/chai/storyboard/plate_01.png',
        ratioTag: 'RATIO: 9:16 VERTICAL',
        sourceTag: 'GENIE 4 / CLEAN PLATE',
        voiceover: {
          vn: 'Lắng nghe đây! Tuyển ứng viên tư vấn bảo hiểm, tháng đầu trung bình 150 lượng!',
          kr: '듣거라! 보험설계사 위촉응시자 모집, 첫 달 평균 백오십냥!',
        },
        visualActing: {
          vi: 'Meri đứng một mình bên bảng cáo thị triều đại Joseon, ra hiệu uy nghiêm trước đám đông dân làng.',
          kr: '조선 시대 방(게시판) 옆에 홀로 선 메리가 군중을 향해 위엄 있게 포고하는 장면.',
          en: 'Meri stands alone beside the royal Joseon bulletin board, gesturing authoritatively to the crowd.',
        },
        motionSpecs: {
          vi: 'Gắn ChaiTopBanner tại frame 0. Phụ đề Kinetic hiện dần tại frame 24 với spring({ damping: 14 }). Video plate tắt tiếng hoàn toàn.',
          kr: '프레임 0에 ChaiTopBanner 고정. 프레임 24에서 spring({ damping: 14 }) 키네틱 자막 등장. 원본 영상 완전 음소거.',
          en: 'Mounts ChaiTopBanner at frame 0. Kinetic subtitle fades in at frame 24 with spring({ damping: 14 }). Muted video plate.',
        },
        audioSfxCue: {
          vi: 'voice_01.wav khớp frame 0–120, chuẩn âm lượng EBU R128 (-19.8 dB), zero video audio bleed.',
          kr: 'voice_01.wav 프레임 0–120 정밀 싱크, EBU R128 (-19.8 dB) 마스터링.',
          en: 'voice_01.wav synced to frames 0–120, EBU R128 (-19.8 dB) mastered with zero video bleed.',
        },
        depthPerspective: {
          vi: 'SAFE-ZONE: 60% TRUNG TÂM (CHỪA 18% TOP BANNER)',
          kr: '세이프존: 중앙 60% 고정 (상단 18% 배너 여백)',
          en: 'SAFE-ZONE: CENTER 60% LOCK (18% TOP BANNER)',
        },
      },
      {
        id: '02',
        tabLabel: 'CUT 02',
        phaseTag: {
          vi: 'CUT 02 // KHUNG HÌNH 120 – 192',
          kr: '컷 02 // 프레임 120 – 192',
          en: 'CUT 02 // FRAMES 120 – 192',
        },
        title: {
          vi: 'Dân Làng Bàn Tán Kinh Ngạc',
          kr: '백성들의 웅성거림과 의구심',
          en: 'Villagers Whispering in Disbelief',
        },
        timecode: '120 – 192 (3.0s @ 24fps)',
        plateImageUrl: '/assets/chai/storyboard/plate_02.png',
        ratioTag: 'RATIO: 9:16 VERTICAL',
        sourceTag: 'GENIE 4 / CLEAN PLATE',
        voiceover: {
          vn: '150 lượng sao?! Thật sự cho nhiều thế ư?',
          kr: '백오십냥?! 진짜 그 정도 준대?',
        },
        visualActing: {
          vi: 'Cận cảnh đám đông dân làng; nam thương nhân trẻ chỉ tay kinh ngạc trong khi bô lão vuốt râu tò mò.',
          kr: '마을 군중 클로즈업; 젊은 상인이 놀라며 손가락으로 가리키고, 노인이 수염을 쓰다듬으며 호기심을 보임.',
          en: 'Close-up of village crowd; young tradesman points in shock while elder strokes beard curiously.',
        },
        motionSpecs: {
          vi: 'Huy hiệu Kinetic nảy pop-up trên cụm "150냥". Chuyển đổi nhanh phụ đề đối thoại giữa hai người nói.',
          kr: '"150냥" 텍스트에 스프링 팝업 뱃지 적용. 두 화자 간 빠른 대화형 자막 전환.',
          en: 'Kinetic bouncy badge pop-up on "150냥". Fast conversational subtitle switch between the two speakers.',
        },
        audioSfxCue: {
          vi: 'voice_02.wav đồng bộ biểu cảm ngạc nhiên, âm nền chợ phiên Joseon nhẹ.',
          kr: 'voice_02.wav 놀람 표정 싱크 및 은은한 조선 장터 앰비언스.',
          en: 'voice_02.wav synced to shocked reactions with subtle Joseon marketplace ambience.',
        },
        depthPerspective: {
          vi: 'KHUNG HÌNH: CẬN CẢNH ĐÁM ĐÔNG (22% BOTTOM SUBTITLE)',
          kr: '프레이밍: 군중 클로즈업 (하단 22% 자막 영역)',
          en: 'FRAMING: CROWD CLOSE-UP (22% BOTTOM SUBTITLE)',
        },
      },
      {
        id: '03',
        tabLabel: 'CUT 03',
        phaseTag: {
          vi: 'CUT 03 // KHUNG HÌNH 192 – 384',
          kr: '컷 03 // 프레임 192 – 384',
          en: 'CUT 03 // FRAMES 192 – 384',
        },
        title: {
          vi: 'Cô Gái Đối Thoại Với Meri',
          kr: '장터 여인과 메리의 대화',
          en: 'Townswoman Dialogue with Meri',
        },
        timecode: '192 – 384 (8.0s @ 24fps)',
        plateImageUrl: '/assets/chai/storyboard/plate_03.png',
        ratioTag: 'RATIO: 9:16 VERTICAL',
        sourceTag: 'GENIE 4 / CLEAN PLATE',
        voiceover: {
          vn: 'Cô gái: "Tháng đầu tiên mà kiếm được 150 lượng thật sao?" / Meri: "Đúng vậy! Chỉ cần quyết tâm thì ai ai cũng có thể thử sức!"',
          kr: '여인: "첫 달에 백오십냥을 벌 수 있단 말이오?" / 메리: "그렇소! 마음만 먹으면 누구나 도전할 수 있소!"',
        },
        visualActing: {
          vi: 'Cô gái mang giỏ đan tiến lại gần Meri đứng trên bục gỗ; Meri mỉm cười ấm áp và gật đầu khẳng định.',
          kr: '바구니를 든 여인이 나무 상자 위의 메리에게 다가가 묻고, 메리가 따뜻하게 미소 지으며 고개를 끄덕임.',
          en: 'Townswoman carrying woven basket approaches Meri on wooden crate; Meri smiles warmly and nods.',
        },
        motionSpecs: {
          vi: 'Phụ đề đổi màu theo người nói: Trắng ngà (Cô gái) -> Vàng hổ phách (Meri). Chuyển tiếp âm thanh liền mạch.',
          kr: '화자별 자막 색상 자동 전환: 아이보리 화이트(여인) -> 앰버 골드(메리).',
          en: 'Dual-speaker color switching subtitle: Pale White (Townswoman) -> Amber Gold (Meri). Seamless audio boundary.',
        },
        audioSfxCue: {
          vi: 'voice_03.wav đối thoại 2 chiều, cân bằng âm lượng đồng nhất giữa 2 nhân vật.',
          kr: 'voice_03.wav 양방향 대화 오디오, 두 화자 간 균일한 음량 밸런스.',
          en: 'voice_03.wav dual-speaker dialogue with normalized loudness across both voices.',
        },
        depthPerspective: {
          vi: 'ĐỐI THOẠI: TẦM MẮT NGANG HÀNG TRÊN BỤC GỖ',
          kr: '대화 구도: 나무 상자 위 수평 눈높이 매칭',
          en: 'DIALOGUE: EYE-LEVEL CRATE ALIGNMENT',
        },
      },
      {
        id: '04',
        tabLabel: 'CUT 04',
        phaseTag: {
          vi: 'CUT 04 // KHUNG HÌNH 384 – 528',
          kr: '컷 04 // 프레임 384 – 528',
          en: 'CUT 04 // FRAMES 384 – 528',
        },
        title: {
          vi: 'Thương Nhân Thắc Mắc & Meri Giải Đáp Sư Phụ',
          kr: '과거시험 의문 및 멘토 스승 해법',
          en: 'Exam Query & Mentor Solution',
        },
        timecode: '384 – 528 (6.0s @ 24fps)',
        plateImageUrl: '/assets/chai/storyboard/plate_04.png',
        ratioTag: 'RATIO: 9:16 VERTICAL',
        sourceTag: 'GENIE 4 / CLEAN PLATE',
        voiceover: {
          vn: 'Nam thương nhân: "Có khó như thi tuyển quan không?" / Meri: "Đúng thế, nhưng có sư phụ cố vấn kèm cặp hướng dẫn từ đường đi nước bước!"',
          kr: '남성: "과거시험 같은 것이오?" / 메리: "그렇소. 대신 멘토 스승이 붙어 길잡이부터 다 알려주오!"',
        },
        visualActing: {
          vi: 'Nam thương nhân thắc mắc về độ khó kỳ thi; Meri hào hứng giải thích về hệ thống sư phụ cố vấn kèm cặp.',
          kr: '남성 상인이 시험 난이도를 묻자, 메리가 전담 멘토 스승의 밀착 가이드를 열정적으로 설명함.',
          en: 'Male tradesman questions qualification difficulty; Meri gestures enthusiastically explaining mentorship.',
        },
        motionSpecs: {
          vi: 'Huy hiệu highlight phát sáng viền nhẹ trên từ khóa "멘토 스승" (Sư phụ cố vấn).',
          kr: '"멘토 스승" 키워드에 은은한 글로우 테두리 하이라이트 필 뱃지 적용.',
          en: 'Highlight pill badge on "멘토 스승" with subtle glowing border. Zero plate bleed.',
        },
        audioSfxCue: {
          vi: 'voice_04.wav nhấn giọng dứt khoát tại từ khóa "멘토 스승".',
          kr: 'voice_04.wav "멘토 스승" 키워드 강조 보이스 싱크.',
          en: 'voice_04.wav vocal emphasis synced to "멘토 스승" highlight badge.',
        },
        depthPerspective: {
          vi: 'ĐỐI THOẠI: THƯƠNG NHÂN & MERI (60% CENTER ZONE)',
          kr: '대화 구도: 상인 & 메리 (중앙 60% 세이프존)',
          en: 'DIALOGUE: TRADESMAN & MERI (60% CENTER ZONE)',
        },
      },
      {
        id: '05',
        tabLabel: 'CUT 05',
        phaseTag: {
          vi: 'CUT 05 // KHUNG HÌNH 528 – 720',
          kr: '컷 05 // 프레임 528 – 720',
          en: 'CUT 05 // FRAMES 528 – 720',
        },
        title: {
          vi: 'Đám Đông Hò Reo & Meritz Outro Card',
          kr: '군중의 지원 열기와 메리츠 파트너스 엔딩',
          en: 'Crowd Cheering & Meritz Brand Outro',
        },
        timecode: '528 – 720 (8.0s @ 24fps)',
        plateImageUrl: '/assets/chai/storyboard/plate_05.png',
        ratioTag: 'RATIO: 9:16 VERTICAL',
        sourceTag: 'REMOTION OUTRO / MERITZ',
        voiceover: {
          vn: 'Đám đông: "Tôi cũng nộp đơn! Cho tôi thử sức trước!" / Meri: "Người chuẩn bị trước là người làm chủ, Meritz Partners!"',
          kr: '군중: "나도 신청하겠소! 내가 먼저 도전하겠소!" / 메리: "먼저 준비하는 사람이 임자, 메리츠파트너스!"',
        },
        visualActing: {
          vi: 'Đám đông hào hứng giơ cao cuộn đơn đăng ký; Meri tiến về phía trước dang tay chào đón và nháy mắt tinh nghịch.',
          kr: '열광하는 군중이 지원서 두루마리를 높이 들고, 메리가 앞으로 걸어 나오며 윙크로 마무리.',
          en: 'Excited crowd holds application scrolls; Meri walks forward with open arms, ending with a cheeky wink.',
        },
        motionSpecs: {
          vi: 'ChaiEndingCard xuất hiện tại frame 600–720: Logo vector Meritz, huy hiệu "첫달 평균 150만원 부수익" và nút CTA chuyển đổi.',
          kr: '프레임 600–720에 ChaiEndingCard 마운트: 메리츠 벡터 로고, "첫달 평균 150만원 부수익" 뱃지 및 CTA 버튼.',
          en: 'ChaiEndingCard mounts at frame 600–720: Meritz vector logo, outcome badge "첫달 평균 150만원 부수익", and conversion CTA button.',
        },
        audioSfxCue: {
          vi: 'voice_05.wav hòa âm cao trào cùng tiếng đám đông hò reo và nhạc kết thương hiệu Meritz.',
          kr: 'voice_05.wav 군중 환호성 및 메리츠 브랜드 엔딩 징글 마스터링.',
          en: 'voice_05.wav crowd cheer crescendo resolved with Meritz brand outro sting.',
        },
        depthPerspective: {
          vi: 'OUTRO CARD: MERITZ PARTNERS VECTOR OVERLAY',
          kr: '엔딩 카드: 메리츠 파트너스 벡터 오버레이',
          en: 'OUTRO CARD: MERITZ PARTNERS VECTOR OVERLAY',
        },
      },
    ],
  },

  // ─── 07. DANH MỤC LINH KIỆN LEGO (COMPONENT REGISTRY) ───
  components: [
    {
      name: 'ChaiTopBanner.tsx',
      category: 'HUD',
      role: {
        vi: 'Thanh tiêu đề cố định trên đỉnh video "150만원 소문에 장터가 뒤집혔다" với kính mờ 12px.',
        kr: '상단 18% 고정 헤드라인 배너 ("150만원 소문에 장터가 뒤집혔다") 반투명 프로스테드 글래스.',
        en: 'Persistent top headline banner ("150만원 소문에 장터가 뒤집혔다") with 12px frosted glass backdrop.',
      },
      techStack: 'React + Remotion Spring + CSS Backdrop Blur',
    },
    {
      name: 'ChaiDynamicSubtitle.tsx',
      category: 'Kinetic UI',
      role: {
        vi: 'Hệ thống phụ đề nảy chữ tiếng Hàn theo nhịp nói, tự động đổi màu theo từng nhân vật.',
        kr: '음성 싱크에 맞춰 프레임 단위로 튀어오르는 스프링 키네틱 자막 및 화자별 색상 전환.',
        en: 'Frame-accurate kinetic spring subtitles with speaker-differentiated color accents.',
      },
      techStack: 'Remotion spring({ damping: 14 }) + CSS Squircle pill',
    },
    {
      name: 'ChaiEndingCard.tsx',
      category: 'Kinetic UI',
      role: {
        vi: 'Thẻ kết thúc hiển thị Logo Meritz Partners, huy hiệu chứng thực 150 vạn won và nút CTA.',
        kr: '메리츠 파트너스 공식 벡터 로고, 150만원 성과 뱃지 및 액션 유도 CTA 카드.',
        en: 'Conversion outro card featuring Meritz Partners vector logo, 1.5M outcome badge, and CTA.',
      },
      techStack: 'Remotion Interpolate + SVG Asset Engine',
    },
    {
      name: 'ChaiSquareAdapter.tsx',
      category: 'Audio/Adapter',
      role: {
        vi: 'Bộ điều phối tự động tạo nền mờ 30px Gaussian blur để biến đổi footage 9:16 sang tỉ lệ vuông 1:1 chuẩn xác.',
        kr: '9:16 세로 푸티지를 왜곡 없이 1:1 정방형으로 자동 변환하는 30px 가우시안 블러 어댑터.',
        en: 'Adaptive 1:1 square orchestrator generating 30px Gaussian blur backdrop from 9:16 master plates.',
      },
      techStack: 'Remotion Series + CSS Gaussian Blur Filter',
    },
  ],

  // ─── 08. SO SÁNH GIÁ TRỊ VỚI AFTER EFFECTS THỦ CÔNG ───
  comparison: [
    {
      criteria: {
        vi: 'Thời gian căn chỉnh phụ đề tiếng Hàn',
        kr: '한국어 음성 자막 타이밍 싱크 수정',
        en: 'Korean Subtitle Timing Alignment',
      },
      traditionalAe: 'Kéo thủ công từng keyframe chữ, nghe đi nghe lại mất 3 - 4 tiếng mỗi khi đổi voice.',
      videoAsCode: 'Đổi file audio và timecode mảng JSON, Remotion tự tính toán lại số frame nảy chữ trong 5 giây.',
    },
    {
      criteria: {
        vi: 'Xuất đồng thời bản Dọc (9:16) & Vuông (1:1)',
        kr: '세로형(9:16) 및 정방형(1:1) 동시 제작',
        en: 'Multi-ratio Delivery (9:16 vs 1:1)',
      },
      traditionalAe: 'Tạo 2 composition độc lập, căn lại vị trí logo, banner và subtitle từ đầu bằng tay.',
      videoAsCode: 'Dùng chung logic mã nguồn, chỉ cần chuyển đổi Container Adapter tự động tính lại Safe Zone.',
    },
    {
      criteria: {
        vi: 'Bảo mật âm thanh (Loại bỏ tạp âm video AI)',
        kr: 'AI 영상 원본 잡음 제거 및 오디오 격리',
        en: 'AI Video Audio Bleed Prevention',
      },
      traditionalAe: 'Mất công tắt audio layer thủ công cho từng cut, dễ sơ suất lọt tiếng nhân vật gốc.',
      videoAsCode: 'Khóa cứng cấp độ compiler với volume={0} và muted={true} trên toàn bộ thẻ Video plate.',
    },
    {
      criteria: {
        vi: 'Kiểm soát chất lượng tự động (QA Gates)',
        kr: '자동 품질 검증 (TypeScript & Zod)',
        en: 'Automated Quality Gatekeeping',
      },
      traditionalAe: 'Dựa hoàn toàn vào mắt thường, không có cơ chế chặn lỗi chính tả hay vỡ layout.',
      videoAsCode: 'TypeScript compile check, Zod schema validation và lệnh xuất ảnh Still audit tự động.',
    },
  ],

  // ─── 09. TRUNG TÂM BÀN GIAO TÀI NGUYÊN (DELIVERABLES HUB) ───
  downloads: {
    storyboardPdf: '/downloads/chai/Chai_Communication_Storyboard_Brief_2611.pdf',
    assetsZip: '/downloads/chai/Chai_Communication_Remotion_Components_Assets.zip',
    mp4Master: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Chai%20Korea/Chai_Communication_Meritz_Partners_24fps_v2.mp4',
    mp4Square: 'https://pub-b61e4ba5294d47b594f0d427db0aa7b5.r2.dev/Chai%20Korea/Chai_Communication_Meritz_Partners_1x1_24fps.mp4',
    aeTrapConfig: {
      title: {
        vi: 'BẠN CẦN FILE AFTER EFFECTS THỦ CÔNG CHO CHIẾN DỊCH CHAI MERITZ?',
        kr: '차이 커뮤니케이션 메리츠 캠페인의 수작업 애프터 이펙트 파일이 필요하십니까?',
        en: 'DO YOU REQUIRE MANUAL AFTER EFFECTS FILES FOR THIS CHAI CAMPAIGN?',
      },
      bodyText: {
        vi: 'Toàn bộ 5 phân cảnh, Top Sticky Banner và phụ đề Kinetic của dự án này đã được tự động hóa 100% bằng Remotion Video-as-Code. Dựng lại thủ công trên After Effects sẽ tiêu tốn của bạn hàng tuần lao động!',
        kr: '이 프로젝트의 5개 컷, 상단 고정 배너 및 키네틱 자막은 리모션 비디오-as-코드로 100% 자동화되었습니다. 애프터 이펙트로 수작업 복제 시 수주의 공수가 소요됩니다!',
        en: 'All 5 cuts, sticky news banners, and kinetic subtitles are 100% automated via Remotion Video-as-Code. Manual After Effects rebuilding would cost weeks of tedious labor!',
      },
      hireUrl: 'mailto:contact@artificialcraft.space?subject=Offer: Yêu cầu dựng After Effects thủ công cho dự án Chai Communication',
    },
  },

  // ─── 10. LỆNH TERMINAL CLI TÁI TẠO VIDEO ───
  cliCommand: 'npx remotion render src/index.ts ChaiAdShortDramaVertical out/Chai_Communication_Meritz_Partners_24fps_v2.mp4 --gl=angle',
};
