# 🛡️ REPOSITORY PROTOCOL & AI WORKER DIRECTIVE: AGENT.md

> **STRICT COMPLIANCE REQUIRED**: This repository houses a deterministic, multi-tenant Video-as-Code engine built on Remotion, React, and Zod. Every AI agent (Jules, Antigravity, Claude Code, Aider) and human developer must strictly follow this protocol. Violations that bypass Zod validation, hardcode client data into core components, or corrupt layer hierarchies will be immediately rejected.

---

## 1. CORE ARCHITECTURAL PRINCIPLES

1. **Strict Separation of Data & Engine**:
   - `src/core/`, `src/components/`, and `src/scenes/` are **generic and engine-agnostic**.
   - NEVER hardcode Korean copywriting, brand hex codes, or specific dollar amounts inside `src/`.
   - All dynamic variables must be injected via `site-configs/<client-id>/config.json` and validated by `src/schemas/VideoConfigSchema.ts`.
2. **Deterministic 60FPS / 30FPS Rendering**:
   - Never use `Date.now()`, `Math.random()`, or uncontrolled CSS keyframe animations.
   - All animations must be driven mathematically by Remotion hooks: `useCurrentFrame()`, `spring()`, and `interpolate()`.
3. **Modular Scene Isolation (Lego Architecture)**:
   - Each Scene (`Scene1.tsx` to `Scene4.tsx`) is an isolated pre-comp with its own frame duration.
   - Global sequencing is handled exclusively inside `MasterComposition.tsx` using `<TransitionSeries>`.

---

## 2. FILE & ASSET NAMING CONVENTIONS

All assets placed in `site-configs/<client-id>/assets/` or `public/` must follow the semantic taxonomy:
`[entity_type]_[object_name]_[part_or_state].[ext]`

- `bg_*`: Background plates and grid layouts (e.g., `bg_classroom_flat.svg`).
- `char_*`: Character body parts and rigs (e.g., `char_student_bored.svg`, `char_director_standing.svg`).
- `prop_*`: Physical items, devices, and stationery (e.g., `prop_phone_hero.svg`, `prop_book_icon.svg`).
- `ui_*`: Software mockups, cards, and tickers (e.g., `ui_crabit_card.svg`, `ui_app_screen.svg`).
- `fx_*`: Particle effects, sparkles, and badges (e.g., `fx_carrot_coin.svg`, `fx_sparkle.svg`).

*Rule*: All SVGs must be clean XML with explicit `<g id="...">` tags, no inline CSS styles, closed paths, and clean `viewBox` coordinates (`0 0 1000 1000` for props, `0 0 1920 1080` for scenes).

---

## 3. RIGGING & MOTION CONTRACT

When animating vector layers inside Remotion:
1. **Transform Origin Discipline**:
   - Head elements: `transformOrigin: 'bottom center'` (base of the neck).
   - Limbs/Arms: `transformOrigin: 'top left'` or specific joint anchor coordinates.
   - Floating Props & Cards: `transformOrigin: 'center center'`.
2. **Spring Physics Baseline (Korean Commercial Style)**:
   - Snappy / Pop-up: `{ fps: 30, config: { damping: 12, mass: 0.8, stiffness: 120 } }` (10% overshoot).
   - Smooth Morph: `{ fps: 30, config: { damping: 20, mass: 1, stiffness: 80 } }`.
3. **Z-Index Layer Hierarchy**:
   - `0 - 19`: Background elements (`bg_*`).
   - `20 - 49`: Midground props and character torso (`char_*`, `prop_*`).
   - `50 - 79`: Forehead expressions, hands, devices, hero cards (`ui_*`).
   - `80 - 100`: Floating particles, text reveals, and kinetic overlays (`fx_*`).

---

## 4. VALIDATION & TESTING GATES (FAIL-FAST)

Before committing code or opening a Pull Request, the AI worker MUST verify:
1. `npm run validate:configs`: Validates all JSON configs against `VideoConfigSchema.ts`.
2. `npm run type-check`: Strict TypeScript checking with zero `any` types.
3. `npx remotion still MasterComposition --frame=45 out/test_scene1.png`: Verifies visual compilation without headless browser errors.

---

## 5. COMMIT CONVENTIONS

Use Conventional Commits:
- `feat(engine): add spring physics presets to src/core/physics`
- `feat(scene-4): implement Crabit Card deposit counter`
- `asset(crabit): ingest clean SVGs for character and phone mockup`
- `fix(schema): correct balance property type in VideoConfigSchema`
---

## 6. VISUAL INTEGRITY, SPATIAL PERSPECTIVE & ANATOMICAL CONTRACT

