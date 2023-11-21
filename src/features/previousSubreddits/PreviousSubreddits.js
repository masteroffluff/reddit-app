
import React from "react";
import { useSelector } from "react-redux";
import {selectedPreviousSubreddit} from './previousSubredditsSlice'
import { Link } from "react-router-dom";

export default function PreviousSubreddits(){

    const previousSubreddits = useSelector(selectedPreviousSubreddit)

    return (<div className="previous-subreddits">
        <h2>Previous Subreddits</h2>
        <ul className="previous-subreddits-list">
            {previousSubreddits.map((item,key)=>{
                return<li key={key}> <Link to={item}>{item}</Link></li>
            })}

        </ul>
    </div>)
}