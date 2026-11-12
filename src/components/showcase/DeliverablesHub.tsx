import React, { useState } from 'react';
import { FileText, Download, Film, AlertTriangle, X, Mail, Sparkles, Gem, HardDriveDownload } from 'lucide-react';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';

interface DeliverablesHubProps {
  dict: ShowcaseDictionary['deliverables'];
  onOpenStoryboard: () => void;
}

export const DeliverablesHub: React.FC<DeliverablesHubProps> = ({
  dict,
  onOpenStoryboard,
}) => {
  const [showManualModal, setShowManualModal] = useState(false);

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
        {/* Nút 1: Storyboard Showcase (Opens Interactive In-Project Storyboard Modal) */}
        <button
          onClick={onOpenStoryboard}
          className="p-6 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] transition-all flex flex-col justify-between group shadow-lg relative cursor-pointer"
        >
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

          <div className="pt-3 border-t border-[#1F1F2E] flex items-center justify-between text-xs font-mono font-bold text-[#00E5FF]">
            <span>{dict.storyboard.action}</span>
            <span>↗</span>
          </div>
        </button>

        {/* Nút 2: SVG Assets Zip */}
        <a
          href="/downloads/Crabit_Lego_Assets_SVG.zip"
          download="Crabit_Lego_Assets_SVG.zip"
          className="p-6 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] transition-all flex flex-col justify-between group shadow-lg relative"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#10B981] font-bold">[ 02 // VECTOR ]</span>
              <div className="p-2 bg-[#05050A] border border-[#1F1F2E] text-[#10B981] group-hover:border-[#10B981] transition-all">
                <Gem size={20} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-lg font-sans font-black text-white mb-1 group-hover:text-[#10B981] transition-colors">
              {dict.svgAssets.title}
            </h3>
            <p className="text-xs text-[#8A8FA3] font-sans leading-relaxed mb-6">
              {dict.svgAssets.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-[#1F1F2E] flex items-center justify-between text-xs font-mono font-bold text-[#10B981]">
            <span>{dict.svgAssets.action}</span>
            <Download size={14} />
          </div>
        </a>

        {/* Nút 3: MP4 Master Commercial */}
        <a
          href="/downloads/Crabit_Korea_Commercial_1080p.mp4"
          download="Crabit_Korea_Commercial_1080p.mp4"
          className="p-6 bg-[#0A0C14] border-2 border-[#00E5FF] shadow-cyan-glow hover:scale-[1.02] transition-all flex flex-col justify-between group relative"
        >
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
              {dict.masterVideo.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-[#00E5FF]/30 flex items-center justify-between text-xs font-mono font-bold text-white">
            <span>{dict.masterVideo.action}</span>
            <Download size={14} className="text-[#00E5FF]" />
          </div>
        </a>

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
              <span>{dict.modal.tag}</span>
            </div>

            <div className="text-4xl my-3">⏳ ➔ ⚡</div>

            <h3 className="text-2xl font-sans font-black text-white mb-3 tracking-tight uppercase">
              {dict.modal.headline}
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed mb-2 font-sans">
              {dict.modal.body}
            </p>

            <div className="bg-[#05050A] border border-[#00E5FF]/40 p-3 my-5 text-xs font-mono text-[#00E5FF] font-bold">
              {dict.modal.bodyHighlight}
            </div>

            {/* ACTION CTA BOX */}
            <div className="space-y-3">
              <a
                href="mailto:mizu2711@gmail.com?subject=[CRABIT OFFER] Yêu cầu dựng thủ công bằng After Effects (.AEP)&body=Chào Thủy Vũ (Mizu2711),%0D%0A%0D%0ATôi đã xem qua Crabit Video-as-Code Showcase và rất ấn tượng với pipeline tự động hóa. Tôi muốn trao đổi về dự án:"
                className="w-full py-3 px-6 bg-[#5322FF] hover:bg-[#00E5FF] text-white hover:text-[#05050A] font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all mechanical-chisel shadow-cyan-glow"
              >
                <Mail size={16} />
                <span>{dict.modal.btnHire}</span>
              </a>

              <div className="text-[10px] font-mono text-[#8A8FA3] uppercase py-1">
                ── {dict.modal.orDivider} ──
              </div>

              <a
                href="#pipeline"
                onClick={() => setShowManualModal(false)}
                className="w-full py-3 px-6 bg-[#031E2B] border border-[#00E5FF]/60 hover:bg-[#00E5FF]/20 text-[#00E5FF] font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles size={16} />
                <span>{dict.modal.btnAutomate}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
