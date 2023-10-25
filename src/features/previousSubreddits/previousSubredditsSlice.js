import {createSlice} from '@reduxjs/toolkit';


export const previousSubredditSlice = createSlice(
    {
        name:'previousSubreddit',
        initialState:{
            previousSubreddit:{}
        },
        reducers:{
            updatePreviousSubreddit:(state,action)=>{
             
            }
        }
    })
    
    


export const { updatePreviousSubreddit } = previousSubredditSlice.actions

export default previousSubredditSlice.reducer


