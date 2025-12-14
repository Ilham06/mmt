import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Transaction", "Wallet"],

  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (params) => ({
        url: "transactions",
        params,
      }),
      providesTags: ["Transaction"],
    }),

    getTransactionById: builder.query({
      query: (id) => `transactions/${id}`,
      providesTags: ["Transaction"],
    }),

    createTransaction: builder.mutation({
      query: (data) => ({
        url: "transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),

    updateTransaction: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `transactions/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),

    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction", "Wallet"],
    }),

    getTransactionStats: builder.query<
      {
        totalIncome: number;
        totalExpense: number;
        totalTransfer: number;
        incomeCount: number;
        expenseCount: number;
        transferCount: number;
        count: number;
      },
      {
        wallet?: string;
        category?: string;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: (params) => ({
        url: "transactions/stats", // ← SESUAI ENDPOINT KAMU
        params,
      }),
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionStatsQuery
} = transactionApi;
