import {createSlice} from '@reduxjs/toolkit';


export const commentsSlice = createSlice(
    {
        name:'comments',
        initialState:{
            comments:{}
        },
        reducers:{
            updateComments:(state,action)=>{
             
            }
        }
    })
    
    


export const { updateComments } = commentsSlice.actions

export default commentsSlice.reducer

