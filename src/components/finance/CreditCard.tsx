import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { createSpring } from '../../core/physics/springs';

export interface CreditCardProps {
  cardHolderName?: string;
  cardNumberMasked?: string;
  expiryDate?: string;
  backgroundColor?: string;
  accentColor?: string;
  delay?: number;
  scale?: number;
  rotation?: number;
}

/**
 * Procedural financial card component with EMV gold chip, contact lines, and embossed typography.
 */
export const CreditCard: React.FC<CreditCardProps> = ({
  cardHolderName = 'CARDHOLDER NAME',
  cardNumberMasked = '•••• •••• •••• 8829',
  expiryDate = '12/28',
  backgroundColor = '#1E293B',
  accentColor = '#F59E0B',
  delay = 0,
  scale = 1,
  rotation = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = createSpring({
    frame,
    fps,
    preset: 'snappy',
    delay,
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        width: 480,
        height: 290,
        borderRadius: 20,
        background: `linear-gradient(135deg, ${backgroundColor} 0%, #0F172A 100%)`,
        padding: 30,
        boxSizing: 'border-box',
        color: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.45)',
        transform: `scale(${entrance * scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        position: 'relative',
        zIndex: 65,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Top row: Chip and contactless icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* EMV Chip */}
        <div
          style={{
            width: 55,
            height: 42,
            backgroundColor: '#E5C158',
            borderRadius: 8,
            border: '1px solid #B89230',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: '#9A7518',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 1,
              backgroundColor: '#9A7518',
            }}
          />
        </div>

        {/* Brand Accent Badge */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: accentColor,
            opacity: 0.9,
          }}
        />
      </div>

      {/* Middle row: Card Number */}
      <div
        style={{
          fontSize: 24,
          letterSpacing: 4,
          fontWeight: 600,
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        {cardNumberMasked}
      </div>

      {/* Bottom row: Cardholder & Expiry */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 10, textTransform: 'uppercase', opacity: 0.7, letterSpacing: 1 }}>
            Card Holder
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            {cardHolderName}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, textTransform: 'uppercase', opacity: 0.7, letterSpacing: 1 }}>
            Expires
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: 1 }}>
            {expiryDate}
          </div>
        </div>
      </div>
    </div>
  );
};
