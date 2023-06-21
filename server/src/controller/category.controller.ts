import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { AppError, HttpCode } from "../exceptions/AppError";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "../service/category.service";
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  GetCategoryInput,
  UpdateCategoryInput,
} from "../schemas/category.schema";

export const getAllCategoriesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await getAllCategories();
    if (categories.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Categories Found",
        })
      );
    }
    return res.status(HttpCode.OK).json({
      success: true,
      count: categories.length,
      categories,
    });
  }
);

export const getCategoryByIdHandler = asyncHandler(
  async (
    req: Request<GetCategoryInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const categoryId = req.params.categoryId;
    const category = await getCategoryById(categoryId);
    if (!category) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Category not found with id ${categoryId}`,
        })
      );
    }
    return res.status(HttpCode.OK).json({
      success: true,
      category,
    });
  }
);

export const createCategoryHandler = asyncHandler(
  async (req: Request<{}, {}, CreateCategoryInput["body"]>, res: Response) => {
    const data = req.body;
    const category = await createCategory({ ...data });
    return res.status(HttpCode.CREATED).json({
      success: true,
      category,
    });
  }
);

export const updateCategoryByIdHandler = asyncHandler(
  async (
    req: Request<
      UpdateCategoryInput["params"],
      {},
      UpdateCategoryInput["body"]
    >,
    res: Response,
    next: NextFunction
  ) => {
    const categoryId = req.params.categoryId;
    const oldCategory = await getCategoryById(categoryId);
    if (!oldCategory) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Category not found with id ${categoryId}`,
        })
      );
    }
    const data = req.body;
    const updatedCategory = await updateCategoryById(categoryId, { ...data });
    return res.status(HttpCode.CREATED).json({
      success: true,
      updatedCategory,
    });
  }
);

export const deleteCategoryByIdHandler = asyncHandler(
  async (
    req: Request<DeleteCategoryInput["params"], {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const categoryId = req.params.categoryId;
    const category = await getCategoryById(categoryId);
    if (!category) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Category not found with id ${categoryId}`,
        })
      );
    }
    await deleteCategoryById(categoryId);
    return res.status(HttpCode.OK).json({
      success: true,
      message: `Category with id ${categoryId} deleted successfully`,
    });
  }
);
