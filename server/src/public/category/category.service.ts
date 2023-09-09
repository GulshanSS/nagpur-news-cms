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
