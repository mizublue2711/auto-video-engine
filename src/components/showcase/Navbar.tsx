import React, { useState } from 'react';
import { Gem, Github, ExternalLink, Terminal, ChevronDown, Linkedin, Globe } from 'lucide-react';
import { Language, ShowcaseDictionary } from '../../i18n/showcaseDict';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  dict: ShowcaseDictionary['nav'];
  githubUrl?: string;
  portfolioUrl?: string;
  platformUrl?: string;
  linkedinUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  dict,
  githubUrl = 'https://github.com/mizublue2711/auto-video-engine',
  portfolioUrl = 'https://thuy-vu-designer.framer.website/',
  platformUrl = 'https://artificialcraft.space/',
  linkedinUrl = 'https://www.linkedin.com/in/thuy-thu-vu-271190/',
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const langLabels: Record<Language, { label: string; flag: string }> = {
    en: { label: 'EN', flag: '🇺🇸' },
    kr: { label: '한국어', flag: '🇰🇷' },
    vi: { label: 'VI', flag: '🇻🇳' },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-[#05050A]/90 backdrop-blur-xl border-b border-[#1F1F2E] px-4 md:px-8 lg:px-12 flex items-center justify-between brutalist-strict">
      {/* 1. BRAND LOGO */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#0A0C14] border border-[#00E5FF] flex items-center justify-center shadow-cyan-border">
          <Gem size={20} className="text-[#00E5FF]" strokeWidth={1.5} />
        </div>
        <div>
          <div className="font-sans font-black text-white text-sm md:text-base tracking-wider flex items-center gap-2">
            CRABIT
            <span className="text-[#00E5FF] text-[10px] font-mono font-bold px-2 py-0.5 bg-[#031E2B] border border-[#00E5FF]/40">
              CODE ENGINE
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] font-mono text-[#10B981] px-2 py-0.5 bg-[#0A1A14] border border-[#10B981]/40">
              <span className="w-1.5 h-1.5 bg-[#10B981] animate-pulse" />
              {dict.engineLiveBadge}
            </span>
          </div>
          <div className="text-[10px] text-[#8A8FA3] font-mono tracking-tight uppercase">
            {dict.brandSubtitle}
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION ANCHOR LINKS */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono font-semibold text-[#8A8FA3]">
        <a
          href="#pipeline"
          className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5 py-1"
        >
          <span className="text-[#00E5FF]/60">[01]</span>
          <span>{dict.links.pipeline}</span>
        </a>
        <a
          href="#brand-assets"
          className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5 py-1"
        >
          <span className="text-[#00E5FF]/60">[02]</span>
          <span>{dict.links.brandAssets}</span>
        </a>
        <a
          href="#telemetry"
          className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5 py-1"
        >
          <span className="text-[#00E5FF]/60">[03]</span>
          <span>{dict.links.telemetry}</span>
        </a>
        <a
          href="#storyboard"
          className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5 py-1"
        >
          <span className="text-[#00E5FF]/60">[04]</span>
          <span>STORYBOARD</span>
        </a>
        <a
          href="#deliverables"
          className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5 py-1"
        >
          <span className="text-[#00E5FF]/60">[05]</span>
          <span>{dict.links.deliverables}</span>
        </a>
        <a
          href="#contact"
          className="hover:text-[#00E5FF] transition-colors flex items-center gap-1.5 py-1"
        >
          <span className="text-[#00E5FF]/60">[06]</span>
          <span>TRANSMIT</span>
        </a>
      </nav>

      {/* 3. CONTROLS & EXTERNAL LINKS */}
      <div className="flex items-center gap-3">
        {/* MULTI-LANGUAGE SWITCHER (EN - KR - VI) */}
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] text-white text-xs font-mono font-bold transition-all"
            title="Switch Language"
          >
            <span>{langLabels[currentLang].flag}</span>
            <span>{langLabels[currentLang].label}</span>
            <ChevronDown size={12} className="opacity-70 text-[#00E5FF]" />
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-[#0A0C14] border border-[#00E5FF]/50 shadow-2xl py-1 text-xs font-mono font-bold z-50">
              {(['en', 'kr', 'vi'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-[#031E2B] hover:text-[#00E5FF] transition-colors ${
                    currentLang === lang ? 'text-[#00E5FF] bg-[#031E2B]/50' : 'text-[#8A8FA3]'
                  }`}
                >
                  <span>{langLabels[lang].flag}</span>
                  <span>{langLabels[lang].label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PLATFORM LINK (ARTIFICIAL CRAFT) */}
        <a
          href={platformUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex p-2 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#8A8FA3] hover:text-white transition-all group"
          title="Artificial Craft Platform (https://artificialcraft.space/)"
        >
          <Globe size={16} strokeWidth={1.5} className="group-hover:text-[#00E5FF] transition-colors" />
        </a>

        {/* LINKEDIN PROFILE LINK */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex p-2 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#8A8FA3] hover:text-white transition-all group"
          title="LinkedIn Profile (Vu Thu Thuy)"
        >
          <Linkedin size={16} strokeWidth={1.5} className="group-hover:text-[#00E5FF] transition-colors" />
        </a>

        {/* GITHUB SOURCE CODE LINK */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-[#0A0C14] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#8A8FA3] hover:text-white transition-all group"
          title={dict.githubTooltip}
        >
          <Github size={16} strokeWidth={1.5} className="group-hover:text-[#00E5FF] transition-colors" />
        </a>

        {/* PORTFOLIO LINK */}
        <a
          href={portfolioUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#5322FF] border border-[#00E5FF] hover:bg-[#00E5FF] text-white hover:text-[#05050A] font-mono font-bold text-xs shadow-cyan-glow transition-all mechanical-chisel-sm"
        >
          <span className="w-1.5 h-1.5 bg-[#10B981] animate-pulse" />
          <span>{dict.portfolioBtn}</span>
        </a>
      </div>
    </header>
  );
};
