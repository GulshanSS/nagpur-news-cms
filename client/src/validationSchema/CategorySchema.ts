import { TypeOf, z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
  active: z.boolean().optional(),
});

export type CategoryInput = TypeOf<typeof CategorySchema>;
