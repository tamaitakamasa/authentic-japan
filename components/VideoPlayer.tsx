'use client';

import React from 'react';
import dynamic from 'next/dynamic';
// import ReactPlayer from 'react-player';
// import { extractVideoID } from '@/lib/utils';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface VideoPlayerProps {
  videoUrl: string;
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  // const videoId = extractVideoID(videoUrl);
  // const youtubeUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : '';
	// console.log('youtubeUrl:', youtubeUrl);

  return (
    <div className="c-video">
      <div className="c-video__player">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          playing={true}
          loop={true}
          muted={true}
          playsinline={true}
          config={{
            youtube: {
              playerVars: {
                controls: 0,
                rel: 0,
                showinfo: 0,
                modestbranding: 1,
                iv_load_policy: 3,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
