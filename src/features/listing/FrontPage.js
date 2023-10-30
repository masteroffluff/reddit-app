import Listing from "./Listing";
import store from "../../app/store";

// render the default page 
export default function FrontPage(){


    useEffect(
        store.dispatch(fetchListingByPath('/'))
    ,[])


    return (<>
        <h1>Welcome to Reddit</h1>
        <Listing listingObject={store.getState().listing.listing}/>
    </>)
}