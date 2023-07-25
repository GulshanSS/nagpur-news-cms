import { TypeOf, z } from "zod";

const MAX_FILE_SIZE = 50000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export const CreatePromotionaryArticleSchema = z.object({
  media: z
    .array(z.custom<File>())
    .length(1, "File is required")
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
  priority: z
    .string()
    .trim()
    .regex(new RegExp("\\d{1}"), "Please enter valid priority"),
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().optional(),
  whatsAppLink: z.string().trim().optional(),
  instagramLink: z.string().trim().optional(),
  contact: z
    .string()
    .regex(new RegExp("\\d{10}"), "Contact number should contain 0-9 digits")
    .optional(),
  setAsBanner: z.boolean().optional(),
  active: z.boolean().optional(),
});

export const UpdatePromotionaryArticleSchema = z.object({
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
  priority: z
    .string()
    .trim()
    .regex(new RegExp("\\d{1}"), "Please enter valid priority"),
  title: z.string().trim().min(1, "Title is required"),
  content: z.string().trim().optional(),
  whatsAppLink: z.string().trim().optional(),
  instagramLink: z.string().trim().optional(),
  contact: z
    .string()
    .regex(new RegExp("\\d{10}"), "Contact number should contain 0-9 digits")
    .optional(),
  setAsBanner: z.boolean().optional(),
  active: z.boolean().optional(),
});

export type CreatePromotionaryArticleInput = TypeOf<
  typeof CreatePromotionaryArticleSchema
>;
export type UpdatePromotionaryArticleInput = TypeOf<
  typeof UpdatePromotionaryArticleSchema
>;
