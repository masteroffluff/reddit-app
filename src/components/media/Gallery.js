import React,{useState} from "react";



export default function Gallery({gallery_data, title, media_metadata}){
    const {items}=gallery_data
    const [indexNo, setIndexNo] =useState(0)

    
    const src=()=>{
        const {media_id} = items[indexNo]
        const {m} = media_metadata[media_id]
        // e is the media type eg. image
        // m is the html type
       // if (e=="image"){
            const extension = String(m).split('/')[1]
            return `https://i.redd.it/${media_id}.${extension}`
       // }
    }
    const handleClickNext=()=>{
        if(indexNo<items.length-1){
        setIndexNo(indexNo+1)
        }
    }
    const handleClickPrev=()=>{

        if(indexNo>0){
            setIndexNo(indexNo-1)
            }
    }   



    return (<>
        <p>gallery</p>
        <div className='visualMediaContainer'><img className="image" src={src()} alt={title+indexNo}/></div>
        <br></br>
        <span><button disabled={indexNo<=0} onClick={handleClickPrev} >prev</button><button disabled={indexNo>=items.length-1} onClick={handleClickNext}>next</button></span>
    </>)
}

