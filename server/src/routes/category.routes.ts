import { Router } from "express";
import {
  createCategoryHandler,
  deleteCategoryByIdHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  getCategoryByNameHandler,
  updateCategoryByIdHandler,
} from "../controller/category.controller";
import validateSchema from "../middleware/validateSchema";
import {
  createCategorySchema,
  deleteCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { authorize } from "../middleware/authorize";

const CategoryRouter = Router();

CategoryRouter.get(
  "/",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getAllCategoriesHandler
);

CategoryRouter.get(
  "/:categoryId",
  validateSchema(getCategorySchema),
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getCategoryByIdHandler
);

CategoryRouter.get(
  "/search/:name",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getCategoryByNameHandler
);

CategoryRouter.post(
  "/create",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(createCategorySchema),
  createCategoryHandler
);

CategoryRouter.put(
  "/:categoryId/update",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(updateCategorySchema),
  updateCategoryByIdHandler
);

CategoryRouter.delete(
  "/:categoryId/delete",
  [isAuthenticated, authorize("ADMIN")],
  validateSchema(deleteCategorySchema),
  deleteCategoryByIdHandler
);

export default CategoryRouter;
