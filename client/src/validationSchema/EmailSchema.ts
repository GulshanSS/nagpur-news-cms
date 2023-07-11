import { TypeOf, z } from "zod";

export const EmailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid Email. Try again with valid email"),
});

export type EmailInput = TypeOf<typeof EmailSchema>;
