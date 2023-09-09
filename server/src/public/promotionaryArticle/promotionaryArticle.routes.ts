import { Router } from "express";
import {
  getAllPromotionaryArticlesAsBannerHandler,
  getAllPromotionaryArticlesHandler,
  getPromotionaryArticleBySlugHandler,
} from "./promotionaryArticle.controller";

const PublicPromotionaryArticleRouter = Router();

PublicPromotionaryArticleRouter.get("/", getAllPromotionaryArticlesHandler);
PublicPromotionaryArticleRouter.get(
  "/banner/all",
  getAllPromotionaryArticlesAsBannerHandler
);
PublicPromotionaryArticleRouter.get(
  "/:slug",
  getPromotionaryArticleBySlugHandler
);

export default PublicPromotionaryArticleRouter;
