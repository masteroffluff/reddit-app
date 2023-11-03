import parse from 'html-react-parser'
import React from 'react'
import { Link } from 'react-router-dom'
import EmbeddedVideo from '../../components/media/EmbeddedVideo'
import RedditVideo from "../../components/media/RedditVideo"
//var parse = require('html-react-parser');

// invidual entry from a listing

// parse the selftext_html into actual html


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

    } = thing.data
    

    // turn the selftext_html to parseabel html
    const selftext_htmlFixed = selftext_html?parse(parse(selftext_html)):"" // parsed once to un escape the characters and once to run the html
    
    // handle the different types of media
    const mediaDeflibulator=()=>{
        if (is_self){
            return ""; // this is a self post no media neded
        }
        if (is_reddit_media_domain) {
            switch (domain){
                case "i.redd.it":
                    // single image hosed by reddit
                    return <img src={url} alt={title} />
                case "v.redd.it":

                    return <RedditVideo media={media} />
                default:
                    return <code> unidentified reddit domain {domain}</code>
            }
        }
        if (is_gallery){
            return <code>Reddit Gallery</code>
        }
        if (media!=null){
            //return <code>Embedded media</code>
            return <EmbeddedVideo media={media} />
        }
        return <code>Linked document {domain}</code>

    }
    
    return (<>
        <h3>{title}</h3>
        <h4>by {author} in <Link to={subreddit_name_prefixed}>{subreddit_name_prefixed}</Link></h4>
        <div>{selftext_htmlFixed}</div>
        {mediaDeflibulator()}
    </>)
}

