import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { TagInput } from "../../validationSchema/TagSchema";
import { Tag } from "./types";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/tag`,
  }),
  tagTypes: ["Tag"],
  endpoints: (builder) => ({
    getAllTags: builder.query<
      { success: boolean; count: number; tags: Tag[] },
      void
    >({
      query: () => "/",
      providesTags: ["Tag"],
    }),
    getTag: builder.query<{ success: boolean; tag: Tag }, number>({
      query: (id) => `/${id}`,
      providesTags: ["Tag"],
    }),
    getTagByName: builder.query<
      { success: boolean; count: number; tags: Tag[] },
      string
    >({
      query: (name) => `/search/${name}`,
      providesTags: ["Tag"],
    }),
    createTag: builder.mutation<{ success: boolean; tag: Tag }, TagInput>({
      query: (data: TagInput) => ({
        url: "/create",
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
          url: `${id}/update`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["Tag"],
    }),
    deleteTag: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/${id}/delete`,
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
