import { Router } from "express";
import {
  getAllPromotionaryArticlesAsBannerHandler,
  getAllPromotionaryArticlesHandler,
} from "./promotionaryArticle.controller";
import { getPromotionaryArticleById } from "./promotionaryArticle.service";

const PublicPromotionaryArticleRouter = Router();

PublicPromotionaryArticleRouter.get("/", getAllPromotionaryArticlesHandler);
PublicPromotionaryArticleRouter.get(
  "/banner",
  getAllPromotionaryArticlesAsBannerHandler
);
PublicPromotionaryArticleRouter.get(
  "/:promotionaryArticleId",
  getPromotionaryArticleById
);

export default PublicPromotionaryArticleRouter;
