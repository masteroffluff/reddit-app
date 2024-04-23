import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
//import fs from "node:fs";

const redditURL = "https://www.reddit.com";
const orderBy = "/hot/"

//const fakejson = "../../fakejson/frontpage.json"

export const fetchListingByPath = createAsyncThunk(
    'listing/fetchListingByPath',
    async ({ path, searchTerm }, { rejectWithValue }) => {

        let endPoint = ""
        if (searchTerm) {
            endPoint = redditURL + path + ".json?limit=50" + (searchTerm ? "&q=" + searchTerm : "")
        }
        else {
            endPoint = redditURL + path + orderBy + ".json?limit=50"
        }
        console.log(endPoint)
        return fetch(endPoint, { method: 'GET' })
            .then(async (listing) => listing.json())
            .then((data) => {
                console.log(JSON.stringify(data))
                return data
            })
            .catch((e) => rejectWithValue(e))



    }
)
export const appendListingByPath = createAsyncThunk(
    'listing/appendListingByPath',
    async ({ path, searchTerm }, { getState, rejectWithValue }) => {
        //console.log("after" ,after)
        const state = getState();
        const after = state.listing.listing.data.after
        const endPoint = redditURL + path + orderBy + ".json?limit=50&after=" + after
        //console.log(endPoint);
        return fetch(endPoint, { method: 'GET' })
            .then(async (listing) => {
                if(!listing.ok){return listing.json()}
                throw new Error('Something went wrong')
                })
            .then((data) => {
                if(data.error){throw new Error(data.reason||'Rejected')}
                console.log(JSON.stringify(data))
                return data
            })
            .catch((e) => rejectWithValue(e))
            

    }
)

export const listingSlice = createSlice(
    {
        name: 'listing',
        initialState: {
            listing: {},
            after: "",
            isLoading: false,
            hasError: false
        },
        reducers: {},
        extraReducers:
            (builder) => {
                builder
                    .addCase(fetchListingByPath.fulfilled, (state, action) => {
                        // if (state.listing.listing!=={}){Object.keys(state.listing.listing).forEach(key => delete state.listing.listing[key]);} // clear out old items 
                        // look at the dpth and see if we can remove any entries greater than it
                        //let {dist} = action.payload.data
                        state.listing = action.payload;
                        state.isLoading = false;
                        state.hasError = false;
                    }
                    )
                    .addCase(appendListingByPath.fulfilled, (state, action) => {
                        let { children: stateChildren } = state.listing.data
                        let { children: actionChildren, after: actionAfter } = action.payload.data
                        // update after


                        state.listing.data.after = actionAfter
                        // iterate through list and make sure the object number is added to last

                        const lastDataKey = Number(Object.keys(stateChildren).pop()) + 1
                        const actionChildrenArray = Object.entries(actionChildren)

                        actionChildrenArray.forEach(([k, v]) => {
                            if (!stateChildren.some(({ data }) => data.id === v.data.id)) {

                                stateChildren[`${Number(k) + lastDataKey}`] = v
                            }
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
                        isAnyOf(appendListingByPath.pending,fetchListingByPath.pending ),
                        (state) => {
                            state.isLoading = true;
                            state.hasError = false;
                        }
                    )
                    .addMatcher(
                        isAnyOf(appendListingByPath.rejected,fetchListingByPath.rejected ),
                        (state, action) => {
                            console.log(action)
                            state.isLoading = false;
                            let temp = action.payload?.message || action.error.message
                            if (typeof (temp) === 'object') {
                                temp = JSON.stringify(temp)
                            }
                            console.log(temp)
                            state.hasError = temp
                        }
                    )
            }
    })




//export { fetchListingByPath } = listingSlice.actions

export default listingSlice.reducer

export const selectedListing = (state) => state.listing.listing;
export const isLoadingListing = (state) => state.listing.isLoading;
export const hasErrorListing = (state) => state.listing.hasError;