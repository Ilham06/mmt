import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recapApi = createApi({
  reducerPath: "recapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
    credentials: "include", // ⬅️ auth cookie
  }),
  tagTypes: ["DailyRecap"],

  endpoints: (builder) => ({
    // ===============================
    // GET DAILY RECAP
    // ===============================
    getDailyRecap: builder.query<
      {
        date: string;
        income: number;
        expense: number;
        mood: "GOOD" | "OK" | "BAD";
        topCategory: { name: string; icon: string } | null;
        transactions: any[];
      },
      { date?: string } | void
    >({
      query: (params) => {
        if (params?.date) {
          return `recap/daily?date=${params.date}`;
        }
        return "recap/daily";
      },
      providesTags: ["DailyRecap"],
    }),
  }),
});

export const { useGetDailyRecapQuery } = recapApi;
