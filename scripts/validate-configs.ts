import fs from 'node:fs';
import path from 'node:path';
import { VideoConfigSchema } from '../src/schemas/VideoConfigSchema';

function findJsonFiles(dir: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets') continue;
      results.push(...findJsonFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.json') && !entry.name.includes('manifest')) {
      results.push(fullPath);
    }
  }

  return results;
}

function runValidation() {
  const configsDir = path.resolve(__dirname, '../site-configs');
  console.log(`🔍 Scanning tenant configurations in: ${configsDir}`);

  const jsonFiles = findJsonFiles(configsDir);
  if (jsonFiles.length === 0) {
    console.error('❌ No JSON configuration files found.');
    process.exit(1);
  }

  let errorCount = 0;

  for (const filePath of jsonFiles) {
    const relativePath = path.relative(path.resolve(__dirname, '..'), filePath);
    try {
      const rawContent = fs.readFileSync(filePath, 'utf-8');
      const parsedData = JSON.parse(rawContent);

      const result = VideoConfigSchema.safeParse(parsedData);
      if (!result.success) {
        console.error(`\n❌ [Validation Failed] ${relativePath}`);
        console.error(JSON.stringify(result.error.format(), null, 2));
        errorCount++;
      } else {
        console.log(`✅ [Valid Config] ${relativePath} (Tenant: ${result.data.tenantId})`);
      }
    } catch (err: unknown) {
      console.error(`\n❌ [Parse Error] Failed to read or parse ${relativePath}:`, err);
      errorCount++;
    }
  }

  if (errorCount > 0) {
    console.error(`\n🚨 Validation failed with ${errorCount} invalid configuration file(s).`);
    process.exit(1);
  }

  console.log(`\n🎉 All ${jsonFiles.length} tenant configuration(s) passed schema validation successfully.`);
}

runValidation();
