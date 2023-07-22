import { Router } from "express";
import {
  createArticleHandler,
  deleteArticleByIdHandler,
  getAllArticleHandler,
  getArticleByIdHandler,
  getArticleByTitleHandler,
  updateArticleByIdHandler,
} from "../controller/article.controller";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { authorize } from "../middleware/authorize";
import validateSchema from "../middleware/validateSchema";
import {
  CreateArticleSchema,
  DeleteArticleSchema,
  UpdateArticleSchema,
} from "../schemas/article.schema";

const ArticleRouter = Router();

ArticleRouter.get("/", getAllArticleHandler);

ArticleRouter.get("/:articleId", getArticleByIdHandler);

ArticleRouter.post(
  "/create",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(CreateArticleSchema),
  createArticleHandler
);

ArticleRouter.put(
  "/:articleId/update",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(UpdateArticleSchema),
  updateArticleByIdHandler
);

ArticleRouter.get("/search/:title", getArticleByTitleHandler);

ArticleRouter.delete(
  "/:articleId/delete",
  [isAuthenticated, authorize("ADMIN")],
  validateSchema(DeleteArticleSchema),
  deleteArticleByIdHandler
);

export default ArticleRouter;