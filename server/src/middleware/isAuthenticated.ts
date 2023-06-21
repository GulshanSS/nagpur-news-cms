import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../exceptions/AppError";
import { verifyToken } from "../utils/jwt";
import config from "../config";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let access_token: string = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    access_token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies["access_token"]) {
    access_token = req.cookies["access_token"];
  }

  if (access_token === undefined || access_token === "") {
    return next(
      new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: "User logged out. Please Login again",
      })
    );
  }

  const payload = verifyToken(access_token, config.JWT_ACCESS_TOKEN_SECRET);
  res.locals.payload = payload;
  return next();
};
