import React from 'react';

export interface ComponentSocketMeta {
  dimensions: { width: number; height: number };
  sockets?: Record<string, { x: number; y: number }>;
  pivots?: Record<string, { x: number; y: number }>;
}

export interface LegoPlugProps {
  /** The metadata object of the component being plugged in */
  meta: ComponentSocketMeta;
  /** The socket key name on this component to anchor by (e.g., "neck_base", "hip_joint") */
  socketName: string;
  /** Target coordinates [x, y] in the parent scene/canvas coordinate system where the socket snaps */
  targetSocket: { x: number; y: number };
  /** Target height in the parent coordinate system (drives uniform scaling, preserves aspect ratio) */
  targetHeight?: number;
  /** Optional target width override if width-driven scaling is preferred */
  targetWidth?: number;
  /** Optional manual scale multiplier */
  scaleMultiplier?: number;
  /** Optional rotational angle (degrees) around the snapped socket */
  rotation?: number;
  /** Optional opacity */
  opacity?: number;
  /** Optional additional CSS or SVG transform styles */
  style?: React.CSSProperties;
  /** Child SVG/React component */
  children: React.ReactNode;
}

export const LegoPlug: React.FC<LegoPlugProps> = ({
  meta,
  socketName,
  targetSocket,
  targetHeight,
  targetWidth,
  scaleMultiplier = 1,
  rotation = 0,
  opacity = 1,
  style,
  children,
}) => {
  // 1. Resolve source anchor coordinate from sockets or fallback to pivots
  const sourceAnchor =
    meta.sockets?.[socketName] ?? meta.pivots?.[socketName] ?? { x: 0, y: 0 };

  // 2. Calculate uniform scale factor (preventing aspect ratio distortion)
  let baseScale = 1;
  if (targetHeight && meta.dimensions.height > 0) {
    baseScale = targetHeight / meta.dimensions.height;
  } else if (targetWidth && meta.dimensions.width > 0) {
    baseScale = targetWidth / meta.dimensions.width;
  }

  const finalScale = baseScale * scaleMultiplier;

  // 3. Mathematical alignment: translate target point to origin, align socket, and scale
  const translateX = targetSocket.x - sourceAnchor.x * finalScale;
  const translateY = targetSocket.y - sourceAnchor.y * finalScale;

  // Transform order: translate to target position -> rotate around socket anchor
  const transform = `translate(${translateX}px, ${translateY}px) scale(${finalScale}) rotate(${rotation}deg)`;
  const transformOrigin = `${sourceAnchor.x * finalScale}px ${sourceAnchor.y * finalScale}px`;

  return (
    <g
      style={{
        transform,
        transformOrigin,
        opacity,
        ...style,
      }}
    >
      {children}
    </g>
  );
};
