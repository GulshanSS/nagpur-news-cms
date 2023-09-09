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
  });
};

export const getTagBySlug = async (slug: string) => {
  return db.tag.findUnique({
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
