import React from "react";
import ReactHlsPlayer from "react-hls-player";

// can't get the sound to work :(
export default function RedditVideo({media}){
    //const videoURL = media.reddit_video.fallback_url
    const {hls_url} = media.reddit_video
    return (
        <>
{/*            <video width="500px" height="100%" autoplay="" preload="none" controls="true">

                <source src="https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd" type="application/dash+xml" />
                <source src={dash_url} type="application/dash+xml" />
                <source src={fallback_url} type ="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
            <p> reddit video </p>
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