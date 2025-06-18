import { createSlice } from "@reduxjs/toolkit";

const darkmodeSlice = createSlice({
  name: "darkmode",
  initialState: { dark: false },
  reducers: {
    toggleDarkMode: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const { toggleDarkMode } = darkmodeSlice.actions;
export default darkmodeSlice.reducer;
