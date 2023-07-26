import { Request, Response, NextFunction } from "express";
import asyncHandler from "../../middleware/asyncHandler";
import { getAllCategories, getCategoryById } from "./category.service";
import { AppError, HttpCode } from "../../exceptions/AppError";
import { GetCategoryInput } from "../../schemas/category.schema";

export const getAllCategoriesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await getAllCategories();
    if (categories.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Categories Not Found",
        })
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
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
          description: "Category Not found",
        })
      );
    }

    return res.status(HttpCode.OK).json({
      success: true,
      category,
    });
  }
);
