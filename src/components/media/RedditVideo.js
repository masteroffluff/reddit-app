import React from "react";
//import ReactHlsPlayer from "react-hls-player";
//import VideoJS from "./VideoJS";

//import videojs from "video.js";

import VideoPlayer from "./VideoPlayer";


// can't get the sound to work :(
export default function RedditVideo({media}){
     //const videoURL = media.reddit_video.fallback_url
    const {hls_url} = media.reddit_video
 /*   return (
        <>
            <ReactHlsPlayer
                src={hls_url}
                autoPlay={false}
                controls={true}
                width="500px"
                height="auto"
            />

        </>
    ) */
    /* const playerRef = React.useRef(null); */

    const videoJsOptions = {
      autoplay: false,
      controls: true,
      responsive: true,
      width:"auto",
      height:"auto",
      fluid: true,
      sources: [{
        src: hls_url,
        type: "application/x-mpegURL"
      }]
    };

  
    return (
      <div className="reddit-video">
        <VideoPlayer options={videoJsOptions} key={hls_url} />
      </div>
    );

}

