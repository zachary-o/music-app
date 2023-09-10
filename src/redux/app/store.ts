import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice";
import songReducer from "../features/song/songSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    song: songReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
