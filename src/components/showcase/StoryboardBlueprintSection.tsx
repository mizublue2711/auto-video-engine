import React, { useState, useEffect } from 'react';
import { Download, ChevronLeft, ChevronRight, Maximize2, ImageOff } from 'lucide-react';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';
import { ProjectComprehensive, SupportedLang } from '../../data/types';

interface StoryboardBlueprintSectionProps {
  dict: ShowcaseDictionary['storyboardViewer'];
  activeProject: ProjectComprehensive;
  currentLang: SupportedLang;
  onOpenModal: () => void;
}

const CARD_LABELS: Record<
  SupportedLang,
  {
    voiceover: string;
    visual: string;
    motion: string;
    audio: string;
    prev: string;
    next: string;
    plateOf: (idx: number, total: number) => string;
    pdfBottom: string;
  }
> = {
  vi: {
    voiceover: '🗣️ LỜI DẪN (VOICEOVER NARRATION)',
    visual: '👁️ BỐI CẢNH & HÀNH ĐỘNG (VISUAL & ACTING)',
    motion: '📐 QUY CHUẨN ĐỘNG HỌC (MATHEMATICAL MOTION SPECS)',
    audio: '🔊 FRAME-SYNCED AUDIO CUE / SFX',
    prev: 'CẢNH TRƯỚC',
    next: 'CẢNH TIẾP',
    plateOf: (idx, total) => `PLATE ${idx} / ${total}`,
    pdfBottom: 'TẢI BẢN PDF BLUEPRINT',
  },
  kr: {
    voiceover: '🗣️ 내레이션 (VOICEOVER NARRATION)',
    visual: '👁️ 비주얼 & 액팅 (VISUAL & ACTING)',
    motion: '📐 수학적 모션 규격 (MATHEMATICAL MOTION SPECS)',
    audio: '🔊 프레임 싱크 오디오 큐 / SFX',
    prev: '이전 컷',
    next: '다음 컷',
    plateOf: (idx, total) => `PLATE ${idx} / ${total}`,
    pdfBottom: '블루프린트 PDF 다운로드',
  },
  en: {
    voiceover: '🗣️ VOICEOVER NARRATION',
    visual: '👁️ VISUAL & ACTING',
    motion: '📐 MATHEMATICAL MOTION SPECS',
    audio: '🔊 FRAME-SYNCED AUDIO CUE / SFX',
    prev: 'PREV SCENE',
    next: 'NEXT SCENE',
    plateOf: (idx, total) => `PLATE ${idx} OF ${total}`,
    pdfBottom: 'DOWNLOAD BLUEPRINT PDF',
  },
};

