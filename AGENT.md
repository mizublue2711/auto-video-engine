# 🛡️ REPOSITORY PROTOCOL & WORKER DIRECTIVE: AGENT.md

**STRICT COMPLIANCE REQUIRED**: This repository houses a deterministic, multi-tenant Video-as-Code engine built on Remotion, React, and Zod. Every AI Agent and human developer must strictly follow this protocol. Violations that hardcode client data, break vector consistency, or bypass Zod validation will be immediately rejected.

---

## 1. PRODUCTION ARCHITECTURE & WORKFLOW SPLIT (DUAL-TRACK PIPELINE)

To eliminate pipeline bottlenecks and rendering defects, video production is strictly divided into two decoupled domains:

┌────────────────────────────────────────────────────────────────────────┐ │ CORE PIPELINE ARCHITECTURE │ ├──────────────────────────────────┬─────────────────────────────────────┤ │ A. ORGANIC & BIOLOGICAL TRACK │ B. MECHANICAL & FINTECH TRACK │ │ (Google Flow Video Plates) │ (Remotion Isolated Motion Engine) │ ├──────────────────────────────────┼─────────────────────────────────────┤ │ • Human character acting/acting │ • Analog wall clock mechanics │ │ • Mascot facial/body kinetics │ • Chalkboard CSAT math drawing │ │ • Organic finger articulation │ • High-resolution Crabit App UI │ │ • Atmospheric lighting & cosmos │ • Active scholarship balance ticker │ │ • Output: public/flow_plates/.mp4│ • Output: src/components/props/.tsx│ └──────────────────────────────────┴─────────────────────────────────────┘


1. **Role of Google Flow (Organic Layer)**:
   * Generates cinematic human expressions, clothing physics, and mascot movement using vector SVG model sheets as Start Frames (Image-to-Video).
   * The Agent does **NOT** rig biological skeletons, joints, or walking cycles inside Remotion.
2. **Role of Remotion (Mechanical Layer)**:
   * Programmatically drives precise, deterministic mechanical motion on isolated transparent canvases.
   * Acts as the final Master Compositor, pinning UI/props over Google Flow video plates.

---

## 2. FILE & ASSET NAMING TAXONOMY

All assets in `site-configs/<client-id>/assets/`, `public/`, or `src/components/` must follow the semantic pattern:  
`[entity_type]_[object_name]_[part_or_state].[ext]`

* `char_*`: Character anchor sheets and visual references (e.g., `char_student_master.svg`, `char_director_master.svg`).
* `mascot_*`: Brand mascot master sheets (e.g., `mascot_crabit_carat_crystal.svg`).
* `prop_*`: Isolated mechanical devices and stationery (e.g., `prop_clock_dial.svg`, `prop_chalkboard_empty.svg`).
* `ui_*`: Digital mockups, fintech cards, and HUDs (e.g., `ui_phone_mockup_chroma.svg`, `ui_crabit_card_base.svg`).
* `fx_*`: Particle systems and reward gems (e.g., `fx_carat_gem.svg`, `fx_sparkle.svg`).
* `flow_*`: Video plates exported from Google Flow placed in `public/flow_plates/`.

---

## 3. VECTOR CRAFT DIRECTIVES (MASTER ANCHORS & PROPS)

The Agent responsible for SVG asset generation must adhere to strict vector discipline:

1. **Strict Clean XML**: Every SVG must feature clean `viewBox` coordinates, closed paths, explicit `<g id="...">` grouping, zero raster blur filters, and zero inline CSS styles.
2. **Character & Mascot DNA Locking**:
   * **Hero Student (`char_student_master.svg`)**: 17-year-old Korean high school student, dark slate bangs (`#1E293B`), mandatory 20–24px neck column, Royal Blue hoodie (`#2563EB`) with white drawstrings, charcoal trousers (`#334155`).
   * **Mascot Crabit (`mascot_crabit_carat_crystal.svg`)**: 2D faceted crystal gemstone crab (`#00E5FF`, `#E0F7FA`, `#00B4D8`), white circular intellect spectacles (`#FFFFFF`), 6 natural crystal walking legs, and 2 curved pincers. **STRICTLY NO orange/boiled crab palettes and NO realistic crustacean spikes**.
   * **Hagwon Director (`char_director_master.svg`)**: 40-year-old male educator, dark charcoal side-part hair (`#0F172A`), thin silver spectacles (`#94A3B8`), deep navy knit cardigan (`#1E3A8A`) over white collared shirt (`#F8FAFC`).
3. **Chroma Screen Contract (`ui_phone_mockup_chroma.svg`)**:
   * Phone mockups used for Google Flow video generation must display a completely flat, solid Chroma Green screen (`#00FF00`) with zero icons or text, ready for digital screen replacement.
4. **Token Metaphor Rule**:
   * "Carats" (캐럿) strictly refers to faceted cyan/aqua gemstones (`#00E5FF`), never agricultural carrots.

---

## 4. ISOLATED MECHANICAL MOTION PROTOCOL (REMOTION)

The Agent writing Remotion code develops modular, self-contained components in `src/components/props/` that execute independently on a transparent background:

1. **Deterministic Motion Only**:
   * Never use `Math.random()`, `Date.now()`, or uncontrolled CSS transitions.
   * Drive all physics through `useCurrentFrame()`, `interpolate()`, and `spring()`.
2. **Core Mechanical Component Deliverables**:
   * `PropAnalogClock.tsx`: Hour/minute hands rotating smoothly, second hand snapping with mechanical spring damping.
   * `PropChalkboardMath.tsx`: CSAT math curves and formulas animated sequentially via SVG `strokeDasharray` and `strokeDashoffset`.
   * `PropPhoneScreenUI.tsx`: High-resolution Crabit App UI with kinetic task list scrolling and dynamic button states.
   * `PropScholarshipCounter.tsx`: Numeric balance ticker counting up (`0` -> `+50,000 KRW`) followed by the `"충전 완료"` badge reveal.
3. **Master Layer Stacking Order (Z-Index)**:
   * `0 - 19`: Google Flow Video Plate (`<Video src={staticFile("flow_plates/...")} />`).
   * `20 - 49`: Room props, chalkboard math, and wall clocks (`prop_*`).
   * `50 - 79`: UI overlays, pinned phone displays, and Crabit Card (`ui_*`).
   * `80 - 100`: Kinetic typography, particle bursts, and Carat gem streams (`fx_*`).

---

## 5. VALIDATION GATES & TESTING CONTRACT

Before marking any task complete or committing code, the Agent MUST verify:

1. **Config Validation**: `npm run validate:configs` (Verifies client JSON against Zod schema).
2. **Type Check**: `npm run type-check` (Strict TypeScript, zero `any` types).
3. **Isolated Visual Audit (The Mirror Test)**:
   * Render vector assets to PNG: `npx -y @resvg/resvg-js <path-to-svg> out/audit_preview.png`.
   * Render Remotion frames: `npx remotion still MasterComposition --frame=45 out/audit_frame.png`.
   * Inspect visual output to ensure zero geometry clipping or text corruption.

---

## 6. COMMIT CONVENTIONS

Use Conventional Commits:
* `feat(props)`: implement isolated mechanical clock motion
* `feat(ui)`: build high-resolution phone app screen component
* `asset(mascot)`: sculpt faceted diamond Carat Crabit SVG
* `chore(pipeline)`: integrate Google Flow video plate into MasterComposition
