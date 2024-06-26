import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { getAllTestimonials, getTestimonialById } from "./testimonial.service";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { GetTestimonialInput } from "../../schemas/testimonial.schema";
import { getSignedUrlForMedia } from "../../utils/s3";

export const getAllTestimonialsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const testimonials = await getAllTestimonials();
    if (testimonials.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Testimonials Not Found",
        })
      );
    }

    for (const testimonial of testimonials) {
      testimonial.media!.key = await getSignedUrlForMedia(testimonial.media!.key);
    }

    return res.status(HttpCode.OK).json({
      success: true,
      testimonials,
    });
  }
);

export const getTestimonialByIdHandler = asyncHandler(
  async (
    req: Request<GetTestimonialInput["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const testimonialId = req.params.testimonialId;
    const testimonial = await getTestimonialById(testimonialId);
    if (!testimonial) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Testimonial Not Found",
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
