import Item from "./Item"
import React from "react";

export default function ListingList({listingObject}){
    if (listingObject.data===undefined){
        return <p>something aint right</p>
    }
    
return(
    <>
    {Object.entries(listingObject.data.children).map(([key,thing])=>{return <div  key={key} className="item"><Item key={key} itemnumber={key} thing={thing}/></div>}
    )}
    </>
    )
    


}