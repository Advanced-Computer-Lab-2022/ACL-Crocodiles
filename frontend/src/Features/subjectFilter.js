import {createSlice} from '@reduxjs/toolkit';


const subjectFilterSlice = createSlice({
    name: "subjectFilter",
    initialState: {value:{label:""}},
    reducers:{
        chooseSubjectFilter: (state, action) =>{
            state.value = action.payload;
        },
    }, 
});

export const {chooseSubjectFilter} = subjectFilterSlice.actions;
export default subjectFilterSlice.reducer;