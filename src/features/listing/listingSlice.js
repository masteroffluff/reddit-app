import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {corsProxy} from '../../utils'
//import fs from "node:fs";

const redditURL = "https://www.reddit.com";
const orderBy = "/hot/"





export const fetchListingByPath = createAsyncThunk(
    'listing/fetchListingByPath',
    async ({ path, searchTerm }, { rejectWithValue }) => {

        let endPoint = ""
        const feed = path?"":"&feed=home"
        if (searchTerm) {
            endPoint = corsProxy(redditURL + path + ".json?limit=50" + (searchTerm ? "&q=" + searchTerm : "")+ feed)
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
                //console.log('rejected appendListingByPath')

                if(data.error){
                    console.log('rejected appendListingByPath')
                    throw new Error(data.reason||'Rejected')
                }
                
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
            hasMore:true,
            isLoading: false,
            hasError: false
        },
        reducers: {},
        extraReducers:
            (builder) => {
                builder
                    .addCase(fetchListingByPath.fulfilled, (state, action) => {
                        state.hasMore = !!action.payload.data?.children&&action.payload.data.children.length>0
                        state.listing = action.payload;
                        state.isLoading = false;
                        state.hasError = false;
                    }
                    )
                    .addCase(appendListingByPath.fulfilled, (state, action) => {
                        let { children: stateChildren } = state.listing.data
                        let { children: actionChildren, after: actionAfter } = action.payload.data
                        // update after
                        state.hasMore = !!action.payload.data?.children&&action.payload.data.children.length>0

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
export const hasMore = (state) => state.listing.hasMore;