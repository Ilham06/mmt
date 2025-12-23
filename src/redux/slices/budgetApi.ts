import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const budgetApi = createApi({
  reducerPath: "budgetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include", // ⬅️ penting untuk auth cookie
  }),
  tagTypes: ["Budget"],

  endpoints: (builder) => ({
    // ===============================
    // GET BUDGET STATUS (SURVIVAL MODE)
    // ===============================
    getBudgetStatus: builder.query<any[], void>({
      query: () => "budgets/status",
      providesTags: ["Budget"],
    }),

    // ===============================
    // CREATE / SET BUDGET
    // ===============================
    createBudget: builder.mutation({
      query: (body) => ({
        url: "budgets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Budget"],
    }),

    updateBudget: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `budgets/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Budget"],
    }),

    deleteBudget: builder.mutation({
      query: (id: string) => ({
        url: `budgets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Budget"],
    }),
  }),
});

export const {
  useGetBudgetStatusQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} = budgetApi;
