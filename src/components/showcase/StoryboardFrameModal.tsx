import React, { useState } from 'react';
import { X, Layers, Clock, Camera, Volume2, Film, Download, CheckCircle, ExternalLink } from 'lucide-react';
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
    '/props/bg_classroom_hagwon.svg',
    '/props/prop_crabit_phone_hero.svg',
    '/props/mascot_crabit_carat_crystal.svg',
    '/props/prop_chalkboard_math.svg',
    '/props/ui_crabit_card_base_master.svg',
  ];

  const activePhase = dict.phases[activePhaseIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 brutalist-strict">
      <div className="bg-[#0A0C14] border-2 border-[#00E5FF] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-cyan-glow animate-in fade-in zoom-in duration-150">
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-6 border-b border-[#1F1F2E] flex items-center justify-between bg-[#05050A]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#031E2B] border border-[#00E5FF]/40 text-[#00E5FF]">
              <Film size={18} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-sans font-black text-white text-base sm:text-lg tracking-wider">
                {dict.modalTitle}
              </h3>
              <p className="text-[11px] font-mono text-[#8A8FA3]">
                DIRECT COMPOSITION SAMPLE // REMOTION 4.0 MASTER COMPOSITE SCENE
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[#0D0E17] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#8A8FA3] hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all"
          >
            <X size={14} />
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Phase Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 border border-[#1F1F2E] bg-[#05050A] p-1.5">
            {dict.phases.map((phase, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhaseIndex(idx)}
                className={`py-2 px-2.5 text-left font-mono text-xs transition-all ${
                  activePhaseIndex === idx
                    ? 'bg-[#031E2B] text-[#00E5FF] border border-[#00E5FF]/50 font-bold'
                    : 'text-[#8A8FA3] hover:text-white border border-transparent'
                }`}
              >
                <div className="text-[9px] opacity-70">PHASE 0{idx + 1}</div>
                <div className="truncate font-sans font-semibold text-[11px]">{phase.title}</div>
              </button>
            ))}
          </div>

          {/* Active Phase Deep Dive View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#05050A] border border-[#1F1F2E] p-4 sm:p-6">
            {/* Visual Frame Plate */}
            <div className="lg:col-span-6 aspect-video bg-[#0A0C14] border border-[#1F1F2E] flex flex-col items-center justify-center p-4 relative overflow-hidden group">
              <div className="absolute top-2 left-2 text-[9px] font-mono text-[#00E5FF] bg-[#05050A] px-2 py-0.5 border border-[#1F1F2E]">
                SAMPLE PLATE // {activePhase.frames}
              </div>

              <img
                src={phaseImages[activePhaseIndex]}
                alt={activePhase.title}
                className="max-h-52 max-w-full object-contain filter drop-shadow-[0_0_20px_rgba(0,229,255,0.2)]"
              />

              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#8A8FA3] bg-[#05050A] px-2 py-0.5 border border-[#1F1F2E]">
                SRC: AUTO-VIDEO-ENGINE / READY
              </div>
            </div>

            {/* Phase Specs Breakdown */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono text-[#00E5FF] font-bold mb-1">
                  {activePhase.phase}
                </div>
                <h4 className="text-2xl font-sans font-black text-white mb-3">
                  {activePhase.title}
                </h4>

                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2.5">
                    <span className="text-[#00E5FF] block text-[10px] font-bold mb-0.5">
                      👁️ VISUAL CONTEXT
                    </span>
                    <span className="font-sans text-xs text-slate-300">{activePhase.visual}</span>
                  </div>

                  <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2.5">
                    <span className="text-[#10B981] block text-[10px] font-bold mb-0.5">
                      📐 MATHEMATICAL MOTION SPEC
                    </span>
                    <span className="font-sans text-xs text-slate-300">{activePhase.motionSpec}</span>
                  </div>

                  <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2.5">
                    <span className="text-[#5322FF] block text-[10px] font-bold mb-0.5">
                      🔊 FRAME-SYNCED AUDIO CUE
                    </span>
                    <span className="font-sans text-xs text-slate-300">{activePhase.audioCue}</span>
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
        <div className="p-4 sm:p-6 border-t border-[#1F1F2E] bg-[#05050A] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#8A8FA3]">
            [ TOTAL PHASES: 5 // RUNTIME: 894 FRAMES (~37.25s) ]
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#5322FF] border border-[#00E5FF] hover:bg-[#00E5FF] text-white hover:text-[#05050A] font-mono font-bold text-xs transition-all mechanical-chisel-sm"
          >
            {dict.close}
          </button>
        </div>
      </div>
    </div>
  );
};
