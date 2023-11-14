import React from "react";

export default function LinkedArticle({url,thumbnail, domain}){
    
    if(domain==="i.imgur.com"||domain.includes('l3n.co')){
        return <img className="image" src={url} alt={url} />
    }




    if(thumbnail&&thumbnail!=="default"){
        
    return (<>
        
    <a href={url} target="_blank" rel="noopener noreferrer">
            <img className="image" src={thumbnail} alt={thumbnail} />
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

