import React, { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import ListingList from './ListingList';
import {fetchListingByPath,appendListingByPath, isLoadingListing, hasErrorListing,selectedListing } from './listingSlice'
import store from "../../app/store";
import { useSelector } from 'react-redux';

export default function Listing(){
    //const dispatch = useDispatch();
    let {subredditName} = useParams();

    let path = "/";
    if (subredditName){path = "r/" + subredditName +"/"}
    useEffect(()=>{
        
        store.dispatch(fetchListingByPath(path))}
    ,[path])

    const listing =useSelector(selectedListing)
    

    //const listingSelector = useSelector(selectedListing)
    const listIsLoadingSelector = useSelector(isLoadingListing)
    const listingHasError = useSelector(hasErrorListing)

    const handleContinue=()=>{
        store.dispatch(appendListingByPath(path))
        console.log(store.getState().listing.listing.data)
    }
    
/*     if (listIsLoadingSelector){
        return <h1>Loading</h1>
    } */
    if (listingHasError){
        return <h1>Error</h1>
    }
    //console.log(listing)
    if(subredditName){
        return (<>
            <h2>Sub Reddit:{path} </h2>
            <ListingList listingObject={listing}/>
            <button onClick={handleContinue}>load more?</button>
            {listIsLoadingSelector?<p>Loading...</p>:""}
        </>)
    }
    else {
        return (<>
            <h1>Welcome to Reddit</h1>
            <p>come for the cats stay for the empathy</p>
            <ListingList listingObject={listing}/>
            <div className="loadig-button">{listIsLoadingSelector?<p>Loading...</p>:<button onClick={handleContinue}>Load More?</button>}</div>
        </>)
    }


}