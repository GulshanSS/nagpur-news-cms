import { TypeOf, boolean, object, string, z } from "zod";

const Role = z.enum(["ADMIN", "TEAM"]);

const payload = {
  body: object({
    email: string()
      .min(1, "Email is required")
      .email("Email address is invalid"),
    password: string()
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      )
      .min(8, "Must be at least 8 characters in length"),
    role: Role.optional(),
    active: boolean().optional(),
  }),
};

const params = {
  params: object({
    userId: string({
      required_error: "User Id is required",
    }),
  }),
};

export const createUserSchema = object({ ...payload });
export const loginUserSchema = object({ ...payload });
export const updateUserSchema = object({ ...params, ...payload });
export const getUserSchema = object({ ...params });
export const deleteUserSchema = object({ ...params });

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
