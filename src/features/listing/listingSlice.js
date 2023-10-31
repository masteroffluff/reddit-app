import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
//import fs from "node:fs";

const redditURL = "http://www.reddit.com";

const fakejson = "../../fakejson/frontpage.json"

export const fetchListingByPath= createAsyncThunk(
    'listing/fetchListingByPath',
    async (path) =>{
        //const endPoint = redditURL+path+".json"
        //const endPoint = fakejson;
        //const listing = await fetch(endPoint);
        //const data = await listing.json();
        //return JSON.parse(data);
        
       // const data=fs.readFileSync(fakejson)
       //return Promise.resolve(JSON.parse(fakeJSONstring));
        const listing = await fetch("http://www.reddit.com/r/pics/.json")
        const data = await listing.json();
        return data

    }
)

export const listingSlice = createSlice(
    {
        name:'listing',
        initialState:{
            listing:  {},
            isLoading: false,
            hasError: false
        },
        reducers:{},
        extraReducers:{
            [fetchListingByPath.pending]: (state, action) => {
                state.isLoading = true;
                state.hasError = false;
            },
            [fetchListingByPath.fulfilled]: (state, action) => {
                state.listing=action.payload;
                state.isLoading = false;
                state.hasError = false;
            },
            [fetchListingByPath.rejected]: (state, action) => {
                console.log(action)
                state.isLoading = false;
                state.hasError = true;
            }
        }
    })
    
    


//export { fetchListingByPath } = listingSlice.actions

export default listingSlice.reducer

export const selectedListing = (state) => state.listing.listing;
export const isLoadingListing = (state) => state.listing.isLoading;
export const hasErrorListing = (state) => state.listing.hasError;