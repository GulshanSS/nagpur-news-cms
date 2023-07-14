import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { TagInput } from "../../validationSchema/TagSchema";
import { Tag } from "./types";
import baseQueryWithReAuth from "../baseQueryWithReAuth";

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Tag"],
  endpoints: (builder) => ({
    getAllTags: builder.query<
      { success: boolean; count: number; tags: Tag[] },
      void
    >({
      query: () => "/tag",
      providesTags: ["Tag"],
    }),
    getTag: builder.query<{ success: boolean; tag: Tag }, number>({
      query: (id) => `/tag/${id}`,
      providesTags: ["Tag"],
    }),
    getTagByName: builder.query<
      { success: boolean; count: number; tags: Tag[] },
      string
    >({
      query: (name) => `/tag/search/${name}`,
      providesTags: ["Tag"],
    }),
    createTag: builder.mutation<{ success: boolean; tag: Tag }, TagInput>({
      query: (data: TagInput) => ({
        url: "/tag/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Tag"],
    }),
    updateTag: builder.mutation<{ success: boolean; tag: Tag }, Partial<Tag>>({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `/tag/${id}/update`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["Tag"],
    }),
    deleteTag: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/tag/${id}/delete`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});

export const {
  useGetAllTagsQuery,
  useGetTagQuery,
  useGetTagByNameQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApi;
