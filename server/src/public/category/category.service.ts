import db from "../../utils/db.server";

export const getAllCategories = async () => {
  return await db.category.findMany({
    orderBy: [
      {
        createdAt: "asc",
      },
      {
        updatedAt: "asc",
      },
    ],
  });
};

export const getAllCategoriesWithMinArticles = async () => {
  return await db.category.findMany({
    orderBy: [
      {
        createdAt: "asc",
      },
      {
        updatedAt: "asc",
      },
    ],
    include: {
      article: {
        orderBy: [
          {
            createdAt: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],
        include: {
          media: true,
        },
        take: 5,
      },
    },
  });
};

export const getCategoryBySlug = async (slug: string) => {
  return await db.category.findUnique({
    where: {
      slug,
    },
    include: {
      article: {
        take: 20,
        orderBy: [
          {
            createdAt: "desc",
          },
          {
            updatedAt: "desc",
          },
        ],
        include: {
          media: true,
        },
      },
    },
  });
};
