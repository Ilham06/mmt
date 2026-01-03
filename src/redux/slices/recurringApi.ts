import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recurringApi = createApi({
  reducerPath: "recurringApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Recurring"],

  endpoints: (builder) => ({
    getRecurringTransactions: builder.query({
      query: () => "recurring-transactions",
      providesTags: ["Recurring"],
    }),

    createRecurringTransaction: builder.mutation({
      query: (data) => ({
        url: "recurring-transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Recurring"],
    }),

    updateRecurringTransaction: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `recurring-transactions/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Recurring"],
    }),
  }),
});

export const { useCreateRecurringTransactionMutation, useGetRecurringTransactionsQuery, useLazyGetRecurringTransactionsQuery, useUpdateRecurringTransactionMutation } = recurringApi
