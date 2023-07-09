import { TypeOf, z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid Email. Try again with valid email"),
  password: z
    .string()
    .min(8, "Must be at least 8 characters in length"),
});

export type LoginInput = TypeOf<typeof LoginSchema>;
