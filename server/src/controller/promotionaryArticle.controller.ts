import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  CreatePromotionaryArticleInput,
  DeletePromotionaryArticleInput,
  GetPromotionaryArticleInput,
  UpdatePromotionaryArticleInput,
} from "../schemas/promotionaryArticle.schema";
import {
  createPromotionaryAticle,
  deletePromotionaryArticleById,
  getAllPromotionaryArticles,
  getPromotionaryArticleById,
  getPromotionaryArticleByTitle,
  updatePromotionaryArticleById,
} from "../service/promotionaryArticle.service";
import { AppError, HttpCode } from "../exceptions/AppError";
import { deleteFileByKey } from "../utils/s3";
import config from "../config";
import db from "../utils/db.server";
import { getSignedUrlIK } from "../utils/imageKit";
import { createSlug } from "../utils/slugify";

export const createPromotionaryArticleHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreatePromotionaryArticleInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const slug = createSlug(req.body.title);
    const data = { slug, ...req.body };
    const promotionaryArticle = await createPromotionaryAticle(data);
    if (!promotionaryArticle) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Not able to create Promotionary Article",
        })
      );
    }

    return res.status(HttpCode.CREATED).json({
      success: true,
      promotionaryArticle,
    });
  }
);

export const updatePromotionaryArticleByIdHandler = asyncHandler(
  async (
    req: Request<
      UpdatePromotionaryArticleInput["params"],
      {},
      UpdatePromotionaryArticleInput["body"]
    >,
    res: Response,
    next: NextFunction
  ) => {
    const promotionaryArticleId = req.params.promotionaryArticleId;

    const existingPromotionaryArticle = await getPromotionaryArticleById(
      promotionaryArticleId
    );

    if (!existingPromotionaryArticle) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Promotionary Article not found",
        })
      );
    }

    let data = req.body as any;
    const title = req.body.title;

    if (title !== existingPromotionaryArticle.title) {
      const slug = createSlug(title);
      data = { slug, ...data };
    }

    await updatePromotionaryArticleById(promotionaryArticleId, data);

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Promotionary Article successfully updated",
    });
  }
);

export const getAllPromotionaryArticleHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, { page?: string; limit?: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const page = req.query.page ? parseInt(req.query.page) : config.CURR_PAGE;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : config.PAGE_LIMIT;
    const skip = (page - 1) * limit;
    const total = await db.promotionaryArticle.count();

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Promotionary Articles Found",
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

    const promotionaryArticles = await getAllPromotionaryArticles(skip, limit);

    for (const promotionaryArticle of promotionaryArticles) {
      promotionaryArticle.media!.key = getSignedUrlIK(
        promotionaryArticle.media!.key
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      promotionaryArticles,
      count: total,
      page,
      pages,
    });
  }
);

export const getPromotionaryArticleByIdHandler = asyncHandler(
  async (
    req: Request<GetPromotionaryArticleInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const promotionaryArticleId = req.params.promotionaryArticleId;
    const promotionaryArticle = await getPromotionaryArticleById(
      promotionaryArticleId
    );

    if (!promotionaryArticle) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Promotionary Article with ${promotionaryArticleId} not found`,
        })
      );
    }

    promotionaryArticle.media!.key = getSignedUrlIK(
      promotionaryArticle.media!.key
    );

    return res.status(HttpCode.OK).json({
      success: true,
      promotionaryArticle,
    });
  }
);

export const getPromotionaryArticleByTitleHandler = asyncHandler(
  async (
    req: Request<{ title: string }, {}, {}, { page?: string; limit?: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const title = req.params.title;

    const page = req.query.page ? parseInt(req.query.page) : config.CURR_PAGE;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : config.PAGE_LIMIT;
    const skip = (page - 1) * limit;
    const total = await db.promotionaryArticle.count({
      where: {
        title: {
          contains: title,
        },
      },
    });

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `No Promotionary Articles found which has title ${title}`,
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

    const promotionaryArticles = await getPromotionaryArticleByTitle(
      title,
      skip,
      limit
    );

    for (const promotionaryArticle of promotionaryArticles) {
      promotionaryArticle.media!.key = getSignedUrlIK(
        promotionaryArticle.media!.key
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      promotionaryArticles,
      count: total,
      page,
      pages,
    });
  }
);

export const deletePromotionaryArticleByIdHandler = asyncHandler(
  async (
    req: Request<DeletePromotionaryArticleInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const promotionaryArticleId = req.params.promotionaryArticleId;

    const promotionaryArticle = await getPromotionaryArticleById(
      promotionaryArticleId
    );

    if (!promotionaryArticle) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Promotionary Article not found",
        })
      );
    }

    const mediaKey = promotionaryArticle.media!.key;

    await deleteFileByKey(mediaKey);

    await deletePromotionaryArticleById(promotionaryArticleId);

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Promotionary Article deleted successfully",
    });
  }
);

export const addSlugToAllPromotionaryArticlesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const promotionaryArticles = await db.promotionaryArticle.findMany({
      where: {
        slug: undefined,
      },
    });

    if (promotionaryArticles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Promotionary Articles Not Found",
        })
      );
    }

    for (const promotionaryArticle of promotionaryArticles) {
      const slug = createSlug(promotionaryArticle.title);
      await db.promotionaryArticle.update({
        where: {
          id: promotionaryArticle.id,
        },
        data: {
          ...promotionaryArticle,
          slug,
        },
      });
    }

    const newPromotionaryArticles = await db.article.findMany({
      where: {
        slug: undefined,
      },
    });

    return res.status(HttpCode.OK).json({
      success: true,
      count: newPromotionaryArticles.length,
      promotionaryArticles: newPromotionaryArticles,
    });
  }
);
