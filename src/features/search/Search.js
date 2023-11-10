import React,{useState} from "react";
import {useNavigate } from "react-router-dom";




export default function Search(){

    const [searchTerm, setSearchTerm]=useState('')
    const [nsfw, setNsfw]=useState(false)
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        const navigateTo = `/search?q=${searchTerm}&${nsfw?'include_over_18=on':''}`
        navigate(navigateTo)
    }

    const handleChangeSearchTerm=(e)=>{
        setSearchTerm(encodeURIComponent(e.target.value));
    }
    const handleChangeNSFW=(e)=>{
        setNsfw(e.target.value);
    }

    return (<>
        <form onSubmit = {handleSubmit}>
        <input type="text" onChange={handleChangeSearchTerm} value={searchTerm}/>
        <input type="checkbox" onChange={handleChangeNSFW} value={nsfw} />


        </form>
    </>)
}