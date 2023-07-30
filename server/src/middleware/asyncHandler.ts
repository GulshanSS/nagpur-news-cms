import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} : ${req.baseUrl}${req.url}`);
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

export default asyncHandler;
