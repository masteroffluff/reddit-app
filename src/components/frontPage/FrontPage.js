import Listing from "../../features/listing/Listing";

// render the default page 
export default function ItFrontPage(){
    return (<>
        <h1>Welcome to Reddit</h1>
        <Listing path = "/" />
    </>)
}