import React, { useId } from 'react';

export interface GearProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export type GearMagnifyingGlassProps = GearProps;

/**
 * 🔍 GearMagnifyingGlass (Kính Lúp Kính Mờ Soi Bài 30°)
 * High-performance inline SVG study gear prop for Remotion Video Engine.
 * Features a frosted glass optical wash, 30° ergonomic squircle handle,
 * metallic chrome rim, Electric Cyan inner glow, and central 100% / math focal badge.
 */
export const GearMagnifyingGlass: React.FC<GearProps> = ({
  size = 200,
  className,
  style,
}) => {
  const uid = useId().replace(/:/g, '_');

  const chromeSilverId = `chromeSilver_${uid}`;
  const cyanGlowId = `cyanGlow_${uid}`;
  const glassWashId = `glassWash_${uid}`;
  const handleCharcoalId = `handleCharcoal_${uid}`;
  const metallicCapId = `metallicCap_${uid}`;
  const metallicCollarId = `metallicCollar_${uid}`;

  return (
    <div
      className={className}
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        filter: 'drop-shadow(0 16px 28px rgba(2, 132, 199, 0.25))',
        ...style,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Chrome Silver Gradient for Rim */}
          <linearGradient
            id={chromeSilverId}
            x1="45"
            y1="45"
            x2="135"
            y2="135"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#F1F5F9" />
            <stop offset="55%" stopColor="#E2E8F0" />
            <stop offset="80%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Frosted Glass Translucent Wash */}
          <linearGradient
            id={glassWashId}
            x1="48"
            y1="48"
            x2="122"
            y2="122"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
            <stop offset="35%" stopColor="#E0F2FE" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#BAE6FD" stopOpacity="0.40" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.30" />
          </linearGradient>

          {/* Deep Academy Charcoal Squircle Grip */}
          <linearGradient
            id={handleCharcoalId}
            x1="52"
            y1="-9"
            x2="52"
            y2="9"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="45%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Polished Metallic Cap Gradient */}
          <linearGradient
            id={metallicCapId}
            x1="110"
            y1="-8"
            x2="118"
            y2="8"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Polished Collar Mount Gradient */}
          <linearGradient
            id={metallicCollarId}
            x1="44"
            y1="-6"
            x2="54"
            y2="6"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Electric Cyan Glow Filter */}
          <filter id={cyanGlowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ================================================================= */}
        {/* 1. ERGONOMIC SQUIRCLE HANDLE (Tilt exactly at 30° toward bottom-right) */}
        {/* ================================================================= */}
        <g transform="translate(85, 85) rotate(30)">
          {/* Metallic Collar Connector */}
          <rect
            x="44"
            y="-6"
            width="10"
            height="12"
            rx="3"
            fill={`url(#${metallicCollarId})`}
            stroke="#94A3B8"
            strokeWidth="0.75"
          />

          {/* Main Squircle Grip - Deep Academy Charcoal (#0F172A) */}
          <rect
            x="52"
            y="-9"
            width="60"
            height="18"
            rx="8"
            fill={`url(#${handleCharcoalId})`}
            stroke="#1E293B"
            strokeWidth="1"
          />

          {/* Royal Blue (#0284C7) Side Edge Highlight */}
          <path
            d="M 55,-6.5 L 108,-6.5"
            stroke="#0284C7"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* Tactile Ergonomic Grip Ribs */}
          <line
            x1="72"
            y1="-4.5"
            x2="72"
            y2="4.5"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line
            x1="82"
            y1="-4.5"
            x2="82"
            y2="4.5"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <line
            x1="92"
            y1="-4.5"
            x2="92"
            y2="4.5"
            stroke="#0284C7"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Polished Metallic Cap (#E2E8F0) */}
          <rect
            x="110"
            y="-7.5"
            width="8"
            height="15"
            rx="4"
            fill={`url(#${metallicCapId})`}
            stroke="#CBD5E1"
            strokeWidth="0.75"
          />
          <line
            x1="114"
            y1="-5"
            x2="114"
            y2="5"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* ================================================================= */}
        {/* 2. CHROME SILVER METALLIC RIM (#F1F5F9) & BEVELS                  */}
        {/* ================================================================= */}
        {/* Outer Bevel Definition */}
        <circle
          cx="85"
          cy="85"
          r="53.5"
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Main Solid Metallic Rim */}
        <circle
          cx="85"
          cy="85"
          r="50"
          fill="none"
          stroke={`url(#${chromeSilverId})`}
          strokeWidth="6"
        />

        {/* Inner Rim Depth Step */}
        <circle
          cx="85"
          cy="85"
          r="47"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="0.75"
          opacity="0.7"
        />

        {/* Electric Cyan Inner Glow Ring (#00E5FF, stroke-width="2.5") */}
        <circle
          cx="85"
          cy="85"
          r="45.5"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="2.5"
          filter={`url(#${cyanGlowId})`}
          opacity="0.9"
        />
        <circle
          cx="85"
          cy="85"
          r="45.5"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="1.5"
          opacity="0.95"
        />

        {/* ================================================================= */}
        {/* 3. FROSTED GLASS LENS (Translucent wash rgba(224, 242, 254, 0.45)) */}
        {/* ================================================================= */}
        <circle
          cx="85"
          cy="85"
          r="44.25"
          fill={`url(#${glassWashId})`}
        />

        {/* Lens Optical Reticle & Viewfinder Ring */}
        <circle
          cx="85"
          cy="85"
          r="33"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity="0.38"
        />

        {/* Viewfinder Tick Marks */}
        <line x1="85" y1="46" x2="85" y2="50" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <line x1="85" y1="120" x2="85" y2="124" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <line x1="46" y1="85" x2="50" y2="85" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        <line x1="120" y1="85" x2="124" y2="85" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

        {/* ================================================================= */}
        {/* 4. LENS FOCAL GRAPHIC (Mathematical Formula & Bold 100% Score)    */}
        {/* ================================================================= */}
        {/* Mathematical formula glyph (∑ fx / √x) */}
        <text
          x="85"
          y="69"
          textAnchor="middle"
          fill="#00E5FF"
          fontSize="7"
          fontWeight="700"
          fontFamily="'SF Pro Display', 'Roboto Mono', 'Courier New', monospace"
          letterSpacing="0.8"
          opacity="0.95"
        >
          ∑ fx / √x
        </text>

        {/* Central Score Badge Container */}
        <rect
          x="62"
          y="73"
          width="46"
          height="23"
          rx="6"
          fill="#0F172A"
          fillOpacity="0.75"
          stroke="#00E5FF"
          strokeWidth="1.2"
        />

        {/* Badge Inner Top Highlight */}
        <line
          x1="66"
          y1="75.5"
          x2="104"
          y2="75.5"
          stroke="#FFFFFF"
          strokeWidth="0.75"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* Bold 100% Score Display */}
        <text
          x="85"
          y="89.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="13.5"
          fontWeight="900"
          fontFamily="Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          letterSpacing="-0.5"
        >
          100%
        </text>

        {/* Subtle Bottom Reticle Accent */}
        <circle cx="85" cy="101" r="1.5" fill="#00E5FF" opacity="0.85" />
        <line x1="77" y1="101" x2="81" y2="101" stroke="#00E5FF" strokeWidth="0.8" opacity="0.6" />
        <line x1="89" y1="101" x2="93" y2="101" stroke="#00E5FF" strokeWidth="0.8" opacity="0.6" />

        {/* ================================================================= */}
        {/* 5. ARC SHEEN HIGHLIGHT (#FFFFFF, opacity 0.55 crescent reflection) */}
        {/* ================================================================= */}
        {/* Smooth crescent-shaped white reflection tracking top-left curve */}
        <path
          d="M 50,75 A 41 41 0 0 1 82,45 C 76,48 62,58 56,68 C 53,71 51,73 50,75 Z"
          fill="#FFFFFF"
          fillOpacity="0.55"
        />

        {/* Inner Specular Arc Accent Line */}
        <path
          d="M 55,71 A 37 37 0 0 1 78,48"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.55"
        />

        {/* Secondary Subtly Curved Micro-Glint on Bottom-Right */}
        <circle cx="114" cy="112" r="2.2" fill="#FFFFFF" fillOpacity="0.38" />
      </svg>
    </div>
  );
};
