import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface PropAnimatedHeroPhoneProps {
  /** Frame offset for entrance (Default: 60) */
  entranceFrame?: number;
  /** Width in pixels (Default: 540) */
  width?: number;
  /** Custom top coordinate (e.g. '10%') */
  top?: string | number;
  /** Custom right coordinate (e.g. '6%') */
  right?: string | number;
  /** Target scale (Default: 0.85) */
  scale?: number;
  /** Optional container style overrides */
  style?: React.CSSProperties;
  className?: string;
}

/**
 * PropAnimatedHeroPhone: Animated Pop-up Hero Phone powered by native SVG asset.
 * Features:
 * - Staged entrance from frame 60 (damping: 14, stiffness: 90)
 * - Carat diamond icon subtle pulse (1 + Math.sin(frame / 6) * 0.05)
 * - Quest Card glow with breathing cyan border via interpolate(Math.sin(frame / 8), [-1, 1], [0.6, 1])
 * - Subtle floating hover physics (translateY: Math.sin(frame / 10) * 8px)
 * - Positioned in the top-right third (top: '10%', right: '6%')
 */
export const PropAnimatedHeroPhone: React.FC<PropAnimatedHeroPhoneProps> = ({
  entranceFrame = 60,
  width = 540,
  top = '10%',
  right = '6%',
  scale: targetScale = 0.85,
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring from frame 60 (damping: 14, stiffness: 90)
  const entrance = spring({
    frame: frame - entranceFrame,
    fps,
    config: {
      damping: 14,
      stiffness: 90,
      mass: 0.8,
      overshootClamping: false,
    },
  });

  const scale = interpolate(entrance, [0, 1], [0.35, targetScale]);
  const opacity = interpolate(entrance, [0, 0.25, 1], [0, 1, 1]);

  // Subtle floating hover physics
  const hoverY = Math.sin(frame / 10) * 8;

  // Carat diamond icon continuous subtle pulse
  const caratPulse = 1 + Math.sin(frame / 6) * 0.05;

  // Quest Card glow cyan border breathing effect
  const questGlowOpacity = interpolate(Math.sin(frame / 8), [-1, 1], [0.6, 1]);

  // Floating background carat particles gentle float
  const particleFloat = Math.sin(frame / 12) * 5;

  const height = (width * 1600) / 1200;

  if (frame < entranceFrame && opacity <= 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'absolute',
        top,
        right,
        width,
        height,
        transform: `translateY(${hoverY}px) scale(${scale})`,
        transformOrigin: 'top right',
        opacity,
        zIndex: 50,
        pointerEvents: 'none',
        filter:
          'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 35px rgba(0, 229, 255, 0.4))',
        ...style,
      }}
      className={className}
    >
      <svg
        viewBox="0 0 1200 1600"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="hero_phone_body_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="hero_balance_card_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="60%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          <linearGradient id="hero_gem_cyan_glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="40%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>

          <linearGradient id="hero_progress_bar_grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>

          <filter id="hero_phone_chassis_shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="24" stdDeviation="28" floodColor="#090D16" floodOpacity="0.35" />
          </filter>

          <filter id="hero_cyan_glow_filter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <clipPath id="hero_phone_screen_clip">
            <rect x="350" y="200" width="500" height="1010" rx="42" />
          </clipPath>
        </defs>

        {/* BACKGROUND FLOATING CARAT PARTICLES */}
        <g id="floating_carat_particles" transform={`translate(0, ${particleFloat})`}>
          <g id="particle_gem_1" transform="translate(930, 260) scale(1.2)" filter="url(#hero_cyan_glow_filter)">
            <polygon points="25,0 50,18 40,48 10,48 0,18" fill="url(#hero_gem_cyan_glow)" stroke="#FFFFFF" strokeWidth="1.5" />
            <polygon points="25,0 50,18 36,22 25,12" fill="#FFFFFF" opacity="0.6" />
          </g>
          <g id="particle_gem_2" transform="translate(180, 290) scale(0.9)" filter="url(#hero_cyan_glow_filter)">
            <polygon points="25,0 50,18 40,48 10,48 0,18" fill="url(#hero_gem_cyan_glow)" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
          <g id="particle_gem_3" transform="translate(950, 600) scale(1.4)" filter="url(#hero_cyan_glow_filter)">
            <polygon points="25,0 50,18 40,48 10,48 0,18" fill="url(#hero_gem_cyan_glow)" stroke="#E0F2FE" strokeWidth="2" />
            <circle cx="25" cy="24" r="3" fill="#FFFFFF" />
          </g>
          <g id="particle_gem_4" transform="translate(140, 750) scale(1.1)">
            <polygon points="25,0 50,18 40,48 10,48 0,18" fill="url(#hero_gem_cyan_glow)" opacity="0.85" />
          </g>
          <g id="particle_sparkle_1" transform="translate(300, 120)">
            <polygon points="16,0 20,12 32,16 20,20 16,32 12,20 0,16 12,12" fill="#00E5FF" />
          </g>
          <g id="particle_sparkle_2" transform="translate(910, 880)">
            <polygon points="20,0 25,15 40,20 25,25 20,40 15,25 0,20 15,15" fill="#38BDF8" opacity="0.9" />
          </g>
        </g>

        {/* SMARTPHONE CHASSIS */}
        <g id="smartphone_chassis" filter="url(#hero_phone_chassis_shadow)">
          <rect id="phone_outer_bezel" x="330" y="180" width="540" height="1050" rx="54" fill="url(#hero_phone_body_grad)" stroke="#334155" strokeWidth="4" />
          <rect id="phone_inner_bezel_border" x="338" y="188" width="524" height="1034" rx="48" fill="none" stroke="#475569" strokeWidth="1.5" opacity="0.6" />
          <rect id="phone_speaker_notch" x="530" y="194" width="140" height="12" rx="6" fill="#090D16" />
          <circle id="phone_front_camera" cx="505" cy="200" r="4.5" fill="#1E293B" stroke="#334155" strokeWidth="1" />
          <rect id="phone_screen_glass" x="350" y="218" width="500" height="990" rx="36" fill="#F8FAFC" />
        </g>

        {/* PHONE SCREEN UI CONTENT */}
        <g id="crabit_app_ui" clipPath="url(#hero_phone_screen_clip)">
          {/* Header Bar */}
          <g id="app_header_bar">
            <text x="380" y="248" fill="#1E293B" fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">09:41</text>
            <circle cx="800" cy="242" r="3.5" fill="#1E293B" />
            <circle cx="810" cy="242" r="3.5" fill="#1E293B" />
            <rect x="755" y="236" width="30" height="13" rx="3.5" fill="none" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="757" y="238" width="22" height="9" rx="2" fill="#1E293B" />

            <rect x="350" y="265" width="500" height="75" fill="#FFFFFF" />
            <g id="crabit_logo_header" transform="translate(380, 280)">
              <polygon points="18,0 36,12 28,34 8,34 0,12" fill="url(#hero_gem_cyan_glow)" />
              <circle cx="18" cy="16" r="4" fill="#FFFFFF" />
              <text x="46" y="26" fill="#FF5E36" fontSize="28" fontWeight="900" letterSpacing="-0.5" fontFamily="system-ui, -apple-system, sans-serif">Crabit</text>
              <rect x="135" y="7" width="60" height="22" rx="11" fill="#FFF1EE" />
              <text x="146" y="22" fill="#FF5E36" fontSize="12" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">KOREA</text>
            </g>
            <circle cx="800" cy="298" r="18" fill="#F1F5F9" />
            <path d="M795,302 C795,296 805,296 805,302 Z" fill="#64748B" />
            <circle cx="806" cy="289" r="4" fill="#FF5E36" />
          </g>

          {/* UI CARD 1: MAIN BALANCE HERO CARD */}
          <g id="main_balance_card" transform="translate(376, 360)">
            <rect width="448" height="250" rx="28" fill="url(#hero_balance_card_grad)" />
            <path d="M0,0 L200,0 L120,250 L0,250 Z" fill="#FFFFFF" opacity="0.06" />
            <text x="32" y="44" fill="#93C5FD" fontSize="15" fontWeight="700" letterSpacing="1" fontFamily="system-ui, -apple-system, sans-serif">MY SCHOLARSHIP BALANCE</text>

            {/* Pulsing Carat Diamond Icon */}
            <g
              id="balance_carat_icon"
              transform={`translate(32, 65) translate(36, 36) scale(${caratPulse}) translate(-36, -36)`}
              filter="url(#hero_cyan_glow_filter)"
            >
              <polygon points="36,0 72,25 56,72 16,72 0,25" fill="url(#hero_gem_cyan_glow)" stroke="#FFFFFF" strokeWidth="2" />
              <polygon points="36,0 72,25 48,32 36,16" fill="#FFFFFF" opacity="0.75" />
              <polygon points="36,0 0,25 24,32 36,16" fill="#FFFFFF" opacity="0.5" />
              <polygon points="36,16 48,32 36,68 24,32" fill="#E0F2FE" opacity="0.9" />
            </g>

            <text x="122" y="112" fill="#FFFFFF" fontSize="44" fontWeight="900" letterSpacing="-0.5" fontFamily="system-ui, -apple-system, sans-serif">50,000</text>
            <text x="286" y="112" fill="#00E5FF" fontSize="30" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif"> Carats</text>

            <rect x="32" y="160" width="384" height="60" rx="16" fill="#0F172A" opacity="0.7" />
            <text x="52" y="196" fill="#94A3B8" fontSize="16" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">장학금 환산 가치</text>
            <text x="390" y="198" fill="#F8FAFC" fontSize="20" fontWeight="800" textAnchor="end" fontFamily="system-ui, -apple-system, sans-serif">₩ 50,000 KRW</text>
          </g>

          {/* UI CARD 2: ACTIVE MISSION COMPLETE CARD (QUEST CARD WITH BREATHING CYAN GLOW BORDER) */}
          <g id="active_mission_card" transform="translate(376, 635)">
            <rect width="448" height="230" rx="24" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />

            {/* Breathing Cyan Glow Border Overlay */}
            <rect
              width="448"
              height="230"
              rx="24"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="3.5"
              opacity={questGlowOpacity}
              filter="url(#hero_cyan_glow_filter)"
            />

            <circle cx="56" cy="48" r="22" fill="#10B981" />
            <path d="M46,48 L53,55 L67,39" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

            <text x="90" y="44" fill="#0F172A" fontSize="22" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">오늘의 미션 완료!</text>
            <text x="90" y="66" fill="#64748B" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">수학 집중 모드 30분 달성</text>

            <rect x="330" y="32" width="94" height="32" rx="16" fill="#E0F2FE" />
            <text x="377" y="53" fill="#0284C7" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif">+500 C</text>

            <g id="mission_progress_group" transform="translate(32, 98)">
              <text x="0" y="18" fill="#475569" fontSize="15" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">목표 달성률</text>
              <text x="384" y="18" fill="#10B981" fontSize="17" fontWeight="900" textAnchor="end" fontFamily="system-ui, -apple-system, sans-serif">100% 완료</text>
              <rect x="0" y="32" width="384" height="18" rx="9" fill="#F1F5F9" />
              <rect id="mission_progress_fill" x="0" y="32" width="384" height="18" rx="9" fill="url(#hero_progress_bar_grad)" />
            </g>

            <rect x="32" y="168" width="384" height="42" rx="12" fill="#F8FAFC" />
            <circle cx="54" cy="189" r="6" fill="#FF5E36" />
            <text x="68" y="195" fill="#334155" fontSize="14" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">연속 7일째 미션 달성 중! 장학금 보너스 획득</text>
          </g>

          {/* UI CARD 3: ACADEMY INSTRUCTOR CONNECTED WIDGET */}
          <g id="academy_director_status_bar" transform="translate(376, 888)">
            <rect width="448" height="100" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
            <circle cx="56" cy="50" r="28" fill="#E2E8F0" />
            <circle cx="56" cy="42" r="14" fill="#FFE3D1" />
            <path d="M38,68 C38,56 46,54 56,54 C66,54 74,56 74,68 Z" fill="#24313F" />
            <circle cx="56" cy="42" r="5" fill="none" stroke="#1E252D" strokeWidth="1.5" />
            <text x="96" y="44" fill="#0F172A" fontSize="16" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif">원장 선생님 인증 완료</text>
            <text x="96" y="66" fill="#10B981" fontSize="14" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">● 실시간 캐럿 보상 지급 승인됨</text>
          </g>

          {/* Bottom Navigation Bar Dock */}
          <g id="app_bottom_dock" transform="translate(350, 1140)">
            <rect width="500" height="70" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <circle cx="410" cy="1170" r="6" fill="#FF5E36" />
            <circle cx="500" cy="1170" r="6" fill="#94A3B8" />
            <circle cx="600" cy="1170" r="8" fill="#00E5FF" filter="url(#hero_cyan_glow_filter)" />
            <circle cx="700" cy="1170" r="6" fill="#94A3B8" />
            <rect x="520" y="1195" width="160" height="5" rx="2.5" fill="#1E293B" />
          </g>
        </g>
      </svg>
    </div>
  );
};
