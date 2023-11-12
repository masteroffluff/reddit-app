import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Search from "../features/search/Search";
import logo from "../logo.svg"
import PreviousSubreddits from "../features/previousSubreddits/PreviousSubreddits";

export default function AppLayout(){
    return (
        <div>
            <header> 
                <img alt="logo" src={logo} />
                <Search />
            </header>
            <nav>
                <ul>
                <li><NavLink to = "/">Front Page</NavLink></li>
                <li><NavLink to = "/r/pics">PICS</NavLink></li>
                <li><NavLink to = "/r/amitheasshole">Am I the Asshole</NavLink></li>
                <li><NavLink to = "/r/asmr">ASMR</NavLink></li>
                <li><NavLink to = "/r/videos">Videos</NavLink></li>
                </ul>
            </nav>
            <main>
                <PreviousSubreddits />
                <Outlet />
            </main>
        </div>
    )
}