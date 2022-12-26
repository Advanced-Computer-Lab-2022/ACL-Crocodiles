import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { value: "" },
  reducers: {
    chooseSearch: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { chooseSearch } = searchSlice.actions;
export default searchSlice.reducer;
