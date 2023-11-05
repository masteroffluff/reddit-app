import parse from 'html-react-parser'
import React from 'react'
import { Link } from 'react-router-dom'
import EmbeddedVideo from '../../components/media/EmbeddedVideo'
import RedditVideo from "../../components/media/RedditVideo"
import Gallery from '../../components/media/Gallery'
import LinkedArticle from '../../components/media/LinkedArticle'
//var parse = require('html-react-parser');

// invidual entry from a listing


export default function Item({thing}){
    const {
        title,
        author,
        selftext_html,
        domain,
        is_reddit_media_domain,
        is_self, 
        is_gallery,
        media,
        url,
        subreddit_name_prefixed,
        thumbnail,
        crosspost_parent_list,
        gallery_data,
        media_metadata,
    } = thing.data
    

    // turn the selftext_html to parseabel html
    const selftext_htmlFixed = selftext_html?parse(parse(selftext_html)):"" // parsed once to un escape the characters and once to run the html
    
    // handle the different types of media
    const mediaDeflibulator=()=>{
        if (crosspost_parent_list !==undefined){
            const newThing={data:crosspost_parent_list[`0`]}
            //console.log(newThing)
            return (<>
                <code>cross post</code>
                <Item thing={newThing}></Item>
            </>)
            
        }
        if (is_self){
            return <p>self post</p>; // this is a self post no media neded
        }
        if (is_reddit_media_domain) {
            switch (domain){
                case "i.redd.it":
                    // single image hosed by reddit
                    return (<>
                        <p>image</p>
                        <img src={url} alt={title} />
                    </>)
                case "v.redd.it":

                    return <RedditVideo media={media} />
                default:
                    return <code> unidentified reddit domain {domain}</code>
            }
        }
        if (is_gallery){
            return <Gallery gallery_data={gallery_data} title={title} media_metadata={media_metadata} />
        }
        if (media!=null){
            //return <code>Embedded media</code>
            return <EmbeddedVideo media={media} />
        }
        
        // if its nothing else then its a linked article
        
        return <LinkedArticle url={url} thumbnail={thumbnail} domain={domain} />;
        

    }
    
    return (
        <div>
            <h3>{title}</h3>
            <h4>by {author} in <Link to={"/"+subreddit_name_prefixed}>{subreddit_name_prefixed}</Link></h4>
            <div className='mediaContainer'>{mediaDeflibulator()}</div>
            <div>{selftext_htmlFixed}</div>
            
        </div>)
}

