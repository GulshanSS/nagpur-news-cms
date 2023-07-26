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
  GetArticleSchema,
  UpdateArticleSchema,
} from "../schemas/article.schema";

const ArticleRouter = Router();

ArticleRouter.get(
  "/",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getAllArticleHandler
);

ArticleRouter.get(
  "/:articleId",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(GetArticleSchema),
  getArticleByIdHandler
);

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

ArticleRouter.get(
  "/search/:title",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getArticleByTitleHandler
);

ArticleRouter.delete(
  "/:articleId/delete",
  [isAuthenticated, authorize("ADMIN")],
  validateSchema(DeleteArticleSchema),
  deleteArticleByIdHandler
);

export default ArticleRouter;
