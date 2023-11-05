import {createSlice} from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';

const redditURL = "https://www.reddit.com";
const fakejson = "../../../fakejson/frontpage.json"

const getArticle= createAsyncThunk(
    'article/getArticle',
    async (path) =>{
        const endPoint = redditURL+path+".json"
        const listing = await fetch(endPoint);
        const data = await listing.json;
        return data;

    }
)



export const articleSlice = createSlice(
    // for the individual pages 
    {
        name:'article',
        initialState:{
            0:{},
            1:{},
            isLoading: false,
            hasError: false

        },
        reducers:{},
        extraReducers:{
            extraReducers:{
                [getArticle.pending]: (state, action) => {
                    state.isLoading = true;
                    state.hasError = false;
                },
                [getArticle.fulfilled]: (state, action) => {
                    state.article=action.payload;
                    state.isLoading = false;
                    state.hasError = false;
                },
                [getArticle.rejected]: (state, action) => {
                    state.isLoading = false;
                    state.hasError = true;
                }
        }
    }})
    
    




export default articleSlice.reducer