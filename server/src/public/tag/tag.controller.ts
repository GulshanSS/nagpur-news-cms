import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { getAllTags, getTagBySlug } from "./tag.service";
import { AppError, HttpCode } from "../../exceptions/AppError";

export const getAllTagsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tags = await getAllTags();
    if (tags.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Tags Not Found",
        })
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      tags,
    });
  }
);

export const getTagBySlugHandler = asyncHandler(
  async (
    req: Request<{ slug: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const slug = req.params.slug;
    const tag = await getTagBySlug(slug);
    if (!tag) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Tag Not Found",
        })
      );
    }
  }
);
