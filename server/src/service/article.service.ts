import {
  CreateArticleInput,
  UpdateArticleInput,
} from "../schemas/article.schema";
import db from "../utils/db.server";

export const createArticle = async (data: CreateArticleInput["body"]) => {
  return db.article.create({
    data: {
      ...data,
      publishedOn: new Date(data.publishedOn),
      category: {
        connect: data.category,
      },
      tag: {
        connect: data.tag,
      },
    },
  });
};

export const updateArticleById = async (
  articleId: string,
  data: UpdateArticleInput["body"]
) => {
  return db.article.update({
    where: {
      id: parseInt(articleId),
    },
    data: {
      ...data,
      publishedOn: new Date(data.publishedOn),
      category: {
        connect: data.category,
      },
      tag: {
        connect: data.tag,
      },
    },
  });
};

export const getAllArticles = async () => {
  return db.article.findMany({
    include: {
      category: true,
      tag: true,
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
      category: true,
      tag: true,
      articleSection: true,
    },
  });
};

export const getArticleByTitle = async (title: string) => {
  return db.article.findMany({
    where: {
      title: {
        contains: title,
      },
    },
    include: {
      category: true,
      tag: true,
      media: true,
    },
  });
};

export const deleteArticleById = async (articleId: string) => {
  return db.article.delete({
    where: {
      id: parseInt(articleId),
    },
  });
};
