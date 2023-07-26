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

export const getTagById = async (tagId: string) => {
  return db.tag.findUnique({
    where: {
      id: parseInt(tagId),
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
