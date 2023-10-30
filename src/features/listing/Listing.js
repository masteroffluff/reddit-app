import React, { useEffect } from 'react';
import store from '../../app/store';



export default function Listing({listingObject}){


    Object.values(listingObject).map((thing)=><p>{JSON.stringify(thing)}</p>
    )
    

    


}