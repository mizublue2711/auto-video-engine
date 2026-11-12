export const THEME_TOKENS = {
  // 1. NỀN DÙNG CHUNG DUY NHẤT (Soft Pastel Sky Blue - Dịu mắt, không chói)
  background: {
    // 1. Nền chung cho các cảnh 3D Fintech
    global:
      'radial-gradient(circle at 40% 40%, #E0F2FE 0%, #BAE6FD 45%, #7DD3FC 100%)',
    ambientGlow:
      'radial-gradient(circle at 30% 35%, rgba(255, 255, 255, 0.6) 0%, transparent 65%)',

    // 2. NỀN TƯỜNG LỚP HỌC HAGWON (Khớp 100% với không gian Anime lớp học)
    classroomWall:
      'linear-gradient(145deg, #FAF6EE 0%, #F3ECE0 50%, #E6DAC8 100%)',
  },

  // 2. MÀU VĂN BẢN & CHI TIẾT (Độ tương phản cao trên nền Pastel & Typography chuẩn K-Fintech)
  typography: {
    fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
    fontNumeric: '"Pretendard", "SF Pro Display", sans-serif',
    letterSpacing: '-0.02em',
    titlePrimary: '#0F172A',      // Xanh đen đậm sang trọng (dễ đọc trên nền sáng)
    titleHighlight: '#0284C7',    // Xanh dương tươi làm điểm nhấn thương hiệu
    bodyText: '#334155',          // Xanh xám trung tính cho nội dung phụ
    badgeText: '#0369A1',         // Chữ trên các pill tag
  },

  // 3. THẺ GIAO DIỆN KÍNH MỜ HÀN QUỐC (Glassmorphism & Bo góc tròn)
  cards: {
    surfaceBg: 'rgba(255, 255, 255, 0.72)',
    surfaceBorder: '1.5px solid rgba(255, 255, 255, 0.9)',
    surfaceShadow: '0 12px 32px rgba(14, 165, 233, 0.12)',
    borderRadiusLarge: 28,        // Bo góc tròn lớn chuẩn Toss/Kakao
    borderRadiusPill: 999,        // Bo tròn viên thuốc cho Badge
  },

  // 4. MÀU ĐỒ HỌA ĐIỂM XUYẾT
  accents: {
    goldReward: '#F59E0B',        // Vàng cam cho Carat / Học bổng
    cyanBrand: '#0284C7',         // Xanh thương hiệu Crabit
  },

  // 🎨 UNIFIED CRABIT BRAND ICON TOKENS (ZERO RED/ORANGE - PURE BRAND CYAN & SKY BLUE)
  icons: {
    // 1. 🎯 Target Mission Icon (Quest & Killer Exam Auth)
    target: {
      primary: '#0284C7',          // Royal Sky Blue (Vòng ngoài và khía laser)
      accent: '#00E5FF',           // Electric Cyan phát quang (Vòng đồng tâm giữa)
      center: '#0369A1',           // Deep Blue (Tâm điểm hồng tâm)
      glow: 'rgba(0, 229, 255, 0.35)',
    },

    // 2. 💎 Carat Diamond Icon (Crabit Cyan Gemstone)
    diamond: {
      gradientStart: '#0284C7',    // Royal Sky Blue (Mặt chính)
      gradientEnd: '#00E5FF',      // Electric Cyan tươi sáng (Đỉnh giác cắt)
      facetLight: '#E0F2FE',       // Phản quang trắng xanh ngọc bích
      facetShadow: '#0369A1',      // Xanh thẫm chiều sâu vát cạnh
      glow: 'rgba(0, 229, 255, 0.45)', // Hào quang xanh ngọc êm dịu
    },

    // 3. ⚡ Flash Quest Icon (Realtime Engine Pill Tag)
    lightning: {
      fill: '#00E5FF',             // Electric Cyan phát sáng
      glow: 'rgba(0, 229, 255, 0.5)',
    },

    // 4. Standardized Sizing
    size: {
      badge: 20,                   // Tag viên thuốc
      card: 32,                    // Thẻ tính năng
      hero: 48,                    // Điểm nhấn lớn
    },
  },
} as const;
