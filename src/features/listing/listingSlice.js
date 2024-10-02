import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
//import fs from "node:fs";

const redditURL = "https://www.reddit.com";
const orderBy = "/hot/"


function corsProxy (url){
    return 'https://corsproxy.io/?' + encodeURIComponent(url)
}


export const fetchListingByPath = createAsyncThunk(
    'listing/fetchListingByPath',
    async ({ path, searchTerm }, { rejectWithValue }) => {

        let endPoint = ""
        if (searchTerm) {
            endPoint = corsProxy(redditURL + path + ".json?limit=50" + (searchTerm ? "&q=" + searchTerm : ""))
        }
        else {
            endPoint =corsProxy( redditURL + path + orderBy + ".json?limit=50")
        }


        return fetch(endPoint, { method: 'GET' })
            .then(async (listing) => {
                if(listing.ok){return listing.json()}
                throw new Error('Something went wrong')
                })
            .then((data) => {
                if(data.error){rejectWithValue( data.reason||'Rejected')}

                return data
            })
            .catch((e) => rejectWithValue(e))



    }
)
export const appendListingByPath = createAsyncThunk(
    'listing/appendListingByPath',
    async ({ path, searchTerm }, { getState, rejectWithValue }) => {

        const state = getState();
        const after = state.listing.listing.data.after
        const endPoint = corsProxy(redditURL + path + orderBy + ".json?limit=50&after=" + after)
 ;
        return fetch(endPoint, { method: 'GET' })
            .then(async (listing) => {
                if(listing.ok){return listing.json()}
                throw new Error('Something went wrong')
                })
            .then((data) => {
                console.log('rejected appendListingByPath')
                if(data.error){throw new Error(data.reason||'Rejected')}
                
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
                            //console.log(action)
                            state.isLoading = false;
                            let temp = action.payload?.message || action.error.message
                            if (typeof (temp) === 'object') {
                                temp = JSON.stringify(temp)
                            }
                            //console.log(temp)
                            state.hasError = temp
                        }
                    )
            }
    })





export default listingSlice.reducer

export const selectedListing = (state) => state.listing.listing;
export const isLoadingListing = (state) => state.listing.isLoading;
export const hasErrorListing = (state) => state.listing.hasError;