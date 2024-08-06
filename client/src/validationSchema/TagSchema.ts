import { TypeOf, z } from "zod";

export const TagSchema = z.object({
  name: z.string().min(1, "Tag Name is required"),
  slug: z.string().min(1, "Slug is required"),
  setAsCategory: z.boolean().optional(),
  active: z.boolean().optional(),
});

export type TagInput = TypeOf<typeof TagSchema>;
