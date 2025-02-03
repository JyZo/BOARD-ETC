import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserDetails: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout: (state, action) => {
      state._id = "";
      state.name = "";
      state.email = "";
    },
  },
});

export const { setUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;
