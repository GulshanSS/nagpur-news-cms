import { TypeOf, boolean, object, string } from "zod";

const payload = {
  body: object({
    quote: string().optional(),
    quotedBy: string(),
    designation: string().optional(),
    active: boolean().optional(),
  }),
};

const params = {
  params: object({
    testimonialId: string().min(1, "Testimonial ID is required"),
  }),
};

export const createTestimonialSchema = object({ ...payload });
export const updateTestimonialSchema = object({ ...params, ...payload });
export const getTestimonialSchema = object({ ...params });
export const deleteTestimonialSchema = object({ ...params });

export type CreateTestimonialInput = TypeOf<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = TypeOf<typeof updateTestimonialSchema>;
export type GetTestimonialInput = TypeOf<typeof getTestimonialSchema>;
export type DeleteTestimonialInput = TypeOf<typeof deleteTestimonialSchema>;
