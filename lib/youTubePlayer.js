// YouTubePlayer.js

class YouTubePlayer {
	constructor(videoId, playerId, autoplay = false) {
		this.videoId = videoId;
		this.playerId = playerId;
		this.player = null;
		this.played = false;
		this.autoplay = autoplay;
		this.isReady = false;
		this.interval = null;
	}

	async initialize() {
		if (typeof window === 'undefined') return; // サーバーサイドレンダリング対策

		if (!window.YT) {
			await this.loadYouTubeAPI();
		}

		await this.createPlayer();
	}

	loadYouTubeAPI() {
		return new Promise((resolve) => {
			const tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			window.onYouTubeIframeAPIReady = resolve;
		});
	}

	createPlayer() {
		return new Promise((resolve) => {
			this.player = new YT.Player(this.playerId, {
				videoId: this.videoId,
				playerVars: {
					autoplay: this.autoplay ? 1 : 0,
					controls: 0,
					rel: 0,
					showinfo: 0,
					mute: 1,
					modestbranding: 1,
					iv_load_policy: 3,
					playsinline: 1
				},
				events: {
					onReady: () => {
						this.isReady = true;
						this.onPlayerReady();
						resolve();
					},
					onStateChange: (event) => this.onPlayerStateChange(event)
				}
			});
		});
	}

	onPlayerReady() {
		if (this.player && this.isReady) {
			this.player.setPlaybackQuality('highres');
			if (this.autoplay) {
				this.player.playVideo();
			}
		}
	}

	onPlayerStateChange() {
		if (!this.player || !this.isReady) return;

		try {
			const ytStatus = this.player.getPlayerState();
			const playerElement = document.getElementById(this.playerId);

			switch (ytStatus) {
				case YT.PlayerState.PLAYING:
					playerElement?.parentNode?.classList.add('is-loaded');
					if (!this.played) {
						this.played = true;
						const duration = this.player.getDuration() || 0;
						this.interval = window.setInterval(() => {
							this.player.seekTo(0);
							this.player.playVideo();
						}, duration * 1000);
					}
					break;
				// 他のケースも同様に処理
			}
		} catch (error) {
			console.error('YouTube player error:', error);
		}
	}

	play() {
		if (this.player && this.isReady) {
			this.player.playVideo();
		}
	}

	destroy() {
		if (this.player) {
			this.player.destroy();
			this.player = null;
		}
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = null;
		}
		this.isReady = false;
		this.played = false;
	}
}

export default YouTubePlayer;
