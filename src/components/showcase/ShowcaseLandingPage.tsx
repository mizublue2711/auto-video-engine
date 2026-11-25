import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { RemotionPlayerFrame } from './RemotionPlayerFrame';
import { StrategicPillars } from './StrategicPillars';
import { CharacterCastSection } from './CharacterCastSection';
import { DualTrackPipeline } from './DualTrackPipeline';
import { TelemetrySection } from './TelemetrySection';
import { StoryboardBlueprintSection } from './StoryboardBlueprintSection';
import { DeliverablesHub } from './DeliverablesHub';
import { StoryboardFrameModal } from './StoryboardFrameModal';
import { ContactTransmission } from './ContactTransmission';
import { ProjectTabs } from './ProjectTabs';
import { Language, showcaseDict } from '../../i18n/showcaseDict';
import { SHOWCASE_PROJECTS, ProjectComprehensive } from '../../data/projectsConfig';
import { Sparkles, Activity, ShieldCheck, Terminal, Cpu, Film, Monitor } from 'lucide-react';

export const ShowcaseLandingPage: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('vi');
  const [isStoryboardOpen, setIsStoryboardOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // 1. Khởi tạo project dựa vào hash trên URL, mặc định là dự án đầu tiên
  const getInitialProject = (): ProjectComprehensive => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      const found = SHOWCASE_PROJECTS.find((p) => p.id === hash);
      if (found) return found;
    }
    return SHOWCASE_PROJECTS[0];
  };

  const [activeProject, setActiveProject] = useState<ProjectComprehensive>(getInitialProject);

  // 2. Lắng nghe sự kiện đổi URL (khi bấm nút Back / Forward trên trình duyệt)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const found = SHOWCASE_PROJECTS.find((p) => p.id === hash);
      if (found) {
        setActiveProject(found);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Hàm xử lý khi người dùng click chọn Tab
  const handleSelectProject = (project: ProjectComprehensive) => {
    setActiveProject(project);
    window.history.pushState(null, '', `#${project.id}`);
  };

  const dict = showcaseDict[currentLang];
  const isChaiProject = activeProject.id === 'chai-meritz-2611';

  return (
    <div className="min-h-screen bg-[#05050A] text-white cad-grid-bg relative selection:bg-[#00E5FF] selection:text-[#05050A] brutalist-strict">
      {/* 1. FIXED TOP NAVBAR */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        dict={dict.nav}
        githubUrl="https://github.com/mizublue2711/auto-video-engine"
        portfolioUrl="https://thuy-vu-designer.framer.website/"
      />

      {/* 2. SECTION 1: HERO HEADER & REMOTION VIDEO-AS-CODE PLAYER */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto text-center relative">
        {/* Subtle Ambient Background Cyan Radial */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00E5FF]/5 blur-3xl pointer-events-none rounded-full" />

        {/* PROJECT SWITCHER TABS */}
        <ProjectTabs
          activeProjectId={activeProject.id}
          onSelectProject={handleSelectProject}
        />

        {/* NÚT SAO CHÉP LIÊN KẾT TRỰC TIẾP ĐẾN DỰ ÁN HIỆN TẠI */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              const shareUrl = `${window.location.origin}/#${activeProject.id}`;
              navigator.clipboard.writeText(shareUrl);
              setCopySuccess(true);
              setTimeout(() => setCopySuccess(false), 2000);
            }}
            className="text-xs font-mono px-3.5 py-1.5 bg-[#0A0C14] border border-[#1F1F2E] text-slate-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:border-[#00E5FF]/50"
            style={{
              borderColor: copySuccess ? activeProject.themeColor : undefined,
            }}
          >
            <span>🔗 {copySuccess ? 'Copied to Clipboard!' : 'Copy Direct Link:'}</span>
            <span style={{ color: activeProject.themeColor }}>/#{activeProject.id}</span>
          </button>
        </div>

        {/* Top Machine Category Badge */}
        <div
          className="inline-flex items-center gap-2 text-xs font-mono font-bold px-3.5 py-1.5 bg-[#031E2B] border mb-6"
          style={{
            color: activeProject.themeColor,
            borderColor: `${activeProject.themeColor}66`,
            backgroundColor: `${activeProject.themeColor}14`,
          }}
        >
          <span
            className="w-1.5 h-1.5 animate-pulse"
            style={{ backgroundColor: activeProject.themeColor }}
          />
          <span>
            {isChaiProject
              ? `PROJECT 2611 // ${activeProject.categoryBadge} • ${activeProject.client}`
              : dict.hero.categoryBadge}
          </span>
        </div>

        {/* Big Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black text-white tracking-tight uppercase max-w-5xl mx-auto leading-none">
          {isChaiProject ? activeProject.title : dict.hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#8A8FA3] max-w-3xl mx-auto leading-relaxed font-sans">
          {isChaiProject
            ? activeProject.tagline[currentLang]
            : dict.hero.subheadline}
        </p>

        {isChaiProject && (
          <p className="mt-3 text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed font-sans">
            {activeProject.heroSummary[currentLang]}
          </p>
        )}

        {/* 4 Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 my-8 font-mono text-[11px] sm:text-xs">
          <div
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border"
            style={{
              borderColor: `${activeProject.themeColor}66`,
              color: activeProject.themeColor,
            }}
          >
            <span className="w-1.5 h-1.5 bg-[#10B981]" />
            <span>
              {activeProject.telemetry.fps} FPS • {activeProject.telemetry.totalFrames} FRAMES
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border border-[#5322FF]/50 text-white">
            <Cpu size={13} className="text-[#5322FF]" />
            <span>
              {activeProject.architecture.visualTrack.tool} + {activeProject.architecture.codeTrack.tool}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border border-[#1F1F2E] text-slate-300">
            <Monitor size={13} style={{ color: activeProject.themeColor }} />
            <span>{activeProject.telemetry.resolution}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border border-amber-500/40 text-amber-300">
            <Film size={13} className="text-amber-400" />
            <span>{activeProject.telemetry.audioSpec}</span>
          </div>
        </div>

        {/* Center Remotion / Adaptive Video Player Component */}
        <div className="mt-8 mb-12">
          <RemotionPlayerFrame
            dict={dict.hero.player}
            activeProject={activeProject}
            currentLang={currentLang}
          />
        </div>
      </section>

      {/* 3. SECTION 2: BA TRỤ CỘT ĐỘT PHÁ (STRATEGIC VALUE ADDITIONS) */}
      <StrategicPillars dict={dict.pillars} />

      {/* 4. CANONICAL 3-CHARACTER CAST RIGS SECTION */}
      <CharacterCastSection currentLang={currentLang} />

      {/* 5. SECTION 3: QUY TRÌNH KÉP (DUAL-TRACK PIPELINE) */}
      <DualTrackPipeline dict={dict.pipeline} />

      {/* 5. TELEMETRY & MOTION PHYSICS SECTION */}
      <TelemetrySection dict={dict.telemetrySection} />

      {/* 6. PRODUCTION BLUEPRINT & 9-PHASE STORYBOARD SECTION */}
      <StoryboardBlueprintSection
        dict={dict.storyboardViewer}
        onOpenModal={() => setIsStoryboardOpen(true)}
      />

      {/* 6.5. DYNAMIC 8-PILLAR PROJECT MATRIX (READS FROM activeProject) */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
        {/* DUAL-TRACK ARCHITECTURE */}
        <div className="border border-[#1F1F2E] bg-[#0A0C14] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6 border-b border-[#1F1F2E] pb-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold" style={{ color: activeProject.themeColor }}>
              <Activity size={14} />
              <span>DUAL-TRACK ARCHITECTURE // {activeProject.id.toUpperCase()}</span>
            </div>
            <span className="font-mono text-[11px] text-[#8A8FA3]">
              {activeProject.telemetry.linesOfCode} LOC • RENDER {activeProject.telemetry.renderTime}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-4 bg-[#05050A] border border-[#1F1F2E]">
              <div className="text-[11px] font-mono text-[#8A8FA3] mb-1">VISUAL TRACK</div>
              <div className="text-sm font-bold text-white mb-2">{activeProject.architecture.visualTrack.tool}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{activeProject.architecture.visualTrack.role[currentLang]}</p>
            </div>
            <div className="p-4 bg-[#05050A] border border-[#1F1F2E]">
              <div className="text-[11px] font-mono text-[#8A8FA3] mb-1">CODE TRACK</div>
              <div className="text-sm font-bold text-white mb-2">{activeProject.architecture.codeTrack.tool}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{activeProject.architecture.codeTrack.role[currentLang]}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeProject.architecture.guardrails.map((rule) => (
              <span
                key={rule}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#05050A] border border-[#1F1F2E] font-mono text-[11px] text-slate-300"
              >
                <ShieldCheck size={12} style={{ color: activeProject.themeColor }} />
                {rule}
              </span>
            ))}
          </div>
        </div>

        {/* SCENE MATRIX BREAKDOWN */}
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold mb-4" style={{ color: activeProject.themeColor }}>
            <Sparkles size={14} />
            <span>SCENE MATRIX BREAKDOWN ({activeProject.sceneMatrix.length} CUTS)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeProject.sceneMatrix.map((cut) => (
              <div key={cut.cutNumber} className="p-5 bg-[#0A0C14] border border-[#1F1F2E] flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                    <span className="font-bold" style={{ color: activeProject.themeColor }}>{cut.cutNumber}</span>
                    <span className="text-[#8A8FA3]">{cut.frameRange}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{cut.title[currentLang]}</h3>
                  <p className="text-xs text-slate-400 mb-2">{cut.visualPrompt}</p>
                  <div className="p-2.5 bg-[#05050A] border border-[#1F1F2E] text-xs font-mono text-amber-300 mb-2">
                    “{cut.koreanDialogue}”
                  </div>
                  <p className="text-xs text-slate-300">{cut.translation[currentLang]}</p>
                </div>
                <div className="pt-2 border-t border-[#1F1F2E] font-mono text-[10px] text-[#8A8FA3]">
                  {cut.remotionPhysics}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMPONENT FOUNDRY & BUSINESS COMPARISON */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-[#1F1F2E] bg-[#0A0C14] p-6">
            <div className="font-mono text-xs font-bold mb-4" style={{ color: activeProject.themeColor }}>
              LEGO COMPONENT FOUNDRY ({activeProject.components.length})
            </div>
            <div className="space-y-3">
              {activeProject.components.map((comp) => (
                <div key={comp.name} className="p-3 bg-[#05050A] border border-[#1F1F2E]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-white">{comp.name}</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 border border-[#1F1F2E] text-[#8A8FA3]">
                      {comp.category} • {comp.techStack}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{comp.role[currentLang]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#1F1F2E] bg-[#0A0C14] p-6">
            <div className="font-mono text-xs font-bold mb-4" style={{ color: activeProject.themeColor }}>
              BUSINESS COST & SPEED MATRIX
            </div>
            <div className="space-y-3">
              {activeProject.comparison.map((row, idx) => (
                <div key={idx} className="p-3 bg-[#05050A] border border-[#1F1F2E] text-xs">
                  <div className="font-bold text-white mb-2">{row.criteria[currentLang]}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="text-rose-300/90">AE: {row.traditionalAe}</div>
                    <div className="text-emerald-300">Code: {row.videoAsCode}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-[#05050A] border border-[#1F1F2E] flex items-center gap-2 font-mono text-[11px] text-slate-300 overflow-x-auto">
              <Terminal size={13} style={{ color: activeProject.themeColor }} className="shrink-0" />
              <code>{activeProject.cliCommand}</code>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION 4: DELIVERABLES HUB & THE MANUAL TRAP MODAL */}
      <DeliverablesHub
        dict={dict.deliverables}
        activeProject={activeProject}
        currentLang={currentLang}
        onOpenStoryboard={() => setIsStoryboardOpen(true)}
      />

      {/* 8. SECTION 05: TELEMETRY TRANSMISSION & DIRECT CONTACT HUB */}
      <ContactTransmission currentLang={currentLang} />

      {/* 9. INTERACTIVE STORYBOARD MODAL (PROJECT SAMPLE) */}
      <StoryboardFrameModal
        isOpen={isStoryboardOpen}
        onClose={() => setIsStoryboardOpen(false)}
        dict={dict.storyboardViewer}
      />

      {/* 10. FOOTER */}
      <footer className="border-t border-[#1F1F2E] bg-[#05050A] py-12 px-6 lg:px-12 mt-20 text-center font-mono text-xs text-[#8A8FA3]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#0A0C14] border border-[#00E5FF] flex items-center justify-center text-[10px] text-[#00E5FF] font-bold">
              💎
            </div>
            <span className="font-bold text-white tracking-wider">{dict.footer.copyright}</span>
          </div>
          <div className="text-[10px] text-[#8A8FA3] uppercase">
            {dict.footer.techStack}
          </div>
        </div>
      </footer>
    </div>
  );
};
