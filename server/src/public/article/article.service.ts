import db from "../../utils/db.server";

export const getAllArticles = async () => {
  return db.article.findMany({
    where: {
      active: true,
      state: "PUBLISHED",
    },
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
      category: true,
      media: true,
    },
  });
};

export const getLatestArticles = async () => {
  const previousDayDate = new Date();
  previousDayDate.setDate(new Date().getDate() - 1);
  return db.article.findMany({
    where: {
      AND: [
        {
          active: true,
        },
        {
          state: "PUBLISHED",
        },
      ],
      OR: [
        {
          createdAt: {
            gt: previousDayDate.toISOString(),
          },
        },
        {
          updatedAt: {
            gt: previousDayDate.toISOString(),
          },
        },
      ],
    },
    include: {
      media: true,
    },
  });
};

export const getAllArticlesAsBanner = async () => {
  return db.article.findMany({
    where: {
      setAsBanner: true,
      active: true,
      state: "PUBLISHED",
    },
    take: 8,
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
      category: true,
    },
  });
};

export const getArticleByKeyword = async (keyword: string) => {
  return db.article.findMany({
    where: {
      AND: [
        {
          active: true,
        },
        {
          state: "PUBLISHED",
        },
      ],
      OR: [
        {
          title: {
            contains: keyword,
          },
        },
        {
          content: {
            contains: keyword,
          },
        },
        {
          location: {
            contains: keyword,
          },
        },
      ],
    },
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
  });
};

export const getArticleById = async (articleId: string) => {
  return db.article.findUnique({
    where: {
      id: parseInt(articleId),
    },
    include: {
      media: true,
      tag: true,
      articleSection: {
        orderBy: {
          sequence: "desc",
        },
      },
    },
  });
};
