import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoryInput } from "../../validationSchema/CategorySchema";
import { Category } from "./types";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/category`,
  }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      { success: boolean; count: string; categories: Category[] },
      void
    >({
      query: () => "/",
      providesTags: ["Category"],
    }),
    getCategory: builder.query<
      { success: boolean; category: Category },
      string
    >({
      query: (id) => `/${id}`,
      providesTags: ["Category"],
    }),
    getCategoryByName: builder.query<
      { success: boolean; count: string; categories: Category[] },
      string
    >({
      query: (name) => `/search/${name}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<
      { success: boolean; category: Category },
      CategoryInput
    >({
      query: (data: CategoryInput) => ({
        url: "/create",
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
          url: `/${id}/update`,
          method: "PUT",
          body: rest,
          credentials: "include",
        };
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/${id}/delete`,
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