> **CRITICAL VISUAL PROTOCOL**: AI vector generators inherently suffer from local path generation without spatial depth awareness. All SVG assets generated for this engine MUST strictly follow these physical, geometric, and anatomical laws. Violations will be rejected during visual QA.

### 6.1. Human Anatomy & Joint Rigging Rules
1. **Mandatory Neck Column**:
   - Never attach heads directly to torso collars or hoodies.
   - Every human character MUST have an explicit neck element (`<rect>` or `<path>` with skin fill) spanning at least 20–30px between the chin line and the collar/clavicle.
2. **Shoulder Socket Discipline**:
   - Limbs and raised arms MUST originate strictly from the anatomical shoulder joint (offset horizontally from the chest center), NEVER from the head, ears, or temples.
   - Maintain a minimum of 30–40px negative visual space between the side of the head/ear and an ascending upper arm.
3. **Articulated Limbs vs. Flat Sticks**:
   - Never render arms or pointer sticks as single unsegmented lines or cylinders.
   - Arms must have distinct segments: upper arm -> elbow flexion -> forearm -> wrist -> gripping hand with distinct fingers.
4. **Grounded Seated Posture (Anti-Squatting Contract)**:
   - Floating half-torsos or "mid-air squatting" are strictly prohibited.
   - Any seated character MUST explicitly include:
     1. `chair_backrest`: Visible silhouette behind or beside the torso.
     2. `hips_and_thighs`: Horizontal trouser volume extending forward from the seat to the knee line.
     3. `calves_and_shins`: Vertical leg segment dropping at a 90-degree angle from knees behind the desk.
     4. `shoes_and_feet`: Flat sneakers resting firmly on the common baseline floor plane (`y = 880–920`).

---

### 6.2. 3D Perspective & Spatial Stacking Order (Z-Index Contract)
1. **15-Degree Oblique Desk Perspective**:
   - Never draw a desk surface as a 1D flat horizontal line.
   - Desks must be drawn as an oblique parallelogram/trapezoid showing both the top surface depth (for resting forearms, notebooks, and devices) and the vertical front panel.
2. **Strict DOM Layering Order (Back-to-Front)**:
   SVG elements are rendered sequentially. Layering order MUST strictly follow real-world physical occlusion:
   - `[TẦNG 1 - Bottom]`: Room Background, Windows, Wall Clock, Chalkboard
   - `[TẦNG 2 - Mid-Back]`: Chair Backrest, Floor Baseboard
   - `[TẦNG 3 - Seated Anatomy]`: Hips, Thighs, Calves, Shoes on Floor
   - `[TẦNG 4 - Body]`: Torso, Uniform/Hoodie Body
   - `[TẦNG 5 - Spatial Barrier]`: DESK TOP SURFACE, Desk Legs, Placed Props
   - `[TẦNG 6 - Foreground Limbs]`: Forearms resting on desk, Neck column
   - `[TẦNG 7 - Head & Expressions]`: Head Base, Hair, Eyes, Mouth Morph
   - `[TẦNG 8 - Hero Action & FX]`: Hero Raised Arm, Pointer Stick, Particles, Carat Gems
   *Failure Rule*: The desk surface MUST visually overlap and clip the student's waist. The torso must NEVER bleed over the front edge of the desk.
3. **No Optical Penetration / Furniture Clipping**:
   - Furniture placed behind a character (e.g., podiums, speaker boxes) must be declared earlier in the DOM than the character's legs.
   - Limbs must never appear transparent or cut through solid furniture.
4. **Cinematic Shot-Reverse-Shot Space Logic**:
   - In classroom scenes, students must face forward towards the teacher/podium.
   - Chalkboards must be on the teacher's side (front wall). The wall behind seated students must only feature rear classroom elements (windows, notice boards, lockers), NEVER the main lecture chalkboard.

---

### 6.3. Semantic Precision & Prop Metaphors
1. **Carats vs. Carrots (Token Metaphor)**:
   - "Carats" (캐럿) strictly refers to faceted gemstones/diamonds.
   - Any reward token, deposit stream, or wallet counter must use geometric, cyan/aqua faceted diamond vectors (`#00E5FF`, `#38BDF8`), NEVER agricultural carrots.
2. **Mathematical & Diagram Fidelity**:
   - Coordinate plots (e.g., CSAT exam curves) must anchor critical target points (maxima/minima) directly onto the curve stroke, never floating detached.
   - Wall clocks must have a legible circular dial with distinct hour and minute hands (preset at 10:10), not arbitrary "L" lines.
---
## 7. VISUAL ASSET RIGGING & QUALITY CONTROL (MANDATORY GATEKEEPERS)

