import { Router } from "express";
import {
  getAllTestimonialsHandler,
  getTestimonialByIdHandler,
} from "./testimonial.controller";
import validateSchema from "../../middleware/validateSchema";
import { getTestimonialSchema } from "../../schemas/testimonial.schema";

const PublicTestimonialRouter = Router();

PublicTestimonialRouter.get("/", getAllTestimonialsHandler);
PublicTestimonialRouter.get(
  "/:testimonialId",
  validateSchema(getTestimonialSchema),
  getTestimonialByIdHandler
);

export default PublicTestimonialRouter;
