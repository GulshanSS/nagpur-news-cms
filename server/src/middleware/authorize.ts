import { Request, Response, NextFunction } from "express";
import { AppError, HttpCode } from "../exceptions/AppError";
import asyncHandler from "./asyncHandler";

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(res.locals.payload.role)) {
      return next(
        new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: `Role: ${res.locals.payload.role} is not allowed to access this resource`,
        })
      );
    }

    next();
  };
};
