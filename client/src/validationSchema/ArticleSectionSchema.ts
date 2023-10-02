import { TypeOf, z } from "zod";

const MAX_FILE_SIZE = 50000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export const CreateArticleSectionSchema = z.object({
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
  title: z.string().trim().optional(),
  content: z.string().trim().min(1, "Content is required"),
  sequence: z
    .string()
    .trim()
    .regex(new RegExp("\\b([0-9]|[1-9][0-9])\\b"), "Sequence should contain 0-99 number"),
});

export const UpdateArticleSectionSchema = z.object({
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
  title: z.string().trim().optional(),
  content: z.string().trim().min(1, "Content is required"),
  sequence: z
    .string()
    .trim()
    .regex(new RegExp("\\b([0-9]|[1-9][0-9])\\b"), "Sequence should contain 0-99 number"),
});

export type CreateArticleSectionInput = TypeOf<
  typeof CreateArticleSectionSchema
>;
export type UpdateArticleSectionInput = TypeOf<
  typeof UpdateArticleSectionSchema
>;
