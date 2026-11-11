import React from 'react';
import { useCurrentFrame } from 'remotion';
import { CrabitKoreaAppScreen } from './CrabitKoreaAppScreen';

export interface BasePresetProps {
  /** Current animation frame */
  frame?: number;
  /** Primary brand neon accent color (Default: #00E5FF) */
  primaryColor?: string;
  /** Accent / currency color (Default: #38BDF8) */
  accentColor?: string;
  /** Global uniform scale factor (Default: 1) */
  scale?: number;
  /** Pitch tilt angle in degrees (Default: 28) */
  rotateXDeg?: number;
  /** Yaw rotation angle in degrees (Default: -20) */
  rotateYDeg?: number;
  /** Exploded view dispersion amount, clamped 0.0 to 0.12 (Default: 0) */
  dispersionAmount?: number;
}

export interface CrabitSmartphone3DProps extends BasePresetProps {
  /** Optional custom CSS class */
  className?: string;
  /** Optional inline CSS styles */
  style?: React.CSSProperties;
  /** Screen width in px (Default: 360) */
  width?: number;
  /** Screen height in px (Default: 780, 9:19.5 aspect ratio) */
  height?: number;
}

// Helper to safely obtain frame inside or outside Remotion context
function useSafeFrame(explicitFrame?: number): number {
  let remotionFrame = 0;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    remotionFrame = useCurrentFrame();
  } catch {
    remotionFrame = 0;
  }
  return explicitFrame !== undefined ? explicitFrame : remotionFrame;
}

