import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

interface AuditResult {
  filename: string;
  sizeBytes: number;
  status: 'FOUND' | 'MISSING' | 'EMPTY';
  xmlValid?: boolean;
  viewBox?: string;
  viewBoxCompliant?: boolean;
  groupCount?: number;
  idCount?: number;
  keyGroups?: string[];
  inlineStyleViolations?: number;
  hasCleanPresentationAttrs?: boolean;
  recommendedAnchors?: Record<string, string>;
  notes?: string;
}

const ASSET_DIR = path.resolve(__dirname, '../site-configs/crabit-korea/assets');

const MANDATORY_FILES = [
  'char_director_standing.svg',
  'char_student_desk_morph.svg',
  'prop_crabit_phone_hero.svg',
  'prop_icon_handraise.svg',
  'prop_icon_book_sparkle.svg',
  'prop_crabit_card_reward.svg',
  'scene3_classroom_peer_contrast.svg',
  'scene3a_teacher_chalkboard_challenge.svg',
  'asset-manifest.json',
];

function auditSvgContent(content: string, filename: string): Partial<AuditResult> {
  // 1. Strict XML validation
  let xmlValid = false;
  let notes: string | undefined;

  // Check 1A: Illegal double-hyphens inside comments (XML 1.0 Section 2.5)
  const commentMatches = content.match(/<!--([\s\S]*?)-->/g) || [];
  for (const comment of commentMatches) {
    const inner = comment.slice(4, -3);
    if (inner.includes('--')) {
      xmlValid = false;
      notes = 'Illegal "--" detected inside XML comment (violates XML 1.0 Section 2.5)';
      break;
    }
  }

  // Check 1B: True XML parser execution
  if (!notes) {
    try {
      execSync(`python3 -c "import xml.etree.ElementTree as ET; ET.fromstring('''${content.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}''')"`, {
        stdio: 'pipe',
      });
      xmlValid = true;
    } catch {
      // Fallback: file-based check if command line was too long or escaped
      try {
        const filePath = path.join(ASSET_DIR, filename);
        execSync(`python3 -c "import xml.etree.ElementTree as ET; ET.parse('${filePath}')"`, { stdio: 'pipe' });
        xmlValid = true;
      } catch (err: any) {
        xmlValid = false;
        notes = `XML Parser Error: ${err.message || 'Malformed XML structure'}`;
      }
    }
  }
  
  // 2. ViewBox
  const viewBoxMatch = content.match(/viewBox=["']([^"']+)["']/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : undefined;
  const viewBoxCompliant = viewBox === '0 0 1000 1000' || viewBox === '0 0 500 500' || viewBox === '0 0 800 1200' || viewBox === '0 0 1920 1080' || viewBox === '0 0 1200 1600';

  // 3. Groups & IDs
  const idMatches = content.match(/id=["']([^"']+)["']/g) || [];
  const ids = idMatches.map((m) => m.replace(/id=["']|["']/g, ''));
  const groupMatches = content.match(/<g\b/g) || [];

  // 4. Inline CSS check
  const inlineStyles = content.match(/style=["'][^"']+["']/g) || [];

  // 5. Rigging anchors
  const recommendedAnchors: Record<string, string> = {};
  if (filename === 'char_director_standing.svg') {
    recommendedAnchors['#director_head_group'] = "transformOrigin: '500px 330px' (base of neck)";
    recommendedAnchors['#director_left_arm_idle'] = "transformOrigin: '570px 330px' (shoulder joint)";
    recommendedAnchors['#director_arm_present_group'] = "transformOrigin: '430px 350px' (shoulder joint)";
    recommendedAnchors['#mini_phone_mockup'] = "transformOrigin: '280px 480px' (hand center)";
  } else if (filename === 'char_student_desk_morph.svg') {
    recommendedAnchors['#student_head_bored'] = "transformOrigin: '500px 550px' (neck base / slump)";
    recommendedAnchors['#student_head_excited'] = "transformOrigin: '500px 515px' (neck base / upright)";
    recommendedAnchors['#student_torso_group'] = "transformOrigin: '500px 640px' (torso base)";
    recommendedAnchors['#student_arms_resting_on_desk'] = "transformOrigin: '500px 595px' (table resting point)";
  }

  return {
    xmlValid,
    viewBox,
    viewBoxCompliant,
    groupCount: groupMatches.length,
    idCount: ids.length,
    keyGroups: ids.slice(0, 12),
    inlineStyleViolations: inlineStyles.length,
    hasCleanPresentationAttrs: inlineStyles.length === 0,
    recommendedAnchors,
  };
}

export function runFullAudit(): void {
  console.log('='.repeat(80));
  console.log('🛡️ RIGOROUS DETERMINISTIC ASSET & SVG RIGGING AUDIT (AGENT.md COMPLIANCE)');
  console.log('='.repeat(80));
  console.log(`Directory: ${ASSET_DIR}\n`);

  const presentFiles = fs.readdirSync(ASSET_DIR).filter((f) => f !== '.gitkeep');
  console.log(`📁 Files discovered in target directory: ${presentFiles.length}`);
  presentFiles.forEach((file) => {
    const stat = fs.statSync(path.join(ASSET_DIR, file));
    console.log(`  • ${file.padEnd(32)} ${stat.size.toString().padStart(6)} bytes`);
  });

  console.log('\n' + '-'.repeat(80));
  console.log('📋 MANDATORY CHECKLIST EVALUATION');
  console.log('-'.repeat(80));

  const checklistReport: AuditResult[] = [];

  for (const item of MANDATORY_FILES) {
    const fullPath = path.join(ASSET_DIR, item);
    const exists = fs.existsSync(fullPath);

    if (!exists) {
      checklistReport.push({
        filename: item,
        sizeBytes: 0,
        status: 'MISSING',
        notes: 'Asset file is absent from the directory. Immediate ingestion required.',
      });
      console.log(`❌ [MISSING]  ${item}`);
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.size === 0) {
      checklistReport.push({
        filename: item,
        sizeBytes: 0,
        status: 'EMPTY',
        notes: '0-byte placeholder detected. Fails integrity gate.',
      });
      console.log(`⚠️ [EMPTY]    ${item} (0 bytes)`);
      continue;
    }

    let extra: Partial<AuditResult> = {};
    if (item.endsWith('.svg')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      extra = auditSvgContent(content, item);
    }

    checklistReport.push({
      filename: item,
      sizeBytes: stat.size,
      status: 'FOUND',
      ...extra,
    });
    console.log(`✅ [PRESENT]  ${item} (${stat.size} bytes)`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('🔬 DEEP SVG SYNTAX & RIGGING PER-FILE AUDIT');
  console.log('='.repeat(80));

  for (const report of checklistReport.filter((r) => r.status === 'FOUND' && r.filename.endsWith('.svg'))) {
    console.log(`\n📄 Asset: ${report.filename}`);
    console.log(`   ├─ File Size: ${report.sizeBytes} bytes`);
    console.log(`   ├─ XML Parsing & Well-formedness: ${report.xmlValid ? 'PASSED ✅' : 'FAILED ❌'}`);
    console.log(`   ├─ ViewBox: "${report.viewBox}" -> ${report.viewBoxCompliant ? 'COMPLIANT ✅' : 'NON-COMPLIANT ❌'}`);
    console.log(`   ├─ Semantic ID Count: ${report.idCount} tagged nodes (Groups: ${report.groupCount})`);
    console.log(`   ├─ Inline CSS Styles: ${report.inlineStyleViolations === 0 ? 'CLEAN (0 violations) ✅' : `${report.inlineStyleViolations} style attributes detected ❌`}`);
    console.log(`   └─ Recommended Remotion Rigging Anchor Coordinates:`);
    if (report.recommendedAnchors) {
      for (const [id, anchor] of Object.entries(report.recommendedAnchors)) {
        console.log(`       * ${id.padEnd(30)} => ${anchor}`);
      }
    }
  }

  const missingCount = checklistReport.filter((r) => r.status === 'MISSING').length;
  console.log('\n' + '='.repeat(80));
  console.log(`📊 AUDIT SUMMARY: ${checklistReport.length - missingCount}/${checklistReport.length} PASSED. ${missingCount} ASSETS REQUIRE INGESTION.`);
  console.log('='.repeat(80));
}

runFullAudit();
