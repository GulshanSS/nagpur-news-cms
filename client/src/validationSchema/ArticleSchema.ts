import { TypeOf, z } from "zod";

const MAX_FILE_SIZE = 50000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export const CreateArticleSchema = z.object({
  media: z
    .array(z.custom<File>())
    .min(1, "File is required")
    .refine(
      (files) => {
        return files.every((file) => file instanceof File);
      },
      {
        message: "Expected a file",
      }
    )
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `File size should be less than 2mb.`
    )
    .refine(
      (files) =>
        files.every(
          (file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type) ||
            ACCEPTED_VIDEO_TYPES.includes(file.type)
        ),
      "Only these types are allowed .jpg, .jpeg, .png, .webp, .mp4, .webm and .ogg"
    ),
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content is required"),
  location: z.string().trim().min(1, "Location is required"),
  category: z
    .array(z.object({ label: z.string(), value: z.object({ id: z.number() }) }))
    .min(1, "Category is required"),
  tag: z
    .array(z.object({ label: z.string(), value: z.object({ id: z.number() }) }))
    .min(1, "Tag is required"),
  youtubeVideoUrl: z.string().trim().optional(),
  author: z.string().trim().min(1, "Author is required"),
  publishedOn: z.string({
    required_error: "Publish Date is required",
  }),
  state: z.string().trim().optional(),
  setAsBanner: z.boolean().optional(),
  active: z.boolean().optional(),
});

export const UpdateArticleSchema = z.object({
  media: z
    .array(z.custom<File>())
    .refine(
      (files) => {
        return files.every((file) => file instanceof File);
      },
      {
        message: "Expected a file",
      }
    )
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `File size should be less than 2mb.`
    )
    .refine(
      (files) =>
        files.every(
          (file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type) ||
            ACCEPTED_VIDEO_TYPES.includes(file.type)
        ),
      "Only these types are allowed .jpg, .jpeg, .png, .webp, .mp4, .webm and .ogg"
    ),
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().min(1, "Content is required"),
  location: z.string().trim().min(1, "Location is required"),
  category: z
    .array(z.object({ label: z.string(), value: z.object({ id: z.number() }) }))
    .min(1, "Category is required"),
  tag: z
    .array(z.object({ label: z.string(), value: z.object({ id: z.number() }) }))
    .min(1, "Tag is required"),
  youtubeVideoUrl: z.string().trim().optional(),
  author: z.string().trim().min(1, "Author is required"),
  publishedOn: z.string({
    required_error: "Publish Date is required",
  }),
  state: z.string().trim().optional(),
  setAsBanner: z.boolean().optional(),
  active: z.boolean().optional(),
});

export type CreateArticleInput = TypeOf<typeof CreateArticleSchema>;
export type UpdateArticleInput = TypeOf<typeof UpdateArticleSchema>;
