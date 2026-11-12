import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { RemotionPlayerFrame } from './RemotionPlayerFrame';
import { StrategicPillars } from './StrategicPillars';
import { DualTrackPipeline } from './DualTrackPipeline';
import { TelemetrySection } from './TelemetrySection';
import { DeliverablesHub } from './DeliverablesHub';
import { StoryboardFrameModal } from './StoryboardFrameModal';
import { ContactTransmission } from './ContactTransmission';
import { Language, showcaseDict } from '../../i18n/showcaseDict';
import { Sparkles, Activity, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export const ShowcaseLandingPage: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('vi');
  const [isStoryboardOpen, setIsStoryboardOpen] = useState(false);

  const dict = showcaseDict[currentLang];

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

        {/* Top Machine Category Badge */}
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#00E5FF] px-3.5 py-1.5 bg-[#031E2B] border border-[#00E5FF]/40 mb-6 shadow-cyan-border">
          <span className="w-1.5 h-1.5 bg-[#00E5FF] animate-pulse" />
          <span>{dict.hero.categoryBadge}</span>
        </div>

        {/* Big Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-black text-white tracking-tight uppercase max-w-5xl mx-auto leading-none">
          {dict.hero.headline}
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[#8A8FA3] max-w-3xl mx-auto leading-relaxed font-sans">
          {dict.hero.subheadline}
        </p>

        {/* 4 Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 my-8 font-mono text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border border-[#00E5FF]/40 text-[#00E5FF]">
            <span className="w-1.5 h-1.5 bg-[#10B981]" />
            <span>{dict.hero.badges.fps}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border border-[#5322FF]/50 text-white">
            <Cpu size={13} className="text-[#5322FF]" />
            <span>{dict.hero.badges.engine}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border border-[#1F1F2E] text-slate-300">
            <Sparkles size={13} className="text-[#00E5FF]" />
            <span>{dict.hero.badges.ai}</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border border-amber-500/40 text-amber-300">
            <span className="text-amber-400">⚡</span>
            <span>{dict.hero.badges.zeroAE}</span>
          </div>
        </div>

        {/* Center Remotion Player Component with Live Rendering */}
        <div className="mt-8 mb-12">
          <RemotionPlayerFrame dict={dict.hero.player} />
        </div>
      </section>

      {/* 3. SECTION 2: BA TRỤ CỘT ĐỘT PHÁ (STRATEGIC VALUE ADDITIONS) */}
      <StrategicPillars dict={dict.pillars} />

      {/* 4. SECTION 3: QUY TRÌNH KÉP (DUAL-TRACK PIPELINE) */}
      <DualTrackPipeline dict={dict.pipeline} />

      {/* 5. TELEMETRY & MOTION PHYSICS SECTION */}
      <TelemetrySection dict={dict.telemetrySection} />

      {/* 6. SECTION 4: DELIVERABLES HUB & THE MANUAL TRAP MODAL */}
      <DeliverablesHub
        dict={dict.deliverables}
        onOpenStoryboard={() => setIsStoryboardOpen(true)}
      />

      {/* 7. SECTION 05: TELEMETRY TRANSMISSION & DIRECT CONTACT HUB */}
      <ContactTransmission currentLang={currentLang} />

      {/* 8. INTERACTIVE STORYBOARD MODAL (PROJECT SAMPLE) */}
      <StoryboardFrameModal
        isOpen={isStoryboardOpen}
        onClose={() => setIsStoryboardOpen(false)}
        dict={dict.storyboardViewer}
      />

      {/* 9. FOOTER */}
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
