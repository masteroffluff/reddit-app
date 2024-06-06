import React, {useState} from "react";



export default function EmbeddedVideo ({media,thumbnail}){
    const {html, title , height,width, thumbnai_width, thumbnail_height} = media.oembed;
    //const html = (dummyVideo)
    const [loadVideo, setLoadVideo]= useState(false);
    const thumbnailToUse = thumbnail;
    const image_width = thumbnai_width||width;
    const image_height = thumbnai_width||height;
    
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
                <img src={thumbnailToUse} className="image" height={image_height} width={image_width} onClick={handleClick} alt={title} />
            </div>

        )
    }

    
}