import {createSlice} from '@reduxjs/toolkit';


const ratingFilterSlice = createSlice({
    name: "rateFilter",
    initialState: {value:{range:[0,5]}},
    reducers:{
        chooseRatingFilter: (state, action) =>{
            state.value = action.payload;
        },
    }, 
});

export const {chooseRatingFilter} = ratingFilterSlice.actions;
export default ratingFilterSlice.reducer;