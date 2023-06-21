import { CookieOptions } from "express";
import config from "../config";

export const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.ACCESS_TOKEN_COOKIE_EXPIRE_TIME * 60 * 1000
  ),
  maxAge: config.ACCESS_TOKEN_COOKIE_EXPIRE_TIME * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: true,
};

export const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() + config.REFRESH_TOKEN_COOKIE_EXPIRE_TIME * 60 * 60 * 1000
  ),
  maxAge: config.REFRESH_TOKEN_COOKIE_EXPIRE_TIME * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: true,
};
