'use client';

import { useEffect, useRef, useState } from 'react';
import YouTubePlayer from '@/lib/youTubePlayer';
import { extractVideoID } from '@/lib/utils';

export function VideoPlayer({ videoUrl }: { videoUrl: string }) {
	const playerRef = useRef<HTMLDivElement>(null);
	const youtubePlayerRef = useRef<YouTubePlayer | null>(null);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const videoId = extractVideoID(videoUrl);
		if (!videoId || !playerRef.current) return;

		const playerId = `youtube-player-${videoId}`;
		playerRef.current.id = playerId;

		const player = new YouTubePlayer(videoId, playerId, true);
		youtubePlayerRef.current = player;

		player
			.initialize()
			.then(() => setIsLoading(false))
			.catch((err) => {
				console.error(err);
				setError('Failed to load video');
				setIsLoading(false);
			});

		return () => {
			if (youtubePlayerRef.current) {
				youtubePlayerRef.current.destroy();
			}
		};
	}, [videoUrl]);

	return (
		<div className="c-video">
			{isLoading && <div>Loading...</div>}
			{error && <div>{error}</div>}
			<div className="c-video__player" ref={playerRef}></div>
		</div>
	);
}
