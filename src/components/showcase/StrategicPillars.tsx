import React, { useState } from 'react';
import { Palette, ShieldCheck, Gem, Check, Sparkles, Sliders, Smartphone, Award, Cpu } from 'lucide-react';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';

interface StrategicPillarsProps {
  dict: ShowcaseDictionary['pillars'];
}

export const StrategicPillars: React.FC<StrategicPillarsProps> = ({ dict }) => {
  const [activeTab, setActiveTab] = useState<'palette' | 'rig' | 'mascot'>('palette');
  const [caratCount, setCaratCount] = useState(25000);
  const [clawsRaised, setClawsRaised] = useState(true);

  return (
    <section id="brand-assets" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto brutalist-strict">
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

        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-[#8A8FA3]">
          <span className="text-[#10B981]">[ ⏣ BRAND_INTEGRITY_VERIFIED ]</span>
        </div>
      </div>

      {/* 3 STRATEGIC GLASSMORPHISM CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CARD 1: BRAND IDENTITY FOUNDRY */}
        <div className="bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF]/60 transition-all p-6 sm:p-8 flex flex-col justify-between group shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#00E5FF]/5 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-[#00E5FF] font-bold">
                {dict.pillar1.tag}
              </span>
              <div className="p-2 bg-[#05050A] border border-[#1F1F2E] text-[#00E5FF]">
                <Palette size={16} strokeWidth={1.5} />
              </div>
            </div>

            <h3 className="text-2xl font-sans font-black text-white mb-3">
              {dict.pillar1.title}
            </h3>
            <p className="text-sm text-[#8A8FA3] leading-relaxed mb-6 font-sans">
              {dict.pillar1.desc}
            </p>

            {/* Spec Bullet List */}
            <ul className="space-y-2 mb-6 font-mono text-xs text-slate-300">
              {dict.pillar1.specs.map((spec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={14} className="text-[#10B981] mt-0.5 shrink-0" strokeWidth={2} />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive K-Fintech Color & Specimen Preview */}
          <div className="bg-[#05050A] border border-[#1F1F2E] p-4 mt-4">
            <div className="text-[10px] font-mono text-[#8A8FA3] uppercase mb-2 flex justify-between">
              <span>COLOR TOKENS & UI SPEC</span>
              <span className="text-[#00E5FF]">{dict.pillar1.uiTag}</span>
            </div>

            {/* Color Swatches */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {[
                { hex: '#3182F6', name: 'TOSS BLUE' },
                { hex: '#10B981', name: 'CARAT GREEN' },
                { hex: '#00E5FF', name: 'HYPER CYAN' },
                { hex: '#05050A', name: 'OBSIDIAN' },
              ].map((c) => (
                <div key={c.hex} className="text-center">
                  <div
                    className="h-8 w-full border border-[#2D2D44]"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[9px] font-mono text-[#8A8FA3] block mt-1">
                    {c.hex}
                  </span>
                </div>
              ))}
            </div>

            {/* Mini Toss-like UI Badge Preview */}
            <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-[#3182F6] flex items-center justify-center text-[10px] font-bold text-white">
                  ₩
                </div>
                <span className="font-sans font-bold text-white text-xs">크래빗 장학 계좌</span>
              </div>
              <span className="font-mono text-[#10B981] font-bold">+25,000 CARAT</span>
            </div>
          </div>
        </div>

        {/* CARD 2: CHARACTER & CONTEXT LOCKING */}
        <div className="bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF]/60 transition-all p-6 sm:p-8 flex flex-col justify-between group shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#5322FF]/10 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-[#5322FF] font-bold">
                {dict.pillar2.tag}
              </span>
              <div className="p-2 bg-[#05050A] border border-[#1F1F2E] text-[#5322FF]">
                <ShieldCheck size={16} strokeWidth={1.5} />
              </div>
            </div>

            <h3 className="text-2xl font-sans font-black text-white mb-3">
              {dict.pillar2.title}
            </h3>
            <p className="text-sm text-[#8A8FA3] leading-relaxed mb-6 font-sans">
              {dict.pillar2.desc}
            </p>

            {/* Spec Bullet List */}
            <ul className="space-y-2 mb-6 font-mono text-xs text-slate-300">
              {dict.pillar2.specs.map((spec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={14} className="text-[#10B981] mt-0.5 shrink-0" strokeWidth={2} />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Rig Breakdown Box */}
          <div className="bg-[#05050A] border border-[#1F1F2E] p-4 mt-4">
            <div className="text-[10px] font-mono text-[#8A8FA3] uppercase mb-2 flex justify-between">
              <span>RIG HIERARCHY & SAFE MARGIN</span>
              <span className="text-[#10B981]">{dict.pillar2.uiTag}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[10px]">
              <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2 hover:border-[#00E5FF] transition-all">
                <span className="text-[#00E5FF] block font-bold">HEAD 3/4</span>
                <span className="text-[#8A8FA3] text-[9px]">Alert & Confident</span>
              </div>
              <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2 hover:border-[#00E5FF] transition-all">
                <span className="text-[#00E5FF] block font-bold">TORSO 3/4</span>
                <span className="text-[#8A8FA3] text-[9px]">Clean Hoodie Rig</span>
              </div>
              <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2 hover:border-[#00E5FF] transition-all">
                <span className="text-[#00E5FF] block font-bold">LIMBS RIG</span>
                <span className="text-[#8A8FA3] text-[9px]">Hand Raise & Grip</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#8A8FA3] bg-[#0A0C14] border border-[#1F1F2E] px-3 py-1.5">
              <span>BOUNDS: [ 80px SAFE MARGIN ]</span>
              <span className="text-[#10B981] font-bold">CLAMPED 100%</span>
            </div>
          </div>
        </div>

        {/* CARD 3: MASCOT ENGINEERING (CHÚ CUA CRABIT) */}
        <div className="bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF]/60 transition-all p-6 sm:p-8 flex flex-col justify-between group shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#10B981]/10 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-mono text-[#10B981] font-bold">
                {dict.pillar3.tag}
              </span>
              <div className="p-2 bg-[#05050A] border border-[#1F1F2E] text-[#10B981]">
                <Gem size={16} strokeWidth={1.5} />
              </div>
            </div>

            <h3 className="text-2xl font-sans font-black text-white mb-3">
              {dict.pillar3.title}
            </h3>
            <p className="text-sm text-[#8A8FA3] leading-relaxed mb-6 font-sans">
              {dict.pillar3.desc}
            </p>

            {/* Spec Bullet List */}
            <ul className="space-y-2 mb-6 font-mono text-xs text-slate-300">
              {dict.pillar3.specs.map((spec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={14} className="text-[#10B981] mt-0.5 shrink-0" strokeWidth={2} />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Mascot SVG & Diamond Facet Demonstration */}
          <div className="bg-[#05050A] border border-[#1F1F2E] p-4 mt-4">
            <div className="text-[10px] font-mono text-[#8A8FA3] uppercase mb-2 flex justify-between items-center">
              <span>CRABIT MASCOT // LIVE FACETS</span>
              <span className="text-[#00E5FF]">{dict.pillar3.uiTag}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Mascot SVG image preview */}
              <div className="w-16 h-16 bg-[#0A0C14] border border-[#00E5FF]/40 flex items-center justify-center p-1 relative shadow-cyan-glow">
                <img
                  src="/props/mascot_crabit_carat_crystal.svg"
                  alt="Crabit Carat Diamond Mascot"
                  className={`w-full h-full object-contain transition-transform duration-300 ${
                    clawsRaised ? 'scale-110 -translate-y-1' : 'scale-100'
                  }`}
                />
              </div>

              {/* Live interactive trigger button */}
              <div className="flex-1 space-y-2">
                <button
                  onClick={() => {
                    setClawsRaised(!clawsRaised);
                    setCaratCount((prev) => prev + 5000);
                  }}
                  className="w-full py-1.5 px-3 bg-[#031E2B] border border-[#00E5FF]/60 hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] font-mono text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sparkles size={12} />
                  <span>{clawsRaised ? 'RAISE CLAWS (+CARAT)' : 'REST CLAWS'}</span>
                </button>

                <div className="text-[10px] font-mono text-right text-[#10B981] font-bold">
                  BALANCE: {caratCount.toLocaleString()} CARAT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
