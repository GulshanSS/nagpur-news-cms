import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReAuth from "../baseQueryWithReAuth";
import { Media } from "./types";

export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Image"],
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation<
      { success: boolean; media: Media },
      FormData
    >({
      query: (data) => ({
        url: "/media/upload/single",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Image"],
    }),
    updateMedia: builder.mutation<{ success: boolean; media: Media }, FormData>(
      {
        query: (data) => ({
          url: "/media/update",
          method: "PUT",
          body: data,
          credentials: "include",
        }),
        invalidatesTags: ["Image"],
      }
    ),
  }),
});

export const { useUploadSingleFileMutation, useUpdateMediaMutation } =
  fileUploadApi;
