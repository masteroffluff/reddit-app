import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {corsProxy} from '../../utils'

const redditURL = "https://www.reddit.com/";

export const fetchArticleByPath= createAsyncThunk(
    'article/fetchArticleByPath',
    async (path,{rejectWithValue}) =>{

        const endPoint = corsProxy(redditURL+path+".json")
        
        return fetch(endPoint, { method: 'GET' })
            .then(async (article) => {
                if(article.ok){return article.json()}
                throw new Error('Something went wrong')})
            .then((data) => {

                return data
            })
            .catch((e) => rejectWithValue(e))
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