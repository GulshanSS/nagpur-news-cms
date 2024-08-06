import { object, string, TypeOf, boolean, array, number } from "zod";

const payload = {
  body: object({
    title: string().trim().min(1, "Title is required"),
    slug: string().trim().min(1, "Slug is required"),
    content: string().trim().min(1, "Content is required"),
    location: string().trim().min(1, "Location is required"),
    category: array(object({ id: number() })).min(1, "Category is required"),
    tag: array(object({ id: number() })).min(1, "Tag is required"),
    youtubeVideoUrl: string().trim().optional(),
    twitterId: string().trim().optional(),
    author: string().trim().min(1, "Author is required"),
    publishedOn: string(),
    state: string().trim().min(1, "Publish State is required"),
    setAsBanner: boolean().optional(),
    active: boolean().optional(),
    postToSocialMedia: boolean().optional(),
  }),
};

const params = {
  params: object({
    articleId: string({
      required_error: "Article Id is required",
    }).regex(new RegExp("^\\d+$"), "Article Id should contain only numbers"),
  }),
};

export const CreateArticleSchema = object({ ...payload });
export const UpdateArticleSchema = object({ ...params, ...payload });
export const GetArticleSchema = object({ ...params });
export const DeleteArticleSchema = object({ ...params });

export type CreateArticleInput = TypeOf<typeof CreateArticleSchema>;
export type UpdateArticleInput = TypeOf<typeof UpdateArticleSchema>;
export type GetArticleInput = TypeOf<typeof GetArticleSchema>;
export type DeleteArticleInput = TypeOf<typeof DeleteArticleSchema>;
