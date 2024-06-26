import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';


const redditURL = "https://www.reddit.com/";
// const orderBy = "hot/"

//const fakejson = "../../fakejson/frontpage.json"

export const fetchArticleByPath= createAsyncThunk(
    'article/fetchArticleByPath',
    async (path,{rejectWithValue}) =>{

        const endPoint = redditURL+path+".json"
        return fetch(endPoint, { method: 'GET' })
            .then(async (article) => {
                if(article.ok){return article.json()}
                throw new Error('Something went wrong')})
            .then((data) => {
                //console.log(JSON.stringify(data))
                return data
            })
            .catch((e) => rejectWithValue(e))
    }
)
/* export const appendArticleByPath= createAsyncThunk(
    'article/appendArticleByPath',
    async (path,{getState}) =>{
        const state = getState();
        const after = state.article.replies.data.after
        const endPoint = redditURL+path+".json"
        const article = await fetch(endPoint);
        const data = await article.json;
        return data;
    }
) */



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
        extraReducers:
            (builder)=>{
                builder
                .addCase(fetchArticleByPath.fulfilled,(state, action) => {
                    //console.log(action.payload)
                    state.article=action.payload["0"];
                    
                    state.replies=action.payload["1"];
                    state.isLoading = false;
                    state.hasError = false;
                    }
                )
/*                 .addCase(appendArticleByPath.fulfilled,(state, action) => {
                    let {data: stateData} = state.article.replies.data
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
                ) */
                .addCase(fetchArticleByPath.pending,
                    (state) => {
                        state.isLoading = true;
                        state.hasError = false;
                    }
                )
                .addCase(fetchArticleByPath.rejected,
                    (state, action) => {
                        //console.log(action)
                        state.isLoading = false;
                        state.hasError = true;
                    }
                )
            }
        }
    )
    
export const selectedArticle = (state) => state.article.article;
export const selectedReplies = (state) => state.article.replies;
export const isLoadingArticle = (state) => state.article.isLoading;
export const hasErrorArticle = (state) => state.article.hasError;




export default articleSlice.reducer