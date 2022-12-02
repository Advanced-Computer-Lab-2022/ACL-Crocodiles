import {createSlice} from '@reduxjs/toolkit';


const countrySlice = createSlice({
    name: "country",
    initialState: {value:{countryName:"USA",rate:1, code:"USD"}},
    reducers:{
        chooseCountry: (state, action) =>{
            state.value = action.payload;
        },
    }, 
});

export const {chooseCountry} = countrySlice.actions;
export default countrySlice.reducer;