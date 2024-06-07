import React, {useEffect, useState} from "react";
import { head } from "underscore";



export default function EmbeddedVideo ({media,thumbnail}){
    
    const {html, title , height,width, thumbnail_width, thumbnail_height, thumbnail_url:media_thumbnail} = media.oembed;
    //const html = (dummyVideo)
    const [loadVideo, setLoadVideo]= useState(false);
    const [thumbnailToUse, setThumbnailToUse]=useState(media_thumbnail)

     function imgOnError () {
        // some thumbnails can't be loaded from the media due to whitelisting 
        // use the smaller default thumbnail in that case
        setThumbnailToUse(thumbnail)
    };


    
    const image_width = thumbnail_width||width;
    const image_height = thumbnail_height||height;
    
    let src=html.match(/(?<=src=").*"/)
    src = String(src).split('"')[0]
    //return <p>{src}</p>
    const handleClick=()=>{
        setLoadVideo(!loadVideo)
    }
    const paddingPercentage = `${height / width * 100}%`
    if (loadVideo){
        //alert (videoElement)
        return (
            <>
            <div className="video live-video" style={{paddingBottom:paddingPercentage}}>
                <iframe src={src} height={image_height} width={image_width} frameborder="0" title={title} allowFullScreen></iframe>
                
            </div>
                <button onClick={handleClick}>Unload</button>
            </>)
    }else{
        return(
            <div className="video visualMediaContainer">
                <img onError={imgOnError} src={thumbnailToUse} className="image" height={image_height} width={image_width} onClick={handleClick} alt={title} />
            </div>

        )
    }

    
}