import React, {useState} from "react";



export default function EmbeddedVideo ({media}){
    const {html, title, thumbnail_url} = media.oembed;
    //const html = (dummyVideo)
    const [loadVideo, setLoadVideo]= useState(false);


    let src=html.match(/(?<=src=").*"/)
    src = String(src).split('"')[0]
    //return <p>{src}</p>
    const handleClick=()=>{
        setLoadVideo(!loadVideo)
    }
 
    if (loadVideo){
        //alert (videoElement)
        return (
            <div className="embeddedVideo">
                <iframe width="100%" height="500px" src={src} frameborder="0" title={title} allowfullscreen></iframe>
                <button onClick={handleClick}>Unload</button>
            </div>)
    }else{
        return(
            <div className="embeddedVideo">
                <img src={thumbnail_url} width="500px" height = "100%" onClick={handleClick} alt={title} />
            </div>
        )
    }

    
}