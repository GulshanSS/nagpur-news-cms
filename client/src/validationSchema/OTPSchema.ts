import { TypeOf, z } from "zod";

export const OTPSchema = z.object({
  otp: z
    .string()
    .regex(new RegExp("[0-9]{4}"), "Invalid OTP. Please enter valid otp"),
});

export type OTPInput = TypeOf<typeof OTPSchema>;
