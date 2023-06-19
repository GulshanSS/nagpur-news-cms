import express, { Router } from "express";
import {
  createCategoryHandler,
  deleteCategoryByIdHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryByIdHandler,
} from "../controller/category.controller";
import validateSchema from "../middleware/validateSchema";
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";

const CategoryRouter: Router = express.Router();

CategoryRouter.get("/", getAllCategoriesHandler);

CategoryRouter.get(
  "/:categoryId",
  validateSchema(getCategorySchema),
  getCategoryByIdHandler
);

CategoryRouter.post(
  "/create",
  validateSchema(createCategorySchema),
  createCategoryHandler
);

CategoryRouter.put(
  "/:categoryId/update",
  validateSchema(updateCategorySchema),
  updateCategoryByIdHandler
);

CategoryRouter.delete(
  "/:categoryId/delete",
  validateSchema(deleteCategorySchema),
  deleteCategoryByIdHandler
);

export default CategoryRouter;
