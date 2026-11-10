import React from 'react';
import { Composition } from 'remotion';
import { MasterComposition } from './MasterComposition';
import { VideoConfig, VideoConfigSchema } from './schemas/VideoConfigSchema';
import defaultTenantConfig from '../site-configs/crabit-korea/config.json';

export const RemotionRoot: React.FC = () => {
  const config = defaultTenantConfig as VideoConfig;

  // Calculate total duration across all pre-comp scenes
  const totalDurationInFrames =
    config.scenes.scene1.durationInFrames +
    config.scenes.scene2.durationInFrames +
    config.scenes.scene3.durationInFrames +
    config.scenes.scene4.durationInFrames;

  return (
    <>
      <Composition
        id="MasterComposition"
        component={MasterComposition}
        durationInFrames={totalDurationInFrames}
        fps={config.runtime.fps || 30}
        width={config.runtime.width || 1920}
        height={config.runtime.height || 1080}
        schema={VideoConfigSchema}
        defaultProps={config}
      />
    </>
  );
};
