import { configureStore } from "@reduxjs/toolkit";
import { walletApi } from "./slices/walletApi";
import { categoryApi } from "./slices/categoryApi";
import { transactionApi } from "./slices/transactionApi";
import { budgetApi } from "./slices/budgetApi";
import { recapApi } from './slices/recapApi';


export const store = configureStore({
  reducer: {
    [walletApi.reducerPath]: walletApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [budgetApi.reducerPath]: budgetApi.reducer,
    [recapApi.reducerPath]: recapApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      walletApi.middleware,
      categoryApi.middleware,
      transactionApi.middleware,
      budgetApi.middleware,
      recapApi.middleware
    ]),
});

// auto-infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
