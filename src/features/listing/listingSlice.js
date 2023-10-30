import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const redditURL = "https://www.reddit.com";
const fakejson = "../../../fakejson/frontpage.json"

fetchListingByPath= createAsyncThunk(
    'listing/fetchListingByPath',
    async (path) =>{
        const endPoint = redditURL+path+".json"
        const listing = await fetch(fakejson);
        const data = await listing.json;
        return data;

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
                state.isLoading = false;
                state.hasError = true;
            }
        }
    })
    
    


export const { fetchListingByPath } = listingSlice.actions

export default listingSlice.reducer

export const selectedListing = (state) => state.listing.listing;
export const isLoadingListing = (state) => state.listing.isLoading;
export const hasErrorListing = (state) => state.listing.hasError;