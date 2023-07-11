import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";
import { LoginInput } from "../../validationSchema/LoginSchema";
import { OTPInput } from "./types";
import { EmailInput } from "../../validationSchema/EmailSchema";
import { ResetPasswordInput } from "../../validationSchema/ResetPasswordSchema";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1`,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { success: boolean; access_token: string },
      LoginInput
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
      Pick<OTPInput, "userId">
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
      OTPInput
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
    sendResetPasswordLink: builder.mutation<
      { success: boolean; message: string },
      EmailInput
    >({
      query: (data) => ({
        url: "/reset-password-link",
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordByToken: builder.mutation<
      { success: boolean; message: string },
      { token: string } & ResetPasswordInput
    >({
      query: (data) => ({
        url: `/reset-password/${data.token}`,
        method: "POST",
        body: { password: data.password },
      }),
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
  useSendResetPasswordLinkMutation,
  useResetPasswordByTokenMutation,
  useLogoutUserMutation,
} = authApi;
