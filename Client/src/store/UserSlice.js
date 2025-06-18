import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userId: null },
  reducers: {
    setUser: (s, a) => {
      s.userId = a.payload;
    },
    clearUser: (s) => {
      s.userId = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
