import { boolean, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Category Name is required",
    }).min(1, { message: "Category Name cannot be empty" }),
    slug: string({
      required_error: "Slug is required",
    }).min(1, { message: "Slug cannot be empty" }),
    active: boolean().optional(),
  }),
};

const params = {
  params: object({
    categoryId: string({
      required_error: "Category Id is required",
    }).regex(new RegExp("^\\d+$"), "Category Id should contain only numbers"),
  }),
};

export const createCategorySchema = object({ ...payload });
export const updateCategorySchema = object({ ...params, ...payload });
export const getCategorySchema = object({ ...params });
export const deleteCategorySchema = object({ ...params });

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>;
export type UpdateCategoryInput = TypeOf<typeof updateCategorySchema>;
export type GetCategoryInput = TypeOf<typeof getCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>;
