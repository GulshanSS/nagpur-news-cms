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
import {
  deleteFileByKey,
  getSignedUrlForMedia,
  invalidateCloudFrontCache,
} from "../utils/s3";

export const createPromotionaryArticleHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreatePromotionaryArticleInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;
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

    const data = req.body;

    await updatePromotionaryArticleById(promotionaryArticleId, data);

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Promotionary Article successfully updated",
    });
  }
);

export const getAllPromotionaryArticleHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const promotionaryArticles = await getAllPromotionaryArticles();
    if (promotionaryArticles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Promotionary Articles Found",
        })
      );
    }

    for (const promotionaryArticle of promotionaryArticles) {
      promotionaryArticle.media!.key = await getSignedUrlForMedia(
        promotionaryArticle.media!.key
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      promotionaryArticles,
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

    promotionaryArticle.media!.key = await getSignedUrlForMedia(
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
    req: Request<{ title: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const title = req.params.title;
    const promotionaryArticles = await getPromotionaryArticleByTitle(title);

    if (promotionaryArticles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `No Promotionary Articles found which has title ${title}`,
        })
      );
    }

    for (const promotionaryArticle of promotionaryArticles) {
      promotionaryArticle.media!.key = await getSignedUrlForMedia(
        promotionaryArticle.media!.key
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      promotionaryArticles,
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

    await invalidateCloudFrontCache(mediaKey);

    await deletePromotionaryArticleById(promotionaryArticleId);

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Promotionary Article deleted successfully",
    });
  }
);
