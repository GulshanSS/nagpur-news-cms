import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  deleteFileByKey,
  getSignedUrlForMedia,
  invalidateCloudFrontCache,
  uploadSingleFile,
} from "../utils/s3";
import { AppError, HttpCode } from "../exceptions/AppError";
import { randomImageName } from "../utils/imageName";
import {
  createMedia,
  deleteMediaById,
  getAllMedia,
  getMediaById,
  updateMedia,
} from "../service/media.service";
import { postToFacebookPage } from "../utils/facebook";
import { postToTwitter } from "../utils/twitter";
import { getArticleById } from "../service/article.service";
import config from "../config";

export const getAllMediaHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const medias = await getAllMedia();

    if (medias.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No media found",
        })
      );
    }

    for (const media of medias) {
      media.key = await getSignedUrlForMedia(media.key);
    }

    return res.status(HttpCode.OK).json({
      success: true,
      medias,
    });
  }
);

export const uploadSingleFileForTestimonialHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as Express.Multer.File;
    if (!file) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "File not provided",
        })
      );
    }
    const imageName = randomImageName();
    const result = await uploadSingleFile(file, imageName);
    if (!result) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Error uploading File",
        })
      );
    }
    const testimonialId = req.body.testimonialId as string;
    const media = await createMedia({
      type: file.mimetype,
      key: imageName,
      testimonialId: parseInt(testimonialId),
    });
    return res.status(HttpCode.CREATED).json({
      success: true,
      media,
    });
  }
);

export const uploadSingleFileForPromotionaryArticleHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as Express.Multer.File;
    if (!file) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "File not provided",
        })
      );
    }
    const imageName = randomImageName();
    const result = await uploadSingleFile(file, imageName);
    if (!result) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Error uploading File",
        })
      );
    }
    const promotionaryArticleId = req.body.promotionaryArticleId as string;
    const media = await createMedia({
      type: file.mimetype,
      key: imageName,
      promotionaryArticleId: parseInt(promotionaryArticleId),
    });
    return res.status(HttpCode.CREATED).json({
      success: true,
      media,
    });
  }
);

export const uploadMutipleFileForArticleHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];
    if (files.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "File not provided",
        })
      );
    }

    const articleId = req.body.articleId as string;

    for (const file of files) {
      const imageName = randomImageName();
      const result = await uploadSingleFile(file, imageName);
      if (!result) {
        return next(
          new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: "Error uploading File",
          })
        );
      }

      await createMedia({
        type: file.mimetype,
        key: imageName,
        articleId: parseInt(articleId),
      });
    }
    const article = await getArticleById(articleId);
    const link = `${config.NAGPUR_NEWS_URI}/article/${article?.slug}`;

    await Promise.all([
      postToFacebookPage(files[0], link, article!.title),
      postToTwitter(files[0], link, article!.title),
    ]);

    return res.status(HttpCode.CREATED).json({
      success: true,
      message: "Files uploaded successfully",
    });
  }
);

export const uploadMutipleFileForArticleSectionHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];
    if (files.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "File not provided",
        })
      );
    }

    const articleSectionId = req.body.articleSectionId as string;

    for (const file of files) {
      const imageName = randomImageName();
      const result = await uploadSingleFile(file, imageName);
      if (!result) {
        return next(
          new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: "Error uploading File",
          })
        );
      }

      await createMedia({
        type: file.mimetype,
        key: imageName,
        articleSectionId: parseInt(articleSectionId),
      });
    }

    return res.status(HttpCode.CREATED).json({
      success: true,
      message: "Files uploaded successfully",
    });
  }
);

export const updateMediaByIdHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const mediaId = req.body.mediaId as string;

    const existingMedia = await getMediaById(parseInt(mediaId));

    if (!existingMedia) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Media not found",
        })
      );
    }

    const file = req.file as Express.Multer.File;
    if (!file) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "File not provided",
        })
      );
    }
    const imageName = randomImageName();
    const result = await uploadSingleFile(file, imageName);
    if (!result) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Error uploading File",
        })
      );
    }

    const media = await updateMedia(parseInt(mediaId), {
      type: file.mimetype,
      key: imageName,
    });
    return res.status(HttpCode.CREATED).json({
      success: true,
      media,
    });
  }
);

export const deleteMediaByIdHandler = asyncHandler(
  async (
    req: Request<{ mediaId: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const mediaId = req.params.mediaId;
    const media = await getMediaById(parseInt(mediaId));
    if (!media) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Media Not Found",
        })
      );
    }

    await deleteFileByKey(media.key);
    // await invalidateCloudFrontCache(media.key);
    await deleteMediaById(parseInt(mediaId));

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Media deleted successfully",
    });
  }
);
