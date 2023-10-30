import Listing from "./Listing";

// render the default page 
export default function FrontPage(){
    return (<>
        <h1>Welcome to Reddit</h1>
        <Listing path="/"/>
    </>)
}