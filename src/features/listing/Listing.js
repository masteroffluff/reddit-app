import React, { useEffect } from 'react';
import { useLocation,useParams, useSearchParams} from 'react-router-dom';
import Item from "./Item"
//import ListingList from './ListingList';
import {fetchListingByPath,appendListingByPath, isLoadingListing, hasErrorListing,selectedListing } from './listingSlice'
import store from "../../app/store";
import { useSelector } from 'react-redux';

export default function Listing(){
    //const dispatch = useDispatch();
    let {subredditName} = useParams();
    let {pathname:path} = useLocation();
    let [searchParams] = useSearchParams();
    

    const searchTerm = searchParams.get("q")
    useEffect(()=>{
        
        //if (subredditName){path = "r/" + subredditName +"/"}

        store.dispatch(fetchListingByPath({path, searchTerm}))}
    ,[path,searchTerm])

    const listing =useSelector(selectedListing)
    

    //const listingSelector = useSelector(selectedListing)
    const listIsLoadingSelector = useSelector(isLoadingListing)
    const listingHasError = useSelector(hasErrorListing)

    const handleContinue=()=>{
        store.dispatch(appendListingByPath({path, searchTerm}))
        //console.log(store.getState().listing.listing.data)
    }
    // component to handle the header
    function ListingHeader(){
        if (!searchTerm){
            if(subredditName){
                return (<div class="listing-header">
                    <h2>Sub Reddit:{path} </h2>
                </div>)
            }
                return (<div class="listing-header">
                    <h1>Welcome to Reddit</h1>
                    <p>come for the cats stay for the empathy</p>
                </div>)
            }
        if(subredditName){
            return (<div class="listing-header">
                <h2>Search results in Sub Reddit:{path} </h2>
            </div>)
        }
            return (<div class="listing-header">
                <h2>Search Results:</h2>
            </div>)

    }
    // component to handle the lists
    function ListingList({listingObject}){
        if (listingObject.data===undefined){
            return <p>please wait</p>
        }
        
    return(
        <>
        {Object.entries(listingObject.data.children).map(([key,thing])=>{return <div  key={key} data-testid={`post-${key}`} className="item"><Item key={key} itemnumber={key} thing={thing}/></div>}
        )}
        </>
        )   
    
    }
    // glom the header and list together
    if (listingHasError){
        return <h1>Error:{listingHasError}</h1>
    }

    return (
        <div className='listing'>
            <ListingHeader />
            <ListingList listingObject={listing}/>
            <div className="loadig-button">{listIsLoadingSelector?<p>Loading...</p>:<button onClick={handleContinue}>Load More?</button>}</div>
        </div>
    )

}