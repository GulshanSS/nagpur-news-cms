import { TypeOf, number, object, string } from "zod";

const payload = {
  body: object({
    title: string().trim().optional(),
    content: string().trim().min(1, "Content is required"),
    sequence: string()
      .trim()
      .regex(
        new RegExp("\\b([0-9]|[1-9][0-9])\\b"),
        "Sequence should contain 0-99 number"
      ),
    articleId: number({
      required_error: "Article Id is required",
    }),
  }),
};

const params = {
  params: object({
    articleSectionId: string({
      required_error: "Article Section Id is required",
    }).regex(
      new RegExp("^\\d+$"),
      "Article Section Id should contain only numbers"
    ),
  }),
};

export const CreateArticleSectionSchema = object({ ...payload });
export const UpdateArticleSectionSchema = object({ ...params, ...payload });
export const GetArticleSectionSchema = object({ ...params });
export const DeleteArticleSectionSchema = object({ ...params });

export type CreateArticleSectionInput = TypeOf<
  typeof CreateArticleSectionSchema
>;
export type UpdateArticleSectionInput = TypeOf<
  typeof UpdateArticleSectionSchema
>;
export type GetArticleSectionInput = TypeOf<typeof GetArticleSectionSchema>;
export type DeleteArticleSectionInput = TypeOf<
  typeof DeleteArticleSectionSchema
>;
