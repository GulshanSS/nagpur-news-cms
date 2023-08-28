import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import {
  getAllPromotionartArticles,
  getAllPromotionaryArticlesAsBanner,
  getPromotionaryArticleById,
} from "./promotionaryArticle.service";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { GetPromotionaryArticleInput } from "../../schemas/promotionaryArticle.schema";
import { getSignedUrlIK } from "../../utils/imageKit";

export const getAllPromotionaryArticlesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const promotionaryArticles = await getAllPromotionartArticles();
    if (promotionaryArticles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Promotionary Articles Not Found",
        })
      );
    }

    for (const promotionaryArticle of promotionaryArticles) {
      promotionaryArticle.media!.key = getSignedUrlIK(
        promotionaryArticle.media!.key
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      promotionaryArticles,
    });
  }
);

export const getAllPromotionaryArticlesAsBannerHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const promotionaryArticles = await getAllPromotionaryArticlesAsBanner();
    if (promotionaryArticles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Promotionary Articles Not Found",
        })
      );
    }

    for (const promotionaryArticle of promotionaryArticles) {
      promotionaryArticle.media!.key = getSignedUrlIK(
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
    req: Request<GetPromotionaryArticleInput["params"]>,
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
          description: "Promotionary Article Not Found",
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
