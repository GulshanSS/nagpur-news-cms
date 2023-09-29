import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { getAllTags, getTagBySlug } from "./tag.service";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { Tag } from "@prisma/client";
import config from "../../config";
import db from "../../utils/db.server";
import { getSignedUrlIK } from "../../utils/imageKit";

export const getAllTagsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tags = await getAllTags();

    let newTags = [] as Tag[];

    if (tags.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Tags Not Found",
        })
      );
    }

    for (const tag of tags) {
      if (tag.article.length > 0) {
        newTags.push(tag);
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      tags: newTags,
    });
  }
);

export const getTagBySlugHandler = asyncHandler(
  async (
    req: Request<{ slug: string }, {}, {}, { page?: string; limit?: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const slug = req.params.slug;

    const page = req.query.page ? parseInt(req.query.page) : config.CURR_PAGE;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : config.PAGE_LIMIT;
    const skip = (page - 1) * limit;

    const total = await db.article.count({
      where: {
        tag: {
          some: {
            slug,
          },
        },
      },
    });

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Tag Not found",
        })
      );
    }

    const pages = Math.ceil(total / limit);

    if (page > pages || page <= 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Page Found",
        })
      );
    }

    const tag = await getTagBySlug(slug, skip, limit);
    if (!tag) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Tag Not Found",
        })
      );
    }

    for (const article of tag.article) {
      if (article.media.length > 0) {
        for (const media of article.media) {
          media.key = getSignedUrlIK(media.key);
        }
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      tag,
      count: total,
      page,
      pages,
    });
  }
);
