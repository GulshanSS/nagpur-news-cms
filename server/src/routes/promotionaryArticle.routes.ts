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
import validateSchema from "../middleware/validateSchema";
import {
  createPromotionaryArticleSchema,
  updatePromotionaryArticleSchema,
} from "../schemas/promotionaryArticle.schema";

const PromotionaryArticleRouter = Router();

PromotionaryArticleRouter.post(
  "/create",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(createPromotionaryArticleSchema),
  createPromotionaryArticleHandler
);

PromotionaryArticleRouter.get(
  "/",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getAllPromotionaryArticleHandler
);

PromotionaryArticleRouter.get(
  "/:promotionaryArticleId",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getPromotionaryArticleByIdHandler
);

PromotionaryArticleRouter.get(
  "/search/:title",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getPromotionaryArticleByTitleHandler
);

PromotionaryArticleRouter.put(
  "/:promotionaryArticleId/update",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(updatePromotionaryArticleSchema),
  updatePromotionaryArticleByIdHandler
);

PromotionaryArticleRouter.delete(
  "/:promotionaryArticleId/delete",
  [isAuthenticated, authorize("ADMIN")],
  deletePromotionaryArticleByIdHandler
);

export default PromotionaryArticleRouter;
