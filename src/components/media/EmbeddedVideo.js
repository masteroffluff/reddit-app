import React, {useState} from "react";



export default function EmbeddedVideo ({media}){
    const {html, title, thumbnail_url, height,width} = media.oembed;
    //const html = (dummyVideo)
    const [loadVideo, setLoadVideo]= useState(false);

   
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
                <iframe src={src} frameborder="0" title={title} allowFullScreen></iframe>
                
            </div>
                <button onClick={handleClick}>Unload</button>
            </>)
    }else{
        return(
            <div className="video visualMediaContainer">
                <img src={thumbnail_url} className="image" onClick={handleClick} alt={title} />
            </div>
        )
    }

    
}