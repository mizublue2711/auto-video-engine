import React from 'react';
import { Audio, Series, Video, staticFile } from 'remotion';
import {
  ChaiTopBanner,
  ChaiDynamicSubtitle,
  ChaiEndingCard,
} from '../components/registry';
import { ChaiStoryConfig, ChaiStorySchema } from '../schemas/chaiStorySchema';
import defaultChaiConfig from '../../site-configs/chai-communication/config.json';

export const ChaiMasterDramaScene: React.FC<ChaiStoryConfig> = (props) => {
  const config = ChaiStorySchema.parse({
    ...defaultChaiConfig,
    ...(props || {}),
  });

  return (
    <div
      style={{
        position: 'relative',
        width: config.width,
        height: config.height,
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      {/* Layer 0..2: Sequential Cut Series */}
      <Series>
        {config.cuts.map((cut) => (
          <Series.Sequence key={cut.id} durationInFrames={cut.durationInFrames}>
            {/* Layer 0: Muted Video Plate (Always 100% width/height, strict silence) */}
            <Video
              src={staticFile(cut.videoPath)}
              muted
              volume={0}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
              }}
            />

            {/* Layer 1: Clean Korean Voiceover */}
            <Audio src={staticFile(cut.audioPath)} volume={1.0} />

            {/* Layer 2: Synchronized Dynamic Subtitle (Higher z-index) */}
            <div
              style={{
                position: 'absolute',
                bottom: 240,
                left: 0,
                width: '100%',
                zIndex: 10,
              }}
            >
              <ChaiDynamicSubtitle
                text={cut.subtitleText}
                speaker={cut.speaker}
                badgeText={cut.badgeText}
              />
            </div>

            {/* Layer 4: Outro Ending Card on Cut 5 (Frame 580-720 -> local frame 52-192) */}
            {cut.id === 'cut_05' && <ChaiEndingCard startFrame={52} />}
          </Series.Sequence>
        ))}
      </Series>

      {/* Layer 3: Sticky Top Banner (Always on top of video & subtitles) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 20,
        }}
      >
        <ChaiTopBanner title={config.topBannerText} />
      </div>
    </div>
  );
};
