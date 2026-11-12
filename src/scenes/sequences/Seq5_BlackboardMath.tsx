import React from 'react';
import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  Video,
} from 'remotion';
import { PropChalkboardMath } from '../../components/props';
import { FxStudy_IdeaPop } from '../../components/fx';
import { KineticText } from '../../components/text/KineticText';
import { THEME_TOKENS } from '../MasterCompositeScene';

/**
 * SEQUENCE 5 / SEQUENCE 4: Blackboard Math to Active Study Student.
 * Features:
 * 1. Animated math equations on Hagwon chalkboard (Frames 0 - 20).
 * 2. 18-frame Overlapping Crossfade (Frames 18 - 36):
 *    - Blackboard: opacity 1 -> 0, scale 1.0 -> 1.05, blur 0 -> 6px.
 *    - Student Volunteering: opacity 0 -> 1, scale 0.98 -> 1.0, blur 6px -> 0px.
 * 3. Active Study Student participation with Idea Pop (Frames 36 - 119).
 * 4. Realistic chalk writing audio friction loop.
 */
export const Seq5_BlackboardMath: React.FC = () => {
  const frame = useCurrentFrame();

  const endFrame = 36;
  const startTransition = endFrame - 18; // Frame 18 (18 frames of overlap: frames 18 to 36)

  const transitionProgress = interpolate(frame, [startTransition, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Blackboard motion properties during crossfade (Clip Bảng đen: opacity 1 -> 0, scale 1.0 -> 1.05)
  const boardOpacity = interpolate(transitionProgress, [0, 1], [1, 0]);
  const boardScale = interpolate(transitionProgress, [0, 1], [1.0, 1.05]);
  const boardBlur = interpolate(transitionProgress, [0, 1], [0, 6]);

  // Student video motion properties during crossfade (Clip Học sinh: opacity 0 -> 1, scale 0.98 -> 1.0)
  const studentOpacity = interpolate(transitionProgress, [0, 1], [0, 1]);
  const studentScale = interpolate(transitionProgress, [0, 1], [0.98, 1.0]);
  const studentBlur = interpolate(transitionProgress, [0, 1], [6, 0]);

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        backgroundColor: THEME_TOKENS.background.classroomWall,
      }}
    >
      {/* LAYER 1: ACTIVE STUDY VOLUNTEER (Pre-mounted and rolling from startTransition = frame 18) */}
      {frame >= startTransition && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: studentOpacity,
            transform: `scale(${studentScale})`,
            filter: studentBlur > 0.05 ? `blur(${studentBlur}px)` : undefined,
            zIndex: 10,
          }}
        >
          <Video
            src={staticFile('flow_plates/ready/flow_shot04_active_study.mp4')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Idea Pop FX */}
          {frame >= 45 && (
            <div
              style={{
                position: 'absolute',
                left: '46%',
                top: '22%',
                zIndex: 4,
                pointerEvents: 'none',
              }}
            >
              <FxStudy_IdeaPop startFrame={45} />
            </div>
          )}

          {/* Kinetic Headline Banner */}
          {frame >= 32 && (
            <div
              style={{
                position: 'absolute',
                bottom: 80,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 85,
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                padding: '16px 44px',
                borderRadius: 32,
                border: '2px solid rgba(0, 229, 255, 0.45)',
                boxShadow:
                  '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 229, 255, 0.25)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              <KineticText
                text="자신감 넘치는 참여와 질문으로 성적 수직 상승!"
                color="#FFFFFF"
                fontSize={46}
                fontWeight={900}
                delay={4}
                staggerDelay={2}
              />
            </div>
          )}
        </div>
      )}

      {/* LAYER 2: CHALKBOARD MATH IMPACT CUT (Frames 0 to 36) */}
      {frame < endFrame && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: boardOpacity,
            transform: `scale(${boardScale})`,
            filter: boardBlur > 0.05 ? `blur(${boardBlur}px)` : undefined,
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          {/* Natural Diagonal Window Sunlight Beam */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(125deg, transparent 40%, rgba(255, 253, 245, 0.55) 60%, transparent 75%)',
              zIndex: 1,
            }}
          />

          {/* Soft Ambient Vignette / Wall Trim Shadow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 50% 50%, transparent 60%, rgba(180, 160, 140, 0.22) 100%)',
              zIndex: 1,
            }}
          />

          {/* Chalkboard Drop Shadow onto Classroom Wall */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '82%',
              height: '78%',
              boxShadow:
                '0 24px 60px -10px rgba(78, 64, 48, 0.28), 0 12px 24px -5px rgba(0, 0, 0, 0.08)',
              borderRadius: 16,
              zIndex: 1,
            }}
          />

          {/* BLACKBOARD COMPONENT CONTAINER */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PropChalkboardMath
              width={1320}
              height={769}
              revealStartFrame={0}
              revealDuration={24}
            />
          </div>

          {/* SFX: Chalk Writing Audio Loop (Frames 0 to 24) */}
          <Audio
            src={staticFile('audio/sfx/chalk_writing_loop.mp3')}
            startFrom={0}
            volume={0.55}
          />
        </div>
      )}
    </AbsoluteFill>
  );
};

export const Sequence4BlackboardToActiveStudy = Seq5_BlackboardMath;
export const ChalkboardImpactCut = Seq5_BlackboardMath;
export default Seq5_BlackboardMath;
