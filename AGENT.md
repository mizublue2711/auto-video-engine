# 🤖 AGENT.md - CORE OPERATIONAL DIRECTIVES & QUALITY GATES
**Project:** Auto Video Engine (Google Flow + Remotion + Three.js)  
**Agent Role:** Execution Engine & Precision Code Assembler  
**Status:** MANDATORY ENFORCEMENT ON ALL TASKS

---

## ⛔ 1. THE NON-NEGOTIABLE 3D INVIOLABILITY RULES (RÀO CHẮN 3D BẤT KHẢ XÂM PHẠM)

When refactoring, optimizing, or fixing bugs in 3D props (e.g., `CrabitSmartphone3D.tsx`, `CrabitCard3D.tsx`):

### 🚫 STRICT PROHIBITIONS (CẤM TUYỆT ĐỐI)
1. **NEVER STRIP HARDWARE DETAILING (CẤM RÚT RUỘT LINH KIỆN):**
   - You are **STRICTLY FORBIDDEN** from simplifying a detailed multi-layer 3D assembly into a bare single `BoxGeometry` or a flat 2D sheet.
   - Physical hardware features (Side Power/Volume buttons, Rear Camera Bump, Precision Lens rings, Chamfered wireframes, Bevels, Dynamic Island) are **PERMANENT ARCHITECTURAL ASSETS**.
   - If a layout or clipping issue occurs, **ONLY adjust the outer Canvas/Camera or Group `scale` / `position` / `rotation`**. NEVER delete the sub-meshes!

2. **NEVER ELIMINATE ISOMETRIC BASE PITCH (CHỐNG SẬP 2D DEPTH COLLAPSE):**
   - In 3D isometric commercial scenes, the downward pitch (`rotXBase` or `rotateXDeg`) must **NEVER be 0 or lower than 0.30 rad (~17°)**.
   - Eliminating the pitch angle collapses 3D geometry into a flat 2D line or plane when rotated on the Y-axis.

3. **NEVER TRANSLATE MESH X/Y FREELY INSIDE THREE.JS (CHỐNG VĂNG KHUNG HÌNH):**
   - The primary 3D mesh must be centered at origin `[0, floatY, 0]`.
   - Do NOT apply large translation offsets (e.g. `anchorX: -0.4`) inside the 3D perspective camera. If the prop needs to be on the left 1/3 of the screen, position the outer Canvas container via CSS layout!

4. **100% MANDATORY CLAMPING ON REMOTION INTERPOLATIONS:**
   - Every `interpolate()` call driving rotation, position, or scale MUST include:
     `{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }`
   - Unclamped interpolations cause infinite visual drift beyond frame boundaries.

---

## 📐 2. 3D CAMERA & FRUSTUM MATHEMATICAL PROTOCOL

Before modifying 3D scene parameters, calculate the vertical frustum to prevent clipping top/bottom edges:
$$\text{Frustum Height at } Z=0: \quad H_{\text{frustum}} = 2 \times \text{cameraZ} \times \tan\left(\frac{\text{cameraFOV} \times \pi}{360}\right)$$

- If total mesh height $\times \cos(\text{pitch}) > H_{\text{frustum}}$, you **MUST scale down the mesh group** (`scale={0.62}`) rather than pushing the camera into infinity.
- Maintain a **safe margin of at least 80px** from the top and bottom of the 1080p frame.

---

## 📜 3. CONTRACT-FIRST ARCHITECTURE (ZOD SCHEMAS)

1. **Schema Authority:** All component and scene props must be governed by contracts defined in `src/schemas/` (e.g., `ComponentSchema.ts`).
2. **Strict Range Enforcement:**
   - When consuming props, always parse via `.parse(props || {})` with safe fallback defaults.
   - Props must enforce physical bounds: `rotXBase: z.number().min(0.30).max(0.45)`, `scale: z.number().min(0.5).max(0.7)`.

---

## 🚦 4. TWO-TIER VERIFICATION GATE (FAIL-FAST AUDIT)

A task is **NOT COMPLETE** just because `tsc --noEmit` exited with code 0! You must execute the following two verification steps before reporting completion:

### Tier 1: Static Typecheck
```bash
npx tsc --noEmit
(Must exit with 0 errors).
Tier 2: Visual Boundary & Frame Still Render
Render target still frames at critical inflection frames (start, peak rotation, and end):
npx remotion still src/index.ts CrabitMasterCommercial --frame=275 /tmp/audit_frame.png
Mandatory Visual Self-Check:
[ ] Is the 3D object fully visible inside the frame (zero top/bottom clipping)?
[ ] Are physical hardware features (buttons, camera bump, chamfered edges) clearly visible?
[ ] Is 3D depth preserved with distinct lighting highlights on metallic chamfers?

📁 5. DIRECTORY STRUCTURE RULES
Schemas: src/schemas/
Sub-components / Props: src/components/props/
FX Particles: src/components/fx/
Master Scenes: src/scenes/
Flow Plates / Video Assets: public/flow_plates/ready/*.mp4
