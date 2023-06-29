import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../features/userSlice";
import { IUser } from "./types";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/user`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query<IUser, null>({
      query() {
        return {
          url: "/me",
          method: "GET",
          credentials: "include",
        };
      },
      transformResponse: (result: { user: IUser }) => {
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
  }),
});
