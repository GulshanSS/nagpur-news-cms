import { TypeOf, object, string } from "zod";

const payload = {
  body: object({
    refreshToken: string({
      required_error: "Refresh Token Required",
    }),
  }),
};

export const refreshTokenSchema = object({ ...payload });

export type RefreshTokenInput = TypeOf<typeof refreshTokenSchema>;
