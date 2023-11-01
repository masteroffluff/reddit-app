import React, { useEffect } from 'react';
import Listing from "./Listing";
import store from "../../app/store";
import {fetchListingByPath, selectedListing, isLoadingListing, hasErrorListing} from './listingSlice'
import { useSelector, useDispatch } from 'react-redux';

// render the default page 
export default function FrontPage(){
    const dispatch = useDispatch()

    useEffect(()=>{
        
        dispatch(fetchListingByPath('/'))}
    ,[])

    const listingSelector = useSelector(selectedListing)
    const listIsLoadingSelector = useSelector(isLoadingListing)
    const listingHasError = useSelector(hasErrorListing)

    if (listIsLoadingSelector){
        return <h1>Loading</h1>
    }
    if (listingHasError){
        return <h1>Error</h1>
    }

    return (<>
        <h1>Welcome to Reddit</h1>
        <p>come for the cats stay for the empathy</p>
        <Listing listingObject={listingSelector}/>
    </>)
}