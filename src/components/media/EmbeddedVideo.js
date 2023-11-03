import React from "react";



export default function EmbeddedVideo ({media}){
    const {html, title} = media.oembed;
    //const html = (dummyVideo)

    let src=html.match(/(?<=src=").*"/)
    src = String(src).split('"')[0]
    //return <p>{src}</p>
 

    //alert (videoElement)
    return (
        <div className="embeddedVideo">
            <iframe width="100%" height="500px" src={src} frameborder="0" title={title} allowfullscreen></iframe>
        </div>)

    
}