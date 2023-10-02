import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import {
  getAllArticles,
  getAllArticlesAsBanner,
  getArticleBySlug,
  getArticleByKeyword,
  getLatestArticles,
} from "./article.service";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { getSignedUrlIK } from "../../utils/imageKit";
import config from "../../config";
import db from "../../utils/db.server";
import { Article } from "@prisma/client";

export const getAllArticlesHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, { page?: string; limit: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const page = req.query.page ? parseInt(req.query.page) : config.CURR_PAGE;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : config.PAGE_LIMIT;
    const skip = (page - 1) * limit;
    const total = await db.article.count({
      where: {
        active: true,
        state: "PUBLISHED",
      },
    });

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Articles Found",
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

    const articles = await getAllArticles(skip, limit);

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
      count: total,
      page,
      pages,
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
    req: Request<
      { keyword: string },
      {},
      {},
      { page?: string; limit?: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const page = req.query.page ? parseInt(req.query.page) : config.CURR_PAGE;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : config.PAGE_LIMIT;

    const keyword = req.params.keyword;

    const skip = (page - 1) * limit;
    const total = await db.article.count({
      where: {
        AND: [
          {
            active: true,
          },
          {
            state: "PUBLISHED",
          },
        ],
        OR: [
          {
            title: {
              contains: keyword,
            },
          },
          {
            content: {
              contains: keyword,
            },
          },
          {
            location: {
              contains: keyword,
            },
          },
        ],
      },
    });

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Articles Found",
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

    const articles = await getArticleByKeyword(skip, limit, keyword);
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
      count: total,
      page,
      pages,
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

    let articlesWithMedia = [] as Article[];

    for (const article of articles) {
      if (article.media.length > 0) {
        for (const media of article.media) {
          media.key = getSignedUrlIK(media.key);
        }
        articlesWithMedia.push(article);
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      articles: articlesWithMedia,
    });
  }
);

export const getArticleBySlugHandler = asyncHandler(
  async (
    req: Request<{ slug: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const slug = req.params.slug;
    const article = await getArticleBySlug(slug);
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

    if (article.articleSection.length > 0) {
      for (const articleSection of article.articleSection) {
        if (articleSection.media.length > 0) {
          for (const media of articleSection.media) {
            media.key = getSignedUrlIK(media.key);
          }
        }
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      article,
    });
  }
);
