import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    name: "",
    email: "",
    avatar: "",
    venueManager: false,
    accessToken: "",
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.venueManager = action.payload.venueManager;
      state.accessToken = action.payload.accessToken;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.venueManager = false;
      state.accessToken = "";
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, updateAvatar } = userSlice.actions;

export default userSlice.reducer;
