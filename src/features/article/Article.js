import React, { useEffect } from 'react';
import {useLocation, useParams } from 'react-router-dom';
import articleSlice,{fetchArticleByPath,appendArticleByPath,selectedArticle,selectedReplies,isLoadingArticle,hasErrorArticle} from "./articleSlice";
import store from "../../app/store";
import { useSelector } from 'react-redux';
import Item from '../listing/Item';

export default function Article(){
    let {subredditName,id,articleName} = useParams();
    let {pathname:path} = useLocation();
    
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
    
    if (article.data===undefined){
        return <p>something aint right</p>
    }
    return(
    <>
        <Item thing={article.data.children[0]} />
        {/* <Item thing = {article.data.children['0']} itemnumber={-1}/> */}
    </>)
    
}

