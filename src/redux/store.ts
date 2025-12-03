import { configureStore } from "@reduxjs/toolkit";
import modalsReducer from "./slices/modalsopen";
import shopSlice from "./slices/shopSlice";
import actionSlice from "./slices/actionSlice";

export const store = configureStore({
  reducer: {
    shop: shopSlice,
    modals: modalsReducer,
    action: actionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
