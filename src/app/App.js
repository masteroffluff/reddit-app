import React from "react";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
// import components and features here
import AppLayout from "./AppLayout";
import Listing from "../features/listing/Listing";
import Article from "../features/article/Article";
import SearchResults from "../features/search/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout/>}> {/* front page */}
          <Route path="r/:subredditName/" element= {<Listing />} />  {/* Subreddit Listing */}
          <Route path="r/:subredditName/:id/:articleName/" element={<Article />} /> {/* individual aricle */}
          <Route path="search/" element={<SearchResults />} /> {/* Page for when the searchbar is invoked. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
