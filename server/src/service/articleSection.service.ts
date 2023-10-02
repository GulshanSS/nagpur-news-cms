import {
  CreateArticleSectionInput,
  UpdateArticleSectionInput,
} from "../schemas/articleSection.schema";
import db from "../utils/db.server";

export const createArticleSection = async (
  data: CreateArticleSectionInput["body"]
) => {
  return db.articleSection.create({
    data: {
      ...data,
      sequence: parseInt(data.sequence),
      articleId: data.articleId,
    },
  });
};

export const updateArticleSectionById = async (
  articleSectionId: string,
  data: UpdateArticleSectionInput["body"]
) => {
  return db.articleSection.update({
    where: {
      id: parseInt(articleSectionId),
    },
    data: {
      ...data,
      sequence: parseInt(data.sequence),
      articleId: data.articleId,
    },
  });
};

export const getAllArticleSectionByArticleId = async (articleId: string) => {
  return db.articleSection.findMany({
    where: {
      articleId: parseInt(articleId),
    },
    include: {
      media: true,
    },
    orderBy: {
      sequence: "asc",
    },
  });
};

export const getArticleSectionById = async (articleSectionId: string) => {
  return db.articleSection.findUnique({
    where: {
      id: parseInt(articleSectionId),
    },
    include: {
      media: true,
    },
  });
};

export const deleteArticleSectionById = async (articleSectionId: string) => {
  return db.articleSection.delete({
    where: {
      id: parseInt(articleSectionId),
    },
  });
};
