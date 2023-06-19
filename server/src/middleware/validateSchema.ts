import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, ZodIssue } from "zod";

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
        return res.status(400).json({
          statusCode: 400,
          success: false,
          errors: validationErrors,
        });
      }
      if (e instanceof Error) {
        return res.status(409).json({
          statusCode: 400,
          success: false,
          message: e.message,
        });
      }
    }
  };

export default validateSchema;
