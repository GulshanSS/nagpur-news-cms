import { Router } from "express";
import {
  createArticleSectionHandler,
  deleteArticleSectionByIdHandler,
  getArticleSectionByIdHandler,
} from "../controller/articleSection.controller";
import validateSchema from "../middleware/validateSchema";
import {
  CreateArticleSectionSchema,
  DeleteArticleSectionSchema,
  UpdateArticleSectionSchema,
} from "../schemas/articleSection.schema";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { authorize } from "../middleware/authorize";

const ArticleSectionRouter = Router();

ArticleSectionRouter.get("/:articleSectionId", getArticleSectionByIdHandler);
ArticleSectionRouter.post(
  "/create",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(CreateArticleSectionSchema),
  createArticleSectionHandler
);
ArticleSectionRouter.put(
  "/:articleSectionId/update",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(UpdateArticleSectionSchema)
);
ArticleSectionRouter.delete(
  "/:articleSectionId/delete",
  [isAuthenticated, authorize("ADMIN")],
  validateSchema(DeleteArticleSectionSchema),
  deleteArticleSectionByIdHandler
);

export default ArticleSectionRouter;
