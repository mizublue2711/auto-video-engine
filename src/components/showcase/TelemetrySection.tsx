import React from 'react';
import { Activity, Compass, Cpu, TrendingUp, Sliders } from 'lucide-react';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';

interface TelemetrySectionProps {
  dict: ShowcaseDictionary['telemetrySection'];
}

export const TelemetrySection: React.FC<TelemetrySectionProps> = ({ dict }) => {
  return (
    <section id="telemetry" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto brutalist-strict">
      {/* SECTION HEADER */}
      <div className="mb-14 text-center md:text-left border-b border-[#1F1F2E] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF] px-2.5 py-1 bg-[#031E2B] border border-[#00E5FF]/40 mb-3">
            <span className="w-1.5 h-1.5 bg-[#00E5FF]" />
            <span>{dict.sectionTag}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-black text-white tracking-tight uppercase">
            {dict.sectionTitle}
          </h2>
          <p className="text-sm md:text-base text-[#8A8FA3] mt-2 max-w-2xl font-sans">
            {dict.sectionDesc}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-[#10B981]">
          <span>[ ⏣ ZERO_KEYFRAME_COLLAPSE ]</span>
        </div>
      </div>

      {/* 3 FORMULA PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* FORMULA 1 */}
        <div className="bg-[#0A0C14] border border-[#1F1F2E] p-6 flex flex-col justify-between group hover:border-[#00E5FF]/60 transition-all">
          <div>
            <div className="text-[10px] font-mono text-[#00E5FF] font-bold mb-2">
              EQUATION 01 // HARMONIC DAMPING
            </div>
            <h3 className="text-lg font-sans font-bold text-white mb-3">
              {dict.mathSpecs.formula1Name}
            </h3>
            <div className="bg-[#05050A] border border-[#1F1F2E] p-3 font-mono text-xs text-[#00E5FF] mb-4 overflow-x-auto">
              <code>{dict.mathSpecs.formula1Expr}</code>
            </div>
            <p className="text-xs text-[#8A8FA3] font-sans leading-relaxed">
              {dict.mathSpecs.formula1Desc}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#1F1F2E] flex justify-between text-[10px] font-mono text-[#8A8FA3]">
            <span>DAMPING: 14.0</span>
            <span className="text-[#10B981]">NO OVERSHOOT CLIPPING</span>
          </div>
        </div>

        {/* FORMULA 2 */}
        <div className="bg-[#0A0C14] border border-[#1F1F2E] p-6 flex flex-col justify-between group hover:border-[#00E5FF]/60 transition-all">
          <div>
            <div className="text-[10px] font-mono text-[#5322FF] font-bold mb-2">
              EQUATION 02 // 3D FRUSTUM
            </div>
            <h3 className="text-lg font-sans font-bold text-white mb-3">
              {dict.mathSpecs.formula2Name}
            </h3>
            <div className="bg-[#05050A] border border-[#1F1F2E] p-3 font-mono text-xs text-[#5322FF] mb-4 overflow-x-auto">
              <code>{dict.mathSpecs.formula2Expr}</code>
            </div>
            <p className="text-xs text-[#8A8FA3] font-sans leading-relaxed">
              {dict.mathSpecs.formula2Desc}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#1F1F2E] flex justify-between text-[10px] font-mono text-[#8A8FA3]">
            <span>CAMERA FOV: 35°</span>
            <span className="text-[#00E5FF]">80PX MARGIN PRESERVED</span>
          </div>
        </div>

        {/* FORMULA 3 */}
        <div className="bg-[#0A0C14] border border-[#1F1F2E] p-6 flex flex-col justify-between group hover:border-[#00E5FF]/60 transition-all">
          <div>
            <div className="text-[10px] font-mono text-[#10B981] font-bold mb-2">
              EQUATION 03 // CLAMPED BEZIER
            </div>
            <h3 className="text-lg font-sans font-bold text-white mb-3">
              {dict.mathSpecs.formula3Name}
            </h3>
            <div className="bg-[#05050A] border border-[#1F1F2E] p-3 font-mono text-xs text-[#10B981] mb-4 overflow-x-auto">
              <code>{dict.mathSpecs.formula3Expr}</code>
            </div>
            <p className="text-xs text-[#8A8FA3] font-sans leading-relaxed">
              {dict.mathSpecs.formula3Desc}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-[#1F1F2E] flex justify-between text-[10px] font-mono text-[#8A8FA3]">
            <span>EXTRAPOLATE: CLAMP</span>
            <span className="text-[#10B981]">ZERO BOUNDARY DRIFT</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE MOTION CURVES SCHEMATIC */}
      <div className="bg-[#0A0C14] border border-[#1F1F2E] p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-sans font-bold text-white">
              {dict.curvesTitle}
            </h3>
            <p className="text-xs font-mono text-[#8A8FA3]">
              {dict.curvesDesc}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#00E5FF]" />
              <span className="text-[#00E5FF]">Spring (damping: 14)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-[#5322FF]" />
              <span className="text-[#5322FF]">Bezier (0.16, 1, 0.3, 1)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-0.5 bg-red-500/60 stroke-dashed" />
              <span className="text-slate-500">Linear AE Keyframe</span>
            </div>
          </div>
        </div>

        {/* SVG Motion Graph */}
        <div className="h-44 w-full bg-[#05050A] border border-[#1F1F2E] p-4 relative flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 120" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="0" y1="20" x2="800" y2="20" stroke="#1F1F2E" strokeWidth="1" />
            <line x1="0" y1="60" x2="800" y2="60" stroke="#1F1F2E" strokeWidth="1" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="#1F1F2E" strokeWidth="1" />

            {/* Linear Curve (Legacy AE) */}
            <line x1="20" y1="100" x2="780" y2="20" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />

            {/* Bezier Curve */}
            <path
              d="M 20 100 C 200 20, 400 20, 780 20"
              fill="none"
              stroke="#5322FF"
              strokeWidth="2"
            />

            {/* Spring Harmonic Curve */}
            <path
              d="M 20 100 C 150 10, 220 28, 300 18 C 380 21, 500 20, 780 20"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2.5"
            />
          </svg>

          <div className="absolute top-2 left-4 text-[9px] font-mono text-[#8A8FA3]">
            PROGRESS: 1.0 (STEADY-STATE VALUE)
          </div>
          <div className="absolute bottom-2 right-4 text-[9px] font-mono text-[#8A8FA3]">
            FRAME T: [ 0 ➔ 48 ]
          </div>
        </div>
      </div>
    </section>
  );
};
