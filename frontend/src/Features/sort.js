import { createSlice } from "@reduxjs/toolkit";

const sortSlice = createSlice({
  name: "sort",
  initialState: { value: { element: null, ascending: 1 } },
  reducers: {
    chooseSort: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { chooseSort } = sortSlice.actions;
export default sortSlice.reducer;
