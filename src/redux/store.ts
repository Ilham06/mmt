import { configureStore } from "@reduxjs/toolkit";
import { walletApi } from "./slices/walletApi";
import { categoryApi } from "./slices/categoryApi";
import { transactionApi } from "./slices/transactionApi";

export const store = configureStore({
  reducer: {
    [walletApi.reducerPath]: walletApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      walletApi.middleware,
      categoryApi.middleware,
      transactionApi.middleware,
    ]),
});

// auto-infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
