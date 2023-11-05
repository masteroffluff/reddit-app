import React from "react";
import ReactHlsPlayer from "react-hls-player";

// can't get the sound to work :(
export default function RedditVideo({media}){
    //const videoURL = media.reddit_video.fallback_url
    const {hls_url} = media.reddit_video
    return (
        <>
            <code>reddit video</code>
            <ReactHlsPlayer
                src={hls_url}
                autoPlay={false}
                controls={true}
                width="500px"
                height="auto"
            />

        </>
    )
}