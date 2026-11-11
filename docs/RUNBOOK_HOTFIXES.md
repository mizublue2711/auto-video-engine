# 🛠️ OPERATIONAL RUNBOOK & RECENT HOT-FIXES (TIER 2: RUNBOOK & INCIDENT LOG)

> **MANDATORY FOR ALL AI WORKERS (Jules, An)**: Read this document before generating or modifying any visual SVG asset or React rig.
> This runbook records past failures, visual deformities, and breaking defects. REPEATING KNOWN DEFECTS IS STRICTLY FORBIDDEN.

---

## 📋 STANDARDIZED INCIDENT LOG TEMPLATE
Whenever a corrective feedback is received, a visual inspection fails, or a new edge-case is resolved, the AI Worker MUST append a new case using this exact 4-part structure:

### 🛑 CASE [NUMBER]: [DESCRIPTIVE TITLE] (Updated: YYYY-MM-DD)
* **1. What was the problem (Visual / Technical Defect)?**
  - Concrete description of the visual distortion, broken geometry, or runtime failure.
* **2. How was it resolved (Root Cause & Solution)?**
  - Specific technical fix, code changes, path adjustments, or architectural decoupling applied.
* **3. What is the key lesson (Key Insight)?**
  - The architectural or anatomical blind spot that led to the defect.
* **4. What is the non-negotiable rule for future tasks (Golden Rule)?**
  - Immutable constraint, measurement ratio, or validation test enforced from now on.

---

## 📚 ARCHIVED INCIDENTS & LESSONS LEARNED

### 🛑 CASE 01: HAND ANATOMICAL DEFORMITIES (Updated: 2026-11-10)
* **1. What was the problem?**
  - Phone was merged into hand SVGs; thumbs rendered as vertical wooden stakes/spheres; pointer fingers elongated 3x into stilt rods with grotesque multi-joint creases; grey zombie skin tones.
* **2. How was it resolved?**
  - Decoupled hands from phones completely. Constrained index finger length to <=0.85x palm length (~75px). Thumb anchored to fleshy thenar pad at 35°–45° angle. Unified skin tone to #FFE3D1 with #FCA5A5 soft folds.
* **3. What is the key lesson?**
  - Never merge interactive props into limb geometry. Constrain anatomical ratios with strict pixel bounding boxes.
* **4. What is the non-negotiable rule for future tasks?**
  - Hands and devices MUST be separate files. Index fingers must never exceed 85px. The Mirror Test (multimodal inspection of rendered PNG) must pass before committing.

### 🛑 CASE 02: HOODIE & BACKPACK SANDWICH RIGGING (Updated: 2026-11-10)
* **1. What was the problem?**
  - Merged hoodie+backpack forced characters to wear bulky backpacks in seated classroom scenes, causing clipping with chair backrests.
* **2. How was it resolved?**
  - Split into `torso_hoodie_34_clean.svg` (universal base) and `prop_backpack_sandwich.svg` (rear bag at Z:10, front chest straps at Z:30, torso sandwiched at Z:20).
* **3. What is the key lesson?**
  - Wearable accessories with front-and-back occlusion must be decoupled into multi-layer sandwich rigs.
* **4. What is the non-negotiable rule for future tasks?**
  - Base clothing must be clean and standalone. Backpacks/bags must never be baked into torso assets.

### 🛑 CASE 03: SINGLE MASTER LEG RIGGING (Updated: 2026-11-10)
* **1. What was the problem?**
  - Drawing two walking legs in a single SVG created merged limb meshes, mismatched shoe geometry, and rigid static poses unmodifiable in Remotion.
* **2. How was it resolved?**
  - Created a single neutral straight leg (`leg_single_master.svg`) with 3 hierarchical groups (thigh -> shin -> foot). Remotion duplicates the leg, offsets the phase by 180° for walk cycle, and applies CSS `filter: brightness(0.72)` for depth.
* **3. What is the key lesson?**
  - Kinetic multi-limb systems should be procedurally multiplied from a single modular asset.
* **4. What is the non-negotiable rule for future tasks?**
  - Draw ONLY ONE master leg in vertical rest pose. Never bake dual walking poses into static SVGs.

### 🛑 CASE 04: HAGWON DESK MODESTY PANEL OCCLUSION (Updated: 2026-11-10)
* **1. What was the problem?**
  - Seated student scenes attempted to render legs floating awkwardly under open desks, penetrating chair legs.
* **2. How was it resolved?**
  - Added an opaque modesty panel (`#E2E8F0`) to `prop_desk_hagwon.svg` completely blocking the void below tabletop to 20px above the floor.
* **3. What is the key lesson?**
  - Physical classroom furniture serves as visual clipping masks in 2D animation.
* **4. What is the non-negotiable rule for future tasks?**
  - All Hagwon desks must include solid modesty panels. Never draw legs under seated modesty desks.

### 🛑 CASE 05: MONOLITHIC MODEL SHEET RETIREMENT (Updated: 2026-11-10)
* **1. What was the problem?**
  - Attempting to edit `character_master_model_sheet.svg` (2400x1600, 3000+ lines) caused context overflow and hallucinated geometry.
