import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  CreateTestimonialInput,
  DeleteTestimonialInput,
  GetTestimonialInput,
  UpdateTestimonialInput,
} from "../schemas/testimonial.schema";
import {
  createTestimonial,
  deleteTestimonialById,
  getAllTestimonials,
  getTestimonialById,
  getTestimonialByQuotedBy,
  updateTestimonialById,
} from "../service/testimonial.service";
import { AppError, HttpCode } from "../exceptions/AppError";
import {
  deleteFileByKey,
  getSignedUrlForMedia,
  invalidateCloudFrontCache,
} from "../utils/s3";
import config from "../config";
import db from "../utils/db.server";

export const createTestimonialHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateTestimonialInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;
    const testimonial = await createTestimonial(data);
    if (!testimonial) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Not able to create testimonial",
        })
      );
    }

    return res.status(HttpCode.CREATED).json({
      success: true,
      testimonial,
    });
  }
);

export const updateTestimonialByIdHandler = asyncHandler(
  async (
    req: Request<
      UpdateTestimonialInput["params"],
      {},
      UpdateTestimonialInput["body"]
    >,
    res: Response,
    next: NextFunction
  ) => {
    const testimonialId = req.params.testimonialId;

    const existingTestimonial = await getTestimonialById(testimonialId);

    if (!existingTestimonial) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Testimonial not found",
        })
      );
    }

    const data = req.body;

    await updateTestimonialById(testimonialId, data);

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Testimonial successfully updated",
    });
  }
);

export const getAllTestimonialHandler = asyncHandler(
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
    const total = await db.testimonial.count();

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Testimonial Found",
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

    const testimonials = await getAllTestimonials(skip, limit);

    for (const testimonial of testimonials) {
      testimonial.media!.key = await getSignedUrlForMedia(
        testimonial.media!.key
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      testimonials,
      count: total,
      page,
      pages,
    });
  }
);

export const getTestimonialByIdHandler = asyncHandler(
  async (
    req: Request<GetTestimonialInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const testimonialId = req.params.testimonialId;
    const testimonial = await getTestimonialById(testimonialId);
    if (!testimonial) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Tetsimonial with ${testimonialId} not found`,
        })
      );
    }

    testimonial.media!.key = await getSignedUrlForMedia(testimonial.media!.key);

    return res.status(HttpCode.OK).json({
      success: true,
      testimonial,
    });
  }
);

export const getTestimonialByQuotedByHandler = asyncHandler(
  async (
    req: Request<
      { quotedBy: string },
      {},
      {},
      { page?: string; limit?: string }
    >,
    res: Response,
    next: NextFunction
  ) => {
    const quotedBy = req.params.quotedBy;

    const page = req.query.page ? parseInt(req.query.page) : config.CURR_PAGE;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : config.PAGE_LIMIT;
    const skip = (page - 1) * limit;
    const total = await db.testimonial.count({
      where: {
        quotedBy: {
          contains: quotedBy,
        },
      },
    });

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `No Testimonials found quoted by ${quotedBy}`,
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

    const testimonials = await getTestimonialByQuotedBy(quotedBy, skip, limit);

    for (const testimonial of testimonials) {
      testimonial.media!.key = await getSignedUrlForMedia(
        testimonial.media!.key
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      testimonials,
      count: total,
      page,
      pages,
    });
  }
);

export const deleteTestimonialByIdHandler = asyncHandler(
  async (
    req: Request<DeleteTestimonialInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const testimonialId = req.params.testimonialId;
    const testimonial = await getTestimonialById(testimonialId);
    if (!testimonial) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Testimonial not found",
        })
      );
    }

    const mediaKey = testimonial.media!.key;

    await deleteFileByKey(mediaKey);

    await invalidateCloudFrontCache(mediaKey);

    await deleteTestimonialById(testimonialId);

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  }
);
