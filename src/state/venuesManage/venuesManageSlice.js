import { createSlice } from "@reduxjs/toolkit";

const venuesManageSlice = createSlice({
  name: "venuesManage",
  initialState: { venuesManage: [] },
  reducers: {
    venuesManageLoaded(state, action) {
      state.venuesManage = action.payload;
    },
    venueUpdated(state, action) {
      const updatedVenue = action.payload;
      const index = state.venuesManage.findIndex(
        (venue) => venue.id === updatedVenue.id
      );
      if (index !== -1) {
        state.venuesManage[index] = updatedVenue;
      }
    },
    venueDeleted(state, action) {
      const deletedVenue = action.payload;
      //console.log(deletedVenue); // this is the id of the deleted venue
      state.venuesManage = state.venuesManage.filter(
        (venue) => venue.id !== deletedVenue
      );
    },
  },
});

export const { venuesManageLoaded, venueUpdated, venueDeleted } =
  venuesManageSlice.actions;
export default venuesManageSlice.reducer;
