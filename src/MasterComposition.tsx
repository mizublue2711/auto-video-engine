import React from 'react';
import { Series } from 'remotion';
import { VideoConfig } from './schemas/VideoConfigSchema';
import { Scene1Frustration } from './scenes/Scene1Frustration';
import { Scene2SolutionReveal } from './scenes/Scene2SolutionReveal';
import { Scene3ActiveLoop } from './scenes/Scene3ActiveLoop';
import { Scene4RewardCard } from './scenes/Scene4RewardCard';

/**
 * Master Sequence Wrapper orchestrating modular scene transitions and global timeline flow.
 */
export const MasterComposition: React.FC<VideoConfig> = ({
  scenes,
  palette,
}) => {
  return (
    <Series>
      <Series.Sequence durationInFrames={scenes.scene1.durationInFrames}>
        <Scene1Frustration sceneConfig={scenes.scene1} palette={palette} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={scenes.scene2.durationInFrames}>
        <Scene2SolutionReveal sceneConfig={scenes.scene2} palette={palette} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={scenes.scene3.durationInFrames}>
        <Scene3ActiveLoop sceneConfig={scenes.scene3} palette={palette} />
      </Series.Sequence>

      <Series.Sequence durationInFrames={scenes.scene4.durationInFrames}>
        <Scene4RewardCard sceneConfig={scenes.scene4} palette={palette} />
      </Series.Sequence>
    </Series>
  );
};
