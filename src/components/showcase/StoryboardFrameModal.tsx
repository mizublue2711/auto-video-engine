import React, { useState, useEffect } from 'react';
import { X, Film, Download, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';
import { ProjectComprehensive, SupportedLang } from '../../data/types';

interface StoryboardFrameModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: ShowcaseDictionary['storyboardViewer'];
  activeProject: ProjectComprehensive;
  currentLang: SupportedLang;
}

export const StoryboardFrameModal: React.FC<StoryboardFrameModalProps> = ({
  isOpen,
  onClose,
  dict,
  activeProject,
  currentLang,
}) => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const blueprint = activeProject.productionBlueprint;
  const scenes = blueprint?.scenes ?? [];

  useEffect(() => {
    setActivePhaseIndex(0);
    setImgError(false);
  }, [activeProject.id]);

  useEffect(() => {
    setImgError(false);
  }, [activePhaseIndex]);

  if (!isOpen || scenes.length === 0) return null;

  const safeIdx = activePhaseIndex < scenes.length ? activePhaseIndex : 0;
  const activeScene = scenes[safeIdx];
  const pdfUrl = activeProject.downloads.storyboardPdf;
  const pdfFileName = pdfUrl ? pdfUrl.split('/').pop() || 'Storyboard_Blueprint.pdf' : undefined;
  const themeColor = activeProject.themeColor || '#00E5FF';

  const handlePrev = () => {
    setActivePhaseIndex((prev) => (prev > 0 ? prev - 1 : scenes.length - 1));
  };

  const handleNext = () => {
    setActivePhaseIndex((prev) => (prev < scenes.length - 1 ? prev + 1 : 0));
  };

  const gridColsClass =
    scenes.length <= 5
      ? 'grid-cols-2 sm:grid-cols-5 lg:grid-cols-5'
      : 'grid-cols-2 sm:grid-cols-5 lg:grid-cols-10';

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
                {blueprint?.sectionTitle[currentLang] || dict.modalTitle}
              </h3>
              <p className="text-[11px] font-mono text-[#8A8FA3]">
                {blueprint?.subtitle[currentLang] || `${activeProject.telemetry.resolution} • ${activeProject.telemetry.fps}FPS`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pdfUrl && (
              <a
                href={pdfUrl}
                download={pdfFileName}
                className="px-3.5 py-1.5 bg-[#031E2B] border border-[#00E5FF] hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-cyan-glow"
              >
                <Download size={14} />
                <span>{blueprint?.pdfLabel[currentLang] || dict.downloadBtn}</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-[#0D0E17] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#8A8FA3] hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all"
            >
              <X size={14} />
              <span className="hidden sm:inline">ESC</span>
            </button>
          </div>
        </div>

        {/* DYNAMIC TAB SELECTOR STRIP */}
        <div className={`grid ${gridColsClass} gap-1.5 border-b border-[#1F1F2E] bg-[#05050A] p-2`}>
          {scenes.map((scene, idx) => {
            const isActive = safeIdx === idx;
            return (
              <button
                key={scene.id}
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-2 text-left font-mono text-xs transition-all relative ${
                  isActive
                    ? 'bg-[#031E2B] text-white border font-bold shadow-cyan-glow'
                    : 'bg-[#0A0C14] text-[#8A8FA3] hover:text-white border border-[#1F1F2E]'
                }`}
                style={isActive ? { borderColor: `${themeColor}99`, color: themeColor } : undefined}
              >
                <div className="flex items-center justify-between text-[9px] opacity-80 mb-0.5">
                  <span>{scene.id}</span>
                  <span className="text-[8px] px-1 bg-[#05050A] border border-[#1F1F2E] text-slate-400">
                    {scene.tabLabel}
                  </span>
                </div>
                <div className="truncate font-sans font-semibold text-[11px] leading-tight text-white">
                  {scene.title[currentLang]}
                </div>
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: themeColor }}
                  />
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
                  RAW SKETCH PLATE // {activeScene.id}
                </div>

                <div className="absolute top-2 right-2 z-10 text-[9px] font-mono text-[#8A8FA3] bg-[#05050A]/90 px-2 py-0.5 border border-[#1F1F2E]">
                  {activeScene.timecode}
                </div>

                {imgError ? (
                  <div className="flex flex-col items-center justify-center text-slate-500 gap-2 p-6 text-center">
                    <ImageOff size={32} className="opacity-60" />
                    <span className="font-mono text-xs">
                      PLATE_MISSING: {activeScene.plateImageUrl}
                    </span>
                  </div>
                ) : (
                  <img
                    src={activeScene.plateImageUrl}
                    alt={activeScene.title[currentLang]}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                  />
                )}

                <div className="absolute bottom-2 left-2 z-10 text-[9px] font-mono text-emerald-400 bg-[#05050A]/90 px-2 py-0.5 border border-emerald-500/30">
                  {activeScene.ratioTag || 'RATIO: 16:9 WIDESCREEN'}
                </div>

                <div className="absolute bottom-2 right-2 z-10 text-[9px] font-mono text-[#8A8FA3] bg-[#05050A]/90 px-2 py-0.5 border border-[#1F1F2E]">
                  SOURCE: {activeScene.sourceTag || 'AUTO-VIDEO-ENGINE'}
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
                  PLATE {safeIdx + 1} OF {scenes.length}
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
                    {activeScene.phaseTag[currentLang]}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {activeScene.timecode}
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-sans font-black text-white mb-3">
                  {activeScene.title[currentLang]}
                </h4>

                {/* Voiceover Narration Box */}
                <div className="bg-[#0A0C14] border border-[#00E5FF]/40 p-3.5 mb-3 space-y-2">
                  <span className="text-[#00E5FF] block text-[10px] font-mono font-bold">
                    🗣️ VOICEOVER NARRATION
                  </span>
                  {activeScene.voiceover.vn && (
                    <p className="text-xs font-sans text-white italic leading-relaxed">
                      VN: &ldquo;{activeScene.voiceover.vn}&rdquo;
                    </p>
                  )}
                  {activeScene.voiceover.kr && (
                    <p className="text-xs font-sans text-emerald-300 font-medium leading-relaxed">
                      KR: &ldquo;{activeScene.voiceover.kr}&rdquo;
                    </p>
                  )}
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2.5">
                    <span className="text-[#00E5FF] block text-[10px] font-bold mb-0.5">
                      👁️ VISUAL & ACTING
                    </span>
                    <span className="font-sans text-xs text-slate-300 leading-relaxed block">
                      {activeScene.visualActing[currentLang]}
                    </span>
                  </div>

                  <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2.5">
                    <span className="text-[#10B981] block text-[10px] font-bold mb-0.5">
                      📐 MATHEMATICAL MOTION SPEC
                    </span>
                    <span className="font-mono text-xs text-cyan-200 leading-relaxed block">
                      {activeScene.motionSpecs[currentLang]}
                    </span>
                  </div>

                  <div className="bg-[#0A0C14] border border-[#1F1F2E] p-2.5">
                    <span className="text-[#5322FF] block text-[10px] font-bold mb-0.5">
                      🔊 FRAME-SYNCED AUDIO CUE / SFX
                    </span>
                    <span className="font-sans text-xs text-slate-300 leading-relaxed block">
                      {activeScene.audioSfxCue[currentLang]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8FA3] pt-2 border-t border-[#1F1F2E]">
                <span>{activeProject.telemetry.resolution} @ {activeProject.telemetry.fps}FPS</span>
                <span className="text-[#10B981]">[ VERIFIED BY REMOTION ]</span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-4 sm:p-5 border-t border-[#1F1F2E] bg-[#05050A] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#8A8FA3]">
            [ TOTAL SCENES: {scenes.length} PLATES // {activeProject.telemetry.totalFrames} FRAMES ]
          </div>

          <div className="flex items-center gap-3">
            {pdfUrl && (
              <a
                href={pdfUrl}
                download={pdfFileName}
                className="px-4 py-2 bg-[#031E2B] border border-[#00E5FF] hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] font-mono font-bold text-xs flex items-center gap-2 transition-all shadow-cyan-glow"
              >
                <Download size={14} />
                <span>{blueprint?.pdfLabel[currentLang] || dict.downloadBtn}</span>
              </a>
            )}

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