### 7.1. Character Consistency Pipeline (Single Source of Truth)
- The vector DNA of the hero student is permanently locked in:
  `site-configs/crabit-korea/assets/character_master_model_sheet.svg`
- Any asset representing the student (e.g., `prop_icon_walking_student.svg`, `char_student_desk_morph.svg`, `scene3_classroom_peer_contrast.svg`) MUST strictly mirror this geometry:
  * Hair: Clean side-swept Korean bangs (#1E293B). STRICTLY NO hats, berets, or floating wigs.
  * Skin & Neck: Base tone #FFE3D1. MUST include a distinct neck column (height 20px–24px).
  * Hoodie: Royal Blue #2563EB with ribbed cuff/hem #1D4ED8.
  * Trousers & Shoes: Charcoal navy pants #334155, crisp white sneakers #FFFFFF with gray soles #94A3B8.
  * Backpack: Amber gold #F59E0B strapped snugly behind the back WITH a visible chest harness strap across the torso.

### 7.2. Autonomous Visual Feedback Loop (The "Mirror Test")
- Blind SVG coding is strictly prohibited. After creating or modifying any visual SVG asset:
  1. Render the SVG to a PNG file in the workspace:
     `npx -y @resvg/resvg-js <path-to-svg> out/audit_preview.png`
  2. Inspect the rendered image using your multimodal capability before marking the task complete.
  3. Verify zero mutated hands (no sharp claw thumbs), zero disjointed limbs, and accurate perspective. If defects remain, self-heal immediately.

### 7.3. Motion-Ready Hierarchical Bone Rigging
- For animated characters (e.g., walk cycles in `prop_icon_walking_student.svg`), never merge limbs into flat paths.
- Structure limbs into nested parent-child SVG groups with explicit `data-pivot="x y"` attributes:
  * `leg_thigh` (pivot: hip) -> contains `leg_shin` (pivot: knee) -> contains `leg_foot` (pivot: ankle).
  * `arm_shoulder` (pivot: shoulder) -> contains `arm_forearm` (pivot: elbow) -> contains `hand_fist`.

### 7.4. Storyboard Fidelity & Scene Requirements
All scene implementations must respect the core project narrative:
- Scene 1: Director observing an exhausted student at a Hagwon desk (modesty panel concealing floor).
- Scene 2: Director presenting the smartphone (suit sleeve/cuff, fleshy rounded thumb) showing the Crabit 50,000 Carats Card.
- Scene 3: Challenge & Epiphany via Shot-Reverse-Shot (Chalkboard math problem -> 3B student raising hand + 3/4 walking student).
- Scene 4: Crabit Card reward with active numeric balance updating (+50,000 KRW), Korean recharge badge ("충전 완료"), and inflowing energy particles.

---

## 8. ATOMIC COMPONENT STEWARDSHIP & METADATA AUTOMATION (AN'S PROTOCOL)

### 8.1. Mandatory Satellite Metadata (.meta.json)
Every reusable vector asset or React sub-component placed in `assets/` or `src/components/` MUST have a companion metadata file `<component_name>.meta.json`.
- Strict Schema Compliance: Must validate against `schemas/component.schema.json`.
- Immutability Rule: All components must be pure functions/isolated DOM elements. Never inject global side-effects or uncontained CSS styles.
- Mandatory Fields:
  * `id`: Unique snake_case string.
  * `category`: One of ['head', 'torso', 'limb', 'prop', 'fx', 'scene_rig'].
  * `viewBox`: Exact bounding dimensions (e.g., "0 0 400 400").
  * `pivots`: Exact rotation coordinates for joints (e.g., `{ "shoulder": { "x": 120, "y": 80 } }`).
  * `color_tokens_used`: Master color palette dependency tracking.

### 8.2. Automated Indexing & Manifest Generation
- Role Assignment: Worker Agent "An" (Antigravity) acts as the Master Asset Steward.
- Trigger Protocol: Whenever an asset is added, modified, or refactored:
  1. An must generate or update the corresponding `<name>.meta.json`.
  2. Execute the indexer script:
     `npx tsx scripts/generate-manifest.ts`
  3. Verify that `site-configs/crabit-korea/assets/library-manifest.json` is updated and committed alongside the assets.
- Pre-Assembly Query Gate:
  Before generating any new Scene, the AI worker MUST read `library-manifest.json` first. If a component (e.g., desk, clock, walking legs) already exists in the manifest, the worker MUST reuse it via `<use href="...">` or React import. RE-DRAWING EXISTING COMPONENTS IS STRICTLY FORBIDDEN.
