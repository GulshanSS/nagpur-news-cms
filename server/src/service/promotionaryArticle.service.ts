import {
  CreatePromotionaryArticleInput,
  UpdatePromotionaryArticleInput,
} from "../schemas/promotionaryArticle.schema";
import db from "../utils/db.server";

export const getAllPromotionaryArticles = async (
  skip: number,
  take: number
) => {
  return await db.promotionaryArticle.findMany({
    include: {
      media: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
    skip,
    take,
  });
};

export const getPromotionaryArticleById = async (
  promotionaryArticleId: string
) => {
  return await db.promotionaryArticle.findUnique({
    where: {
      id: parseInt(promotionaryArticleId),
    },
    include: {
      media: true,
    },
  });
};

export const getPromotionaryArticleByTitle = async (
  title: string,
  skip: number,
  take: number
) => {
  return await db.promotionaryArticle.findMany({
    where: {
      title: {
        contains: title,
      },
    },
    include: {
      media: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
    skip,
    take,
  });
};

export const createPromotionaryAticle = async (
  promotionaryArticle: CreatePromotionaryArticleInput["body"]
) => {
  return await db.promotionaryArticle.create({
    data: {
      ...promotionaryArticle,
      priority: parseInt(promotionaryArticle.priority),
    },
  });
};

export const updatePromotionaryArticleById = async (
  promotionaryArticleId: string,
  promotionaryArticle: UpdatePromotionaryArticleInput["body"]
) => {
  return await db.promotionaryArticle.update({
    where: {
      id: parseInt(promotionaryArticleId),
    },
    data: {
      ...promotionaryArticle,
      priority: parseInt(promotionaryArticle.priority),
    },
  });
};

export const deletePromotionaryArticleById = async (
  promotionaryArticleId: string
) => {
  return await db.promotionaryArticle.delete({
    where: {
      id: parseInt(promotionaryArticleId),
    },
  });
};
