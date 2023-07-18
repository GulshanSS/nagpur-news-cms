import { Router } from "express";
import {
  createTestimonialHandler,
  deleteTestimonialByIdHandler,
  getAllTestimonialHandler,
  getTestimonialByIdHandler,
  getTestimonialByQuotedByHandler,
  updateTestimonialByIdHandler,
} from "../controller/testimonial.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { authorize } from "../middleware/authorize";
import validateSchema from "../middleware/validateSchema";
import { createTestimonialSchema } from "../schemas/testimonial.schema";

const TestimonialRouter = Router();

TestimonialRouter.post(
  "/create",
  validateSchema(createTestimonialSchema),
  createTestimonialHandler
);

TestimonialRouter.get("/", getAllTestimonialHandler);

TestimonialRouter.get("/:testimonialId", getTestimonialByIdHandler);

TestimonialRouter.get("/search/:quotedBy", getTestimonialByQuotedByHandler);

TestimonialRouter.put("/:testimonialId/update", updateTestimonialByIdHandler);

TestimonialRouter.delete(
  "/:testimonialId/delete",
  [isAuthenticated, authorize("ADMIN")],
  deleteTestimonialByIdHandler
);

export default TestimonialRouter;
