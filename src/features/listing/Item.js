import parse from 'html-react-parser'
import React from 'react'
import { Link } from 'react-router-dom'
import EmbeddedVideo from '../../components/media/EmbeddedVideo'
import RedditVideo from "../../components/media/RedditVideo"
import Gallery from '../../components/media/Gallery'
import LinkedArticle from '../../components/media/LinkedArticle'
import {updatePreviousSubreddit} from '../previousSubreddits/previousSubredditsSlice'
import { useDispatch } from 'react-redux'

//var parse = require('html-react-parser');

// invidual entry from a listing


export default function Item({thing, itemnumber}){
    
    const dispatch = useDispatch();

    if(!thing.data){return <div className='mediaContainer'><p>error</p></div>}

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
        permalink,
        preview,
    } = thing.data
    

    // turn the selftext_html to parseabel html
    const selftext_htmlFixed = selftext_html?parse(parse(selftext_html)):"" // parsed once to un escape the characters and once to run the html
    
    const handleSRListUpdate=()=>{
        //alert(subreddit_name_prefixed)
        dispatch(updatePreviousSubreddit(subreddit_name_prefixed))
    }


    // handle the different types of media, deflibulator is totally a word
    const mediaDeflibulator=()=>{
        if (crosspost_parent_list !==undefined){
            
            const newThing={data:crosspost_parent_list[`0`]}
            //console.log(newThing)
            return (<div className="cross-post">
                <code>cross post</code>
                <Item thing={newThing}></Item>
            </div>)
            
        }
        if (is_self){
            return; // this is a self post no media neded
        }

        if (is_reddit_media_domain) {
            switch (domain){
                case "i.redd.it":
                    // single image hosed by reddit
                    return (<div className='visualMediaContainer'>
                        <img src={url} alt={title} />
                    </div>)
                case "v.redd.it":

                    return <div className='visualMediaContainer'><RedditVideo media={media} /></div>
                default:
                    return <code> unidentified reddit domain {domain}</code>
            }
        }
        if (is_gallery){
            return <Gallery gallery_data={gallery_data} title={title} media_metadata={media_metadata} />
        }
        if (media!=null){
            //return <code>Embedded media</code>
            return <div className='visualMediaContainer'><EmbeddedVideo media={media} /></div>
        }
        
        // if its nothing else then its a linked article
        
        return <LinkedArticle url={url} thumbnail={thumbnail} domain={domain} preview={preview}/>;
        

    }
    
    return (
        <div>
            <h3>{title}</h3>
            <h4>by {author} in <Link onClick={handleSRListUpdate} to={"/"+subreddit_name_prefixed}>{subreddit_name_prefixed}</Link></h4>
            <div className='mediaContainer'>{mediaDeflibulator()}</div>
            <div>{selftext_htmlFixed}</div>
            <br />
            <Link to={permalink}> Go to Comments</Link>
        </div>)
}

