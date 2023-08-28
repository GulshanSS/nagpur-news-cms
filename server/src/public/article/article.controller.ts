import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import {
  getAllArticles,
  getAllArticlesAsBanner,
  getArticleById,
  getArticleByKeyword,
  getLatestArticles,
} from "./article.service";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { GetArticleInput } from "../../schemas/article.schema";
import { getSignedUrlIK } from "../../utils/imageKit";

export const getAllArticlesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const articles = await getAllArticles();
    if (articles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Articles Not Found",
        })
      );
    }

    for (const article of articles) {
      if (article.media.length > 0) {
        for (const media of article.media) {
          media.key = getSignedUrlIK(media.key);
        }
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      articles,
    });
  }
);

export const getLatestArticlesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const articles = await getLatestArticles();
    if (articles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Articles Not Found",
        })
      );
    }

    for (const article of articles) {
      if (article.media.length > 0) {
        for (const media of article.media) {
          media.key = getSignedUrlIK(media.key);
        }
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      articles,
    });
  }
);

export const getArticlesByKeywordHandler = asyncHandler(
  async (
    req: Request<{ keyword: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const keyword = req.params.keyword;
    const articles = await getArticleByKeyword(keyword);
    if (articles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Articles with keyword ${keyword} Not Found`,
        })
      );
    }

    for (const article of articles) {
      if (article.media.length > 0) {
        for (const media of article.media) {
          media.key = getSignedUrlIK(media.key);
        }
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      articles,
    });
  }
);

export const getAllArticlesAsBannerHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("API HIT");
    const articles = await getAllArticlesAsBanner();
    if (articles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Articles Not Found",
        })
      );
    }

    for (const article of articles) {
      if (article.media.length > 0) {
        for (const media of article.media) {
          media.key = getSignedUrlIK(media.key);
        }
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      articles,
    });
  }
);

export const getArticleByIdHandler = asyncHandler(
  async (
    req: Request<GetArticleInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const articleId = req.params.articleId;
    const article = await getArticleById(articleId);
    if (!article) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Article Not Found",
        })
      );
    }

    if (article.media.length > 0) {
      for (const media of article.media) {
        media.key = getSignedUrlIK(media.key);
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      article,
    });
  }
);
