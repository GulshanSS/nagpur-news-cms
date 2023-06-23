import { Request, Response, NextFunction } from "express";
import {
  CreateTagInput,
  DeleteTagInput,
  GetTagInput,
  UpdateTagInput,
} from "../schemas/tag.schema";
import {
  createTag,
  deleteTagById,
  getAllTags,
  getTagById,
  updateTagById,
} from "../service/tag.sevice";
import asyncHandler from "../middleware/asyncHandler";
import { AppError, HttpCode } from "../exceptions/AppError";

export const getAllTagsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tags = await getAllTags();
    if (tags.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No tags found",
        })
      );
    }
    return res.status(HttpCode.OK).json({
      success: true,
      count: tags.length,
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
          description: `Tag with ID ${tagId} not found`,
        })
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      tag,
    });
  }
);

export const createTagHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateTagInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;
    const tag = await createTag(data);
    if (!tag) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Tag cannot be created",
        })
      );
    }
    return res.status(HttpCode.CREATED).json({
      success: true,
      tag,
    });
  }
);

export const updateTagByIdHandler = asyncHandler(
  async (
    req: Request<UpdateTagInput["params"], {}, UpdateTagInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const tagId = req.params.tagId;
    const existingTag = await getTagById(tagId);
    if (!existingTag) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Tag with ID ${tagId} not found`,
        })
      );
    }

    const data = req.body;
    const updatedTag = await updateTagById(tagId, data);

    if (!updatedTag) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: `Tag with ID ${tagId} cannot be updated`,
        })
      );
    }

    return res.status(HttpCode.CREATED).json({
      success: true,
      tag: updatedTag,
    });
  }
);

export const deleteTagByIdHandler = asyncHandler(
  async (
    req: Request<DeleteTagInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const tagId = req.params.tagId;
    const tag = await getTagById(tagId);
    if (!tag) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Tag with Id ${tagId} not found`,
        })
      );
    }

    await deleteTagById(tagId);

    return res.status(HttpCode.OK).json({
      success: true,
      message: `Tag with ${tagId} deleted successfully`,
    });
  }
);
