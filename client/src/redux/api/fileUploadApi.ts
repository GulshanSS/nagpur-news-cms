import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReAuth from "../baseQueryWithReAuth";
import { Media } from "./types";

export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Image"],
  endpoints: (builder) => ({
    uploadSingleFileForTestimonial: builder.mutation<
      { success: boolean; media: Media },
      FormData
    >({
      query: (data) => ({
        url: "/media/upload/single/testimonial",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Image"],
    }),
    uploadSingleFileForPromotionaryArticle: builder.mutation<
      { success: boolean; media: Media },
      FormData
    >({
      query: (data) => ({
        url: "/media/upload/single/promotionary-article",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Image"],
    }),
    uploadMutipleFileForArticle: builder.mutation<
      { success: boolean; messsgae: string },
      FormData
    >({
      query: (data) => ({
        url: "/media/upload/multiple/article",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Image"],
    }),
    uploadMutipleFileForArticleSection: builder.mutation<
      { success: boolean; messsgae: string },
      FormData
    >({
      query: (data) => ({
        url: "/media/upload/mutiple/article-section",
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

export const {
  useUploadSingleFileForTestimonialMutation,
  useUploadSingleFileForPromotionaryArticleMutation,
  useUploadMutipleFileForArticleMutation,
  useUploadMutipleFileForArticleSectionMutation,
  useUpdateMediaMutation,
} = fileUploadApi;
