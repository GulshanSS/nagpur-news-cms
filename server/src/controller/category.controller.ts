import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { AppError, HttpCode } from "../exceptions/AppError";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  getCategoryByName,
  updateCategoryById,
} from "../service/category.service";
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  GetCategoryInput,
  UpdateCategoryInput,
} from "../schemas/category.schema";
import { createSlug } from "../utils/slugify";
import db from "../utils/db.server";
import { getCategoryBySlug } from "../public/category/category.service";

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

export const getCategoryByNameHandler = asyncHandler(
  async (
    req: Request<{ name: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const name = req.params.name;
    const categories = await getCategoryByName(name);
    if (categories.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `No Categories found containing ${name}`,
        })
      );
    }
    return res.status(HttpCode.OK).json({
      success: true,
      categories,
      count: categories.length,
    });
  }
);

export const createCategoryHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateCategoryInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const slugText = req.body.slug;

    const slug = createSlug(slugText);

    const existingCategory = await getCategoryBySlug(slug, 1, 1);

    if (existingCategory) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: `Category with Name: ${req.body.name} exists`,
        })
      );
    }

    const data = { ...req.body, slug };
    const category = await createCategory(data);
    if (!category) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: "Not able to create category",
        })
      );
    }
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
    const existingCategory = await getCategoryById(categoryId);
    if (!existingCategory) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `Category not found with id ${categoryId}`,
        })
      );
    }

    let data = req.body as any;
    const name = req.body.name;
    const slug = createSlug(req.body.slug);

    if (name !== existingCategory.name) {
      const existingCategory = await getCategoryBySlug(slug, 1, 1);

      if (existingCategory) {
        return next(
          new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: `Cannot update Category with Title: ${name} as it exists`,
          })
        );
      }
    }

    data = { slug, ...data };

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

export const addSlugToAllCategoriesHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await db.category.findMany({
      where: {
        slug: undefined,
      },
    });
    if (categories.length === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "Categories Not Found",
        })
      );
    }

    for (const category of categories) {
      const slug = createSlug(category.name);
      await db.category.update({
        where: {
          id: category.id,
        },
        data: {
          ...category,
          slug,
        },
      });
    }

    const newCategories = await db.category.findMany({
      where: {
        slug: undefined,
      },
    });

    return res.status(HttpCode.OK).json({
      success: true,
      count: newCategories.length,
      categories: newCategories,
    });
  }
);
