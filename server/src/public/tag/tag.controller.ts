import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { getAllTags, getTagById } from "./tag.service";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { GetTagInput } from "../../schemas/tag.schema";

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

export const getTagByIdHandler = asyncHandler(
  async (
    req: Request<GetTagInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const tagId = req.params.tagId;
    const tag = await getTagById(tagId);
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
