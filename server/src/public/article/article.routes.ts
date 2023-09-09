import { Router } from "express";
import {
  getAllArticlesAsBannerHandler,
  getAllArticlesHandler,
  getArticleBySlugHandler,
  getArticlesByKeywordHandler,
  getLatestArticlesHandler,
} from "./article.controller";

const PublicArticleRouter = Router();

PublicArticleRouter.get("/", getAllArticlesHandler);
PublicArticleRouter.get("/banner/all", getAllArticlesAsBannerHandler);
PublicArticleRouter.get("/:slug", getArticleBySlugHandler);
PublicArticleRouter.get("/search/:keyword", getArticlesByKeywordHandler);
PublicArticleRouter.get("/latest/today", getLatestArticlesHandler);

export default PublicArticleRouter;
