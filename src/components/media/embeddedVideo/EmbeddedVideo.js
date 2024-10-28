import React, { useState } from "react";
// import { head } from "underscore";
import "./embeddedVideo.css"



export default function EmbeddedVideo({ media, thumbnail }) {

    const { html, title, height, width, thumbnail_width, thumbnail_height, thumbnail_url: media_thumbnail } = media.oembed;
    //const html = (dummyVideo)
    const [loadVideo, setLoadVideo] = useState(false);
    const [thumbnailToUse, setThumbnailToUse] = useState(media_thumbnail)

    function imgOnError() {
        // some thumbnails can't be loaded from the media due to whitelisting 
        // use the smaller default thumbnail in that case
        setThumbnailToUse(thumbnail)
    };



    const image_width = thumbnail_width || width;
    const image_height = thumbnail_height || height;

    let src = html.match(/(?<=src=").*"/)
    src = String(src).split('"')[0]
    //return <p>{src}</p>
    const handleClick = () => {
        setLoadVideo(!loadVideo)
    }
    
    let scale;
    if(height>800){
        scale= 750/height;
    } else {
        scale= 1;
    }
    const paddingPercentage = `${(height / width * 100)*scale}%`
    if (loadVideo) {
        //alert (videoElement)
        return (
            <>
                <div className="live-video video" 
                style={{ 
                    paddingBottom: paddingPercentage,
                    transform: `scale(${scale})`,
                    transformOrigin: "center center"
                }}>
                    <iframe id='iframe' src={src} height={height} width={width} title={title} allowFullScreen></iframe>

                </div>
                <div><button className="unloading-button" onClick={handleClick}>x</button></div>
            </>)
    } else {
        return (<>
            <div className="live-video video">
                <img onError={imgOnError} src={thumbnailToUse} className="image" height={image_height+'px'} width={image_width+'px'} onClick={handleClick} alt={title} />

            </div>
            <div className="loading-button-container" onClick={handleClick} ><div className="loading-button" ></div></div>
        </>
        )
    }


}