import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

import config from "../config";

export interface ITokenPayload {
  userId: string;
  role: string;
  jti?: string;
  iat: number;
  exp: number;
}

export const generateAccessToken = (user: User): string => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    config.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: config.JWT_ACCESS_TOKEN_EXPIRE_TIME,
    }
  );
};

export const generateRefreshToken = (user: User, jti: string): string => {
  return jwt.sign(
    { userId: user.id, role: user.role, jti },
    config.JWT_REFRESH_TOKEN_SECRET,
    {
      expiresIn: config.JWT_REFRESH_TOKEN_EXPIRE_TIME,
    }
  );
};

export const generateTokens = (
  user: User,
  jti: string
): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (refreshToken: string, jwtSecret: string) =>
  jwt.verify(refreshToken, jwtSecret) as ITokenPayload;
