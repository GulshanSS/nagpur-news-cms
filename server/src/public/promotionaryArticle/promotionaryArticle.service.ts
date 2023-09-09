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

export const getPromotionaryArticleBySlug = async (slug: string) => {
  return await db.promotionaryArticle.findUnique({
    where: {
      slug,
    },
    include: {
      media: true,
    },
  });
};
