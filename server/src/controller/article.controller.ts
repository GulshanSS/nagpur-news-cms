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
  getAllArticles,
  getArticleById,
  getArticleByTitle,
  updateArticleById,
} from "../service/article.service";
import { AppError, HttpCode } from "../exceptions/AppError";
import { deleteFileByKey, getSignedUrlForMedia } from "../utils/s3";

export const createArticleHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateArticleInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;
    const article = await createArticle(data);
    if (!article) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Not able to create article",
        })
      );
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

    const data = req.body;

    await updateArticleById(articleId, data);

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Article sucessfully updated",
    });
  }
);

export const getAllArticleHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const articles = await getAllArticles();
    if (articles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Articles Found",
        })
      );
    }

    for (const article of articles) {
      if (article.media.length > 0) {
        for (const media of article.media) {
          media.key = await getSignedUrlForMedia(media.key);
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
        media.key = await getSignedUrlForMedia(media.key);
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      article,
    });
  }
);

export const getArticleByTitleHandler = asyncHandler(
  async (
    req: Request<{ title: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const title = req.params.title;
    const articles = await getArticleByTitle(title);
    if (articles.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `No Articles found which has title ${title}`,
        })
      );
    }

    for (const article of articles) {
      if (article.media.length > 0) {
        for (const media of article.media) {
          media.key = await getSignedUrlForMedia(media.key);
        }
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      articles,
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
