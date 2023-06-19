import { Request, Response } from "express";
import logger from "../utils/logger";
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

export const getAllCategoriesHandler = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategories();
    if (categories.length === 0) {
      return res.status(200).json({
        statusCode: 200,
        success: false,
        message: "No Categories Found",
      });
    }
    return res.json(200).json({
      statusCode: 200,
      success: true,
      count: categories.length,
      categories,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const getCategoryByIdHandler = async (
  req: Request<GetCategoryInput["params"], {}, {}>,
  res: Response
) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: `Category not found with id ${categoryId}`,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      success: true,
      category,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const createCategoryHandler = async (
  req: Request<{}, {}, CreateCategoryInput["body"]>,
  res: Response
) => {
  try {
    const data = req.body;
    const category = await createCategory({ ...data });
    return res.status(201).json({
      statusCode: 201,
      success: true,
      category,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const updateCategoryByIdHandler = async (
  req: Request<UpdateCategoryInput["params"], {}, UpdateCategoryInput["body"]>,
  res: Response
) => {
  try {
    const categoryId = req.params.categoryId;
    const oldCategory = await getCategoryById(categoryId);
    if (!oldCategory) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: `Category not found with id ${categoryId}`,
      });
    }
    const data = req.body;
    const updatedCategory = await updateCategoryById(categoryId, { ...data });
    return res.status(201).json({
      statusCode: 201,
      success: true,
      updatedCategory,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const deleteCategoryByIdHandler = async (
  req: Request<DeleteCategoryInput["params"], {}, {}>,
  res: Response
) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: `Category not found with id ${categoryId}`,
      });
    }
    await deleteCategoryById(categoryId);
    return res.status(204).json({
      statusCode: 204,
      success: true,
      message: `Category with id ${categoryId} deleted successfully`,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};
