import { NextFunction, Response, Request } from "express";
import { AppError } from "../exceptions/AppError";
import { errorHandler } from "../exceptions/ErrorHandler";

const errorMiddlerware = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  errorHandler.handleError(error, res);
};

export default errorMiddlerware;