* **2. How was it resolved?**
  - Demoted the master model sheet to a visual blueprint reference only. Migrated all production assets to atomic files in `student-rig-kit/`.
* **3. What is the key lesson?**
  - AI coding agents degrade rapidly on massive monolithic SVG canvases.
* **4. What is the non-negotiable rule for future tasks?**
  - Work exclusively on decoupled atomic micro-assets (<500px viewBox). Never edit the monolithic model sheet directly.

### 🛑 CASE 06: HAND ANATOMICAL DEFORMITIES & PROFILE SWIPER RESCUE (Updated: 2026-11-11)
* **1. What was the problem (Visual / Technical Defect)?**
  - In `hand_swiping_profile_right.svg` (and the hand rig suite), finger paths were severed across knuckles creating visible steps and notches; open unclosed paths for thumbs caused floating wireframe scratches with broken wrist tapers; curled fingers fragmented into lumpy caterpillar lobes; muddy multi-stop gradients caused zombie-gray skin tones; and pointer fingers elongated into alien stilts (>100px).
* **2. How was it resolved (Root Cause & Solution)?**
  - Re-engineered the assets with single continuous outer silhouette vectors uniting the dorsal palm, index finger, and compact fist mass. Reconstructed the folded thumb as a solid filled volume (`#FFE3D1`, `#E0A890` 2.5px stroke) emerging seamlessly from within the hoodie cuff opening. Constrained index pointer length strictly to ~74px (well under 0.85x palm length) angled at 30° toward `(180, 55)`. Standardized on pure `#FFE3D1` warm skin fill, and limited accents to at most two subtle crescent arcs in `#FCA5A5` (opacity 0.6).
* **3. What is the key lesson (Key Insight)?**
  - In 2D anime/manhwa vector rigging, assembling hands from fragmented sub-paths creates awkward seams and dislocated joints. A hand's primary structural silhouette must be drawn as one continuous contour, with interior details (cuff, thumb overlap, knuckle ticks) layered cleanly on top.
* **4. What is the non-negotiable rule for future tasks (Golden Rule)?**
  - All hand assets must feature unified outer silhouettes for the primary mass, zero muddy/gray linear gradients, index fingers <=85px, and must pass autonomous multimodal inspection (the Mirror Test) on rendered PNGs prior to committing.

### 🛑 CASE 06: HEAD VECTOR ARTIFACTS & TOOTHPICK NECK (Updated: 2026-11-10)
* **1. What was the problem (Visual / Technical Defect)?**
  - head_bored_slumped.svg contained a stray black polygon spike over the eyebrow, a floating white text artifact outside the hair, clunky doubled eyebrows, and an unnaturally long toothpick neck.
* **2. How was it resolved (Root Cause & Solution)?**
  - Purged stray polygon boolean paths and floating glyphs; softened and decoupled eyebrow arcs from downward lashes; widened and flared the neck base (width 42px, height 28px) to anchor cleanly to the torso socket.
* **3. What is the key lesson (Key Insight)?**
  - Automated vector extraction from monolithic sheets often carries hidden overlapping path fragments and stray unclosed vertices.
* **4. What is the non-negotiable rule for future tasks (Golden Rule)?**
  - After extracting sub-assets, inspect raw path nodes to ensure zero stray boolean fragments exist, and verify the neck base flares outward before socket registration.

### 🛑 CASE 07: XML COMMENT SYNTAX & HIGH-CONTRAST VECTOR GEM MASCOT INTEGRATION (Updated: 2026-11-11)
* **1. What was the problem (Visual / Technical Defect)?**
  - Standard SVG/XML parsers (such as resvg-js and strict headless browsers) aborted rendering with syntax error `SVG data parsing failed cause invalid comment at line X: '--' is not allowed in comments`. Visually, initial spectacle white stroke lacked depth against light backgrounds, and claw arms appeared blocky rather than flowing in dynamic anime crescent arcs.
* **2. How was it resolved (Root Cause & Solution)?**
  - Purged all double hyphens `--` inside SVG comment blocks to strictly satisfy XML 1.0 specifications. Enhanced spectacle frames with a subtle dual-rim contrast underlayer (`#0077B6` 4.8px at opacity 0.45) beneath the brilliant `#FFFFFF` stroke, scaled intellect eyes to expressive anime proportions (R=24) with 4-point star sparkle highlights, and sculpted claw arms into sweeping faceted crescent prisms with gradient-illuminated pincer tips (`#00E5FF` to `#E0F7FA`).
* **3. What is the key lesson (Key Insight)?**
  - SVG files are XML documents subject to strict XML 1.0 comment grammar; using ASCII separators like `<!-- --- -->` causes fatal parser crashes. Furthermore, white vector lines intended as highlights must include dark or ambient depth rims to avoid washing out across white or transparent canvas backgrounds.
* **4. What is the non-negotiable rule for future tasks (Golden Rule)?**
  - Never include `--` inside SVG comments. All white foreground line accents and spectacles must feature contrast backdrops or rim underlayers. Every newly created mascot or prop must pass the offline resvg-js render and multimodal Mirror Test before landing.



