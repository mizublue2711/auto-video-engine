import React from 'react';
import { Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { createSpring } from '../../core/physics/springs';

export interface PropAnalogClockProps {
  /** Clock diameter in pixels (Default: 300) */
  size?: number;
  /** Starting hour 1-12 (Default: 10) */
  initialHour?: number;
  /** Starting minute 0-59 (Default: 10) */
  initialMinute?: number;
  /** Speed multiplier for time passing (Default: 1) */
  speedMultiplier?: number;
  /** Frame offset for cross-scene timeline continuity */
  frameOffset?: number;
  /** Asset path to empty clock dial plate SVG (Default: 'props/prop_clock_dial_master.svg') */
  dialSvgPath?: string;
  /** Optional container style overrides */
  style?: React.CSSProperties;
  /** Optional container className */
  className?: string;
}

/**
 * Procedural Analog Wall Clock Prop Component.
 * Features smooth continuous hour/minute hand rotation and authentic mechanical
 * spring-damped second hand ticking snapping on a 500x500 hollow dial plate.
 */
export const PropAnalogClock: React.FC<PropAnalogClockProps> = ({
  size = 300,
  initialHour = 10,
  initialMinute = 10,
  speedMultiplier = 1,
  frameOffset = 0,
  dialSvgPath = 'props/prop_clock_dial_master.svg',
  style,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Elapsed virtual seconds driven deterministically by frame and fps (supports cross-scene continuity via frameOffset)
  const elapsedVirtualSeconds = ((frame + frameOffset) / fps) * speedMultiplier;
  const currentSecondInt = Math.floor(elapsedVirtualSeconds);
  const currentSecondFraction = elapsedVirtualSeconds - currentSecondInt;

  // Mechanical spring snap on each second tick
  const secondSnapSpring = createSpring({
    frame: currentSecondFraction * fps,
    fps,
    preset: 'snappy',
    from: 0,
    to: 1,
  });

  // Second hand angle (6 degrees per second tick, with snappy mechanical damping)
  const secondHandAngle = (currentSecondInt + secondSnapSpring) * 6;

  // Smooth continuous minute and hour hand progression
  const totalMinutes = initialMinute + elapsedVirtualSeconds / 60;
  const minuteHandAngle = totalMinutes * 6; // 360 / 60 = 6 deg/min

  const totalHours = initialHour + totalMinutes / 60;
  const hourHandAngle = totalHours * 30; // 360 / 12 = 30 deg/hr

  const resolvedDialSrc =
    dialSvgPath &&
    (dialSvgPath.startsWith('http') || dialSvgPath.startsWith('data:')
      ? dialSvgPath
      : staticFile(dialSvgPath));

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        boxSizing: 'border-box',
        ...style,
      }}
      className={className}
    >
      {/* Hollow Dial Master Base SVG via Remotion Img */}
      {resolvedDialSrc && (
        <Img
          src={resolvedDialSrc}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Kinetic Clock Hands Layer (ViewBox: 500x500, Center Pivot: 250, 250) */}
      <svg
        viewBox="0 0 500 500"
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <filter id="hand-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Hour Hand (Dark Charcoal #0F172A, Broad baton shape) */}
        <g
          transform={`rotate(${hourHandAngle}, 250, 250)`}
          filter="url(#hand-shadow)"
        >
          <polygon
            points="244,265 245,140 250,132 255,140 256,265"
            fill="#0F172A"
          />
          <line x1="250" y1="145" x2="250" y2="255" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* Minute Hand (Dark Slate #1E293B, Slender precision baton) */}
        <g
          transform={`rotate(${minuteHandAngle}, 250, 250)`}
          filter="url(#hand-shadow)"
        >
          <polygon
            points="246,270 247,85 250,75 253,85 254,270"
            fill="#1E293B"
          />
          <line x1="250" y1="88" x2="250" y2="260" stroke="#475569" strokeWidth="1" />
        </g>

        {/* Second Hand (Korean Vibrant Coral-Red #EF4444, Needle with counterbalance tail) */}
        <g
          transform={`rotate(${secondHandAngle}, 250, 250)`}
          filter="url(#hand-shadow)"
        >
          {/* Counterbalance Tail */}
          <line x1="250" y1="250" x2="250" y2="285" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <circle cx="250" cy="275" r="4.5" fill="#EF4444" />

          {/* Long Needle to Dial Rim */}
          <line x1="250" y1="250" x2="250" y2="65" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          <polygon points="248,75 250,60 252,75" fill="#EF4444" />
        </g>

        {/* Center Pivot Pin & Cap Assembly */}
        <circle cx="250" cy="250" r="10" fill="#0F172A" />
        <circle cx="250" cy="250" r="6" fill="#EF4444" />
        <circle cx="250" cy="250" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
