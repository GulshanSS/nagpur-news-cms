import { Router } from "express";
import {
  getAllCategoriesHandler,
  getCategoryByIdHandler,
} from "./category.controller";
import validateSchema from "../../middleware/validateSchema";
import { getCategorySchema } from "../../schemas/category.schema";

const PublicCategoryRouter = Router();

PublicCategoryRouter.get("/", getAllCategoriesHandler);
PublicCategoryRouter.get(
  "/:categoryId",
  validateSchema(getCategorySchema),
  getCategoryByIdHandler
);

export default PublicCategoryRouter;
