import parse from 'html-react-parser'
import React from 'react'
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
                    return <code>Single Image</code>
                case "v.redd.it":

                    return <code>Reddit Video</code>
                default:
                    return <code> unidentified reddit domain {domain}</code>
            }
        }
        if (is_gallery){
            return <code>Reddit Gallery</code>
        }
        if (media){
            return <code>Embedded media</code>
        }
        return <code>Linked document {domain}</code>

    }
    
    return (<>
        <h3 style={{fontFamily:'courier'}}>{title} by {author}</h3>
        <div>{selftext_htmlFixed}</div>
        {mediaDeflibulator()}
    </>)
}

