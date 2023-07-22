import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  CreateArticleSectionInput,
  DeleteArticleSectionInput,
  GetArticleSectionInput,
  UpdateArticleSectionInput,
} from "../schemas/articleSection.schema";
import {
  createArticleSection,
  deleteArticleSectionById,
  getArticleSectionById,
  updateArticleSectionById,
} from "../service/articleSection.service";
import { AppError, HttpCode } from "../exceptions/AppError";
import { deleteFileByKey, getSignedUrlForMedia } from "../utils/s3";

export const createArticleSectionHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateArticleSectionInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;
    const articleSection = await createArticleSection(data);
    if (!articleSection) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Not able to create Article Section",
        })
      );
    }

    return res.status(HttpCode.CREATED).json({
      success: true,
      articleSection,
    });
  }
);

export const updateArticleSectionByIdHandler = asyncHandler(
  async (
    req: Request<
      UpdateArticleSectionInput["params"],
      {},
      UpdateArticleSectionInput["body"]
    >,
    res: Response,
    next: NextFunction
  ) => {
    const articleSectionId = req.params.articleSectionId;
    const existingArticleSection = await getArticleSectionById(
      articleSectionId
    );

    if (!existingArticleSection) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Article Section Not Found",
        })
      );
    }

    const data = req.body;

    const articleSection = await updateArticleSectionById(
      articleSectionId,
      data
    );

    return res.status(HttpCode.OK).json({
      success: true,
      articleSection,
    });
  }
);

export const getArticleSectionByIdHandler = asyncHandler(
  async (
    req: Request<GetArticleSectionInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const articleSectionId = req.params.articleSectionId;
    const articleSection = await getArticleSectionById(articleSectionId);

    if (!articleSection) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Article Section Not Found",
        })
      );
    }

    if (articleSection.media.length > 0) {
      for (const media of articleSection.media) {
        media.key = await getSignedUrlForMedia(media.key);
      }
    }

    return res.status(HttpCode.OK).json({
      success: true,
      articleSection,
    });
  }
);

export const deleteArticleSectionByIdHandler = asyncHandler(
  async (
    req: Request<DeleteArticleSectionInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const articleSectionId = req.params.articleSectionId;
    const articleSection = await getArticleSectionById(articleSectionId);
    if (!articleSection) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Article Section Not Found",
        })
      );
    }

    if (articleSection.media.length > 0) {
      for (const media of articleSection.media) {
        await deleteFileByKey(media.key);
      }
    }

    await deleteArticleSectionById(articleSectionId);

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Article Section deleted successfully",
    });
  }
);