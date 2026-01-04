import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Plan {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  mode: 'SIMPLE' | 'BREAKDOWN';
  items?: {
    id: string;
    name: string;
    amount: number;
  }[];
}

export const planApi = createApi({
  reducerPath: 'planApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/',
  }),
  tagTypes: ['Plan'],
  endpoints: (builder) => ({
    // ================= LIST =================
    getPlans: builder.query<Plan[], void>({
      query: () => 'plans',
      providesTags: ['Plan'],
    }),

    // ================= DETAIL =================
    getPlanById: builder.query<Plan, string>({
      query: (id) => `plans/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Plan', id }],
    }),

    // ================= CREATE =================
    createPlan: builder.mutation<Plan, any>({
      query: (body) => ({
        url: 'plans',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Plan'],
    }),

    // ================= ADD SAVING =================
    // TAMBAHKAN DI endpoints
    addSavingToPlan: builder.mutation<
      any,
      {
        planId: string;
        amount: number;
        walletId: string;
        note?: string;
      }
    >({
      query: ({ planId, ...body }) => ({
        url: `plans/${planId}/saving`,
        method: 'POST',
        body,
      }),
    }),

    // ================= UPDATE PLAN =================
updatePlan: builder.mutation<
  any,
  {
    id: string;
    name: string;
    description?: string;
    targetDate: string;
    mode: 'SIMPLE' | 'BREAKDOWN';
    targetAmount: number;
    items?: { name: string; amount: number }[];
  }
>({
  query: ({ id, ...body }) => ({
    url: `plans/${id}`,
    method: 'PUT',
    body,
  }),
  invalidatesTags: (_r, _e, arg) => [
    { type: 'Plan', id: arg.id },
    'Plan',
  ],
}),

// ================= DELETE PLAN =================
deletePlan: builder.mutation<
  { success: boolean },
  string
>({
  query: (id) => ({
    url: `plans/${id}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['Plan'],
}),


  }),
});

export const {
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useCreatePlanMutation,
  useAddSavingToPlanMutation,
  useDeletePlanMutation,
  useUpdatePlanMutation
} = planApi;
