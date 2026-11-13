import React, { useState } from 'react';
import { X, Layers, Clock, Camera, Volume2, Film, Download, CheckCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';

interface StoryboardFrameModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: ShowcaseDictionary['storyboardViewer'];
}

export const StoryboardFrameModal: React.FC<StoryboardFrameModalProps> = ({
  isOpen,
  onClose,
  dict,
}) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);

  if (!isOpen) return null;

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

  const activePhase = dict.phases[activePhaseIndex] || dict.phases[0];

  const handlePrev = () => {
    setActivePhaseIndex((prev) => (prev > 0 ? prev - 1 : dict.phases.length - 1));
  };

  const handleNext = () => {
    setActivePhaseIndex((prev) => (prev < dict.phases.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 brutalist-strict">
      <div className="bg-[#0A0C14] border-2 border-[#00E5FF] w-full max-w-6xl max-h-[94vh] flex flex-col shadow-cyan-glow animate-in fade-in zoom-in duration-150">
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 border-b border-[#1F1F2E] flex flex-wrap items-center justify-between gap-3 bg-[#05050A]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#031E2B] border border-[#00E5FF]/40 text-[#00E5FF]">
              <Film size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-sans font-black text-white text-base sm:text-lg tracking-wider uppercase">
                {dict.modalTitle}
              </h3>
              <p className="text-[11px] font-mono text-[#8A8FA3]">
                REMOTION 4.0 MASTER COMPOSITE BLUEPRINT // 590 FRAMES @ 24FPS (~24.6s)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* PROMINENT DOWNLOAD PDF BUTTON IN MODAL HEADER */}
            <a
              href="/downloads/Crabit_Storyboard_Master.pdf"
              download="Crabit_Storyboard_Master.pdf"
              className="px-3.5 py-1.5 bg-[#031E2B] border border-[#00E5FF] hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-cyan-glow"
            >
              <Download size={14} />
              <span>{dict.downloadBtn || 'DOWNLOAD BLUEPRINT PDF'}</span>
            </a>

            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-[#0D0E17] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#8A8FA3] hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all"
            >
              <X size={14} />
              <span className="hidden sm:inline">ESC</span>
            </button>
          </div>
        </div>

        {/* 10-PHASE TAB SELECTOR STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-1.5 border-b border-[#1F1F2E] bg-[#05050A] p-2">
          {dict.phases.map((phase, idx) => {
            const isActive = activePhaseIndex === idx;
            const shortTag = idx === 0 ? 'SCENE 1' :
                             idx === 1 ? 'SCENE 2' :
                             idx >= 2 && idx <= 6 ? `PHA ${idx - 1}` :
                             idx === 7 ? 'SCENE 3' :
                             idx === 8 ? 'SCENE 4' : 'OUTRO';
            const numStr = idx < 9 ? `0${idx + 1}` : `${idx + 1}`;
            return (
              <button
                key={idx}
                onClick={() => setActivePhaseIndex(idx)}
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

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#05050A] border border-[#1F1F2E] p-4 sm:p-6">
            {/* Visual Frame Plate (Left Column) */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              <div className="aspect-video bg-[#0A0C14] border border-[#1F1F2E] flex flex-col items-center justify-center p-3 relative overflow-hidden group">
                <div className="absolute top-2 left-2 z-10 text-[9px] font-mono text-[#00E5FF] bg-[#05050A]/90 px-2.5 py-1 border border-[#00E5FF]/40">
                  RAW SKETCH PLATE // 0{activePhaseIndex + 1}
                </div>

                <div className="absolute top-2 right-2 z-10 text-[9px] font-mono text-[#8A8FA3] bg-[#05050A]/90 px-2 py-0.5 border border-[#1F1F2E]">
                  {activePhase.frames}
                </div>

                <img
                  src={phaseImages[activePhaseIndex]}
                  alt={activePhase.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                />

                <div className="absolute bottom-2 left-2 z-10 text-[9px] font-mono text-emerald-400 bg-[#05050A]/90 px-2 py-0.5 border border-emerald-500/30">
                  ASPECT: 16:9 WIDESCREEN
                </div>

                <div className="absolute bottom-2 right-2 z-10 text-[9px] font-mono text-[#8A8FA3] bg-[#05050A]/90 px-2 py-0.5 border border-[#1F1F2E]">
                  SOURCE: AUTO-VIDEO-ENGINE
                </div>
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center justify-between text-xs font-mono text-[#8A8FA3] pt-1">
                <button
                  onClick={handlePrev}
                  className="px-3 py-1.5 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] hover:text-white flex items-center gap-1 transition-all"
                >
                  <ChevronLeft size={14} />
                  <span>PREV SCENE</span>
                </button>

                <span className="text-[11px] text-slate-400">
                  PLATE {activePhaseIndex + 1} OF {dict.phases.length}
                </span>

                <button
                  onClick={handleNext}
                  className="px-3 py-1.5 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] hover:text-white flex items-center gap-1 transition-all"
                >
                  <span>NEXT SCENE</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Phase Specs Breakdown (Right Column) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-[#5322FF] text-white font-mono text-[10px] font-bold">
                    {activePhase.phase}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {activePhase.frames}
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-sans font-black text-white mb-3">
                  {activePhase.title}
                </h4>

                {/* Voiceover Narration Box (VN & KR) */}
                <div className="bg-[#0A0C14] border border-[#00E5FF]/40 p-3.5 mb-3 space-y-2">
                  <span className="text-[#00E5FF] block text-[10px] font-mono font-bold">
                    🗣️ LỜI DẪN (VOICEOVER NARRATION)
                  </span>
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

                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2.5">
                    <span className="text-[#00E5FF] block text-[10px] font-bold mb-0.5">
                      👁️ BỐI CẢNH & HÀNH ĐỘNG (VISUAL CONTEXT)
                    </span>
                    <span className="font-sans text-xs text-slate-300 leading-relaxed block">
                      {activePhase.visual}
                    </span>
                  </div>

                  <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2.5">
                    <span className="text-[#10B981] block text-[10px] font-bold mb-0.5">
                      📐 QUY CHUẨN ĐỘNG HỌC (MATHEMATICAL MOTION SPEC)
                    </span>
                    <span className="font-mono text-xs text-cyan-200 leading-relaxed block">
                      {activePhase.motionSpec}
                    </span>
                  </div>

                  <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2.5">
                    <span className="text-[#5322FF] block text-[10px] font-bold mb-0.5">
                      🔊 FRAME-SYNCED AUDIO CUE / SFX
                    </span>
                    <span className="font-sans text-xs text-slate-300 leading-relaxed block">
                      {activePhase.audioCue}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8FA3] pt-2 border-t border-[#1F1F2E]">
                <span>TIMELINE: 1920×1080 @ 24FPS</span>
                <span className="text-[#10B981]">[ VERIFIED BY REMOTION ]</span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 sm:p-5 border-t border-[#1F1F2E] bg-[#05050A] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#8A8FA3]">
            [ TOTAL SCENES: 9 PLATES // MASTER RUNTIME: 590 FRAMES (~24.58s) ]
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/downloads/Crabit_Storyboard_Master.pdf"
              download="Crabit_Storyboard_Master.pdf"
              className="px-4 py-2 bg-[#031E2B] border border-[#00E5FF] hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-cyan-glow"
            >
              <Download size={14} />
              <span>{dict.downloadBtn || 'DOWNLOAD BLUEPRINT PDF'}</span>
            </a>

            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#5322FF] border border-[#00E5FF] hover:bg-[#00E5FF] text-white hover:text-[#05050A] font-mono font-bold text-xs transition-all mechanical-chisel-sm"
            >
              {dict.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
