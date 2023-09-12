import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import {
  getAllCategories,
  getAllCategoriesWithMinArticles,
  getCategoryBySlug,
} from "./category.service";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { getSignedUrlForMedia } from "../../utils/s3";
import config from "../../config";
import db from "../../utils/db.server";

export const getAllCategoriesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await getAllCategories();
    if (categories.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Categories Not Found",
        })
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      categories,
    });
  }
);

export const getAllCategoriesWithMinArticlesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await getAllCategoriesWithMinArticles();
    if (categories.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Categories Not Found",
        })
      );
    }

    for (const category of categories) {
      for (const article of category.article) {
        if (article.media.length > 0) {
          for (const media of article.media) {
            media.key = await getSignedUrlForMedia(media.key);
          }
        }
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      categories,
    });
  }
);

export const getCategoryBySlugHandler = asyncHandler(
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
        category: {
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
          description: "Category Not found",
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

    const category = await getCategoryBySlug(slug, skip, limit);
    if (!category) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Category Not found",
        })
      );
    }

    for (const article of category.article) {
      if (article.media.length > 0) {
        for (const media of article.media) {
          media.key = await getSignedUrlForMedia(media.key);
        }
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      category,
      count: total,
      page,
      pages,
    });
  }
);
