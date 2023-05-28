import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/userSlice";
import venuesManageReducer from "./venuesManage/venuesManageSlice";
import bookingReducer from "./booking/bookingSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const reducers = combineReducers({
  user: userReducer,
  venuesManage: venuesManageReducer,
  booking: bookingReducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
