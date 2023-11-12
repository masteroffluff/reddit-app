import {createSlice} from '@reduxjs/toolkit';


export const previousSubredditSlice = createSlice(
    {
        name:'previousSubreddit',
        initialState:{
            list:[]
        },
        reducers:{
            updatePreviousSubreddit:(state,action)=>{
                
                
                
                let {list} = state
                if(!list.includes(action.payload)){
                    list.push(action.payload)
                }

            }
        }
    })
    
    
export const selectedPreviousSubreddit = (state) => state.previousSubreddit.list;

export const { updatePreviousSubreddit } = previousSubredditSlice.actions

export default previousSubredditSlice.reducer


