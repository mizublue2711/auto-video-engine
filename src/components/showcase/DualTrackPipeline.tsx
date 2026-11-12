import React, { useState } from 'react';
import { Cpu, Film, Volume2, Sparkles, ArrowRight, Check, X, Code, Terminal, Layers } from 'lucide-react';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';

interface DualTrackPipelineProps {
  dict: ShowcaseDictionary['pipeline'];
}

export const DualTrackPipeline: React.FC<DualTrackPipelineProps> = ({ dict }) => {
  const [selectedTrack, setSelectedTrack] = useState<'track1' | 'track2' | 'track3'>('track2');

  const codeSnippets = {
    track1: `// Track A: Google Flow AI Plate Ingestion
const flowPlate = staticFile('flow_plates/ready/flow_shot01_struggle.mp4');

// Zero-hallucination background layer with camera zoom-out
<AbsoluteFill>
  <Video
    src={flowPlate}
    style={{
      transform: \`scale(\${cameraZoom})\`,
      filter: 'contrast(1.05) saturate(1.1)',
    }}
  />
</AbsoluteFill>`,
    track2: `// Track B: Remotion + React Mathematical Physics
const springScale = spring({
  frame,
  fps: 24,
  config: { damping: 14, mass: 0.8 },
});

// Clamped Bezier Easing
const rotY = interpolate(frame, [0, 48], [0, 360], {
  easing: Easing.bezier(0.16, 1, 0.3, 1),
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});`,
    track3: `// Track C: Frame-Exact Deterministic SFX Audio Bus
<Audio
  src={staticFile('audio/sfx/crystal_sparkle_chime.mp3')}
  startFrom={0}
  volume={0.85}
/>
<Audio
  src={staticFile('audio/sfx/swapping_chimes.mp3')}
  startFrom={12} // 12-frame offset sync
/>`,
  };

  return (
    <section id="pipeline" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto brutalist-strict">
      {/* SECTION HEADER */}
      <div className="mb-14 text-center md:text-left border-b border-[#1F1F2E] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#5322FF] px-2.5 py-1 bg-[#5322FF]/10 border border-[#5322FF]/40 mb-3">
            <span className="w-1.5 h-1.5 bg-[#5322FF]" />
            <span>{dict.sectionTag}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-black text-white tracking-tight uppercase">
            {dict.sectionTitle}
          </h2>
          <p className="text-sm md:text-base text-[#8A8FA3] mt-2 max-w-2xl font-sans">
            {dict.sectionDesc}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-[#8A8FA3]">
          <span className="text-[#00E5FF]">[ 0.00ms DETERMINISTIC DRIFT ]</span>
        </div>
      </div>

      {/* 1. COMPARISON MATRIX: AFTER EFFECTS VS VIDEO-AS-CODE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* OLD WAY: AFTER EFFECTS */}
        <div className="bg-[#0A0C14] border border-red-500/30 p-6 sm:p-8 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono text-red-400 font-bold flex items-center gap-1.5">
              <X size={14} className="text-red-400" />
              <span>LEGACY FLUID CHAOS</span>
            </span>
            <span className="text-[10px] font-mono text-[#8A8FA3]">AFTER EFFECTS (.AEP)</span>
          </div>

          <h3 className="text-xl font-sans font-bold text-white mb-2">
            {dict.oldWayTitle}
          </h3>
          <p className="text-sm text-[#8A8FA3] mb-6 leading-relaxed">
            {dict.oldWayDesc}
          </p>

          <ul className="space-y-2.5 text-xs font-mono text-slate-300">
            {dict.oldWayPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 bg-[#05050A] border border-[#1F1F2E] p-2.5">
                <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                <span className="text-slate-400">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* NEW WAY: VIDEO-AS-CODE */}
        <div className="bg-[#0A0C14] border-2 border-[#00E5FF] p-6 sm:p-8 relative shadow-cyan-glow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-mono text-[#00E5FF] font-bold flex items-center gap-1.5">
              <Check size={14} className="text-[#10B981]" />
              <span>THE FUTURE ARCHITECTURE</span>
            </span>
            <span className="text-[10px] font-mono text-[#10B981] bg-[#0A1A14] border border-[#10B981]/40 px-2 py-0.5">
              REMOTION 4.0 // 60FPS
            </span>
          </div>

          <h3 className="text-xl font-sans font-bold text-white mb-2">
            {dict.newWayTitle}
          </h3>
          <p className="text-sm text-[#8A8FA3] mb-6 leading-relaxed">
            {dict.newWayDesc}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-[#05050A] border border-[#00E5FF]/40 p-3">
              <span className="text-[#00E5FF] block text-[10px] mb-1 font-bold">REVISION SPEED</span>
              <span className="text-white text-base font-black">1 LINE OF CODE</span>
              <span className="text-[10px] text-[#8A8FA3] block mt-0.5">Instant CI/CD re-render</span>
            </div>
            <div className="bg-[#05050A] border border-[#10B981]/40 p-3">
              <span className="text-[#10B981] block text-[10px] mb-1 font-bold">TIMELINE PRECISION</span>
              <span className="text-white text-base font-black">1/60s (16.6ms)</span>
              <span className="text-[10px] text-[#8A8FA3] block mt-0.5">Deterministic frames</span>
            </div>
            <div className="bg-[#05050A] border border-[#1F1F2E] p-3">
              <span className="text-slate-400 block text-[10px] mb-1 font-bold">MULTI-TENANT REUSE</span>
              <span className="text-white text-base font-black">JSON SCHEMA</span>
              <span className="text-[10px] text-[#8A8FA3] block mt-0.5">Zod verified props</span>
            </div>
            <div className="bg-[#05050A] border border-[#5322FF]/40 p-3">
              <span className="text-[#5322FF] block text-[10px] mb-1 font-bold">RENDER INFRA</span>
              <span className="text-white text-base font-black">CLOUD / DOCKER</span>
              <span className="text-[10px] text-[#8A8FA3] block mt-0.5">Headless concurrency</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DUAL-TRACK ARCHITECTURE INFOGRAPHIC TABS & CODE EXPLORER */}
      <div className="bg-[#0A0C14] border border-[#1F1F2E] p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 border-b border-[#1F1F2E] pb-6">
          <div>
            <h3 className="text-2xl font-sans font-black text-white">
              INTERACTIVE PIPELINE RUNBOOK
            </h3>
            <p className="text-xs font-mono text-[#8A8FA3] mt-1">
              Select any pipeline track to inspect the mathematical execution and Remotion logic.
            </p>
          </div>

          {/* Track Segmented Selector */}
          <div className="flex flex-wrap items-center border border-[#1F1F2E] bg-[#05050A]">
            <button
              onClick={() => setSelectedTrack('track1')}
              className={`px-4 py-2 font-mono text-xs flex items-center gap-2 transition-all ${
                selectedTrack === 'track1'
                  ? 'bg-[#031E2B] text-[#00E5FF] font-bold border-r border-[#00E5FF]/40'
                  : 'text-[#8A8FA3] hover:text-white border-r border-[#1F1F2E]'
              }`}
            >
              <Film size={14} />
              <span>TRACK A: VISUAL AI</span>
            </button>

            <button
              onClick={() => setSelectedTrack('track2')}
              className={`px-4 py-2 font-mono text-xs flex items-center gap-2 transition-all ${
                selectedTrack === 'track2'
                  ? 'bg-[#031E2B] text-[#00E5FF] font-bold border-r border-[#00E5FF]/40'
                  : 'text-[#8A8FA3] hover:text-white border-r border-[#1F1F2E]'
              }`}
            >
              <Cpu size={14} />
              <span>TRACK B: CODE ENGINE</span>
            </button>

            <button
              onClick={() => setSelectedTrack('track3')}
              className={`px-4 py-2 font-mono text-xs flex items-center gap-2 transition-all ${
                selectedTrack === 'track3'
                  ? 'bg-[#031E2B] text-[#00E5FF] font-bold'
                  : 'text-[#8A8FA3] hover:text-white'
              }`}
            >
              <Volume2 size={14} />
              <span>TRACK C: SFX BUS</span>
            </button>
          </div>
        </div>

        {/* Selected Track Details & Code Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block text-[10px] font-mono text-[#00E5FF] px-2.5 py-1 bg-[#031E2B] border border-[#00E5FF]/30 mb-3">
              {dict.tracks[selectedTrack].badge}
            </div>
            <h4 className="text-2xl font-sans font-bold text-white mb-2">
              {dict.tracks[selectedTrack].title}
            </h4>
            <div className="text-xs font-mono text-[#10B981] mb-4">
              ENGINE: {dict.tracks[selectedTrack].engine}
            </div>
            <p className="text-sm text-[#8A8FA3] leading-relaxed mb-6 font-sans">
              {dict.tracks[selectedTrack].desc}
            </p>

            <div className="flex items-center gap-4 text-xs font-mono text-[#8A8FA3]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#10B981]" />
                <span>Deterministic Execution</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#00E5FF]" />
                <span>Zero Render Drift</span>
              </div>
            </div>
          </div>

          {/* Live Code Preview Frame */}
          <div className="bg-[#05050A] border border-[#1F1F2E] p-4 font-mono text-xs shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#1F1F2E] pb-2 mb-3 text-[11px] text-[#8A8FA3]">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-[#00E5FF]" />
                <span>src/scenes/MasterCompositeScene.tsx</span>
              </div>
              <span className="text-[#10B981]">[ TYPESCRIPT // COMPILED ]</span>
            </div>

            <pre className="text-slate-300 overflow-x-auto text-[11px] leading-relaxed p-2 bg-[#0A0C14] border border-[#1F1F2E]/60">
              <code>{codeSnippets[selectedTrack]}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
