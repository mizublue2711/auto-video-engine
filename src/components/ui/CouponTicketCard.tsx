import React from 'react';

interface CouponTicketCardProps {
  category: string;             // Nhãn danh mục nhỏ (VD: '학원 미션 달성')
  heroValue: string;            // Giá trị chính to đậm (VD: '+5,000 CARAT' hoặc 'FREE')
  heroHighlightColor?: string;  // Màu chữ chính
  description: string;          // Dòng phụ chú thích chân thẻ
  icon?: React.ReactNode;       // Icon trang trí ở góc nẹp xé vé
  width?: number | string;
  height?: number;
}

export const CouponTicketCard: React.FC<CouponTicketCardProps> = ({
  category,
  heroValue,
  heroHighlightColor = '#0F172A',
  description,
  icon,
  width = '100%',
  height = 148,
}) => {
  // Bán kính khía lõm bán nguyệt
  const notchRadius = 14;
  // Vị trí trục chia vé (tính từ mép phải vào)
  const tearLineRight = 110;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        filter: 'drop-shadow(0 16px 32px rgba(2, 132, 199, 0.14))',
      }}
    >
      {/* 1. NỀN THẺ TRẮNG CÓ 2 VẾT CẮT BÁN NGUYỆT Ở TRÊN VÀ DƯỚI */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FFFFFF',
          borderRadius: 28,
          // Sử dụng CSS Mask Radial Gradient để tạo 2 khuyết bán nguyệt ở trên và dưới
          maskImage: `
            radial-gradient(circle at calc(100% - ${tearLineRight}px) 0px, transparent ${notchRadius}px, black ${notchRadius + 0.5}px),
            radial-gradient(circle at calc(100% - ${tearLineRight}px) 100%, transparent ${notchRadius}px, black ${notchRadius + 0.5}px)
          `,
          maskComposite: 'intersect',
          WebkitMaskImage: `
            radial-gradient(circle at calc(100% - ${tearLineRight}px) 0px, transparent ${notchRadius}px, black ${notchRadius + 0.5}px),
            radial-gradient(circle at calc(100% - ${tearLineRight}px) 100%, transparent ${notchRadius}px, black ${notchRadius + 0.5}px)
          `,
          WebkitMaskComposite: 'destination-in',
        }}
      />

      {/* 2. ĐƯỜNG KẺ NẸP XÉ VÉ (DASHED TEAR LINE) */}
      <div
        style={{
          position: 'absolute',
          right: tearLineRight - 1,
          top: notchRadius + 4,
          bottom: notchRadius + 4,
          width: 2,
          borderRight: '2px dashed #CBD5E1',
          pointerEvents: 'none',
        }}
      />

      {/* 3. NỘI DUNG CHÍNH (KHU VỰC BÊN TRÁI NẸP VÉ) */}
      <div
        style={{
          position: 'absolute',
          left: 32,
          right: tearLineRight + 24,
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 6,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#475569',
            letterSpacing: -0.3,
          }}
        >
          {category}
        </span>

        <span
          style={{
            fontSize: 34,
            fontWeight: 900,
            color: heroHighlightColor,
            lineHeight: 1.1,
            letterSpacing: -0.8,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {heroValue}
        </span>

        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#64748B',
          }}
        >
          {description}
        </span>
      </div>

      {/* 4. PHÙ HIỆU / ICON STAMP (KHU VỰC ĐUÔI VÉ BÊN PHẢI) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          width: tearLineRight,
          top: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        {icon}
      </div>
    </div>
  );
};
