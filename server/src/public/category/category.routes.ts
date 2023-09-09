import { Router } from "express";
import {
  getAllCategoriesHandler,
  getCategoryBySlugHandler,
} from "./category.controller";

const PublicCategoryRouter = Router();

PublicCategoryRouter.get("/", getAllCategoriesHandler);
PublicCategoryRouter.get("/:slug", getCategoryBySlugHandler);

export default PublicCategoryRouter;
