import Item from "./Item"
import React from "react";

export default function ListingList({listingObject}){
    if (listingObject.data==undefined){
        return <p>something aint right</p>
    }
return(
    <>
    {Object.values(listingObject.data.children).map((thing)=><Item thing={thing}/>
    )}
    </>
    )
    


}