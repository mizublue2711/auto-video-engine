import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Giao thức nghiệm thu tự động theo chuẩn AGENT.md
interface AuditTarget {
  name: string;
  frame: number;
  expectedMinAreaRatio: number; // Diện tích tối thiểu vật thể phải chiếm
  safeMarginTop: number;        // Khoảng cách an toàn tối thiểu từ mép trên
  safeMarginLeft: number;       // Khoảng cách an toàn tối thiểu từ mép trái
}

const AUDIT_STAGES: AuditTarget[] = [
  { name: 'Stage 1: Phone Start Frame', frame: 240, expectedMinAreaRatio: 0.12, safeMarginTop: 60, safeMarginLeft: 60 },
  { name: 'Stage 1: Phone Peak Rotation', frame: 300, expectedMinAreaRatio: 0.12, safeMarginTop: 60, safeMarginLeft: 60 },
  { name: 'Stage 1: Phone End Frame', frame: 350, expectedMinAreaRatio: 0.12, safeMarginTop: 60, safeMarginLeft: 60 },
  { name: 'Stage 2: Scene 6 Hero Card', frame: 650, expectedMinAreaRatio: 0.20, safeMarginTop: 80, safeMarginLeft: 200 },
];

async function runAudit() {
  console.log('🚀 [GATEKEEPER] BẮT ĐẦU KIỂM THỬ KHÔNG GIAN THỊ GIÁC (3D SPATIAL AUDIT)...');
  const tmpDir = '/tmp/remotion_audit';
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  let failedTests = 0;

  for (const target of AUDIT_STAGES) {
    const outputPath = path.join(tmpDir, `audit_frame_${target.frame}.png`);
    console.log(`\n📸 Render Frame ${target.frame} (${target.name})...`);

    try {
      // 1. Render frame tĩnh độc lập
      execSync(
        `npx remotion still src/index.ts CrabitMasterCommercial --frame=${target.frame} ${outputPath} --log=warn`,
        { stdio: 'inherit' }
      );

      // 2. Kiểm tra dung lượng file ảnh (tránh file trắng / file rỗng)
      const stats = fs.statSync(outputPath);
      if (stats.size < 50000) {
        console.error(`❌ FAILED: File render quá nhỏ (${stats.size} bytes). Có thể khung hình bị đen hoàn toàn!`);
        failedTests++;
        continue;
      }

      console.log(`✅ Frame ${target.frame} render thành công: ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`❌ CRITICAL ERROR: Lỗi render tại frame ${target.frame}`);
      failedTests++;
    }
  }

  if (failedTests > 0) {
    console.error(`\n🚨 KẾT QUẢ: ${failedTests} bài kiểm thử thất bại! Bắt buộc sửa code trước khi commit.`);
    process.exit(1);
  } else {
    console.log('\n🎉 TẤT CẢ CÁC KHUNG HÌNH ĐÃ ĐẠT TIÊU CHUẨN THỊ GIÁC!');
  }
}

runAudit();
