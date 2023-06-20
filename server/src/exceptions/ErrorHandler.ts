import { Response } from "express";
import { AppError, HttpCode } from "./AppError";
import logger from "../utils/logger";

class ErrorHandler {
  private isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }

  private handleTrustedError(error: AppError, res: Response): Response {
    if (Object.keys(error.errors).length !== 0) {
      return res.status(error.httpCode).json({
        success: false,
        errors: error.errors,
      });
    }
    return res.status(error.httpCode).json({
      sucess: false,
      message: error.message,
    });
  }

  private handleCriticalError(
    error: Error | AppError,
    res?: Response
  ): Response {
    if (res) {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
      });
    }

    logger.error("Application encountered a critical error. Exiting");
    process.exit(1);
  }

  public handleError(error: Error | AppError, res?: Response): void {
    if (this.isTrustedError(error) && res) {
      this.handleTrustedError(error as AppError, res);
    } else {
      this.handleCriticalError(error, res);
    }
  }
}

export const errorHandler = new ErrorHandler();
