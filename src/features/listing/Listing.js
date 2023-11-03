import React, { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import ListingList from './ListingList';
import {fetchListingByPath, isLoadingListing, hasErrorListing} from './listingSlice'
import store from "../../app/store";
import { useSelector, useDispatch } from 'react-redux';

export default function Listing({}){
    const dispatch = useDispatch()
    let {subredditName} = useParams();

    let path = "/"
    if (subredditName){path = "r/" + subredditName +"/"}
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

    if(subredditName){
        return (<>
            <h2>Sub Reddit:{path} </h2>
            <ListingList listingObject={store.getState().listing.listing}/>
        </>)
    }
    else {
        return (<>
            <h1>Welcome to Reddit</h1>
            <p>come for the cats stay for the empathy</p>
            <ListingList listingObject={store.getState().listing.listing}/>
        </>)
    }


}