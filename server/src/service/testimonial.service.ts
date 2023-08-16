import {
  CreateTestimonialInput,
  UpdateTestimonialInput,
} from "../schemas/testimonial.schema";
import db from "../utils/db.server";

export const getAllTestimonials = async (skip: number, take: number) => {
  return await db.testimonial.findMany({
    include: {
      media: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
    skip,
    take,
  });
};

export const getTestimonialById = async (testimonialId: string) => {
  return await db.testimonial.findUnique({
    where: {
      id: parseInt(testimonialId),
    },
    include: {
      media: true,
    },
  });
};

export const getTestimonialByQuotedBy = async (
  quotedBy: string,
  skip: number,
  take: number
) => {
  return await db.testimonial.findMany({
    where: {
      quotedBy: {
        contains: quotedBy,
      },
    },
    include: {
      media: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
    skip,
    take,
  });
};

export const createTestimonial = async (
  testimonial: CreateTestimonialInput["body"]
) => {
  return await db.testimonial.create({
    data: testimonial,
  });
};

export const updateTestimonialById = async (
  testimonialId: string,
  testimonial: UpdateTestimonialInput["body"]
) => {
  return await db.testimonial.update({
    where: {
      id: parseInt(testimonialId),
    },
    data: testimonial,
  });
};

export const deleteTestimonialById = async (testimonialId: string) => {
  return await db.testimonial.delete({
    where: {
      id: parseInt(testimonialId),
    },
  });
};
