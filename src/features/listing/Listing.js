import Item from "./Item"


export default function Listing({listingObject}){
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