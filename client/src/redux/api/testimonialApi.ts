import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReAuth from "../baseQueryWithReAuth";
import { TestimonialInput } from "../../validationSchema/TestimonialSchema";
import { Testimonial } from "./types";

export const testimonialApi = createApi({
  reducerPath: "testimonialApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Testimonial"],
  endpoints: (builder) => ({
    createTestimonial: builder.mutation<
      { success: boolean; message: string },
      Omit<TestimonialInput, "media"> & { mediaId: number }
    >({
      query: (data) => ({
        url: "/testimonial/create",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Testimonial"],
    }),
    getAllTestimonial: builder.query<
      {
        success: boolean;
        testimonials: Testimonial[];
      },
      void
    >({
      query: () => "/testimonial",
      providesTags: ["Testimonial"],
    }),
    getTestimonial: builder.query<
      { success: boolean; testimonial: Testimonial },
      number
    >({
      query: (id) => `/testimonial/${id}`,
      providesTags: ["Testimonial"],
    }),
    getTestimonialsByQuotedBy: builder.query<
      {
        success: boolean;
        testimonials: Testimonial[];
      },
      string
    >({
      query: (quotedBy) => `/testimonial/search/${quotedBy}`,
      providesTags: ["Testimonial"],
    }),
    deleteTestimonial: builder.mutation<
      { success: boolean; message: string },
      number
    >({
      query: (id) => ({
        url: `/testimonial/${id}/delete`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Testimonial"],
    }),
  }),
});

export const {
  useCreateTestimonialMutation,
  useGetAllTestimonialQuery,
  useGetTestimonialQuery,
  useGetTestimonialsByQuotedByQuery,
  useDeleteTestimonialMutation,
} = testimonialApi;
