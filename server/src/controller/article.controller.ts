import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  CreateArticleInput,
  DeleteArticleInput,
  GetArticleInput,
  UpdateArticleInput,
} from "../schemas/article.schema";
import {
  createArticle,
  deleteArticleById,
  disconnectCategoryAndTagFromArticle,
  getAllArticles,
  getArticleById,
  getArticleByState,
  getArticleByStateAndTitle,
  getArticleByTitle,
  updateArticleById,
} from "../service/article.service";
import { AppError, HttpCode } from "../exceptions/AppError";
import { deleteFileByKey } from "../utils/s3";
import db from "../utils/db.server";
import config from "../config";
import { getSignedUrlIK } from "../utils/imageKit";
import { createSlug } from "../utils/slugify";
import { getArticleBySlug } from "../public/article/article.service";
import { postToFacebookPage } from "../utils/facebook";
import { postToTwitter } from "../utils/twitter";

export const createArticleHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateArticleInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const slug = createSlug(req.body.title);

    const existingArticle = await getArticleBySlug(slug);

    if (existingArticle) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: `Article with Title: ${req.body.title} exists`,
        })
      );
    }

    const data = { slug, ...req.body };

    const article = await createArticle(data);
    if (!article) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Not able to create article",
        })
      );
    }

    const link = `${config.NAGPUR_NEWS_URI}/article/${slug}`;
    if (req.body.postToSocialMedia) {
      await Promise.all([
        postToFacebookPage(link, article.title),
        postToTwitter(link, article.title),
      ]);
    }

    return res.status(HttpCode.CREATED).json({
      success: true,
      article,
    });
  }
);

export const updateArticleByIdHandler = asyncHandler(
  async (
    req: Request<UpdateArticleInput["params"], {}, UpdateArticleInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const articleId = req.params.articleId;
    const existingArticle = await getArticleById(articleId);
    if (!existingArticle) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Article Not Found",
        })
      );
    }

    let data = req.body as any;
    const title = req.body.title;

    if (title !== existingArticle.title) {
      const slug = createSlug(title);
      const existingArticle = await getArticleBySlug(slug);
      if (existingArticle) {
        return next(
          new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: `Cannot update Article with Title: ${title} as it exists`,
          })
        );
      }
      data = { slug, ...data };
    }

    await disconnectCategoryAndTagFromArticle(articleId);
    const updatedArticle = await updateArticleById(articleId, data);

    const link = `${config.NAGPUR_NEWS_URI}/article/${updatedArticle.slug}`;
    if (req.body.postToSocialMedia) {
      await Promise.all([
        postToFacebookPage(link, updatedArticle.title),
        postToTwitter(link, updatedArticle.title),
      ]);
    }

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Article sucessfully updated",
    });
  }
);

export const getAllArticleHandler = asyncHandler(
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
    const total = await db.article.count();

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

export const getArticleByStateHandler = asyncHandler(
  async (
    req: Request<
      { articleState: string },
      {},
      {},
      { page?: string; limit?: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const articleState = req.params.articleState;

    const page = req.query.page ? parseInt(req.query.page) : config.CURR_PAGE;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : config.PAGE_LIMIT;
    const skip = (page - 1) * limit;
    const total = await db.article.count({
      where: {
        state: articleState.toUpperCase(),
      },
    });

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `No Articles Found in ${articleState}`,
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

    const articles = await getArticleByState(articleState, skip, limit);

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

export const getArticleByIdHandler = asyncHandler(
  async (
    req: Request<GetArticleInput["params"], {}, {}>,
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

export const getArticleByStateAndTitleHandler = asyncHandler(
  async (
    req: Request<
      { state: string; title: string },
      {},
      {},
      { page?: string; limit?: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const articleState = req.params.state;
    const title = req.params.title;

    const page = req.query.page ? parseInt(req.query.page) : config.CURR_PAGE;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : config.PAGE_LIMIT;
    const skip = (page - 1) * limit;
    const total = await db.article.count({
      where: {
        state: articleState.toUpperCase(),
        title: {
          contains: title,
        },
      },
    });

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `No Articles found in ${articleState} which has title ${title}`,
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

    const articles = await getArticleByStateAndTitle(
      articleState,
      title,
      skip,
      limit
    );

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

export const getArticleByTitleHandler = asyncHandler(
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
    const total = await db.article.count({
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
          description: `No Articles found which has title ${title}`,
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

    const articles = await getArticleByTitle(title, skip, limit);

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

export const deleteArticleByIdHandler = asyncHandler(
  async (
    req: Request<DeleteArticleInput["params"], {}, {}>,
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
        await deleteFileByKey(media.key);
      }
    }

    await deleteArticleById(articleId);

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Article deleted successfully",
    });
  }
);

export const addSlugToAllArticlesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const articles = await db.article.findMany({
      where: {
        slug: undefined,
      },
    });
    if (articles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Articles Not Found",
        })
      );
    }

    for (const article of articles) {
      const slug = createSlug(article.title);
      await db.article.update({
        where: {
          id: article.id,
        },
        data: {
          ...article,
          slug,
        },
      });
    }

    const newArticles = await db.article.findMany({
      where: {
        slug: undefined,
      },
    });

    return res.status(HttpCode.OK).json({
      success: true,
      count: newArticles.length,
      articles: newArticles,
    });
  }
);
