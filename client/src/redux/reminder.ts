import { createSlice } from "@reduxjs/toolkit";

const reminderSlice = createSlice({
  name: "reminder",
  initialState: { reminder: "" },
  reducers: {
    setReminder: (state, action) => {
      state.reminder = action.payload;
    },
  },
});

export const { setReminder } = reminderSlice.actions;
export default reminderSlice.reducer;
