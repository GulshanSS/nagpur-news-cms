import { CreateTagInput, UpdateTagInput } from "../schemas/tag.schema";
import db from "../utils/db.server";

export const getTagById = async (tagId: string) => {
  return await db.tag.findUnique({
    where: {
      id: parseInt(tagId),
    },
  });
};

export const getAllTags = async () => {
  return await db.tag.findMany({});
};

export const createTag = async (tag: CreateTagInput["body"]) => {
  return await db.tag.create({
    data: tag,
  });
};

export const updateTagById = async (tagId: string, tag: UpdateTagInput["body"]) => {
  return await db.tag.update({
    where: {
      id: parseInt(tagId),
    },
    data: tag,
  });
};


export const deleteTagById = async (tagId: string) => {
  return await db.tag.delete({
    where: {
      id: parseInt(tagId),
    },
  });
};
