import db from "../../utils/db.server";

export const getAllTags = async () => {
  return db.tag.findMany({
    orderBy: [
      {
        createdAt: "asc",
      },
      {
        updatedAt: "asc",
      },
    ],
    include: {
      article: true,
    },
  });
};

export const getTagBySlug = async (
  slug: string,
  skip: number,
  take: number
) => {
  return db.tag.findUnique({
    where: {
      slug,
    },
    include: {
      article: {
        skip,
        take,
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
