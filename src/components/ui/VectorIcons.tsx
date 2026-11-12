import React from 'react';

/** 🎯 Vector Target Mission Icon */
export const IconTargetMission: React.FC<{
  size?: number;
  primaryColor?: string;
  accentColor?: string;
  centerColor?: string;
}> = ({
  size = 32,
  primaryColor = '#0284C7',
  accentColor = '#00E5FF',
  centerColor = '#0369A1',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    style={{ filter: `drop-shadow(0 2px 8px ${accentColor}44)` }}
  >
    <circle cx="16" cy="16" r="13" stroke={primaryColor} strokeWidth="2.5" strokeOpacity="0.85" />
    <circle cx="16" cy="16" r="8.5" stroke={accentColor} strokeWidth="2" strokeDasharray="4 2" />
    <circle cx="16" cy="16" r="4.2" fill={centerColor} />
    <line x1="16" y1="1" x2="16" y2="5" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="16" y1="27" x2="16" y2="31" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="1" y1="16" x2="5" y2="16" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="27" y1="16" x2="31" y2="16" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/** 💎 Vector Carat Diamond Icon (Crabit Cyan Branded) */
export const IconCaratDiamond: React.FC<{
  size?: number;
  startColor?: string;
  endColor?: string;
  lightFacet?: string;
  shadowFacet?: string;
}> = ({
  size = 32,
  startColor = '#0284C7',
  endColor = '#00E5FF',
  lightFacet = '#E0F2FE',
  shadowFacet = '#0369A1',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    style={{ filter: 'drop-shadow(0 3px 10px rgba(0, 229, 255, 0.45))' }}
  >
    <defs>
      <linearGradient id="diamondCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={endColor} />
        <stop offset="100%" stopColor={startColor} />
      </linearGradient>
    </defs>
    <polygon points="10,4 22,4 27,11 5,11" fill="url(#diamondCyanGrad)" />
    <polygon points="10,4 16,11 5,11" fill={lightFacet} fillOpacity="0.85" />
    <polygon points="5,11 27,11 16,28" fill="url(#diamondCyanGrad)" />
    <polygon points="27,11 22,4 16,11" fill={shadowFacet} fillOpacity="0.75" />
    <polygon points="16,11 27,11 16,28" fill={shadowFacet} fillOpacity="0.25" />
    <polyline points="10,4 16,11 22,4" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.8" />
  </svg>
);

/** ⚡ Vector Energy Flash Quest Icon */
export const IconFlashQuest: React.FC<{ size?: number; fillColor?: string }> = ({
  size = 20,
  fillColor = '#00E5FF',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ filter: `drop-shadow(0 0 6px ${fillColor})` }}
  >
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      fill={fillColor}
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);
