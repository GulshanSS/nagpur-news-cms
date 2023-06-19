import db from "../utils/db.server";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../schemas/category.schema";

export const getAllCategories = async () => {
  return db.category.findMany({});
};

export const getCategoryById = async (categoryId: string) => {
  return db.category.findUnique({
    where: {
      id: parseInt(categoryId),
    },
  });
};

export const createCategory = async (
  createCategoryInput: CreateCategoryInput["body"]
) => {
  return db.category.create({
    data: createCategoryInput,
  });
};

export const updateCategoryById = async (
  categoryId: string,
  updateCategoryInput: UpdateCategoryInput["body"]
) => {
  return db.category.update({
    where: {
      id: parseInt(categoryId),
    },
    data: updateCategoryInput,
  });
};

export const deleteCategoryById = async (categoryId: string) => {
  return db.category.delete({
    where: {
      id: parseInt(categoryId),
    },
  });
};
