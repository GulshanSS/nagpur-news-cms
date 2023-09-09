import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import {
  getAllPromotionartArticles,
  getAllPromotionaryArticlesAsBanner,
  getPromotionaryArticleBySlug,
} from "./promotionaryArticle.service";
import { AppError, HttpCode } from "../../exceptions/AppError";
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

export const getPromotionaryArticleBySlugHandler = asyncHandler(
  async (
    req: Request<{ slug: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const slug = req.params.slug;
    const promotionaryArticle = await getPromotionaryArticleBySlug(slug);
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
