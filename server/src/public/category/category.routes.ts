import { Router } from "express";
import {
  getAllCategoriesHandler,
  getAllCategoriesWithMinArticlesHandler,
  getCategoryBySlugHandler,
} from "./category.controller";

const PublicCategoryRouter = Router();

PublicCategoryRouter.get("/", getAllCategoriesHandler);
PublicCategoryRouter.get("/all", getAllCategoriesWithMinArticlesHandler);
PublicCategoryRouter.get("/:slug", getCategoryBySlugHandler);

export default PublicCategoryRouter;
