import { TypeOf, boolean, object, string } from "zod";

const payload = {
  body: object({
    quote: string().optional(),
    quotedBy: string().optional(),
    active: boolean(),
  }),
};

const params = {
  params: object({
    testimonialId: string().min(1, "Testimonial ID is required"),
  }),
};

const createTestimonialSchema = object({ ...payload });
const updateTestimonialSchema = object({ ...params, ...payload });
const getTestimonialSchema = object({ ...params });
const deleteTestimonialSchema = object({ ...params });

export type CreateTestimonialInput = TypeOf<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = TypeOf<typeof updateTestimonialSchema>;
export type GetTestimonialInput = TypeOf<typeof getTestimonialSchema>;
export type DeleteTestimonialInput = TypeOf<typeof deleteTestimonialSchema>;