export const CrabitSmartphone3D: React.FC<CrabitSmartphone3DProps> = ({
  frame: propFrame,
  primaryColor = '#00E5FF',
  accentColor = '#38BDF8',
  scale = 1,
  rotateXDeg = 28,
  rotateYDeg = -20,
  dispersionAmount = 0,
  className,
  style,
  width = 360,
  height = 780,
}) => {
  const frame = useSafeFrame(propFrame);

  // Dynamic Exploded View Math:
  // dispersionAmount clamped between 0.0 and 0.12.
  // When dispersionAmount increases to 0.12, normalizedDisp reaches 1.0.
  const clampedDisp = Math.max(0, Math.min(0.12, dispersionAmount));
  const normalizedDisp = clampedDisp / 0.12;

  // Front OLED Display slides forward along +Z axis (+Z * 220 * dispersionAmount / 0.12 => up to +220px)
  const frontExplodeZ = 220 * normalizedDisp;

  // Rear Triple Camera bump slides backward along -Z axis (-Z * 180 * dispersionAmount / 0.12 => up to -180px)
  const rearExplodeZ = -180 * normalizedDisp;

  // Internal PCB and Battery separate laterally along X/Y axes
  const pcbExplodeX = -48 * normalizedDisp;
  const pcbExplodeY = -28 * normalizedDisp;
  const pcbExplodeZ = 16 * normalizedDisp;

  const batteryExplodeX = 42 * normalizedDisp;
  const batteryExplodeY = 36 * normalizedDisp;
  const batteryExplodeZ = -10 * normalizedDisp;

  // Subtle laser reflection sweep running along the chamfered metallic edges driven by (frame % 120)
  const sweepProgress = (frame % 120) / 120;
  const sweepAngle = Math.round(sweepProgress * 360);
  const sweepGlow = 0.4 + 0.35 * Math.sin(sweepProgress * Math.PI * 2);

  // Chassis Dimensions (Bezel ~6px on all sides, depth ~20px for realistic 8mm thickness)
  const BEZEL = 6;
  const chassisW = width + BEZEL * 2;
  const chassisH = height + BEZEL * 2;
  const chassisRadius = 48;

  // Base Z positions for the unibody sandwich layers
  const MIDFRAME_Z = 0;
  const FRONT_GLASS_BASE_Z = 12;
  const REAR_PLATE_BASE_Z = -12;
  const CAMERA_BUMP_BASE_Z = -18;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: chassisW * scale,
        height: chassisH * scale,
        backgroundColor: 'transparent', // STRICT RULE 1: 100% Transparent Background
        overflow: 'visible', // STRICT RULE 1: overflow visible, NO solid background boxes
        perspective: 1400,
        perspectiveOrigin: '50% 50%',
        userSelect: 'none',
        ...style,
      }}
    >
      {/* 3D Root Isometric Assembly */}
      <div
        style={{
          width: chassisW,
          height: chassisH,
          position: 'absolute',
          top: 0,
          left: 0,
          transformStyle: 'preserve-3d',
          transform: `scale(${scale}) rotateX(${rotateXDeg}deg) rotateY(${rotateYDeg}deg)`,
          transformOrigin: '50% 50% 0px',
        }}
      >
        {/* =====================================================================
            LAYER 1: TITANIUM UNIBODY MIDFRAME (CHASSIS) - Centered at Origin (Z=0)
           ===================================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${MIDFRAME_Z}px)`,
          }}
        >
          {/* Main Titanium Chassis Body Plate */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: chassisRadius,
              background: 'linear-gradient(145deg, #1A2233 0%, #0F172A 60%, #080D1A 100%)',
              border: `1.5px solid #334155`,
              boxShadow: `0 0 25px rgba(0, 229, 255, ${0.15 + sweepGlow * 0.15}), 0 35px 80px rgba(0, 0, 0, 0.85)`,
            }}
          >
            {/* Subtle Laser Reflection Sweep running along chamfered metallic edge */}
            <div
              style={{
                position: 'absolute',
                inset: -2,
                borderRadius: chassisRadius + 2,
                pointerEvents: 'none',
                background: `conic-gradient(from ${sweepAngle}deg at 50% 50%, transparent 0deg, ${primaryColor}40 25deg, #FFFFFF 40deg, ${primaryColor}80 55deg, transparent 90deg)`,
                WebkitMask:
                  'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2px))',
                opacity: sweepGlow,
              }}
            />

            {/* Precision 1px CAD Wireframe Chamfer Accent */}
            <div
              style={{
                position: 'absolute',
                inset: 3,
                borderRadius: chassisRadius - 3,
                border: `1px solid rgba(51, 65, 85, 0.65)`,
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* 3D Extrusion Depth Rim (Stacked Chamfer Layers to simulate ~8mm chassis depth) */}
          {[-8, -4, 4, 8].map((depthZ) => (
            <div
              key={`rim-${depthZ}`}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: chassisRadius,
                border: `1px solid rgba(0, 229, 255, ${0.12 - Math.abs(depthZ) * 0.008})`,
                transform: `translateZ(${depthZ}px)`,
                pointerEvents: 'none',
              }}
            />
          ))}

          {/* Physical Buttons on Metallic Midframe (Right: Power Button, Left: Volume) */}
          {/* Power Button (Right Edge) */}
          <div
            style={{
              position: 'absolute',
              top: 170,
              right: -5,
              width: 5,
              height: 58,
              borderRadius: '0 3px 3px 0',
              background: 'linear-gradient(180deg, #334155 0%, #64748B 50%, #1E293B 100%)',
              border: `1px solid ${primaryColor}60`,
              boxShadow: `0 0 8px rgba(0, 229, 255, 0.3)`,
              transform: 'translateZ(0px)',
            }}
          />

          {/* Volume Up Button (Left Edge) */}
          <div
            style={{
              position: 'absolute',
              top: 150,
              left: -5,
              width: 5,
              height: 48,
              borderRadius: '3px 0 0 3px',
              background: 'linear-gradient(180deg, #334155 0%, #64748B 50%, #1E293B 100%)',
              border: `1px solid ${primaryColor}60`,
              transform: 'translateZ(0px)',
            }}
          />

          {/* Volume Down Button (Left Edge) */}
          <div
            style={{
              position: 'absolute',
              top: 215,
              left: -5,
              width: 5,
              height: 48,
              borderRadius: '3px 0 0 3px',
              background: 'linear-gradient(180deg, #334155 0%, #64748B 50%, #1E293B 100%)',
              border: `1px solid ${primaryColor}60`,
              transform: 'translateZ(0px)',
            }}
          />

          {/* Antenna Bands (Top & Bottom chamfer cuts) */}
          <div
            style={{
              position: 'absolute',
              top: -1,
              left: 55,
              width: 4,
              height: 6,
              backgroundColor: '#0F172A',
              borderLeft: '1px solid #475569',
              borderRight: '1px solid #475569',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -1,
              right: 55,
              width: 4,
              height: 6,
              backgroundColor: '#0F172A',
              borderLeft: '1px solid #475569',
              borderRight: '1px solid #475569',
            }}
          />
        </div>

        {/* =====================================================================
            LAYER 4: INTERNAL BIONIC CHIP & CIRCUIT HEATPIPES
            Separates laterally along X/Y axes when exploded
           ===================================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: BEZEL,
            transformStyle: 'preserve-3d',
            pointerEvents: 'none',
          }}
        >
          {/* Sub-Layer 4A: Bionic Chip Motherboard (PCB Traces) */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 14,
              width: 170,
              height: 270,
              borderRadius: 16,
              background: 'rgba(10, 15, 29, 0.92)',
              border: `1px solid ${primaryColor}50`,
              boxShadow: `0 0 16px rgba(0, 229, 255, 0.25) inset, 0 8px 24px rgba(0, 0, 0, 0.6)`,
              transform: `translate3d(${pcbExplodeX}px, ${pcbExplodeY}px, ${pcbExplodeZ + 4}px)`,
              transition: 'transform 0.1s ease-out',
              opacity: 0.65 + normalizedDisp * 0.35,
              padding: 10,
              boxSizing: 'border-box',
            }}
          >
            {/* Etched 1px Wireframe Micro-traces SVG */}
            <svg
              width="150"
              height="250"
              viewBox="0 0 150 250"
              fill="none"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
              {/* Bus trace lines */}
              <path d="M15 20 H50 L75 45 V120" stroke={primaryColor} strokeWidth="1" strokeOpacity="0.4" />
              <path d="M25 20 H45 L70 45 V140" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" />
              <path d="M135 30 H105 L85 50 V180" stroke={primaryColor} strokeWidth="1" strokeOpacity="0.35" />
              <path d="M20 220 H60 L85 195 V150" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" />
              <path d="M35 235 H70 L95 210 V170" stroke={primaryColor} strokeWidth="1" strokeOpacity="0.3" />
              {/* Solder vias */}
              <circle cx="15" cy="20" r="2.5" fill={primaryColor} />
              <circle cx="25" cy="20" r="2" fill={accentColor} />
              <circle cx="135" cy="30" r="2.5" fill={primaryColor} />
              <circle cx="20" cy="220" r="2.5" fill="#F59E0B" />
              <circle cx="35" cy="235" r="2" fill={primaryColor} />
            </svg>

            {/* Central Bionic Processor Block */}
            <div
              style={{
                position: 'absolute',
                top: 50,
                left: 45,
                width: 68,
                height: 68,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                border: `1.5px solid ${primaryColor}`,
                boxShadow: `0 0 14px rgba(0, 229, 255, 0.45)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 4,
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  fontFamily: '"SF Mono", "Fira Code", monospace',
                  fontSize: 8.5,
                  fontWeight: 900,
                  color: primaryColor,
                  letterSpacing: '0.2px',
                }}
              >
                CRABIT A18
              </div>
              <div
                style={{
                  fontSize: 7,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginTop: 2,
                }}
              >
                CSAT 4nm
              </div>
              <div
                style={{
                  fontSize: 6,
                  color: '#94A3B8',
                  marginTop: 1,
                  fontFamily: 'monospace',
                }}
              >
                NEURAL CORE
              </div>
            </div>

            {/* Copper Vapor Chamber Heatpipe */}
            <div
              style={{
                position: 'absolute',
                top: 124,
                left: 70,
                width: 18,
                height: 110,
                borderRadius: 9,
                background: 'linear-gradient(90deg, #92400E 0%, #F59E0B 45%, #D97706 70%, #78350F 100%)',
                border: '1px solid rgba(245, 158, 11, 0.6)',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.35)',
              }}
            />
          </div>

          {/* Sub-Layer 4B: High-Density Battery Pack Module */}
          <div
            style={{
              position: 'absolute',
              top: 320,
              right: 14,
              width: 175,
              height: 380,
              borderRadius: 16,
              background: 'linear-gradient(180deg, #111827 0%, #1E293B 50%, #0F172A 100%)',
              border: '1.2px solid #334155',
              boxShadow: `0 0 18px rgba(0, 0, 0, 0.7)`,
              transform: `translate3d(${batteryExplodeX}px, ${batteryExplodeY}px, ${batteryExplodeZ}px)`,
              transition: 'transform 0.1s ease-out',
              opacity: 0.6 + normalizedDisp * 0.4,
              padding: 12,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Battery Header Telemetry */}
            <div>
              <div
                style={{
                  fontFamily: '"SF Mono", "Fira Code", monospace',
                  fontSize: 9,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '0.4px',
                }}
              >
                CRABIT CELL
              </div>
              <div
                style={{
                  fontFamily: '"SF Mono", monospace',
                  fontSize: 7.5,
                  color: primaryColor,
                  marginTop: 2,
                }}
              >
                4,850 mAh // 18.67Wh
              </div>
            </div>

            {/* Safety & Voltage Specs Graphic */}
            <div
              style={{
                borderTop: '1px solid #334155',
                paddingTop: 8,
                fontFamily: 'monospace',
                fontSize: 7,
                color: '#64748B',
                lineHeight: 1.4,
              }}
            >
              <div>TITANIUM SHIELDED</div>
              <div>RECHARGE: 65W GAIN</div>
              <div style={{ color: '#10B981', marginTop: 4 }}>STATUS: OPTIMAL</div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            LAYER 3: AEROSPACE TRIPLE CAMERA ISLAND (REAR)
            Mounted on rear plate; slides backward along -Z in exploded view
           ===================================================================== */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${REAR_PLATE_BASE_Z}px)`,
          }}
        >
          {/* Rear Matte Glass Plate */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: chassisRadius,
              background: 'linear-gradient(180deg, #0F172A 0%, #0A0E17 100%)',
              border: `1.5px solid #1E293B`,
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.9) inset',
            }}
          >
            {/* Subtle Crabit Brand Insignia on Backplate */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                opacity: 0.25,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: '"SF Mono", monospace',
                  fontSize: 16,
                  fontWeight: 900,
                  color: primaryColor,
                  letterSpacing: 4,
                }}
              >
                CRABIT
              </div>
            </div>
          </div>

          {/* Triple Camera Island Bump (Slides further -Z when exploded) */}
          <div
            style={{
              position: 'absolute',
              top: 22,
              left: 20,
              width: 148,
              height: 158,
              borderRadius: 32,
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              border: `1.5px solid ${primaryColor}70`,
              boxShadow: `0 0 16px rgba(0, 229, 255, 0.3), 0 12px 30px rgba(0, 0, 0, 0.8)`,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${CAMERA_BUMP_BASE_Z + rearExplodeZ}px)`,
              transition: 'transform 0.1s ease-out',
              padding: 8,
              boxSizing: 'border-box',
            }}
          >
            {/* Lens 1: Main Wide 24mm f/1.78 */}
            <div
              style={{
                position: 'absolute',
                top: 14,
                left: 14,
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #0B1120 40%, #1E293B 70%, #334155 100%)',
                border: `2px solid ${primaryColor}`,
                boxShadow: `0 0 10px rgba(0, 229, 255, 0.4)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Sapphire Glass Wireframe Rings */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 229, 255, 0.6)',
                  background: 'radial-gradient(circle, #0284C7 20%, #0369A1 60%, #0F172A 100%)',
                  position: 'relative',
                }}
              >
                {/* Lens Aperture Iris Ring */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    border: '1px dashed #38BDF8',
                  }}
                />
              </div>
            </div>

            {/* Lens 2: Telephoto 77mm f/2.8 */}
            <div
              style={{
                position: 'absolute',
                bottom: 14,
                left: 14,
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #0B1120 40%, #1E293B 70%, #334155 100%)',
                border: `2px solid ${primaryColor}`,
                boxShadow: `0 0 10px rgba(0, 229, 255, 0.4)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 229, 255, 0.6)',
                  background: 'radial-gradient(circle, #0284C7 20%, #0369A1 60%, #0F172A 100%)',
                }}
              />
            </div>

            {/* Lens 3: Ultra-Wide 13mm f/2.2 */}
            <div
              style={{
                position: 'absolute',
                top: 48,
                right: 14,
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #0B1120 40%, #1E293B 70%, #334155 100%)',
                border: `2px solid ${primaryColor}`,
                boxShadow: `0 0 10px rgba(0, 229, 255, 0.4)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 229, 255, 0.6)',
                  background: 'radial-gradient(circle, #0284C7 20%, #0369A1 60%, #0F172A 100%)',
                }}
              />
            </div>

            {/* Optical Dual-Tone Flash Unit */}
            <div
              style={{
                position: 'absolute',
                top: 18,
                right: 28,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #FEF08A 30%, #F59E0B 70%, #78350F 100%)',
                border: '1px solid #FDE047',
                boxShadow: '0 0 8px rgba(253, 224, 71, 0.5)',
              }}
            />

            {/* Laser LiDAR Emitter Sensor */}
            <div
              style={{
                position: 'absolute',
                bottom: 22,
                right: 28,
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: '#030712',
                border: `1.2px solid ${accentColor}`,
                boxShadow: `0 0 6px ${accentColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                  boxShadow: '0 0 4px #EF4444',
                }}
              />
            </div>
          </div>
        </div>

        {/* =====================================================================
            LAYER 2: OLED DISPLAY GLASS WITH EMBEDDED UI TEXTURE
            Bezel-less front glass panel hosting CrabitKoreaAppScreen
            Slides forward along +Z axis (+Z * 220 * dispersionAmount / 0.12)
           ===================================================================== */}
        <div
          style={{
            position: 'absolute',
            top: BEZEL,
            left: BEZEL,
            width,
            height,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${FRONT_GLASS_BASE_Z + frontExplodeZ}px)`,
            transition: 'transform 0.1s ease-out',
            borderRadius: 44,
            boxShadow: `0 0 20px rgba(0, 229, 255, ${0.25 + normalizedDisp * 0.25})`,
          }}
        >
          {/* Live Dynamic Screen Texture Component */}
          <CrabitKoreaAppScreen
            frame={frame}
            scale={1}
            width={width}
            height={height}
          />

          {/* Front Glass Specular Reflection Highlight Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 44,
              pointerEvents: 'none',
              background:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 45%, rgba(0, 229, 255, 0.04) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          />
        </div>

        {/* =====================================================================
            LAYER 5: LASER DIMENSION & TELEMETRY NODES
            3 precision CAD callouts pinned directly onto the chassis in 3D
           ===================================================================== */}
        {/* Node A: DISPLAY // 9:19.5 OLED 120Hz (Pinned to Front Display Layer) */}
        <div
          style={{
            position: 'absolute',
            top: 110,
            right: -130,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${FRONT_GLASS_BASE_Z + frontExplodeZ + 6}px)`,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* Precision 1px Leader Line SVG connecting from phone display edge */}
          <svg width="45" height="20" viewBox="0 0 45 20" fill="none" style={{ overflow: 'visible' }}>
            <circle cx="0" cy="10" r="3.5" fill={primaryColor} />
            <circle cx="0" cy="10" r="7" stroke={primaryColor} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M0 10 L20 10 L35 10" stroke={primaryColor} strokeWidth="1.2" />
          </svg>

          {/* Telemetry Badge Callout */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${primaryColor}80`,
              boxShadow: `0 0 12px rgba(0, 229, 255, 0.35)`,
              borderRadius: 6,
              padding: '4px 8px',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                fontFamily: '"SF Mono", "Fira Code", monospace',
                fontSize: 9,
                fontWeight: 800,
                color: primaryColor,
                letterSpacing: '0.4px',
              }}
            >
              DISPLAY // 9:19.5 OLED
            </div>
            <div
              style={{
                fontFamily: '"SF Mono", monospace',
                fontSize: 8,
                color: '#94A3B8',
                fontWeight: 600,
              }}
            >
              120Hz PROMOTION • 2340x1080
            </div>
          </div>
        </div>

        {/* Node B: PROCESSOR // 4nm NEURAL CO-ENGINE (Pinned near internal CPU) */}
        <div
          style={{
            position: 'absolute',
            top: 270,
            left: -195,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${MIDFRAME_Z + pcbExplodeZ + 10}px)`,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* Telemetry Badge Callout */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${accentColor}80`,
              boxShadow: `0 0 12px rgba(56, 189, 248, 0.35)`,
              borderRadius: 6,
              padding: '4px 8px',
              whiteSpace: 'nowrap',
              textAlign: 'right',
            }}
          >
            <div
              style={{
                fontFamily: '"SF Mono", "Fira Code", monospace',
                fontSize: 9,
                fontWeight: 800,
                color: accentColor,
                letterSpacing: '0.4px',
              }}
            >
              PROCESSOR // 4nm NEURAL
            </div>
            <div
              style={{
                fontFamily: '"SF Mono", monospace',
                fontSize: 8,
                color: '#94A3B8',
                fontWeight: 600,
              }}
            >
              CRABIT BIONIC CO-ENGINE
            </div>
          </div>

          {/* Leader Line SVG */}
          <svg width="45" height="20" viewBox="0 0 45 20" fill="none" style={{ overflow: 'visible' }}>
            <path d="M0 10 L15 10 L45 10" stroke={accentColor} strokeWidth="1.2" />
            <circle cx="45" cy="10" r="3.5" fill={accentColor} />
            <circle cx="45" cy="10" r="7" stroke={accentColor} strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>

        {/* Node C: STATUS // REAL-TIME CSAT SYNC (Pinned near midframe bottom telemetry) */}
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            right: -140,
            transformStyle: 'preserve-3d',
            transform: `translateZ(${MIDFRAME_Z + 8}px)`,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* Leader Line SVG */}
          <svg width="45" height="20" viewBox="0 0 45 20" fill="none" style={{ overflow: 'visible' }}>
            <circle cx="0" cy="10" r="3.5" fill="#10B981" />
            <circle cx="0" cy="10" r="7" stroke="#10B981" strokeWidth="1" strokeOpacity="0.5" />
            <path d="M0 10 L20 10 L40 10" stroke="#10B981" strokeWidth="1.2" />
          </svg>

          {/* Telemetry Badge Callout */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(16, 185, 129, 0.8)',
              boxShadow: '0 0 12px rgba(16, 185, 129, 0.35)',
              borderRadius: 6,
              padding: '4px 8px',
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                fontFamily: '"SF Mono", "Fira Code", monospace',
                fontSize: 9,
                fontWeight: 800,
                color: '#10B981',
                letterSpacing: '0.4px',
              }}
            >
              STATUS // CSAT SYNC
            </div>
            <div
              style={{
                fontFamily: '"SF Mono", monospace',
                fontSize: 8,
                color: '#94A3B8',
                fontWeight: 600,
              }}
            >
              REAL-TIME LATENCY &lt; 12ms
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrabitSmartphone3D;
