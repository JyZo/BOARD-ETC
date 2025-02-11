import { configureStore } from "@reduxjs/toolkit";
import postsApi from "./API/posts/postsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./API/user/userSlice";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

setupListeners(store.dispatch);
