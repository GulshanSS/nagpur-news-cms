import { TypeOf, z } from "zod";

const MAX_FILE_SIZE = 50000000;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

export const CreateTestimonialSchema = z.object({
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
  quote: z.string().trim().optional(),
  quotedBy: z.string().trim().min(1, "Quoted By is required"),
  designation: z.string().trim().optional(),
  active: z.boolean().optional(),
});

export const UpdateTestimonialSchema = z
  .object({
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
    quote: z.string().trim().optional(),
    quotedBy: z.string().trim().min(1, "Quoted By is required"),
    designation: z.string().trim().optional(),
    active: z.boolean().optional(),
  })
  .refine(
    (schema) =>
      schema.media.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)) &&
      schema.quote !== "" &&
      schema.quote !== undefined,
    {
      path: ["quote"],
      message: "Quote is required",
    }
  );

export type CreateTestimonialInput = TypeOf<typeof CreateTestimonialSchema>;
export type UpdateTestimonialInput = TypeOf<typeof UpdateTestimonialSchema>;
