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
import { deleteFileByKey, getSignedUrlForMedia } from "../utils/s3";

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
  async (req: Request, res: Response, next: NextFunction) => {
    const testimonials = await getAllTestimonials();
    if (testimonials.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Testimonial Found",
        })
      );
    }

    for (const testimonial of testimonials) {
      testimonial.media!.key = await getSignedUrlForMedia(
        testimonial.media!.key
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      testimonials,
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
    req: Request<{ quotedBy: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const quotedBy = req.params.quotedBy;
    const testimonials = await getTestimonialByQuotedBy(quotedBy);
    if (testimonials.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `No Testimonials found quoted by ${quotedBy}`,
        })
      );
    }

    for (const testimonial of testimonials) {
      testimonial.media!.key = await getSignedUrlForMedia(
        testimonial.media!.key
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      testimonials,
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

    await deleteTestimonialById(testimonialId);

    return res.status(HttpCode.OK).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  }
);
