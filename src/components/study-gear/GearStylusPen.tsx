import React from 'react';

export interface GearProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GearStylusPen: React.FC<GearProps> = ({
  size = 200,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 16px 28px rgba(2, 132, 199, 0.25))',
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Stylus Barrel Gradient: Royal Sky Blue (#0284C7) to Deep Obsidian (#0F172A) */}
          <linearGradient id="stylusBodyGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="25%" stopColor="#0284C7" />
            <stop offset="65%" stopColor="#0369A1" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>

          {/* Upper Body Specular Top Ridge Gradient */}
          <linearGradient id="stylusFacetLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="35%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>

          {/* Lower Body Deep Shadow Gradient */}
          <linearGradient id="stylusFacetDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0369A1" />
            <stop offset="40%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Precision Chrome Silver Gradient: #F1F5F9 to #CBD5E1 */}
          <linearGradient id="metallicSilver" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="28%" stopColor="#F1F5F9" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Chrome Clip Bevel Highlight */}
          <linearGradient id="metallicClipHighlight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Active Capacitive Tip Glow: Pure White core to Electric Cyan */}
          <radialGradient id="stylusTipGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="25%" stopColor="#00E5FF" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#00E5FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
          </radialGradient>

          {/* Conical Nib Ceramic Shading */}
          <linearGradient id="stylusNibGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="35%" stopColor="#0284C7" />
            <stop offset="80%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Metallic Accent Band Spacer Groove */}
          <linearGradient id="metallicGroove" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#090D16" />
          </linearGradient>
        </defs>

        {/* ================================================================= */}
        {/* BACK-TO-FRONT SVG COMPONENT HIERARCHY                              */}
        {/* ================================================================= */}

        {/* 1. Tapered Faceted Stylus Body along the 45-degree diagonal axis */}
        <g id="stylus-body">
          {/* Upper Body: Upper Light Facet */}
          <polygon
            points="142.78,46.61 85.50,103.89 89.04,107.42 146.32,50.15"
            fill="url(#stylusFacetLight)"
          />

          {/* Upper Body: Center Facet (Main #stylusBodyGradient) */}
          <polygon
            points="146.32,50.15 89.04,107.42 92.58,110.96 149.85,53.68"
            fill="url(#stylusBodyGradient)"
          />

          {/* Upper Body: Lower Shadow Facet */}
          <polygon
            points="149.85,53.68 92.58,110.96 96.11,114.50 153.39,57.22"
            fill="url(#stylusFacetDark)"
          />

          {/* Specular Longitudinal Reflection Lines */}
          <line
            x1="142.78"
            y1="46.61"
            x2="85.50"
            y2="103.89"
            stroke="#FFFFFF"
            strokeWidth="0.75"
            strokeOpacity="0.8"
            strokeLinecap="round"
          />
          <line
            x1="146.32"
            y1="50.15"
            x2="89.04"
            y2="107.42"
            stroke="#38BDF8"
            strokeWidth="0.5"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />

          {/* Smart Capacitive Status LED Pill on Center Facet */}
          <line
            x1="124.45"
            y1="72.02"
            x2="119.50"
            y2="76.97"
            stroke="#00E5FF"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="121.98" cy="74.50" r="2.8" fill="#00E5FF" fillOpacity="0.25" />

          {/* Tail Section: Metallic Ring */}
          <polygon
            points="142.57,46.40 146.10,42.87 157.13,53.90 153.60,57.43"
            fill="url(#metallicSilver)"
            stroke="#CBD5E1"
            strokeWidth="0.4"
          />

          {/* Tail Cap Body: Upper, Center, Lower Facets */}
          <polygon
            points="146.67,43.43 154.80,36.01 157.84,39.05 149.99,46.75"
            fill="url(#stylusFacetLight)"
          />
          <polygon
            points="149.99,46.75 157.84,39.05 160.95,42.16 153.25,50.01"
            fill="url(#stylusBodyGradient)"
          />
          <polygon
            points="153.25,50.01 160.95,42.16 163.99,45.20 156.57,53.33"
            fill="url(#stylusFacetDark)"
          />

          {/* Tail Cap Eraser Dome */}
          <path
            d="M 154.80,36.01 Q 163.29,36.71 163.99,45.20 L 160.95,42.16 Q 160.25,38.35 157.84,39.05 Z"
            fill="#0F172A"
          />
          <path
            d="M 154.80,36.01 Q 163.29,36.71 163.99,45.20"
            stroke="#CBD5E1"
            strokeWidth="0.6"
            fill="none"
          />

          {/* Grip Section: Ergonomic Tapered Barrel */}
          <polygon
            points="79.14,110.25 51.92,139.60 54.75,142.43 82.68,113.79"
            fill="url(#stylusFacetLight)"
          />
          <polygon
            points="82.68,113.79 54.75,142.43 57.57,145.25 86.21,117.32"
            fill="url(#stylusBodyGradient)"
          />
          <polygon
            points="86.21,117.32 57.57,145.25 60.40,148.08 89.75,120.86"
            fill="url(#stylusFacetDark)"
          />

          {/* Grip Section: Laser-Etched Micro Grip Rings */}
          <line
            x1="74.19"
            y1="115.20"
            x2="81.26"
            y2="122.27"
            stroke="#0284C7"
            strokeWidth="0.6"
            strokeOpacity="0.7"
          />
          <line
            x1="69.95"
            y1="119.44"
            x2="77.02"
            y2="126.51"
            stroke="#0284C7"
            strokeWidth="0.6"
            strokeOpacity="0.7"
          />
          <line
            x1="65.71"
            y1="123.68"
            x2="72.78"
            y2="130.75"
            stroke="#0284C7"
            strokeWidth="0.6"
            strokeOpacity="0.7"
          />
          <line
            x1="61.47"
            y1="127.92"
            x2="68.54"
            y2="134.99"
            stroke="#0284C7"
            strokeWidth="0.6"
            strokeOpacity="0.7"
          />
          <line
            x1="57.23"
            y1="132.16"
            x2="64.30"
            y2="139.23"
            stroke="#0284C7"
            strokeWidth="0.6"
            strokeOpacity="0.7"
          />
        </g>

        {/* 2. Segmented Chrome Accent Rings separating grip and upper body */}
        <g id="stylus-metallic-bands">
          {/* Accent Ring 1 (Upper Ring) */}
          <polygon
            points="85.29,103.68 82.82,106.15 93.85,117.18 96.32,114.71"
            fill="url(#metallicSilver)"
            stroke="#F1F5F9"
            strokeWidth="0.4"
          />
          <line
            x1="84.90"
            y1="104.10"
            x2="95.90"
            y2="115.10"
            stroke="#FFFFFF"
            strokeWidth="0.75"
            strokeLinecap="round"
          />

          {/* Dark Isolation Spacer Groove */}
          <polygon
            points="83.17,106.51 82.11,107.57 92.43,117.89 93.49,116.83"
            fill="url(#metallicGroove)"
          />

          {/* Accent Ring 2 (Lower Ring) */}
          <polygon
            points="81.76,107.21 79.28,109.69 90.31,120.72 92.79,118.24"
            fill="url(#metallicSilver)"
            stroke="#F1F5F9"
            strokeWidth="0.4"
          />
          <line
            x1="81.35"
            y1="107.65"
            x2="92.35"
            y2="118.65"
            stroke="#FFFFFF"
            strokeWidth="0.75"
            strokeLinecap="round"
          />
        </g>

        {/* 3. Precision Chamfered Metallic Pen Clip along the upper edge */}
        <g id="stylus-clip">
          {/* Soft Occlusion Shadow cast onto the stylus body */}
          <polygon
            points="139.24,50.15 109.55,79.85 110.61,80.91 140.31,51.21"
            fill="rgba(15, 23, 42, 0.4)"
          />

          {/* Clip Base Anchor Block */}
          <polygon
            points="141.37,48.03 137.83,47.32 135.71,49.44 139.24,50.15"
            fill="url(#metallicSilver)"
            stroke="#CBD5E1"
            strokeWidth="0.3"
          />

          {/* Main Clip Arm Body */}
          <polygon
            points="137.83,47.32 108.84,76.31 110.61,78.08 139.60,49.09"
            fill="url(#metallicSilver)"
            stroke="#CBD5E1"
            strokeWidth="0.4"
          />

          {/* Chamfered Upper Edge Specular Glint */}
          <line
            x1="137.83"
            y1="47.32"
            x2="108.84"
            y2="76.31"
            stroke="#FFFFFF"
            strokeWidth="1.1"
            strokeLinecap="round"
          />

          {/* Secondary Bevel Highlight on Inner Face */}
          <line
            x1="138.47"
            y1="47.96"
            x2="109.48"
            y2="76.95"
            stroke="url(#metallicClipHighlight)"
            strokeWidth="0.6"
          />

          {/* Precision Finial Contact Head */}
          <polygon
            points="108.84,76.31 107.64,79.35 109.33,79.64 110.61,78.08"
            fill="#F1F5F9"
            stroke="#E2E8F0"
            strokeWidth="0.4"
          />
          <circle cx="108.5" cy="78.2" r="0.75" fill="#FFFFFF" />
        </g>

        {/* 4. Tapered Conical Nib with Active Illuminated Capacitive Tip */}
        <g id="stylus-nib">
          {/* Metallic Nib Collar Ring */}
          <polygon
            points="51.92,139.60 49.09,143.84 56.16,150.91 60.40,148.08"
            fill="url(#metallicSilver)"
            stroke="#F1F5F9"
            strokeWidth="0.4"
          />
          <line
            x1="51.92"
            y1="139.60"
            x2="60.40"
            y2="148.08"
            stroke="#FFFFFF"
            strokeWidth="0.6"
            strokeLinecap="round"
          />

          {/* Conical Nib: Faceted Tapered Ceramic Cone */}
          <polygon
            points="49.09,143.84 36.93,161.38 37.49,161.94 51.49,146.24"
            fill="url(#stylusFacetLight)"
          />
          <polygon
            points="51.49,146.24 37.49,161.94 38.06,162.51 53.76,148.51"
            fill="url(#stylusNibGradient)"
          />
          <polygon
            points="53.76,148.51 38.06,162.51 38.62,163.07 56.16,150.91"
            fill="url(#stylusFacetDark)"
          />

          {/* Nib Ridge Reflection */}
          <line
            x1="52.62"
            y1="147.38"
            x2="37.77"
            y2="162.22"
            stroke="#38BDF8"
            strokeWidth="0.45"
            strokeOpacity="0.7"
          />

          {/* Active Illuminated Capacitive Tip: Ambient Neon Aura */}
          <circle
            cx="36.36"
            cy="163.64"
            r="16"
            fill="url(#stylusTipGlow)"
          />

          {/* Concentrated Electric Cyan Plasma Halo */}
          <circle
            cx="36.36"
            cy="163.64"
            r="7.5"
            fill="#00E5FF"
            fillOpacity="0.35"
          />

          {/* Capacitive Tip Node */}
          <circle
            cx="36.36"
            cy="163.64"
            r="3.2"
            fill="#00E5FF"
          />

          {/* Specular White Core */}
          <circle
            cx="36.36"
            cy="163.64"
            r="1.4"
            fill="#FFFFFF"
          />

          {/* Subtle Optical Star Glint */}
          <line
            x1="32.8"
            y1="167.2"
            x2="39.9"
            y2="160.1"
            stroke="#FFFFFF"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeOpacity="0.85"
          />
          <line
            x1="33.8"
            y1="161.1"
            x2="38.9"
            y2="166.2"
            stroke="#00E5FF"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
        </g>
      </svg>
    </div>
  );
};
