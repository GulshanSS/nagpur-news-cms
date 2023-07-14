import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import { User } from "./types";
import { UserInput } from "../../validationSchema/UserSchema";
import { ResetPasswordInput } from "../../validationSchema/ResetPasswordSchema";
import baseQueryWithReAuth from "../baseQueryWithReAuth";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<User, null>({
      query: () => ({
        url: "/user/me",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (result: { success: boolean; user: User }) => {
        return result.user;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e.message);
        }
      },
    }),
    getUserById: builder.query<{ success: boolean; user: User }, number>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    getAllUsers: builder.query<
      { success: boolean; users: User[]; count: number },
      void
    >({
      query: () => ({
        url: "/user",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    getUsersByName: builder.query<
      {
        success: boolean;
        users: User[];
        count: number;
      },
      string
    >({
      query: (name) => ({
        url: `/user/search/${name}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation<
      { success: boolean; message: string },
      UserInput
    >({
      query: (data) => ({
        url: "/user/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation<
      { success: true; message: true },
      ResetPasswordInput
    >({
      query: (data) => ({
        url: "/user/reset-password",
        method: "PATCH",
        body: { password: data.password },
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation<{ success: true; message: true }, number>({
      query: (id) => ({
        url: `/user/${id}/delete`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useGetAllUsersQuery,
  useGetUsersByNameQuery,
  useCreateUserMutation,
  useResetPasswordMutation,
  useDeleteUserMutation,
} = userApi;
