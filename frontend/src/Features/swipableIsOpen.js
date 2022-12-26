import {createSlice} from '@reduxjs/toolkit';


const SwipableIsOpenSlice = createSlice({
    name: "swipableIsOpen",
    initialState: {value:false},
    reducers:{
        chooseSwipableIsOpen: (state, action) =>{
            state.value = action.payload;
        },
    }, 
});

export const {chooseSwipableIsOpen} = SwipableIsOpenSlice.actions;
export default SwipableIsOpenSlice.reducer;