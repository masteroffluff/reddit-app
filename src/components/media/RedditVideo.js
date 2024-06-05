import React from "react";
import VideoJS from "./VideoJS";
import videojs from "video.js";

export default function RedditVideo({ media }) {
    const playerRef = React.useRef(null);

    if (!media.reddit_video) {
        return <div>video error</div>;
    }

    const { hls_url, width, height } = media.reddit_video;

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: false,
        sources: [{
            src: hls_url,
            type: "application/x-mpegURL"
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });

        // Add event listeners for debugging
        player.on('error', () => {
            const error = player.error();
            videojs.log('Error:', error);
        });

        player.on('loadstart', () => {
            videojs.log('Loading started');
        });

        player.on('loadeddata', () => {
            videojs.log('Data loaded');
        });

        player.on('loadedmetadata', () => {
            videojs.log('Metadata loaded');
        });

        player.on('canplay', () => {
            videojs.log('Can play');
        });

        player.on('playing', () => {
            videojs.log('Playing');
        });

        player.on('pause', () => {
            videojs.log('Paused');
        });

        player.on('ended', () => {
            videojs.log('Ended');
        });
    };

    return (
        <div className="reddit-video video">
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} width={width} height={height} />
        </div>
    );
}
