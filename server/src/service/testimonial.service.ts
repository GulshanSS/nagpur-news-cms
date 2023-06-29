import {
  CreateTestimonialInput,
  UpdateTestimonialInput,
} from "../schemas/testimonial.schema";
import db from "../utils/db.server";

export const getAllTestimonials = async () => {
  return await db.testimonial.findMany({});
};

export const getTestimonialById = async (testimonialId: string) => {
  return await db.testimonial.findUnique({
    where: {
      id: parseInt(testimonialId),
    },
  });
};

export const createTestimonial = async (
  testimonial: CreateTestimonialInput["body"]
) => {
  return await db.testimonial.create({
    data: testimonial,
  });
};

export const updateTestimonial = async (
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

export const deleteTestimonial = async (testimonialId: string) => {
  return await db.testimonial.delete({
    where: {
      id: parseInt(testimonialId),
    },
  });
};
