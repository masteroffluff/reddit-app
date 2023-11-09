import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
//import fs from "node:fs";

const redditURL = "http://www.reddit.com";
const orderBy = "/hot/"

//const fakejson = "../../fakejson/frontpage.json"

export const fetchListingByPath= createAsyncThunk(
    'listing/fetchListingByPath',
    async ({path,searchTerm}) =>{
        
        

        const endPoint = redditURL+path+orderBy+".json?limit=50" + (searchTerm?"+q="+searchTerm:"")

        //const listing = await fetch(endPoint,{method:'GET'});
        const listing = await fetch("https://www.reddit.com/search/.json?limit=50+q=test")
        const data = await listing.json();
        console.log(JSON.stringify(data))
        return data

    }
)
export const appendListingByPath= createAsyncThunk(
    'listing/appendListingByPath',
    async ({path,searchTerm},{getState}) =>{
        //console.log("after" ,after)
        const state = getState();
        const after = state.listing.listing.data.after
        const endPoint = redditURL+path+orderBy+".json?limit=50&after="+after
        //console.log(endPoint);
        const listing = await fetch(endPoint,{method:'GET'});
        //const listing = await fetch("http://www.reddit.com/r/amitheasshole/.json")
        const data = await listing.json();
        return data

    }
)

export const listingSlice = createSlice(
    {
        name:'listing',
        initialState:{
            listing:  {},
            after:"",
            isLoading: false,
            hasError: false
        },
        reducers:{},
        extraReducers:
        (builder)=>{
            builder
            .addCase(fetchListingByPath.fulfilled,(state, action) => {
                state.listing=action.payload;
                state.isLoading = false;
                state.hasError = false;
                }
            )
            .addCase(appendListingByPath.fulfilled,(state, action) => {
                let {children: stateChildren} = state.listing.data
                let {children: actionChildren, after:actionAfter} = action.payload.data
                // update after
                
                
                state.listing.data.after=actionAfter
                // iterate through list and make sure the object number is added to last
                             
                const lastDataKey = Number(Object.keys(stateChildren).pop())+1
                const actionChildrenArray=Object.entries(actionChildren)

                actionChildrenArray.forEach(([k,v]) => {
                if (!stateChildren.some(({data})=>data.id===v.data.id)){ 
                
                    stateChildren[`${Number(k)+lastDataKey}`]=v}
                })
                
                
                state.isLoading = false;
                state.hasError = false;
                }
            )
/*             .addCase(
                fetchListingByPath.pending,
                (state) => {
                    state.isLoading = true;
                    state.hasError = false;
                }
            )  */           
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.isLoading = true;
                    state.hasError = false;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    console.log(action)
                    state.isLoading = false;
                    state.hasError = true;
                }
            )
        }
    })
    
    


//export { fetchListingByPath } = listingSlice.actions

export default listingSlice.reducer

export const selectedListing = (state) => state.listing.listing;
export const isLoadingListing = (state) => state.listing.isLoading;
export const hasErrorListing = (state) => state.listing.hasError;