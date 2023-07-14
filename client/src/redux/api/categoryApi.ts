import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryInput } from "../../validationSchema/CategorySchema";
import { Category } from "./types";
import baseQueryWithReAuth from "../baseQueryWithReAuth";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      { success: boolean; count: number; categories: Category[] },
      void
    >({
      query: () => "/category",
      providesTags: ["Category"],
    }),
    getCategory: builder.query<
      { success: boolean; category: Category },
      number
    >({
      query: (id) => `/category/${id}`,
      providesTags: ["Category"],
    }),
    getCategoryByName: builder.query<
      { success: boolean; count: number; categories: Category[] },
      string
    >({
      query: (name) => `/category/search/${name}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<
      { success: boolean; category: Category },
      CategoryInput
    >({
      query: (data) => ({
        url: "/category/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation<
      { success: boolean; category: Category },
      Partial<Category>
    >({
      query: (data) => {
        const { id, ...rest } = data;
        return {
          url: `/category/${id}/update`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/category/${id}/delete`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
  useGetCategoryByNameQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
