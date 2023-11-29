import React from "react";
import RedditVideo from "./RedditVideo";


export default function LinkedArticle({url,title,thumbnail, domain, preview}){
    
    if(domain.includes('l3n.co')){
        return <div className='visualMediaContainer'><img className="image" src={url} alt={url} /></div>
    }
    if(domain==="i.imgur.com"){
        const extension = String(url).split('.').pop();
        if(extension.toLowerCase() === "gifv"){
            
            const mediaObject = {'reddit_video':preview.reddit_video_preview}
            return <div className='visualMediaContainer'><RedditVideo media={mediaObject} /></div>
        }
        return <div className='visualMediaContainer'><img className="image" src={url} alt={url + " " + extension} /></div>
    }



    if(thumbnail&&thumbnail!=="default"){
        
    return (<>
        
    <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
            <div className='visualMediaContainer'><img className="image" src={thumbnail} alt={thumbnail} /></div>
            
        </a>
    </>)}
    else{
    return(<>
        <span>linked Article: <a className="articleAnchor" href={url} target="_blank" rel="noopener noreferrer">
        {url}
        </a></span>
        </>)
    }
}

