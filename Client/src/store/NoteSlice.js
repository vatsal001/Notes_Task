import { createSlice } from "@reduxjs/toolkit";

const noteSlice = createSlice({
  name: "notes",
  initialState: { notes: [] },
  reducers: {
    setNotes: (s, a) => {
      console.log(a)
      s.notes = a.payload;
    },
    addOrUpdate: (s, a) => {
      const i = s.notes.findIndex((n) => n._id === a.payload._id);
      if (i >= 0) s.notes[i] = a.payload;
      else s.notes.unshift(a.payload);
    },
    deleteNotes: (s, a) => {
      s.notes = s.notes.filter((n) => n._id !== a.payload);
    },
  },
});

export const { setNotes, addOrUpdate, deleteNotes } = noteSlice.actions;
export default noteSlice.reducer;
