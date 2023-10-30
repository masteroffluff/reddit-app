import {createSlice} from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';

const redditURL = "https://www.reddit.com";
const fakejson = "../../../fakejson/frontpage.json"

getArticle= createAsyncThunk(
    'listing/getArticle',
    async (path) =>{
        const endPoint = redditURL+path+".json"
        const listing = await fetch(fakejson);
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

        }
    })
    
    


export const { updateArticle } = articleSlice.actions

export default articleSlice.reducer