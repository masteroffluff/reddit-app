import {createSlice} from '@reduxjs/toolkit';


export const previousSubredditSlice = createSlice(
    {
        name:'previousSubreddit',
        initialState:{
            list:[]
        },
        reducers:{
            updatePreviousSubreddit:(state,action)=>{
                let {list} = state.previousSubreddit
                const temp = [...list,action.payload]
                list = temp.filter((value,index)=>temp.indexOf(value)===index)

            }
        }
    })
    
    


export const { updatePreviousSubreddit } = previousSubredditSlice.actions

export default previousSubredditSlice.reducer


