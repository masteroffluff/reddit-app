import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Search from "../features/search/Search";
import logo from '../logo.svg';

import PreviousSubreddits from "../features/previousSubreddits/PreviousSubreddits";


export default function AppLayout(){
    return (
        <div>
            
            <header> 
                <NavLink to = "/">
                    <img src={logo} className="App-logo" alt="logo" />
                </NavLink>
                
                <NavLink to = "/">
                    <h1>Reddit Browser</h1>
                </NavLink>
                <Search />
            </header>
            <nav>
                <h2>Reccomended</h2>
                <ul>
                <li><NavLink to = "/">Front Page</NavLink></li>
                <li><NavLink to = "/r/pics">PICS</NavLink></li>
                <li><NavLink to = "/r/amitheasshole">Am I the Asshole</NavLink></li>
                <li><NavLink to = "/r/asmr">ASMR</NavLink></li>
                <li><NavLink to = "/r/videos">Videos</NavLink></li>
                </ul>
            </nav>
            <main>
                <div><PreviousSubreddits /></div>
                <div className="outlet"><Outlet /></div>
            </main>
        </div>
    )
}