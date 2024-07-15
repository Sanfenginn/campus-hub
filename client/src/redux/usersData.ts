import { createSlice } from "@reduxjs/toolkit";

const usersDataSlice = createSlice({
  name: "usersData",
  initialState: [],
  reducers: {
    setUsersData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUsersData } = usersDataSlice.actions;
export default usersDataSlice.reducer;
