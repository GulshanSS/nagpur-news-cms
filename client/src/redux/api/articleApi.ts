import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReAuth from "../baseQueryWithReAuth";
import { Article } from "./types";
import { CreateArticleInput } from "../../validationSchema/ArticleSchema";
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
          if (args.media.length > 0) {
            const { data } = await queryFulfilled;
            const formData = new FormData();
            args.media.forEach((media) => formData.append("files", media));
            formData.append("articleId", data.article.id.toString());
            await dispatch(
              fileUploadApi.endpoints.uploadMutipleFileForArticle.initiate(
                formData
              )
            );
            dispatch(articleApi.util.invalidateTags(["Article"]));
          }
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e);
        }
      },
    }),
  }),
});

export const { useCreateArticleMutation } = articleApi;
