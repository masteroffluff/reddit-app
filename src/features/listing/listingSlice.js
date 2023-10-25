import {createSlice} from '@reduxjs/toolkit';


export const listingSlice = createSlice(
    {
        name:'listing',
        initialState:{
            listing:{}
        },
        reducers:{
            updateListing:(state,action)=>{
             
            }
        }
    })
    
    


export const { updateListing } = listingSlice.actions

export default listingSlice.reducer

