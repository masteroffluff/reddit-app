import React, { useEffect, useMemo } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
//import Item from "./Item"
import ListingList from "./ListingList";
import {
  fetchListingByPath,
  appendListingByPath,
  isLoadingListing,
  hasErrorListing,
  selectedListing,
  hasMore,
} from "./listingSlice";
//import store from "../../app/store";
import { useDispatch, useSelector } from "react-redux";

export default function Listing() {
  let { subredditName } = useParams();
  let { pathname: path } = useLocation();
  let [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");

    const dispatch = useDispatch()
    const dispatchParams = useMemo(() => ({ path, searchTerm }), [path, searchTerm]);
  useEffect(() => {
    dispatch(fetchListingByPath(dispatchParams));
  }, [path, searchTerm, dispatch, dispatchParams ]);

  const listing = useSelector(selectedListing);

  const listIsLoadingSelector = useSelector(isLoadingListing);
  const listingHasError = useSelector(hasErrorListing);
  const listingHasMore = useSelector(hasMore);


  const handleContinue = () => {
    if (listingHasMore) {
      dispatch(appendListingByPath(dispatchParams));
    }
  };

  function ListingHeader() {
    if (!searchTerm) {
      if (subredditName) {
        return (
          <div className="listing-header">
            <h2>Sub Reddit:{path} </h2>
          </div>
        );
      }
      return (
        <div className="listing-header">
          <h1>Welcome to Reddit</h1>
          <p className="strapline">Come for the cats stay for the empathy.</p>
        </div>
      );
    }
    if (subredditName) {
      return (
        <div className="listing-header">
          <h2>Search results in Sub Reddit:{path} </h2>
        </div>
      );
    }
    return (
      <div className="listing-header">
        <h2>Search Results:</h2>
      </div>
    );
  }
  // // component to handle the lists

  // glom the header and list together
  if (listingHasError) {
    return (<>
      <h1>Oh no! An error has occured.</h1>
      <p>Error:{listingHasError}</p>
      <p>Please try disabling CORS on your browser and trying again.</p>
    </>);
  }

  return (
    <section className="listing">
      <ListingHeader />
      {listing.data?<ListingList listingObject={listing} dispatchParams={dispatchParams} />:<></>}
      {/* {listIsLoadingSelector?<p>Loading...</p>:<></>} */}
      <div className="loadig-button">{listIsLoadingSelector?<p>Loading...</p>:listingHasMore?<button onClick={handleContinue}>Load More?</button>:<p>----------</p>}</div>
    </section>

  );
}
