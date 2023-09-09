import { Router } from "express";
import {
  addSlugToAllArticlesHandler,
  createArticleHandler,
  deleteArticleByIdHandler,
  getAllArticleHandler,
  getArticleByIdHandler,
  getArticleByStateAndTitleHandler,
  getArticleByStateHandler,
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
  "/state/:articleState",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getArticleByStateHandler
);

ArticleRouter.get(
  "/search/:title",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getArticleByTitleHandler
);

ArticleRouter.get(
  "/state/:state/search/:title",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getArticleByStateAndTitleHandler
);

ArticleRouter.delete(
  "/:articleId/delete",
  [isAuthenticated, authorize("ADMIN")],
  validateSchema(DeleteArticleSchema),
  deleteArticleByIdHandler
);

ArticleRouter.post(
  "/all/add/slug",
  [isAuthenticated, authorize("ADMIN")],
  addSlugToAllArticlesHandler
);

export default ArticleRouter;
