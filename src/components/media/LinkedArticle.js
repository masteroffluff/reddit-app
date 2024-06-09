import React from "react";
import RedditVideo from "./RedditVideo";


export default function LinkedArticle({ url, title, thumbnail, domain, preview, thumbnail_width, thumbnail_height }) {

    if (domain.includes('l3n.co')) {
        return <div className='visualMediaContainer'><img className="image" src={url} alt={url} /></div>
    }
    if (domain === "i.imgur.com") {
        const extension = String(url).split('.').pop();
        if (extension.toLowerCase() === "gifv") {
            let mediaObject;
            if (preview.reddit_video_preview) {
                mediaObject = { reddit_video: preview.reddit_video_preview }
            }
            else {
                mediaObject = { reddit_video: preview.images[`0`].source }
            }
            return <div className='visualMediaContainer'><RedditVideo media={mediaObject} /></div>
        }
        return <div className='visualMediaContainer'><img className="image" src={url} alt={url + " " + extension} /></div>
    }



    if (thumbnail && thumbnail !== "default") {

        return (<>
            <div className="linked-article-container">
                <div className="linked-article-image">

                    <a href=
                        {url} target="_blank" rel="noopener noreferrer">
                        <img style={{ width: thumbnail_width, height: thumbnail_height }} className="image" src={thumbnail} alt={thumbnail} />
                    </a>
                </div>
                <div className="linked-article-link">
                    <span>
                        Linked Article:
                        <a href=
                            {url} target="_blank" rel="noopener noreferrer">
                            {url}
                        </a>
                    </span>
                </div>
            </div>
        </>)
    }
    else {
        return (<div className="linked-article-container">
                <div className="linked-article-link">
                    <span>
                        Linked Article:
                        <a href=
                            {url} target="_blank" rel="noopener noreferrer">
                            {url}
                        </a>
                    </span>
                </div>
        </div>)
    }
}

