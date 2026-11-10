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
