import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import noteReducer from "./NoteSlice";

export const store = configureStore({
  reducer: { user: userReducer, notes: noteReducer },
});
