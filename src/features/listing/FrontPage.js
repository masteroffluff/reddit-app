/* import React, { useEffect } from 'react';
import ListingList from "./ListingList";
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


} */