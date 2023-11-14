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

    return (<div className="search">
        <form onSubmit = {handleSubmit}>
        <label htmlFor="search">Search: </label>
        <input name='search' type="text" onChange={handleChangeSearchTerm} height="100%" value={searchTerm}/>
        <label htmlFor="NSFW">NSFW</label>
        <input className="checkbox1" name="NSFW" type="checkbox" onChange={handleChangeNSFW} value={nsfw} />

        </form>
    </div>)
}