import React, { useState } from 'react';
import { FileText, Download, Film, AlertTriangle, X, Mail, Sparkles, Gem, HardDriveDownload } from 'lucide-react';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';
import { ProjectComprehensive, SupportedLang } from '../../data/types';

interface DeliverablesHubProps {
  dict: ShowcaseDictionary['deliverables'];
  activeProject: ProjectComprehensive;
  currentLang: SupportedLang;
  onOpenStoryboard: () => void;
}

export const DeliverablesHub: React.FC<DeliverablesHubProps> = ({
  dict,
  activeProject,
  currentLang,
  onOpenStoryboard,
}) => {
  const [showManualModal, setShowManualModal] = useState(false);
  const isChaiProject = activeProject.id === 'chai-meritz-2611';

  const aeModalCopy = {
    tag: isChaiProject ? 'CHAI × MERITZ // MANUAL WORKFLOW ALERT' : dict.modal.tag,
    headline: activeProject.downloads.aeTrapConfig.title[currentLang],
    body: activeProject.downloads.aeTrapConfig.bodyText[currentLang],
    bodyHighlight: isChaiProject
      ? currentLang === 'kr'
        ? 'After Effects 수작업으로는 한국어 자막 키프레임과 오디오 싱크에만 수주가 소요됩니다.'
        : currentLang === 'en'
        ? 'Manual After Effects rebuilding would cost weeks of tedious keyframe & audio syncing.'
        : 'Dựng lại thủ công trên After Effects sẽ tiêu tốn hàng tuần căn keyframe phụ đề và âm thanh.'
      : dict.modal.bodyHighlight,
    btnHire: dict.modal.btnHire,
    orDivider: dict.modal.orDivider,
    btnAutomate: dict.modal.btnAutomate,
    mailto: activeProject.downloads.aeTrapConfig.hireUrl,
  };

  return (
    <section id="deliverables" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center brutalist-strict">
      {/* SECTION HEADER */}
      <div className="mb-14 text-center max-w-3xl mx-auto border-b border-[#1F1F2E] pb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#10B981] px-2.5 py-1 bg-[#0A1A14] border border-[#10B981]/40 mb-3">
          <span className="w-1.5 h-1.5 bg-[#10B981]" />
          <span>{dict.sectionTag}</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-black text-white tracking-tight uppercase">
          {dict.sectionTitle}
        </h2>
        <p className="text-sm md:text-base text-[#8A8FA3] mt-2 font-sans">
          {dict.sectionDesc}
        </p>
      </div>

      {/* GRID NÚT BÀN GIAO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {/* Nút 1: Storyboard Showcase (Opens Interactive In-Project Storyboard Modal & Direct PDF Download) */}
        <div className="p-6 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] transition-all flex flex-col justify-between group shadow-lg relative">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#00E5FF] font-bold">[ 01 // SPEC ]</span>
              <div className="p-2 bg-[#05050A] border border-[#1F1F2E] text-[#00E5FF] group-hover:border-[#00E5FF] transition-all">
                <FileText size={20} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-lg font-sans font-black text-white mb-1 group-hover:text-[#00E5FF] transition-colors">
              {dict.storyboard.title}
            </h3>
            <p className="text-xs text-[#8A8FA3] font-sans leading-relaxed mb-6">
              {dict.storyboard.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-[#1F1F2E] flex items-center justify-between gap-2">
            {!isChaiProject && (
              <button
                onClick={onOpenStoryboard}
                className="px-3 py-1.5 bg-[#031E2B] border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#05050A] font-mono font-bold text-xs transition-all cursor-pointer"
              >
                {dict.storyboard.action} ↗
              </button>
            )}
            {activeProject.downloads.storyboardPdf && (
              <a
                href={activeProject.downloads.storyboardPdf}
                download
                className="px-2.5 py-1.5 bg-[#0D0E17] border border-[#1F1F2E] hover:border-[#10B981] text-[#10B981] transition-all flex items-center gap-1 text-[11px] font-mono font-bold"
                title="Download Master Blueprint PDF"
              >
                <Download size={13} />
                <span>{isChaiProject ? '5-CUT TIMELINE PDF' : 'PDF'}</span>
              </a>
            )}
          </div>
        </div>

        {/* Nút 2: SVG Assets / Keyframe Stills Zip */}
        <a
          href={activeProject.downloads.assetsZip || '/downloads/Crabit_Lego_Assets_SVG.zip'}
          download
          className="p-6 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] transition-all flex flex-col justify-between group shadow-lg relative"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#10B981] font-bold">
                {isChaiProject ? '[ 02 // REMOTION ASSETS ]' : '[ 02 // VECTOR ]'}
              </span>
              <div className="p-2 bg-[#05050A] border border-[#1F1F2E] text-[#10B981] group-hover:border-[#10B981] transition-all">
                <Gem size={20} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-lg font-sans font-black text-white mb-1 group-hover:text-[#10B981] transition-colors">
              {isChaiProject ? 'Remotion Components & Brand Assets (.ZIP)' : dict.svgAssets.title}
            </h3>
            <p className="text-xs text-[#8A8FA3] font-sans leading-relaxed mb-6">
              {isChaiProject
                ? 'ChaiTopBanner, ChaiDynamicSubtitle, ChaiMeritzEndingCard, ChaiSquareDramaScene & Meritz brand logos.'
                : dict.svgAssets.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-[#1F1F2E] flex items-center justify-between text-xs font-mono font-bold text-[#10B981]">
            <span>{isChaiProject ? 'DOWNLOAD COMPONENTS ZIP' : dict.svgAssets.action}</span>
            <Download size={14} />
          </div>
        </a>

        {/* Nút 3: MP4 Master Commercial */}
        <div className="p-6 bg-[#0A0C14] border-2 border-[#00E5FF] shadow-cyan-glow hover:scale-[1.02] transition-all flex flex-col justify-between group relative">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#00E5FF] font-bold">[ 03 // MASTER ]</span>
              <div className="p-2 bg-[#031E2B] border border-[#00E5FF]/40 text-[#00E5FF]">
                <Film size={20} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-lg font-sans font-black text-white mb-1">
              {dict.masterVideo.title}
            </h3>
            <p className="text-xs text-[#00E5FF]/80 font-sans leading-relaxed mb-6">
              {isChaiProject
                ? `${activeProject.telemetry.resolution} • ${activeProject.telemetry.audioSpec}`
                : dict.masterVideo.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-[#00E5FF]/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-white">
            <a
              href={activeProject.downloads.mp4Master}
              target={activeProject.downloads.mp4Master.startsWith('http') ? '_blank' : undefined}
              rel={activeProject.downloads.mp4Master.startsWith('http') ? 'noopener noreferrer' : undefined}
              download
              className="flex items-center gap-1.5 hover:text-[#00E5FF] transition-colors"
            >
              <span>{isChaiProject ? '9:16 VERTICAL' : dict.masterVideo.action}</span>
              <Download size={14} className="text-[#00E5FF]" />
            </a>
            {activeProject.downloads.mp4Square && (
              <a
                href={activeProject.downloads.mp4Square}
                target={activeProject.downloads.mp4Square.startsWith('http') ? '_blank' : undefined}
                rel={activeProject.downloads.mp4Square.startsWith('http') ? 'noopener noreferrer' : undefined}
                download
                className="px-2 py-0.5 bg-[#031E2B] border border-[#00E5FF]/50 text-[#00E5FF] hover:bg-[#00E5FF] hover:text-[#05050A] text-[10px] transition-all"
              >
                ⬇ 1:1 SQUARE
              </a>
            )}
          </div>
        </div>

        {/* Nút 4: After Effects (.AEP) - TRIGGER POPUP */}
        <button
          onClick={() => setShowManualModal(true)}
          className="p-6 bg-[#0A0C14] border border-amber-500/40 hover:border-amber-400 transition-all flex flex-col justify-between group shadow-lg cursor-pointer text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 pointer-events-none" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-amber-400 font-bold">
                {dict.afterEffects.warningTag}
              </span>
              <div className="p-2 bg-[#05050A] border border-amber-500/30 text-amber-400 group-hover:rotate-12 transition-transform">
                <AlertTriangle size={20} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-lg font-sans font-black text-amber-300 mb-1">
              {dict.afterEffects.title}
            </h3>
            <p className="text-xs text-[#8A8FA3] font-sans leading-relaxed mb-6">
              {dict.afterEffects.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs font-mono font-bold text-amber-400">
            <span>{dict.afterEffects.action}</span>
            <span>⚠️</span>
          </div>
        </button>
      </div>

      {/* POPUP MODAL: "THE MANUAL TRAP" (CÚ TWIST CHIẾN LƯỢC) */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 brutalist-strict">
          <div className="bg-[#0A0C14] border-2 border-[#00E5FF] p-6 sm:p-10 max-w-lg w-full text-center relative shadow-cyan-glow animate-in fade-in zoom-in duration-150">
            {/* Close Button */}
            <button
              onClick={() => setShowManualModal(false)}
              className="absolute top-4 right-4 p-1.5 bg-[#0D0E17] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#8A8FA3] hover:text-white transition-all"
            >
              <X size={16} />
            </button>

            {/* Warning Icon Banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#031E2B] border border-[#00E5FF]/40 text-[#00E5FF] font-mono text-[10px] font-bold uppercase mb-4">
              <span className="w-1.5 h-1.5 bg-amber-400 animate-ping" />
              <span>{aeModalCopy.tag}</span>
            </div>

            <div className="text-4xl my-3">⏳ ➔ ⚡</div>

            <h3 className="text-2xl font-sans font-black text-white mb-3 tracking-tight uppercase">
              {aeModalCopy.headline}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-2 font-sans">
              {aeModalCopy.body}
            </p>

            <div className="bg-[#05050A] border border-[#00E5FF]/40 p-3 my-5 text-xs font-mono text-[#00E5FF] font-bold">
              {aeModalCopy.bodyHighlight}
            </div>

            {/* ACTION CTA BOX */}
            <div className="space-y-3">
              <a
                href={aeModalCopy.mailto}
                className="w-full py-3 px-6 bg-[#5322FF] hover:bg-[#00E5FF] text-white hover:text-[#05050A] font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all mechanical-chisel shadow-cyan-glow"
              >
                <Mail size={16} />
                <span>{aeModalCopy.btnHire}</span>
              </a>

              <div className="text-[10px] font-mono text-[#8A8FA3] uppercase py-1">
                ── {aeModalCopy.orDivider} ──
              </div>

              <a
                href="#pipeline"
                onClick={() => setShowManualModal(false)}
                className="w-full py-3 px-6 bg-[#031E2B] border border-[#00E5FF]/60 hover:bg-[#00E5FF]/20 text-[#00E5FF] font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles size={16} />
                <span>{aeModalCopy.btnAutomate}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
