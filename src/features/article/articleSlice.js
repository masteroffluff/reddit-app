import {createSlice} from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';

const redditURL = "https://www.reddit.com";

const fetchArticleByPath= createAsyncThunk(
    'article/getArticle',
    async (path) =>{
        const endPoint = redditURL+path+".json"
        const article = await fetch(endPoint);
        const data = await article.json;
        return data;

    }
)
const appendArticleByPath= createAsyncThunk(
    'article/getArticle',
    async (path,after) =>{
        const endPoint = redditURL+path+".json"
        const article = await fetch(endPoint);
        const data = await article.json;
        return data;

    }
)



export const articleSlice = createSlice(
    // for the individual pages 
    {
        name:'article',
        initialState:{
            article:{},
            replies:{},
            isLoading: false,
            hasError: false

        },
        reducers:{},
        extraReducers:{
            extraReducers:(builder)=>{
                builder
                .addCase(fetchArticleByPath.fulfilled,(state, action) => {
                    state.article.article=action.payload["0"];
                    state.article.replies=action.payload["1"];
                    state.isLoading = false;
                    state.hasError = false;
                    }
                )
                .addCase(appendArticleByPath.fulfilled,(state, action) => {
                    let {data: stateData} = state.article
                    let {data: actionData, after:actionAfter} = action.payload
                    // update after
                    state.article.aricle=actionAfter
                    // iterate through list and make sure the object number is added to last
                                    
                    const lastDataKey = Object.keys(stateData).pop()
                    Object.entries(actionData).forEach(([k,v]) => {
                        stateData[`${k+lastDataKey}`]=v
                    })
    
                    
                    state.isLoading = false;
                    state.hasError = false;
                    }
                )
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
        }
    })
    
export const selectedArticle = (state) => state.article.article;
export const selectedReplies = (state) => state.article.replies;
export const isLoadingListing = (state) => state.article.isLoading;
export const hasErrorListing = (state) => state.article.hasError;




export default articleSlice.reducer