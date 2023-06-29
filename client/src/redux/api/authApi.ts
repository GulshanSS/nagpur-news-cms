import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { success: boolean; access_token: string },
      { email: string; password: string }
    >({
      query(data) {
        return {
          url: "/login",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getUser.initiate(null));
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e);
        }
      },
    }),
    sendOTP: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      { userId: string }
    >({
      query(data) {
        return {
          url: "/send-otp",
          method: "POST",
          body: data,
        };
      },
    }),
    verifyOTP: builder.mutation<
      {
        success: boolean;
        accesstoken: string;
        refreshtoken: string;
      },
      { otp: string; userId: string }
    >({
      query(data) {
        return {
          url: "/verify-otp",
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    logoutUser: builder.mutation<{ success: boolean; message: string }, void>({
      query() {
        return {
          url: "logout",
          method: "delete",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSendOTPMutation,
  useVerifyOTPMutation,
  useLogoutUserMutation,
} = authApi;
