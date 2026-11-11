import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { createSpring } from '../../core/physics/springs';

export interface CaratCrabMascotProps {
  /** Global scale multiplier */
  scale?: number;
  /** Horizontal position in parent container (pixels) */
  x?: number;
  /** Vertical position in parent container (pixels) */
  y?: number;
  /** Frame delay before entrance spring starts */
  delay?: number;
  /** Enable subtle breathing / idle hovering motion */
  idleHover?: boolean;
  /** Enable playful victory claw cheer sway */
  clawSway?: boolean;
  /** Custom inline style overrides */
  style?: React.CSSProperties;
}

/**
 * Master Diamond Carat Crab Mascot (Linh vật Cua Tinh Thể Kim Cương Carat).
 * 2D Faceted Crystal Gem Vector, Korean commercial anime style.
 * ViewBox: 0 0 400 350. Global Pivot: x=200, y=280 (floor contact anchor).
 */
export const CaratCrabMascot: React.FC<CaratCrabMascotProps> = ({
  scale = 1,
  x = 0,
  y = 0,
  delay = 0,
  idleHover = true,
  clawSway = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance pop spring with snappy preset
  const entrance = createSpring({
    frame,
    fps,
    preset: 'snappy',
    delay,
    from: 0,
    to: 1,
  });

  // Subtle breathing / idle floating motion
  const hoverY = idleHover
    ? interpolate(Math.sin((frame / fps) * Math.PI * 2), [-1, 1], [-4, 4])
    : 0;

  // Gentle claw cheer swing (opposing phase for left/right claws)
  const clawAngle = clawSway
    ? interpolate(Math.sin((frame / fps) * Math.PI * 1.6), [-1, 1], [-2.5, 2.5])
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${x}px, ${y + hoverY}px) scale(${scale * entrance})`,
        transformOrigin: '200px 280px',
        width: 400,
        height: 350,
        pointerEvents: 'none',
        ...style,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 350"
        width="100%"
        height="100%"
        data-pivot="200,280"
      >
        <defs>
          {/* Carat Diamond Refractive Gradients */}
          <linearGradient id="caratGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#E0F7FA" />
            <stop offset="45%" stop-color="#00E5FF" />
            <stop offset="100%" stop-color="#0077B6" />
          </linearGradient>

          {/* Outer Pincer Left */}
          <linearGradient id="pincerOuterLeftGrad" x1="80%" y1="90%" x2="20%" y2="5%">
            <stop offset="0%" stop-color="#0077B6" />
            <stop offset="30%" stop-color="#00B4D8" />
            <stop offset="70%" stop-color="#00E5FF" />
            <stop offset="100%" stop-color="#E0F7FA" />
          </linearGradient>

          {/* Inner Pincer Left */}
          <linearGradient id="pincerInnerLeftGrad" x1="90%" y1="90%" x2="10%" y2="10%">
            <stop offset="0%" stop-color="#0096C7" />
            <stop offset="40%" stop-color="#00E5FF" />
            <stop offset="100%" stop-color="#E0F7FA" />
          </linearGradient>

          {/* Outer Pincer Right */}
          <linearGradient id="pincerOuterRightGrad" x1="20%" y1="90%" x2="80%" y2="5%">
            <stop offset="0%" stop-color="#0077B6" />
            <stop offset="30%" stop-color="#00B4D8" />
            <stop offset="70%" stop-color="#00E5FF" />
            <stop offset="100%" stop-color="#E0F7FA" />
          </linearGradient>

          {/* Inner Pincer Right */}
          <linearGradient id="pincerInnerRightGrad" x1="10%" y1="90%" x2="90%" y2="10%">
            <stop offset="0%" stop-color="#0096C7" />
            <stop offset="40%" stop-color="#00E5FF" />
            <stop offset="100%" stop-color="#E0F7FA" />
          </linearGradient>

          {/* Spectacle Glass Ambient Light */}
          <linearGradient id="spectacleGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.55" />
            <stop offset="40%" stop-color="#E0F7FA" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#00E5FF" stop-opacity="0.12" />
          </linearGradient>
        </defs>

        {/* 1. LAYER BACK LEGS: 3 chan sau ben trai + 3 chan sau ben phai khuat bong */}
        <g id="layer-back-legs" stroke="#FFFFFF" strokeWidth="1.3" strokeOpacity="0.8" strokeLinejoin="round">
          {/* CHAN TRAI 1 */}
          <g id="back-leg-left-1">
            <polygon points="120,186 114,196 66,178 72,166" fill="#0077B6" />
            <polygon points="66,178 72,166 48,266 42,274" fill="#0096C7" />
          </g>
          {/* CHAN TRAI 2 */}
          <g id="back-leg-left-2">
            <polygon points="122,212 114,222 56,214 62,202" fill="#0077B6" />
            <polygon points="56,214 62,202 34,282 28,290" fill="#023E8A" />
          </g>
          {/* CHAN TRAI 3 */}
          <g id="back-leg-left-3">
            <polygon points="130,234 122,244 68,248 74,236" fill="#0077B6" />
            <polygon points="68,248 74,236 52,300 46,306" fill="#023E8A" />
          </g>

          {/* CHAN PHAI 1 */}
          <g id="back-leg-right-1">
            <polygon points="280,186 286,196 334,178 328,166" fill="#0077B6" />
            <polygon points="334,178 328,166 352,266 358,274" fill="#0096C7" />
          </g>
          {/* CHAN PHAI 2 */}
          <g id="back-leg-right-2">
            <polygon points="278,212 286,222 344,214 338,202" fill="#0077B6" />
            <polygon points="344,214 338,202 366,282 372,290" fill="#023E8A" />
          </g>
          {/* CHAN PHAI 3 */}
          <g id="back-leg-right-3">
            <polygon points="270,234 278,244 332,248 326,236" fill="#0077B6" />
            <polygon points="332,248 326,236 348,300 354,306" fill="#023E8A" />
          </g>
        </g>

        {/* 2. LAYER CRYSTAL BODY: Mai Cua Da Dien Kim Cuong + Canh Vat Trang */}
        <g id="layer-crystal-body" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.85" strokeLinejoin="round">
          {/* Dinh don sang (Top Facet Highlights) */}
          <polygon id="facet-crown-center" points="200,115 160,126 200,148 240,126" fill="#E0F7FA" />
          <polygon id="facet-crown-left" points="200,115 160,126 128,145 166,160" fill="#E0F7FA" />
          <polygon id="facet-crown-right" points="200,115 240,126 272,145 234,160" fill="#E0F7FA" />
          <polygon id="facet-crown-apex" points="200,115 166,160 200,148 234,160" fill="#E0F7FA" />

          {/* Mat cat than chinh (Body Facets - Cyan #00E5FF) */}
          <polygon id="facet-shoulder-left" points="128,145 96,180 142,195 166,160" fill="#00E5FF" />
          <polygon id="facet-shoulder-right" points="272,145 304,180 258,195 234,160" fill="#00E5FF" />

          {/* Trai tim kim cuong Carat trung tam nguc */}
          <polygon id="facet-carat-top" points="200,148 166,172 200,188 234,172" fill="#E0F7FA" />
          <polygon id="facet-carat-mid-left" points="166,172 200,188 178,214 154,196" fill="#00E5FF" />
          <polygon id="facet-carat-mid-right" points="234,172 200,188 222,214 246,196" fill="#00E5FF" />
          <polygon id="facet-carat-bottom" points="200,188 178,214 200,226 222,214" fill="#00E5FF" />

          {/* Cac mat vat chuyen tiep quanh vien kim cuong */}
          <polygon id="facet-trans-upper-left" points="166,160 200,148 166,172" fill="#00E5FF" />
          <polygon id="facet-trans-upper-right" points="234,160 200,148 234,172" fill="#00E5FF" />
          <polygon id="facet-trans-side-left" points="166,160 166,172 154,196 142,195" fill="#00E5FF" />
          <polygon id="facet-trans-side-right" points="234,160 234,172 246,196 258,195" fill="#00E5FF" />

          {/* Mat cat chieu sau (Deep Crystal Facets - #00B4D8) */}
          <polygon id="facet-flank-deep-left" points="96,180 116,224 162,230 142,195" fill="#00B4D8" />
          <polygon id="facet-flank-deep-right" points="304,180 284,224 238,230 258,195" fill="#00B4D8" />
          <polygon id="facet-lower-rib-left" points="142,195 154,196 178,214 200,226 162,230" fill="#00B4D8" />
          <polygon id="facet-lower-rib-right" points="258,195 246,196 222,214 200,226 238,230" fill="#00B4D8" />

          {/* Mat day va khop khuat (Base Shadow Facets - #0077B6 & #023E8A) */}
          <polygon id="facet-base-flank-left" points="116,224 146,256 176,244 162,230" fill="#0077B6" />
          <polygon id="facet-base-flank-right" points="284,224 254,256 224,244 238,230" fill="#0077B6" />
          <polygon id="facet-base-center-left" points="200,226 162,230 176,244 200,256" fill="#0077B6" />
          <polygon id="facet-base-center-right" points="200,226 238,230 224,244 200,256" fill="#0077B6" />
          <polygon id="facet-keel-left" points="176,244 146,256 200,270 200,256" fill="#023E8A" />
          <polygon id="facet-keel-right" points="224,244 254,256 200,270 200,256" fill="#023E8A" />
        </g>

        {/* 3. LAYER INTELLECT EYES: Cap Mat Thong Thai + Cap Kinh Tron Tri Tue */}
        <g id="layer-intellect-eyes">
          {/* Cuong mat tinh the */}
          <g id="eye-stalks" stroke="#FFFFFF" strokeWidth="1.2" strokeLinejoin="round">
            <polygon points="158,122 174,122 176,108 160,108" fill="#00B4D8" />
            <polygon points="226,122 242,122 240,108 224,108" fill="#00B4D8" />
          </g>

          {/* Nen trong kinh phan quang */}
          <circle cx="168" cy="98" r="24" fill="url(#spectacleGlass)" />
          <circle cx="232" cy="98" r="24" fill="url(#spectacleGlass)" />

          {/* Trong mat thong thai (Pupils - Than da sau tham #0F172A) */}
          <g id="pupils">
            {/* Mat trai */}
            <circle cx="168" cy="98" r="16" fill="#0F172A" />
            <path d="M 155 102 A 13 13 0 0 0 181 102 A 13 8.5 0 0 1 155 102" fill="#00E5FF" />
            <path d="M 159 104 A 9 9 0 0 0 177 104 A 9 5.5 0 0 1 159 104" fill="#E0F7FA" />
            <polygon points="164,88 167,93.5 173,95 167,96.5 164,102 161,96.5 155,95 161,93.5" fill="#FFFFFF" />
            <circle cx="173" cy="103" r="2.2" fill="#FFFFFF" />
            <circle cx="160" cy="102" r="1.2" fill="#FFFFFF" />

            {/* Mat phai */}
            <circle cx="232" cy="98" r="16" fill="#0F172A" />
            <path d="M 219 102 A 13 13 0 0 0 245 102 A 13 8.5 0 0 1 219 102" fill="#00E5FF" />
            <path d="M 223 104 A 9 9 0 0 0 241 104 A 9 5.5 0 0 1 223 104" fill="#E0F7FA" />
            <polygon points="228,88 231,93.5 237,95 231,96.5 228,102 225,96.5 219,95 225,93.5" fill="#FFFFFF" />
            <circle cx="237" cy="103" r="2.2" fill="#FFFFFF" />
            <circle cx="224" cy="102" r="1.2" fill="#FFFFFF" />
          </g>

          {/* Cap kinh tron tri tue (Spectacles) */}
          <g id="spectacles-contrast" fill="none" stroke="#0077B6" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.45">
            <circle cx="168" cy="98" r="24" />
            <circle cx="232" cy="98" r="24" />
            <path d="M 192 98 Q 200 92 208 98" />
          </g>
          <g id="spectacles-frame" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="168" cy="98" r="24" strokeWidth="3.6" />
            <circle cx="232" cy="98" r="24" strokeWidth="3.6" />
            <path d="M 192 98 Q 200 92 208 98" strokeWidth="3.8" />
            <path d="M 144 98 L 134 96" strokeWidth="2.8" />
            <path d="M 256 98 L 266 96" strokeWidth="2.8" />
            <path d="M 152 86 A 21 21 0 0 1 176 80" strokeWidth="2.4" opacity="0.95" />
            <path d="M 216 86 A 21 21 0 0 1 240 80" strokeWidth="2.4" opacity="0.95" />
          </g>

          {/* Mieng cuoi tinh the thong thai */}
          <path d="M 194 133 Q 200 138 206 133" fill="none" stroke="#0077B6" strokeWidth="2.2" strokeLinecap="round" />
        </g>

        {/* 4. LAYER CRYSTAL CLAWS: 2 Cang Pha Le Vuon Cong Hinh Vong Cung */}
        <g id="layer-crystal-claws" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.85" strokeLinejoin="round">
          {/* CANG TRAI */}
          <g id="claw-left" style={{ transformOrigin: '128px 145px', transform: `rotate(${-clawAngle}deg)` }}>
            <polygon points="128,145 114,164 94,148 106,132" fill="#0077B6" />
            <polygon points="106,132 94,148 72,130 84,112" fill="#00B4D8" />
            <polygon points="84,112 72,130 54,106 70,92" fill="#00E5FF" />
            <polygon points="70,92 54,106 38,78 62,68" fill="#00E5FF" />
            <polygon points="70,92 62,68 86,60 98,82" fill="#00B4D8" />
            <polygon points="70,92 98,82 84,112" fill="#0077B6" />
            {/* 2 Gong kep */}
            <polygon points="38,78 62,68 54,42" fill="#00E5FF" />
            <polygon points="54,42 62,68 62,18 48,16" fill="url(#pincerOuterLeftGrad)" />
            <polygon points="54,42 48,16 34,42 38,78" fill="#00B4D8" />
            <polygon points="62,68 86,60 84,40" fill="#00E5FF" />
            <polygon points="62,68 84,40 82,24" fill="url(#pincerInnerLeftGrad)" />
            <polygon points="86,60 84,40 98,54" fill="#0077B6" />
          </g>

          {/* CANG PHAI */}
          <g id="claw-right" style={{ transformOrigin: '272px 145px', transform: `rotate(${clawAngle}deg)` }}>
            <polygon points="272,145 286,164 306,148 294,132" fill="#0077B6" />
            <polygon points="294,132 306,148 328,130 316,112" fill="#00B4D8" />
            <polygon points="316,112 328,130 346,106 330,92" fill="#00E5FF" />
            <polygon points="330,92 346,106 362,78 338,68" fill="#00E5FF" />
            <polygon points="330,92 338,68 314,60 302,82" fill="#00B4D8" />
            <polygon points="330,92 302,82 316,112" fill="#0077B6" />
            {/* 2 Gong kep */}
            <polygon points="362,78 338,68 346,42" fill="#00E5FF" />
            <polygon points="346,42 338,68 338,18 352,16" fill="url(#pincerOuterRightGrad)" />
            <polygon points="346,42 352,16 366,42 362,78" fill="#00B4D8" />
            <polygon points="338,68 314,60 316,40" fill="#00E5FF" />
            <polygon points="338,68 316,40 318,24" fill="url(#pincerInnerRightGrad)" />
            <polygon points="314,60 316,40 302,54" fill="#0077B6" />
          </g>
        </g>

        {/* 5. LAYER FRONT LEGS: 3 chan truoc ben trai + 3 chan truoc ben phai tiep dat */}
        <g id="layer-front-legs" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.85" strokeLinejoin="round">
          {/* CHAN TRUOC TRAI 1 */}
          <g id="front-leg-left-1">
            <polygon points="120,186 116,174 68,158 72,166" fill="#00E5FF" />
            <polygon points="68,158 62,166 66,178 72,166" fill="#E0F7FA" />
            <polygon points="68,158 62,166 42,274 48,266" fill="#00E5FF" />
            <polygon points="48,266 42,274 45,276 51,269" fill="#E0F7FA" />
          </g>
          {/* CHAN TRUOC TRAI 2 */}
          <g id="front-leg-left-2">
            <polygon points="122,212 118,200 58,194 62,202" fill="#00E5FF" />
            <polygon points="58,194 52,202 56,214 62,202" fill="#E0F7FA" />
            <polygon points="58,194 52,202 28,290 34,282" fill="#00E5FF" />
            <polygon points="34,282 28,290 31,292 37,285" fill="#E0F7FA" />
          </g>
          {/* CHAN TRUOC TRAI 3 */}
          <g id="front-leg-left-3">
            <polygon points="130,234 126,222 70,228 74,236" fill="#00E5FF" />
            <polygon points="70,228 64,236 68,248 74,236" fill="#E0F7FA" />
            <polygon points="70,228 64,236 46,306 52,298" fill="#00E5FF" />
            <polygon points="52,298 46,306 49,308 55,301" fill="#E0F7FA" />
          </g>

          {/* CHAN TRUOC PHAI 1 */}
          <g id="front-leg-right-1">
            <polygon points="280,186 284,174 332,158 328,166" fill="#00E5FF" />
            <polygon points="332,158 338,166 334,178 328,166" fill="#E0F7FA" />
            <polygon points="332,158 338,166 358,274 352,266" fill="#00E5FF" />
            <polygon points="352,266 358,274 355,276 349,269" fill="#E0F7FA" />
          </g>
          {/* CHAN TRUOC PHAI 2 */}
          <g id="front-leg-right-2">
            <polygon points="278,212 282,200 342,194 338,202" fill="#00E5FF" />
            <polygon points="342,194 348,202 344,214 338,202" fill="#E0F7FA" />
            <polygon points="342,194 348,202 372,290 366,282" fill="#00E5FF" />
            <polygon points="366,282 372,290 369,292 363,285" fill="#E0F7FA" />
          </g>
          {/* CHAN TRUOC PHAI 3 */}
          <g id="front-leg-right-3">
            <polygon points="270,234 274,222 330,228 326,236" fill="#00E5FF" />
            <polygon points="330,228 336,236 332,248 326,236" fill="#E0F7FA" />
            <polygon points="330,228 336,236 354,306 348,298" fill="#00E5FF" />
            <polygon points="348,298 354,306 351,308 345,301" fill="#E0F7FA" />
          </g>
        </g>
      </svg>
    </div>
  );
};
