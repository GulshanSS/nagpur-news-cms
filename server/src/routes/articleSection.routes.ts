import { Router } from "express";
import {
  createArticleSectionHandler,
  deleteArticleSectionByIdHandler,
  getAllArticleSectionByArticleIdHandler,
  getArticleSectionByIdHandler,
  updateArticleSectionByIdHandler,
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

ArticleSectionRouter.get(
  "/:articleId/article",
  getAllArticleSectionByArticleIdHandler
);

ArticleSectionRouter.post(
  "/create",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(CreateArticleSectionSchema),
  createArticleSectionHandler
);

ArticleSectionRouter.put(
  "/:articleSectionId/update",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(UpdateArticleSectionSchema),
  updateArticleSectionByIdHandler
);

ArticleSectionRouter.delete(
  "/:articleSectionId/delete",
  [isAuthenticated, authorize("ADMIN")],
  validateSchema(DeleteArticleSectionSchema),
  deleteArticleSectionByIdHandler
);

export default ArticleSectionRouter;
