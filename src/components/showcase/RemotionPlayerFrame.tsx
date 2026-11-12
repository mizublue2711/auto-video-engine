import React, { useState, useRef, useEffect } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Activity,
  Layers,
  Crosshair,
  Maximize2,
  Tv,
  CheckCircle,
  Eye,
  Camera,
} from 'lucide-react';
import { MasterCompositeScene } from '../../scenes/MasterCompositeScene';
import { StudyGearConvergenceScene } from '../../scenes/StudyGearConvergenceScene';
import { ShowcaseDictionary } from '../../i18n/showcaseDict';

class PlayerErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn('Remotion Player encountered an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#05050A] p-6 text-center font-mono">
          <div className="text-4xl mb-3 text-[#00E5FF]">🎬</div>
          <div className="text-white font-bold text-sm mb-1">[ ⏣ CANVAS INITIALIZING ]</div>
          <div className="text-xs text-[#8A8FA3] max-w-md">
            Remotion Virtual Canvas is mounting visual sequences. Click below to retry.
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-1.5 bg-[#031E2B] border border-[#00E5FF] text-[#00E5FF] text-xs font-bold hover:bg-[#00E5FF] hover:text-[#05050A] transition-all"
          >
            RELOAD CANVAS
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

interface RemotionPlayerFrameProps {
  dict: ShowcaseDictionary['hero']['player'];
}

export const RemotionPlayerFrame: React.FC<RemotionPlayerFrameProps> = ({ dict }) => {
  const playerRef = useRef<PlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [telemetryMode, setTelemetryMode] = useState(false);
  const [selectedComp, setSelectedComp] = useState<'commercial' | 'convergence'>('commercial');

  // Active composition specs
  const activeConfig = selectedComp === 'commercial'
    ? {
        component: MasterCompositeScene,
        durationInFrames: 894,
        fps: 24,
        width: 1920,
        height: 1080,
        title: dict.compCommercial,
      }
    : {
        component: StudyGearConvergenceScene,
        durationInFrames: 180,
        fps: 30,
        width: 1920,
        height: 1080,
        title: dict.compConvergence,
      };

  // Track playback frame
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onFrameUpdate = () => {
      try {
        const frame = player.getCurrentFrame();
        setCurrentFrame(frame);
      } catch (e) {
        // Safe fallback
      }
    };

    const interval = setInterval(onFrameUpdate, 1000 / activeConfig.fps);
    return () => clearInterval(interval);
  }, [activeConfig.fps, selectedComp]);

  // Determine active sequence based on current frame in commercial mode
  const getSequenceLabel = (frame: number): string => {
    if (selectedComp === 'convergence') {
      return 'SEQ 03 // STUDY_GEAR_CONVERGENCE (180f @ 30FPS)';
    }
    if (frame < 120) return 'SEQ 01 // ACADEMY_STRUGGLE (0-119f)';
    if (frame < 240) return 'SEQ 02 // MOBILE_HANDOVER (120-239f)';
    if (frame < 540) return 'SEQ 03 // STUDY_GEAR_CONVERGENCE (240-539f)';
    if (frame < 660) return 'SEQ 04 // BLACKBOARD_MATH_CHALLENGE (540-659f)';
    if (frame < 780) return 'SEQ 05 // GATE_TAKEOFF_FLIP (660-779f)';
    return 'SEQ 06 // K-FINTECH_DECOUPLED_OUTRO (780-894f)';
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (playerRef.current.isPlaying()) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const restartVideo = () => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(0);
    playerRef.current.play();
    setIsPlaying(true);
  };

  const seconds = Math.floor(currentFrame / activeConfig.fps);
  const framesMod = currentFrame % activeConfig.fps;
  const timecode = `00:${String(seconds).padStart(2, '0')}:${String(framesMod).padStart(2, '0')}`;
  const progressPercent = ((currentFrame / activeConfig.durationInFrames) * 100).toFixed(1);

  return (
    <div className="w-full max-w-6xl mx-auto brutalist-strict">
      {/* 1. TOP TELEMETRY CONTROL BAR */}
      <div className="bg-[#0A0C14] border border-[#1F1F2E] border-b-0 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Viewport State Toggles */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-[#1F1F2E] bg-[#05050A]">
            <button
              onClick={() => setTelemetryMode(false)}
              className={`px-3 py-1.5 flex items-center gap-1.5 transition-all ${
                !telemetryMode
                  ? 'bg-[#031E2B] text-[#00E5FF] border-r border-[#00E5FF]/40 font-bold'
                  : 'text-[#8A8FA3] hover:text-white border-r border-[#1F1F2E]'
              }`}
            >
              <Eye size={14} strokeWidth={1.5} />
              <span>{dict.modeMaster}</span>
            </button>
            <button
              onClick={() => setTelemetryMode(true)}
              className={`px-3 py-1.5 flex items-center gap-1.5 transition-all ${
                telemetryMode
                  ? 'bg-[#031E2B] text-[#00E5FF] font-bold'
                  : 'text-[#8A8FA3] hover:text-white'
              }`}
            >
              <Activity size={14} strokeWidth={1.5} />
              <span>{dict.modeTelemetry}</span>
            </button>
          </div>

          {/* Composition Selector */}
          <div className="hidden md:flex items-center gap-1.5 text-[#8A8FA3] border border-[#1F1F2E] bg-[#05050A] px-2 py-1">
            <Layers size={13} className="text-[#00E5FF]" />
            <select
              value={selectedComp}
              onChange={(e) => {
                setSelectedComp(e.target.value as any);
                setCurrentFrame(0);
              }}
              className="bg-transparent text-white text-[11px] font-mono outline-none cursor-pointer"
            >
              <option value="commercial" className="bg-[#0A0C14] text-white">
                [ 01 ] {dict.compCommercial}
              </option>
              <option value="convergence" className="bg-[#0A0C14] text-white">
                [ 02 ] {dict.compConvergence}
              </option>
            </select>
          </div>
        </div>

        {/* Right: Live Telemetry Indicators */}
        <div className="flex items-center gap-3 text-[11px] text-[#8A8FA3]">
          <div className="flex items-center gap-1.5 text-[#10B981] bg-[#0A1A14] border border-[#10B981]/30 px-2.5 py-1">
            <span className="w-1.5 h-1.5 bg-[#10B981] animate-pulse" />
            <span>{dict.fpsGauge}</span>
          </div>
          <div className="hidden sm:block text-[#8A8FA3] border border-[#1F1F2E] px-2 py-1">
            {dict.resolution}
          </div>
          <div className="text-[#00E5FF] border border-[#00E5FF]/30 bg-[#031E2B] px-2.5 py-1">
            {dict.frameLabel}: {String(currentFrame).padStart(4, '0')} / {activeConfig.durationInFrames} ({progressPercent}%)
          </div>
        </div>
      </div>

      {/* 2. REMOTION PLAYER VIEWPORT WITH AMBIENT GLOW */}
      <div className="relative w-full aspect-video bg-[#05050A] border-2 border-[#00E5FF]/60 shadow-cyan-glow overflow-hidden group">
        {/* The Live Remotion Player */}
        <div className="w-full h-full cursor-pointer" onClick={togglePlay}>
          <PlayerErrorBoundary>
            <Player
              ref={playerRef}
              component={activeConfig.component as any}
              durationInFrames={activeConfig.durationInFrames}
              compositionWidth={activeConfig.width}
              compositionHeight={activeConfig.height}
              fps={activeConfig.fps}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              loop
              autoPlay={false}
              showVolumeControls={false}
              acknowledgeRemotionLicense
            />
          </PlayerErrorBoundary>
        </div>

        {/* --- OVERLAY: TELEMETRY HUD MODE --- */}
        {telemetryMode && (
          <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 font-mono text-[10px] sm:text-xs">
            {/* Safe 80px Margins CAD Boundary */}
            <div className="absolute inset-5 sm:inset-10 border border-dashed border-[#00E5FF]/25 pointer-events-none">
              <span className="absolute -top-3 left-3 text-[9px] text-[#00E5FF]/60 bg-[#05050A] px-1">
                [ 80PX FRUSTUM SAFE MARGIN ]
              </span>
              <span className="absolute -bottom-3 right-3 text-[9px] text-[#00E5FF]/60 bg-[#05050A] px-1">
                [ BOUNDARY LOCK: CLAMPED ]
              </span>
            </div>

            {/* Corner Crosshairs */}
            <div className="absolute top-2 left-2 text-[#00E5FF]/70 text-[10px]">+ [0, 0]</div>
            <div className="absolute top-2 right-2 text-[#00E5FF]/70 text-[10px]">+ [1920, 0]</div>
            <div className="absolute bottom-2 left-2 text-[#00E5FF]/70 text-[10px]">+ [0, 1080]</div>
            <div className="absolute bottom-2 right-2 text-[#00E5FF]/70 text-[10px]">+ [1920, 1080]</div>

            {/* Top Row Telemetry Box */}
            <div className="flex justify-between items-start z-10">
              <div className="bg-[#05050A]/90 border border-[#00E5FF]/40 p-2.5 backdrop-blur-md shadow-lg max-w-xs space-y-1">
                <div className="text-[#00E5FF] font-bold flex items-center gap-1.5">
                  <Crosshair size={12} />
                  <span>{getSequenceLabel(currentFrame)}</span>
                </div>
                <div className="text-[#8A8FA3] text-[10px]">
                  <span>TIMECODE: </span>
                  <span className="text-white font-bold">{timecode}</span>
                  <span className="ml-2">FPS: </span>
                  <span className="text-[#10B981] font-bold">{activeConfig.fps}.0</span>
                </div>
                <div className="text-[9px] text-[#8A8FA3]">
                  RENDER: DETERMINISTIC VIRTUAL DOM
                </div>
              </div>

              <div className="bg-[#05050A]/90 border border-[#10B981]/40 p-2.5 backdrop-blur-md shadow-lg space-y-1 text-right">
                <div className="text-[#10B981] font-bold flex items-center justify-end gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#10B981] animate-ping" />
                  <span>[ ⏣ MOTION_LOCKED ]</span>
                </div>
                <div className="text-[10px] text-white">
                  SPRING DAMPING: 14 // MASS: 0.8
                </div>
                <div className="text-[9px] text-[#00E5FF]">
                  BEZIER: (0.16, 1.0, 0.30, 1.0)
                </div>
              </div>
            </div>

            {/* Center Reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-center">
              <div className="w-16 h-16 border border-[#00E5FF] rounded-none flex items-center justify-center">
                <div className="w-2 h-2 bg-[#00E5FF]" />
              </div>
              <div className="text-[9px] text-[#00E5FF] mt-1">[ CAD AXIS ORIGIN ]</div>
            </div>

            {/* Bottom Row Telemetry Box */}
            <div className="flex justify-between items-end z-10">
              <div className="bg-[#05050A]/90 border border-[#00E5FF]/40 p-2.5 backdrop-blur-md shadow-lg space-y-0.5">
                <div className="text-[#00E5FF] font-bold">3D SPATIAL TELEMETRY</div>
                <div className="text-[#8A8FA3] text-[10px]">PITCH: -18.5° | DOLLY Z: 1000px</div>
                <div className="text-[#8A8FA3] text-[10px]">PARALLAX DELTA: ±42px | CLAMP: TRUE</div>
              </div>

              <div className="bg-[#05050A]/90 border border-[#1F1F2E] p-2.5 backdrop-blur-md shadow-lg text-right space-y-0.5">
                <div className="text-white font-bold">AUDIO BUS: 15 CHANNELS</div>
                <div className="text-[#10B981] text-[10px]">SFX SYNCHRONIZED PER FRAME</div>
                <div className="text-[#8A8FA3] text-[9px]">ZERO KEYFRAME DRIFT</div>
              </div>
            </div>
          </div>
        )}

        {/* Hover Click Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#05050A]/80 border border-[#1F1F2E] px-3 py-1 text-[10px] font-mono text-[#8A8FA3] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-30">
          {dict.clickHint}
        </div>
      </div>

      {/* 3. INTERACTIVE CONTROL STRIP */}
      <div className="bg-[#0A0C14] border border-[#1F1F2E] border-t-0 p-3 sm:p-4 flex items-center justify-between gap-4 font-mono text-xs">
        {/* Play/Pause/Restart Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="px-4 py-2 bg-[#5322FF] hover:bg-[#00E5FF] text-white hover:text-[#05050A] font-bold flex items-center gap-2 transition-all mechanical-chisel-sm"
          >
            {isPlaying ? (
              <>
                <Pause size={14} strokeWidth={2} />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play size={14} strokeWidth={2} />
                <span>PLAY</span>
              </>
            )}
          </button>

          <button
            onClick={restartVideo}
            className="p-2 bg-[#0D0E17] border border-[#1F1F2E] hover:border-[#00E5FF] text-[#8A8FA3] hover:text-white transition-all"
            title="Restart Video from Frame 0"
          >
            <RotateCcw size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* Progress Bar / Scrubber */}
        <div className="flex-1 hidden sm:flex items-center gap-3">
          <span className="text-[11px] text-[#8A8FA3]">{timecode}</span>
          <div className="flex-1 relative h-2 bg-[#05050A] border border-[#1F1F2E]">
            <div
              className="h-full bg-[#00E5FF] transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] text-[#00E5FF]">{progressPercent}%</span>
        </div>

        {/* Jump To Specific Milestone Sequences */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#8A8FA3] hidden lg:inline-block">JUMP TO:</span>
          {[
            { label: 'S1', frame: 0, title: 'Struggle' },
            { label: 'S2', frame: 120, title: 'Handover' },
            { label: 'S3', frame: 240, title: 'StudyGear' },
            { label: 'S4', frame: 540, title: 'Blackboard' },
            { label: 'S5', frame: 660, title: 'Takeoff' },
          ].map((cue) => (
            <button
              key={cue.label}
              onClick={() => {
                if (playerRef.current) {
                  playerRef.current.seekTo(cue.frame);
                  setCurrentFrame(cue.frame);
                }
              }}
              className="px-2 py-1 bg-[#05050A] border border-[#1F1F2E] hover:border-[#00E5FF] text-[10px] font-mono text-[#8A8FA3] hover:text-[#00E5FF] transition-all"
              title={`Jump to ${cue.title} (Frame ${cue.frame})`}
            >
              {cue.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
