import React from 'react';
import { Series, Video, Audio, staticFile } from 'remotion';
import {
  ChaiTopBanner,
  ChaiDynamicSubtitle,
  ChaiEndingCard,
} from '../components/registry';
import { ChaiStoryConfig, ChaiStorySchema } from '../schemas/chaiStorySchema';
import defaultChaiConfig from '../../site-configs/chai-communication/config.json';

export const ChaiSquareDramaScene: React.FC<ChaiStoryConfig> = (props) => {
  const config = ChaiStorySchema.parse({
    ...defaultChaiConfig,
    ...(props || {}),
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1080,
        backgroundColor: '#05070D',
        overflow: 'hidden',
      }}
    >
      <Series>
        {config.cuts.map((cut) => (
          <Series.Sequence key={cut.id} durationInFrames={cut.durationInFrames}>
            {/* Background Layer: Aesthetic Gaussian-blurred video backdrop */}
            <Video
              src={staticFile(cut.videoPath)}
              muted
              volume={0}
              style={{
                position: 'absolute',
                top: '-20%',
                left: '-20%',
                width: '140%',
                height: '140%',
                objectFit: 'cover',
                filter: 'blur(30px) brightness(0.4)',
                transform: 'scale(1.1)',
                zIndex: 0,
              }}
            />

            {/* Foreground Layer: Center 9:16 Video Plate pillar-boxed cleanly into 1080x1080 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
              }}
            >
              <Video
                src={staticFile(cut.videoPath)}
                muted
                volume={0}
                style={{
                  height: '100%',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  boxShadow: '0 0 50px rgba(0, 0, 0, 0.8)',
                }}
              />
            </div>

            {/* Clean Audio Stream */}
            <Audio src={staticFile(cut.audioPath)} volume={1.0} />

            {/* Subtitle adjusted for Square safe zone */}
            <div
              style={{
                position: 'absolute',
                bottom: 84,
                left: 0,
                width: '100%',
                zIndex: 10,
              }}
            >
              <ChaiDynamicSubtitle
                text={cut.subtitleText}
                speaker={cut.speaker}
                badgeText={cut.badgeText}
                isSquareLayout
              />
            </div>

            {/* Ending Card on Cut 5 (Frame 580-720 -> local frame 52-192) */}
            {cut.id === 'cut_05' && (
              <ChaiEndingCard startFrame={52} isSquareLayout />
            )}
          </Series.Sequence>
        ))}
      </Series>

      {/* Persistent Top Banner for 1:1 Layout */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 20,
        }}
      >
        <ChaiTopBanner title={config.topBannerText} isSquareLayout />
      </div>
    </div>
  );
};
