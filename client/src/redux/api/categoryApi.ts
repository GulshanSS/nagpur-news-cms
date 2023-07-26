import { createApi } from "@reduxjs/toolkit/query/react";
import { CategoryInput } from "../../validationSchema/CategorySchema";
import { Category } from "./types";
import baseQueryWithReAuth from "../baseQueryWithReAuth";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      { success: boolean; count: number; categories: Category[] },
      void
    >({
      query: () => ({
        url: "/category",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Category"],
    }),
    getCategory: builder.query<
      { success: boolean; category: Category },
      number
    >({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Category"],
    }),
    getCategoryByName: builder.query<
      { success: boolean; count: number; categories: Category[] },
      string
    >({
      query: (name) => ({
        url: `/category/search/${name}`,
        method: "GET",
        credentials: "include",
      }),
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
