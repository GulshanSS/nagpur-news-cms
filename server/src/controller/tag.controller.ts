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
  getTagByName,
  updateTagById,
} from "../service/tag.sevice";
import asyncHandler from "../middleware/asyncHandler";
import { AppError, HttpCode } from "../exceptions/AppError";
import { createSlug } from "../utils/slugify";
import db from "../utils/db.server";
import { getTagBySlug } from "../public/tag/tag.service";

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

export const getTagByNameHandler = asyncHandler(
  async (
    req: Request<{ name: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const name = req.params.name;
    const tags = await getTagByName(name);
    if (tags.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `No tags found with ${name}`,
        })
      );
    }
    return res.status(HttpCode.OK).json({
      success: true,
      tags,
      count: tags.length,
    });
  }
);

export const createTagHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateTagInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const slug = createSlug(req.body.slug);
    const existingTag = await getTagBySlug(slug, 1, 1);

    if (existingTag) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: `Tag with Name: ${req.body.name} exists`,
        })
      );
    }
    const data = {...req.body, slug };
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

    let data = req.body as any;
    const name = req.body.name;

    if (name !== existingTag.name) {
      const slug = createSlug(req.body.slug);
      const existingTag = await getTagBySlug(slug, 1, 1);

      if (existingTag) {
        return next(
          new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: `Cannot update Tag with Name: ${name} as it exists`,
          })
        );
      }
      data = { slug, ...data };
    }

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

export const addSlugToAllTagsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tags = await db.tag.findMany({
      where: {
        slug: undefined,
      },
    });

    if (tags.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Tags not found",
        })
      );
    }

    for (const tag of tags) {
      const slug = createSlug(tag.name);
      await db.tag.update({
        where: {
          id: tag.id,
        },
        data: {
          ...tag,
          slug,
        },
      });
    }

    const newTags = await db.tag.findMany({
      where: {
        slug: undefined,
      },
    });

    return res.status(HttpCode.OK).json({
      success: true,
      count: newTags.length,
      tags: newTags,
    });
  }
);
