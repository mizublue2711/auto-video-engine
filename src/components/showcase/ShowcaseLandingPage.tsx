import React, { useState } from 'react';
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
import { Language, showcaseDict } from '../../i18n/showcaseDict';
import { SHOWCASE_PROJECTS, ProjectMetadata } from '../../data/projectsConfig';
import { Sparkles, Activity, ShieldCheck, Terminal, Cpu, Film, Monitor } from 'lucide-react';

export const ShowcaseLandingPage: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('vi');
  const [isStoryboardOpen, setIsStoryboardOpen] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string>(SHOWCASE_PROJECTS[0].id);

  const dict = showcaseDict[currentLang];
  const activeProject: ProjectMetadata =
    SHOWCASE_PROJECTS.find((project) => project.id === activeProjectId) || SHOWCASE_PROJECTS[0];
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
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {SHOWCASE_PROJECTS.map((project, index) => {
            const isActive = project.id === activeProject.id;
            return (
              <button
                key={project.id}
                onClick={() => setActiveProjectId(project.id)}
                style={{
                  borderColor: isActive ? project.themeColor : undefined,
                  boxShadow: isActive ? `0 0 24px ${project.themeColor}28` : undefined,
                }}
                className={`px-4 py-2.5 bg-[#0A0C14] border text-left transition-all font-mono cursor-pointer flex items-center gap-3 ${
                  isActive
                    ? 'text-white'
                    : 'border-[#1F1F2E] text-[#8A8FA3] hover:border-slate-500 hover:text-white'
                }`}
              >
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 border"
                  style={{
                    color: project.themeColor,
                    borderColor: `${project.themeColor}55`,
                    backgroundColor: `${project.themeColor}14`,
                  }}
                >
                  0{index + 1} // {project.aspectRatio}
                </span>
                <div>
                  <div className="text-xs font-bold tracking-wide">{project.title}</div>
                  <div className="text-[10px] text-[#8A8FA3]">{project.badge}</div>
                </div>
              </button>
            );
          })}
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
              ? `PROJECT 2611 // ${activeProject.badge} • ${activeProject.client}`
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
            {activeProject.description[currentLang]}
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
            <span>{activeProject.telemetry.engine}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border border-[#1F1F2E] text-slate-300">
            <Monitor size={13} style={{ color: activeProject.themeColor }} />
            <span>{activeProject.telemetry.resolution}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border border-amber-500/40 text-amber-300">
            <Film size={13} className="text-amber-400" />
            <span>{activeProject.telemetry.audioStandard}</span>
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
