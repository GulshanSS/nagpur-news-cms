import { TypeOf, boolean, object, string } from "zod";

const payload = {
  body: object({
    name: string().min(1, "Tag Name is required"),
    setAsCategory: boolean().optional(),
    active: boolean().optional(),
  }),
};

const params = {
  params: object({
    tagId: string()
      .min(1, "TagId is required")
      .regex(new RegExp("^\\d+$"), "Article Id should contain only numbers"),
  }),
};

export const createTagSchema = object({ ...payload });
export const updateTagSchema = object({ ...params, ...payload });
export const getTagSchema = object({ ...params });
export const deleteTagSchema = object({ ...params });

export type CreateTagInput = TypeOf<typeof createTagSchema>;
export type UpdateTagInput = TypeOf<typeof updateTagSchema>;
export type GetTagInput = TypeOf<typeof getTagSchema>;
export type DeleteTagInput = TypeOf<typeof deleteTagSchema>;
