import {createSlice} from '@reduxjs/toolkit';


export const searchResultsSlice = createSlice(
    {
        name:'searchResults',
        initialState:{
            searchResults:{}
        },
        reducers:{
            updateSearchResults:(state,action)=>{
             
            }
        }
    })
    
    


export const { updateSearchResults } = searchResultsSlice.actions

export default searchResultsSlice.reducer