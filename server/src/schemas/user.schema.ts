import { TypeOf, boolean, object, string, z } from "zod";

const Role = z.enum(["ADMIN", "TEAM"]);

const payload = {
  body: object({
    name: string().min(1, "Name is required"),
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

export const createUserSchema = object({
  body: payload.body.omit({ password: true, role: true }),
});
export const loginUserSchema = object({
  body: object({
    email: string()
      .min(1, "Email is required")
      .email("Email address is invalid"),
    password: string().min(8, "Must be at least 8 characters in length"),
  }),
});
export const updateUserSchema = object({
  ...params,
  body: payload.body
    .omit({ role: true, active: true, password: true })
    .optional(),
});
export const sendRestPasswordLinkSchema = object({
  body: payload.body.pick({ email: true }),
});
export const resetPasswordSchema = object({
  body: payload.body.pick({ password: true }),
});
export const resetPasswordByTokenSchema = object({
  payload: object({
    token: string({
      required_error: "Reset Pass Key required",
    }),
  }),
  body: payload.body.pick({ password: true }),
});
export const getUserSchema = object({ ...params });
export const deleteUserSchema = object({ ...params });

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type LoginUserInput = TypeOf<typeof loginUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type SendResetPasswordLinkInput = TypeOf<
  typeof sendRestPasswordLinkSchema
>;
export type ResetPasswordByTokenInput = TypeOf<
  typeof resetPasswordByTokenSchema
>;
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
