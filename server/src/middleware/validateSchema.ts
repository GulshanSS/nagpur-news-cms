import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, ZodIssue } from "zod";
import { AppError, HttpCode } from "../exceptions/AppError";

const validateSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: unknown) {
      if (e instanceof ZodError) {
        let validationErrors = {} as Record<string, string>;
        e.errors?.map(
          (err: ZodIssue) => (validationErrors[err.path[1]] = err.message)
        );
        return next(
          new AppError({
            name: "Validation Errors",
            httpCode: HttpCode.BAD_REQUEST,
            description: "Error validating resource",
            errors: validationErrors,
          })
        );
      }
      if (e instanceof Error) {
        return next(
          new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: e.message,
          })
        );
      }
    }
  };

export default validateSchema;
