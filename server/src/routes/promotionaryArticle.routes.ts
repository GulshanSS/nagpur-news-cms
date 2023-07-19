import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { authorize } from "../middleware/authorize";
import {
  createPromotionaryArticleHandler,
  getAllPromotionaryArticleHandler,
  getPromotionaryArticleByTitleHandler,
  getPromotionaryArticleByIdHandler,
  updatePromotionaryArticleByIdHandler,
  deletePromotionaryArticleByIdHandler,
} from "../controller/promotionaryArticle.controller";

const PromotionaryArticleRouter = Router();

PromotionaryArticleRouter.post(
  "/create",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  createPromotionaryArticleHandler
);

PromotionaryArticleRouter.get("/", getAllPromotionaryArticleHandler);

PromotionaryArticleRouter.get(
  "/:promotionaryArticleId",
  getPromotionaryArticleByIdHandler
);

PromotionaryArticleRouter.get(
  "/search/:title",
  getPromotionaryArticleByTitleHandler
);

PromotionaryArticleRouter.put(
  "/:promotionaryArticleId/update",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  updatePromotionaryArticleByIdHandler
);

PromotionaryArticleRouter.delete(
  "/:promotionaryArticleId/delete",
  [isAuthenticated, authorize("ADMIN")],
  deletePromotionaryArticleByIdHandler
);

export default PromotionaryArticleRouter;
