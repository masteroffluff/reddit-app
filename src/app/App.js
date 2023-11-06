import React from "react";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import './App.css'
// import components and features here
import AppLayout from "./AppLayout";
import Listing from "../features/listing/Listing";
import Article from "../features/article/Article";
// import FrontPage from "../features/listing/FrontPage";
import SearchResults from "../features/search/SearchResults";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout/>}> {/* container for app */}
          <Route index element= {<Listing />} />{/* front page */}
          <Route path="r/:subredditName/" element= {<Listing />} />  {/* Subreddit Listing */}
          <Route path="r/:subredditName/:id/:articleName/" element={<Article />} /> {/* individual aricle */}
          <Route path="search/" element={<SearchResults />} /> {/* Page for when the searchbar is invoked. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
