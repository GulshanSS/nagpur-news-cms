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

export const getCategoryById = async (categoryId: string) => {
  return await db.category.findUnique({
    where: {
      id: parseInt(categoryId),
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
