import React, { useEffect } from 'react';
import {useLocation } from 'react-router-dom';
import {fetchArticleByPath,selectedArticle,selectedReplies,isLoadingArticle,hasErrorArticle} from "./articleSlice";
import store from "../../app/store";
import { useSelector } from 'react-redux';
import Item from '../listing/Item';
import Replies from '../../components/replies/Replies';

export default function Article(){
    //let {subredditName,id,articleName} = useParams();
    let {pathname:path} = useLocation();
    // update list of subreddits
    useEffect(()=>{
        
        store.dispatch(fetchArticleByPath(path))}
    ,[path])
    
    const article=useSelector(selectedArticle)
    const replies =useSelector(selectedReplies)

    const listIsLoadingSelector = useSelector(isLoadingArticle)
    const listingHasError = useSelector(hasErrorArticle)        
    
    if (listIsLoadingSelector){
        return <h1>Loading</h1>
    }
    if (listingHasError){
        return <h1>Error</h1>
    }
    
    if (article.data===undefined&&!listIsLoadingSelector){
        return <p>something aint right</p>
    }
    return(
    <div className='article'>
        <Item thing={article.data.children[0]} />

        <div className="reply-container">
            <Replies children={replies.data.children} />
        </div>
    </div>)
    
}

