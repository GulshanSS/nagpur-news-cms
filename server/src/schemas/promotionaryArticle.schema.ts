import { boolean, object, string, TypeOf, literal } from "zod";

const payload = {
  body: object({
    priority: string()
      .trim()
      .regex(new RegExp("\\d{1}"), "Please enter valid priority"),
    title: string().trim(),
    content: string().trim().optional(),
    websiteLink: string().trim().optional(),
    whatsAppLink: string().trim().optional(),
    instagramLink: string().trim().optional(),
    address: string().trim().optional(),
    contact: string()
      .regex(new RegExp("\\d{10}"), "Contact number should contain 0-9 digits")
      .optional()
      .or(literal("")),
    setAsBanner: boolean().optional(),
    active: boolean().optional(),
  }),
};

const params = {
  params: object({
    promotionaryArticleId: string({
      required_error: "Promotionary Article Id is required",
    }).regex(
      new RegExp("^\\d+$"),
      "Promotionary Article Id should contain only numbers"
    ),
  }),
};

export const createPromotionaryArticleSchema = object({
  ...payload,
});
export const updatePromotionaryArticleSchema = object({
  ...params,
  ...payload,
});
export const getPromotionaryArticleSchema = object({
  ...params,
});
export const deletePromotionaryArticleSchema = object({
  ...params,
});

export type CreatePromotionaryArticleInput = TypeOf<
  typeof createPromotionaryArticleSchema
>;
export type UpdatePromotionaryArticleInput = TypeOf<
  typeof updatePromotionaryArticleSchema
>;
export type GetPromotionaryArticleInput = TypeOf<
  typeof getPromotionaryArticleSchema
>;
export type DeletePromotionaryArticleInput = TypeOf<
  typeof deletePromotionaryArticleSchema
>;
