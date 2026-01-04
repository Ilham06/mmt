import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* =======================
   TYPES
======================= */
export interface Profile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  createdAt: string;
}

export interface NotificationSettings {
  transaction: boolean;
  reminder: boolean;
  email: boolean;
}

export interface Preferences {
  language: string;
  theme: "light" | "dark";
}

/* =======================
   API SLICE
======================= */
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Profile", "Notification", "Preference"],

  endpoints: (builder) => ({
    /* ================= PROFILE ================= */

    getProfile: builder.query<Profile, void>({
      query: () => "profile",
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<
      Profile,
      { name: string; bio?: string }
    >({
      query: (body) => ({
        url: "profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    /* ================= SECURITY ================= */

    changePassword: builder.mutation<
      { success: boolean },
      { currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "profile/security",
        method: "PUT",
        body,
      }),
    }),

    /* ================= NOTIFICATIONS ================= */

    getNotificationSettings: builder.query<
      NotificationSettings,
      void
    >({
      query: () => "profile/notifications",
      providesTags: ["Notification"],
    }),

    updateNotificationSettings: builder.mutation<
      { success: boolean },
      NotificationSettings
    >({
      query: (body) => ({
        url: "profile/notifications",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),

    /* ================= PREFERENCES ================= */

    getPreferences: builder.query<Preferences, void>({
      query: () => "profile/preferences",
      providesTags: ["Preference"],
    }),

    updatePreferences: builder.mutation<
      { success: boolean },
      Preferences
    >({
      query: (body) => ({
        url: "profile/preferences",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Preference"],
    }),

    /* ================= LOGOUT ================= */

    logout: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "profile/logout",
        method: "POST",
      }),
    }),
  }),
});

/* =======================
   EXPORT HOOKS
======================= */
export const {
  useGetProfileQuery,
  useUpdateProfileMutation,

  useChangePasswordMutation,

  useGetNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,

  useGetPreferencesQuery,
  useUpdatePreferencesMutation,

  useLogoutMutation,
} = profileApi;
