import {createSlice} from '@reduxjs/toolkit';


export const subredditSlice = createSlice(
    {
        name:'subreddit',
        initialState:{
            subreddit:{}
        },
        reducers:{
            updateSubreddit:(state,action)=>{
             
            }
        }
    })
    
    


export const { updateSubreddit } = subredditSlice.actions

export default subredditSlice.reducer

