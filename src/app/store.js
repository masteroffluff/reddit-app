import { configureStore } from "@reduxjs/toolkit";
import { listing } from "../features/listing/listingSlice";
import { article } from  "../features/article/articleSlice"
// import reducers

export default configureStore({
    reducer: {
        listing,
        article
  }});