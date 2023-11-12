import React, { useEffect } from 'react';
import { useLocation,useParams, useSearchParams} from 'react-router-dom';
import ListingList from './ListingList';
import {fetchListingByPath,appendListingByPath, isLoadingListing, hasErrorListing,selectedListing } from './listingSlice'
import store from "../../app/store";
import { useSelector } from 'react-redux';

export default function Listing(){
    //const dispatch = useDispatch();
    let {subredditName} = useParams();
    let {pathname:path} = useLocation();
    let [searchParams, setSearchParams] = useSearchParams();
    

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
    
    function ListingHeader(){
        if (!searchTerm){
            if(subredditName){
                return (<>
                    <h2>Sub Reddit:{path} </h2>
                </>)
            }
                return (<>
                    <h1>Welcome to Reddit</h1>
                    <p>come for the cats stay for the empathy</p>
                </>)
            }
        if(subredditName){
            return (<>
                <h2>Search results in Sub Reddit:{path} </h2>
            </>)
        }
            return (<>
                <h2>Search Results:</h2>
            </>)

    }
    




/*     if (listIsLoadingSelector){
        return <h1>Loading</h1>
    } */
    if (listingHasError){
        return <h1>Error</h1>
    }
    //console.log(listing)
/*     if(subredditName){
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
    } */
    return (
        <div className='listing'>
            <ListingHeader />
            <ListingList listingObject={listing}/>
            <div className="loadig-button">{listIsLoadingSelector?<p>Loading...</p>:<button onClick={handleContinue}>Load More?</button>}</div>
        </div>
    )

}