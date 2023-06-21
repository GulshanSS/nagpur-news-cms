import { TypeOf, object, string } from "zod";

export const sendOtpSchema = object({
  body: object({
    userId: string().min(1, "User Id is required"),
  }),
});

export const verifyOtpSchema = object({
  body: object({
    userId: string().min(1, "User Id is required"),
    otp: string().regex(
      new RegExp("[0-9]{4}"),
      "Invalid OTP. Please enter valid otp"
    ),
  }),
});

export type SendOtpSchema = TypeOf<typeof sendOtpSchema>;
export type VerifyOtpSchema = TypeOf<typeof verifyOtpSchema>;
