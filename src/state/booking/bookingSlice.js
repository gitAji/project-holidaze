import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "booking",
  initialState: { booking: [] },
  reducers: {
    bookingSuccess(state, action) {
      state.booking = action.payload;
    },
  },
});
export const { bookingSuccess } = bookingSlice.actions;
export default bookingSlice.reducer;