export const StoryboardBlueprintSection: React.FC<StoryboardBlueprintSectionProps> = ({
  dict,
  activeProject,
  currentLang,
  onOpenModal,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  const blueprint = activeProject.productionBlueprint;
  const scenes = blueprint?.scenes ?? [];

  // Reset active scene index & image error state when switching projects
  useEffect(() => {
    setActiveIdx(0);
    setImgError(false);
  }, [activeProject.id]);

  // Reset image error state when switching scenes
  useEffect(() => {
    setImgError(false);
  }, [activeIdx]);

  if (scenes.length === 0) {
    return null;
  }

  const safeIdx = activeIdx < scenes.length ? activeIdx : 0;
  const activeScene = scenes[safeIdx];
  const labels = CARD_LABELS[currentLang];
  const pdfUrl = activeProject.downloads.storyboardPdf;
  const pdfFileName = pdfUrl ? pdfUrl.split('/').pop() || 'Storyboard_Blueprint.pdf' : undefined;
  const themeColor = activeProject.themeColor || '#00E5FF';

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : scenes.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < scenes.length - 1 ? prev + 1 : 0));
  };

  const gridColsClass =
    scenes.length <= 5
      ? 'grid-cols-2 sm:grid-cols-5 lg:grid-cols-5'
      : 'grid-cols-2 sm:grid-cols-5 lg:grid-cols-10';

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
            {blueprint?.sectionTitle[currentLang] || dict.modalTitle}
          </h2>
          <p className="text-sm md:text-base text-[#8A8FA3] mt-2 font-sans max-w-2xl">
            {blueprint?.subtitle[currentLang] || dict.downloadSubtitle}
          </p>
        </div>

        {/* PROMINENT DIRECT PDF DOWNLOAD BUTTON */}
        <div className="flex flex-wrap items-center gap-3">
          {pdfUrl && (
            <a
              href={pdfUrl}
              download={pdfFileName}
              className="px-5 py-3 bg-[#031E2B] border-2 border-[#00E5FF] hover:bg-[#00E5FF] text-[#00E5FF] hover:text-[#05050A] font-mono font-bold text-xs flex items-center gap-2.5 transition-all shadow-cyan-glow mechanical-chisel"
            >
              <Download size={16} />
              <span>{blueprint?.pdfLabel[currentLang] || dict.downloadBtn}</span>
            </a>
          )}

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

      {/* DYNAMIC SCENE TAB STRIP */}
      <div className={`grid ${gridColsClass} gap-1.5 mb-6 bg-[#05050A] p-2 border border-[#1F1F2E]`}>
        {scenes.map((scene, idx) => {
          const isActive = safeIdx === idx;
          return (
            <button
              key={scene.id}
              onClick={() => setActiveIdx(idx)}
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

      {/* MAIN INTERACTIVE FRAME: 2-COLUMN CAD VIEWER */}
      <div className="bg-[#0A0C14] border-2 border-[#1F1F2E] p-4 sm:p-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: VISUAL PLATE MONITOR */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            <div className="aspect-video bg-[#05050A] border-2 border-[#1F1F2E] flex flex-col items-center justify-center p-3 relative overflow-hidden group">
              {/* Top CAD Plate Header */}
              <div className="absolute top-2 left-2 z-10 flex items-center gap-2 text-[10px] font-mono text-[#00E5FF] bg-[#05050A]/90 px-2.5 py-1 border border-[#00E5FF]/30">
                <span className="w-1.5 h-1.5 bg-[#00E5FF] animate-pulse" />
                <span>RAW SKETCH PLATE // {activeScene.id}</span>
              </div>

              <div className="absolute top-2 right-2 z-10 text-[10px] font-mono text-[#8A8FA3] bg-[#05050A]/90 px-2 py-1 border border-[#1F1F2E]">
                {activeScene.timecode}
              </div>

              {/* Storyboard Visual Plate Image */}
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
                  className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(0,229,255,0.15)] transition-transform duration-200 group-hover:scale-[1.01]"
                />
              )}

              {/* Bottom CAD Overlay */}
              <div className="absolute bottom-2 left-2 z-10 text-[9px] font-mono text-emerald-400 bg-[#05050A]/90 px-2 py-0.5 border border-emerald-500/30">
                {activeScene.ratioTag || 'RATIO: 16:9 WIDESCREEN'}
              </div>

              <div className="absolute bottom-2 right-2 z-10 text-[9px] font-mono text-[#8A8FA3] bg-[#05050A]/90 px-2 py-0.5 border border-[#1F1F2E]">
                SOURCE: {activeScene.sourceTag || 'AUTO-VIDEO-ENGINE / ANIMATIC'}
              </div>
            </div>

            {/* Navigation Switchers Below Plate */}
            <div className="flex items-center justify-between text-xs font-mono text-[#8A8FA3] pt-1">
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 bg-[#05050A] border border-[#1F1F2E] hover:border-[#00E5FF] hover:text-white flex items-center gap-1 transition-all"
              >
                <ChevronLeft size={14} />
                <span>{labels.prev}</span>
              </button>

              <span className="text-[11px] text-slate-400">
                {labels.plateOf(safeIdx + 1, scenes.length)}
              </span>

              <button
                onClick={handleNext}
                className="px-3 py-1.5 bg-[#05050A] border border-[#1F1F2E] hover:border-[#00E5FF] hover:text-white flex items-center gap-1 transition-all"
              >
                <span>{labels.next}</span>
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
                  {activeScene.phaseTag[currentLang]}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {activeScene.timecode}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-sans font-black text-white mb-3 tracking-tight">
                {activeScene.title[currentLang]}
              </h3>

              {/* NARRATION BOX (Voiceover VN & KR) */}
              <div className="bg-[#05050A] border border-[#00E5FF]/40 p-3.5 mb-3 space-y-2 relative">
                <div className="text-[10px] font-mono font-bold text-[#00E5FF] flex items-center gap-1.5">
                  <span>{labels.voiceover}</span>
                </div>
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
                {activeScene.voiceover.en && !activeScene.voiceover.vn && (
                  <p className="text-xs font-sans text-white italic leading-relaxed">
                    EN: &ldquo;{activeScene.voiceover.en}&rdquo;
                  </p>
                )}
              </div>

              {/* VISUAL BLUEPRINT & ACTING */}
              <div className="space-y-3 font-mono text-xs">
                <div className="bg-[#05050A] border border-[#1F1F2E] p-3">
                  <span className="text-[#00E5FF] block text-[10px] font-bold mb-1">
                    {labels.visual}
                  </span>
                  <span className="font-sans text-xs text-slate-300 leading-relaxed block">
                    {activeScene.visualActing[currentLang]}
                  </span>
                </div>

                {/* MATHEMATICAL MOTION SPEC */}
                <div className="bg-[#05050A] border border-[#1F1F2E] p-3">
                  <span className="text-[#10B981] block text-[10px] font-bold mb-1">
                    {labels.motion}
                  </span>
                  <span className="font-mono text-[11px] text-cyan-200 leading-relaxed block">
                    {activeScene.motionSpecs[currentLang]}
                  </span>
                </div>

                {/* AUDIO CUE */}
                <div className="bg-[#05050A] border border-[#1F1F2E] p-3">
                  <span className="text-[#5322FF] block text-[10px] font-bold mb-1">
                    {labels.audio}
                  </span>
                  <span className="font-sans text-xs text-slate-300 leading-relaxed block">
                    {activeScene.audioSfxCue[currentLang]}
                  </span>
                </div>
              </div>
            </div>

            {/* BOTTOM CAD SPECS & CTA */}
            <div className="pt-3 border-t border-[#1F1F2E] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
              <span className="text-[#8A8FA3]">
                {activeScene.depthPerspective?.[currentLang] || 'LAYER: REMOTION COMPOSITE'}
              </span>

              {pdfUrl && (
                <a
                  href={pdfUrl}
                  download={pdfFileName}
                  className="text-[#00E5FF] hover:underline font-bold flex items-center gap-1"
                >
                  <span>{labels.pdfBottom}</span>
                  <Download size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
