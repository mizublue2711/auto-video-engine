import React, { useState } from 'react';
import { Download, Film, Layers, Eye, Sparkles, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';

interface StoryboardBlueprintSectionProps {
  dict: ShowcaseDictionary['storyboardViewer'];
  onOpenModal: () => void;
}

export const StoryboardBlueprintSection: React.FC<StoryboardBlueprintSectionProps> = ({
  dict,
  onOpenModal,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const phaseImages = [
    '/storyboard/1.svg',
    '/storyboard/2.svg',
    '/storyboard/3.svg',
    '/storyboard/4.svg',
    '/storyboard/5.svg',
    '/storyboard/6.svg',
    '/storyboard/7.svg',
    '/storyboard/8.svg',
    '/storyboard/card_3d.svg',
    '/storyboard/9.svg',
  ];

  const activePhase = dict.phases[activeIdx] || dict.phases[0];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : dict.phases.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < dict.phases.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="storyboard" className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto brutalist-strict">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-[#1F1F2E] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] px-2.5 py-1 bg-[#0A1A14] border border-[#10B981]/40 mb-3">
            <span className="w-1.5 h-1.5 bg-[#10B981] animate-pulse" />
            <span>06 // PRODUCTION BLUEPRINT</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-black text-white tracking-tight uppercase">
            {dict.modalTitle}
          </h2>
          <p className="text-sm md:text-base text-[#8A8FA3] mt-2 font-sans max-w-2xl">
            {dict.downloadSubtitle || 'Chuyển hóa xung đột tâm lý thành giải pháp công nghệ qua các phân đoạn định lượng chính xác 590 frames @ 24FPS.'}
          </p>
        </div>

        {/* PROMINENT DIRECT PDF DOWNLOAD BUTTON */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/downloads/Crabit_Storyboard_Master.pdf"
            download="Crabit_Storyboard_Master.pdf"
            className="px-5 py-3 bg-[#031E2B] border-2 border-[#00E5FF] hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] font-mono font-bold text-xs flex items-center gap-2.5 transition-all shadow-cyan-glow mechanical-chisel"
          >
            <Download size={16} />
            <span>{dict.downloadBtn || 'TẢI BẢN VẼ BLUEPRINT PDF (2.8MB)'}</span>
          </a>

          <button
            onClick={onOpenModal}
            className="px-4 py-3 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#8A8FA3] hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
            title="Open Fullscreen Viewer"
          >
            <Maximize2 size={15} />
            <span className="hidden sm:inline">FULLSCREEN</span>
          </button>
        </div>
      </div>

      {/* 10-PHASE TAB STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5 mb-6 bg-[#05050A] p-2 border border-[#1F1F2E]">
        {dict.phases.map((phase, idx) => {
          const isActive = activeIdx === idx;
          const shortTag = idx === 0 ? 'SCENE 1' :
                           idx === 1 ? 'SCENE 2' :
                           idx >= 2 && idx <= 6 ? `PHA ${idx - 1}` :
                           idx === 7 ? 'SCENE 3' :
                           idx === 8 ? 'SCENE 4' : 'OUTRO';
          const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
          return (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`p-2 text-left font-mono text-xs transition-all relative ${
                isActive
                  ? 'bg-[#031E2B] text-[#00E5FF] border border-[#00E5FF]/60 font-bold shadow-cyan-glow'
                  : 'bg-[#0A0C14] text-[#8A8FA3] hover:text-white border border-[#1F1F2E]'
              }`}
            >
              <div className="flex items-center justify-between text-[9px] opacity-80 mb-0.5">
                <span>{numStr}</span>
                <span className="text-[8px] px-1 bg-[#05050A] border border-[#1F1F2E] text-slate-400">
                  {shortTag}
                </span>
              </div>
              <div className="truncate font-sans font-semibold text-[11px] leading-tight">
                {phase.title}
              </div>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E5FF]" />
              )}
            </button>
          );
        })}
      </div>

      {/* MAIN INTERACTIVE FRAME: 2-COLUMN CAD VIEWER */}
      <div className="bg-[#0A0C14] border-2 border-[#1F1F2E] p-4 sm:p-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: RAW SKETCH PLATE (16:9 Widescreen Frame) */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            <div className="aspect-video bg-[#05050A] border-2 border-[#1F1F2E] flex flex-col items-center justify-center p-3 relative overflow-hidden group">
              {/* Top CAD Plate Header */}
              <div className="absolute top-2 left-2 z-10 flex items-center gap-2 text-[10px] font-mono text-[#00E5FF] bg-[#05050A]/90 px-2.5 py-1 border border-[#00E5FF]/30">
                <span className="w-1.5 h-1.5 bg-[#00E5FF] animate-pulse" />
                <span>RAW SKETCH PLATE // 0{activeIdx + 1}</span>
              </div>

              <div className="absolute top-2 right-2 z-10 text-[10px] font-mono text-[#8A8FA3] bg-[#05050A]/90 px-2 py-1 border border-[#1F1F2E]">
                {activePhase.frames}
              </div>

              {/* The Storyboard Raw Sketch Image */}
              <img
                src={phaseImages[activeIdx]}
                alt={activePhase.title}
                className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(0,229,255,0.15)] transition-transform duration-200 group-hover:scale-[1.01]"
              />

              {/* Bottom CAD Overlay */}
              <div className="absolute bottom-2 left-2 z-10 text-[9px] font-mono text-emerald-400 bg-[#05050A]/90 px-2 py-0.5 border border-emerald-500/30">
                RATIO: 16:9 WIDESCREEN
              </div>

              <div className="absolute bottom-2 right-2 z-10 text-[9px] font-mono text-[#8A8FA3] bg-[#05050A]/90 px-2 py-0.5 border border-[#1F1F2E]">
                SOURCE: AUTO-VIDEO-ENGINE / ANIMATIC
              </div>
            </div>

            {/* Navigation Switchers Below Plate */}
            <div className="flex items-center justify-between text-xs font-mono text-[#8A8FA3] pt-1">
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 bg-[#05050A] border border-[#1F1F2E] hover:border-[#00E5FF] hover:text-white flex items-center gap-1 transition-all"
              >
                <ChevronLeft size={14} />
                <span>PREV SCENE</span>
              </button>

              <span className="text-[11px] text-slate-400">
                PLATE {activeIdx + 1} OF {dict.phases.length}
              </span>

              <button
                onClick={handleNext}
                className="px-3 py-1.5 bg-[#05050A] border border-[#1F1F2E] hover:border-[#00E5FF] hover:text-white flex items-center gap-1 transition-all"
              >
                <span>NEXT SCENE</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: TECHNICAL SPECIFICATIONS & PRODUCTION BLUEPRINT */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              {/* Scene Tag & Frame Timeline */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="px-2 py-0.5 bg-[#5322FF] text-white font-mono text-[10px] font-bold">
                  {activePhase.phase}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {activePhase.frames}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-sans font-black text-white mb-3 tracking-tight">
                {activePhase.title}
              </h3>

              {/* NARRATION BOX (Voiceover VN & KR) */}
              <div className="bg-[#05050A] border border-[#00E5FF]/40 p-3.5 mb-3 space-y-2 relative">
                <div className="text-[10px] font-mono font-bold text-[#00E5FF] flex items-center gap-1.5">
                  <span>🗣️ LỜI DẪN (VOICEOVER NARRATION)</span>
                </div>
                {activePhase.narrationVn && (
                  <p className="text-xs font-sans text-white italic leading-relaxed">
                    VN: "{activePhase.narrationVn}"
                  </p>
                )}
                {activePhase.narrationKr && (
                  <p className="text-xs font-sans text-emerald-300 font-medium leading-relaxed">
                    KR: "{activePhase.narrationKr}"
                  </p>
                )}
              </div>

              {/* VISUAL BLUEPRINT & ACTING */}
              <div className="space-y-3 font-mono text-xs">
                <div className="bg-[#05050A] border border-[#1F1F2E] p-3">
                  <span className="text-[#00E5FF] block text-[10px] font-bold mb-1">
                    👁️ BỐI CẢNH & HÀNH ĐỘNG (VISUAL & ACTING)
                  </span>
                  <span className="font-sans text-xs text-slate-300 leading-relaxed block">
                    {activePhase.visual}
                  </span>
                </div>

                {/* MATHEMATICAL MOTION SPEC */}
                <div className="bg-[#05050A] border border-[#1F1F2E] p-3">
                  <span className="text-[#10B981] block text-[10px] font-bold mb-1">
                    📐 QUY CHUẨN ĐỘNG HỌC (MATHEMATICAL MOTION SPECS)
                  </span>
                  <span className="font-mono text-[11px] text-cyan-200 leading-relaxed block">
                    {activePhase.motionSpec}
                  </span>
                </div>

                {/* AUDIO CUE */}
                <div className="bg-[#05050A] border border-[#1F1F2E] p-3">
                  <span className="text-[#5322FF] block text-[10px] font-bold mb-1">
                    🔊 FRAME-SYNCED AUDIO CUE / SFX
                  </span>
                  <span className="font-sans text-xs text-slate-300 leading-relaxed block">
                    {activePhase.audioCue}
                  </span>
                </div>
              </div>
            </div>

            {/* BOTTOM CAD SPECS & CTA */}
            <div className="pt-3 border-t border-[#1F1F2E] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
              <span className="text-[#8A8FA3]">
                {activePhase.perspective || 'LAYER: REMOTION COMPOSITE'}
              </span>

              <a
                href="/downloads/Crabit_Storyboard_Master.pdf"
                download="Crabit_Storyboard_Master.pdf"
                className="text-[#00E5FF] hover:underline font-bold flex items-center gap-1"
              >
                <span>TẢI BẢN PDF BLUEPRINT</span>
                <Download size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
