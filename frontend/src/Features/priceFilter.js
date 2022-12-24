import {createSlice} from '@reduxjs/toolkit';


const priceFilterSlice = createSlice({
    name: "priceFilter",
    initialState: {value:{range:[0,500]}},
    reducers:{
        choosePriceFilter: (state, action) =>{
            state.value = action.payload;
        },
    }, 
});

export const {choosePriceFilter} = priceFilterSlice.actions;
export default priceFilterSlice.reducer;