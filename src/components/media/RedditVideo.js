import React from "react";
//import ReactHlsPlayer from "react-hls-player";
import VideoJS from "./VideoJS";
import videojs from "video.js";

// can't get the sound to work :(
export default function RedditVideo({media}){
     //const videoURL = media.reddit_video.fallback_url
    const playerRef = React.useRef(null); 
    if (!media.reddit_video){return <div>video error</div>}
    const {hls_url, width, height} = media.reddit_video
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
    

    const videoJsOptions = {
      //preload:'none',
      autoplay: false,
      controls: true,
      responsive: true,
      fluid:false,
/*       width:width,
      height:height, */
      sources: [{
        src: hls_url,
        type: "application/x-mpegURL"
      }]
    };
  
    const handlePlayerReady = (player) => {
      playerRef.current = player;
  
      // You can handle player events here, for example:
      player.on('waiting', () => {
        videojs.log('player is waiting');
      });
  
      player.on('dispose', () => {
        videojs.log('player will dispose');
      });
    };
    
    


    return (
      <div className="reddit-video video">
       {/*  <VideoJS options={videoJsOptions} onReady={handlePlayerReady} width={width} height={height} /> */}
       <VideoJS options={videoJsOptions} onReady={handlePlayerReady} width={width} height={height} />
      </div>
    );

}

