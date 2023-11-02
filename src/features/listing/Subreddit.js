import React, { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import Listing from './Listing';
import {fetchListingByPath, selectedListing, isLoadingListing, hasErrorListing} from './listingSlice'
import store from "../../app/store";
import { useSelector, useDispatch } from 'react-redux';

export default function SubReddit({}){
    const dispatch = useDispatch()
    let {subredditName} = useParams();
    const path = "r/" + subredditName +"/"
    useEffect(()=>{
        
        dispatch(fetchListingByPath(path))}
    ,[path])

    //const listingSelector = useSelector(selectedListing)
    const listIsLoadingSelector = useSelector(isLoadingListing)
    const listingHasError = useSelector(hasErrorListing)

    if (listIsLoadingSelector){
        return <h1>Loading</h1>
    }
    if (listingHasError){
        return <h1>Error</h1>
    }

    return (<>
    
        <h2>Sub Reddit:{path} </h2>
        <Listing listingObject={store.getState().listing.listing}/>
    </>)
}