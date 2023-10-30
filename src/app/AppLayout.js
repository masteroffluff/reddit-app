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
            <main>
                <PreviousSubreddits />
                <Outlet />
            </main>
        </div>
    )
}