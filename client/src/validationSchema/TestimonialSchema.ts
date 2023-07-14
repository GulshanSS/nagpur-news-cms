import { TypeOf, z } from "zod";

export const TestimonialSchema = z.object({
  media: z.instanceof(FileList),
  quote: z.string().optional(),
  quotedBy: z.string().optional(),
  active: z.boolean().optional(),
});

export type TestimonialInput = TypeOf<typeof TestimonialSchema>;
