import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReAuth from "../baseQueryWithReAuth";
import { PromotionaryArticle } from "./types";
import {
  CreatePromotionaryArticleInput,
  UpdatePromotionaryArticleInput,
} from "../../validationSchema/PromotionaeryArticleSchema";
import { fileUploadApi } from "./fileUploadApi";

export const promotionaryArticleApi = createApi({
  reducerPath: "promotionaryArticleApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["PromotionaryArticle"],
  endpoints: (builder) => ({
    createPromotionaryArticle: builder.mutation<
      { success: boolean; promotionaryArticle: PromotionaryArticle },
      CreatePromotionaryArticleInput
    >({
      query: (data) => {
        const { media, ...rest } = data;
        return {
          url: "/promotionary-article/create",
          method: "POST",
          body: rest,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          if (args.media.length > 0) {
            const { data } = await queryFulfilled;
            const formData = new FormData();
            args.media?.forEach((media) => formData.append("file", media));
            formData.append(
              "promotionaryArticleId",
              data.promotionaryArticle.id.toString()
            );
            await dispatch(
              fileUploadApi.endpoints.uploadSingleFileForPromotionaryArticle.initiate(
                formData
              )
            );
            dispatch(
              promotionaryArticleApi.util.invalidateTags([
                "PromotionaryArticle",
              ])
            );
          }
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e);
        }
      },
    }),
    updatePromotionaryArticle: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      UpdatePromotionaryArticleInput & {
        promotionaryArticleId: number;
        mediaId: number;
      }
    >({
      query: (data) => {
        const { media, promotionaryArticleId, mediaId, ...rest } = data;
        return {
          url: `/promotionary-article/${promotionaryArticleId}/update`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          if (args.media?.length! > 0) {
            const formData = new FormData();
            args.media?.forEach((media) => formData.append("file", media));
            formData.append("mediaId", args.mediaId.toString());
            await dispatch(
              fileUploadApi.endpoints.updateMedia.initiate(formData)
            );
          }
          dispatch(
            promotionaryArticleApi.util.invalidateTags(["PromotionaryArticle"])
          );
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e);
        }
      },
    }),
    getAllPromotionaryArticle: builder.query<
      {
        success: boolean;
        promotionaryArticles: PromotionaryArticle[];
      },
      void
    >({
      query: () => "/promotionary-article",
      providesTags: ["PromotionaryArticle"],
    }),
    getPromotionaryArticle: builder.query<
      { success: boolean; promotionaryArticle: PromotionaryArticle },
      number
    >({
      query: (id) => `/promotionary-article/${id}`,
      providesTags: ["PromotionaryArticle"],
    }),
    getPromotionaryArticleByTitle: builder.query<
      {
        success: boolean;
        promotionaryArticles: PromotionaryArticle[];
      },
      string
    >({
      query: (title) => `/promotionary-article/search/${title}`,
      providesTags: ["PromotionaryArticle"],
    }),
    deletePromotionaryArticle: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/promotionary-article/${id}/delete`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["PromotionaryArticle"],
    }),
  }),
});

export const {
  useCreatePromotionaryArticleMutation,
  useUpdatePromotionaryArticleMutation,
  useGetAllPromotionaryArticleQuery,
  useGetPromotionaryArticleQuery,
  useGetPromotionaryArticleByTitleQuery,
  useDeletePromotionaryArticleMutation,
} = promotionaryArticleApi;
