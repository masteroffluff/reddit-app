import React from "react";
import {useParams } from 'react-router-dom';
import Listing from "./Listing";
import { fetchListingByPath } from "./listingSlice";
import store from "../../app/store";

export default function SubReddit({}){
    let {subredditName} = useParams;
    const path = "r/" + subredditName
    useEffect(
        store.dispatch(fetchListingByPath(path))
    ,[])

    return (<>
    
        <h2>Sub Reddit:{path} </h2>
        <Listing listingObject={store.getState().listing.listing}/>
    </>)
}