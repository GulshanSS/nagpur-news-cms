import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { CreateUserInput, LoginUserInput } from "../schemas/user.schema";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../service/user.service";
import { AppError, HttpCode } from "../exceptions/AppError";
import { compare, hash } from "../utils/bcrypt";
import { v4 as uuidv4 } from "uuid";
import { generateTokens, verifyToken } from "../utils/jwt";
import {
  deleteAllRefreshTokenAssginedToUser,
  getRefreshTokenById,
  revokeRefreshTokenById,
  whiteListRefreshToken,
} from "../service/token.service";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/cookieOptions";
import { RefreshTokenInput } from "../schemas/refreshToken.schema";
import config from "../config";
import hashGivenString from "../utils/hashGivenString";

export const registerUserHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: `User with ${email} is already in use`,
        })
      );
    }
    const hashedPassword = await hash(password);
    const data: CreateUserInput["body"] = {
      ...req.body,
      password: hashedPassword,
    };

    const user = await createUser(data);

    return res.status(HttpCode.CREATED).json({
      success: true,
      message: `User created successfully with ${user.email}`,
    });
  }
);

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
          httpCode: HttpCode.FORBIDDEN,
          description: "Incorrect password. Try again with different password",
        })
      );
    }

    if (!existingUser?.verified) {
      return next(
        new AppError({
          httpCode: HttpCode.FORBIDDEN,
          description: `Verify you account with ${existingUser!.email}`,
        })
      );
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

export const refreshTokenHandler = asyncHandler(
  async (
    req: Request<{}, {}, RefreshTokenInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const refreshToken = req.body.refreshToken;
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
