import React, { useState } from 'react';
import { FileText, Download, Film, AlertTriangle, X, Mail, Sparkles, Gem, HardDriveDownload } from 'lucide-react';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';
import { ProjectMetadata, SupportedLang } from '../../data/projectsConfig';

interface DeliverablesHubProps {
  dict: ShowcaseDictionary['deliverables'];
  activeProject: ProjectMetadata;
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

  const aeModalCopy = isChaiProject
    ? currentLang === 'kr'
      ? {
          tag: 'CHAI × MERITZ // 수작업 워크플로우 경고',
          headline: '5컷 숏드라마를 수동으로 제작하시겠습니까?',
          body: 'Chai Communication × Meritz Partners 프로젝트는 듀얼 트랙 아키텍처를 적용했습니다: Genie 4로 텍스트 없는 5개 시네마틱 컷을 생성하고, Remotion으로 24.00 FPS 키네틱 자막과 EBU R128 오디오를 정밀 동기화했습니다.',
          bodyHighlight:
            'After Effects 수작업으로는 한국어 자막 키프레임과 오디오 싱크에만 3일이 소요됩니다.',
          btnHire: '💼 수작업 After Effects(.AEP) 제작 의뢰하기',
          orDivider: '또는 미래를 선택하세요',
          btnAutomate: '🚀 Video-as-Code 자동화 워크플로우 계속 보기!',
          mailto:
            'mailto:mizu2711@gmail.com?subject=[CHAI × MERITZ OFFER] 수작업 After Effects (.AEP) 제작 문의',
        }
      : currentLang === 'en'
      ? {
          tag: 'CHAI × MERITZ // MANUAL WORKFLOW ALERT',
          headline: 'WANT TO HAND-BUILD A 5-CUT SHORT DRAMA?',
          body: 'Chai Communication × Meritz Partners uses a dual-track architecture: Genie 4 generates 5 clean cinematic plates, while Remotion orchestrates deterministic 24.00 FPS kinetic subtitles and EBU R128 audio mastering.',
          bodyHighlight:
            'Building this manually in After Effects would take 3 days of tweaking every Korean subtitle keyframe and audio cue.',
          btnHire: '💼 Hire Me for a Hand-Crafted After Effects (.AEP) File',
          orDivider: 'OR CHOOSE THE FUTURE',
          btnAutomate: '🚀 Automate with Video-as-Code instead!',
          mailto:
            'mailto:mizu2711@gmail.com?subject=[CHAI × MERITZ OFFER] Manual After Effects (.AEP) Inquiry',
        }
      : {
          tag: 'CHAI × MERITZ // CẢNH BÁO QUY TRÌNH THỦ CÔNG',
          headline: 'BẠN MUỐN DỰNG THỦ CÔNG MỘT BẢN SHORT DRAMA 5 CUTS?',
          body: 'Dự án Chai Communication × Meritz Partners ứng dụng kiến trúc kép: Genie 4 sinh phôi điện ảnh 5 cuts sạch chữ, kết hợp Remotion điều phối phụ đề nảy chữ Kinetic chuẩn xác 24.00 FPS và lồng tiếng EBU R128.',
          bodyHighlight:
            'Nếu làm bằng After Effects thủ công, bạn sẽ mất 3 ngày căn từng keyframe phụ đề tiếng Hàn và ghép âm thanh.',
          btnHire: '💼 Thuê tôi ngay để nhận file After Effects dựng tay',
          orDivider: 'HOẶC LỰA CHỌN TƯƠNG LAI',
          btnAutomate: '🚀 Hoặc lựa chọn tương lai: Hãy tự động hóa với Video-as-Code!',
          mailto:
            'mailto:mizu2711@gmail.com?subject=[CHAI × MERITZ OFFER] Yêu cầu dựng thủ công bằng After Effects (.AEP)&body=Chào Thủy Vũ (Mizu2711),%0D%0A%0D%0ATôi đã xem qua dự án Chai Communication × Meritz Partners và muốn trao đổi về file After Effects (.AEP):',
        }
    : {
        tag: dict.modal.tag,
        headline: dict.modal.headline,
        body: dict.modal.body,
        bodyHighlight: dict.modal.bodyHighlight,
        btnHire: dict.modal.btnHire,
        orDivider: dict.modal.orDivider,
        btnAutomate: dict.modal.btnAutomate,
        mailto:
          'mailto:mizu2711@gmail.com?subject=[CRABIT OFFER] Yêu cầu dựng thủ công bằng After Effects (.AEP)&body=Chào Thủy Vũ (Mizu2711),%0D%0A%0D%0ATôi đã xem qua Crabit Video-as-Code Showcase và rất ấn tượng với pipeline tự động hóa. Tôi muốn trao đổi về dự án:',
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
          href={activeProject.downloads.keyframeStillsZip || '/downloads/Crabit_Lego_Assets_SVG.zip'}
          download
          className="p-6 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] transition-all flex flex-col justify-between group shadow-lg relative"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono text-[#10B981] font-bold">
                {isChaiProject ? '[ 02 // KEYFRAME STILLS ]' : '[ 02 // VECTOR ]'}
              </span>
              <div className="p-2 bg-[#05050A] border border-[#1F1F2E] text-[#10B981] group-hover:border-[#10B981] transition-all">
                <Gem size={20} strokeWidth={1.5} />
              </div>
            </div>
            <h3 className="text-lg font-sans font-black text-white mb-1 group-hover:text-[#10B981] transition-colors">
              {isChaiProject ? 'Keyframe Stills Cuts 1–5 (.ZIP)' : dict.svgAssets.title}
            </h3>
            <p className="text-xs text-[#8A8FA3] font-sans leading-relaxed mb-6">
              {isChaiProject
                ? 'cut1_frame36.png – cut5_frame650.png extracted directly from the 24fps Meritz Partners master render.'
                : dict.svgAssets.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-[#1F1F2E] flex items-center justify-between text-xs font-mono font-bold text-[#10B981]">
            <span>{isChaiProject ? 'DOWNLOAD STILLS ZIP' : dict.svgAssets.action}</span>
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
                ? `${activeProject.telemetry.resolution} • ${activeProject.telemetry.audioStandard}`
                : dict.masterVideo.desc}
            </p>
          </div>

          <div className="pt-3 border-t border-[#00E5FF]/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-white">
            <a
              href={activeProject.downloads.mp4Vertical}
              target={activeProject.downloads.mp4Vertical.startsWith('http') ? '_blank' : undefined}
              rel={activeProject.downloads.mp4Vertical.startsWith('http') ? 'noopener noreferrer' : undefined}
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
