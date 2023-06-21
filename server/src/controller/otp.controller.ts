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
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../utils/jwt";
import { whiteListRefreshToken } from "../service/token.service";

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

    return res.status(HttpCode.CREATED).json({
      success: true,
      otp,
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

    const jti: string = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);

    await whiteListRefreshToken({ refreshToken, jti, user: existingUser });

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
    });
  }
);
