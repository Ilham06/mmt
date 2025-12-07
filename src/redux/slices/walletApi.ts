import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Wallet"],

  endpoints: (builder) => ({
    getWallets: builder.query<any, void>({
      query: () => "wallets",
      providesTags: ["Wallet"],
    }),

    getWalletById: builder.query({
      query: (id) => `wallets/${id}`,
      providesTags: ["Wallet"],
    }),

    createWallet: builder.mutation({
      query: (data) => ({
        url: "wallets",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet"],
    }),

    updateWallet: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `wallets/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Wallet"],
    }),

    deleteWallet: builder.mutation({
      query: (id) => ({
        url: `wallets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wallet"],
    }),
  }),
});

export const {
  useGetWalletsQuery,
  useGetWalletByIdQuery,
  useCreateWalletMutation,
  useUpdateWalletMutation,
  useDeleteWalletMutation,
} = walletApi;
