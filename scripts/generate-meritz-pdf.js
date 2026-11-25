// scripts/generate-meritz-pdf.js
// 1-command launcher that generates public/downloads/chai/Meritz_Partners_5Cut_Timeline_Spec.pdf
// using public/storyboard/Chai/spec 1.svg, spec 2.svg, and full Vietnamese + Korean typography.

import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pyScript = path.join(__dirname, 'generate_meritz_pdf.py');

execFileSync('python3', [pyScript], { stdio: 'inherit' });
