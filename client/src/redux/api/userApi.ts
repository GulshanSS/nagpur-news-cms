import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import { User } from "./types";
import { UserInput } from "../../validationSchema/UserSchema";
import { ResetPasswordInput } from "../../validationSchema/ResetPasswordSchema";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/user`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<User, null>({
      query: () => ({
        url: "/me",
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
        url: `/${id}`,
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
        url: "/",
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
        url: `/search/${name}`,
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
        url: "/create",
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
        url: "/reset-password",
        method: "PATCH",
        body: { password: data.password },
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation<{ success: true; message: true }, number>({
      query: (id) => ({
        url: `/${id}/delete`,
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
