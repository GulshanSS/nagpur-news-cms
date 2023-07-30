import { TypeOf, z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(1, "User name is required"),
  email: z.string().email("Invalid email. Enter valid email"),
  setAsAdmin: z.boolean().optional(),
  active: z.boolean().optional(),
});

export type UserInput = TypeOf<typeof UserSchema>;
