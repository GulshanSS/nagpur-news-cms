import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReAuth from "../baseQueryWithReAuth";
import { ArticleSection } from "./types";
import {
  CreateArticleSectionInput,
  UpdateArticleSectionInput,
} from "../../validationSchema/ArticleSectionSchema";
import { fileUploadApi } from "./fileUploadApi";

export const articleSectionApi = createApi({
  reducerPath: "articleSectionApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["ArticleSection"],
  endpoints: (builder) => ({
    createArticleSection: builder.mutation<
      { success: boolean; articleSection: ArticleSection },
      CreateArticleSectionInput & { articleId: number }
    >({
      query: (data) => {
        const { media, ...rest } = data;
        return {
          url: "/article-section/create",
          method: "POST",
          body: rest,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (args.media.length > 0) {
            const formData = new FormData();
            args.media.forEach((media) => formData.append("files", media));
            formData.append(
              "articleSectionId",
              data.articleSection.id.toString()
            );
            await dispatch(
              fileUploadApi.endpoints.uploadMutipleFileForArticleSection.initiate(
                formData
              )
            );
          }
          dispatch(articleSectionApi.util.invalidateTags(["ArticleSection"]));
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e);
        }
      },
    }),
    updateArticleSection: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      UpdateArticleSectionInput & {
        articleSectionId: number;
        articleId: number;
      }
    >({
      query: (data) => {
        const { media, articleSectionId, ...rest } = data;
        return {
          url: `/article-section/${articleSectionId}/update`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          if (args.media.length > 0) {
            const formData = new FormData();
            args.media.forEach((media) => formData.append("files", media));
            formData.append(
              "articleSectionId",
              args.articleSectionId.toString()
            );
            await dispatch(
              fileUploadApi.endpoints.uploadMutipleFileForArticleSection.initiate(
                formData
              )
            );
          }
          dispatch(articleSectionApi.util.invalidateTags(["ArticleSection"]));
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e);
        }
      },
    }),
    getAllArticleSectionsForArticle: builder.query<
      { success: boolean; articleSections: ArticleSection[] },
      number
    >({
      query: (id) => `/article-section/${id}/article`,
      providesTags: ["ArticleSection"],
    }),
    getArticleSection: builder.query<
      { success: boolean; articleSection: ArticleSection },
      number
    >({
      query: (id) => `/article-section/${id}`,
      providesTags: ["ArticleSection"],
    }),
    deleteArticleSection: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/article-section/${id}/delete`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ArticleSection"],
    }),
  }),
});

export const {
  useCreateArticleSectionMutation,
  useUpdateArticleSectionMutation,
  useGetAllArticleSectionsForArticleQuery,
  useGetArticleSectionQuery,
  useDeleteArticleSectionMutation,
} = articleSectionApi;
