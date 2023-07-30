import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  LoginUserInput,
  ResetPasswordByTokenInput,
  SendResetPasswordLinkInput,
} from "../schemas/user.schema";
import {
  getUserByEmail,
  getUserById,
  resetPassword,
} from "../service/user.service";
import { AppError, HttpCode } from "../exceptions/AppError";
import { compare, hash } from "../utils/bcrypt";
import { v4 as uuidv4 } from "uuid";
import { generateAccessToken, generateTokens, verifyToken } from "../utils/jwt";
import {
  deleteAllRefreshTokenAssginedToUser,
  getRefreshTokenById,
  revokeRefreshTokenById,
  whiteListRefreshToken,
} from "../service/refreshToken.service";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/cookieOptions";
import { RefreshTokenInput } from "../schemas/refreshToken.schema";
import config from "../config";
import hashGivenString from "../utils/hashGivenString";

import { sendEmail } from "../utils/email";
import {
  createToken,
  deleteToken,
  getTokenByUserId,
  updateToken,
} from "../service/token.service";

export const loginUserHandler = asyncHandler(
  async (
    req: Request<{}, {}, LoginUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `No user found with email ${email}. Please login with registered email`,
        })
      );
    }
    const matchPassword = await compare(password, existingUser!.password);
    if (!matchPassword) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Incorrect password. Try again with different password",
        })
      );
    }

    if (!existingUser?.verified) {
      return res.status(HttpCode.BAD_REQUEST).json({
        success: false,
        userId: existingUser.id.toString(),
        message: `Verify your account with ${existingUser.email}`,
      });
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser!, jti);
    await whiteListRefreshToken({ refreshToken, jti, user: existingUser! });
    res.cookie("access_token", accessToken, accessTokenCookieOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return res.status(HttpCode.OK).json({
      success: true,
      accessToken,
    });
  }
);

export const sendRestPasswordLinkHandler = asyncHandler(
  async (
    req: Request<{}, {}, SendResetPasswordLinkInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const email = req.body.email;
    const foundUser = await getUserByEmail(email);
    if (!foundUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `User with ${email} not found`,
        })
      );
    }

    const existingToken = await getTokenByUserId(foundUser.id);
    const accessToken = generateAccessToken(foundUser);

    if (!existingToken) {
      await createToken(accessToken, foundUser.id);
    } else {
      await updateToken(accessToken, foundUser.id);
    }

    await sendEmail(
      foundUser.email,
      accessToken,
      config.EMAIL_TYPE_SEND_RESET_PASSWORD_LINK
    );

    return res.status(HttpCode.OK).json({
      success: true,
      message: `Reset Link sent to ${email}`,
    });
  }
);

export const refreshTokenHandler = asyncHandler(
  async (
    req: Request<{}, {}, RefreshTokenInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) {
      return next(
        new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "Not Authorized",
        })
      );
    }
    const payload = verifyToken(refreshToken, config.JWT_REFRESH_TOKEN_SECRET);

    if (!payload.jti || !payload.userId) {
      return next(
        new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "Not authorized",
        })
      );
    }

    const savedRefreshToken = await getRefreshTokenById(payload.jti!);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      return next(
        new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "Logged out. Please login again",
        })
      );
    }

    const hashedToken = hashGivenString(refreshToken);

    if (hashedToken !== savedRefreshToken?.hashedToken) {
      return next(
        new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "Not Authorized",
        })
      );
    }

    const user = await getUserById(payload.userId);

    if (!user) {
      return next(
        new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "Not Authorized",
        })
      );
    }

    await revokeRefreshTokenById(savedRefreshToken.id);

    const jti = uuidv4();

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );

    await whiteListRefreshToken({ refreshToken: newRefreshToken, jti, user });

    res.cookie("access_token", accessToken, accessTokenCookieOptions);
    res.cookie("refresh_token", newRefreshToken, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return res.status(HttpCode.CREATED).json({
      success: true,
      accessToken,
    });
  }
);

export const resetPasswordByTokenHandler = asyncHandler(
  async (
    req: Request<
      ResetPasswordByTokenInput["payload"],
      {},
      ResetPasswordByTokenInput["body"]
    >,
    res: Response,
    next: NextFunction
  ) => {
    const payload = verifyToken(
      req.params.token,
      config.JWT_ACCESS_TOKEN_SECRET
    );
    const userId = payload.userId;

    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        })
      );
    }

    const token = await getTokenByUserId(existingUser.id);
    if (!token) {
      return next(
        new AppError({
          httpCode: HttpCode.FORBIDDEN,
          description: "Link Expired. Please try again!",
        })
      );
    }

    const hashedToken = hashGivenString(req.params.token);

    if (hashedToken !== token?.hashedToken) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Invalid Token",
        })
      );
    }

    const hashedPassword = await hash(req.body.password);

    await resetPassword(userId, hashedPassword);

    await deleteToken(token.id);

    return res.status(HttpCode.OK).json({
      success: true,
      message: `Reset password for ${existingUser.email} successfully`,
    });
  }
);

export const logoutHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let refreshToken: string;

    if (req.body.refreshToken !== undefined) {
      refreshToken = req.body.refreshToken;
    } else {
      refreshToken = req.cookies["refresh_token"];
    }

    const payload = verifyToken(refreshToken, config.JWT_REFRESH_TOKEN_SECRET);

    if (!payload.jti || !payload.userId) {
      return next(
        new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: "Not Authorized",
        })
      );
    }

    await deleteAllRefreshTokenAssginedToUser(payload.userId);

    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    res.cookie("logged_in", false, { maxAge: 1 });

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Logged out  successfully",
    });
  }
);
