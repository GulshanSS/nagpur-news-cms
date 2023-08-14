import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReAuth from "../baseQueryWithReAuth";
import { Article } from "./types";
import {
  CreateArticleInput,
  UpdateArticleInput,
} from "../../validationSchema/ArticleSchema";
import { fileUploadApi } from "./fileUploadApi";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Article"],
  endpoints: (builder) => ({
    createArticle: builder.mutation<
      { success: boolean; article: Article },
      CreateArticleInput
    >({
      query: (data) => {
        const { media, ...rest } = data;
        return {
          url: "/article/create",
          method: "POST",
          body: {
            ...rest,
            category: [...rest.category].map(({ value }) => value),
            tag: [...rest.tag].map(({ value }) => value),
          },
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (args.media.length > 0) {
            const formData = new FormData();
            args.media.forEach((media) => formData.append("files", media));
            formData.append("articleId", data.article.id.toString());
            await dispatch(
              fileUploadApi.endpoints.uploadMutipleFileForArticle.initiate(
                formData
              )
            );
          }
          dispatch(articleApi.util.invalidateTags(["Article"]));
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e);
        }
      },
    }),
    updateArticle: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      UpdateArticleInput & { state: String; articleId: number }
    >({
      query: (data) => {
        const { media, articleId, ...rest } = data;
        return {
          url: `/article/${articleId}/update`,
          method: "PUT",
          body: {
            ...rest,
            category: [...rest.category].map(({ value }) => value),
            tag: [...rest.tag].map(({ value }) => value),
          },
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          if (args.media.length > 0) {
            const formData = new FormData();
            args.media.forEach((media) => formData.append("files", media));
            formData.append("articleId", args.articleId.toString());
            await dispatch(
              fileUploadApi.endpoints.uploadMutipleFileForArticle.initiate(
                formData
              )
            );
          }
          dispatch(articleApi.util.invalidateTags(["Article"]));
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e);
        }
      },
    }),
    getArticleByState: builder.query<
      {
        success: boolean;
        articles: Article[];
        count: number;
        page: number;
        pages: number;
      },
      { state: string; page: number }
    >({
      query: ({ state, page }) => ({
        url: `/article/state/${state}?page=${page}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Article"],
    }),
    getAllArticle: builder.query<
      {
        success: boolean;
        articles: Article[];
        count: number;
        page: number;
        pages: number;
      },
      number
    >({
      query: (page) => ({
        url: `/article?page=${page}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Article"],
    }),
    getArticle: builder.query<{ success: boolean; article: Article }, number>({
      query: (id) => ({
        url: `/article/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Article"],
    }),
    getArticleByStateAndTitle: builder.query<
      {
        success: boolean;
        articles: Article[];
        count: number;
        page: number;
        pages: number;
      },
      { state: string; title: string; page: number }
    >({
      query: ({ state, title, page }) => ({
        url: `/article/state/${state}/search/${title}?page=${page}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Article"],
    }),
    getArticleByTitle: builder.query<
      {
        success: boolean;
        articles: Article[];
        count: number;
        page: number;
        pages: number;
      },
      { title: string; page: number }
    >({
      query: ({ title, page }) => ({
        url: `/article/search/${title}?page=${page}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Article"],
    }),
    deleteArticle: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/article/${id}/delete`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Article"],
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useGetArticleByStateQuery,
  useGetAllArticleQuery,
  useGetArticleQuery,
  useGetArticleByStateAndTitleQuery,
  useGetArticleByTitleQuery,
  useDeleteArticleMutation,
} = articleApi;
