import {createSlice} from '@reduxjs/toolkit';


export const articleSlice = createSlice(
    {
        name:'article',
        initialState:{
            article:{}
        },
        reducers:{
            updateArticle:(state,action)=>{
             
            }
        }
    })
    
    


export const { updateArticle } = articleSlice.actions

export default articleSlice.reducer