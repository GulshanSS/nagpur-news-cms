import { Request, Response, NextFunction } from "express";
import { SendOtpSchema, VerifyOtpSchema } from "../schemas/otp.schema";
import asyncHandler from "../middleware/asyncHandler";
import { getUserById, updateUserById } from "../service/user.service";
import { AppError, HttpCode } from "../exceptions/AppError";
import {
  createOtp,
  deleteOtp,
  getOtp,
  updateOtp,
} from "../service/otp.service";
import { generateOtp } from "../utils/otp";
import hashGivenString from "../utils/hashGivenString";
import { sendEmail } from "../utils/email";

export const sendOtpHandler = asyncHandler(
  async (
    req: Request<{}, {}, SendOtpSchema["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.body.userId;
    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        })
      );
    }

    const existingOtp = await getOtp(userId);

    const otp = generateOtp();

    if (!existingOtp) {
      await createOtp(userId, otp);
    } else {
      await updateOtp(userId, otp);
    }

    await sendEmail({ email: existingUser.email, otp });

    return res.status(HttpCode.CREATED).json({
      success: true,
      message: `Otp sent to the registered email ${existingUser.email}`,
    });
  }
);

export const verifyOtpHandler = asyncHandler(
  async (
    req: Request<{}, {}, VerifyOtpSchema["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { userId, otp } = req.body;
    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        })
      );
    }

    const existingOtp = await getOtp(userId);

    if (!existingOtp) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "OTP not found for provided user",
        })
      );
    }

    const hashedOtp = hashGivenString(otp);

    if (existingOtp.hashedOTP !== hashedOtp) {
      return next(
        new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: `Invalid OTP. Please enter valid OTP`,
        })
      );
    }

    await updateUserById(userId, { verified: true });
    await deleteOtp(userId);

    return res.status(200).json({
      success: true,
      message: "Account Verified",
    });
  }
);
