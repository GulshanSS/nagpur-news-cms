import db from "../../utils/db.server";

export const getAllPromotionartArticles = async () => {
  return db.promotionaryArticle.findMany({
    where: {
      active: true,
    },
    take: 10,
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
      {
        priority: "desc",
      },
    ],
    include: {
      media: true,
    },
  });
};

export const getAllPromotionaryArticlesAsBanner = async () => {
  return db.promotionaryArticle.findMany({
    take: 4,
    where: {
      setAsBanner: true,
      active: true,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
      {
        priority: "desc",
      },
    ],
    include: {
      media: true,
    },
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
