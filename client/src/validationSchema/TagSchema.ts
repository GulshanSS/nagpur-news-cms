import { TypeOf, z } from "zod";

export const TagSchema = z.object({
  name: z.string().min(1, "Tag Name is required"),
  active: z.boolean().optional(),
});

export type TagInput = TypeOf<typeof TagSchema>;
