import { Router } from "express";
import {
  getAllPromotionaryArticlesAsBannerHandler,
  getAllPromotionaryArticlesHandler,
  getPromotionaryArticleByIdHandler,
} from "./promotionaryArticle.controller";
import validateSchema from "../../middleware/validateSchema";
import { getPromotionaryArticleSchema } from "../../schemas/promotionaryArticle.schema";

const PublicPromotionaryArticleRouter = Router();

PublicPromotionaryArticleRouter.get("/", getAllPromotionaryArticlesHandler);
PublicPromotionaryArticleRouter.get(
  "/banner/all",
  getAllPromotionaryArticlesAsBannerHandler
);
PublicPromotionaryArticleRouter.get(
  "/:promotionaryArticleId",
  validateSchema(getPromotionaryArticleSchema),
  getPromotionaryArticleByIdHandler
);

export default PublicPromotionaryArticleRouter;
