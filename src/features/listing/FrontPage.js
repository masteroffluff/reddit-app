import React, { useEffect } from 'react';
import Listing from "./Listing";
import store from "../../app/store";
import {fetchListingByPath, selectedListing, isLoadingListing} from '../listing/listingSlice'
import { useSelector } from 'react-redux';

// render the default page 
export default function FrontPage(){


    useEffect(()=>{
        
        store.dispatch(fetchListingByPath('/'))}
    ,[])

    const listingSelector = useSelector(selectedListing)
    const listIsLoadingSelector = useSelector(isLoadingListing)
    if (listIsLoadingSelector){
        return <h1>Loading</h1>
    }

    return (<>
        <h1>Welcome to Reddit</h1>
        <Listing listingObject={listingSelector}/>
    </>)
}