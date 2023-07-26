import { Router } from "express";
import {
  getAllArticlesAsBannerHandler,
  getAllArticlesHandler,
  getArticleByIdHandler,
  getArticlesByKeywordHandler,
  getLatestArticlesHandler,
} from "./article.controller";
import validateSchema from "../../middleware/validateSchema";
import { GetArticleSchema } from "../../schemas/article.schema";

const PublicArticleRouter = Router();

PublicArticleRouter.get("/", getAllArticlesHandler);
PublicArticleRouter.get(
  "/:articleId",
  validateSchema(GetArticleSchema),
  getArticleByIdHandler
);
PublicArticleRouter.get("/search/:keyword", getArticlesByKeywordHandler);
PublicArticleRouter.get("/latest", getLatestArticlesHandler);
PublicArticleRouter.get("/banner", getAllArticlesAsBannerHandler);

export default PublicArticleRouter;
