import React from 'react';

export interface GearProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const GearCompassGeometry: React.FC<GearProps> = ({
  size = 200,
  className,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        filter: 'drop-shadow(0 16px 28px rgba(2, 132, 199, 0.25))',
        ...style,
      }}
    >
      <defs>
        {/* Core Chrome Gradients */}
        <linearGradient id="chromeSilver" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#E2E8F0" />
          <stop offset="75%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>

        <linearGradient id="chromeDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        <linearGradient id="chromeLight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Electric Cyan Accent Gradient */}
        <linearGradient id="cyanAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="35%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Radial Bevel for Hinge Socket */}
        <radialGradient id="hingeBevel" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#E2E8F0" />
          <stop offset="80%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </radialGradient>

        {/* Needle Steel Gradient */}
        <linearGradient id="needleSteel" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Graphite Lead Gradient */}
        <linearGradient id="graphiteLead" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="40%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {/* 1. Compass Hinge Head (Top Pivot Knob & Circular Hinge Socket) */}
      <g id="compass-hinge-head">
        {/* Top Cylindrical Pivot Handle Knob */}
        <ellipse cx="100" cy="11.5" rx="3.5" ry="1.2" fill="#FFFFFF" opacity="0.9" />
        <rect
          x="96.5"
          y="12"
          width="7"
          height="14"
          rx="1"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.6"
        />
        {/* Knurled Handle Grip Ribs */}
        <line x1="96.5" y1="14.5" x2="103.5" y2="14.5" stroke="#64748B" strokeWidth="0.5" opacity="0.8" />
        <line x1="96.5" y1="17" x2="103.5" y2="17" stroke="#64748B" strokeWidth="0.5" opacity="0.8" />
        <line x1="96.5" y1="19.5" x2="103.5" y2="19.5" stroke="#64748B" strokeWidth="0.5" opacity="0.8" />
        <line x1="96.5" y1="22" x2="103.5" y2="22" stroke="#64748B" strokeWidth="0.5" opacity="0.8" />

        {/* Pivot Knob Neck Connection */}
        <rect x="98.2" y="26" width="3.6" height="4" fill="url(#chromeDark)" />

        {/* Circular Hinge Socket & Bracket */}
        <path
          d="M93 29 Q100 27 107 29 L109 37 Q100 34 91 37 Z"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.6"
        />
        {/* Main Hinge Bevel Disc */}
        <circle cx="100" cy="40" r="12" fill="url(#hingeBevel)" stroke="#94A3B8" strokeWidth="0.8" />
        <circle cx="100" cy="40" r="10" fill="none" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.8" />
        {/* Recessed Inner Socket Ring */}
        <circle cx="100" cy="40" r="7.5" fill="url(#chromeDark)" stroke="#64748B" strokeWidth="0.5" />
        {/* Center Pivot Rivet Pin */}
        <circle cx="100" cy="40" r="4.5" fill="url(#chromeSilver)" stroke="#94A3B8" strokeWidth="0.6" />
        <circle cx="100" cy="40" r="2" fill="#334155" />
        <line x1="98.8" y1="39.2" x2="101.2" y2="40.8" stroke="#FFFFFF" strokeWidth="0.5" strokeLinecap="round" />
      </g>

      {/* 2. Compass Thumb Wheel (Horizontal Spindle & Knurled Adjustment Wheel) */}
      <g id="compass-thumb-wheel">
        {/* Horizontal Threaded Adjustment Spindle */}
        <rect
          x="71"
          y="99.5"
          width="58"
          height="3"
          rx="0.8"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.5"
        />
        {/* Threaded Spindle Micro-Grooves */}
        <line x1="74" y1="99.5" x2="74" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="77" y1="99.5" x2="77" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="80" y1="99.5" x2="80" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="83" y1="99.5" x2="83" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="86" y1="99.5" x2="86" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="89" y1="99.5" x2="89" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="111" y1="99.5" x2="111" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="114" y1="99.5" x2="114" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="117" y1="99.5" x2="117" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="120" y1="99.5" x2="120" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="123" y1="99.5" x2="123" y2="102.5" stroke="#64748B" strokeWidth="0.4" />
        <line x1="126" y1="99.5" x2="126" y2="102.5" stroke="#64748B" strokeWidth="0.4" />

        {/* Spindle End Nuts */}
        <rect x="69.5" y="99" width="2" height="4" rx="0.5" fill="url(#chromeDark)" />
        <rect x="128.5" y="99" width="2" height="4" rx="0.5" fill="url(#chromeDark)" />

        {/* Knurled Central Thumbwheel */}
        <rect
          x="91.5"
          y="92"
          width="17"
          height="18"
          rx="2"
          fill="#F1F5F9"
          stroke="#94A3B8"
          strokeWidth="0.8"
        />
        {/* Thumbwheel Electric Cyan Central Rim Indicator */}
        <rect x="90.5" y="99.2" width="19" height="3.6" rx="0.8" fill="url(#cyanAccent)" opacity="0.9" />

        {/* Knurling Vertical Grooves (#94A3B8) */}
        <line x1="93.5" y1="92" x2="93.5" y2="110" stroke="#94A3B8" strokeWidth="0.75" />
        <line x1="96" y1="92" x2="96" y2="110" stroke="#94A3B8" strokeWidth="0.75" />
        <line x1="98.5" y1="92" x2="98.5" y2="110" stroke="#94A3B8" strokeWidth="0.75" />
        <line x1="101.5" y1="92" x2="101.5" y2="110" stroke="#94A3B8" strokeWidth="0.75" />
        <line x1="104" y1="92" x2="104" y2="110" stroke="#94A3B8" strokeWidth="0.75" />
        <line x1="106.5" y1="92" x2="106.5" y2="110" stroke="#94A3B8" strokeWidth="0.75" />

        {/* Wheel Edge Highlights */}
        <line x1="92" y1="92.5" x2="108" y2="92.5" stroke="#FFFFFF" strokeWidth="0.75" />
        <line x1="92" y1="109.5" x2="108" y2="109.5" stroke="#64748B" strokeWidth="0.75" />
      </g>

      {/* 3. Compass Leg Left (Needle Leg Tapering to Ultra-Sharp Steel Divider Point) */}
      <g id="compass-leg-left" transform="rotate(-19 100 40)">
        {/* Upper Arm 3D Chamfered Side (Micro-3D Depth Extrusion) */}
        <polygon points="97,42 94.8,44 94.8,133 97,133" fill="url(#chromeDark)" />

        {/* Main Upper Arm Front Face */}
        <rect
          x="97"
          y="42"
          width="6"
          height="91"
          rx="0.5"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.6"
        />

        {/* Specular Front Edge Line */}
        <line x1="97.5" y1="43" x2="97.5" y2="132" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.9" />

        {/* Spindle Pass-Through Collar at Y=104.5 */}
        <rect
          x="94.5"
          y="101"
          width="10"
          height="7"
          rx="1.2"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.6"
        />
        <circle cx="100" cy="104.5" r="1.8" fill="#475569" />

        {/* Knee Joint / Lower Articulation Clamp */}
        <rect
          x="95.5"
          y="133"
          width="9"
          height="9"
          rx="1.2"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.6"
        />
        {/* Knee Lock Thumbscrew */}
        <rect x="92" y="135.5" width="3.5" height="4" rx="0.6" fill="url(#chromeDark)" stroke="#64748B" strokeWidth="0.4" />

        {/* Needle Chuck / Collet */}
        <polygon
          points="97.5,142 102.5,142 101.3,154 98.7,154"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.5"
        />
        {/* Chuck Grip Rings */}
        <line x1="98" y1="145" x2="102" y2="145" stroke="#64748B" strokeWidth="0.4" />
        <line x1="98.3" y1="148" x2="101.7" y2="148" stroke="#64748B" strokeWidth="0.4" />
        <line x1="98.6" y1="151" x2="101.4" y2="151" stroke="#64748B" strokeWidth="0.4" />

        {/* Ultra-Sharp Chrome-Plated Steel Divider Needle */}
        <polygon
          points="98.8,154 101.2,154 100.1,188 99.9,188"
          fill="url(#needleSteel)"
          stroke="#94A3B8"
          strokeWidth="0.3"
        />
        {/* Needle Point Specular Ridge */}
        <line x1="100" y1="154" x2="100" y2="187.5" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.95" />
      </g>

      {/* 4. Compass Leg Right (Technical Drafting Lead Leg with Electric Cyan Sleeve) */}
      <g id="compass-leg-right" transform="rotate(19 100 40)">
        {/* Upper Arm 3D Chamfered Side (Micro-3D Depth Extrusion) */}
        <polygon points="103,42 105.2,44 105.2,133 103,133" fill="url(#chromeDark)" />

        {/* Main Upper Arm Front Face */}
        <rect
          x="97"
          y="42"
          width="6"
          height="91"
          rx="0.5"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.6"
        />

        {/* Specular Front Edge Line */}
        <line x1="102.5" y1="43" x2="102.5" y2="132" stroke="#FFFFFF" strokeWidth="0.7" opacity="0.9" />

        {/* Spindle Pass-Through Collar at Y=104.5 */}
        <rect
          x="94.5"
          y="101"
          width="10"
          height="7"
          rx="1.2"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.6"
        />
        <circle cx="100" cy="104.5" r="1.8" fill="#475569" />

        {/* Knee Joint / Lower Articulation Clamp */}
        <rect
          x="95.5"
          y="133"
          width="9"
          height="9"
          rx="1.2"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.6"
        />
        {/* Knee Lock Thumbscrew */}
        <rect x="104.5" y="135.5" width="3.5" height="4" rx="0.6" fill="url(#chromeDark)" stroke="#64748B" strokeWidth="0.4" />

        {/* Electric Cyan Technical Drafting Lead Barrel Sleeve */}
        <rect
          x="96.5"
          y="142"
          width="7"
          height="25"
          rx="1.2"
          fill="url(#cyanAccent)"
          stroke="#0284C7"
          strokeWidth="0.6"
        />
        {/* Barrel Specular Sheen */}
        <line x1="97.8" y1="143" x2="97.8" y2="166" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.8" />

        {/* Laser-Engraved Metric Drafting Increments */}
        <line x1="97.5" y1="147" x2="102.5" y2="147" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.7" />
        <line x1="97.5" y1="151" x2="100.5" y2="151" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" />
        <line x1="97.5" y1="155" x2="102.5" y2="155" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.7" />
        <line x1="97.5" y1="159" x2="100.5" y2="159" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" />
        <line x1="97.5" y1="163" x2="102.5" y2="163" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.7" />

        {/* Metal Lead Collet Chuck */}
        <polygon
          points="97.2,167 102.8,167 101.5,173 98.5,173"
          fill="url(#chromeSilver)"
          stroke="#94A3B8"
          strokeWidth="0.4"
        />

        {/* Graphite / Drafting Lead Core */}
        <polygon
          points="98.8,173 101.2,173 100.3,188 99.7,188"
          fill="url(#graphiteLead)"
          stroke="#1E293B"
          strokeWidth="0.3"
        />
        {/* Chiseled Lead Core Bevel Highlight */}
        <polygon points="99.7,173 101.2,173 100.3,188" fill="#475569" opacity="0.6" />
      </g>

      {/* 5. Compass Highlights (Sharp Diagonal Specular Lines & Glints) */}
      <g id="compass-highlights">
        {/* Diagonal Specular Sheen Across Circular Hinge Disc */}
        <line
          x1="93"
          y1="33"
          x2="107"
          y2="47"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />
        <line
          x1="96"
          y1="32"
          x2="104"
          y2="40"
          stroke="#FFFFFF"
          strokeWidth="0.6"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Thumbwheel Specular Rim Glints */}
        <line
          x1="92"
          y1="92.5"
          x2="108"
          y2="92.5"
          stroke="#FFFFFF"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Ultra-Sharp Divider Needle Tip Micro-Flare Star (At World Coordinates 51.8, 180) */}
        <path
          d="M51.8 175 L52.8 180 L57.8 180 L52.8 180 L51.8 185 L50.8 180 L45.8 180 L50.8 180 Z"
          fill="#00E5FF"
          opacity="0.85"
        />
        <circle cx="51.8" cy="180" r="1.2" fill="#FFFFFF" />

        {/* Lead Leg Drafting Tip Glint (At World Coordinates 148.2, 180) */}
        <circle cx="148.2" cy="180" r="1" fill="#38BDF8" opacity="0.75" />

        {/* Cyan Barrel Specular Sheen Reflection (World Coordinates ~137, 154) */}
        <line
          x1="140"
          y1="148"
          x2="135"
          y2="162"
          stroke="#00E5FF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="139"
          y1="149"
          x2="136"
          y2="161"
          stroke="#FFFFFF"
          strokeWidth="0.6"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>
    </svg>
  );
};
