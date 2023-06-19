import { StringDecoder } from "string_decoder";
import { boolean, number, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Category Name is required",
    }).min(1, { message: "Category Name cannot be empty" }),
    active: boolean(),
  }),
};

const params = {
  params: object({
    categoryId: string({
      required_error: "Category Id is required",
    }),
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
