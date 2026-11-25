# 🤖 AGENT.md - CORE OPERATIONAL DIRECTIVES & QUALITY GATES
**Project:** Auto Video Engine (Google Flow / Genie 4 + Remotion + AI Audio Engine)  
**Agent Role:** Execution Engine, Modular Component Assembler & Motion Coder  
**Status:** MANDATORY ENFORCEMENT ON ALL TASKS

---

## ⛔ 1. CORE VIDEO-AS-CODE INVIOLABILITY RULES

### Rule 1.1: Audio-Driven Sequence Determinism (MANDATORY FOR K-DRAMA ADS)
- When building timeline sequences driven by voiceovers (e.g., `Chai Communication` Joseon drama cuts):
  - **NEVER hardcode frame durations blindly.** All cut durations MUST be derived from measured audio durations: `durationInFrames = Math.ceil(audioSeconds * 30) + paddingFrames`.
  - Master sequence compositions MUST use `<Series>` and `<Series.Sequence>` to eliminate cumulative sync drift.

### Rule 1.2: Mobile Safe-Zone & Layer Hierarchy (9:16 & 1:1 Adaptive)
- **Top 18%-20%**: Reserved exclusively for sticky banners (`ChaiTopBanner`). No actor headgear or critical focal points allowed here.
- **Center 55%**: Core visual stage for Genie 4 clean plates.
- **Bottom 22%-25%**: Reserved for `DynamicSubtitles` and TikTok/Reels native platform UI.
- All overlay text, badges, and kinetic typography MUST have high contrast with backdrop blur or drop shadows.

### Rule 1.3: 100% Mandatory Clamping on Remotion Interpolations
- Every `interpolate()` call driving rotation, position, opacity, or scale MUST include:
  `{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }`
- Unclamped interpolations cause infinite visual drift beyond frame boundaries.

---

## 📜 2. CONTRACT-FIRST ARCHITECTURE (ZOD SCHEMAS)
1. **Schema Authority:** All component, scene props, and client configs must be strictly governed by Zod schemas in `src/schemas/`.
2. **Runtime Safety:** When consuming props, always validate via `.parse(props || {})` with complete fallback defaults. Zero unhandled undefined values allowed in production renders.

---

## 🏛️ 3. REGISTRY PROTOCOL & BARREL GOVERNANCE (MANDATORY GATE)

Zero visual component or motion wrapper shall exist as an unregistered orphan file.

### 3.1 Dual-Registry Architecture
- **Visual Assets & Sub-Components:** All UI cards, badges, banners, subtitle containers, and ending cards MUST be registered in:
  👉 `src/components/registry.ts`
- **Motion Wrappers:** All kinetic spring animators, text bouncy wrappers, and transitions MUST be registered in:
  👉 `src/components/motion/registry.ts`

### 3.2 Clean Barrel Imports
- [STRICT] NEVER import via deeply nested relative paths.
- [ALWAYS] Import exclusively via the clean registries:
  ```tsx
  import { ChaiTopBanner, ChaiDynamicSubtitle, ChaiEndingCard } from '../components/registry';
  import { KineticPopWrapper, FadeSlideWrapper } from '../components/motion/registry';
  ```
  
📁 4. DIRECTORY STRUCTURE CONVENTIONS
Schemas: src/schemas/
Sub-components / Graphic UI: src/components/chai/ or src/components/props/
Motion Wrappers: src/components/motion/
Master Scenes: src/scenes/
Multi-tenant Client Configs & Audio: site-configs/{client-id}/ (e.g., site-configs/chai-communication/voice cut/)
AI Video Master Plates: public/video_plates/{client-id}/*.mp4

🚦 5. TWO-TIER VERIFICATION GATE (FAIL-FAST AUDIT)
A task is NOT complete until both verification tiers pass:
Tier 1 - Static Verification:
npm run validate:configs
npx tsc --noEmit
(Must exit with 0 errors).
Tier 2 - Visual Boundary Still Render:
npx remotion still src/index.ts ChaiAdShortDramaVertical --frame=45 /tmp/audit_chai_frame.png
