import fs from 'node:fs';
import path from 'node:path';
import { AtomicComponentMetaSchema } from '../src/schemas/ComponentSchema';

const ASSETS_ROOT = path.resolve(__dirname, '../site-configs/crabit-korea/assets');
const MANIFEST_PATH = path.join(ASSETS_ROOT, 'library-manifest.json');

export interface ComponentMeta {
  id: string;
  name: string;
  category: string;
  filePath: string;
  metaPath: string;
  viewBox: string;
  dimensions?: { width: number; height: number };
  sockets?: Record<string, { x: number; y: number }>;
  pivots?: Record<string, { x: number; y: number }>;
  tags?: string[];
  version: string;
  [key: string]: any;
}

function scanDirectory(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (file.endsWith('.meta.json')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function buildManifest(assetsRoot: string = ASSETS_ROOT, manifestPath: string = MANIFEST_PATH) {
  console.log(`🔍 [Indexer] Quét toàn bộ linh kiện tại: ${assetsRoot}`);
  const metaFiles = scanDirectory(assetsRoot);
  const manifest: {
    generated_at: string;
    total_components: number;
    categories: Record<string, number>;
    components: Record<string, ComponentMeta>;
  } = {
    generated_at: new Date().toISOString(),
    total_components: 0,
    categories: {},
    components: {}
  };

  for (const metaFile of metaFiles) {
    try {
      const rawContent = fs.readFileSync(metaFile, 'utf-8');
      const content = JSON.parse(rawContent);

      // Validate integrity using Zod contract
      const validation = AtomicComponentMetaSchema.safeParse(content);
      if (!validation.success) {
        console.warn(`⚠️ [Zod Warning] ${metaFile} vi phạm schema:`, JSON.stringify(validation.error.format(), null, 2));
      }

      const svgPath = metaFile.replace('.meta.json', '.svg');

      if (!fs.existsSync(svgPath)) {
        console.warn(`⚠️ Cảnh báo: Tìm thấy ${metaFile} nhưng thiếu file SVG tương ứng!`);
        continue;
      }

      const relativeSvg = path.relative(assetsRoot, svgPath);
      const relativeMeta = path.relative(assetsRoot, metaFile);

      manifest.components[content.id] = {
        ...content,
        sockets: content.sockets || {},
        filePath: relativeSvg,
        metaPath: relativeMeta
      };

      manifest.categories[content.category] = (manifest.categories[content.category] || 0) + 1;
      manifest.total_components++;
    } catch (err) {
      console.error(`❌ Lỗi phân tích tệp metadata: ${metaFile}`, err);
    }
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`✅ [Manifest Done] Đã lập chỉ mục ${manifest.total_components} linh kiện vào library-manifest.json!`);
  return manifest;
}

// Chạy trực tiếp qua CLI
if (typeof require !== 'undefined' && require.main === module) {
  buildManifest();
} else {
  buildManifest();
}
