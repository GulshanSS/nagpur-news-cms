import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReAuth from "../baseQueryWithReAuth";
import {
  CreateTestimonialInput,
  UpdateTestimonialInput,
} from "../../validationSchema/TestimonialSchema";
import { Testimonial } from "./types";
import { fileUploadApi } from "./fileUploadApi";

export const testimonialApi = createApi({
  reducerPath: "testimonialApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Testimonial"],
  endpoints: (builder) => ({
    createTestimonial: builder.mutation<
      { success: boolean; testimonial: Testimonial },
      CreateTestimonialInput
    >({
      query: (data) => {
        const { media, ...rest } = data;
        return {
          url: "/testimonial/create",
          method: "POST",
          body: rest,
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          if (args.media?.length! > 0) {
            const { data } = await queryFulfilled;
            const formData = new FormData();
            args.media?.forEach((media) => formData.append("file", media));
            formData.append("testimonialId", data.testimonial.id.toString());
            await dispatch(
              fileUploadApi.endpoints.uploadSingleFile.initiate(formData)
            );
            dispatch(testimonialApi.util.invalidateTags(["Testimonial"]));
          }
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e);
        }
      },
    }),
    updateTestimonial: builder.mutation<
      { succes: boolean; message: string },
      UpdateTestimonialInput & { testimonialId: number; mediaId: number }
    >({
      query: (data) => {
        const { media, testimonialId, mediaId, ...rest } = data;
        return {
          url: `/testimonial/${testimonialId}/update`,
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
          dispatch(testimonialApi.util.invalidateTags(["Testimonial"]));
        } catch (e: unknown) {
          if (e instanceof Error) console.log(e);
        }
      },
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
  useUpdateTestimonialMutation,
  useGetAllTestimonialQuery,
  useGetTestimonialQuery,
  useGetTestimonialsByQuotedByQuery,
  useDeleteTestimonialMutation,
} = testimonialApi;
